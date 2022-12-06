export type User = {
  id: string;
  first_name: string;
  last_name: string;
  street: string;
  number: number;
  postcode: number;
  city: string;
  insurance_number?: string;
  insurance?: string;
  approbation?: string;
  verified?: boolean;
};
