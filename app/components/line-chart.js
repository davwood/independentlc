import Ember from 'ember';
import { select } from 'd3-selection';
import { line } from 'd3-shape';

export default Ember.Component.extend({
  didInsertElement() {
     this.plot = select(this.element.querySelector('svg'));
   },

   didRender() {
     // NOTE: Do things with the DOM after it has rendered.
     this.plot.append('rect').attr('fill', '#15CD72');
   }
});
