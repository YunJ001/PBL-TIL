import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { applyViewOptions } from '../utils/lionUtils';
import ControlPanel from '../components/ControlPanel';
import FilterBar from '../components/FilterBar';
import AddForm from '../components/AddForm';
import LionCard from '../components/LionCard';
import type { Lion, PartFilter, SortOrder, ViewOptions, FetchStatus } from '../types/lion';

interface ListPageProps {
  lions: Lion[];
  onAddLion: (lion: Omit<Lion, 'id'>) => void;
  onDeleteLast: () => void;
  onAddRandom: (count: number) => void;
  onRefresh: () => void;
  fetchStatus: FetchStatus;
  fetchErrorMsg: string;
  onRetry: () => void;
}

function ListPage({
  lions, onAddLion, onDeleteLast, onAddRandom, onRefresh,
  fetchStatus, fetchErrorMsg, onRetry,
}: ListPageProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const part = (searchParams.get('part') ?? '전체') as PartFilter;
  const sort = (searchParams.get('sort') ?? 'latest') as SortOrder;
  const search = searchParams.get('q') ?? '';
  const viewOptions: ViewOptions = { part, sort, search };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') setShowForm(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleViewChange(key: keyof ViewOptions, value: string): void {
    const defaults: Record<keyof ViewOptions, string> = { part: '전체', sort: 'latest', search: '' };
    const paramKey = key === 'search' ? 'q' : key;
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value === defaults[key]) { next.delete(paramKey); }
      else { next.set(paramKey, value); }
      return next;
    });
  }

  function handleAdd(lion: Omit<Lion, 'id'>): void {
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