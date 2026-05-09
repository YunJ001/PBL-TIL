function AddForm() {
  return (
    <div className="add-form-container hidden">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="input-name">이름</label>
          <input type="text" id="input-name" placeholder="예: 홍아기사자" required />
        </div>
        <div className="form-group">
          <label htmlFor="input-part">파트</label>
          <select id="input-part">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-skills">관심 기술 (쉼표로 구분)</label>
          <input type="text" id="input-skills" placeholder="예: JavaScript, React, HTML/CSS" required />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-intro">한 줄 소개 (요약 카드)</label>
          <input type="text" id="input-intro" placeholder="예: 3주차 DOM 조작 연습 중!" required />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-bio">자기소개 (상세 카드)</label>
          <textarea id="input-bio" rows="4" placeholder="예: HTML/CSS로 구조를 만들고..." required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="input-email">Email</label>
          <input type="email" id="input-email" placeholder="예: lion@example.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="input-phone">Phone</label>
          <input type="text" id="input-phone" placeholder="예: 010-1234-5678" required />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-website">Website</label>
          <input type="url" id="input-website" placeholder="예: https://example.com" required />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-motto">한 마디</label>
          <input type="text" id="input-motto" placeholder="예: 데이터 바꾸면 화면도 바뀐다!" required />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-secondary">랜덤 값 채우기</button>
        <button className="btn btn-primary">추가하기</button>
        <button className="btn btn-secondary">취소</button>
      </div>
    </div>
  );
}

export default AddForm;