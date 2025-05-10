export interface LoginDetails {
  email: string;
  password: string;
}

export interface TokenDetails {
  two_factor_required?: boolean
  token?: string
  session?: string
}

export interface User {
  first_name: string
  last_name: string
  email: string
  is_staff: boolean
  is_verified: boolean
  date_joined: Date
  created_at: Date
  updated_at: Date
}