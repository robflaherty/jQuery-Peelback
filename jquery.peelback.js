/*
 * jQuery Peelback
 * Copyright 2010, Rob Flaherty
 *
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
 
(function($){
  $.Peelback = function(el, settings){
    
    //Caching
    var base = this;
    base.$el = $(el);
    base.el = el;
    base.$el.data("Peelback", base);
    
    //Main stuff    
    base.init = function(){
      
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
      
      //Assemble
      var peelHTML = $('<div id="peelback"><a href="' + base.settings.clickURL + '" target="_blank"><img src="' + base.settings.peelImage +'" alt="" border="0" /></a><div></div></div>'),
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
        
    // Run initializer
    base.init();
  };
    
  $.Peelback.defaultSettings = {
    adImage  : null,
    peelImage : null,
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
