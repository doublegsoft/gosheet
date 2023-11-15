import HElement from '../../element';
import { Rect } from '../../renderer';
import Editor from '..';
import { DataCell } from '../../data';
export default class TextEditor extends Editor {
    _text: HElement;
    _textMeasure: HElement;
    _editing: boolean;
    constructor();
    value(v: DataCell): this;
    rect(rect: Rect | null): this;
    hide(): this;
}
