import React, {Component} from 'react';
import PropTypes from 'prop-types';
import s from './Cell.scss';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {storeAPI} from '../App/Store';

const createCellStore = key => observable({
  key,
  get isSelected() {
    return storeAPI.getSelected() === this.key;
  }
});




function toKey(row, col) {
  return {
    row,
    col: String.fromCharCode(col + 'A'.charCodeAt(0))
  };
}

class Cell extends Component {

  constructor({rowIndex, cellIndex}) {
    super();
    const key = toKey(rowIndex, cellIndex);
    this.cellStore = createCellStore(`${key.col}${key.row}`);
  }

  render() {
    const cell = storeAPI.getCell(this.cellStore.key) || {};
    const cellValue = cell.value || '';
    const className = this.cellStore.isSelected ? s.selectedCell : s.cell;
    return (
      <td className={className} onClick={() => storeAPI.setSelected(this.cellStore.key)}>{cellValue}</td>
    );
  }
}

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired
};


export default observer(Cell);
