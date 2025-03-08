// Authentication interfaces
export interface BaseAccount {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  isSuperuser: boolean;
}

export interface LoginRequestResponse {
  status: 'loggedIn' | 'twoFactorRequired' | 'error'
  session?: string
}

export interface LoginInformation {
  token: string
  account: BaseAccount
}

export interface LoginState {
  loggedIn: boolean
  account: BaseAccount | null
}

export interface LoginDetails {
  email: string
  password: string
}

export interface TokenDetails {
  two_factor_required?: boolean
  token?: string
  session?: string
}