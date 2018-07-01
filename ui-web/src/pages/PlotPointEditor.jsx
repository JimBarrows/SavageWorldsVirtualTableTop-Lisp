import {API} from 'aws-amplify'
import {NumberFormGroup, PageHeader, TextAreaFormGroup, TextFormGroup} from 'bootstrap-react-components'
import React from 'react'
import {withRouter} from 'react-router'
import AircraftEditorList from '../components/lists/AircraftEditorList'
import AmmunitionEditorList from '../components/lists/AmmunitionEditorList'
import ArcaneBackgroundEditorList from '../components/lists/ArcaneBackgroundEditorList'
import ArmorEditorList from '../components/lists/ArmorEditorList'
import BeastsEditorList from '../components/lists/BeastsEditorList'
import CharacterEditorList from '../components/lists/CharacterEditorList'
import EdgeEditorList from '../components/lists/EdgeEditorList'
import GroundVehiclesEditorList from '../components/lists/GroundVehiclesEditorList'
import HandWeaponsEditorList from '../components/lists/HandWeaponsEditorList'
import HindranceEditorList from '../components/lists/HindranceEditorList'
import MundaneItemEditorList from '../components/lists/MundaneItemEditorList'
import PowersEditorList from '../components/lists/PowersEditorList'
import RaceEditorList from '../components/lists/RaceEditorList'
import RangedWeaponEditorList from '../components/lists/RangedWeaponEditorList'
import SkillEditorList from '../components/lists/SkillEditorList'
import SpecialWeaponsEditorList from '../components/lists/SpecialWeaponsEditorList'
import TrappingsAndEffectsEditorList from '../components/lists/TrappingsAndEffectsEditorList'
import VehicleMountedAndAtGunsEditorList from '../components/lists/VehicleMountedAndAtGunsEditorList'
import WatercraftEditorList from '../components/lists/WatercraftEditorList'


class PlotPointEditor extends React.Component {

  static defaultProps = {
    id: 'PlotPointEditorPage'
  }

  state = {
    aircraft               : [],
    ammunition             : [],
    arcaneBackgrounds      : [],
    armor                  : [],
    beasts                 : [],
    characters             : [],
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
    skills                 : [],
    specialWeapons         : [],
    trappingsAndEffects    : [],
    vehicleMountedAndAtGuns: [],
    watercraft             : []
  }

  aircraftChange                = aircraft => this.setState({aircraft})
  ammunitionChange              = ammunition => this.setState({ammunition})
  arcaneBackgroundChange        = arcaneBackgrounds => this.setState({arcaneBackgrounds})
  armorChange                   = armor => this.setState({armor})
  beastsChange                  = beasts => this.setState({beasts})
  charactersChange              = characters => this.setState({characters})
  cancel                        = e => {
    e.preventDefault()
    this.props.cancel()
  }
  descriptionChange             = e => this.setState({description: e.target.value})
  edgesChange                   = edges => this.setState({edges})
  groundVehiclesChange          = groundVehicles => this.setState({groundVehicles})
  handWeaponsChange             = handWeapons => this.setState({handWeapons})
  hindrancesChange              = hindrances => this.setState({hindrances})
  maximumAttributePointsChange  = e => this.setState({maximumAttributePoints: parseInt(e.target.value, 10)})
  maximumMajorHindrancesChange  = e => this.setState({maximumMajorHindrances: parseInt(e.target.value, 10)})
  maximumMinorHindrancesChange  = e => this.setState({maximumMinorHindrances: parseInt(e.target.value, 10)})
  maximumSkillPointsChange      = e => this.setState({maximumSkillPoints: parseInt(e.target.value, 10)})
  mundaneItemsChange            = mundaneItems => this.setState({mundaneItems})
  nameChange                    = e => this.setState({name: e.target.value})
  powersChange                  = powers => this.setState({powers})
  racesChange                   = races => this.setState({races})
  rangedWeaponsChange           = rangedWeapons => this.setState({rangedWeapons})
  skillsChange                  = skills => this.setState({skills})
  specialWeaponsChange          = specialWeapons => this.setState({specialWeapons})
  trappingsAndEffectsChange     = trappingsAndEffects => this.setState({trappingsAndEffects})
  vehicleMountedAndAtGunsChange = vehicleMountedAndAtGuns => this.setState({vehicleMountedAndAtGuns})
  watercraftChange              = watercraft => this.setState({watercraft})

  save = async e => {
    e.preventDefault()
    let toSave = {
      aircraft              : this.state.aircraft,
      ammunition            : this.state.ammunition,
      arcaneBackgrounds     : this.state.arcaneBackgrounds,
      armor                 : this.state.armor,
      beasts                : this.state.beasts,
      characters            : this.state.characters,
      description           : this.state.description,
      edges                 : this.state.edges,
      groundVehicles        : this.state.groundVehicles,
      handWeapons           : this.state.handWeapons,
      hindrances            : this.state.hindrances,
      maximumAttributePoints: this.state.maximumAttributePoints,
      maximumMajorHindrances: this.state.maximumMajorHindrances,
      maximumMinorHindrances: this.state.maximumMinorHindrances,
      maximumSkillPoints    : this.state.maximumSkillPoints,
      mundaneItems           : this.state.mundaneItems,
      name                   : this.state.name,
      powers                 : this.state.powers,
      races                  : this.state.races,
      rangedWeapons          : this.state.rangedWeapons,
      skills                 : this.state.skills,
      specialWeapons         : this.state.specialWeapons,
      trappingsAndEffects    : this.state.trappingsAndEffects,
      vehicleMountedAndAtGuns: this.state.vehicleMountedAndAtGuns,
      watercraft             : this.state.watercraft
    }
    if (this.props.match.params.name) {
      await API.put('PlotPointsCRUD', `/PlotPoints`, {
        body: {...toSave}
      })
    } else {
      await API.post('PlotPointsCRUD', `/PlotPoints`, {
        body: {...toSave}
      })
    }

    this.props.history.push('/')
  }

  async componentDidMount() {
    if (this.props.match.params.name) {
      let plotPoint = await API.get('PlotPointsCRUD', `/PlotPoints/object/${this.props.match.params.name}`)
      this.setState({
        ...plotPoint
      })
    }
  };

  render() {
    return <div id={this.props.id}>
      <PageHeader id={this.props.id}><h1>Plot Point Editor</h1></PageHeader>
      <form id='plotPointForm'>
        <TextFormGroup id='plotPointName' label='Name' onChange={this.nameChange} required={true}
                       value={this.state.name}/>
        <TextAreaFormGroup id={'plotPointDescription'} label={'Description'} onChange={this.descriptionChange}
                           value={this.state.description}/>
        <h1>Basic Rules</h1>
        <NumberFormGroup id={'maximumAttributePoints'} label={'Maximum Attribute Points'}
                         onChange={this.maximumAttributePointsChange} required={true}
                         value={this.state.maximumAttributePoints}/>
        <NumberFormGroup id={'maximumMajorHindrances'} label={'Maximum Number of Major Hindrances'}
                         onChange={this.maximumMajorHindrancesChange} required={true}
                         value={this.state.maximumMajorHindrances}/>
        <NumberFormGroup id={'maximumMinorHindrances'} label={'Maximum Number of Minor Hindrances'}
                         onChange={this.maximumMinorHindrancesChange} required={true}
                         value={this.state.maximumMinorHindrances}/>
        <NumberFormGroup id={'maximumSkillPoints'} label={'Maximum Skill Points'}
                         onChange={this.maximumSkillPointsChange} required={true}
                         value={this.state.maximumSkillPoints}/>
        <h1>Character Creation</h1>
        <RaceEditorList id={'PlotPoint'} races={this.state.races} racesChange={this.racesChange}/>
        <SkillEditorList id={'PlotPoint'} skills={this.state.skills} skillsChange={this.skillsChange}/>
        <HindranceEditorList id={'PlotPoint'} hindrances={this.state.hindrances}
                             hindrancesChange={this.hindrancesChange}/>
        <EdgeEditorList id={'PlotPoint'} edges={this.state.edges} edgesChange={this.edgesChange}/>
        <h1>Gear</h1>
        <MundaneItemEditorList id={'PlotPoint'} mundaneItems={this.state.mundaneItems}
                               mundaneItemsChange={this.mundaneItemsChange}/>
        <HandWeaponsEditorList id={'PlotPoint'} handWeapons={this.state.handWeapons}
                               handWeaponsChange={this.handWeaponsChange}/>
        <ArmorEditorList id={'PlotPoint'} armor={this.state.armor} armorChange={this.armorChange}/>
        <RangedWeaponEditorList id={'PlotPoint'} rangedWeapons={this.state.rangedWeapons}
                                rangedWeaponsChange={this.rangedWeaponsChange}/>
        <VehicleMountedAndAtGunsEditorList id={'PlotPoint'}
                                           vehicleMountedAndAtGuns={this.state.vehicleMountedAndAtGuns}
                                           vehicleMountedAndAtGunsChange={this.vehicleMountedAndAtGunsChange}/>
        <AmmunitionEditorList id={'PlotPoint'} ammunition={this.state.ammunition}
                              ammunitionChange={this.ammunitionChange}/>
        <SpecialWeaponsEditorList id={'PlotPoint'} specialWeapons={this.state.specialWeapons}
                                  specialWeaponsChange={this.specialWeaponsChange}/>
        <h1>Vehicles</h1>
        <GroundVehiclesEditorList id={'PlotPoint'} groundVehicles={this.state.groundVehicles}
                                  groundVehiclesChange={this.groundVehiclesChange}/>
        <WatercraftEditorList id={'PlotPoint'} watercraft={this.state.watercraft}
                              watercraftChange={this.watercraftChange}/>
        <AircraftEditorList id={'PlotPoint'} aircraft={this.state.aircraft} aircraftChange={this.aircraftChange}/>
        <h1>Powers</h1>
        <ArcaneBackgroundEditorList id={'PlotPoint'} arcaneBackgrounds={this.state.arcaneBackgrounds}
                                    arcaneBackgroundChange={this.arcaneBackgroundChange}/>
        <TrappingsAndEffectsEditorList id={'PlotPoint'} trappingsAndEffects={this.state.trappingsAndEffects}
                                       trappingsAndEffectsChange={this.trappingsAndEffectsChange}/>
        <PowersEditorList id={'PlotPoint'} powers={this.state.powers} powersChange={this.powersChange}/>
        <BeastsEditorList id={'PlotPoint'} beasts={this.state.beasts} beastsChange={this.beastsChange}
                          skills={this.state.skills}/>
        <h1>Characters</h1>
        <CharacterEditorList id={'PlotPoint'} characters={this.state.characters}
                             charactersChange={this.charactersChange}/>
        <button id={'savePlotPointButton'} type={'submit'} className={'btn btn-default'} onClick={this.save}>Save
        </button>
        <button id={'cancelPlotPointButton'} type={'cancel'} className={'btn btn-default'}
                onClick={this.cancel}>Cancel
        </button>
      </form>
    </div>
  }
}

export default withRouter(PlotPointEditor)
