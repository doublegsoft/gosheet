import { TableData } from '.';
import { CellStyle } from 'table-render';
import { equals } from '../helper';

export function addStyle(t: TableData, value: Partial<CellStyle>) {
  if (!t.styles) t.styles = [];
  if (value) {
    for (let i = 0; i < t.styles.length; i += 1) {
      const it = t.styles[i];
      if (equals(it, value)) {
        return i;
      }
    }
  }
  return t.styles.push(value) - 1;
}

export function clearStyles(t: TableData) {
  if (t.styles) {
    delete t.styles;
  }
}
