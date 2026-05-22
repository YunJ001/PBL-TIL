import { useState } from 'react';

function useFetch() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [lastAction, setLastAction] = useState(null);

  async function execute(actionFn) {
    setLastAction({ fn: actionFn });
    setStatus('loading');
    setErrorMsg('');
    try {
      await actionFn();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e.message);
    }
  }

  function retry() {
    if (lastAction) execute(lastAction.fn);
  }

  return { status, errorMsg, execute, retry };
}

export default useFetch;