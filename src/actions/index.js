export const liftAlbumsToState = (albums) => {
	return {
		type: "Lift_Albums_To_State",
		payload: albums
	};
}

export const selectedAlbum = (album) => {
	return {
		type: "Selected_Album",
		payload: album
	};
}

export const openModal = (modalData) => {
	return {
		type: "Open_Modal",
		payload: modalData
	};
}

export const closeModal = (modalData) => {
	return {
		type: "Close_Modal",
		payload: modalData
	};
}
