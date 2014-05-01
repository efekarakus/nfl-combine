/**
 * @file setup.js
 * @author Joseph Ciurej
 * @date Spring 2014
 *
 * Sets Up the Main Visualization Page
 *
 * @see http://stackoverflow.com/a/16475234
 * @see http://jqueryui.com/position/
 */

/**
 * Main function for the 'setup.js' script file.
 */
function main()
{
	// Adjust the Header to Fit The Page //
	{
		$( "#main-header" ).height( 0.90 * $(window).height() );

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

	// Add Autoscroll to Wave Button Elements //
	{
		$( "#main-header-footer" ).click( function () {
			$( "html, body" ).animate(
				{ scrollTop: $( ".example-container" ).offset().top }, 800
			);
		});

		$( ".legend-footer" ).click( function () {
			$( "html, body" ).animate(
				{ scrollTop: $( "#compare-btn" ).offset().top }, 800
			);
		});

		$( ".main-content-footer" ).click( function () {
			$( "html, body" ).animate(
				{ scrollTop: $( "#compare-btn" ).offset().top }, 800
			);
		});
	}

	// Add Rendering Functionality to Compare Button //
	{
		$( "#compare-btn" ).click( function () {
			$( "html, body" ).animate(
				{ scrollTop: $( ".compare-content" ).offset().top }, 800
			);
		});
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

	// Draw comparision on compare selected //
	{
		$("#compare-btn").click(function() {
			var selections = overall.selections;
			drawComparisons(selections);
		});
	}

	// Set Up the Comparison View Side Bar //
	{
		$( "#comparison-sidebar" ).width(
			($(document).width() - $("#main-content").width()) / 2.0 - 10.0
		);

		$( "#comparison-sidebar" ).position( {
			of: $( "#main-content" ),
			my: "left top",
			at: "right top",
		} );

		$( "#comparison-sidebar" ).fixTo( "#main-content" );
	}
}


$( document ).ready( main );

