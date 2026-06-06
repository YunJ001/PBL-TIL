import { useState } from 'react';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (email: string, password: string) => Promise<string | null>;
  onModeChange: (mode: 'login' | 'signup') => void;
}

function AuthForm({ mode, onSubmit, onModeChange }: AuthFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(): Promise<void> {
    setError('');
    if (mode === 'signup') {
      if (password.length < 6) {
        setError('비밀번호는 6자 이상이어야 합니다.');
        return;
      }
      if (password !== confirm) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
    }
    setLoading(true);
    const err = await onSubmit(email, password);
    setLoading(false);
    if (err) setError(err);
  }

  return (
    <div className="auth-form">
      <h2>{mode === 'login' ? '로그인' : '회원가입'}</h2>
      <div className="auth-field">
        <label>이메일</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </div>
      <div className="auth-field">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="6자 이상"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </div>
      {mode === 'signup' && (
        <div className="auth-field">
          <label>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호 재입력"
            value={confirm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)}
          />
        </div>
      )}
      {error && <p className="auth-error">{error}</p>}
      <button className="btn btn-primary auth-submit" onClick={handleSubmit} disabled={loading}>
        {mode === 'login' ? '로그인' : '회원가입'}
      </button>
      {mode === 'login' ? (
        <p className="auth-switch">
          계정이 없으신가요?{' '}
          <span className="auth-link" onClick={() => { setError(''); onModeChange('signup'); }}>회원가입</span>
        </p>
      ) : (
        <p className="auth-switch">
          이미 계정이 있으신가요?{' '}
          <span className="auth-link" onClick={() => { setError(''); onModeChange('login'); }}>로그인</span>
        </p>
      )}
    </div>
  );
}

export default AuthForm;