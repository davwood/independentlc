import Ember from 'ember';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { transition } from 'd3-transition';

const margin = {top: 20, right: 20, bottom: 30, left: 50};
const fullWidth = 800;
const fullHeight = 300;
const width = fullWidth - margin.left - margin.right;
const height = fullHeight - margin.top - margin.bottom;

const x = scaleLinear().range([0, width]);
const y = scaleLinear().range([0, height]);

const lineGenerator = line()
  .x((d, i) => x(i))
  .y((d) => y(d));

export default Ember.Component.extend({

  didInsertElement() {
     this.plot = select(this.element.querySelector('svg'));

     const data = this.get('data');

     x.domain([0, data.length - 1]);
     y.domain([data[0], 0]);

     const svg = this.plot.attr("width", fullWidth)
       .attr("height", fullHeight)
       .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     svg.append("g")
       .attr("class", "axis axis--x")
       .attr("transform", "translate(0," + height + ")")
       .call(axisBottom().scale(x).ticks(Math.min(data.length, 30)));

     svg.append("g")
         .attr("class", "axis axis--y")
         .call(axisLeft().scale(y))
       .append("text")
         .attr("class", "axis-title")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text("Price ($)");

     svg.append("path")
       .datum(data)
       .attr("class", "line")
       .attr("d", lineGenerator);
   },

  didRender() {
    // NOTE: Do things with the DOM after it has rendered.

  },
  didUpdateAttrs() {
    const data = this.get('data');
    select(".line").transition().duration(750).attr("d", lineGenerator(data));
  }
});
