import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { HexColorPicker as ReactHexColorPicker } from 'react-colorful';

@Component({
    tag: 'hex-color-picker',
    styleUrl: 'hex-color-picker.css',
    shadow: false,
})
export class HexColorPicker {
    @Element() el: HTMLElement;

    @Prop({reflect: true}) color: string = '#ffffff';
    @Event() colorChange: EventEmitter<string>;

    private reactRoot?: ReactDOM.Root;

    componentDidLoad() {
        this.reactRoot = ReactDOM.createRoot(this.el);
        this.renderReactComponent();
    }

    componentDidUpdate() {
        this.renderReactComponent();
    }

    private renderReactComponent() {
        if (this.reactRoot) {
            this.reactRoot.render(
                React.createElement(ReactHexColorPicker, {
                    color: this.color,
                    onChange: (color: string) => this.colorChange.emit(color)
                })
            );
        }
    }

    disconnectedCallback() {
        if (this.reactRoot) {
            this.reactRoot.unmount();
        }
    }
}
