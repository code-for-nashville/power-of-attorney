declare var process: { env: { PUBLIC_URL: string, NODE_ENV: string, REACT_APP_MOCK_FORM: string, REACT_APP_FORM_STEP: number } }

  type AddressKeysType =
  | 'name'
  | 'street_address'
  | 'locality'
  | 'region'
  | 'postal_code'
  | 'phone_number'
  | 'relationship'

