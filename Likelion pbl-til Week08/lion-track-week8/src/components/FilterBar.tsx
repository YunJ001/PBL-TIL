import type { ViewOptions } from '../types/lion';

interface FilterBarProps {
  viewOptions: ViewOptions;
  onViewChange: (key: keyof ViewOptions, value: string) => void;
}

function FilterBar({ viewOptions, onViewChange }: FilterBarProps) {
  return (
    <div className="view-options">
      <label className="view-option-label" htmlFor="filter-part">파트</label>
      <select
        id="filter-part"
        className="view-select"
        value={viewOptions.part}
        onChange={e => onViewChange('part', e.target.value)}
      >
        <option value="전체">전체</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Design">Design</option>
      </select>
      <label className="view-option-label" htmlFor="sort-order">정렬</label>
      <select
        id="sort-order"
        className="view-select"
        value={viewOptions.sort}
        onChange={e => onViewChange('sort', e.target.value)}
      >
        <option value="latest">최신 추가순</option>
        <option value="name">이름순</option>
      </select>
      <label className="view-option-label" htmlFor="search-input">검색</label>
      <input
        type="text"
        id="search-input"
        className="view-search"
        placeholder="이름으로 검색"
        value={viewOptions.search}
        onChange={e => onViewChange('search', e.target.value)}
      />
    </div>
  );
}

export default FilterBar;