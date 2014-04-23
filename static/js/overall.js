
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

function drawAllPlayers( selector )
{
    d3.json( "../data/nfl-combine-2013.json", 
        function( err, json ) 
        {
            if ( err ) return console.warn( err );

            var meta = json[ "meta" ];
            console.log( meta );

            var players = json[ 'players' ];
            players.forEach( function( player ) 
            {
                _clean( player );
            } );

            var playerDivs = d3.select(selector)
                .selectAll('player')
                .data(players)
                .enter()
                    .append('div')
                    .attr('class', 'player');

        });
}
