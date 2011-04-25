# jQuery Peelback Ad
This is a jQuery plugin for adding a "peelback" or "peelaway" ad to a page. It's based on this [peelback demo](http://www.sohtanaka.com/web-design/simple-page-peel-effect-with-jquery-css/), by Soh Tanaka, which achieves the peelback effect by animating the ad image (the background image) and the peel image in parallel.

Some features:

* Except for the two images, everything is contained in the plugin, which means you can add this to your site without having to touch your stylesheets or HTML.
* Lightweight. The script and the peel effect image combined are only 7.3KB.
* Plugs into Google Analytics Event Tracking to record the mouseover/peelback event.
* Works in all modern browsers as well as IE6, IE7, and IE8.

## How to use it:
Just call the `.peelback()` method on the `body` element and fill in the parameters.

###Required
**`adImage`** : path to the ad image (string)  
**`peelImage`** : path to "peel-image.png" (string)  
**`clickURL`** : click-through URL for the ad (string)

###Optional
**`smallSize`** : Specify size of small peel preview (number; default=58)  
**`bigSize`** : Specify size of full size ad image (number; default=510)  
**`gaTrack`** : Send peelback events to Google Analytics? (boolean; default=false)  
**`gaLabel`** : GA event label to use (string; default="default")  
**`autoAnimate`** : animate peelback corner on pageload (boolean; default=true)   
**`debug`** : display errors in console (boolean; default=false) 
    
    $(function(){
      $('body').peelback({
        adImage     : 'peel-ad.png',
        peelImage   : '../assets/peel-image.png',
        clickURL    : 'http://www.thebestdinosaur.com/',
        smallSize   : 50,
        bigSize     : 500,
        gaTrack     : true,
        gaLabel     : '#1 Stegosaurus',
        autoAnimate : true,
        debug       : false 
      });
    });
    
## Demo
[http://www.ravelrumba.com/code/demos/jquery-peelback/demo/](http://www.ravelrumba.com/code/demos/jquery-peelback/demo/)

## Dependencies
jQuery. Tested on 1.4.4 and 1.5.2.

## Changelog
0.2: 04/25/2011 - Added image sizes as settings. Removed dataURI version to keep things simple.  
0.1: 12/26/2010 - Release

## Credits
[http://www.sohtanaka.com/web-design/simple-page-peel-effect-with-jquery-css/](http://www.sohtanaka.com/web-design/simple-page-peel-effect-with-jquery-css/)