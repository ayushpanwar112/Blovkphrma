interface JwtPayload {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

interface AddressType {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
}

export type { JwtPayload, AddressType };
