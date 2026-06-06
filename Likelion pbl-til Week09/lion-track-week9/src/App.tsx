import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import useLions from './hooks/useLions';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import './styles/style.css';

function App() {
  const { user, login, signup, logout } = useAuth();
  const { lions, fetchStatus, fetchErrorMsg, addLion, deleteLast, addRandom, refresh, retry } = useLions();

  return (
    <Routes>
      <Route path="/" element={
        <HomePage
          lions={lions}
          user={user}
          onAddLion={addLion}
          onDeleteLast={deleteLast}
          onAddRandom={addRandom}
          onRefresh={refresh}
          onLogout={logout}
          fetchStatus={fetchStatus}
          fetchErrorMsg={fetchErrorMsg}
          onRetry={retry}
        />
      } />
      <Route path="/lions/:id" element={<DetailPage lions={lions} />} />
      <Route path="/login" element={<LoginPage onLogin={login} onSignup={signup} />} />
    </Routes>
  );
}

export default App;