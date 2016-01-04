import Ember from 'ember';
import elementResizeDetectorMaker from "npm:element-resize-detector";

export default Ember.Service.extend({
  init() {
    this.set('ResizeDetectorMaker', elementResizeDetectorMaker({
      strategy: 'scroll'
    }));
    this._super(...arguments);
  },
  add(element, handler) {
    this.get('ResizeDetectorMaker').listenTo(element, handler);
  },
  remove(element, handler) {
    this.get('ResizeDetectorMaker').listenTo(element, handler);
  }
});
