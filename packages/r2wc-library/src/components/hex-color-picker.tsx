import r2wc from '@r2wc/react-to-web-component'
import { useRef, useState } from 'react';
import { HexColorPicker as HexColorPickerReact } from 'react-colorful';

type Props = {
    color: string;
};

const HexColorPicker = (props: Props) => {
    const { color } = props;

    const [value, setValue] = useState(color);
    const rootRef = useRef<HTMLDivElement>(null);

    const emitChange = (color: string) => {
        setValue(color);

        const event = new CustomEvent('colorChange', {
            detail: color,
            bubbles: true,
            composed: true
        });

        rootRef.current?.closest('hex-color-picker')?.dispatchEvent(event);
    };

    return (
        <div ref={rootRef}>
            <HexColorPickerReact color={value} onChange={emitChange} />
        </div>
    );
};

const HexColorPickerWebComponent = r2wc(HexColorPicker, {
    props: {
        color: 'string'
    }
});
customElements.define('hex-color-picker', HexColorPickerWebComponent);