import {withAuthenticator} from 'aws-amplify-react'
import React, {Component}  from 'react'
import {Route, Switch}     from 'react-router-dom'
import './App.css'
import Header              from './components/Header'
import PlotPointEditor     from './pages/PlotPointEditor'
import PlotPointList       from './pages/PlotPointList'


class App extends Component {
	render() {
		return (
				<div>
					<Header/>
					<div id={"layout"} className="container" role={"main"}>
						<Switch>
							<Route exact path="/" component={PlotPointList}/>
							<Route exact path='/plotPointEditor' component={PlotPointEditor}/>
							<Route exact path={"/plotPointEditor/:name"} component={PlotPointEditor}/>
						</Switch>
					</div>
				</div>
		);
	}
}

export default withAuthenticator(App)