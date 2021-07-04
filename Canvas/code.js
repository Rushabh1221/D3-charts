console.log(document.body.clientWidth);
console.log(document.body.clientHeight);
const svg = d3.select('svg');

const width = document.body.clientWidth;
const height = document.body.clientWidth;
 
svg
     .attr('width', width)
     .attr('height', height)
  .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('rx', 50);