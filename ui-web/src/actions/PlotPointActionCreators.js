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
			let {
				    description,
				    _links,
				    name,
				    maximumMinorHindrances,
				    maximumMajorHindrances,
				    maximumAttributePoints,
				    maximumSkillPoints
			    } = plotPoint;
			dispatch({
				type   : plotPoint_constants.PLOT_POINT_LOAD_SUCCESS,
				payload: {
					description,
					_links,
					name,
					maximumMinorHindrances,
					maximumMajorHindrances,
					maximumAttributePoints,
					maximumSkillPoints,
					result: API_RESULT_SUCCESS,
					status: API_STATUS_FINISHED
				}
			});
		}
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

export function savePlotPoint() {
	return function (dispatch, getState) {
		dispatch({
			type   : plotPoint_constants.PLOT_POINT_SAVE_BEGIN,
			payload: {
				status: {
					API_STATUS_STARTED
				}
			}
		});
		let {
			    name,
			    description,
			    _links,
			    maximumMinorHindrances,
			    maximumMajorHindrances,
			    maximumAttributePoints,
			    maximumSkillPoints
		    }    = getState().PlotPoint;
		let link = (_links && _links.self &&_links.self.href) || '/api/plotPoints';
		axios({
			method: _links ? 'put' : 'post',
			url   : link,
			data  : {
				name,
				description,
				maximumMinorHindrances,
				maximumMajorHindrances,
				maximumAttributePoints,
				maximumSkillPoints
			}
		}).then(checkHttpStatus)
				.then(parseJSON)
				.then(data => dispatch({
					type   : plotPoint_constants.PLOT_POINT_SAVE_SUCCESS,
					payload: {
						description           : data.description,
						_links                : _links,
						maximumMinorHindrances: data.maximumMinorHindrances,
						maximumMajorHindrances: data.maximumMajorHindrances,
						maximumAttributePoints: data.maximumAttributePoints,
						maximumSkillPoints    : data.maximumSkillPoints,
						name                  : data.name
					}
				}))
				.catch(error =>
						dispatch({
							type   : plotPoint_constants.PLOT_POINT_SAVE_FAILURE,
							payload: {
								status: API_STATUS_FINISHED,
								result: API_RESULT_FAILURE,
								error : convertErrorToString(error)
							}
						}));
	};
}