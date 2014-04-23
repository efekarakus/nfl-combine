function drawAllPlayers( selector )
{
    function _clean( player ) 
    {
        c( player, '3cone' );
        c( player, '40yd' );
        c( player, 'benchpress' );
        c( player, 'broadjump' );
        c( player, 'height' );
        c( player, 'shuttle' );
        c( player, 'vertleap' );
        c( player, 'weight' );
        c( player, 'wonderlic' );
        c( player, 'year' );

        function c( player, key ) {
            player[ key ] = ( player[ key ] === '' ) ? undefined : +player[ key ];
        }
    }

    function _getCoords( meta, player )
    {

        var sxCone = d3.scale.linear()
            .domain( [ meta['3cone'][0], meta['3cone'][2] ] )
            .range( [35.0, 0.0] );

        var syCone = d3.scale.linear()
            .domain( [ meta['3cone'][0], meta['3cone'][2] ] )
            .range( [35.0, 0.0] );

        var sx40Yard = d3.scale.linear()
            .domain( [ meta['40yd'][0], meta['40yd'][2] ] )
            .range( [35.0, 70.0] );

        var sy40Yard = d3.scale.linear()
            .domain( [ meta['40yd'][0], meta['40yd'][2] ] )
            .range( [35.0, 0.0] );

        var sxBenchPress = d3.scale.linear()
            .domain( [ meta['benchpress'][0], meta['benchpress'][2] ])
            .range( [35.0, 70.0] );


        var sBroadJump = d3.scale.linear()
            .domain( [ meta['broadjump'][0], meta['broadjump'][2] ] )
            .range( [35.0, 70.0] );

        var sxVerticalLeap = d3.scale.linear()
            .domain( [ meta['vertleap'][0], meta['vertleap'][2] ] )
            .range( [35.0, 0.0] );

        var syVerticalLeap = d3.scale.linear()
            .domain( [ meta['vertleap'][0], meta['vertleap'][2] ] )
            .range( [35.0, 70.0] );

        var sxShuttle = d3.scale.linear()
            .domain( [meta['shuttle'][0], meta['shuttle'][2] ] )
            .range( [35.0, 0.0] );

        var coords = [];

        if (player['3cone'] != undefined)
            coords.push( {"x": sxCone( player['3cone'] ), "y": syCone( player['3cone'] )} );
        if (player['40yd'] != undefined)
            coords.push( {"x": sx40Yard( player['40yd'] ), "y": sy40Yard( player['40yd'] )} );
        if (player['benchpress'] != undefined)
            coords.push( {"x": sxBenchPress( player['benchpress'] ), "y": 35.0 } );
        if (player['broadjump'] != undefined)
            coords.push( {"x": sBroadJump( player['broadjump'] ), "y": sBroadJump( player['broadjump'] )} );
        if (player['vertleap'] != undefined)
            coords.push( {"x": sxVerticalLeap( player['vertleap'] ), "y": syVerticalLeap( player['vertleap'] )} );
        if (player['shuttle'] != undefined)
            coords.push( {"x": sxShuttle( player['shuttle'] ), "y": 35.0} );

        return coords;
    }

    function _drawExample(selector, meta)
    {
        var exampleDiv = d3.select(selector)
            .append('div')
            .attr('class', 'example');

        var svg = exampleDiv.append('svg')
            .attr("width", 140)
            .attr("height", 70);

        svg.selectAll(".inner")
            .data( [_getCoords( meta, { 
                    "3cone": meta["3cone"][1],
                    "40yd": meta["40yd"][1],
                    "benchpress": meta["benchpress"][1],
                    "broadjump": meta["broadjump"][1],
                    "vertleap": meta["vertleap"][1],
                    "shuttle": meta["shuttle"][1]
                }
            )] )
            .enter()
                .append("polygon")
                .attr("class", "inner")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });

        svg.selectAll(".outer")
            .data([[ 
                {"x": 20, "y": 20},
                {"x": 50, "y": 20},
                {"x": 55, "y": 35},
                {"x": 50, "y": 50},
                {"x": 20, "y": 50},
                {"x": 15, "y": 35}
            ]]).enter()
                .append("polygon")
                .attr("class", "outer")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });

        /**
        svg.append("text")
            .attr("x", 0)
            .attr("y", 22)
            .text("3-cone")
            .attr("transform", "rotate(-20)");

        svg.append("text")
            .attr("x", 42)
            .attr("y", -3)
            .text("40 yard")
            .attr("transform", "rotate(20)");

        svg.append("text")
            .attr("x", 55)
            .attr("y", 35)
            .text("bench press");
        */

        svg.append("rect")
            .attr("x", "110")
            .attr("y", "20")
            .attr("width", 20)
            .attr("height", 10)
            .style("fill", "#505050")
            .style("opacity", "0.5")
            .style("stroke", "#000")
            .style("stroke-width", "0.5");

        svg.append("rect")
            .attr("x", 110)
            .attr("y", 35)
            .attr("width", 20)
            .attr("height", 10)
            .style("fill", "#202020")
            .style("opacity", "0.8")
            .style("stroke", "#000")
            .style("stroke-width", "0.5");

        svg.append("text")
            .attr("x", 70)
            .attr("y", 28)
            .text("Average")
            .style("color", "#505050")
            .style("opacity", "0.5");

        svg.append("text")
            .attr("x", 75)
            .attr("y", 42)
            .text("Player")
            .style("color", "#202020")
            .style("opacity", "0.8");


        exampleDiv.append('div')
            .attr('class', 'name')
            .text('Example')
    }

    function _drawPlayers(selector, players, meta)
    {
        var playerDivs = d3.select(selector)
            .selectAll('player')
            .data(players)
            .enter()
                .append('div')
                .attr('class', 'player');

        var svg = playerDivs.append('svg')
            .attr("width", 70)
            .attr("height", 70);

        svg.selectAll(".inner")
            .data( [_getCoords( meta, { 
                    "3cone": meta["3cone"][1],
                    "40yd": meta["40yd"][1],
                    "benchpress": meta["benchpress"][1],
                    "broadjump": meta["broadjump"][1],
                    "vertleap": meta["vertleap"][1],
                    "shuttle": meta["shuttle"][1]
                }
            )] )
            .enter()
                .append("polygon")
                .attr("class", "inner")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });

        svg.selectAll(".outer")
            .data( function(player) { return [_getCoords( meta, player )]; } )
            .enter()
                .append("polygon")
                .attr("class", "outer")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });

        var name = playerDivs.append('div')
            .attr('class', 'name')
            .text(function( d ) { return d.name.text; } );
    }

    d3.json( "../data/pruned-nfl-combine-2013.json", 
        function( err, json ) 
        {
            if ( err ) return console.warn( err );

            var meta = json[ "meta" ];

            // clean data
            var players = json[ 'players' ];
            players.forEach( function( player ) 
            {
                _clean( player );
            } );

            _drawExample(selector, meta);

            _drawPlayers(selector, players, meta);
            
        });
}
