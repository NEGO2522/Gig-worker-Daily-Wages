import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase';
import Navbar from './components/Navbar';
import User from './components/User';
import Worker from './components/Worker';
import Home from './Pages/Home';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
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
                {user ? <User /> : <Navigate to="/" replace />}
              </main>
            </>
          } />
          <Route path="/worker" element={
            <>
              <Navbar />
              <main>
                {user ? <Worker /> : <Navigate to="/" replace />}
              </main>
            </>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;