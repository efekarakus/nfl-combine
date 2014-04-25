//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var overall = {
    scales: {},
    gaussians: {}
}


function drawAllPlayers( selector, filter_by )
{

    // clear
    $(selector).html('');

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

    function _addScales( meta )
    {
        overall.scales.sxCone = d3.scale.linear()
                .domain( [ overall.gaussians.coneG.cdf(meta['3cone'][0]), overall.gaussians.coneG.cdf(meta['3cone'][2]) ] )
                .range( [0.0, 35.0] );

        overall.scales.syCone = d3.scale.linear()
            .domain( [ overall.gaussians.coneG.cdf(meta['3cone'][0]), overall.gaussians.coneG.cdf(meta['3cone'][2]) ] )
            .range( [0.0, 35.0] );

        overall.scales.sx40Yard = d3.scale.linear()
            .domain( [ overall.gaussians.ydG.cdf(meta['40yd'][0]), overall.gaussians.ydG.cdf(meta['40yd'][2]) ] )
            .range( [70.0, 35.0] );

        overall.scales.sy40Yard = d3.scale.linear()
            .domain( [ overall.gaussians.ydG.cdf(meta['40yd'][0]), overall.gaussians.ydG.cdf(meta['40yd'][2]) ] )
            .range( [0.0, 35.0] );

        overall.scales.sxBenchPress = d3.scale.linear()
            .domain( [ overall.gaussians.bpG.cdf(meta['benchpress'][0]), overall.gaussians.bpG.cdf(meta['benchpress'][2]) ])
            .range( [45.0, 70.0] );

        overall.scales.sBroadJump = d3.scale.linear()
            .domain( [ overall.gaussians.bjG.cdf(meta['broadjump'][0]), overall.gaussians.bjG.cdf(meta['broadjump'][2]) ] )
            .range( [35.0, 70.0] );

        overall.scales.sxVerticalLeap = d3.scale.linear()
            .domain( [ overall.gaussians.vlG.cdf(meta['vertleap'][0]), overall.gaussians.vlG.cdf(meta['vertleap'][2]) ] )
            .range( [35.0, 0.0] );

        overall.scales.syVerticalLeap = d3.scale.linear()
            .domain( [ overall.gaussians.vlG.cdf(meta['vertleap'][0]), overall.gaussians.vlG.cdf(meta['vertleap'][2]) ] )
            .range( [35.0, 70.0] );

        overall.scales.sxShuttle = d3.scale.linear()
            .domain( [ overall.gaussians.shuttleG.cdf(meta['shuttle'][0]), overall.gaussians.shuttleG.cdf(meta['shuttle'][2]) ] )
            .range( [0.0, 25.0] );
    }

    function _sortPlayers( players , filter_by )
    {
        if (filter_by === 'random') {
            players = shuffle(players);
        }
        else if (filter_by === '40yd' || filter_by === '3cone' || filter_by === 'shuttle') {
            players.sort(function(p1, p2) {
                if (p1[filter_by] > p2[filter_by]) return 1;
                if (p1[filter_by] < p2[filter_by]) return -1;
                return 0;
            });
        }
        else if (filter_by === 'benchpress' || filter_by === 'vertleap' || filter_by === 'broadjump') {
            players.sort(function(p1, p2) {
                if (p1[filter_by] > p2[filter_by]) return -1;
                if (p1[filter_by] < p2[filter_by]) return 1;
                return 0;
            });
        }
    }

    function _getCoords( meta, player )
    {
        var coords = [];

        var coneG = overall.gaussians.coneG,
            ydG = overall.gaussians.ydG,
            bpG = overall.gaussians.bpG,
            vlG = overall.gaussians.vlG,
            bjG = overall.gaussians.bjG,
            shuttleG = overall.gaussians.shuttleG;

        var sxCone = overall.scales.sxCone,
            syCone = overall.scales.syCone,
            sx40Yard = overall.scales.sx40Yard,
            sy40Yard = overall.scales.sy40Yard,
            sxBenchPress = overall.scales.sxBenchPress,
            sBroadJump = overall.scales.sBroadJump,
            sxVerticalLeap = overall.scales.sxVerticalLeap,
            syVerticalLeap = overall.scales.syVerticalLeap,
            sxShuttle = overall.scales.sxShuttle;

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
                })

        var name = playerDivs.append('div')
            .attr('class', 'name')
            .text(function( d ) { return d.name.text; } );
    }


    overall.gaussians.ydG = Gaussian(4.8, 0.32*0.32),
    overall.gaussians.bpG = Gaussian(19.19, 8.47*8.47),
    overall.gaussians.vlG = Gaussian(32.19, 4.49*4.49),
    overall.gaussians.bjG = Gaussian(114.89, 9.94*9.94),
    overall.gaussians.coneG = Gaussian(7.22, 0.42*0.42),
    overall.gaussians.shuttleG = Gaussian(4.42, 0.28*0.28);


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

            // sort based on filter
            _sortPlayers( players, filter_by );
            
            // scales
            _addScales( meta );
            
            if (filter_by === "position") {
                
            } else {
                _drawExample(selector, meta);

                _drawPlayers(selector, players, meta);
            }
            
        });
}
