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
  acceptTerm: false,
};
const initialState: InitialState = {
  form: initialForm,
  touched: false,
};

const compFormSlice = createSlice({
  name: 'components-form',
  initialState,
  reducers: {
    setComponentForm: (state, action: PayloadAction<FormState>) => {
      (state.form = action.payload), (state.touched = true);
    },
  },
});
export const compFormActions = compFormSlice.actions;
export default compFormSlice.reducer;
