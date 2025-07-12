import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import ReactDOM from 'react-dom/client';
import React from 'react';
import { HexColorPicker as ReactHexColorPicker } from 'react-colorful';

@customElement('hex-color-picker')
export class HexColorPicker extends LitElement {
    @property() color: string = '#ffffff';

    private reactRoot?: ReactDOM.Root;

    protected createRenderRoot() {
        return this;
    }

    firstUpdated() {
        this.reactRoot = ReactDOM.createRoot(this.renderRoot);
        this.renderReactComponent();
    }

    updated() {
        this.renderReactComponent();
    }

    private emitChange = (color: string) => {
        const event = new CustomEvent('colorChange', {
            detail: color,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    private renderReactComponent() {
        if (this.reactRoot) {
            this.reactRoot.render(
                React.createElement(ReactHexColorPicker, {
                    color: this.color,
                    onChange: this.emitChange
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