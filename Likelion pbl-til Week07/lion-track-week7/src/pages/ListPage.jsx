import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { applyViewOptions } from '../utils/lionUtils';
import ControlPanel from '../components/ControlPanel';
import FilterBar from '../components/FilterBar';
import AddForm from '../components/AddForm';
import LionCard from '../components/LionCard';

function ListPage({
  lions, onAddLion, onDeleteLast, onAddRandom, onRefresh,
  fetchStatus, fetchErrorMsg, onRetry,
}) {
  const [showForm, setShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL → 상태 (없으면 기본값)
  const part   = searchParams.get('part') || '전체';
  const sort   = searchParams.get('sort') || 'latest';
  const search = searchParams.get('q')    || '';
  const viewOptions = { part, sort, search };

  // ESC로 폼 닫기
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setShowForm(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 상태 → URL (기본값이면 파라미터 삭제)
  function handleViewChange(key, value) {
    const defaults = { part: '전체', sort: 'latest', search: '' };
    const paramKey = key === 'search' ? 'q' : key;
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value === defaults[key]) {
        next.delete(paramKey);
      } else {
        next.set(paramKey, value);
      }
      return next;
    });
  }

  function handleAdd(lion) {
    onAddLion(lion);
    setShowForm(false);
  }

  const displayedLions = applyViewOptions(lions, viewOptions);

  return (
    <div className="main-container">
      <ControlPanel
        total={lions.length}
        isFormOpen={showForm}
        onAddClick={() => setShowForm(prev => !prev)}
        onDeleteLast={onDeleteLast}
        onAddRandom={onAddRandom}
        onRefresh={onRefresh}
        fetchStatus={fetchStatus}
        fetchErrorMsg={fetchErrorMsg}
        onRetry={onRetry}
      />
      <FilterBar viewOptions={viewOptions} onViewChange={handleViewChange} />
      {showForm && <AddForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />}
      <section className="summary-grid">
        {displayedLions.length === 0 ? (
          <p className="empty-state">조건에 맞는 아기 사자가 없습니다.</p>
        ) : (
          displayedLions.map(lion => <LionCard key={lion.id} lion={lion} />)
        )}
      </section>
    </div>
  );
}

export default ListPage;