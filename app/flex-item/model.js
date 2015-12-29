import DS from 'ember-data';
import MF from 'model-fragments';
import Ember from 'ember';

export default DS.Model.extend({
  // Attributes
  width              : DS.attr('string'),
  renderedDimensions : MF.fragment('rendered-dimensions', {defaultValue: {}}),

  // Relations
  flexContainer      : DS.belongsTo('flex-container'),

  // Computed properties
  siblings: Ember.computed.alias('flexContainer.flexItems'),

  hasFixedWidth: Ember.computed(
    'width',
    function () {
      const width = this.get('width') || '';
      return width.indexOf('px') !== -1;
    }
  )
});
