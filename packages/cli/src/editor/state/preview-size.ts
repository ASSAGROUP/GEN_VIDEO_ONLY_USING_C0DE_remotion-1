import type {PreviewSize} from '@remotion/player';
import {createContext} from 'react';

type PreviewSizeCtx = {
	size: PreviewSize;
	setSize: (cb: (oldSize: PreviewSize) => PreviewSize) => void;
};

export const PREVIEW_MAX_ZOOM = 2;
export const PREVIEW_MIN_ZOOM = 0.1;

export const persistPreviewSizeOption = (option: PreviewSize) => {
	localStorage.setItem('previewSize', String(option));
};

export const loadPreviewSizeOption = (): PreviewSize => {
	const item = localStorage.getItem('previewSize');
	if (item === null || !item) {
		return 'auto';
	}

	return item as PreviewSize;
};

export const PreviewSizeContext = createContext<PreviewSizeCtx>({
	setSize: () => undefined,
	size: loadPreviewSizeOption(),
});
