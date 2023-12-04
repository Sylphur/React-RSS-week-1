import './App.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
};

export default App;
