/**
 * Created by nitzanh on 15/08/2017.
 */
import mobx from 'mobx';

const {observable, action} = mobx;

const state = observable.object({
  selected: 'A1',
  cells: observable.map(
    {
      A1: {
        get value() {
          return this.rawData;
        },
        rawData: ''
      }
    }, 'cells')
}, 'State');


export const storeAPI = {
  getCell: key => state.cells.get(key),
  getSelected: () => {
    return state.selected;
  },
  setSelected: action(key => {
    state.selected = key;
    console.log(`${key} was selected`);
  }),
  setFormula: action(value => {
    const selectedCell = state.cells.get(state.selected);
    selectedCell.rawData = value;
  })
};


