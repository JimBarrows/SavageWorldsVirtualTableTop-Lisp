import {action} from '@storybook/addon-actions'
import {storiesOf} from '@storybook/react'
import React from 'react'
import Navigation from '../src/components/PlotPointEditor/Navigation'
import PlotPoint from '../src/components/PlotPointEditor/PlotPoint'
import SettingRules from '../src/components/PlotPointEditor/setting_rules/index'

let plotPoint = {
	aircraft               : [],
	ammunition             : [],
	arcaneBackgrounds      : [],
	armor                  : [],
	beasts                 : [],
	characters             : [],
	display_section        : 'main',
	description            : ' ',
	edges                  : [],
	groundVehicles         : [],
	handWeapons            : [],
	hindrances             : [],
	maximumAttributePoints : 5,
	maximumMajorHindrances : 1,
	maximumMinorHindrances : 2,
	maximumSkillPoints     : 15,
	mundaneItems           : [],
	name                   : ' ',
	powers                 : [],
	races                  : [],
	rangedWeapons          : [],
	settingRules           : [{
		name       : 'Rule 1',
		description: 'Rule 1 description'
	}],
	skills                 : [],
	specialWeapons         : [],
	trappingsAndEffects    : [],
	vehicleMountedAndAtGuns: [],
	watercraft             : []
}

storiesOf('Plot Point Editor/Navigation', module)
	.addDecorator((story) => <div className="container-fluid">
		<div className={'row'}>{story()}</div>
	</div>)
	.add('Basic', () => <Navigation id={'basic'} navigateTo={action('Basic Navigation changed')}/>)

storiesOf('Plot Point Editor/Form', module)
	.addDecorator((story) => <div className="container-fluid">
		<div className={'row'}>{story()}</div>
	</div>)
	.add('Plot Point', () => <PlotPoint id={'plotpoint'} onChange={pp => action(`pp: ${pp}`)} plotPoint={plotPoint}
	                                    show={'PlotPoint'}/>)
	.add('Setting Rules', () => <SettingRules id={'settingrules'} onChange={pp => action(`pp: ${pp}`)}
	                                          plotPoint={plotPoint} show={'SettingRules'}/>)

