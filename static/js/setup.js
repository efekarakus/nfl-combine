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
}


$( document ).ready( main );