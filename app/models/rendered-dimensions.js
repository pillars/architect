import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  width  : DS.attr('integer'),
  height : DS.attr('integer')
});
