$(document).ready(function() {
    "use strict";

    d3.json("ajax/population.json", function(error, data) {
        if (error) {
            console.log(error + ": Something went wrong");
            return;
        }

        var margin = {
            top: 20,
            bottom: 20,
            left: 30,
            right: 30
        };

        var height = 600 - margin.top - margin.bottom,
            width = 1000 - margin.left - margin.right;

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        var graph = d3.select("#container").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("background-color", "#e5e5e5")
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

        
        x.domain(data.map(function(d) {
            return d.name;
        }));

        y.domain([0, d3.max(data, function(d) {
            return d.employees;
        })]);

        graph.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        graph.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10));

        graph.selectAll(".bar")
            .data(data)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {
                    return x(d.name);
                })
                .attr("y", function(d) {
                    return y(d.employees);
                })
                .attr("width", x.bandwidth())
                .attr("height", function(d) {
                    return height - y(d.employees);
                });
    });
});