import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import ReactDOM from 'react-dom/client';
import React from 'react';
import { HexColorPicker as ReactHexColorPicker } from 'react-colorful';

@customElement('hex-color-picker')
export class HexColorPicker extends LitElement {
    @property({ reflect: true }) color: string = '#ffffff';

    private reactRoot?: ReactDOM.Root;

    protected createRenderRoot() {
        return this;
    }

    firstUpdated() {
        this.reactRoot = ReactDOM.createRoot(this.renderRoot);
        this._renderReactComponent();
    }

    updated() {
        this._renderReactComponent();
    }

    private _emitChange = (color: string) => {
        this.color = color;
        const event = new CustomEvent('onChange', {
            detail: color,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    private _renderReactComponent() {
        console.log('_renderReactComponent()');
        if (this.reactRoot) {
            this.reactRoot.render(
                React.createElement(ReactHexColorPicker, {
                    color: this.color,
                    onChange: this._emitChange
                })
            );
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.reactRoot) {
            this.reactRoot.unmount();
        }
    }
}