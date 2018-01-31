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

            var maxX = d3.max(countX());
        
            var yScale = d3.scaleLinear()
                           .domain([0, d3.max(countY())])
                           .range([0, height]);
        
            var xScale = d3.scaleLinear()
                           .domain([0, maxX])
                           .range([0, width]);

            var colorX = d3.scaleLinear()
                          .domain([0, d3.max(countX()) / 2, d3.max(countX())])
                          .range(["#3498DB", "#F1C40F", "#E74C3C"]);
        
            d3.select("body").append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background-color", "lightgrey")
                .selectAll("circle")
                    .data(data)
                    .enter().append("circle")
                        .classed("circle", true)
                        .style("fill", function(d, i) {
                            return colorX(d.x);
                        })
                        .style("stroke-width", "2")
                        .attr("r", "10")
                        .attr("cx", function(d) {
                            return xScale(d.x);
                        })
                        .attr("cy", function(d) {
                            return height - yScale(d.y);
                        })
                        .on("mouseover", function() {
                            d3.select(this)
                                .style("opacity", 0.5);
                        })
                        .on("mouseout", function() {
                            d3.select(this)
                                .style("opacity", 1);
                        })
                        .on("click", function(d) {
                            d3.select(".active")
                                .classed("active", false);

                            d3.select("#xVal").html("<p>Selected X Value: " + d.x + "</div>");
                            d3.select("#yVal").html("<p>Selected Y Value: " + d.y + "</div>");

                            d3.select(this)
                                .classed("active", true);
                        })
                    .exit();
        }
    });
});