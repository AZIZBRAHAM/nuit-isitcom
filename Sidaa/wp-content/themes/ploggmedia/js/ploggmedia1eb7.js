$(document).ready(function(){
	
	//Parallax animation
	$(window).scroll(function() {
		var scrolled = $(window).scrollTop()
		$('.parallax').each(function(index, element) {
			var initY = $(this).offset().top
			var height = $(this).height()
			var endY  = initY + $(this).height()
			
			// Check if the element is in the viewport.
			var visible = isInViewport(this)
			if(visible) {
				  var diff = scrolled - initY
				  var ratio = Math.round((diff / height) * 100)
				  $(this).css({'transform' : 'translateY(' + parseInt(-(ratio * 0.875)) + 'px)'})
			}
		})
	})
		
	function isInViewport(node) {
		var rect = node.getBoundingClientRect()
		return (
			(rect.height > 0 || rect.width > 0) &&
			rect.bottom >= 0 &&
			rect.right >= 0 &&
			rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.left <= (window.innerWidth || document.documentElement.clientWidth)
		)
	}
	
	//Fade in animation
	$(window).scroll(function() {
		animateOnScroll();
	});
	
	animateOnScroll();
	
	function animateOnScroll() {
		// Check the location of each desired element
		$(".fade-in").each(function() {
			var offset = 200;
			var top_of_object = $(this).offset().top;
			var bottom_of_window =
			$(window).scrollTop() + $(window).height();
			
			// If the object is completely visible in the window, fade it it
			if (bottom_of_window > top_of_object + offset) {
				$(this).addClass("appear");
			}
		});
	}
	
	//Header
	$(document).on('click', "header #menu-icon", function(e) { 
		e.preventDefault();
		var checkbox = $(".burger-input");
		if(checkbox.prop("checked")==true){
		    checkbox.prop("checked", false); 
		    $('#mobile-menu').attr('aria-expanded', 'false');
		    $('html').removeClass("menu-open");
		}else{
		    checkbox.prop("checked", true)
			$('#mobile-menu').attr('aria-expanded', 'true');
			$('html').addClass("menu-open");
		}
	});
	
	$(document).on('click', "header #mobile-menu .menu-item", function(e) { 
		$(this).attr('aria-expanded', $(this).attr('aria-expanded') == 'true' ? 'false' : 'true');
	});
});
