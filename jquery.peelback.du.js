/*
 * jQuery Peelback (data URI version)
 * Copyright 2010, Rob Flaherty
 *
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 *
 * Note: This version of the plugin relies on a data URI for the peel effect image. Consequently it will not work (fails silently) in browsers that do not support data URIs, namely IE6 and IE7.
 */
 
(function($){
  $.Peelback = function(el, settings){
    
    //Caching
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.$el.data("Peelback", base);
    
    base.init = function() {
 
      //Defaults, meet Settings
      base.settings = $.extend({},$.Peelback.defaultSettings, settings);
      
      if (typeof(base.settings.adImage) !== 'string' || base.settings.adImage === '') {
        //If ad image is missing, stop the show            
        if ( base.settings.debug === true) {
          console.log('Ad image missing');
        }
        return;
               
      } else if (typeof(base.settings.clickURL) !== 'string' || base.settings.clickURL === '') {
        //If click URL is missing, stop the show 
        if ( base.settings.debug === true) {
        console.log('Click URL missing');              
        }
        return;
      } else {
        //Check if browser supports data URIs
        var data = new Image();        
        data.onload = data.onerror = function() {
          if (this.width == 1 && this.height == 1) {
            //If so, call main function
            base.main();
          } else {
            if (base.settings.debug === true) {
              console.log('Browser does not appear to support data URIs');
            }
            //Exit
            return;
          }
        }      
        data.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';     
      }
    };
    
    //Main stuff    
    base.main = function(settings) {
          
      //Assemble
      var peelHTML = $('<div id="peelback"><a href="' + base.settings.clickURL + '" target="_blank"><img src="' + base.peelImage +'" alt="" border="0" /></a><div></div></div>'),
        peelImage = peelHTML.find('img'),
        peelMask = peelHTML.find('div'),
        
        IMG_WIDTH = IMG_HEIGHT = '58px',
        MASK_WIDTH = MASK_HEIGHT = '55px';        
          
      $(peelImage).css({
        'width': '0',
        'height': '0',
        'z-index': '99',
        'position': 'absolute',
        'right': '0',
        'top': '0',
        '-ms-interpolation-mode': 'bicubic'
      });
    
      $(peelMask).css({
        'width': '0',
        'height': '0',
        'overflow': 'hidden',
        'position': 'absolute',
        'right': '0',
        'top': '0',
        'background': 'url(' + base.settings.adImage + ') no-repeat right top'
      });
      
      //Insert
      base.$el.prepend(peelHTML);
      
      //Auto animate option      
      if (base.settings.autoAnimate === false) {
        $(peelImage).css({'width' : IMG_WIDTH, 'height' : IMG_HEIGHT});
        $(peelMask).css({'width' : MASK_WIDTH, 'height' : MASK_HEIGHT});
      } else {
        $(peelImage).delay(500).animate({
          width: IMG_WIDTH, 
          height: IMG_HEIGHT
        }, 500);
          
        $(peelMask).delay(500).animate({
          width: MASK_WIDTH, 
          height: MASK_HEIGHT
        }, 500); 
      }      
      
      //Hover behavior
      peelHTML.hover(
        
        //Mouseover
        function(){      
          $(peelImage).stop().animate({
            width: '510px', 
            height: '510px'
          }, 500);
          
          $(peelMask).stop().animate({
            width: '490px', 
            height: '490px'
          }, 500);
            
          //If GA tracking enabled
          if (base.settings.gaTrack === true) {    
            if (typeof(_gaq) != 'undefined') {
              _gaq.push(['_trackEvent', 'Ad_Interaction', 'Peelback', base.settings.gaLabel]);
            } else {
              if (base.settings.debug === true) {
                console.log('Google Analytics _gaq object undefined');
              }
            }  
         } 
            
        },
        
        //Mouseout
        function(){
          $(peelImage).stop().animate({
            width: IMG_WIDTH,
            height: IMG_HEIGHT
          }, 400);
          
          $(peelMask).stop().animate({
            width: MASK_WIDTH,
            height: MASK_HEIGHT
          }, 400);
        }
      
      );
          
    };
    
    base.peelImage = 'data:image/png;base64,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';
    
    // Run initializer
    base.init();
  };
    
  $.Peelback.defaultSettings = {
    adImage  : null,
    clickURL : null,
    gaTrack  : false,
    gaLabel  : 'default',
    autoAnimate: true,
    debug: false
  };
  
  $.fn.peelback = function(settings){
    return this.each(function(){
      (new $.Peelback(this, settings));
    });
  };
    
})(jQuery);
