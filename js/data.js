$(document).ready(function() {
    "use strict";

    //*****************//
    //**** D3 Data ****//
    //*****************//

    // d3.selectAll(".node")
    //     .data([true, true, true])
    //     .style("background-color", "#2688D3");

    function randomHexPicker() {
        var selections = "1234567890ABCDEF";
        var hex = "#";

        for (var i = 0; i < 6; i++) {
            var index = Math.floor(Math.random() * selections.length);
            hex += selections[index];
        }

        return hex;
    }

    function randomNumberPicker(max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function createArrayOfObjects(num) {
        var temp = [];

        for (var i = 0; i < num; i++) {
            var randomColor = randomHexPicker();

            temp.push({
                text: randomColor + " coloured Node",
                color: randomColor,
                width: randomNumberPicker(700, 200) + "px"
            });
        }

        return temp;
    }

    // var styles = ["#2688D3", "#234342", "#37AE60"];

    var styles = [
        {
            color: randomHexPicker(),
            width: "200px",
            text: "Blue Node"
        },
        {
            color: randomHexPicker(),
            width: "300px",
            text: "Red Node"
        },
        {
            color: randomHexPicker(),
            width: "250px",
            text: "Green Node"
        },
        {
            color: randomHexPicker(),
            width: "100px",
            text: "Yellow Node"
        }
    ];

    // d3.selectAll(".node")
    //     .data(styles)
    //     .style("background-color", function(contents) {
    //         return contents.color;
    //     })
    //     .style("width", function(contents) {
    //         return contents.width;
    //     });

    // d3.select("#nodeContainer")
    //     .selectAll(".newNodes")
    //         .data(styles)
    //         .enter().append("div")
    //             .text(function(d) {
    //                 return d.text;
    //             })
    //             .style("background-color", function(d) {
    //                 return d.color;
    //             })
    //             .style("width", function(d) {
    //                 return d.width;
    //             });

    d3.select("#nodeContainer")
        .selectAll(".newNodes")
            .data(createArrayOfObjects(10))
            .enter().append("div")
                .attr("class", "node")
                .text(function(d) {
                    return d.text;
                })
                .style("background-color", function(d) {
                    return d.color;
                })
                .style("width", function(d) {
                    return d.width;
                }).exit();
});