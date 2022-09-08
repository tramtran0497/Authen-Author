import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home } from './Pages/Home';
import { LogIn } from './Pages/LogIn';
import Register from './Pages/Register';


function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    </div>
  );
}

export default App;
