import r2wc from '@r2wc/react-to-web-component'
import { HexColorPicker } from 'react-colorful';

const HexColorPickerWebComponent = r2wc(HexColorPicker, {
    props: {
        color: 'string',
        onChange: 'function'
    }
});
customElements.define('hex-color-picker', HexColorPickerWebComponent);