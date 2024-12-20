import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages & Components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage'; // Combine Login and Register here
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/workouts" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<AuthPage />} /> {/* This is the shared page */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
