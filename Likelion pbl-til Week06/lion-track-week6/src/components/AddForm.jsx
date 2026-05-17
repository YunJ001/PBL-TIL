import { useState } from 'react';
import { transformUser } from '../utils/lionUtils';

const INITIAL_FORM = {
  name: '', part: 'Frontend', skills: '', intro: '',
  bio: '', email: '', phone: '', website: '', motto: '',
};

function AddForm({ onAdd, onCancel }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isFilling, setIsFilling] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const isComplete = Object.values(form).every(v => String(v).trim() !== '');
    if (!isComplete) return;
    onAdd({
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      image: 'https://i.imgur.com/GO50UpY.png',
      isMe: false,
    });
  }

  async function handleFillRandom() {
    setIsFilling(true);
    try {
      const res = await fetch('https://randomuser.me/api/?results=1&nat=us,gb,ca,au,nz');
      if (!res.ok) throw new Error();
      const data = await res.json();
      const lion = transformUser(data.results[0]);
      setForm({
        name: lion.name,
        part: lion.part,
        skills: lion.skills.join(', '),
        intro: lion.intro,
        bio: lion.bio,
        email: lion.email,
        phone: lion.phone,
        website: lion.website,
        motto: lion.motto,
      });
    } catch {
      // 실패 시 무시
    } finally {
      setIsFilling(false);
    }
  }

  return (
    <div className="add-form-container">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="input-name">이름</label>
          <input type="text" id="input-name" name="name" value={form.name} onChange={handleChange} placeholder="예: 홍아기사자" />
        </div>
        <div className="form-group">
          <label htmlFor="input-part">파트</label>
          <select id="input-part" name="part" value={form.part} onChange={handleChange}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-skills">관심 기술 (쉼표로 구분)</label>
          <input type="text" id="input-skills" name="skills" value={form.skills} onChange={handleChange} placeholder="예: JavaScript, React, HTML/CSS" />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-intro">한 줄 소개 (요약 카드)</label>
          <input type="text" id="input-intro" name="intro" value={form.intro} onChange={handleChange} placeholder="예: 3주차 DOM 조작 연습 중!" />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-bio">자기소개 (상세 카드)</label>
          <textarea id="input-bio" name="bio" value={form.bio} onChange={handleChange} rows="4" placeholder="예: HTML/CSS로 구조를 만들고..." />
        </div>
        <div className="form-group">
          <label htmlFor="input-email">Email</label>
          <input type="email" id="input-email" name="email" value={form.email} onChange={handleChange} placeholder="예: lion@example.com" />
        </div>
        <div className="form-group">
          <label htmlFor="input-phone">Phone</label>
          <input type="text" id="input-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="예: 010-1234-5678" />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-website">Website</label>
          <input type="url" id="input-website" name="website" value={form.website} onChange={handleChange} placeholder="예: https://example.com" />
        </div>
        <div className="form-group form-full">
          <label htmlFor="input-motto">한 마디</label>
          <input type="text" id="input-motto" name="motto" value={form.motto} onChange={handleChange} placeholder="예: 데이터 바꾸면 화면도 바뀐다!" />
        </div>
      </div>
      <div className="form-actions">
        <button className="btn btn-secondary" onClick={handleFillRandom} disabled={isFilling}>
          랜덤 값 채우기
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>추가하기</button>
        <button className="btn btn-secondary" onClick={onCancel}>취소</button>
      </div>
    </div>
  );
}

export default AddForm;