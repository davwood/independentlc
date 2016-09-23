import Ember from 'ember';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { scaleLinear } from 'd3-scale';

export default Ember.Component.extend({
  margin: { top: 20, right: 20, bottom: 20, left: 80 },
  fullWidth: 800,
  fullHeight: 300,
  // baselineGenerator: line().
  //   x((d, i) => x(i)).
  //   y(d => y(d.baseline)),

  didInsertElement() {
     this.plot = select(this.element.querySelector('svg'));
   },

  didRender() {
    // NOTE: Do things with the DOM after it has rendered.
    const data = this.get('data');
    const width = this.get('fullWidth') - this.get('margin')['top'] - this.get('margin')['right'];
    const height = this.get('fullHeight') - this.get('margin')['top'] - this.get('margin')['bottom'];

    const x = scaleLinear().range([0, width]);
    const y = scaleLinear().range([0, height]);

    const lineGenerator = line().
    x((d) => d).
    y((d,i) => i);
    // this.get('x').domain([0, data.length - 1]);
    // this.get('y').domain([data[0].balance, 0]);
    x.domain([0, data.length - 1]);
    y.domain([data[0], 0]);

    this.plot.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));
      //
    //
    this.plot.append("g")
        .attr("class", "axis axis--y")
        .call(axisLeft(y))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    this.plot.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", lineGenerator);
  }
});
