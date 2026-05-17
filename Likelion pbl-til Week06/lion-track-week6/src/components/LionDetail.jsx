function LionDetail({ lion }) {
  return (
    <article className="detail-card">
      <h2>{lion.name}</h2>
      <p className="track-info"><span>{lion.part}</span> | LION TRACK</p>
      <div className="detail-content">
        <h4>자기소개</h4>
        <p>{lion.bio}</p>
      </div>
      <div className="detail-content">
        <h4>연락처</h4>
        <ul>
          <li>Email: {lion.email}</li>
          <li>Phone: {lion.phone}</li>
          <li><a href={lion.website} target="_blank" rel="noreferrer">{lion.website}</a></li>
        </ul>
      </div>
      <div className="detail-content">
        <h4>관심 기술</h4>
        <ul>
          {lion.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="detail-content">
        <h4>한 마디</h4>
        <p className="motto">{lion.motto}</p>
      </div>
    </article>
  );
}

export default LionDetail;