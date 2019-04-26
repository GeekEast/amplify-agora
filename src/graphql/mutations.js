// eslint-disable
// this is an auto generated file. This will be overwritten

export const createMarket = `mutation CreateMarket($input: CreateMarketInput!) {
  createMarket(input: $input) {
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
export const updateMarket = `mutation UpdateMarket($input: UpdateMarketInput!) {
  updateMarket(input: $input) {
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
export const deleteMarket = `mutation DeleteMarket($input: DeleteMarketInput!) {
  deleteMarket(input: $input) {
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
export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
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
export const registerUser = `mutation RegisterUser($input: CreateUserInput!) {
  registerUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const createOrder = `mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    username
    email
    registered
    product {
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
    user {
      id
      orders {
        nextToken
      }
    }
    shippingAddress {
      city
      country
      address_line1
      address_state
      address_zip
    }
    createdAt
  }
}
`;
export const createShippingAddress = `mutation CreateShippingAddress($input: CreateShippingAddressInput!) {
  createShippingAddress(input: $input) {
    city
    country
    address_line1
    address_state
    address_zip
  }
}
`;
export const updateShippingAddress = `mutation UpdateShippingAddress($input: UpdateShippingAddressInput!) {
  updateShippingAddress(input: $input) {
    city
    country
    address_line1
    address_state
    address_zip
  }
}
`;
export const deleteShippingAddress = `mutation DeleteShippingAddress($input: DeleteShippingAddressInput!) {
  deleteShippingAddress(input: $input) {
    city
    country
    address_line1
    address_state
    address_zip
  }
}
`;
