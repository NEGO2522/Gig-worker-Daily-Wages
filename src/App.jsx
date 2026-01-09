import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import User from './components/User';
import Worker from './components/Worker';
import Home from './Pages/Home';

function App() {

  return (
    <Router basename="/">
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <main>
              <Home />
            </main>
          } />
          <Route path="/user" element={
            <>
              <Navbar />
              <main>
                <User />
              </main>
            </>
          } />
          <Route path="/worker" element={
            <main>
              <Worker />
            </main>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;