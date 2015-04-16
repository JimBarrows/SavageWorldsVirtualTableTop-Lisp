import Ember from 'ember';

export default Ember.Controller.extend({
	startingAttributePoints: 	5,
	startingSkillPoints: 		15,
	startingMajorHindrances: 	1,
	startingMinorHindrances: 	2,
	attributePoints: 			5,
	skillPoints: 				15,
	majorHindrances: 			1,
	minorHindrances: 			2,
	hindrancePoints:            0,
	startingCash:               500,
	availableHindrances:        [],
	actions: {
		save:function() {
			var controller = this;
			this.model.save().then(function( newCharacter) {
				Ember.get(controller, 'flashes').success('Success!', 2000);
				controller.transitionToRoute('character.edit', newCharacter);
			});
		},
		cancel: function() {
			this.model.destroyRecord();
			this.transitionToRoute('characters');
		},
		attributeIncremented: function() {
			this.set( "attributePoints", this.get("attributePoints") - 1);
		},
		attributeDecremented: function() {
			this.set( "attributePoints", this.get("attributePoints") + 1);
		},
		increment: function( skill) {
			if( skill.increment()){
				if( skill.get('rating') > this.model.get( skill.get('description').get('attribute').toLowerCase())){
					this.decrementProperty('skillPoints');	
				}
				this.decrementProperty('skillPoints');
			}
			
		},
		decrement: function( skill) {
			var decrementTwice = skill.get('rating') > this.model.get( skill.get('description').get('attribute').toLowerCase());
			if( skill.decrement()) {
				if( decrementTwice){
					this.incrementProperty('skillPoints');	
				}
				this.incrementProperty('skillPoints');
			}
		},
		majorHindrance: function( hindrance) {
			this.model.get('hindrances').addRecord(hindrance);
			this.decrementProperty("majorHindrances");
			this.incrementProperty("hindrancePoints");
			this.incrementProperty("hindrancePoints");
			this.filterHindrances();
		},
		minorHindrance: function( hindrance) {
			this.model.get('hindrances').addRecord(hindrance);
			this.decrementProperty("minorHindrances");
			this.incrementProperty("hindrancePoints");
			this.filterHindrances();
		}
	},
	filterHindrances: function() {
		var thisController = this;
		var hasMajorHindrancesLeft = this.get('majorHindrances') > 1;
		var hasMinorHindrancesLeft = this.get('minorHindrances') > 0;
		var availableHindrances = [];
		var model = this.get( 'model');
		model.get( 'plotPoint').get( 'hindrances').forEach(function( hindrance){
			if( hindrance.get('isMajor')  && hasMajorHindrancesLeft ) {
				availableHindrances.push(hindrance);
			} else if( hindrance.get('isMinor') && hasMinorHindrancesLeft) {
				availableHindrances.push(hindrance);
			} else if( hindrance.get('isMajorOrMinor') && ( hasMajorHindrancesLeft  || hasMinorHindrancesLeft)){
				availableHindrances.push(hindrance);
			}
		});
		this.set('availableHindrances', availableHindrances);
	},
	hasAttributePoints: function() {
		if( this.get("attributePoints") < 0){
			return false;
		} else {
			return true;
		}
	}.property("attributePoints"),
	has2OrMoreHindrancePoints: function() {
		return this.get('hindrancePoints') >= 2;
	}.property("hindrancePoints"),
	has1OrMoreHindrancePoints: function(){
		return this.get('hindrancePoints') >= 1;
	}.property("hindrancePoints")
});
