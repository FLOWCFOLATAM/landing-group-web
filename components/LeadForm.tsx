"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useContent } from "@/components/ContentProvider";
import BrandStar from "./BrandStar";
import RollText from "./RollText";

/* Formulario de /hablemos (diagnóstico UX §8): necesidad, fecha aproximada,
   volumen/puntos de entrega, nombre, empresa, cargo, correo o WhatsApp y
   reunión opcional. Al enviar abre el correo del visitante con todo
   prellenado hacia el buzón de Landing y muestra la confirmación con la
   expectativa de respuesta. (El envío automático sin depender del correo
   del visitante es la siguiente fase: "vinculación de correos".) */

const DAY_FMT = new Intl.DateTimeFormat("es-PE", { weekday: "short", day: "numeric", month: "short" });
const FULL_FMT = new Intl.DateTimeFormat("es-PE", { dateStyle: "full" });

function nextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(d));
  }
  return days;
}

const pad = (n: number) => String(n).padStart(2, "0");
const isoDay = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
/* AAAAMMDDTHHmmss en hora de pared (Google Calendar la interpreta con ctz) */
const gcalStamp = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validReach = (v: string) => EMAIL.test(v.trim()) || v.replace(/\D/g, "").length >= 9;

type Field = "need" | "name" | "company" | "reach";
const MESSAGES: Record<Field, string> = {
  need: "Elige qué necesita tu marca.",
  name: "Escribe tu nombre.",
  company: "Escribe el nombre de tu empresa.",
  reach: "Escribe un correo válido o un WhatsApp con código de país.",
};

const INPUT =
  "w-full rounded-button border bg-paper/40 px-4 py-3.5 text-[15px] outline-none transition-colors placeholder:text-ink/45 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/25";
const LEGEND = "text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]";

export default function LeadForm() {
  const { contact } = useContent();
  const uid = useId();
  const [days, setDays] = useState<Date[]>([]);
  const [today, setToday] = useState("");
  const [need, setNeed] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");
  const [volume, setVolume] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [reach, setReach] = useState("");
  const [day, setDay] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const confirmTitle = useRef<HTMLHeadingElement>(null);

  /* Fechas relativas a HOY: se calculan en el cliente (el HTML estático se
     generó en otra fecha y no debe fijar días ni el mínimo del calendario). */
  useEffect(() => {
    setDays(nextBusinessDays(10));
    setToday(isoDay(new Date()));
  }, []);

  useEffect(() => {
    if (sent) confirmTitle.current?.focus();
  }, [sent]);

  const meeting = day && slot ? `${FULL_FMT.format(day)} · ${slot} (hora de Lima)` : "";
  const approxDate = date ? FULL_FMT.format(new Date(`${date}T12:00:00`)) : "";

  const summary: [string, string][] = (
    [
      ["Necesidad", need],
      ["Detalle", detail.trim()],
      ["Fecha aproximada", approxDate],
      ["Volumen / puntos de entrega", volume.trim()],
      ["Nombre", name.trim()],
      ["Empresa", company.trim()],
      ["Cargo", role.trim()],
      ["Correo o WhatsApp", reach.trim()],
      ["Reunión propuesta", meeting],
    ] as [string, string][]
  ).filter(([, v]) => v);

  const bodyText = [
    `Hola, soy ${name.trim()}${role.trim() ? `, ${role.trim()}` : ""} de ${company.trim()}.`,
    "",
    ...summary.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");
  const subject = `Solicitud — ${company.trim()} · ${need}`;
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  const gcal = (() => {
    if (!day || !slot) return "";
    const [h, m] = slot.split(":").map(Number);
    const start = new Date(day);
    start.setHours(h, m || 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60000);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Reunión LANDING GROUP — ${company.trim()}`,
      dates: `${gcalStamp(start)}/${gcalStamp(end)}`,
      ctz: "America/Lima",
      details: bodyText,
      add: contact.email,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const whatsapp = contact.whatsapp.replace(/\D/g, "");
  const waLink = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(bodyText)}` : "";

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!need) next.need = MESSAGES.need;
    if (!name.trim()) next.name = MESSAGES.name;
    if (!company.trim()) next.company = MESSAGES.company;
    if (!validReach(reach)) next.reach = MESSAGES.reach;
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    window.location.href = mailto;
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${bodyText}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    return (
      <div role="status" className="rounded-card bg-white p-8 shadow-lift sm:p-12">
        <BrandStar auto className="w-10" />
        <h2 ref={confirmTitle} tabIndex={-1} className="display mt-5 text-[clamp(2rem,4vw,3rem)] leading-[0.95] outline-none">
          {contact.confirmTitle}
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-ink/75">{contact.confirmBody}</p>
        <p className="mt-2 text-[13px] uppercase tracking-[0.14em] text-accent [font-weight:600]">{contact.response}</p>

        <dl className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2">
          {summary.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/60 [font-weight:600]">{k}</dt>
              <dd className="mt-0.5 whitespace-pre-line text-[14px] leading-[1.5] text-ink/85">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={mailto}
            className="btn-fill group inline-flex min-h-[44px] items-center rounded-button bg-accent px-6 text-[12px] uppercase tracking-[0.14em] text-accent-ink [--fill:var(--brand-ink)] [font-weight:600]"
          >
            <RollText text="Abrir el correo de nuevo" />
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-[44px] items-center rounded-button border border-line bg-white px-6 text-[12px] uppercase tracking-[0.14em] text-ink/80 transition-colors [font-weight:600] hover:border-accent hover:text-accent"
          >
            {copied ? "Copiado" : "Copiar datos"}
          </button>
          {gcal && (
            <a
              href={gcal}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-button border border-line bg-white px-6 text-[12px] uppercase tracking-[0.14em] text-ink/80 transition-colors [font-weight:600] hover:border-accent hover:text-accent"
            >
              Añadir a Google Calendar
            </a>
          )}
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-button border border-line bg-white px-6 text-[12px] uppercase tracking-[0.14em] text-ink/80 transition-colors [font-weight:600] hover:border-accent hover:text-accent"
            >
              Escribir por WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={() => setSent(false)}
            className="inline-flex min-h-[44px] items-center px-2 text-[12px] uppercase tracking-[0.14em] text-accent [font-weight:600]"
          >
            ← Editar solicitud
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? "Datos copiados al portapapeles" : ""}
        </p>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      {/* 1 · Tu proyecto  +  2 · Reunión (opcional) */}
      <div className="space-y-6">
        <fieldset className="rounded-card bg-white p-7 shadow-lift sm:p-9">
          <legend className="sr-only">Tu proyecto</legend>
          <p aria-hidden className={LEGEND}>1 · Tu proyecto</p>

          <fieldset className="mt-5" aria-describedby={errors.need ? `${uid}-need-err` : undefined}>
            <legend className="text-[14px] text-ink/85 [font-weight:600]">
              ¿Qué necesita tu marca? <span className="text-accent">*</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {contact.needs.map((n, i) => (
                <label key={n} className="cursor-pointer">
                  <input
                    id={i === 0 ? `${uid}-need` : undefined}
                    type="radio"
                    name="need"
                    value={n}
                    checked={need === n}
                    onChange={() => {
                      setNeed(n);
                      setErrors((er) => ({ ...er, need: undefined }));
                    }}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-[44px] items-center rounded-button border border-line bg-paper/40 px-4 text-[13px] tracking-[0.04em] text-ink/80 transition-colors [font-weight:600] peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 hover:border-accent">
                    {n}
                  </span>
                </label>
              ))}
            </div>
            {errors.need && <ErrorText id={`${uid}-need-err`}>{errors.need}</ErrorText>}
          </fieldset>

          <div className="mt-5 space-y-4">
            <Labeled id={`${uid}-detail`} label="Cuéntanos más (opcional)">
              <textarea
                id={`${uid}-detail`}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                rows={3}
                placeholder="Ej.: kits de bienvenida para nuevos colaboradores"
                className={`${INPUT} resize-none border-line`}
              />
            </Labeled>
            <div className="grid gap-4 sm:grid-cols-2">
              <Labeled id={`${uid}-date`} label="Fecha aproximada (entrega o evento)">
                <input
                  id={`${uid}-date`}
                  type="date"
                  min={today || undefined}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${INPUT} border-line`}
                />
              </Labeled>
              <Labeled id={`${uid}-volume`} label="Volumen / puntos de entrega">
                <input
                  id={`${uid}-volume`}
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  placeholder="Ej.: 300 kits · 5 sedes en Lima"
                  className={`${INPUT} border-line`}
                />
              </Labeled>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-card bg-white p-7 shadow-lift sm:p-9">
          <legend className="sr-only">Reunión (opcional)</legend>
          <p aria-hidden className={LEGEND}>2 · Reunión (opcional)</p>
          <p className="mt-4 text-[14px] text-ink/80 [font-weight:600]">Elige el día</p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {days.map((d) => {
              const active = day?.toDateString() === d.toDateString();
              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDay(active ? null : d)}
                  className={`min-h-[44px] rounded-button border px-2 py-2.5 text-center text-[12px] uppercase tracking-[0.06em] transition-colors [font-weight:600] ${
                    active
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-line bg-paper/40 text-ink/75 hover:border-accent hover:text-accent"
                  }`}
                >
                  {DAY_FMT.format(d).replace(".", "")}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-[14px] text-ink/80 [font-weight:600]">Elige la hora</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {contact.slots.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={slot === s}
                onClick={() => setSlot(slot === s ? null : s)}
                disabled={!day}
                className={`min-h-[44px] rounded-button border px-5 text-[13px] tracking-[0.06em] transition-colors [font-weight:600] disabled:cursor-not-allowed disabled:opacity-40 ${
                  slot === s
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line bg-paper/40 text-ink/75 hover:border-accent hover:text-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-5 text-[13px] leading-[1.5] text-ink/65">
            Reuniones de 30 min por videollamada · hora de Lima (GMT-5).
          </p>
        </fieldset>
      </div>

      {/* 3 · Tus datos + envío */}
      <fieldset className="h-fit rounded-card bg-white p-7 shadow-lift sm:p-9 lg:sticky lg:top-24">
        <legend className="sr-only">Tus datos</legend>
        <p aria-hidden className={LEGEND}>3 · Tus datos</p>
        <div className="mt-5 space-y-4">
          <Labeled id={`${uid}-name`} label="Nombre y apellido" required error={errors.name}>
            <input
              id={`${uid}-name`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((er) => ({ ...er, name: undefined }));
              }}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              className={`${INPUT} ${errors.name ? "border-[#b43c2f]" : "border-line"}`}
            />
          </Labeled>
          <Labeled id={`${uid}-company`} label="Empresa" required error={errors.company}>
            <input
              id={`${uid}-company`}
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setErrors((er) => ({ ...er, company: undefined }));
              }}
              autoComplete="organization"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? `${uid}-company-err` : undefined}
              className={`${INPUT} ${errors.company ? "border-[#b43c2f]" : "border-line"}`}
            />
          </Labeled>
          <Labeled id={`${uid}-role`} label="Cargo (opcional)">
            <input
              id={`${uid}-role`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              autoComplete="organization-title"
              className={`${INPUT} border-line`}
            />
          </Labeled>
          <Labeled id={`${uid}-reach`} label="Correo o WhatsApp" required error={errors.reach}>
            <input
              id={`${uid}-reach`}
              value={reach}
              onChange={(e) => {
                setReach(e.target.value);
                setErrors((er) => ({ ...er, reach: undefined }));
              }}
              inputMode="email"
              autoComplete="email"
              placeholder="nombre@empresa.com o +51 9…"
              aria-invalid={!!errors.reach}
              aria-describedby={errors.reach ? `${uid}-reach-err` : undefined}
              className={`${INPUT} ${errors.reach ? "border-[#b43c2f]" : "border-line"}`}
            />
          </Labeled>
        </div>

        {meeting && (
          <p className="mt-5 rounded-button bg-paper/60 px-4 py-3 text-[13px] leading-[1.5] text-ink/80">
            <span className="[font-weight:600]">Reunión propuesta:</span> {meeting}
          </p>
        )}

        {errorCount > 0 && (
          <p role="alert" className="mt-5 text-[13px] leading-[1.5] text-[#b43c2f] [font-weight:600]">
            Revisa {errorCount === 1 ? "el campo marcado" : `los ${errorCount} campos marcados`}.
          </p>
        )}

        <button
          type="submit"
          className="btn-fill group mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-button bg-accent px-8 text-[12px] uppercase tracking-[0.16em] text-accent-ink [--fill:var(--brand-ink)] [font-weight:600] sm:w-auto"
        >
          <RollText text="Enviar solicitud" />
        </button>
        <p className="mt-4 text-[13px] uppercase tracking-[0.12em] text-accent [font-weight:600]">{contact.response}</p>
        <p className="mt-2 text-[12.5px] leading-[1.5] text-ink/65">{contact.disclaimer}</p>
      </fieldset>
    </form>
  );
}

function Labeled({
  id,
  label,
  required = false,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[14px] text-ink/85 [font-weight:600]">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
      {error && <ErrorText id={`${id}-err`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[13px] leading-[1.4] text-[#b43c2f]">
      {children}
    </p>
  );
}
