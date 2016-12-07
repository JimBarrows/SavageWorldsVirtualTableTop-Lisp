'use strict';
import React from "react";
import {DangerAlert, TextAreaFormGroup, TextFormGroup} from "bootstrap-react-components";
import SettingRules from "./SettingRule/List";
import RaceList from "./Race/List";
import SkillList from "./Skill/SkillList";
import {EdgeTypeList} from "./EdgeTypeList";
import {EdgeList} from "./EdgeList";

class PlotPointForm extends React.Component {

	cancel(event) {
		event.preventDefault();
		this.props.onCancel();
	}

	componentWillMount() {
		this.propsToState(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.propsToState(nextProps);
	}

	constructor(props) {
		super(props);
		this.state = {
			_id: '',
			description: "",
			name: "",
			settingRules: [],
			skillDescriptions: [],
			edges: [],
			edgeTypes: []
		}
	}

	descriptionChange(event) {
		this.setState({
			description: event.target.value
		})
	}

	edgesChange(edges) {
		this.setState({
			edges
		});
	}

	edgeTypesChange(edgeTypes) {
		this.setState({
			edgeTypes
		});
	}

	nameChange(event) {
		this.setState({
			name: event.target.value
		});
	}

	propsToState(props) {
		let {name = "", description = "", _id = "", settingRules = [], races = [], skillDescriptions = [], edges = [], edgeTypes = []}  = props.plotPoint;
		this.setState({
			name, description, _id, settingRules, races, skillDescriptions, edges, edgeTypes
		});
	}

	racesChange(races) {
		this.setState({
			races
		});
	}

	render() {
		let {name, description, settingRules, races, skillDescriptions, edges, edgeTypes, error} = this.state;
		return (
				<form id="plotPointForm">
					<DangerAlert error={error}/>
					<TextFormGroup
							error={error}
							label="Name"
							name="name"
							onChange={this.nameChange.bind(this)}
							value={name}
					/>
					<TextAreaFormGroup label="Description" id="description"
					                   onChange={this.descriptionChange.bind(this)} value={description}/>
					<SettingRules list={settingRules} onListChange={this.settingRulesChange.bind(this)} allowEditing={true}/>
					<RaceList list={races} onListChange={this.racesChange.bind(this)} allowEditing={true}/>
					<SkillList list={skillDescriptions} onListChange={this.skillDescriptionsChange.bind(this)}
					           allowEditing={true}/>
					<EdgeTypeList list={edgeTypes} onListChange={this.edgeTypesChange.bind(this)} allowEditing={true}/>
					<EdgeList list={edges} onListChange={this.edgesChange.bind(this)} allowEditing={true}/>
					<button type="button" class="btn btn-primary" onClick={this.submit.bind(this)}>Save</button>
					<button type="button" class="btn btn-default" onClick={this.cancel.bind(this)}>Cancel</button>
				</form>
		);
	}

	settingRulesChange(newRules) {
		this.setState({
			settingRules: newRules
		});
	}

	skillDescriptionsChange(skillDescriptions) {
		this.setState({
			skillDescriptions
		});
	}

	submit(event) {
		event.preventDefault();
		let {name = "", description = "", _id = "", settingRules = [], races = [], skillDescriptions = [], edges = [], edgeTypes = []} = this.state;
		this.props.onSubmit({_id, description, name, settingRules, races, skillDescriptions, edges, edgeTypes});
	}
}
export default PlotPointForm;