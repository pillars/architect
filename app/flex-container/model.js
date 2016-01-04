import DS from 'ember-data';
import MF from 'model-fragments';
import Ember from 'ember';

export default DS.Model.extend({
  // Attributes
  direction       : DS.attr('string'),
  overflow        : DS.attr('string'),
  width           : DS.attr('string', {defaultValue: '100%'}),
  dimensions      : MF.fragment('container-dimensions', {defaultValue: {}}),

  // Relations
  flexItems       : DS.hasMany('flex-item', {async: false}),

  isScrollable: Ember.computed.equal('overflow', 'scroll'),

  hasFreeSpace: Ember.computed(
    'dimensions.freeSpace',
    function () {
      const freeSpace = this.get('dimensions.freeSpace');
      return !freeSpace || freeSpace > 0;
    }
  ),

  dimensionsChanged: Ember.observer(
    'dimensions.width',
    'dimensions.height',
    'flexItems.@each.hasFixedWidth',
    'flexItems.@each.dimensions.width',
    'flexItems.@each.dimensions.height',
    function () {
      Ember.run.cancel(this.get('dimensionsTimer'));
      const timer = Ember.run.later(() => {
        const usedSpace  = this.getFixedSpace();
        const freeSpace  = this.get('dimensions.width') - usedSpace;
        const totalWidth = this.getTotalItemsWidth();
        this.setProperties({
          'dimensions.usedSpace'       : usedSpace,
          'dimensions.freeSpace'       : freeSpace,
          'dimensions.totalItemsWidth' : totalWidth
        });
        Ember.Logger.log(
          '[flexContainer] Set spacing',
          {usedSpace, freeSpace, totalWidth}
        );
      }, 300);
      this.set('dimensionsTimer', timer);
    }
  ),

  getTotalItemsWidth() {
    return (
      this
        .get('flexItems')
        .getEach('dimensions.width')
        .reject((width) => !width)
        .reduce((sum, width) => sum + parseInt(width, 10), 0)
    );
  },

  getFixedSpace() {
    return (
      this.get('flexItems')
        .filterBy('hasFixedWidth')
        .getEach('width')
        .reduce((sum, width) => sum + parseInt(width, 10), 0)
    );
  },
});
