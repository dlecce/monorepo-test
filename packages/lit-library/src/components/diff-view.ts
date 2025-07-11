import { LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js'
import ReactDOM from 'react-dom/client';
import React from 'react';
import { generateDiffFile } from '@git-diff-view/file';
import { DiffView as ReactDiffView, DiffModeEnum } from '@git-diff-view/react';
import cssText from '@git-diff-view/react/styles/diff-view.css?inline';

@customElement('diff-view')
export class DiffView extends LitElement {
    @property() oldData: any;
    @property() newData: any;
    @property() viewMode: 'split' | 'unified' = 'split';

    private reactRoot?: ReactDOM.Root;

    static styles = unsafeCSS(cssText);

    firstUpdated() {
        this.reactRoot = ReactDOM.createRoot(this.renderRoot);
        this._renderReactComponent();
    }

    updated() {
        this._renderReactComponent();
    }

    private _stringify(data: any) {
        return JSON.stringify(data, null, 4);
    }

    private _renderReactComponent() {
        if (this.oldData && this.newData) {
            const oldStr = this._stringify(this.oldData);
            const newStr = this._stringify(this.newData);

            if (oldStr !== newStr) {
                const file = generateDiffFile('old', oldStr, 'new', newStr, 'json', 'json');
                file.initRaw();

                let diffViewMode = DiffModeEnum.Split;
                switch (this.viewMode) {
                    case 'split':
                        diffViewMode = DiffModeEnum.Split;
                        break;
                    case 'unified':
                        diffViewMode = DiffModeEnum.Unified;
                        break;
                }

                if (this.reactRoot) {
                    this.reactRoot.render(
                        React.createElement(ReactDiffView, {
                            diffFile: file,
                            diffViewMode: diffViewMode,
                            diffViewWrap: false,
                            diffViewHighlight: true,
                            diffViewTheme: 'light'
                        })
                    );
                }
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.reactRoot) {
            this.reactRoot.unmount();
        }
    }
}