import { FC, useEffect } from 'react';
import { useInputValue } from '../hooks/useInputValue';
import { useDebounce } from '../hooks/useDebounce';
import './ActivitiesTableMenu.scss';

type ActivitiesTableMenuProps = {
  onSearch: (query: string) => void;
}

export const ActivitiesTableMenu: FC<ActivitiesTableMenuProps> = ({ onSearch }) => {
  const { value, onChange } = useInputValue('');
  const lastValue = useDebounce(value, 500);

  useEffect(() => {
    onSearch(lastValue);
  }, [onSearch, lastValue])

  return <div className="activities-table-menu">
    <div className="activities-table-menu__search">
      <input
        autoFocus
        onChange={onChange}
        placeholder="Search..."
        type="text"
        value={value}  />
    </div>
  </div>;
}