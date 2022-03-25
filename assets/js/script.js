(function ($) {

	'use strict';

	/*------------------------------------
		Preloader
	--------------------------------------*/
	$(window).on('load', function () {
		$('#preloader').delay(350).fadeOut('slow');
		$('body').delay(350).css({'overflow': 'visible'});
	});

	/*------------------------------------
		Mobile Menu
	--------------------------------------*/

	$('#mobile-menu-active').metisMenu();

	$('#mobile-menu-active .has-dropdown > a').on('click', function (e) {
		e.preventDefault();
	});

	$(".hamburger-menu > a").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").toggleClass("show");
		$("body").addClass("on-side");
		$('.body-overlay').addClass('active');
		$(this).addClass('active');
	});

	$(".close-mobile-menu > a").on("click", function (e) {
		e.preventDefault();
		$(".slide-bar").removeClass("show");
		$("body").removeClass("on-side");
		$('.body-overlay').removeClass('active');
		$('.hamburger-menu > a').removeClass('active');
	});

	$('.body-overlay').on('click', function () {
		$(this).removeClass('active');
		$(".slide-bar").removeClass("show");
		$("body").removeClass("on-side");
		$('.hamburger-menu > a').removeClass('active');
	});

	/*------------------------------------
		Search bar
	--------------------------------------*/
	$('.header-search > a').on('click', function (event) {
		event.preventDefault();
		$('.search-area').addClass('active');
	});

	$('.search-close').on('click', function (event) {
		event.preventDefault();
		$('.search-area').removeClass('active');
	});


	/*-------------------------------------------
	    Sticky Header
	--------------------------------------------- */

	let win = $(window);
	let sticky_id = $(".header-area");
	win.on('scroll', function () {
		let scroll = win.scrollTop();
		if (scroll < 245) {
			sticky_id.removeClass("sticky-header");
		} else {
			sticky_id.addClass("sticky-header");
		}
	});


	/*------------------------------------
        Overlay Close
	--------------------------------------*/
	$(window).scroll(function () {
		if ($(this).scrollTop() !== 0) {
			$('#scrollUp').fadeIn();
		} else {
			$('#scrollUp').fadeOut();
		}
	});

	$('#scrollUp').on('click', function () {
		$("html, body").animate({scrollTop: 0}, 600);
		return false;
	});

	/*------------------------------------
        data-background
	--------------------------------------*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
	});

	/*------------------------------------
        Quantity plus Minus
	--------------------------------------*/
	if (jQuery(".product-quantity").length > 0) {
		$('.quantity .plus').on('click', function () {
			changeValue(1);
		});
		$('.quantity .minus').on('click', function () {
			changeValue(-1);
		});

		function changeValue(val) {
			var container = $('.quantity .current-value');
			var current = parseInt(container.val(), 10);

			container.val(Math.max(0, current + val).toString());
		}
	}

	/*------------------------------------
        Image Popup
	--------------------------------------*/
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	/*------------------------------------
        Video Popup
	--------------------------------------*/
	$('.popup-video').magnificPopup({
		type: 'iframe'
	});

	/*------------------------------------
		Odometer Counter
	--------------------------------------*/
	if (jQuery(".odometer").length > 0) {
		$('.odometer').appear(function (e) {
			var odo = $(".odometer");
			odo.each(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
		});
	}

	/*------------------------------------
        Product Filter
	--------------------------------------*/
	if (jQuery(".product-filter-wrapper").length > 0) {
		$('.product-filter-wrapper .product-filter-grid').imagesLoaded(function () {
			let $grid = $('.product-filter-wrapper .product-filter-grid').isotope({
				itemSelector: '.grid-item',
				percentPosition: true,
				layoutMode: 'fitRows',
				masonry: {
					columnWidth: '.grid-item'
				}
			});

			// filter items on button click
			$('.product-filter-wrapper .product-filter-nav').on('click', 'button', function () {
				let filterValue = $(this).attr('data-filter');
				$grid.isotope({filter: filterValue});
			});

			//for menu active class
			$('.product-filter-wrapper .product-filter-nav button').on('click', function (event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

		});
	}

	if (jQuery(".category-filter-wrapper").length > 0) {
		$('.category-filter-wrapper .category-filter-grid').imagesLoaded(function () {
			let $grid = $('.category-filter-wrapper .category-filter-grid').isotope({
				itemSelector: '.grid-item',
				percentPosition: true,
				layoutMode: 'fitRows',
				masonry: {
					columnWidth: '.grid-item'
				}
			});

			// filter items on button click
			$('.category-filter-wrapper .cat-filter-nav').on('click', 'button', function () {
				let filterValue = $(this).attr('data-filter');
				$grid.isotope({filter: filterValue});
			});

			//for menu active class
			$('.category-filter-wrapper .cat-filter-nav button').on('click', function (event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

		});
	}

	/*------------------------------------
        Slider
	--------------------------------------*/
	if (jQuery(".home-slider-1 .swiper-container").length > 0) {
		let sliderActive1 = '.home-slider-1 .swiper-container';
		let sliderInit1 = new Swiper(sliderActive1, {
			// Optional parameters
			slidesPerView: 1,
			slidesPerColumn: 1,
			paginationClickable: true,
			loop: true,
			effect: 'fade',

			autoplay: {
				delay: 5000,
			},

			// If we need pagination
			// pagination: {
			// 	el: '.swiper-pagination',
			// 	type: 'fraction',
			// 	// clickable: true,
			// },

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			a11y: false
		});

		function animated_swiper(selector, init) {
			let animated = function animated() {
				$(selector + ' [data-animation]').each(function () {
					let anim = $(this).data('animation');
					let delay = $(this).data('delay');
					let duration = $(this).data('duration');

					$(this).removeClass('anim' + anim)
						.addClass(anim + ' animated')
						.css({
							webkitAnimationDelay: delay,
							animationDelay: delay,
							webkitAnimationDuration: duration,
							animationDuration: duration
						})
						.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
							$(this).removeClass(anim + ' animated');
						});
				});
			};
			animated();
			// Make animated when slide change
			init.on('slideChange', function () {
				$(sliderActive1 + ' [data-animation]').removeClass('animated');
			});
			init.on('slideChange', animated);
		}

		animated_swiper(sliderActive1, sliderInit1);
	}

	if (jQuery(".home-slider-2 .swiper-container").length > 0) {
		let sliderActive2 = '.home-slider-2 .swiper-container';
		let sliderInit2 = new Swiper(sliderActive2, {
			// Optional parameters
			slidesPerView: 1,
			slidesPerColumn: 1,
			paginationClickable: true,
			loop: true,
			effect: 'fade',

			autoplay: {
				delay: 5000,
			},

			// If we need pagination
			// pagination: {
			// 	el: '.swiper-pagination',
			// 	type: 'fraction',
			// 	// clickable: true,
			// },

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			a11y: false
		});

		function animated_swiper(selector, init) {
			let animated = function animated() {
				$(selector + ' [data-animation]').each(function () {
					let anim = $(this).data('animation');
					let delay = $(this).data('delay');
					let duration = $(this).data('duration');

					$(this).removeClass('anim' + anim)
						.addClass(anim + ' animated')
						.css({
							webkitAnimationDelay: delay,
							animationDelay: delay,
							webkitAnimationDuration: duration,
							animationDuration: duration
						})
						.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
							$(this).removeClass(anim + ' animated');
						});
				});
			};
			animated();
			// Make animated when slide change
			init.on('slideChange', function () {
				$(sliderActive2 + ' [data-animation]').removeClass('animated');
			});
			init.on('slideChange', animated);
		}

		animated_swiper(sliderActive2, sliderInit2);
	}

	if (jQuery(".home-slider-3 .swiper-container").length > 0) {
		let sliderActive3 = '.home-slider-3 .swiper-container';
		let sliderInit3 = new Swiper(sliderActive3, {
			// Optional parameters
			slidesPerView: 1,
			slidesPerColumn: 1,
			paginationClickable: true,
			loop: true,
			effect: 'fade',

			autoplay: {
				delay: 5000,
			},

			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				},
			},

			// Navigation arrows
			// navigation: {
			// 	nextEl: '.swiper-button-next',
			// 	prevEl: '.swiper-button-prev',
			// },

			a11y: false
		});

		function animated_swiper(selector, init) {
			let animated = function animated() {
				$(selector + ' [data-animation]').each(function () {
					let anim = $(this).data('animation');
					let delay = $(this).data('delay');
					let duration = $(this).data('duration');

					$(this).removeClass('anim' + anim)
						.addClass(anim + ' animated')
						.css({
							webkitAnimationDelay: delay,
							animationDelay: delay,
							webkitAnimationDuration: duration,
							animationDuration: duration
						})
						.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
							$(this).removeClass(anim + ' animated');
						});
				});
			};
			animated();
			// Make animated when slide change
			init.on('slideChange', function () {
				$(sliderActive3 + ' [data-animation]').removeClass('animated');
			});
			init.on('slideChange', animated);
		}

		animated_swiper(sliderActive3, sliderInit3);
	}

	if (jQuery(".home-slider-4 .swiper-container").length > 0) {
		let sliderActive4 = '.home-slider-4 .swiper-container';
		let sliderInit4 = new Swiper(sliderActive4, {
			// Optional parameters
			slidesPerView: 1,
			slidesPerColumn: 1,
			paginationClickable: true,
			loop: true,
			effect: 'fade',

			autoplay: {
				delay: 5000,
			},

			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				},
			},

			// Navigation arrows
			// navigation: {
			// 	nextEl: '.swiper-button-next',
			// 	prevEl: '.swiper-button-prev',
			// },

			a11y: false
		});

		function animated_swiper(selector, init) {
			let animated = function animated() {
				$(selector + ' [data-animation]').each(function () {
					let anim = $(this).data('animation');
					let delay = $(this).data('delay');
					let duration = $(this).data('duration');

					$(this).removeClass('anim' + anim)
						.addClass(anim + ' animated')
						.css({
							webkitAnimationDelay: delay,
							animationDelay: delay,
							webkitAnimationDuration: duration,
							animationDuration: duration
						})
						.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
							$(this).removeClass(anim + ' animated');
						});
				});
			};
			animated();
			// Make animated when slide change
			init.on('slideChange', function () {
				$(sliderActive4 + ' [data-animation]').removeClass('animated');
			});
			init.on('slideChange', animated);
		}

		animated_swiper(sliderActive4, sliderInit4);
	}

	if (jQuery(".product-slider-1 .swiper-container").length > 0) {
		let productSlider1 = new Swiper('.product-slider-1 .swiper-container', {
			// Optional parameters
			slidesPerView: 4,
			slidesPerColumn: 1,
			loop: true,
			spaceBetween: 30,

			autoplay: {
				delay: 3000,
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
			},

			a11y: false
		})
	}

	if (jQuery(".product-slider-2 .swiper-container").length > 0) {
		let productSlider2 = new Swiper('.product-slider-2 .swiper-container', {
			// Optional parameters
			slidesPerView: 4,
			slidesPerColumn: 1,
			loop: true,

			autoplay: {
				delay: 3000,
			},

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
			},

			a11y: false
		})
	}

	if (jQuery(".testimonial-slider-1 .swiper-container").length > 0) {
		let testimonialSlider1 = new Swiper('.testimonial-slider-1 .swiper-container', {
			// Optional parameters
			slidesPerView: 2,
			slidesPerColumn: 1,
			loop: true,

			autoplay: {
				delay: 3000,
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				1024: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 2,
				},
			},

			a11y: false
		})
	}

	if (jQuery(".testimonial-slider-2 .swiper-container").length > 0) {
		let testimonialSlider2 = new Swiper('.testimonial-slider-2 .swiper-container', {
			// Optional parameters
			slidesPerView: 3,
			slidesPerColumn: 1,
			loop: true,

			autoplay: {
				delay: 3000,
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},

			a11y: false
		})
	}

	if (jQuery(".brand-slider .swiper-container").length > 0) {
		let brandSlider1 = new Swiper('.brand-slider .swiper-container', {
			// Optional parameters
			slidesPerView: 5,
			slidesPerColumn: 1,
			paginationClickable: true,
			loop: true,
			spaceBetween: 30,

			autoplay: {
				delay: 3000,
			},

			breakpoints: {
				320: {
					slidesPerView: 2,
					slidesPerColumn: 1,
				},
				768: {
					slidesPerView: 3,
					slidesPerColumn: 1,
				},
				1024: {
					slidesPerView: 4,
					slidesPerColumn: 1,
				},
				1200: {
					slidesPerView: 5,
					slidesPerColumn: 1,
				},
			},

			a11y: false
		})
	}

	/*------------------------------------
        Contact Map
	--------------------------------------*/
	function basicmap() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,
			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.6700, -73.9400), // New York
			// This is where you would paste any style found on Snazzy Maps.
			styles: [
				{
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#f5f5f5"
						}
					]
				},
				{
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#616161"
						}
					]
				},
				{
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"color": "#f5f5f5"
						}
					]
				},
				{
					"featureType": "administrative.land_parcel",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#bdbdbd"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#eeeeee"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#757575"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#e5e5e5"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#9e9e9e"
						}
					]
				},
				{
					"featureType": "road",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#ffffff"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#757575"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#dadada"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#616161"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#9e9e9e"
						}
					]
				},
				{
					"featureType": "transit.line",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#e5e5e5"
						}
					]
				},
				{
					"featureType": "transit.station",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#eeeeee"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#c9c9c9"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"color": "#9e9e9e"
						}
					]
				}
			]
		};
		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('contact-map');

		// Create the Google Map using our element and options defined above
		var map = new google.maps.Map(mapElement, mapOptions);

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			map: map,
			icon: "assets/img/icon/marker.png",
			title: 'Biver'
		});
	}

	if ($('#contact-map').length != 0) {
		google.maps.event.addDomListener(window, 'load', basicmap);
	}


})(jQuery);
