import './App.css';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/main/AppMain';
import { AppContextProvider } from './AppContext';

const App = () => {
  return (
    <>
      <AppContextProvider>
        <>
          <AppHeader
          ></AppHeader>
          <AppMain
        ></AppMain>
        </>
      </AppContextProvider>
    </>
  );
};

export default App;
