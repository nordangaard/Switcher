import * as vscode from 'vscode';
import { Target, targets } from './targets';
import { getAssociationFor } from './configuration';
import { isOpenFileValid } from './guard';

export function setContexts(editor: vscode.TextEditor | undefined) {
    if (!editor || !isOpenFileValid(editor)) {
        clearContexts();
        return;
    }

    const association = getAssociationFor(editor.document.fileName);
    if (!association) {
        clearContexts();
        return;
    }

    for (const target of targets) {
        setContext(target, !!association.associated[target.configurationKey]);
    }
}

function clearContexts() {
    targets.forEach(t => setContext(t, false));
}

function setContext(target: Target, value: boolean) {
    vscode.commands.executeCommand('setContext', target.contextName, value);
}

