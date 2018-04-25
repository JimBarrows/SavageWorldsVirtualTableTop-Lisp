/**
 * Created by JimBarrows on 4/23/18.
 */
import axios from 'axios';
import {application_constants, plotPoint_constants} from '../constants';
import {checkHttpStatus, convertErrorToString, parseJSON} from '../utils';

let {
	    API_STATUS_FINISHED, API_RESULT_FAILURE, API_RESULT_SUCCESS, API_STATUS_STARTED
    } = application_constants;


export function cancelChanges() {
	return {
		type: plotPoint_constants.PLOT_POINT_CANCEL
	};
}

export function descriptionChange(description) {
	return {
		type   : plotPoint_constants.PLOT_POINT_DESCRIPTION_CHANGE,
		payload: {
			description
		}
	};
}

export function loadPlotPoint(name) {
	return function (dispatch, getState) {
		dispatch({
			type   : plotPoint_constants.PLOT_POINT_LOAD_BEGIN,
			payload: {
				status: {
					API_STATUS_STARTED
				}
			}
		});
		let list      = getState().PlotPointList;
		let plotPoint = list.plotPoints.find(pp => pp.name === name);
		if (plotPoint) {
			let {description, name, maximumMinorHindrances, maximumMajorHindrances, maximumAttributePoints, maximumSkillPoints} = plotPoint;
			dispatch({
				type   : plotPoint_constants.PLOT_POINT_LOAD_SUCCESS,
				payload: {
					description, name, maximumMinorHindrances, maximumMajorHindrances, maximumAttributePoints, maximumSkillPoints,
					result: API_RESULT_SUCCESS,
					status: API_STATUS_FINISHED
				}
			});
		}
		// axios.put(plotPoint._links.self.href, modifiedPlotPoint)
		// 		.then(checkHttpStatus)
		// 		.then(parseJSON)
		// 		.then(data => {
		// 			if (data.error) {
		// 				dispatch({
		// 					type   : plotPoint_constants.PLOT_POINT_LOAD_FAILURE,
		// 					payload: {
		// 						status: API_STATUS_FINISHED,
		// 						result: API_RESULT_FAILURE,
		// 						error : convertErrorToString(data.error)
		// 					}
		// 				});
		// 			} else {
		// 				dispatch({
		// 					type   : plotPoint_constants.PLOT_POINT_LOAD_SUCCESS,
		// 					payload: {
		// 						plotPoint: data,
		// 						result   : API_RESULT_SUCCESS,
		// 						status   : API_STATUS_FINISHED
		// 					}
		// 				});
		// 			}
		// 		})
		// 		.catch(error => {
		// 			dispatch({
		// 				type   : plotPoint_constants.PLOT_POINT_LOAD_FAILURE,
		// 				payload: {
		// 					status: API_STATUS_FINISHED,
		// 					result: API_RESULT_FAILURE,
		// 					error : convertErrorToString(error)
		// 				}
		// 			});
		// 		});
	};
}

export function maximumAttributePointsChange(maximumAttributePoints) {
	return {
		type   : plotPoint_constants.PLOT_POINT_MAXIMUM_ATTRIBUTE_POINT_CHANGE,
		payload: {
			maximumAttributePoints
		}
	};
}

export function maximumMajorHindrancesChange(maximumMajorHindrances) {
	return {
		type   : plotPoint_constants.PLOT_POINT_MAXIMUM_MAJOR_HINDRANCE_CHANGE,
		payload: {
			maximumMajorHindrances
		}
	};
}

export function maximumMinorHindrancesChange(maximumMinorHindrances) {
	return {
		type   : plotPoint_constants.PLOT_POINT_MAXIMUM_MINOR_HINDRANCE_CHANGE,
		payload: {
			maximumMinorHindrances
		}
	};
}

export function maximumSkillPointsChange(maximumSkillPoints) {
	return {
		type   : plotPoint_constants.PLOT_POINT_MAXIMUM_SKILL_POINTS_CHANGE,
		payload: {
			maximumSkillPoints
		}
	};
}

export function nameChange(name) {
	return {
		type   : plotPoint_constants.PLOT_POINT_NAME_CHANGE,
		payload: {
			name
		}
	};
}

export function newPlotPoint() {
	return {
		type: plotPoint_constants.PLOT_POINT_NEW
	};
}