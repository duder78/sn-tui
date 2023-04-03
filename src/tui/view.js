import './image-editor';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-loader';
import '@servicenow/now-modal';
import '@servicenow/now-input';
import '@servicenow/now-alert';
import { 
	INIT_EDITOR,
	LOAD_IMAGE_FROM_URL
} from './constants';

export default (state, {dispatch}) => {
	const { images, searchText, selectedItem, bImageModalOpen, bIsLoading } = state;
	const rootRef = snabbdom.createRef();
	const editorRef = snabbdom.createRef();

	const initEditor = (e) => dispatch([INIT_EDITOR], { editorRef: e.current, rootRef: rootRef });
	const loadImageFromURL = (image) => dispatch([LOAD_IMAGE_FROM_URL], { image: image });

	const arr = (images) 
			? (searchText && searchText.length) 
				? images.filter((g, i) => g.name.toLowerCase().includes(searchText.toLowerCase()))
				: images
			: images

	switch(selectedItem) {
		case 'filename_desc':
			arr.sort((a, b) => { if (a.name > b.name) return -1; if (b.name > a.name) return 1; return 0; });
			break;
		case 'filename_asc':			
			arr.sort((a, b) =>  { if (b.name > a.name) return -1; if (a.name > b.name) return 1; return 0;});
			break;
		case 'created_desc':
			arr.sort((x, y) => new Date(y.sys_created_on) - new Date(x.sys_created_on));
			break;
		case 'created_asc':
			arr.sort((x, y) => new Date(x.sys_created_on) - new Date(y.sys_created_on));
			break;
		case 'updated_desc':
			arr.sort((x, y) =>  new Date(y.sys_updated_on) - new Date(x.sys_updated_on));
			break;
		case 'updated_asc':
			arr.sort((x, y) => new Date(x.sys_updated_on) - new Date(y.sys_updated_on));
			break;
		default:
	}

	const ImagesModal = () => 
		(bIsLoading) 
			? <div className="overlay-container">
				<now-loader label="Loading"></now-loader>
			  </div>
			: <div id="modal-origin-1ywuk4g8np51-16" aria-hidden="false">
				<now-modal opened={bImageModalOpen} size="fullscreen" header-label="ServiceNow Images [db_images table]" footer-actions={[{"id":"close-modal", "label":"Close","variant":"tertiary"}]}>
					<slot name="defaultSlot">
						<div style={{ 'display':'flex', 'align-items': 'center' }}>
							<now-input 
								id="image-search" 
								placeholder="Search..."
								value={searchText}
								style={{ 'padding-left': '40px', 'margin-right': '1rem', 'width': '30rem' }}>
								<now-button-iconic slot="end" icon="magnifying-glass-fill" variant="primary" primary  />
							</now-input>
							<now-dropdown 
								items={[{"id":"filename_desc","label":"Filename DESC"},{"id":"filename_asc","label":"Filename ASC"},{"id":"created_desc","label":"Created on DESC"},{"id":"created_asc","label":"Created on ASC"},{"id":"updated_desc","label":"Updated on DESC"},{"id":"updated_asc","label":"Updated on ASC"}]} 
								selected-items={[selectedItem]} 
								select="single" 
								variant="secondary" 
								size="md" 
								search="none">
							</now-dropdown>
						</div>
						<ul className="list">
						{(arr.length) 
							? arr.map(i => 
								<li className="image-list-item" on-click={() => loadImageFromURL(i)}>
									<span>
										<img src={i.name} alt="description" position="left" /> 
									</span>
									<div>
										<div><span>Filename:</span><span>{ i.name }</span></div>
										<div><span>Category:</span><span>{ i.category }</span></div>
										<div><span>Created On:</span><span>{ i.sys_created_on }</span></div>
										<div><span>Updated On:</span><span>{ i.sys_updated_on }</span></div>
									</div>
								</li>
							)
							: <now-alert 
								status="info" 
								icon="circle-exclamation-outline" 
								header="No images found." 
								content={{"type":"html","value":"Refine your search terms or clear the search field."}}>
							  </now-alert>
						}
						</ul>
					</slot>
				</now-modal>
			  </div>

	return (
		<div ref={rootRef}>
			<ImagesModal />
			<div ref={editorRef}  hook-insert={vnode => initEditor(editorRef)}></div>
		</div>
	)
};
