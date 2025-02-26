import React, { MouseEvent } from 'react';
import Button from '../Buttons/Button';

interface Props {
  tableHeaders: Array<string>,
  tableContent: Array<string>,
  remove: (index: number) => void,
  tableCaption?: string,
  tableEmptyText?: string,
  hideTableCaption?: boolean,
  hideColumnHeaders?: boolean,
}

const Table = ({
  tableHeaders,
  tableContent,
  remove,
  tableCaption,
  tableEmptyText,
  hideTableCaption,
  hideColumnHeaders,
}: Props) => {
  return (
    <div className="medium">
      <table className="table">
        {(tableCaption) && (
          <caption data-testid="TableCaption" className={`table__caption ${hideTableCaption ? 'hidden-text' : ''}`}>
            {tableCaption}
          </caption>
        )}
        <thead className="table__head">
          <tr className="table__row">
            {tableHeaders.map((header, index) => {
              return (
                <th
                  scope="col"
                  key={index}
                  data-testid={`TableHeader-${index}`}
                  className={`table__header ${hideColumnHeaders ? 'hidden-text' : ''}`}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="table__body">
          {(tableContent.length === 0) && (
          <tr className="table__row">
            <td colSpan={3} className="table__cell">{tableEmptyText}</td>
          </tr>
          )}
          {tableContent.map((tableItem, index) => {
            return (
              <tr key={index} className="table__row">
                <td colSpan={2} className="table__cell">
                  {tableItem}
                </td>
                <td className="table__cell">
                  <Button
                    className="table_close"
                    hiddenText
                    onClick={(event: MouseEvent) => {
                      event.preventDefault();
                      remove(index);
                    }}
                    text="Remove"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
