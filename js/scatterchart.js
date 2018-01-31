$(document).ready(function() {
    "use strict";

    d3.json("ajax/x-y-data.json", function(error, data) {
        if (error) {
            console.log(error + ": Something went wrong");
        } else {
            function countY() {
                var y = [];
                for (var i = 0; i < data.length; i++) {
                    y.push(data[i].y);
                }
                return y;
            }

            function countX() {
                var x = [];
                for (var i = 0; i < data.length; i++) {
                    x.push(data[i].x);
                }
                return x;
            }
        
            var height = 400,
                width = 600;
        
            var yScale = d3.scaleLinear()
                           .domain([0, d3.max(countY())])
                           .range([0, height]);
        
            var xScale = d3.scaleLinear()
                           .domain([0, d3.max(countX())])
                           .range([0, width]);
        
            d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background-color", "lightgrey")
                .selectAll("circle")
                    .data(data)
                    .enter().append("circle")
                        .style("fill", "lightblue")
                        .style("stroke", "black")
                        .style("stroke-width", "2")
                        .attr("r", "5")
                        .attr("cx", function(d, i) {
                            return xScale(d.x);
                        })
                        .attr("cy", function(d, i) {
                            return height - yScale(d.y);
                        })
                    .exit();
        }
    });
});