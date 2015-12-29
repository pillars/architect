import DS from 'ember-data';
import MF from 'model-fragments';
import Ember from 'ember';

export default DS.Model.extend({
  // Attributes
  direction          : DS.attr('string'),
  overflow           : DS.attr('string'),
  width              : DS.attr('string', {defaultValue: '100%'}),
  renderedSpacing    : MF.fragment('rendered-spacing', {defaultValue: {}}),
  renderedDimensions : MF.fragment('rendered-dimensions', {defaultValue: {}}),

  // Relations
  flexItems          : DS.hasMany('flex-item', {async: false}),

  isScrollable: Ember.computed.equal('overflow', 'scroll'),

  hasFreeSpace: Ember.computed(
    'renderedSpacing.freeSpace',
    function () {
      const freeSpace = this.get('renderedSpacing.freeSpace');
      return !freeSpace || freeSpace > 0;
    }
  ),

  spacingChanged: Ember.observer(
    'renderedDimensions.width',
    'flexItems.@each.hasFixedWidth',
    'flexItems.@each.renderedDimensions.width',
    'flexItems.@each.renderedDimensions.height',
    function () {
      Ember.run.cancel(this.get('spacingChangedTimer'));
      const timer = Ember.run.later(() => {
        const usedSpace     = this.getFixedSpace();
        const renderedWidth = this.get('renderedDimensions.width');
        this.setProperties({
          'renderedSpacing.usedSpace' : usedSpace,
          'renderedSpacing.freeSpace' : renderedWidth - usedSpace
        });
      }, 50);
      this.set('spacingChangedTimer', timer);
    }
  ),

  getFixedSpace() {
    return (
      this.get('flexItems')
        .filterBy('hasFixedWidth')
        .getEach('width')
        .reduce((sum, width) => sum + parseInt(width, 10), 0)
    );
  },
});
