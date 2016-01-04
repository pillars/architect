import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  resizer: Ember.inject.service(),

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
    'flexContainer.width',
    function () {
      const width = this.get('flexContainer.width');
      // TODO Escape CSS width - KL
      // let value = Ember.Handlebars.Utils.escapeExpression(params[0]);
      return Ember.String.htmlSafe(`width: ${width};`);
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

  setRenderedDimensions() {
    const $el    = this.$('.flex-container');
    const width  = $el.outerWidth();
    const height = $el.outerHeight();
    this.setProperties({
      'flexContainer.dimensions.width'  : width,
      'flexContainer.dimensions.height' : height
    });
    Ember.Logger.log('[flexContainer] Set dimensions', {width, height});
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
