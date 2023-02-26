import './App.css';

import LoginPage from './Components/LoginPage';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './Components/Register';
import Main from './Components/Main';
import Sell from './Components/Sell';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/main' element={<Main/>} />
      <Route path='/sell' element={<Sell/>} />
     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
