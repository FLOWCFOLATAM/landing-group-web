export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SitePartsFragmentDoc = gql`
    fragment SiteParts on Site {
  __typename
  brand {
    __typename
    name
    group
    legal
    tagline
  }
  primaryCta {
    __typename
    label
    href
  }
  nav {
    __typename
    links {
      __typename
      label
      href
      children {
        __typename
        label
        href
      }
    }
  }
  hero {
    __typename
    title
    accents
    script
    sub
    tiles {
      __typename
      label
      note
    }
  }
  marquee
  solutions {
    __typename
    label
    title
    intro
    items {
      __typename
      slug
      name
      promise
      body
      photo
      solves
      includes {
        __typename
        icon
        title
        text
      }
      how {
        __typename
        title
        text
        href
      }
      cases
    }
  }
  howWeWork {
    __typename
    label
    title
    intro
    pageTitle
    pageIntro
    items {
      __typename
      id
      name
      role
      body
      href
      photo
      detail {
        __typename
        claim
        intro
        bullets
        gallery {
          __typename
          src
          alt
        }
      }
    }
  }
  cases {
    __typename
    label
    title
    intro
    items {
      __typename
      slug
      brand
      category
      solution
      title
      need
      answer
      execution
      pieces
      cover
      gallery {
        __typename
        src
        alt
      }
    }
  }
  works {
    __typename
    label
    items {
      __typename
      src
      brand
      piece
      desc
    }
  }
  process {
    __typename
    label
    title
    steps {
      __typename
      n
      title
      body
    }
  }
  stats {
    __typename
    label
    title
    intro
    items {
      __typename
      value
      label
    }
  }
  cta {
    __typename
    title
    body
  }
  contact {
    __typename
    label
    title
    script
    intro
    whatsapp
    whatsappMessage
    email
    emailSubject
    instagram
    linkedin
    response
  }
  footer {
    __typename
    columns {
      __typename
      title
      links {
        __typename
        label
        href
      }
    }
    note
  }
}
    `;
export const SiteDocument = gql`
    query site($relativePath: String!) {
  site(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteParts
  }
}
    ${SitePartsFragmentDoc}`;
export const SiteConnectionDocument = gql`
    query siteConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteFilter) {
  siteConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteParts
      }
    }
  }
}
    ${SitePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    site(variables, options) {
      return requester(SiteDocument, variables, options);
    },
    siteConnection(variables, options) {
      return requester(SiteConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
