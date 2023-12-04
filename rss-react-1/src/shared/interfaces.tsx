import { Gender } from './enums';

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  picture: string | FileList;
  country: string;
  acceptTerm: boolean;
}
export interface InitialState {
  form: FormState;
  touched: boolean;
}
export interface ValidationErrors {
  [key: string]: string;
}
