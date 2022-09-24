import './App.css';
import Signup from './components/Signup';
import LogIn from './components/Login';
import ProductFeed from './components/productFeed';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes> 
        <Route path="/Signup" element={<Signup />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/productFeed" element={<ProductFeed />} />

        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
