/*!
 * jQuery Peelback
 * Copyright 2011, Rob Flaherty
 *
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
(function($) {
  $.Peelback = function(el, settings) {
    
    //Caching
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.$el.data("Peelback", base);
    
    //Main stuff    
    base.init = function() {
      
      //Vars
      var peelHTML, peelImage, peelMask, smallSize, bigSize, smallMaskSize, bigMaskSize;
      
      //Defaults, meet Settings
      base.settings = $.extend({},$.Peelback.defaultSettings, settings);      
      
      //If ad image is missing, stop the show            
      if (typeof(base.settings.adImage) !== 'string' || base.settings.adImage === '') {
        if ( base.settings.debug === true) {
          console.log('Ad image missing');
        }
        return;
      }
      
      //If peel image is missing, stop the show            
      if (typeof(base.settings.peelImage) !== 'string' || base.settings.peelImage === '') {
        if ( base.settings.debug === true) {
          console.log('Peel effect image missing');              
        }
        return;
      }
      
      //If click URL is missing, stop the show            
      if (typeof(base.settings.clickURL) !== 'string' || base.settings.clickURL === '') {
        if ( base.settings.debug === true) {
          console.log('Click URL missing');              
        }
        return;
      }
      
      //Convenience vars and set mask size
      smallSize = base.settings.smallSize + 'px';
      bigSize = base.settings.bigSize + 'px';
      smallMaskSize = (base.settings.smallSize - 3) + 'px';
      bigMaskSize = Math.floor((base.settings.bigSize * 0.96)) + 'px';
      
      //Assemble
      peelHTML = $('<div id="peelback"><a href="' + base.settings.clickURL + '" target="_blank"><img src="' + base.settings.peelImage +'" alt="" border="0" /></a><div></div></div>');
      peelImage = peelHTML.find('img');
      peelMask = peelHTML.find('div');
          
      $(peelImage).css({
        'width': '0',
        'height': '0',
        'z-index': '9001',
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
        'z-index': '9000',
        'background': 'url(' + base.settings.adImage + ') no-repeat right top'
      });
      
      //Insert
      base.$el.prepend(peelHTML);
      
      //Auto animate option      
      if (base.settings.autoAnimate === false) {
        $(peelImage).css({ 'width' : smallSize, 'height' : smallSize });
        $(peelMask).css({ 'width' : smallMaskSize, 'height' : smallMaskSize });
      } else {
        $(peelImage).delay(500).animate({
          width: smallSize, 
          height: smallSize
        }, 500);
          
        $(peelMask).delay(500).animate({
          width: smallMaskSize, 
          height: smallMaskSize
        }, 500); 
      }      
      
      //Hover behavior
      peelHTML.hover(
        
        //Mouseover
        function() {      
          $(peelImage).stop().animate({
            width: bigSize, 
            height: bigSize
          }, 500);
          
          $(peelMask).stop().animate({
            width: bigMaskSize, 
            height: bigMaskSize
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
        function() {
          $(peelImage).stop().animate({
            width: smallSize,
            height: smallSize
          }, 400);
          
          $(peelMask).stop().animate({
            width: smallMaskSize,
            height: smallMaskSize
          }, 400);
        }
      
      );
          
    };
        
    // Run initializer
    base.init();
  };
    
  $.Peelback.defaultSettings = {
    adImage     : null,
    peelImage   : null,
    clickURL    : null,
    smallSize   : 58,
    bigSize     : 510,
    gaTrack     : false,
    gaLabel     : 'default',
    autoAnimate : true,
    debug       : false
  };
  
  $.fn.peelback = function(settings) {
    return this.each(function() {
      (new $.Peelback(this, settings));
    });
  };
    
})(jQuery);