import {FontAwesomeIcon}       from '@fortawesome/react-fontawesome'
import {API, graphqlOperation} from 'aws-amplify'
import {Button, PageHeader}    from 'bootstrap-react-components'
import React                   from 'react'
import PlotPointList           from '../components/plotpoint/list/index'
import {listPlotPoints}        from '../graphql/queries'

export default class PlotPointListPage extends React.Component {

	navigateToNewPlotPoint = () => this.props.history.push('/plot_point/add')

	plotPointList = () => <PlotPointList id={'mainPlotPointList'} plotPoints={this.state.plotPoints} />

	render = () =>
		<div id='PlotPointListPage' >
			<PageHeader id='PlotPointListPage' ><h1 >Plot Points</h1 ></PageHeader >
			<Button id='addPlotPoint' onClick={this.navigateToNewPlotPoint} >
				<FontAwesomeIcon icon={'plus'} />&nbsp;Add
			</Button >
			{this.state.plotPoints.length > 0 ? this.plotPointList() : <p >There are no plot points, please add one</p >}
		</div >

	state = {
		plotPoints: [],
		page      : {},
		links     : {}
	}

	async componentDidMount () {
		let response = await API.graphql(graphqlOperation(listPlotPoints))
		this.setState({plotPoints: response.data.listPlotPoints.items})
	}

}

