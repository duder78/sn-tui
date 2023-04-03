export const INIT_EDITOR = "INIT_EDITOR";
export const REMOVE_UI_ELEMENTS = 'REMOVE_UI_ELEMENTS';
export const LOAD_IMAGE_FROM_URL = 'LOAD_IMAGE_FROM_URL';
export const FETCH_IMAGE = 'FETCH_IMAGE';
export const FETCH_IMAGES = 'FETCH _IMAGES';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_ERROR = 'FETCH_IMAGES_ERROR';
export const DEFAULT_IMAGES = [
	'portraitBear.jpg',
	'portraitBull.jpg',
	'portraitBunny.jpg',
	'portraitCheetah.jpg',
	'portraitCow.jpg',
	'portraitDog.jpg',
	'portraitFerret.jpg',
	'portraitFox.jpg',
	'portraitGiraffe.jpg',
	'portraitLlama.jpg',
	'portraitMonkey.jpg',
	'portraitMonkey2.jpg',
	'portraitOsterich.jpg',
	'portraitOtter.jpg',
	'portraitPanda.jpg',
	'portraitPolarbear.jpg',
	'portraitRaccoon.jpg',
	'portraitRhino.jpg',
	'portraitSloth.jpg',
	'portraitWolf.jpg'
]
export const THEME_COLORS = {
    "default": [
        'rgb(var(--now-color--primary-3))', 			// --brand-light
        'rgb(var(--now-color_text--primary))', 			// --text1-light
        'rgb(var(--now-color_text--secondary))', 		// --text2-light: 
        'rgb(var(--now-color--primary-2))',				// --primary-button-light
        'rgb(var(--now-color_background--primary))',	// --primary-button-text-light
        'rgb(var(--now-color--primary-0))',				// --neutral-button-light
        'rgb(var(--now-color_text--primary))',			// --neutral-button-text-light
        'rgb(var(--now-color_background--primary))', 	// --editor-container-bg-light
        'rgba(23,100,82,.25)',    						// --submenu-bg-light
        'rgb(0,0,0,.25)',								// --header-bg-light
        'var(--gray-9)',								// --label-color-light
        'rgb(0,0,0,.15)',								// --help-menu-bg-light
    ],
    "black": [
        'var(--gray-9)', 							    // --brand-light
        'rgb(var(--now-color_text--primary))', 			// --text1-light
        'rgb(var(--now-color_text--secondary))', 		// --text2-light: 
        'var(--gray-9)',				    		    // --primary-button-light
        'var(--gray-0)',							    // --primary-button-text-light
        'var(--gray-1)',							    // --neutral-button-light
        'var(--gray-9)',							    // --neutral-button-text-light
        'rgb(var(--now-color_background--primary))', 	// --editor-container-bg-light
        'rgb(0,0,0,.3)',    							// --submenu-bg-light
        'rgb(0,0,0,.25)',								// --header-bg-light
        'var(--gray-9)',								// --label-color-light
        'rgb(0,0,0,.15)',								// --help-menu-bg-light
    ],
    "blue": [
        'var(--blue-9', 							    // --brand-light
        'rgb(var(--now-color_text--primary))', 			// --text1-light
        'rgb(var(--now-color_text--secondary))', 		// --text2-light: 
        'var(--blue-9)',				    		    // --primary-button-light
        'var(--blue-0)',							    // --primary-button-text-light
        'var(--blue-1)',							    // --neutral-button-light
        'var(--blue-9)',							    // --neutral-button-text-light
        'rgb(var(--now-color_background--primary))', 	// --editor-container-bg-light
        'rgb(24,200,272,.5)',    						// --submenu-bg-light
        'rgb(0,0,0,.25)',								// --header-bg-light
        'var(--gray-9)',								// --label-color-light
        'rgb(0,0,0,.15)',								// --help-menu-bg-light
    ],
    "green": [
        'var(--green-9)', 						        // --brand-light
        'rgb(var(--now-color_text--primary))', 			// --text1-light
        'rgb(var(--now-color_text--secondary))', 		// --text2-light: 
        'var(--green-9)',				    		    // --primary-button-light
        'var(--green-0)',							    // --primary-button-text-light
        'var(--green-1)',							    // --neutral-button-light
        'var(--green-9)',							    // --neutral-button-text-light
        'rgb(var(--now-color_background--primary))', 	// --editor-container-bg-light
        'rgb(43,138,81,.5)',    						// --submenu-bg-light
        'rgb(0,0,0,.25)',								// --header-bg-light
        'var(--gray-9)',								// --label-color-light
        'rgb(0,0,0,.15)',								// --help-menu-bg-light
    ],
    "fuschia": [
        'var(--pink-9)', 							    // --brand-light
        'rgb(var(--now-color_text--primary))', 			// --text1-light
        'rgb(var(--now-color_text--secondary))', 		// --text2-light: 
        'var(--pink-9)',				    		    // --primary-button-light
        'var(--pink-0)',							    // --primary-button-text-light
        'var(--pink-1)',							    // --neutral-button-light
        'var(--pink-9)',							    // --neutral-button-text-light
        'rgb(var(--now-color_background--primary))', 	// --editor-container-bg-light
        'rgb(166,30,77,.5)',    						// --submenu-bg-light
        'rgb(0,0,0,.25)',								// --header-bg-light
        'var(--gray-9)',								// --label-color-light
        'rgb(0,0,0,.15)',								// --help-menu-bg-light
    ]
}