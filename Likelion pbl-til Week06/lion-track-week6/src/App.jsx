import { useState, useEffect } from 'react';
import { lions as initialLions } from './data/lions';
import { createId, transformUser, applyViewOptions } from './utils/lionUtils';
import useFetch from './hooks/useFetch';
import ControlPanel from './components/ControlPanel';
import FilterBar from './components/FilterBar';
import AddForm from './components/AddForm';
import LionCard from './components/LionCard';
import LionDetail from './components/LionDetail';
import './styles/style.css';

const API_URL = (n) => `https://randomuser.me/api/?results=${n}&nat=us,gb,ca,au,nz`;

function App() {
  const [lions, setLions] = useState(() =>
    initialLions.map(l => ({ ...l, id: createId() }))
  );
  const [showForm, setShowForm] = useState(false);
  const [viewOptions, setViewOptions] = useState({ part: '전체', sort: 'latest', search: '' });
  const { status, errorMsg, execute, retry } = useFetch();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setShowForm(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  function handleAddLion(lion) {
    setLions(prev => [...prev, { ...lion, id: createId() }]);
    setShowForm(false);
  }

  function handleDeleteLast() {
    setLions(prev => (prev.length > 0 ? prev.slice(0, -1) : prev));
  }

  function handleAddRandom(count) {
    execute(async () => {
      const res = await fetch(API_URL(count));
      if (!res.ok) throw new Error('네트워크 오류');
      const data = await res.json();
      setLions(prev => [...prev, ...data.results.map(transformUser)]);
    });
  }

  function handleRefresh() {
    const myCards = lions.filter(l => l.isMe);
    const fetchCount = lions.length - myCards.length;

    execute(async () => {
      const res = await fetch(API_URL(Math.max(fetchCount, 1)));
      if (!res.ok) throw new Error('네트워크 오류');
      const data = await res.json();
      const newLions = data.results.slice(0, fetchCount).map(transformUser);
      setLions([...newLions, ...myCards]);
    });
  }

  function handleViewChange(key, value) {
    setViewOptions(prev => ({ ...prev, [key]: value }));
  }

  const displayedLions = applyViewOptions(lions, viewOptions);

  return (
    <div className="main-container">
      <ControlPanel
        total={lions.length}
        isFormOpen={showForm}
        onAddClick={() => setShowForm(prev => !prev)}
        onDeleteLast={handleDeleteLast}
        onAddRandom={handleAddRandom}
        onRefresh={handleRefresh}
        fetchStatus={status}
        fetchErrorMsg={errorMsg}
        onRetry={retry}
      />
      <FilterBar viewOptions={viewOptions} onViewChange={handleViewChange} />
      {showForm && (
        <AddForm onAdd={handleAddLion} onCancel={() => setShowForm(false)} />
      )}
      <section className="summary-grid">
        {displayedLions.length === 0 ? (
          <p className="empty-state">조건에 맞는 아기 사자가 없습니다.</p>
        ) : (
          displayedLions.map(lion => <LionCard key={lion.id} lion={lion} />)
        )}
      </section>
      <hr className="divider" />
      <section className="detail-list">
        {displayedLions.map(lion => <LionDetail key={lion.id} lion={lion} />)}
      </section>
    </div>
  );
}

export default App;