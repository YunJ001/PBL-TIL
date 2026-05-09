function FilterBar() {
  return (
    <div className="view-options">
      <label className="view-option-label" htmlFor="filter-part">파트</label>
      <select id="filter-part" className="view-select">
        <option value="전체">전체</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Design">Design</option>
      </select>
      <label className="view-option-label" htmlFor="sort-order">정렬</label>
      <select id="sort-order" className="view-select">
        <option value="latest">최신추가순</option>
        <option value="name">이름순</option>
      </select>
      <label className="view-option-label" htmlFor="search-input">검색</label>
      <input type="text" id="search-input" className="view-search" placeholder="이름으로 검색" />
    </div>
  );
}

export default FilterBar;