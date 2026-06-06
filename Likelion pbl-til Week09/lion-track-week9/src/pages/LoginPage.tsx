import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<string | null>;
  onSignup: (email: string, password: string) => Promise<string | null>;
}

function LoginPage({ onLogin, onSignup }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  async function handleSubmit(email: string, password: string): Promise<string | null> {
    const err = mode === 'login'
      ? await onLogin(email, password)
      : await onSignup(email, password);
    if (!err) navigate('/');
    return err;
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Lion Track</h1>
      <p className="auth-subtitle">아기사자 명단을 관리하려면 로그인하세요</p>
      <AuthForm mode={mode} onSubmit={handleSubmit} onModeChange={setMode} />
    </div>
  );
}

export default LoginPage;