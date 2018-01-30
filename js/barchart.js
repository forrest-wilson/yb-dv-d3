$(document).ready(function() {
    "use strict";

    var barData = [45, 47, 4, 25, 37, 9, 23, 47, 92, 78];
    var moreBarData = [];
    var height = 400,
        width = 600,
        barWidth = 50,
        barOffset = 5;

    function randomNumberGenerator(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (var i = 0; i < 10; i++) {
        moreBarData.push(randomNumberGenerator(50, 400));
    }

    console.log(moreBarData);

    d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "grey")
        .selectAll("rect")
            .data(moreBarData)
            .enter().append("rect")
                .style("fill", "red")
                .attr("width", barWidth)
                .attr("height", function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return i * (barWidth + barOffset);
                })
                .attr("y", function(d) {
                    return height - d;
                })
            .exit();
});