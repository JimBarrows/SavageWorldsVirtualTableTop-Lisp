import NumberFormGroup     from 'bootstrap-react-components/distribution/formgroups/NumberFormGroup'
import SelectFormGroup     from 'bootstrap-react-components/distribution/formgroups/SelectFormGroup'
import TextFormGroup       from 'bootstrap-react-components/distribution/formgroups/TextFormGroup'
import PropTypes           from 'prop-types'
import React               from 'react'
import DiceSelectFormGroup from './DiceSelectFormGroup'

export default class SelectedSkillEditor extends React.Component {

	static propTypes = {
		id                  : PropTypes.string.isRequired,
		selectedSkillChanged: PropTypes.func.isRequired,
		skillsAvailable     : PropTypes.array.isRequired
	}

	static defaultProps = {}

	componentDidMount() {
		if (this.props.skill) {
			this.setState(...this.props.skill)
		}
	};

	addSkill     = e => {
		e.preventDefault()
		this.onChange({
			bonus: this.state.bonus,
			dice : this.state.dice,
			note : this.state.note,
			name : this.state.name
									})
	}

	bonusChanged = e => this.setState({bonus: e.target.value})

	diceChanged = e => this.setState({dice: e.target.value})

	noteChanged = e => this.setState({note: e.target.value})

	nameChanged = e => this.setState({name: e.target.value})

	render() {
		let id         = `selectedSkillEditor_${this.props.id}`
		const asString = this.props.skillsAvailable.map(skill => ({value: skill.value.toString(), label: skill.label}))
		return (
			<div id={'SelectedSkillEditorComponent_' + this.props.id} className={'row'} >
				<div className={'col-sm-3'} >
					<SelectFormGroup id={id} onChange={this.nameChanged} options={asString}
						value={this.state.name} />
				</div >
				<div className={'col-sm-2'} >
					<DiceSelectFormGroup id={id} onChange={this.diceChanged} value={this.state.dice} />
				</div >
				<div className={'col-sm-1'} >
					<NumberFormGroup id={id} onChange={this.bonusChanged} value={this.state.bonus} />
				</div >
				<div className={'col-sm-5'} >
					<TextFormGroup id={id} onChange={this.noteChanged} value={this.state.note} />
				</div >
				<div className={'col-sm-1'} >
					<button type={'button'} className={'btn btn-default'} onChange={this.addSkill} >Add</button >
				</div >
			</div >
		)
	}

	state = {
		name : ' ',
		dice : ' ',
		bonus: 0,
		note : ' '
	}
}

