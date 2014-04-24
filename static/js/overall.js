//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

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
        
        var ydG = Gaussian(4.8, 0.32*0.32);
        var bpG = Gaussian(20.39, 7.2*7.2);
        var vlG = Gaussian(32.19, 4.49*4.49);
        var bjG = Gaussian(114.89, 9.94*9.94);
        var coneG = Gaussian(7.22, 0.42*0.42);
        var shuttleG = Gaussian(4.42, 0.28*0.28);

        var sxCone = d3.scale.linear()
            .domain( [ coneG.cdf(meta['3cone'][0]), coneG.cdf(meta['3cone'][2]) ] )
            .range( [0.0, 35.0] );

        var syCone = d3.scale.linear()
            .domain( [ coneG.cdf(meta['3cone'][0]), coneG.cdf(meta['3cone'][2]) ] )
            .range( [0.0, 35.0] );

        var sx40Yard = d3.scale.linear()
            .domain( [ ydG.cdf(meta['40yd'][0]), ydG.cdf(meta['40yd'][2]) ] )
            .range( [70.0, 35.0] );

        var sy40Yard = d3.scale.linear()
            .domain( [ ydG.cdf(meta['40yd'][0]), ydG.cdf(meta['40yd'][2]) ] )
            .range( [0.0, 35.0] );

        var sxBenchPress = d3.scale.linear()
            .domain( [ bpG.cdf(meta['benchpress'][0]), bpG.cdf(meta['benchpress'][2]) ])
            .range( [45.0, 70.0] );


        var sBroadJump = d3.scale.linear()
            .domain( [ bjG.cdf(meta['broadjump'][0]), bjG.cdf(meta['broadjump'][2]) ] )
            .range( [35.0, 70.0] );

        var sxVerticalLeap = d3.scale.linear()
            .domain( [ vlG.cdf(meta['vertleap'][0]), vlG.cdf(meta['vertleap'][2]) ] )
            .range( [35.0, 0.0] );

        var syVerticalLeap = d3.scale.linear()
            .domain( [ vlG.cdf(meta['vertleap'][0]), vlG.cdf(meta['vertleap'][2]) ] )
            .range( [35.0, 70.0] );

        var sxShuttle = d3.scale.linear()
            .domain( [ shuttleG.cdf(meta['shuttle'][0]), shuttleG.cdf(meta['shuttle'][2]) ] )
            .range( [0.0, 25.0] );

        var coords = [];

        if (player['3cone'] != undefined)
            coords.push( {"x": sxCone( coneG.cdf(player['3cone']) ), "y": syCone( coneG.cdf(player['3cone']) )} );
        if (player['40yd'] != undefined)
            coords.push( {"x": sx40Yard( ydG.cdf(player['40yd']) ), "y": sy40Yard( ydG.cdf(player['40yd']) )} );
        if (player['benchpress'] != undefined)
            coords.push( {"x": sxBenchPress( bpG.cdf(player['benchpress']) ), "y": 35.0 } );
        if (player['broadjump'] != undefined)
            coords.push( {"x": sBroadJump( bjG.cdf(player['broadjump']) ), "y": sBroadJump( bjG.cdf(player['broadjump']) )} );
        if (player['vertleap'] != undefined)
            coords.push( {"x": sxVerticalLeap( vlG.cdf(player['vertleap']) ), "y": syVerticalLeap( vlG.cdf(player['vertleap']) )} );
        if (player['shuttle'] != undefined)
            coords.push( {"x": sxShuttle( shuttleG.cdf(player['shuttle']) ), "y": 35.0} );

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
            .style("fill", "#202020")
            .style("opacity", "0.8")
            .style("stroke", "#000")
            .style("stroke-width", "0.5");

        svg.append("rect")
            .attr("x", 110)
            .attr("y", 35)
            .attr("width", 20)
            .attr("height", 10)
            .style("fill", "#C0C0C0")
            .style("opacity", "0.5")
            .style("stroke", "#000")
            .style("stroke-width", "0.5");

        svg.append("text")
            .attr("x", 70)
            .attr("y", 28)
            .text("Average")
            .style("color", "#202020")
            .style("opacity", "0.8");

        svg.append("text")
            .attr("x", 75)
            .attr("y", 42)
            .text("Player")
            .style("color", "#C0C0C0")
            .style("opacity", "0.5");


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
            players = shuffle(players);
            players.forEach( function( player ) 
            {
                _clean( player );
            } );

            _drawExample(selector, meta);

            _drawPlayers(selector, players, meta);
            
        });
}
