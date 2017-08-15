import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {observer} from 'mobx-react';
import {storeAPI} from '../App/Store';

function toKey(row, col) {
  return {
      row:row,
    col:String.fromCharCode(col + 'A'.charCodeAt(0))
  }

}

function Cell({rowIndex, cellIndex}) {
  const cell = storeAPI.getCell(toKey(rowIndex, cellIndex)) || {};
  const cellValue = cell.value || '';
  const className = cell.isSelected ? s.selectedCell : s.cell;

  return (
      <td className={className} onClick={() => storeAPI.setSelected(toKey(rowIndex, cellIndex))}>{cellValue}</td>
  );
}

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};

export default observer(Cell);
