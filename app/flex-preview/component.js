import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['style'],

  style: Ember.computed(
    'flexContainer.totalItemsWidth',
    function () {
      const css = [];
      css.push(`width: ${this.get('flexContainer.totalItemsWidth')}px;`);
      return Ember.String.htmlSafe(css.join(' '));
    }
  )
});
