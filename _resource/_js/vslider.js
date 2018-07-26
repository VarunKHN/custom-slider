// Vslider Beta Version 0.1
(function(jQuery) {
	
	$.fn.vSlider = function(options) {
		
		var defaults =
		{
			transitionTime : 1000, // in second
			timeBetweenSlides : 2000 // in seconds
		};
			
		options = jQuery.extend(defaults, options);
		var slider = $('.slider');
		var buttons = $('#buttonNavigations');
		var slide = 'li';
		var previous = $('#previous');	
		var next = $('#next');	
		var interval;
		var pager = $('#buttonNavigations');
		
		
		function slides(){
			return slider.find(slide);
		}
		
		function pagerSlides(){
			return pager.find(slide);	
		}
		
		var countSlides = slides().length;
		countSlides = countSlides - 1;
		
		slides().fadeOut(); // list of li's in an array
		
		// onload set active class 
		slides().first().addClass('active');
		slides().first().fadeIn(options.transitionTime);
		
		for(i=0; i<slides().length ; i++)
		{
			
			$('.slider li:eq('+i+')').addClass('slideId'+i);
			var selectButtons = jQuery(document.createElement('li')).addClass((i === 0) ? 'liactive' : '');
			selectButtons.addClass('ahrefButtons');
			var selectButtonsLink = jQuery(document.createElement('a'))
			selectButtonsLink.attr("href","javascript:void(0)");
			selectButtonsLink.appendTo(selectButtons);
			selectButtons.appendTo(buttons);		
			
		}
		
		// mode : auto scroll
		autoScroll(); 
		
		// previous slide
		
		previous.click(function(){
			
			var currentIndex = slider.find(slide + '.active').index();
			if(currentIndex == 0){
				cur = currentIndex;
				prev = countSlides;
				fadeToNext(cur,prev);
				autoScroll();
			}else{
				cur = currentIndex;
				prev = currentIndex - 1;
				fadeToNext(cur,prev);
				autoScroll();
			}
			
		});
		
		// next slide
		next.click(function(){
			
			var currentIndex = slider.find(slide + '.active').index();
			if(currentIndex == countSlides){
				cur = currentIndex;
				next = 0;
				fadeToNext(cur,next);
				autoScroll();
			}else{
				cur = currentIndex;
				next = currentIndex + 1;
				fadeToNext(cur,next);
				autoScroll();
			}
			
		});
		
		// Auto Scroll mode execute
		
		function autoScroll(){
			
			clearInterval(interval);
			interval = setInterval(function(){
				
				var $j = slider.find(slide + '.active').index();	
				if (slides().length == $j + 1) $j = -1; // loop to start
				var ne = $j + 1;
				fadeToNext($j,ne);	
				
				
			}, options.transitionTime +  options.timeBetweenSlides);
			
		}
		
		// Animation
		
		function fadeToNext(current,next){
			
			var currentActive = slider.find(slide + '.active').index();
			slides().eq(currentActive).removeClass('active');
			pagerSlides().eq(currentActive).removeClass('liactive');
			slides().eq(currentActive).fadeOut(options.transitionTime);
			
			slides().eq(next).fadeIn(options.transitionTime);
			pagerSlides().eq(next).addClass('liactive');
			slides().eq(next).addClass('active');
			
		}
		
		//pager button click execute
		
		$('#buttonNavigations li a').click(function(){
			
			triggerId = $(this).parent().index();
			var cur = slider.find(slide + '.active').index();	
			if(cur != triggerId){
				fadeToNext(cur,triggerId);
			}
			
			autoScroll();
			
		});
		
		
	};

})(jQuery);	