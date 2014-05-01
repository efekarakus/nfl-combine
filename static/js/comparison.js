function drawComparisons(players)
{

    function drawIndividual(divName, players, key)
    {
        $(divName).find('svg').remove();

        if(players.length === 0) return;

        players.sort(function(a, b) {
            if (key === '40yd' || key === '3cone' || key === 'shuttle') {
                return a[key] - b[key];
            } else {
                return b[key] - a[key] ;
            }
        });

        var margin = {top: 10, right: 30, bottom: 70, left: 30},
            width = 300,
            height = 250;


        var xDomain = [];

        players.forEach(function(player) {
            xDomain.push(player['name']['text']);
        });


        var x = d3.scale.ordinal()
            .domain(xDomain)
            .rangeRoundBands([0, width], 0.1);

        var y = d3.scale.linear()
            .domain([0, d3.max(players, function(d) { return d[key]; })])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var svg = d3.select(divName).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".compare-bar")
            .data(players)
          .enter().append("g")
            .attr("class", "compare-bar");

        bar.append("rect")
            .attr("x", function(d) { return x(d['name']['text']); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d[key]); })
            .attr("height", function(d) { return height - y(d[key]); });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", function(d) { return y(d[key]) + 6; })
            .attr("x", function(d) { return x(d['name']['text']) + x.rangeBand()/2; })
            .attr("text-anchor", "middle")
            .text(function(d) { return d[key]; });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-0.8em")
                .attr("dy", "-0.15em")
                .attr("transform", function(d) {
                    return "rotate(-35)"
                });
    }

    drawIndividual('.compare-3cone', players, '3cone');
    drawIndividual('.compare-40yd', players, '40yd');
    drawIndividual('.compare-benchpress', players, 'benchpress');
    drawIndividual('.compare-broadjump', players, 'broadjump');
    drawIndividual('.compare-vertleap', players, 'vertleap');
    drawIndividual('.compare-shuttle', players, 'shuttle');
}
