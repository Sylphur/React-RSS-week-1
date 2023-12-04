import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, InitialState } from '../../shared/interfaces';
import { Gender } from '../../shared/enums';

const initialForm: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: Gender.Male,
  picture: '',
  country: '',
  accept: false,
};
const initialState: InitialState = {
  form: initialForm,
  touched: false,
};

const hookFormSlice = createSlice({
  name: 'hooks-form',
  initialState,
  reducers: {
    setHookForm: (state, action: PayloadAction<FormState>) => {
      (state.form = action.payload), (state.touched = true);
    },
  },
});
export const hookFormActions = hookFormSlice.actions;
export default hookFormSlice.reducer;
