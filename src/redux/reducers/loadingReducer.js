import produce from "immer";

import { HIDE_LOADING, SHOW_LOADING } from "redux/actions/LoadingAction";

const initialState = {
	isLoading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADING:
			return produce(state, (draft) => {
				draft.isLoading = true;
			});
		case HIDE_LOADING:
			return produce(state, (draft) => {
				draft.isLoading = false;
			});
		default:
			return { ...state };
	}
};
export default reducer;
