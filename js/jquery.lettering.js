/*global jQuery */
/*!	
* Lettering.JS 0.6.1
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
(function($){
	function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
                var extraklass='', eltoadd = 'span';
                
		if (a.length) {
			$(a).each(function(i, item) {
                               console.log("klass: ["+klass+"], item: ["+item+"]")
                                if(klass === 'char char' && item.toLowerCase() === 'a') {  extraklass = 'vowel a';  }
                                else if(klass === 'char char' && item.toLowerCase() === 'e') {  extraklass = 'vowel e';  }
                                else if(klass === 'char char' && item.toLowerCase() === 'i') {  extraklass = 'vowel i';  }
                                else if(klass === 'char char' && item.toLowerCase() === 'o') {  extraklass = 'vowel o';  }                                
                                else if(klass === 'char char' && item.toLowerCase() === 'u') {  extraklass = 'vowel u';  }
                                else if(klass === 'char char' && (item.match(/\n/g)||[]).length > 0 ) {  extraklass = 'gimmeabreak';  }
                                else if(klass === 'word word' && item === '') {  extraklass = 'gimmesomespace';  }                                
                                else {  extraklass = '';  }
                                
                                if(i%2 === 0) {  extraklass += ' even';  } else {  extraklass += ' odd';  }
                                
                                //if(klass === 'line line') {  eltoadd = "div";  } else {  eltoadd = "span";  }
                                
				inject += '<'+eltoadd+' class="'+klass+(i+1)+' '+extraklass+'">'+item+'</'+eltoadd+'>'+after;
			});	
			t.empty().append(inject);
		}
	}
	
	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word word', ' ');
			});

		},
		
		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);