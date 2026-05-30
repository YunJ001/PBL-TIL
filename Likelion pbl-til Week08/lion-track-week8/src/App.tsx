import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { lions as initialLions } from './data/lions';
import { createId, transformUser } from './utils/lionUtils';
import useFetch from './hooks/useFetch';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import type { Lion, RandomUserResponse } from './types/lion';
import './styles/style.css';

const API_URL = (n: number): string =>
  `https://randomuser.me/api/?results=${n}&nat=us,gb,ca,au,nz`;

function App() {
  const [lions, setLions] = useState<Lion[]>(() =>
    initialLions.map(l => ({ ...l, id: createId() }))
  );
  const { status, errorMsg, execute, retry } = useFetch();

  function handleAddLion(lion: Omit<Lion, 'id'>): void {
    setLions(prev => [...prev, { ...lion, id: createId() }]);
  }

  function handleDeleteLast(): void {
    setLions(prev => (prev.length > 0 ? prev.slice(0, -1) : prev));
  }

  function handleAddRandom(count: number): void {
    execute(async () => {
      const res = await fetch(API_URL(count));
      if (!res.ok) throw new Error('네트워크 오류');
      const data: RandomUserResponse = await res.json();
      setLions(prev => [...prev, ...data.results.map(transformUser)]);
    });
  }

  function handleRefresh(): void {
    const myCards = lions.filter(l => l.isMe);
    const fetchCount = lions.length - myCards.length;
    execute(async () => {
      const res = await fetch(API_URL(Math.max(fetchCount, 1)));
      if (!res.ok) throw new Error('네트워크 오류');
      const data: RandomUserResponse = await res.json();
      const newLions = data.results.slice(0, fetchCount).map(transformUser);
      setLions([...newLions, ...myCards]);
    });
  }

  return (
    <Routes>
      <Route path="/" element={
        <ListPage
          lions={lions}
          onAddLion={handleAddLion}
          onDeleteLast={handleDeleteLast}
          onAddRandom={handleAddRandom}
          onRefresh={handleRefresh}
          fetchStatus={status}
          fetchErrorMsg={errorMsg}
          onRetry={retry}
        />
      } />
      <Route path="/lions/:id" element={<DetailPage lions={lions} />} />
    </Routes>
  );
}

export default App;