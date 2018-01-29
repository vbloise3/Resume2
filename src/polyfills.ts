/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/docs/ts/latest/guide/browser-support.html
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import '../node_modules/core-js/es6/symbol';
import '../node_modules/core-js/es6/object';
import '../node_modules/core-js/es6/function';
import '../node_modules/core-js/es6/parse-int';
import '../node_modules/core-js/es6/parse-float';
import '../node_modules/core-js/es6/number';
import '../node_modules/core-js/es6/math';
import '../node_modules/core-js/es6/string';
import '../node_modules/core-js/es6/date';
import '../node_modules/core-js/es6/array';
import '../node_modules/core-js/es6/regexp';
import '../node_modules/core-js/es6/map';
import '../node_modules/core-js/es6/weak-map';
import '../node_modules/core-js/es6/set';

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import '../node_modules/classlist.js/classList';  // Run `npm install --save classlist.js`.

/** Evergreen browsers require these. **/
import '../node_modules/core-js/es6/reflect';
import '../node_modules/core-js/es7/reflect';


/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
import '../node_modules/web-animations-js/web-animations.min';  // Run `npm install --save web-animations-js`.



/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import '../node_modules/zone.js/dist/zone';  // Included with Angular CLI.



/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * Date, currency, decimal and percent pipes.
 * Needed for: All but Chrome, Firefox, Edge, IE11 and Safari 10
 */
// import 'intl';  // Run `npm install --save intl`.
/**
 * Need to import at least one locale-data with intl.
 */
// import 'intl/locale-data/jsonp/en';
