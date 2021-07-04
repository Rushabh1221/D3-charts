const svg = d3.select('svg');
const width = svg.attr('width');
const height = svg.attr('height');

const render = data => {
    
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = { left:120, top:40, right:35, bottom:50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    //For x scale:
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth])
      .nice(); //for attractive show
    
    //For x Axis:
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('.2s')) //for formatting Xaxis range
        .tickSize(-innerHeight); //for draw line at Xaxis
      
    //For y scale:'
    const yScale = d3.scalePoint() //to point out data
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(1);
    
    //For y Axis:
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth);
    
      //console.log(yScale.domain);

      //console.log(xScale.domain());
      //console.log(xScale.range());

    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`); 
    
    g.append('g').call(yAxis)
        .selectAll('.domain')  //for removing extra lines at Yaxis
          .remove();
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0, ${innerHeight})`);

    xAxisG.selectAll('.domain').remove();  //for removing extra lines at Xaxis  
    
    xAxisG.append('text')
    .attr('class', 'axis-label') //used to apply css
    .attr('fill', 'black')
    .attr('x', innerWidth / 2)
    .attr('y', 40)
    .text('Counteywise Population');

    g.selectAll('circle').data(data) //to select multiple element
      .enter().append('circle')  //to append circle
        .attr('cy', d => yScale(yValue(d)))//to set circle properly
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 15); //set radius properly
    g.append('text')
       .attr('class', 'title') //used to apply css
       .attr('x', innerWidth / 2 -90)
       .attr('y', -10)
       .text('Top 10 MOST Popular Countries');    
};

//to load csv file:
d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv')
       .then(data => {
           data.forEach(dobj => {
              dobj.population = +dobj.population * 1000;
    });
    render(data);
});