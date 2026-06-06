import { useNavigate } from 'react-router-dom';
import type { Lion } from '../types/lion';

interface LionCardProps {
  lion: Lion;
}

function LionCard({ lion }: LionCardProps) {
  const navigate = useNavigate();
  return (
      <article className={`summary-card${lion.isMe ? ' my-card' : ''}`}
      onClick={() => navigate(`/lions/${lion.id}`)}>
      <div className="image-container">
        <img src={lion.image} alt="프로필" />
        <span className="badge">{lion.skills[0]}</span>
      </div>
      <div className="summary-info">
        <h3>{lion.name}</h3>
        <p className="part">{lion.part}</p>
        <p className="intro">{lion.intro}</p>
      </div>
      </article>
  );
}

export default LionCard;