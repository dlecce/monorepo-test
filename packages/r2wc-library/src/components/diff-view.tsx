import r2wc from '@r2wc/react-to-web-component'
import { DiffView as DiffViewReact, DiffModeEnum } from '@git-diff-view/react';
import { generateDiffFile } from '@git-diff-view/file';
import cssText from '@git-diff-view/react/styles/diff-view.css?inline';

const stringify = (data: any) => JSON.stringify(data, null, 4);

type Props = {
    oldData: any;
    newData: any;
    viewMode: 'split' | 'unified';
};

const DiffView = (props: Props) => {
    const { oldData, newData, viewMode } = props;
    
    if (oldData && newData) {
        const oldStr = stringify(oldData);
        const newStr = stringify(newData);

        if (oldStr !== newStr) {
            const file = generateDiffFile('old', oldStr, 'new', newStr, 'json', 'json');
            file.initRaw();

            let diffViewMode = DiffModeEnum.Split;
            switch (viewMode) {
                case 'split':
                    diffViewMode = DiffModeEnum.Split;
                    break;
                case 'unified':
                    diffViewMode = DiffModeEnum.Unified;
                    break;
            }

            return (
                <>
                    <style>{cssText}</style>
                    <DiffViewReact
                        diffFile={file}
                        diffViewWrap={false}
                        diffViewTheme="light"
                        diffViewHighlight={true}
                        diffViewMode={diffViewMode}
                    />
                </>
            );
        }
    }
};

const DiffViewWebComponent = r2wc(DiffView, {
    props: {
        oldData: 'json',
        newData: 'json',
        viewMode: 'string'
    },
    shadow: 'open'
});
customElements.define('diff-view', DiffViewWebComponent);