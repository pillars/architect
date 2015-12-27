import DS from 'ember-data';

export default DS.Model.extend({
  direction : DS.attr('string'),
  overflow  : DS.attr('string'),
  width     : DS.attr('string', {defaultValue: '100%'}),

  items: DS.hasMany('flex-item')
});
