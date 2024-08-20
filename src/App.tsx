import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { TimelinePage } from './pages/Timeline/TimelinePage'
import { LoginPage } from './pages/Login/LoginPage';
import { ReactNode } from 'react';
import { useAuth } from './contexts/auth/authContext';
import { DefaultLayout } from './components/layout/MainLayout';

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): any => {

  const auth = useAuth()
  if (auth.me === null || auth.token === "") {
    return <Navigate to="/login" replace />;
  }
  return <DefaultLayout>{children}</DefaultLayout>;

};

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <TimelinePage />
            </ProtectedRoute>}
          />
          <Route path="/feed" element={
            <ProtectedRoute>
              <TimelinePage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
