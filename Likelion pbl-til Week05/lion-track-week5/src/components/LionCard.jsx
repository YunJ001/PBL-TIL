function LionCard({ lion }) {
  return (
    <article className={`summary-card${lion.isMe ? ' my-card' : ''}`}>
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