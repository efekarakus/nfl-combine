/**
 * @file setup.js
 * @author Joseph Ciurej
 * @date Spring 2014
 *
 * Sets Up the Main Visualization Page
 *
 * @TODO
 * - Write the implementation for this script!
 */

/**
 * Main function for the 'setup.js' script file.
 */
function main()
{
	// Adjust the Header to Fit The Page //
	{
		$( "#main-header" ).height( 0.85 * $(document).height() );

		$( "#main-header-title" ).position( {
			of: $( "#main-header" ),
			my: "center center",
			at: "center center-15%",
		} );

		$( "#main-header-footer" ).position( {
			of: $( "#main-header" ),
			my: "center bottom",
			at: "center bottom",
		} );
	}

	// Draw the player polygons //
	{
        drawAllPlayers('.main', 'random', true);
        
        $(".sub-nav").click(function(e) {
            $(".sub-nav").removeClass("selected");
            $(this).addClass("selected");
            var filter_by = $(this).attr("id");
            $('.main').html('');
            drawAllPlayers('.main', filter_by, false);
        });
	}

	// Draw comparision on compare selected
	{
		$("#compare-btn").click(function() {
			var selections = overall.selections;
			drawComparisons(selections);
		})
	}
}


$( document ).ready( main );
