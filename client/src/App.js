  import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import RegisterPage from './pages/registerPage'
import Cloudspell from './pages/cloudspell';
import Start from './pages/start';

function App() {
  
console.clear();

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/main_homepage/:username" element={ <HomePage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/gramma" element = { <Cloudspell/> }></Route>
        <Route path="/" element = {<Start/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
