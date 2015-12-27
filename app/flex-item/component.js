import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flex-item'],
  attributeBindings: ['style'],
  style: Ember.computed(
    'flexItem.width',
    function () {
      const width = this.get('flexItem.width');

      if (this.get('isWidthFixed')) {
        return `flex: 0 0 ${width};`;
      }
      else {
        return 'flex: 1 1 0;';
      }
    }
  ),

  isWidthFixed: Ember.computed(
    'flexItem.width',
    function () {
      const width = this.get('flexItem.width') || '';
      return width.indexOf('px') !== -1;
    }
  ),

  actions: {
    delete() {
      this.get('flexItem').destroyRecord();
    }
  }
});
