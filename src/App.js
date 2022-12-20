import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Contacts from './components/Contacts';
import LogIn from './components/LogIn';
import Register from './components/Register';
import { APP_ROUTES } from './utils/constants';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to={APP_ROUTES.CONTACTS} />} />
        <Route path={APP_ROUTES.REGISTER} exact element={<Register />} />
        <Route path={APP_ROUTES.LOGIN} element={<LogIn />} />
        <Route path={APP_ROUTES.CONTACTS} element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;