//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var overall = {
    scales: {},
    gaussians: {},
    selectedCount: 0,
    maxSelected: 4,
    selections: []
}



function drawAllPlayers( selector, filter_by, isFirst )
{
    // reset selections
    overall.selectedCount = 0;
    overall.selections = [];

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
                .range( [20.0, 45.0] );

        overall.scales.syCone = d3.scale.linear()
            .domain( [ overall.gaussians.coneG.cdf(meta['3cone'][0]), overall.gaussians.coneG.cdf(meta['3cone'][2]) ] )
            .range( [0.0, 45.0] );

        overall.scales.sx40Yard = d3.scale.linear()
            .domain( [ overall.gaussians.ydG.cdf(meta['40yd'][0]), overall.gaussians.ydG.cdf(meta['40yd'][2]) ] )
            .range( [70.0, 45.0] );

        overall.scales.sy40Yard = d3.scale.linear()
            .domain( [ overall.gaussians.ydG.cdf(meta['40yd'][0]), overall.gaussians.ydG.cdf(meta['40yd'][2]) ] )
            .range( [0.0, 45.0] );

        overall.scales.sxBenchPress = d3.scale.linear()
            .domain( [ overall.gaussians.bpG.cdf(meta['benchpress'][0]), overall.gaussians.bpG.cdf(meta['benchpress'][2]) ])
            .range( [55.0, 90.0] );

        overall.scales.sxBroadJump = d3.scale.linear()
            .domain( [ overall.gaussians.bjG.cdf(meta['broadjump'][0]), overall.gaussians.bjG.cdf(meta['broadjump'][2]) ] )
            .range( [45.0, 70.0] );

        overall.scales.syBroadJump = d3.scale.linear()
            .domain( [ overall.gaussians.bjG.cdf(meta['broadjump'][0]), overall.gaussians.bjG.cdf(meta['broadjump'][2]) ] )
            .range( [45.0, 90.0] );

        overall.scales.sxVerticalLeap = d3.scale.linear()
            .domain( [ overall.gaussians.vlG.cdf(meta['vertleap'][0]), overall.gaussians.vlG.cdf(meta['vertleap'][2]) ] )
            .range( [45.0, 20.0] );

        overall.scales.syVerticalLeap = d3.scale.linear()
            .domain( [ overall.gaussians.vlG.cdf(meta['vertleap'][0]), overall.gaussians.vlG.cdf(meta['vertleap'][2]) ] )
            .range( [45.0, 90.0] );

        overall.scales.sxShuttle = d3.scale.linear()
            .domain( [ overall.gaussians.shuttleG.cdf(meta['shuttle'][0]), overall.gaussians.shuttleG.cdf(meta['shuttle'][2]) ] )
            .range( [0.0, 35.0] );
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
            sxBroadJump = overall.scales.sxBroadJump,
            syBroadJump = overall.scales.syBroadJump,
            sxVerticalLeap = overall.scales.sxVerticalLeap,
            syVerticalLeap = overall.scales.syVerticalLeap,
            sxShuttle = overall.scales.sxShuttle;

        if (player['3cone'] != undefined)
            coords.push( {"x": sxCone( coneG.cdf(player['3cone']) ), "y": syCone( coneG.cdf(player['3cone']) )} );
        if (player['40yd'] != undefined)
            coords.push( {"x": sx40Yard( ydG.cdf(player['40yd']) ), "y": sy40Yard( ydG.cdf(player['40yd']) )} );
        if (player['benchpress'] != undefined)
            coords.push( {"x": sxBenchPress( bpG.cdf(player['benchpress']) ), "y": 45.0 } );
        if (player['broadjump'] != undefined)
            coords.push( {"x": sxBroadJump( bjG.cdf(player['broadjump']) ), "y": syBroadJump( bjG.cdf(player['broadjump']) )} );
        if (player['vertleap'] != undefined)
            coords.push( {"x": sxVerticalLeap( vlG.cdf(player['vertleap']) ), "y": syVerticalLeap( vlG.cdf(player['vertleap']) )} );
        if (player['shuttle'] != undefined)
            coords.push( {"x": sxShuttle( shuttleG.cdf(player['shuttle']) ), "y": 45.0} );

        return coords;
    }

    function _drawExample(mainDiv, meta)
    {
        var exampleDiv = mainDiv
            .append('div')
            .attr('class', 'legend');

        var svg = exampleDiv.append('svg')
            .attr("width", 700)
            .attr("height", 600);

        svg.selectAll(".inner")
            .data([[ 
                {"x": 350, "y": 150},
                {"x": 500, "y": 150},
                {"x": 600, "y": 300},
                {"x": 500, "y": 450},
                {"x": 350, "y": 450},
                {"x": 250, "y": 300}
            ]]).enter()
                .append("polygon")
                .attr("class", "inner")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });

        
        svg.selectAll(".outer")
            .data([[ 
                {"x": 320, "y": 120},
                {"x": 510, "y": 140},
                {"x": 550, "y": 300},
                {"x": 480, "y": 420},
                {"x": 370, "y": 470},
                {"x": 270, "y": 300}
            ]]).enter()
                .append("polygon")
                .attr("class", "outer")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });

        svg.selectAll(".point")
            .data([
                {"x": 320, "y": 120},
                {"x": 510, "y": 140},
                {"x": 550, "y": 300},
                {"x": 480, "y": 420},
                {"x": 370, "y": 470},
                {"x": 270, "y": 300}
            ]).enter()
                .append("circle")
                .attr("class", "point")
                .attr("cx", function(c) {return c.x;})
                .attr("cy", function(c) {return c.y;})
                .attr("r", "4");

        {
            // add polygon labels
            svg.append("text")
                .attr("class", "label")
                .attr("x", 280)
                .attr("y", 110)
                .text("3-Cone")

            svg.append("text")
                .attr("class", "label")
                .attr("x", 515)
                .attr("y", 130)
                .text("40 Yard")

            svg.append("text")
                .attr("class", "label")
                .attr("x", 560)
                .attr("y", 305)
                .text("Bench Press")

            svg.append("text")
                .attr("class", "label")
                .attr("x", 485)
                .attr("y", 440)
                .text("Broad Jump")

            svg.append("text")
                .attr("class", "label")
                .attr("x", 330)
                .attr("y", 490)
                .text("Vertical Leap")

            svg.append("text")
                .attr("class", "label")
                .attr("x", 210)
                .attr("y", 305)
                .text("Shuttle")
        }

        {
            // legend
            svg.selectAll(".legend-inner")
            .data([[ 
                {"x": 6, "y": 275},
                {"x": 24, "y": 275},
                {"x": 30, "y": 288},
                {"x": 24, "y": 302},
                {"x": 6, "y": 302},
                {"x": 0, "y": 288}
            ]]).enter()
                .append("polygon")
                .attr("class", "legend-inner")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });

            svg.selectAll(".legend-outer")
            .data([[ 
                {"x": 6, "y": 335},
                {"x": 24, "y": 335},
                {"x": 30, "y": 348},
                {"x": 24, "y": 362},
                {"x": 6, "y": 362},
                {"x": 0, "y": 348}
            ]]).enter()
                .append("polygon")
                .attr("class", "legend-outer")
                .attr("points", function(d) {
                    return d.map(function(d) { return [d.x, d.y].join(","); }).join(" ");
                });
        }

        {
            svg.append("text")
                .attr("class", "legend-label")
                .attr("x", "35")
                .attr("y", "292")
                .text("Average");

            svg.append("text")
                .attr("class", "legend-label")
                .attr("x", "35")
                .attr("y", "352")
                .text("Player"); 
        }

    }

    function _drawPlayers(mainDiv, players, meta)
    {
        var playerDivs = mainDiv
            .selectAll('player')
            .data(players)
            .enter()
                .append('div')
                .attr('class', 'player');

        var svg = playerDivs.append('svg')
            .attr("width", 90)
            .attr("height", 90);

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

        svg.selectAll(".point")
            .data(function(player) { return _getCoords(meta, player); })
            .enter()
                .append("circle")
                .attr("class", "point")
                .attr("cx", function(c) { return c.x; })
                .attr("cy", function(c) { return c.y; })
                .attr("r", "2");


        var name = playerDivs.append('div')
            .attr('class', 'name')
            .text(function( d ) { return d.name.text; } );

        playerDivs.on('click', function(data) {

            if(data['name']['text'] === 'Average') { return; }

            var p = d3.select(this);
            var inner = p.select('.inner');
            var outer = p.select('.outer');

            var innerClass = inner.attr('class');
            var outerClass = outer.attr('class');

            if (innerClass === 'inner') {
                if ( overall.selectedCount < overall.maxSelected ) {
                    // change the colors
                    outer.attr('class', 'outer selected');
                    inner.attr('class', 'inner selected');

                    // increment selection amount
                    overall.selectedCount += 1;

                    // change the text in compare
                    $('.compare').html('Compare (' + overall.selectedCount + '/' + overall.maxSelected + ')');

                    overall.selections.push( data );
                }
            } else {
                // reset the colors
                inner.attr('class', 'inner');
                outer.attr('class', 'outer');

                // decrement count
                overall.selectedCount -= 1;

                // adjust text in compare
                if (overall.selectedCount === 0) {
                    $('.compare').html('Compare');
                } else {
                    $('.compare').html('Compare (' + overall.selectedCount + '/' + overall.maxSelected + ')');
                }

                // remove from selections
                var index = overall.selections.indexOf(data);
                overall.selections.splice( index, 1 );
            }
            

        });
    }

    function _drawPositions(mainDiv, players, meta)
    {
        var positions = [
            // offense
            {name: "Wide Receiver", abbr: "WR"},
            {name: "Offensive Tackle", abbr: "OT"},
            {name: "Offensive Guard", abbr: "OG"},
            {name: "Center", abbr: "C"},
            {name: "Tight End", abbr: "TE"},
            {name: "Quarterback", abbr: "QB"},
            {name: "Fullback", abbr: "FB"},
            {name: "Runningback", abbr: "RB"},
            // defense
            {name: "Defensive End", abbr: "DE"},
            {name: "Defensive Tackle", abbr: "DT"},
            {name: "Outside Linebacker", abbr: "OLB"},
            {name: "Inside Linebacker", abbr: "ILB"},
            {name: "Cornerback", abbr: "CB"},
            {name: "Free Safety", abbr: "FS"},
            {name: "Strong Safety", abbr: "SS"}
        ];

        positions.forEach(function(position) {
            var positionDiv = mainDiv.append('div')
                .attr('class', 'position');

            positionDiv.append('div')
                .attr('class', 'title')
                .text(position.name);

            var polygonsDiv = positionDiv.append('div')
                .attr('class', 'polygons')
                .attr('id', position.abbr);

            var posPlayers = [];

            // add average player
            meta['positions'][position.abbr]['average']['name'] = { 'text': 'Average' };
            posPlayers.push( meta['positions'][position.abbr]['average'] )

            meta['positions'][position.abbr]['indices'].forEach(function(i) {
                posPlayers.push( players[i] );
            });

            _drawPlayers(polygonsDiv, posPlayers, meta);


            var avgDiv = $( $('#' + position.abbr).children()[0] );
            avgDiv.addClass('average');

            mainDiv.append('div')
                .attr('class', 'separator');
        });
    }


    overall.gaussians.ydG = Gaussian(4.8, 0.32*0.32),
    overall.gaussians.bpG = Gaussian(19.19, 8.47*8.47),
    overall.gaussians.vlG = Gaussian(32.19, 4.49*4.49),
    overall.gaussians.bjG = Gaussian(114.89, 9.94*9.94),
    overall.gaussians.coneG = Gaussian(7.22, 0.42*0.42),
    overall.gaussians.shuttleG = Gaussian(4.42, 0.28*0.28);


    d3.json( "./data/pruned-nfl-combine-2013.json", 
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
           
            var mainDiv = d3.select( selector );

            if (filter_by === "position") {

                _drawPositions(mainDiv, players, meta);

            } else {

                if (isFirst) _drawExample(d3.select('.example-container'), meta);

                _drawPlayers(mainDiv, players, meta);
            }
        });
}
