import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['flex-item'],
  attributeBindings: ['style'],

  style: Ember.computed(
    'flexItem.dimensions.width',
    function () {
      const css = [];
      css.push(`width: ${this.get('flexItem.dimensions.width')}px;`);
      return Ember.String.htmlSafe(css.join(' '));
    }
  ),

  actions: {
  }
});
