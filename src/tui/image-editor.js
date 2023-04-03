import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import imageEditorActions from './actions';
import styles from './styles.scss';

createCustomElement('x-758728-tui', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		images: [],
		searchText: "",
		selectedItem: 'filename_asc',
		bImageModalOpen: false,
		bIsLoading: false
	},
	properties: {
        theme: { 
			default: "default"
		}
    },
	...imageEditorActions,
	styles
});
