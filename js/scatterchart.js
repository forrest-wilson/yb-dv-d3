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

            var margin = {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            };
        
            var height = 400 - margin.top - margin.bottom,
                width = 600 - margin.left - margin.right;

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
        
            var graph = d3.select("#nodeContainer").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("background-color", "lightgrey")
                .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")") // moves the g over in the SVG
                    .selectAll("circle")
                        .data(data)
                        .enter().append("circle")
                            .classed("circle", true)
                            .style("fill", function(d, i) {
                                return colorX(d.x);
                            })
                            .style("stroke-width", "2")
                            .attr("r", "7")
                            .attr("cx", 0)
                            .attr("cy", height)
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
                            });

                            graph.transition()
                                .attr("cx", function(d) {
                                    return xScale(d.x)
                                })
                                .attr("cy", function(d) {
                                    return height - yScale(d.y)
                                })
                                .delay(function(d, i){
                                    return i * 20
                                })
                                .duration(1000)
                                .ease(d3.easeQuadIn)

                            // Vertical Axes
                            
                            var vGuideScale = d3.scaleLinear()
                                                .domain([0, d3.max(countY())])
                                                .range([height, 0]);

                            var vAxis = d3.axisLeft(vGuideScale).ticks(10);

                            var vGuide = d3.select("svg").append("g")
                                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

                            vAxis(vGuide);

                            var hGuideScale = d3.scaleLinear()
                                                .domain([0, d3.max(countX())])
                                                .range([0, width]);
                            
                            var hAxis = d3.axisBottom(hGuideScale).ticks(10);

                            var hGuide = d3.select("svg").append("g")
                                .attr("transform", "translate(" + margin.left + ", " + (height + margin.top) + ")");

                            hAxis(hGuide);

        }
    });
});