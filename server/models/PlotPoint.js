'use strict';
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Types  = mongoose.Schema.Types;

export const ranks = ['d4', 'd6', 'd8', 'd10', 'd12'];

export const attributes = ['Agility', 'Smarts', 'Spirit', 'Strength', 'Vigor'];

const RaceAbility = new Schema({
	name: Types.String,
	description: Types.String,
	cost: Types.Number
});

const Race = new Schema({
	name: Types.String,
	description: Types.String,
	abilities: [RaceAbility]
});

const SkillDescription = new Schema({
	name: Types.String,
	description: Types.String,
	attribute: Types.String
});

const HindranceDescription = new Schema({
	name: Types.String,
	description: Types.String,
	effects: Types.String,
	severity: Types.String
});

const SkillRank = new Schema({
	description: [Types.ObjectId],
	rank: {type: Types.String, enum: ranks}
});

const AttributeRank = new Schema({
	attribute: {type: Types.String, enum: attributes},
	rank: {type: Types.String, enum: ranks}
});

const EdgeType = new Schema({
	name: Types.String,
	description: Types.String
});

const EdgeDescription = new Schema({
	name: Types.String,
	description: Types.String,
	effects: Types.String,
	edgeRequirements: [Types.ObjectId],
	attributeRankRequirements: [AttributeRank],
	skillRankRequirements: [SkillRank],
	edgeType: EdgeType
});

const MundaneItem = new Schema({
	name: Types.String,
	weight: Types.Number,
	cost: Types.Number,
	type: Types.String
});

const HandWeapon = new Schema({
	name: Types.String,
	type: Types.String,
	era: Types.String,
	weight: Types.Number,
	cost: Types.Number,
	ability: {type: Types.String, enum: attributes},
	dice: {type: Types.String, enum: ranks},
	bonus: Types.Number,
	notes: Types.String
});

const Armor = new Schema({
	name: Types.String,
	type: Types.String,
	era: Types.String,
	points: Types.Number,
	pointsVsBullets: Types.Number,
	armorProtection: Types.Number,
	apVsBullets: Types.Number
});

const RangedWeapon = new Schema({
	name: Types.String,
	type: Types.String,
	era: Types.String,
	weight: Types.Number,
	cost: Types.Number,
	ability: {type: Types.String, enum: attributes},
	dice: {type: Types.String, enum: ranks},
	bonus: Types.Number,
	rateOfFire: Types.Number,
	shots: Types.Number,
	minStr: {Type: Types.String, enum: ranks},
	notes: Types.String,
	short: Types.Number,
	medium: Types.Number,
	long: Types.Number
});

const VehicleMountedAndAtGuns = new Schema({
	name: Types.String,
	type: Types.String,
	era: Types.String,
	short: Types.Number,
	medium: Types.Number,
	long: Types.Number,
	numberOfDice: Types.Number,
	dice: {type: Types.String, enum: ranks},
	armorPiercing: Types.Number,
	heNumberOfDice: Types.Number,
	heDice: {type: Types.String, enum: ranks},
	heAp: Types.Number,
	burstTemplate: Types.String,
	rateOfFire: Types.Number
});

const Ammo = new Schema({
	name: Types.String,
	weightNumerator: Types.Number,
	weightDenominator: Types.Number,
	costNumerator: Types.Number,
	costDenominator: Types.Number,
	notes: Types.String
});

const SpecialWeapons = new Schema({
	name: Types.String,
	type: Types.String,
	era: Types.String,
	short: Types.Number,
	medium: Types.Number,
	long: Types.Number,
	numberOfDie: Types.Number,
	dice: {type: Types.String, enum: ranks},
	bonus: Types.Number,
	rateOfFire: Types.Number,
	minStrength: {type: Types.String, enum: ranks},
	burstTemplate: Types.String,
	weight: Types.Number,
});
const PlotPoint      = new Schema({
	name: Types.String,
	description: Types.String,
	races: [Race],
	skillDescriptions: [SkillDescription],
	hindrances: [HindranceDescription],
	edges: [EdgeDescription],
	startingFund: Types.Number,
	mundaneItems: [MundaneItem],
	handWeapons: [HandWeapon],
	armor: [Armor],
	rangedWeapons: [RangedWeapon],
	creator: Types.ObjectId,
	vehicleMountedAndAtGuns: [VehicleMountedAndAtGuns],
	ammunition: [Ammo],
	specialWeapons: [SpecialWeapons]
});

export default  mongoose.model('PlotPoint', PlotPoint);