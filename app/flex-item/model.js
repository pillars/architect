import DS from 'ember-data';

export default DS.Model.extend({
  width: DS.attr('string'),
  flexContainer: DS.belongsTo('flex-container')
});
