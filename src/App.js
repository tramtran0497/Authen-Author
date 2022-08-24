import './App.css';
import { LogIn } from './Pages/LogIn.tsx';
import {Register} from './Pages/Register.tsx';
import { Routes, Route} from 'react-router-dom';
import { Home } from './Pages/Home.tsx';

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
    </div>
  );
}

export default App;
