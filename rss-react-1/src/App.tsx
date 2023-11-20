import './App.css';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/main/AppMain';
import { AppContextProvider } from './AppContext';
import { Provider } from 'react-redux';
import { store } from './state/store';

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Provider store={store}>
          <AppHeader></AppHeader>
          <AppMain></AppMain>
        </Provider>
      </AppContextProvider>
    </>
  );
};

export default App;
