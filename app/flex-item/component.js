import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flex-item'],
  classNameBindings: ['isInvisible:is-invisible'],
  attributeBindings: ['style'],

  didInsertElement() {
    this.setRenderedDimensions();
  },

  style: Ember.computed(
    'flexItem.width',
    function () {
      const width = this.get('flexItem.width');

      if (this.get('flexItem.hasFixedWidth')) {
        return `flex: 0 0 ${width};`;
      }
      else {
        return 'flex: 1 1 0;';
      }
    }
  ),

  isInvisible: Ember.computed(
    'flexItem.hasFixedWidth',
    'flexItem.flexContainer.renderedSpacing.freeSpace',
    function () {
      const hasFixedWidth = this.get('flexItem.hasFixedWidth');
      const hasContainerFreeSpace =
        this.get('flexItem.flexContainer.renderedSpacing.freeSpace') > 0;
      return !hasFixedWidth && !hasContainerFreeSpace;
    }
  ),

  // Rendered Dimensions
  // ===================
  dimensionsChanged: Ember.observer(
    'flexItem.width',
    'flexItem.siblings.@each.renderedDimensions.width',
    'flexItem.siblings.@each.renderedDimensions.height',
    'flexItem.flexContainer.renderedDimensions.width',
    'flexItem.flexContainer.renderedDimensions.height',
    function () {
      this.setRenderedDimensions();
    }
  ),

  setRenderedDimensions() {
    const $el = this.$();
    // We delay the mesuring to leave enough time to the DOM to render - KL
    Ember.run.later(() => {
      this.setProperties({
        'flexItem.renderedDimensions.width'  : $el.outerWidth(),
        'flexItem.renderedDimensions.height' : $el.outerHeight()
      });
    }, 30);
  },

  actions: {
    delete() {
      this.get('flexItem').destroyRecord();
    }
  }
});
