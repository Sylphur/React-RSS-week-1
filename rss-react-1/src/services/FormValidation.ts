import * as yup from 'yup';
import { Gender } from '../shared/enums';

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Only positive number')
    .integer('Only whole numbers are allowed')
    .typeError('Only numbers are allowed'),
  country: yup.string().required('Country is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/^(?=.*[!@#%&$^*()?><|+=])/, 'Need one special character')
    .matches(/^(?=.*[0-9])/, 'Need one digit')
    .matches(/^(?=.*[a-z])/, 'Need one lower case letter')
    .matches(/^(?=.*[A-Z])/, 'Need one upper case letter'),
  confirm: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Password not correct'),
  acceptTerm: yup.boolean().required('This field is required').oneOf([true]),
  gender: yup.mixed<Gender>().required('Gender is required'),
  picture: yup
    .mixed<FileList>()
    .required('Picture is required')
    .test('extension', 'Image required', (value) => {
      return value.length >= 1;
    })
    .test(
      'extension',
      'Only the following formats are accepted: .jpeg, .png',
      (value) => {
        if (!value.length) return false;
        return (
          value &&
          (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
        );
      }
    )
    .test('pictureSize', 'This file is too large', (value) => {
      if (!value.length) return false;

      return value && value[0].size <= 2000000;
    }),
});
