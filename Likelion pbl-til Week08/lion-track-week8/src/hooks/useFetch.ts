import { useState } from 'react';
import type { FetchStatus } from '../types/lion';

interface LastAction {
  fn: () => Promise<void>;
}

interface UseFetchReturn {
  status: FetchStatus;
  errorMsg: string;
  execute: (actionFn: () => Promise<void>) => Promise<void>;
  retry: () => void;
}

function useFetch(): UseFetchReturn {
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [lastAction, setLastAction] = useState<LastAction | null>(null);

  async function execute(actionFn: () => Promise<void>): Promise<void> {
    setLastAction({ fn: actionFn });
    setStatus('loading');
    setErrorMsg('');
    try {
      await actionFn();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : '알 수 없는 오류');
    }
  }

  function retry(): void {
    if (lastAction) execute(lastAction.fn);
  }

  return { status, errorMsg, execute, retry };
}

export default useFetch;