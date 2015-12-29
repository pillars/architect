import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  usedSpace : DS.attr('integer'),
  freeSpace : DS.attr('integer')
});
