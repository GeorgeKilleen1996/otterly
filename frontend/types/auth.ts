export interface LoginDetails {
  email: string;
  password: string;
}

export interface TokenDetails {
  is_verified?: boolean
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

export interface UserDetails extends LoginDetails {
  first_name: string
  last_name: string
  confirm_password: string
}