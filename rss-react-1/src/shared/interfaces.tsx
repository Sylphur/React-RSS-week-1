import { Gender } from './enums';

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  picture: string;
  country: string;
  accept: boolean;
}
export interface InitialState {
  form: FormState;
  touched: boolean;
}
export interface ValidationErrors {
  [key: string]: string
}