function ControlPanel({ total }) {
  return (
    <>
      <div className="section-header">
        <button className="btn btn-primary">아기 사자 추가</button>
        <button className="btn btn-secondary">마지막 아기 사자 삭제</button>
        <span className="total-count">총 {total}명</span>
      </div>
      <div className="section-header">
        <button className="btn btn-secondary">랜덤 1명 추가</button>
        <button className="btn btn-secondary">랜덤 5명 추가</button>
        <button className="btn btn-secondary">전체 새로고침</button>
        <span className="fetch-status">준비 완료</span>
        <button className="btn btn-secondary hidden">재시도</button>
      </div>
    </>
  );
}

export default ControlPanel;