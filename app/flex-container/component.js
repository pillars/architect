import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  attributeBindings: ['style'],

  didInsertElement() {
    this.setRenderedDimensions();
    Ember.$(window).on('resize', this.setRenderedDimensions.bind(this));
  },

  willDestroyElement() {
    Ember.$(window).off('resize', this.setRenderedDimensions.bind(this));
  },

  style: Ember.computed(
    'flexContainer.width',
    function () {
      const width = this.get('flexContainer.width');
      return `width: ${width};`;
    }
  ),

  layoutClassName: Ember.computed(
    'flexContainer.direction',
    'flexContainer.overflow',
    function () {
      const classNames = [];
      const direction = this.get('flexContainer.direction');
      const overflow  = this.get('flexContainer.overflow');

      if (direction === 'row') {
       classNames.push('flex-rows');
      }
      else {
        classNames.push('flex-cols');
      }

      if (overflow === 'scroll') {
       classNames.push('flex-scrollable');
      }

      return classNames.join(' ');
    }
  ),

  // Scroll
  // ===================

  isScrollable: Ember.computed(
    'flexContainer.overflow',
    {
      get() {
        return this.get('flexContainer.overflow') === 'scroll';
      },
      set(key, value) {
        const overflow = value ? 'scroll' : 'hidden';
        this.set('flexContainer.overflow', overflow);
        return value;
      }
    }
  ),

  resetScroll: Ember.observer(
    'flexContainer.overflow',
    function () {
      if (this.get('flexContainer.overflow') === 'hidden') {
        this.$('.flex-container').scrollTop(0).scrollLeft(0);
      }
    }
  ),

  // Rendered Dimensions
  // ===================

  dimensionsChanged: Ember.observer(
    'flexContainer.width',
    function () {
      this.setRenderedDimensions()
    }
  ),

  setRenderedDimensions() {
    const $el = this.$('.flex-container');
    // We delay the mesuring to leave enough time to the DOM to render - KL
    Ember.run.later(() => {
      this.setProperties({
        'flexContainer.renderedDimensions.width'  : $el.outerWidth(),
        'flexContainer.renderedDimensions.height' : $el.outerHeight()
      });
    }, 30);
  },

  actions: {
    setDirection(direction) {
      this.get('flexContainer').set('direction', direction);
    },
    addItem() {
      this.get('store').createRecord('flex-item', {
        flexContainer: this.get('flexContainer')
      });
    }
  }
});
