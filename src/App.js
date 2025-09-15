import { Board } from './Composants/Board';
import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { Login } from './Composants/Login';
import { Project } from './Composants/Project';
import { Register } from './Composants/Register';
import { Provider } from 'react-redux';
import store from './store/store'; 

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/dashboard" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
