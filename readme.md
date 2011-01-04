# jQuery Peelback Ad
This is a jQuery plugin for adding a "peelback" or "peelaway" ad to a page. It's based on this [peelback demo](http://www.sohtanaka.com/web-design/simple-page-peel-effect-with-jquery-css/), by Soh Tanaka, which achieves the peelback effect by animating the ad image (the background image) and the peel image in parallel.

Some features:

* Except for the two images, everything is contained in the plugin, which means you can add this to your site without having to touch your stylesheets or HTML.
* Lightweight. The script and the peel effect image combined are only 7.3KB.
* Plugs into Google Analytics Event Tracking to record the mouseover/peelback event.
* Works in all modern browsers as well as IE6, IE7, and IE8.
* Optional version that uses a data URI for the peelback image.

## How to use it:
Just call the `.peelback()` method on the `body` element and fill in the parameters.

###Required
**`adImage`** : path to the ad image (string)  
**`peelImage`** : path to "peel-image.png" (string)
**`clickURL`** : click-through URL for the ad (string)

Note: In the data URI version, the `peelImage` parameter does not exist because the image is contained within the script.

###Optional
**`gaTrack`** : Send peelback events to Google Analytics? (boolean; default=false)   
**`gaLabel`** : GA event label to use (string; default="default")    
**`autoAnimate`** : animate peelback corner on pageload (boolean; default=true)      
**`debug`** : display errors in console (boolean; default=false)
    
    $(function(){
      $('body').peelback({
        adImage     : 'peel-ad.png',
        peelImage   : '../assets/peel-image.png',
        clickURL    : 'http://www.thebestdinosaur.com/',
        gaTrack     : true,
        gaLabel     : '#1 Stegosaurus',
        autoAnimate : true,
        debug       : false 
      });
    });
    
## Demo
[http://www.ravelrumba.com/code/demos/jquery-peelback/demo/](http://www.ravelrumba.com/code/demos/jquery-peelback/demo/)

## Dependencies
jQuery. Tested on 1.4.4 but should work in most older versions.

## Credits
[http://www.sohtanaka.com/web-design/simple-page-peel-effect-with-jquery-css/](http://www.sohtanaka.com/web-design/simple-page-peel-effect-with-jquery-css/)
