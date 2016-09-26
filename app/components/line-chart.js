import Ember from 'ember';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

export default Ember.Component.extend({
  margin: {top: 20, right: 20, bottom: 30, left: 50},
  fullWidth: 800,
  fullHeight: 300,

  didInsertElement() {
     this.plot = select(this.element.querySelector('svg'));
   },

  didRender() {
    // NOTE: Do things with the DOM after it has rendered.
    const data = this.get('data');
    const width = this.get('fullWidth') - this.get('margin')['left'] - this.get('margin')['right'];
    const height = this.get('fullHeight') - this.get('margin')['top'] - this.get('margin')['bottom'];

    const x = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    const y = scaleLinear()
      .domain([data[0], 0])
      .range([0, height]);

    const lineGenerator = line()
      .x((d, i) => x(i))
      .y((d) => y(d));

    const svg = this.plot.attr("width", width + this.get('margin')['left'] + this.get('margin')['right'])
      .attr("height", height + this.get('margin')['top'] + this.get('margin')['bottom'])
      .append("g")
      .attr("transform", "translate(" + this.get('margin')['left'] + "," + this.get('margin')['top'] + ")");

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
  }
});
