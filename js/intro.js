$(document).ready(function() {
    "use strict";

    //*****************************************//
    //**** D3 Selectors & Chaining Methods ****//
    //*****************************************//

    // d3.select(".node").text("Selected");

    // d3.selectAll(".node").text("Selected");

    // d3.select(".node:nth-child(3)").text("Selected");

    // d3.selectAll(".node:nth-child(even)").html("<strong>Selected</strong>");

    // d3.select(".node")
    //     .text("This is the parent node")
    //     .append("div")
    //         .html("<strong>This div was appended</strong>")
    //         .append("div")
    //             .html("<small>This is appended to the append</small>");

    // d3.select("#nodeContainer")
    //     .insert("span", ":nth-child(3)")
    //         .html("<strong>Inserted in the 3rd child element</strong>");

    // d3.select("#nodeContainer .node:nth-child(4)")
    //     .remove();

    //**************************//
    //**** D3 Class Methods ****//
    //**************************//

    // Replaces current classes
    // d3.selectAll(".node")
    //     .attr("class", "new-class");

    // d3.selectAll(".node")
    //     .classed("new-class", true) // Adds new-class class to the selected element(s)
    //     .classed("node", false); // Removes the node class from the selected element(s)

    // Adding inline CSS
    d3.selectAll(".node:nth-child(3)")
        .style("color", "red")
        .style("font-size", "25px");
});