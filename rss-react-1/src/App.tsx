import './App.css';
import AppHeader from './components/header/AppHeader';
import AppMain from './components/main/AppMain';
// import { useSearchParams } from 'react-router-dom';
// import { possiblePageSize } from './shared/constants';
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
