import {combineReducers} from "redux";
import {API_RESULT, API_STATUS, DISPLAY_MESSAGE} from "../constants";
import {routerReducer, LOCATION_CHANGE} from "react-router-redux";
import User from "./User";

const initialState = {
	app: {
		isLoading: false,
		message: {
			show: false,
			context: "",
			message: ""
		}
	}
};

function app(state = initialState.app, action) {
	switch (action.type) {
		case DISPLAY_MESSAGE :
			return Object.assign({}, state, {
				message: {
					show: true,
					context: action.context,
					message: action.message
				}
			});
		case LOCATION_CHANGE:
			console.log("Location change");
			return state
	}
	if (action.status && action.result) {
		switch (action.status) {
			case API_STATUS.started :
				return Object.assign({}, state, {
					isLoading: true
				});
			case API_STATUS.finished:
				switch (action.result) {
					case API_RESULT.success :
						return Object.assign({}, state, {
							isLoading: false,
							message: initialState.app.message
						});
					case API_RESULT.error:
						return Object.assign({}, state, {
							isLoading: false,
							message: {
								show: true,
								context: MESSAGE_CONTEXT.danger,
								message: action.error
							}
						});
					case API_RESULT.timeout:
						return Object.assign({}, state, {
							isLoading: false,
							message: {
								show: true,
								context: MESSAGE_CONTEXT.danger,
								message: action.error || "Could not retrieve data in time, please try again"
							}

						});
				}
		}
	} else {
		return state;
	}
}

const reducer = combineReducers({
	app,
	routing: routerReducer,
	user: User
});

export default reducer;