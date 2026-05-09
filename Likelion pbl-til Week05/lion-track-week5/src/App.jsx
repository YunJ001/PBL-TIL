import { lions } from './data/lions';
import ControlPanel from './components/ControlPanel';
import FilterBar from './components/FilterBar';
import AddForm from './components/AddForm';
import LionCard from './components/LionCard';
import LionDetail from './components/LionDetail';
import './styles/style.css';

function App() {
  return (
    <div className="main-container">
      <ControlPanel total={lions.length} />
      <FilterBar />
      <AddForm />
      <section className="summary-grid">
        {lions.map((lion) => (
          <LionCard key={lion.name} lion={lion} />
        ))}
      </section>
      <hr className="divider" />
      <section className="detail-list">
        {lions.map((lion) => (
          <LionDetail key={lion.name} lion={lion} />
        ))}
      </section>
    </div>
  );
}

export default App;