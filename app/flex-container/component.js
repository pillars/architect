import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  attributeBindings: ['style'],
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
