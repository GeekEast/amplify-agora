// eslint-disable
// this is an auto generated file. This will be overwritten

export const getMarket = `query GetMarket($id: ID!) {
  getMarket(id: $id) {
    id
    name
    products {
      items {
        id
        description
        price
        shipped
        owner
        createdAt
      }
      nextToken
    }
    tags
    owner
    createdAt
  }
}
`;
export const listMarkets = `query ListMarkets(
  $filter: ModelMarketFilterInput
  $limit: Int
  $nextToken: String
) {
  listMarkets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      products {
        nextToken
      }
      tags
      owner
      createdAt
    }
    nextToken
  }
}
`;
export const getProduct = `query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    description
    market {
      id
      name
      products {
        nextToken
      }
      tags
      owner
      createdAt
    }
    file {
      bucket
      region
      key
    }
    price
    shipped
    owner
    createdAt
  }
}
`;
export const listProducts = `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      description
      market {
        id
        name
        tags
        owner
        createdAt
      }
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    orders {
      items {
        id
        username
        email
        registered
        createdAt
      }
      nextToken
    }
  }
}
`;
export const getShippingAddress = `query GetShippingAddress($id: ID!) {
  getShippingAddress(id: $id) {
    city
    country
    address_line1
    address_state
    address_zip
  }
}
`;
export const listShippingAddresss = `query ListShippingAddresss(
  $filter: ModelShippingAddressFilterInput
  $limit: Int
  $nextToken: String
) {
  listShippingAddresss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      city
      country
      address_line1
      address_state
      address_zip
    }
    nextToken
  }
}
`;
export const searchMarkets = `query SearchMarkets(
  $filter: SearchableMarketFilterInput
  $sort: SearchableMarketSortInput
  $limit: Int
  $nextToken: Int
) {
  searchMarkets(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      products {
        nextToken
      }
      tags
      owner
      createdAt
    }
    nextToken
  }
}
`;
