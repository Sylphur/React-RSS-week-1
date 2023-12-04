import { compFormActions } from './reducers/componentsFormSlice';
import { hookFormActions } from './reducers/hooksFormSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { RootState } from './store';

const actions = {
  ...compFormActions,
  ...hookFormActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
