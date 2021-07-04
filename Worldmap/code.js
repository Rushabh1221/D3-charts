const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const projection = d3.geoAzimuthalEqualArea(); //d3.geoMercator();d3.geoAzimuthalEqualArea();d3.geoConicConformal();d3.geoNaturalEarth();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');
 
g.append('path')
  //.attr('background-color', 'brown')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({type: 'Sphere'}));

svg.call(d3.zoom().on('zoom', ()=> {
  g.attr('transform', d3.event.transform);
}));  

Promise.all([
  d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
  d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json') //to load json data
]).then(([tsvData, topoJSONdata]) => {

  const countryName = {};
  tsvData.forEach(d => {            //Use d.name for label
    countryName[d.iso_n3] = d.name; //Use d.iso_n3 for id
  //or:
/*  const countryName = tsvData.reduce((accumulator, d) => {
    accumulator[d.iso_n3] = d.name;
    return accumulator;
  }, {});  
*/
  });

  console.log(tsvData);
  console.log(topoJSONdata);
  const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries); //to fetch out countries from json //console.log(countries); 
  svg.selectAll('path').data(countries.features) //to select all path & append in svg
    .enter().append('path')
      .attr('class', 'countries')
      .attr('d', pathGenerator)
    .append('title')
      .text(d => countryName[d.id]);  
});
