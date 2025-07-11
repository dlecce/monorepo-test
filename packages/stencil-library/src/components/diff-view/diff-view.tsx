import { Component, Prop, Element } from '@stencil/core';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { generateDiffFile } from '@git-diff-view/file';
import { DiffView as ReactDiffView, DiffModeEnum } from '@git-diff-view/react';

@Component({
    tag: 'diff-view',
    styleUrl: 'diff-view.css',
    shadow: true,
})
export class DiffView {
    @Element() el: HTMLElement;

    @Prop() oldData: any;
    @Prop() newData: any;
    @Prop() viewMode: 'split' | 'unified' = 'split';

    private reactRoot?: ReactDOM.Root;

    componentDidLoad() {
        this.reactRoot = ReactDOM.createRoot(this.el.shadowRoot);
        this.renderReactComponent();
    }

    componentDidUpdate() {
        this.renderReactComponent();
    }

    private stringify(data: any) {
        return JSON.stringify(data, null, 4);
    }

    private renderReactComponent() {
        if (this.oldData && this.newData) {
            const oldStr = this.stringify(this.oldData);
            const newStr = this.stringify(this.newData);

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
        if (this.reactRoot) {
            this.reactRoot.unmount();
        }
    }
}
