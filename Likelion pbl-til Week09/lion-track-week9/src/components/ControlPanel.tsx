import type { FetchStatus } from '../types/lion';

interface ControlPanelProps {
  total: number;
  isFormOpen: boolean;
  isAuthenticated: boolean;
  onAddClick: () => void;
  onDeleteLast: () => void;
  onAddRandom: (count: number) => void;
  onRefresh: () => void;
  fetchStatus: FetchStatus;
  fetchErrorMsg: string;
  onRetry: () => void;
}

function ControlPanel({
  total, isFormOpen, isAuthenticated, onAddClick, onDeleteLast,
  onAddRandom, onRefresh, fetchStatus, fetchErrorMsg, onRetry,
}: ControlPanelProps) {
  const isLoading = fetchStatus === 'loading';
  const isDisabled = !isAuthenticated || isLoading;

  const statusText =
    fetchStatus === 'loading' ? '불러오는 중...' :
    fetchStatus === 'success' ? '완료!' :
    fetchStatus === 'error'   ? `불러오기 실패: ${fetchErrorMsg}` :
    '준비 완료';

  const statusClass =
    fetchStatus === 'loading' ? 'loading' :
    fetchStatus === 'success' ? 'success' :
    fetchStatus === 'error'   ? 'error' : '';

  return (
    <>
      <div className="section-header">
        <button className={`btn btn-primary${isFormOpen ? ' active' : ''}`} onClick={onAddClick} disabled={isDisabled} title={!isAuthenticated ? '로그인이 필요합니다' : ''}>
          아기 사자 추가
        </button>
        <button className="btn btn-secondary" onClick={onDeleteLast} disabled={isDisabled} title={!isAuthenticated ? '로그인이 필요합니다' : ''}>
          마지막 아기 사자 삭제
        </button>
        <span className="total-count">총 {total}명</span>
      </div>
      <div className="section-header">
        <button className="btn btn-secondary" onClick={() => onAddRandom(1)} disabled={isDisabled} title={!isAuthenticated ? '로그인이 필요합니다' : ''}>
          랜덤 1명 추가
        </button>
        <button className="btn btn-secondary" onClick={() => onAddRandom(5)} disabled={isDisabled} title={!isAuthenticated ? '로그인이 필요합니다' : ''}>
          랜덤 5명 추가
        </button>
        <button className="btn btn-secondary" onClick={onRefresh} disabled={isDisabled} title={!isAuthenticated ? '로그인이 필요합니다' : ''}>
          전체 새로고침
        </button>
        <span className={`fetch-status${statusClass ? ` ${statusClass}` : ''}`}>
          {statusText}
        </span>
        {fetchStatus === 'error' && (
          <button className="btn btn-secondary" onClick={onRetry}>재시도</button>
        )}
      </div>
    </>
  );
}

export default ControlPanel;