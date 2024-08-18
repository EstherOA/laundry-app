export type Shift = "odd" | "even";

export interface StaffType {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  shift: Shift;
  dateCommenced: string;
  salary: number;
  createdAt: string;
}

export interface LoginResponse {
  token: string | null;
}

export interface LoginPayload {
  phoneNumber: string;
  password: string;
  otp: string;
}
