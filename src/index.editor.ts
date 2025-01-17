import Table from '.';
import selector from './index.selector';
import { DataCell } from './data';
import Editor from './editor';
import SelectEditor from './editor/select';

function get(t: Table, cell: DataCell) {
  let type = 'text';
  if (cell instanceof Object && cell.type) type = cell.type;
  const { _editors } = t;
  const editor: Editor = _editors.get(type);
  if (type === 'select' && cell instanceof Object && cell.options) {
    (editor as SelectEditor).options(cell.options);
  }
  editor.changer((value) => {
    if (value !== null) {
      selector.setCellValue(t, value);
    }
  });
  editor.moveChanger((direction) => {
    const { _selector } = t;
    if (direction !== 'none' && _selector) {
      selector.move(t, true, direction, 1);
      t._canvas.focus();
    }
  });
  return editor;
}

function move(t: Table) {
  const { _editor, _selector } = t;
  if (_editor && _selector) {
    const { _focusArea } = _selector;
    if (_editor.visible && _focusArea) {
      const { _rect, _target } = _focusArea;
      if (_rect && _target) {
        _editor.rect(_rect).target(_target).show();
      } else {
        _editor.rect({ x: -100, y: -100, width: 0, height: 0 }).show();
      }
    }
  }
}

function reset(t: Table) {
  const { _selector } = t;
  if (_selector) {
    const { _focusRange, _focusArea } = _selector;
    if (_focusRange && _focusArea) {
      const { _rect, _target } = _focusArea;
      const { startRow, startCol } = _focusRange;
      const cell = t.cell(startRow, startCol);
      const editor = get(t, cell);
      t._editor = editor;
      if (editor && _rect && _target) {
        // console.log('row:', startRow, ', col:', startCol, ', rect:', _rect);
        editor.cellIndex(startRow, startCol).rect(_rect).target(_target).show();
        if (cell) {
          editor.value(cell);
        }
      }
    }
  }
}

export default {
  move,
  reset,
};
