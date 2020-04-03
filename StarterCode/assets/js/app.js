var width = parseInt(d3.select('#scatter').style('width'));
var height = width - width / 3.9;
var margin = 20;
var labelArea = 110;
var tPadBot = 40;
var tPadLeft = 40;
var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

var svg = d3
    .select('#scatter')
    .append('svg')
    .attr('width',width)
    .attr('height',height)
    .attr('class','chart')
    .style('background','white');

svg.append('g').attr('class','xText');
var xText = d3.select('.xText');

xText
    .append('text')
    .text('In Poverty (%)')
    .attr('y',-26)
    .attr('data-name','poverty')
    .attr('data-axis','x')
    .attr('class','aText active x')
    
xText
    .append('text')
    .text('Age (Median)')
    .attr('y',0)
    .attr('data-name','age')
    .attr('data-axis','x')
    .attr('class','aText inactive x')
    
xText
    .append('text')
    .text('Household Income (Median)')
    .attr('y',26)
    .attr('data-name','income')
    .attr('data-axis','x')
    .attr('class','aText inactive x')

function xTextRefresh() {
    xText.attr(
        'transform',
        `translate(${((width - labelArea) / 2 + labelArea)}, ${(height - margin - tPadBot)})`
    );
};

xTextRefresh();

svg.append('g').attr('class','yText');
var yText = d3.select('.yText');

yText
    .append('text')
    .text('Obese (%)')
    .attr('y',-26)
    .attr('data-name','obesity')
    .attr('data-axis','y')
    .attr('class','aText active y')
    
yText
    .append('text')
    .text('smokes')
    .attr('y',0)
    .attr('data-name','smokes')
    .attr('data-axis','y')
    .attr('class','aText inactive y')
    
yText
    .append('text')
    .text('Lacks Healthcare (%)')
    .attr('y',26)
    .attr('data-name','healthcare')
    .attr('data-axis','y')
    .attr('class','aText inactive y')

function yTextRefresh() {
    yText.attr(
        'transform',
        `translate(${leftTextX},${leftTextY})rotate(-90)`
    );
};

yTextRefresh();
var csvData;
d3.csv('assets/data/data.csv').then(data => {
    csvData = data;

    var curX = 'poverty';
    var curY = 'obesity';
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    var toolTip = d3
        .tip()
        .attr('class', 'd3-tip')
        .html(d => {
            var theX;
            var theState = `<div>${d.state}</div>`;
            var theY = `<div>${curY}: ${d[curY]} %</div>`;
            if (curX === 'poverty') {
                theX = `<div>${curX}: ${d[curX]} %</div>`;
            } else {
                theX = `<div>${curX}: ${parseFloat(d[curX]).toLocaleString('en')}</div>`;
            }
            return theState + theX + theY;
        });
    svg.call(toolTip);

    function xMinMax() {
        xMin = d3.min(data, d => parseFloat(d[curX]) * 0.9);
        xMax = d3.min(data, d => parseFloat(d[curX]) * 1.1);
    };

    function yMinMax() {
        yMin = d3.min(data, d => parseFloat(d[curY]) * 0.9);
        yMax = d3.min(data, d => parseFloat(d[curY]) * 1.1);
    };

    xMinMax();
    yMinMax();

    var xScale = d3
        .scaleLinear()
        .domain([xMin,xMax])
        .range([margin + labelArea, width - margin]);
    
    var yScale = d3
        .scaleLinear()
        .domain([yMin,yMax])
        .range([height - margin - labelArea, margin]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    function tickCount() {
        if (width <= 500) {
            xAxis.ticks(5);
            yAxis.ticks(5);
        } else {
            xAxis.ticks(10);
            yAxis.ticks(10);
        }
    };
    tickCount();

    function labelChange(axis, clickedText) {
        d3
            .selectAll('.aText')
            .filter('.'+axis)
            .classed('active', false)
            .classed('inactive', true);
        
        clickedText
            .classed('inactive', false)
            .classed('active', true);
    };

    svg 
        .append('g')
        .call(xAxis)
        .attr('class', 'xAxis')
        .attr('transform', `translate(0,${(height - margin - labelArea)})`);

    svg 
        .append('g')
        .call(yAxis)
        .attr('class','yAxis')
        .attr('transform', `translate(${(margin + labelArea)},0)`);


    var theCircles = svg
        .selectAll('g theCircles')
        .data(data)
        .enter();

    theCircles
        .append('circle')
        .attr('cx',d => xScale(d[curX]))




    
    
    
    
    
    
    
    
})


