const initialState = {
  albums: [],
	selectedAlbumId: 1,
	selectedAlbumTitle: '',
	modalOpen: false,
	modalImgUrl: '',
	modalImgTitle: '',
	modalId: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Lift_Albums_To_State':
            return {
                ...state,
                albums: action.payload,
            };
				case 'Selected_Album':
            return {
                ...state,
                selectedAlbumId: action.payload.id,
								selectedAlbumTitle: action.payload.title
            };
				case 'Open_Modal':
            return {
                ...state,
                modalOpen: true,
								modalImgUrl: action.payload.url,
								modalImgTitle: action.payload.title,
								modalId: action.payload.id
            };
				case 'Close_Modal':
						return {
								...state,
								modalOpen: false,
								modalImgUrl: '',
								modalImgTitle: '',
								modalId: ''
						};
		    default:
            return state;
    }
}

export default rootReducer;
