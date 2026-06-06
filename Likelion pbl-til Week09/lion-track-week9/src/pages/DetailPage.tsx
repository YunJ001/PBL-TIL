import { useParams, useNavigate } from 'react-router-dom';
import LionDetail from '../components/LionDetail';
import type { Lion } from '../types/lion';

interface DetailPageProps {
  lions: Lion[];
}

function DetailPage({ lions }: DetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lion = lions.find(l => l.id === id);

  if (!lion) {
    return (
      <div className="main-container">
        <div className="section-header">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>← 목록으로</button>
        </div>
        <p className="empty-state">아기 사자를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="section-header">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>← 목록으로</button>
      </div>
      <LionDetail lion={lion} />
    </div>
  );
}

export default DetailPage;