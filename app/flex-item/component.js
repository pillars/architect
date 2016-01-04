import Ember from 'ember';

export default Ember.Component.extend({
  resizer: Ember.inject.service(),

  classNames: ['flex-item'],
  classNameBindings: ['isInvisible:is-invisible'],
  attributeBindings: ['style'],

  didInsertElement() {
    this.get('resizer').add(
      this.element,
      this.setRenderedDimensions.bind(this)
    );
  },

  willRemoveElement() {
    this.get('resizer').removeAllListeners(this.element);
  },

  style: Ember.computed(
    'flexItem.width',
    function () {
      const width = this.get('flexItem.width');
      let css;

      if (this.get('flexItem.hasFixedWidth')) {
        css = `flex: 0 0 ${width};`;
      }
      else {
        css = 'flex: 1 1 0;';
      }
      // TODO Escape CSS width - KL
      // http://emberjs.com/deprecations/v1.x/#toc_binding-style-attributes
      return Ember.String.htmlSafe(css);
    }
  ),

  isInvisible: Ember.computed(
    'flexItem.hasFixedWidth',
    'flexItem.flexContainer.dimensions.freeSpace',
    function () {
      const hasFixedWidth = this.get('flexItem.hasFixedWidth');
      const hasContainerFreeSpace =
        this.get('flexItem.flexContainer.dimensions.freeSpace') > 0;
      return !hasFixedWidth && !hasContainerFreeSpace;
    }
  ),

  // Rendered Dimensions
  // ===================

  setRenderedDimensions() {
    const $el    = this.$();
    const width  = $el.outerWidth();
    const height = $el.outerHeight();
    this.setProperties({
      'flexItem.dimensions.width'  : width,
      'flexItem.dimensions.height' : height
    });
    Ember.Logger.log('[flexItem] Set dimensions', {width, height});
  },

  actions: {
    delete() {
      this.get('flexItem').destroyRecord();
    }
  }
});
