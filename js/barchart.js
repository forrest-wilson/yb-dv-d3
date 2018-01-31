$(document).ready(function() {
    "use strict";

    var barData = [60, 45, 47, 4, 25, 37, 9, 23, 47, 92, 78, 42, 6];
    var moreBarData = [];
    var height = 400,
        width = 600,
        barWidth = 50,
        barOffset = 5;

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(barData)])
                   .range([0, height]);

    var xScale = d3.scaleBand()
                   .domain(d3.range(0, barData.length))
                   .range([0, width]);

    function randomNumberGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (var i = 0; i < 15; i++) {
        moreBarData.push(randomNumberGenerator(0, 500));
    }

    d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "grey")
        .selectAll("rect")
            .data(barData)
            .enter().append("rect")
                .classed("bar", true)
                .style("fill", "red")
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return yScale(d);
                })
                .attr("x", function(d, i) {
                    return xScale(i);
                })
                .attr("y", function(d) {
                    return height - yScale(d);
                })
            .exit();
});