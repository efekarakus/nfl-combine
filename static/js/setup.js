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
	}

	// Add Autoscroll to Wave Button Elements //
	{
		$( "#main-header-footer" ).click( function () {
			$( "html, body" ).animate(
				{ scrollTop: $( ".example-container" ).offset().top}, 800
			);
		});
	}
}


$( document ).ready( main );
