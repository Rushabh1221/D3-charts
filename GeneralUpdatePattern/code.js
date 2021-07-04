const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const colorScale = d3.scaleOrdinal() //to color object
   .domain(['apple', 'lemon'])
   .range(['#c11d1d', 'yellow']);

const radiusScale = d3.scaleOrdinal() //to color object
 .domain(['apple', 'lemon'])
 .range([50, 30]);

const render = (selection, {fruits}) => { 
 
  const bowl = selection.selectAll('rect')
     .data([null])
     .enter().append('rect')
       .attr('y', 150)
       .attr('width', 620)
       .attr('height', 200)
       .attr('rx', 350/2);

  const circles = selection.selectAll('circle').data(fruits); //to select multiple circles
      circles
        .enter().append('circle') //for enter
          .attr('cx', (d, i) => i * 120 + 60)
          .attr('cy', height / 2) 
        .merge(circles) //for update
          .attr('fill', d => colorScale(d.type))
          .on('click', () => { console.log('clicked'); } )
        .transition().duration(1000)
          .attr('r', d => radiusScale(d.type));               
      circles.exit()
      .transition().duration(1000)
        .attr('r', 0)
      .remove();  //for remove  
      
const text = selection.selectAll('text').data(fruits);
    text
      .enter().append('text')
        .attr('x', (d, i) => i*150+10)
        .attr('y', height/2 + 5)
      .merge(text)
        .text(d => d.type);        
    text.exit().remove();        
}
    

const mkFruit = type => ({ type });

let fruits = d3.range(5)
    .map(() => mkFruit('apple'));

/*let selectedFruits = null;
const onClick = id => {
  selectedFruits = id;
  render(svg, { fruits });
}*/    
//console.log(fruits);

render(svg, { fruits });

//remove an apple:
setTimeout(() => {
    fruits.pop();
    render(svg, { fruits });
}, 1000);

//Replacing apple with a lemon:
setTimeout(() => {
    fruits[2].type = 'lemon';
    render(svg, { fruits });
}, 2000);

//Replacing apple with a lemon:
setTimeout(() => {
  fruits = fruits.filter((d, i) => i != 1);
  render(svg, { fruits });
}, 3000);
