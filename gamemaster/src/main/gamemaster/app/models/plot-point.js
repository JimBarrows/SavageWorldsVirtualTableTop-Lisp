import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  bloodAndGuts: DS.attr('boolean'),
  bornAHero: DS.attr('boolean'),
  criticalFailures: DS.attr('boolean'),
  fanatics: DS.attr('boolean'),
  grittyDamage: DS.attr('boolean'),
  heroesNeverDie: DS.attr('boolean'),
  highAdventure: DS.attr('boolean'),
  jokersWild: DS.attr('boolean'),
  multipleLanguages: DS.attr('boolean'),
  noPowerPoints: DS.attr('boolean'),
  skillSpecialization: DS.attr('boolean'),
  races: DS.hasMany('race')
});
