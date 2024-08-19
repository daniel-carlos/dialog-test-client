import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { TimelinePage } from './pages/Timeline/TimelinePage'
import { LoginPage } from './pages/Login/LoginPage';
import { ReactNode } from 'react';
import { useMe } from './contexts/user/meContext';
import { DefaultLayout } from './components/layout/MainLayout';
import { string } from 'yup';

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): any => {

  const me = useMe()

  console.log("==========================================");
  console.log(me.me);
  console.log(me.token);
  console.log("==========================================");

  if (me.me === null || me.token === "") {
    return <Navigate to="/login" replace />;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
};

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feed" element={
            <ProtectedRoute>
              <TimelinePage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
