/**
 * Created by nitzanh on 15/08/2017.
 */
import mobx from 'mobx';

const {observable, action, computed} = mobx;

const translateKey = key => `${key.col}${key.row}`;


const state = {
  selected: 'A1',
  cells: observable.map({A1: {
    value: 5,
    isSelected: false
  }
  })
};

export const storeAPI = {
  getCell: key => state.cells.get(translateKey(key)),
  setSelected: action(key => {
    if (state.selected) {
      const selectedKey = state.selected;
      state.cells.get(selectedKey).isSelected = false;
    }
    state.selected = translateKey(key);
    if (state.cells.get(translateKey(key))) {
      const cell = state.cells.get(translateKey(key));
      cell.isSelected = true;
    } else {
      state.cells.set(translateKey(key), {value: '', isSelected: true});

    }
  }),
  setFormula: action(value => {
    const selectedCell = state.cells.get(state.selected);
    selectedCell.value = value;
  })
};


