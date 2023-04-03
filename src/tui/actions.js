import ImageEditor from 'tui-image-editor';
import 'file-saver'; 
import { createHttpEffect } from '@servicenow/ui-effect-http';
import iconA from '../../dist/tui/icon-a.svg';
import iconB from '../../dist/tui/icon-b.svg';
import iconC from '../../dist/tui/icon-c.svg';
import iconD from '../../dist/tui/icon-d.svg';
import defaultLogo from '../assets/img/logo-tui.png';
import { Color, Solver, getDateString } from '../utils';

import {
	INIT_EDITOR,
	REMOVE_UI_ELEMENTS,
	LOAD_IMAGE_FROM_URL,
	FETCH_IMAGE,
	FETCH_IMAGES,
	FETCH_IMAGES_SUCCESS,
	FETCH_IMAGES_ERROR,
	THEME_COLORS,
	DEFAULT_IMAGES
} from './constants';

const SampleImage = require(`../assets/img/${DEFAULT_IMAGES[Math.floor(Math.random() * (DEFAULT_IMAGES.length - 1)) + 0]}`)

export default {
	actionHandlers: {
		[INIT_EDITOR]: ({action,state, dispatch, updateState}) => {
			const { editorRef, rootRef } = action.payload;
			const { theme } = state.properties;

			let color = null, activeTheme = null;
			// SET Color using RGB values depending on theme value
			switch(theme) {
				case 'black':
					color = new Color(0, 0, 0);	
					activeTheme = 'black';
					break;
				case 'blue':
					color = new Color(24, 100, 171);	
					activeTheme = 'blue';
					break;
				case 'green':
					color = new Color(43, 138, 62);
					activeTheme = 'green';
					break;
				case 'fuschia':
					color = new Color(166, 30, 77);
					activeTheme = 'fuschia';
					break;
				default:
					let rgb = getComputedStyle(document.documentElement).getPropertyValue('--now-color--primary-2');
					let arr = rgb.split(',');
					color = new Color(arr[0], arr[1], arr[2]);
					activeTheme = 'default';
					break;
			}
			// GENERATE CSS filter based on Color set previously
			let solver = new Solver(color);
			let result = solver.solve();
			let filterCSS = result.filter;

			// SET existing CSS variables based on active theme
			rootRef.current.setAttribute('color-scheme', 'light');
			rootRef.current.style.setProperty("--brand", THEME_COLORS[activeTheme][0]); 	
			rootRef.current.style.setProperty("--text1", THEME_COLORS[activeTheme][1]); 
			rootRef.current.style.setProperty("--text2", THEME_COLORS[activeTheme][2]); 
			rootRef.current.style.setProperty("--primary-button", THEME_COLORS[activeTheme][3]); 
			rootRef.current.style.setProperty("--primary-button-text", THEME_COLORS[activeTheme][4]);
			rootRef.current.style.setProperty("--neutral-button", THEME_COLORS[activeTheme][5]); 
			rootRef.current.style.setProperty("--neutral-button-text", THEME_COLORS[activeTheme][6]); 			
			rootRef.current.style.setProperty("--editor-container-bg", THEME_COLORS[activeTheme][7]); 		
			rootRef.current.style.setProperty("--submenu-bg", THEME_COLORS[activeTheme][8]); 
			rootRef.current.style.setProperty("--header-bg", THEME_COLORS[activeTheme][9]); 		
			rootRef.current.style.setProperty("--label-color", THEME_COLORS[activeTheme][10]);
			rootRef.current.style.setProperty("--help-menu-bg", THEME_COLORS[activeTheme][11]); 	 
			rootRef.current.style.setProperty("--logo-filter", filterCSS); 
			
			// SET initial properties exposed by TUI Image Editor package
			let editorInstance = new ImageEditor(editorRef, {
				includeUI: {
					loadImage: {
						path: SampleImage,
						name: `editedImage_${getDateString()}`,
					},
					theme: {
						'common.bi.image': defaultLogo,
						'common.bisize.width': 'auto',
						'common.bisize.height': '3.4rem',
						'common.backgroundImage': 'none',
						'common.backgroundColor': '#1e1e1e',
						'common.border': '0px',
	
						// MAIN MENU icons
						'menu.normalIcon.path': iconD,
						'menu.normalIcon.name': 'icon-d',
						'menu.normalIcon.color': '#ec3d77',
						
						'menu.disabledIcon.path': iconA,
						'menu.disabledIcon.name': 'icon-a',
						'menu.disabledIcon.color': '#434343',
						
						'menu.activeIcon.path': iconB,
						'menu.activeIcon.name': 'icon-b',
						'menu.activeIcon.color': '#555555',
						
						'menu.hoverIcon.path': iconC,
						'menu.hoverIcon.name': 'icon-c',
						'menu.hoverIcon.color': '#e9e9e9',
	
						'menu.iconSize.width': '24px',
						'menu.iconSize.height': '24px',
	
						// SUBMENU icons
						
						'submenu.activeIcon.path': iconC,
						'submenu.activeIcon.name': 'icon-c',
						'submenu.activeIcon.color': '#e9e9e9',
	
						'submenu.normalIcon.path': iconA,
						'submenu.normalIcon.name': 'icon-a',
						'submenu.normalIcon.color': '#ec3d77',
				
						'submenu.iconSize.width': '32px',
						'submenu.iconSize.height': '32px',
	
						// SUBMENU primary color
						'submenu.backgroundColor': '#1e1e1e',
						'submenu.partition.color': '#3c3c3c',
						
					},
					menu: [
						"crop",
						"flip",
						"rotate",
						"draw",
						"shape",
						"icon",
						"text",
						"filter",
					 ],
					initMenu: 'filter',
					menuBarPosition: 'bottom',
				},
				selectionStyle: {
					cornerSize: 20,
					rotatingPointOffset: 70,
				},
			});

			updateState({ 
				editor: editorInstance,
				editorRef: editorRef
			});

			// SELECT button container, create new <button> element, set classes/inner html, attach click eventListener
			let buttonContainer = editorRef.querySelector('.tui-image-editor-header-buttons');
			let loadFromDevice = buttonContainer.querySelector(":first-child");

			// ADD 'loadFromSN' button to UI by modifying DOM
			let loadFromSN = document.createElement('button');
			loadFromSN.classList.add('btn-neutral');
			loadFromSN.innerHTML = "Load from SN";
			loadFromSN.addEventListener('click', () => { updateState({bIsLoading: true}); dispatch([FETCH_IMAGES])});
			loadFromDevice.after(loadFromSN)

			// REMOVE unwanted UI elements
			dispatch([REMOVE_UI_ELEMENTS], { editorRef: editorRef, classNames: ['tie-btn-zoomIn', 'tie-btn-zoomOut', 'tie-btn-hand'] });

		},
		[REMOVE_UI_ELEMENTS]: ({action}) => {
			const { editorRef, classNames } = action.payload;

			let helpButtonContainer = editorRef.querySelector('.tui-image-editor-help-menu');

			// REMOVE elements based on class names passed in as array
			classNames.map((c, i) => {
				let element = helpButtonContainer.querySelector(`.${c}`);
				helpButtonContainer.removeChild(element);
			})
			// REMOVE first divider after elements above are removed
			helpButtonContainer.removeChild(helpButtonContainer.childNodes[0])
		},
		[LOAD_IMAGE_FROM_URL]: ({ action, dispatch, updateState }) => {
			const { image } = action.payload;
	
			dispatch([FETCH_IMAGE], {
				sysparm_query_no_domain: true,
				filename: image.name,
			});
			updateState({ bImageModalOpen: false })
		},
		[FETCH_IMAGE]: ({ state, action }) => {
			const { editor } = state;
			const { filename } = action.payload;

			editor.loadImageFromURL(filename, filename).then(result=>{
				editor.ui.resizeEditor({
					imageSize: {oldWidth: result.oldWidth, oldHeight: result.oldHeight, newWidth: result.newWidth, newHeight: result.newHeight}
				});

			}).catch(err=>{
				console.error("Something went wrong:", err);
			})
		},
		[FETCH_IMAGES]: createHttpEffect('api/now/table/db_image', {
			method: 'GET',
			queryParams: ['sysparm_query', 'sysparm_offset', 'sysparm_query_no_domain'],
			successActionType: 'FETCH_IMAGES_SUCCESS',
			errorActionType: 'FETCH_IMAGES_ERROR'
		}),
		[FETCH_IMAGES_SUCCESS]: (coeffects) => {
			const { action, updateState } = coeffects;
			const { result } = action.payload;
		
			updateState({ images: result, bImageModalOpen: true, bIsLoading: false });
		},
		'NOW_INPUT#INPUT': (coeffects) => {
			const { action, updateState } = coeffects;
			const text = action.payload.fieldValue;

			updateState({ searchText: text })
		},
		'NOW_DROPDOWN#ITEM_CLICKED': (coeffects) => {
			const { action, updateState } = coeffects;
			const id = action.payload.item.id

			updateState({ selectedItem: id })
		},
		'NOW_MODAL#FOOTER_ACTION_CLICKED': (coeffects) => {
			const { action, updateState } = coeffects;
			const id = action.payload.footerAction.id

			if (id === 'close-modal')
				updateState({ bImageModalOpen: false })
		},
		
		[FETCH_IMAGES_ERROR]: ({ action, updateState }) => {
			const { result } = action.payload;
			console.log("ERROR: ", result)
			updateState({ bIsLoading: false })
		}
	}
};
