const svg = d3.select('svg');

const width = parseFloat(svg.attr('width'));
const height = parseFloat(svg.attr('height'));

console.log(typeof width);

//Circle:
const circle = svg.append('circle')
  .attr('r', 150)
  .attr('cx', width/2)
  .attr('cy', height/2)
  .attr('fill', 'gold')
  .attr('stroke', 'black');

const g = svg.append('g')
  .attr('transform', `translate(${width/2}, ${height/2})`);

//LeftEye:
const leftEye = svg.append('circle')
  .attr('r', 15)
  .attr('cx', width/2-60)
  .attr('cy', height/2-60)
  .attr('fill', '#d64c1a');  

//RightEye:
const rightEye = svg.append('circle')
  .attr('r', 15)
  .attr('cx', width/2+60)
  .attr('cy', height/2-60)
  .attr('fill', '#d64c1a');  

//LeftEyebrow:
const leftEyebrow = g.append('rect')
 .attr('fill', '#d64c1a')
 .attr('x', -80)  
 .attr('y', -90)  
 .attr('width', 40)  
 .attr('height', 10)
 .transition().duration(2000)
   .attr('y', -90-30)
 .transition().duration(2000)
   .attr('y', -90) 

//RightEyebrow:
const rightEyebrow = g.append('rect')
 .attr('fill', '#d64c1a')
 .attr('x', 40)  
 .attr('y', -90)  
 .attr('width', 40)  
 .attr('height', 10) 
 .transition().duration(2000)
   .attr('y', -90-30)
 .transition().duration(2000)
   .attr('y', -90)
//Mouth:
const mouth = g.append('path')
 .attr('fill', '#d64c1a')
 .attr('d', d3.arc()({
  innerRadius: 85,
  outerRadius: 95,
  startAngle: Math.PI/2,
  endAngle: Math.PI * 3/2
 }));
 
