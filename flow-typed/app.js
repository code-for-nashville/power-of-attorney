declare var process: { env: { PUBLIC_URL: string, NODE_ENV: string } }

  type AddressKeysType =
  | 'name'
  | 'street_address'
  | 'locality'
  | 'region'
  | 'postal_code'
  | 'phone_number'
  | 'relationship'