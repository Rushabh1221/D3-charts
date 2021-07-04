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
      .range([0, innerWidth]);
    
    //For x Axis:
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('.2s')) //for formatting Xaxis range
        .tickSize(-innerHeight); //for draw line at Xaxis
      
    //For y scale:'
    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.2);
    
    //For y Axis:
    //const yAxis = d3.axisLeft(yScale);
    
      //console.log(yScale.domain);
      //console.log(xScale.domain());
      //console.log(xScale.range());

    const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`); 
    
    g.append('g').call(d3.axisLeft(yScale))
        .selectAll('.domain, .tick line')  //for removing extra lines at Yaxis
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

    g.selectAll('rect').data(data) //to select multiple element
      .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());
    g.append('text')
       .attr('class', 'title') //used to apply css
       .attr('x', innerWidth / 2 - 90)
       .attr('y', -10)
       .text('Top 10 MOST Popular Countries');    
};

//to load csv file:
d3.csv('data.csv').then(data => {
        data.forEach(dobj => {
            dobj.population = +dobj.population * 1000;
    });
    render(data);
});