import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase';
import Navbar from './components/Navbar';
import User from './components/User';
import Worker from './components/Worker';
import Home from './Pages/Home';

export const AuthContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route 
              path="/" 
              element={
                <main>
                  <Home />
                </main>
              } 
            />
            <Route 
              path="/user" 
              element={
                user ? (
                  <>
                    <Navbar />
                    <main className="pt-16">
                      <User />
                    </main>
                  </>
                ) : (
                  <Navigate to="/" replace state={{ from: 'user' }} />
                )
              } 
            />
            <Route 
              path="/worker" 
              element={
                user ? (
                  <>
                    <Navbar />
                    <main className="pt-16">
                      <Worker />
                    </main>
                  </>
                ) : (
                  <Navigate to="/" replace state={{ from: 'worker' }} />
                )
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;