import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import RegisterPage from './pages/registerPage'
import Cloudspell from './pages/cloudspell';

function App() {

console.clear();

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={ <LoginPage /> } />
        <Route path="/main_homepage/:username" element={ <HomePage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/gramma" element = { <Cloudspell/> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
