/*
 * jFloat 1.0 - jQuery plugin
 *	Built for jQuery library
 *	http://jquery.com
  *Copyright (c) 2011 Sean Oh (http://www.ohsean.net)
 *	Licensed under the MIT(LICENSE.TXT)
 */ 
 
(function($){	
	jQuery.fn.jFloat = function(_arr) {
 		$.each(_arr, function(i, val) {
			$(val[0]).css({position : 'absolute'});
			if(val[1] == null) val[1] = 0;
			var _t = $(val[0]).offset().top - parseFloat($(val[0]).css('marginTop').replace(/auto/, 0));
			var _l = parseFloat($(val[0]).css('left').replace(/auto/, 0));	
			var _m = $(val[0]).parent().offset().left - $(val[0]).offset().left;
			if (_m < 0 ) _m = 0;
			_arr[i].push(_t,_l,_m);
		});
		
		var agentID = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|msie 6.0|mobile safari)/);
		if (!agentID)  initFloat();
		
		function initFloat(){
		  $(window).bind('resize scroll', function() {
			reposition();
		  });
			function reposition() {
				var x;
				var y;
				var o;
				$.each(_arr, function(i, val) { 
					o = $(val[0]);
					x = val[3] - $(window).scrollLeft() + o.parent().offset().left  - val[4];
					y = $(window).scrollTop() + val[1];
					if (y >= val[2]) {
						if (!o.hasClass("float")) o.addClass("float");
						o.css({position : 'fixed', top: val[1]});	      
						o.css({left: x});				
					} else {
						if (o.hasClass("float")) o.removeClass("float");
						o.css({position : 'absolute', top: val[2] - $(val[0]).parent().position().top});
						o.css({left: val[3]});
					};
				});
			};
		};
	};
}(jQuery));