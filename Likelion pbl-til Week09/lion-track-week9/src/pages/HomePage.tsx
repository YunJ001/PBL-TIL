import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { applyViewOptions } from '../utils/lionUtils';
import ControlPanel from '../components/ControlPanel';
import FilterBar from '../components/FilterBar';
import AddForm from '../components/AddForm';
import LionCard from '../components/LionCard';
import type { Lion, PartFilter, SortOrder, ViewOptions, FetchStatus } from '../types/lion';
import type { User } from '@supabase/supabase-js';  // 상단 import에 추가

interface HomePageProps {
  lions: Lion[];
  user: User | null;                               // 추가
  onAddLion: (lion: Omit<Lion, 'id'>) => void;
  onDeleteLast: () => void;
  onAddRandom: (count: number) => void;
  onRefresh: () => void;
  onLogout: () => Promise<void>;                   // 추가
  fetchStatus: FetchStatus;
  fetchErrorMsg: string;
  onRetry: () => void;
}

function HomePage({
  lions, user, onAddLion, onDeleteLast, onAddRandom, onRefresh,
  onLogout, fetchStatus, fetchErrorMsg, onRetry,
}: HomePageProps) {
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
      {user ? (
        <div className="user-header">
          <span>{user.email}</span>
          <button className="btn btn-secondary" onClick={onLogout}>로그아웃</button>
        </div>
      ) : (
        <div className="auth-banner">
          명단을 수정하려면 <a href="/login">로그인</a>이 필요합니다.
        </div>
      )}
      <ControlPanel
        isAuthenticated={!!user}
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

export default HomePage;