import { FC } from 'react';
import { TableActivity } from '../models';
import './ActivitiesTable.scss';

type TableColumn = {
  key: string,
  translation: string
}

type ActivitiesTableProps = {
  columns: TableColumn[];
  items: TableActivity[];
}

export const ActivitiesTable: FC<ActivitiesTableProps> = ({ columns, items = [] }) => {
  const columnsConfig = Object.values(columns);

  const mapToRow = (data: TableActivity) => {
    return columnsConfig.map((column) => <td key={column.key}>{data[column.key as never]}</td>);
  }

  return <div className="activities-table__container">
    <table>
      <thead>
        <tr>
          {columnsConfig.map((column) => <th key={column.key}>{column.translation}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.map((item) =>
          <tr key={item.id} className="activities-table__row">
            {mapToRow(item)}
          </tr>
        )}
      </tbody>
    </table>
  </div>;
}
