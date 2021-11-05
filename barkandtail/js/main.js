window.onload = function () {


	// base ============

	var body = document.querySelector('body');
	var quant = document.querySelectorAll('.quantly');
	var checkout = document.querySelector('.checkout');	
	var drop_open = $('.dropdown__title');
	var about_slider = $('.about__photos');

	if (drop_open) { // default drop
		drop_open.on('click', function(){
			$(this).next().slideToggle(200);
			$(this).toggleClass('dropdown__title--open');
		});
	}

	

	function disableScroll() { // отключить скролл при открытии модалок
		body.classList.add('no_scroll');
	}
	function enableScroll() { // включить скролл при закрытии модалок
		body.classList.remove('no_scroll');
	}

	function mobile() { // проверка ширины экрана
		if ( $(window).width() < 768 ) {
			return true;
		} else {
			return false;
		}
	}

	function checkModal($modals) { // проверить есть ли в данный момент открытые модалки
		var picker = null;
		for(var i=0;i<$modals.length;i++) {
			if ($modals[i].classList.contains('modal--open')) {
				picker = false;
			} else {
				if (picker != false) {
					picker = true;
				}							
			}
		}
		return picker;
	}

	if (quant) { // кнопки + - добавить/вычесть единицу товара
		for (var i=0;i<quant.length;i++) {
			var quantly_in = quant[i].querySelector('input[name=quantly]');
			var quantly;

			quant[i].querySelector('.quantly__plus').addEventListener('click', function(){
				quantly = parseInt(this.parentNode.querySelector('input[name=quantly]').value);
				this.parentNode.querySelector('input[name=quantly]').value = quantly + 1;
			});
			quant[i].querySelector('.quantly__minus').addEventListener('click', function(){
				quantly = parseInt(this.parentNode.querySelector('input[name=quantly]').value);
				if (quantly > 1) {
					this.parentNode.querySelector('input[name=quantly]').value = quantly - 1;
				}
			});
		}
	}




	// развернуть блок сео текста
	$('.seo__btn').on('click', function(){
		$(this).closest('.seo').toggleClass('seo--open');
	});


	// dropdown
	// при выборе пункта записать его в input hidden + вывести его в заголовок дропдауна + закрыть дропдаун
	$('.dropdown__row').on('click', function(e){
		e.preventDefault();
		var $this = $(this);
		var item = $(this).find('input').val();
		var lab = $(this).find('label').text();
		$(this).closest('.dropdown__list').find('input[type=hidden]').val(item);
		$(this).closest('.dropdown').find('.dropdown__title .dropdown__checked').fadeOut(100);
		$('.category__sort').removeClass('category__sort--open');
		$('.open_sort').removeClass('open_sort--open');

		setTimeout(function(){ // для плавности
			$this.closest('.dropdown').find('.dropdown__title .dropdown__checked').text(lab);
			$this.closest('.dropdown').find('.dropdown__title .dropdown__checked').fadeIn(100);
		}, 100);

		$(this).closest('.dropdown__list').slideUp(100);
		$(this).closest('.dropdown').find('.dropdown__title').removeClass('dropdown__title--open');
		$(this).addClass('dropdown__row--active');
		$(this).siblings().removeClass('dropdown__row--active');
	});

	if (about_slider) {

		about_slider.slick({
			infinite: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: true,
				}
			},
			]
		});

	}

	$('.footer__chat').on('click', function(){
		$('body,html').animate({scrollTop:0},800);
	});

	$(window).on('scroll', function(){
		if ( $(window).scrollTop() > 800 ) {
			$('.footer__chat').addClass('footer__chat--show');
		} else {
			$('.footer__chat').removeClass('footer__chat--show');
		}
	});



	$('.products--slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: false,
		arrows: false,
		dots: false,
		//autoplay: true,
		speed: 400,
		pauseOnHover: false,
		responsive: [
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
			}
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 1,
			}
		}
		]
	});
		





	// modal cart ============

	var modalCart = document.querySelector('.modalCart'); 
	var modalCart_open = document.querySelectorAll('.open_cart');
	var modalCart_close = document.querySelectorAll('.close_cart');
	if (modalCart) {
		var modalCart_inner = modalCart.querySelector('.modal__win');
	}

	if (modalCart || checkout) {		

		$('.add_promo').on('click', function(){
			$(this).parents('.promocode__def').slideUp(200);
			setTimeout(function(){
				$('.promocode__add').slideDown(200);
			}, 200);
		});
		$('.confirm_promo').on('click', function(){
			var code = $(this).prev();
			if ( code.val() != '' ) {
				code.removeClass('input--err');
				code.addClass('input--ok');				
				$(this).parents('.promocode__add').slideUp(200);
				setTimeout(function(){
					$('.promocode__result').slideDown(200);
				}, 200);
			} else {
				code.removeClass('input--ok');
				code.addClass('input--err');
			}
		});
	}




	// modal wish ============

	var modalWish = document.querySelector('.modalWish');
	if (modalWish) {
		var modalWish_inner = modalWish.querySelector('.modal__win');
	}	
	var modalWish_open = document.querySelectorAll('.open_wish');
	var modalWish_close = document.querySelectorAll('.close_wish');

	// modal auth ============

	if (modalLogin) {
		var modalLogin_inner = modalLogin.querySelector('.modal__win');
	}
	var modalLogin = document.querySelector('.modalLogin');
	var modalLogin_open = document.querySelectorAll('.open_auth');
	var modalLogin_close = document.querySelectorAll('.close_auth');

	// modal register ============

	var modalRegister = document.querySelector('.modalRegister');
	if (modalRegister) {
		var modalLogin_inner = modalRegister.querySelector('.modal__win');
	}
	var modalRegister_inner = modalRegister.querySelector('.modal__win');
	var modalRegister_open = document.querySelectorAll('.open_register');
	var modalRegister_close = document.querySelectorAll('.close_register');

	// modal forgot ============

	var modalForgot = document.querySelector('.modalForgot');
	if (modalForgot) {
		var modalLogin_inner = modalForgot.querySelector('.modal__win');
	}
	var modalForgot_inner = modalForgot.querySelector('.modal__win');
	var modalForgot_open = document.querySelectorAll('.open_forgot');
	var modalForgot_close = document.querySelectorAll('.close_forgot');

	// modal change ============

	var modalChange = document.querySelector('.modalChange');
	if (modalChange) {
		var modalLogin_inner = modalChange.querySelector('.modal__win');
	}
	var modalChange_inner = modalChange.querySelector('.modal__win');
	var modalChange_open = document.querySelectorAll('.open_change');
	var modalChange_close = document.querySelectorAll('.close_change');

	// modal success ============

	var modalSuccess = document.querySelector('.modalSuccess');
	if (modalSuccess) {
		var modalLogin_inner = modalSuccess.querySelector('.modal__win');
	}
	var modalSuccess_inner = modalSuccess.querySelector('.modal__win');
	var modalSuccess_open = document.querySelectorAll('.open_success');
	var modalSuccess_close = document.querySelectorAll('.close_success');

	// modal review add ============

	var modalReview = document.querySelector('.modalReview');
	if (modalReview) {
		var modalLogin_inner = modalReview.querySelector('.modal__win');
		var modalReview_inner = modalReview.querySelector('.modal__win');
	}

	var modalReview_open = document.querySelectorAll('.open_review');
	var modalReview_close = document.querySelectorAll('.close_review');

	// search ============

	var search = document.querySelector('.search');
	var modalSearch_open = document.querySelectorAll('.open_search');

	if (search) {
		for (var i=0;i<modalSearch_open.length;i++) { // открыть поиск
			modalSearch_open[i].addEventListener('click', function(){
				search.classList.toggle('search--open');
			});
		}
	}



	if (modalCart) {
		var review_open = document.querySelector('.open_review.reviews__add');
		var review_auth = document.querySelector('.open_auth.reviews__add');

		document.onclick = function(e){
			if ( !modalCart_open[0].contains(e.target) && !modalCart_inner.contains(e.target) ) { // закрытие дропдауна корзины
				modalCart.classList.remove('modalCart--open','modal--open');
				if (checkModal(modals)) {
					setTimeout(enableScroll, 400);
				}
			}
			if ( !modalWish_open[0].contains(e.target) && !modalWish_inner.contains(e.target) ) { // закрытие дропдауна избранное
				modalWish.classList.remove('modalWish--open','modal--open');
				if (checkModal(modals)) {
					setTimeout(enableScroll, 400);
				}
			}
			if ( !modalSearch_open[0].contains(e.target) && !search.contains(e.target) ) { // закрытие поиска
				search.classList.remove('search--open');
				if (checkModal(modals)) {
					setTimeout(enableScroll, 400);
				}
			}

	};
}


	function modal($modal,$open,$close,$class,$others) { // открытие/закрытие модальных окон
		if ($modal) {

			for (var i=0;i<$open.length;i++) {
				$open[i].addEventListener('click', function(){
					for (var i=0;i<$others.length;i++) {
						if ($others[i] != $modal) {
							$others[i].classList.remove('modal--open');
						}
						
					}
					$modal.classList.add($class,'modal--open');
					setTimeout(disableScroll, 1);
				});
			}

			for (var i=0;i<$close.length;i++) {
				$close[i].addEventListener('click', function(){
					$modal.classList.remove($class,'modal--open');
					setTimeout(enableScroll, 400);
				});
			}
		}
	}

	var modals = [modalCart,modalWish,modalLogin,modalRegister,modalForgot,modalChange,modalSuccess];

	if (checkout) {
		var modals = [modalLogin,modalRegister,modalForgot,modalChange,modalSuccess];
	}
	if (modalReview) {
		var modals = [modalCart,modalWish,modalLogin,modalRegister,modalForgot,modalChange,modalSuccess,modalReview];
	}


	modal(modalCart,modalCart_open,modalCart_close,'modalCart--open',modals);
	modal(modalWish,modalWish_open,modalWish_close,'modalWish--open',modals);
	modal(modalLogin,modalLogin_open,modalLogin_close,'modalLogin--open',modals);
	modal(modalRegister,modalRegister_open,modalRegister_close,'modalRegister--open',modals);
	modal(modalForgot,modalForgot_open,modalForgot_close,'modalForgot--open',modals);
	modal(modalChange,modalChange_open,modalChange_close,'modalChange--open',modals);
	modal(modalSuccess,modalSuccess_open,modalSuccess_close,'modalLogin--open',modals);
	modal(modalReview,modalReview_open,modalReview_close,'modalReview--open',modals);





	// mobile tools ============

	var open_menu = document.querySelectorAll('.open_menu');
	var mob_menu = document.querySelector('.header__innerWrap');
	var open_child = $('.submenu__title');
	var open_cat = $('.header__menu > ul > li.has_child');
	var submenu = $('.submenu');

	for (var i=0;i<open_menu.length;i++) { // открыть моб меню
		open_menu[i].addEventListener('click', function(){
			this.classList.toggle('header__burger--open');
			mob_menu.classList.toggle('header__innerWrap--open');
		});
	}

	open_child.on('click', function(e){ // открыть подменю
		e.stopPropagation();
		$(this).next().slideToggle();
	});
	open_cat.on('click', function(e){ // открыть подменю
		//e.stopPropagation();
		$(this).find('.submenu').slideToggle();
	});
	submenu.on('click', function(e){
		e.stopPropagation();
	});




	// main page ============

	$('.brands .brands__list').slick({
		dots: true,
		infinite: false,
		speed: 300,
		arrows: false,
		autoplay: true,
		speed: 200,
		pauseOnHover: false,
		slidesToShow: 7,
		slidesToScroll: 1,
		responsive: [
		{
			breakpoint: 1400,
			settings: {
				slidesToShow: 6,
			}
		},
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 2,
			}
		}
		]
	});

	

	// category page ============

	

	var slideshow = document.querySelector('.slideshow');
	var category = document.querySelector('.category');
	var filter = document.querySelector('.filter');
	var filter_btn_showAll = document.querySelectorAll('.filter__all');
	var open_filter = document.querySelectorAll('.open_filter');
	var open_sort = document.querySelectorAll('.open_sort');
	var cat_sort = document.querySelector('.category__sort');

	if (slideshow) {
		$('.slideshow').slick({
			dots: true,
			infinite: false,
			fade: true,
			speed: 300,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1
		});
	}


	if (category) {

		for(var i=0;i<filter_btn_showAll.length;i++) {
		filter_btn_showAll[i].addEventListener('click', function(e){ // открыть остальные пункты
			var others = this.parentNode.querySelectorAll('.filter__row--more')
			for(var i=0;i<others.length;i++) {
				others[i].classList.toggle('filter__row--open');
			}
		});

		for(var i=0;i<open_filter.length;i++) {
			open_filter[i].addEventListener('click', function(e){ // открыть фильтр на моб
				filter.classList.toggle('filter--open');
				this.classList.toggle('filterMob--active');
			});
		}
		for(var i=0;i<open_sort.length;i++) { // открыть сортировку на моб
			open_sort[i].addEventListener('click', function(e){
				this.classList.toggle('open_sort--open');
				cat_sort.classList.toggle('category__sort--open');
			});
		}

		

	}

	

	if (filter) {

		// range фильтр на странице категории
		$(function () { 
			var min_val = $("input#priceMin").data('min');
			var max_val = $("input#priceMax").data('max');
			$("#filter__range").slider({
				min: min_val,
				max: max_val,
				values: [min_val,max_val],
				range: true,
				stop: function(event, ui) {
					$("input#priceMin").val($("#filter__range").slider("values",0));
					$("input#priceMax").val($("#filter__range").slider("values",1));

					$('.price-range-min.value').html($("#filter__range").slider("values",0));
					$('.price-range-max.value').html($("#filter__range").slider("values",1));
				},
				slide: function(event, ui){
					$("input#priceMin").val($("#filter__range").slider("values",0));
					$("input#priceMax").val($("#filter__range").slider("values",1));

					$('.price-range-min.value').html($("#filter__range").slider("values",0));
					$('.price-range-max.value').html($("#filter__range").slider("values",1));
				}
			});

			$("input#priceMin").on('change', function(){
				var value1=$("input#priceMin").val();
				var value2=$("input#priceMax").val();
				if(parseInt(value1) > parseInt(value2)){
					value1 = value2;
					$("input#priceMin").val(value1);
					$('.price-range-min.value').html(value1);
				}
				$("#filter__range").slider("values", 0, value1);
				$('.price-range-min.value').html(value1);
			});

			$("input#priceMax").on('change', function(){
				var value1=$("input#priceMin").val();
				var value2=$("input#priceMax").val();
				if (value2 > max_val) { 
					value2 = max_val; 
					$("input#priceMax").val(max_val)
				}
				if(parseInt(value1) > parseInt(value2)){
					value2 = value1;
					$("input#priceMax").val(value2);
					$('.price-range-max.value').html(value2);
				}
				$("#filter__range").slider("values",1,value2);
				$('.price-range-max.value').html(value2);
			});

			$('.ui-slider-handle:eq(0)').append('<span class="price-range-min value">' + $('#filter__range').slider('values', 0 ) + '</span>');
			$('.ui-slider-handle:eq(1)').append('<span class="price-range-max value">' + $('#filter__range').slider('values', 1 ) + '</span>');
		});
	}


}

	// product page ============

	var product = document.querySelector('.product');

	if (product) {

		$('.productImages__thumbs').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			//asNavFor: '.productImages__nav',

		});
		$('.productImages__nav').slick({
			slidesToShow: 5,
			slidesToScroll: 2,
			vertical: true,
			verticalSwiping: true,
			asNavFor: '.productImages__thumbs',
			dots: false,
			arrows: false,
			focusOnSelect: false,
			infinite: true,
			centerMode: false,
			responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					vertical: false,
					verticalSwiping: false,
					slidesToShow: 3,
				}
			}
			]
		});

		$('.productImages__nav .slick-slide').on('click', function (event) {
			$('.productImages__thumbs').slick('slickGoTo', $(this).data('slickIndex'));
		});

		$('.productTabs__pick').on('click', function(){
			var pick = $(this).data('tab');
			$(this).siblings().removeClass('productTabs__pick--active');
			$(this).addClass('productTabs__pick--active');
			$('.productTabs__tab').each(function(){
				if ( $(this).data('tab') == pick ) {
					$(this).siblings().removeClass('productTabs__tab--active');
					$(this).addClass('productTabs__tab--active');
				}
			});
		});


		(function($){var types=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks;}}
			$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false);}}else{this.onmousewheel=handler;}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false);}}else{this.onmousewheel=null;}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120;}
			if(orgEvent.detail){delta=-orgEvent.detail/3;}
			deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta;}
			if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120;}
			if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120;}
			args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args);}})(jQuery);

			var scroll_elem = $('.productTabs__content.scroll');

			$('.productTabs__content.scroll').mousewheel(function(e, delta) {
				e.preventDefault();
				e.stopPropagation();
				for (var i=0;i<scroll_elem.length;i++) {
					$('.productTabs__content.scroll')[i].scrollLeft -= (delta * 40);
				}
			});



	}



	// checkout =========================================

	var checkout_login_nav = document.querySelector('.checkoutCustomer__nav');
	


	if (checkout) {

		var customer;
		var delivery;
		var payment;

		var customer_step = $('.checkoutCustomer');
		var delivery_step = $('.checkoutDelivery');
		var payment_step = $('.checkoutPayment');

		var customer_next = $('#customer_complete');
		var delivery_next = $('#delivery_complete');
		var checkout_order = $('#checkout_order');
		var checkout_form = $('#checkout_form');

		var checkout_step_back = $('.checkout__change');

		$('.checkoutDelivery__cities span').on('click', function(){
			$('input[name=city]').val($(this).text());
		});
		$('.checkoutPayment .dropdown li span').on('click', function(){
			$('input[name=credit_program]').val($(this).text());
			$('.checkoutPayment .dropdown__title span').text($(this).text());
			$('.checkoutPayment .dropdown').removeClass('dropdown--open');
			$('.checkoutPayment .dropdown__title img').replaceWith($(this).prev().clone());
		});
		$('#checkout_pass_pass').on('click', function(){
			if ($('.checkout__row--pass').hasClass('checkout__row--passport--required')) {
				$('.checkout__row--pass input').addClass('checkout__required');
			}
			$('.checkout__row--idCard input').removeClass('checkout__required');			
		});
		$('#checkout_pass_id').on('click', function(){
			if ($('.checkout__row--idCard').hasClass('checkout__row--passport--required')) {
				
				$('.checkout__row--idCard input').addClass('checkout__required');
			}
			$('.checkout__row--pass input').removeClass('checkout__required');

			
			
		});

		function validateCheckout($btn, $picker, $cur_step, $next_step, $last) { // валидация оформления заказа

			if ($last === undefined) { // es5 fix
				$last = false;
			}

			$btn.on('click', function(e){
				e.preventDefault();
				var step_values = $cur_step.find('.checkout__required');
				var step_inputs = $cur_step.find('.checkout__required');

				$picker = null; // определяет разрешение на отправку заказа
				

				if ($btn == customer_next) {
					var step_inputs = $cur_step.find('.checkoutCustomer__input');
					var counter = 0;
					var info = [];
					step_inputs.each(function(){
						info[counter] = $(this).val();
						counter++;
					});
				} else if ($btn == delivery_next) {
					var info = [];
					info[0] = $cur_step.find('.checkoutDelivery__city').val();
					info[1] = $cur_step.find('input[name=delivery_type]:checked').val();
					if ($cur_step.find('input[name=delivery_type]:checked').attr('id') == 'delivery_sam') {
						info[2] = $cur_step.find('input[name=delivery_type]:checked ~ .field input:checked').val();
					} else {
						info[2] = $cur_step.find('input[name=delivery_type]:checked ~ input').val();
					}
					
				} else if ($btn == checkout_order) {
					$picker = false;
					var pay_types = $cur_step.find('input[name=payment_type]');
					pay_types.each(function(){
						if ($(this).is(':checked')) {
							$picker = true;
						} else {
							if ($picker != true) {
								$picker = false;
							}
						}
					});
				}

				// если выбран способ доставки - самовывоз, валидация выбора магазина
				if ($cur_step.find('input[name=delivery_type]:checked').attr('id') == 'delivery_sam') { 
					var store = $cur_step.find('input[name=delivery_type]:checked ~ .field input:checked').val();
					if (store) {
						if ($picker != false) {
							$picker = true;
							$cur_step.find('input[name=delivery_type]:checked ~ .field label').removeClass('input--err');
							$cur_step.find('input[name=delivery_type]:checked ~ .field label').addClass('input--ok');							
						}
					} else {
						$picker = false;
						$cur_step.find('input[name=delivery_type]:checked ~ .field label').removeClass('input--ok');
						$cur_step.find('input[name=delivery_type]:checked ~ .field label').addClass('input--err');
					}
				}


				// если имеются обязательные поля с классом required, проверка на заполнение
				if (step_values.length != 0) { 
					step_values.each(function(){

						if ($(this).closest('.checkout__hasFields').length != 0 ) {

							if ($(this).closest('.checkout__hasFields').children('input[type=radio]').is(':checked')) {
								if ( $(this).val() == '' ) {
									$(this).removeClass('input--ok');
									$(this).addClass('input--err');
									$picker = false;
								} else {
									$(this).removeClass('input--err');
									$(this).addClass('input--ok');
									if ($picker != false) {
										$picker = true;
									}
								}
							} else {
								if ($picker != false) {
									$picker = true;
								}
							}	

						} else {
							if ( $(this).val() == '' ) {
								$(this).removeClass('input--ok');
								$(this).addClass('input--err');
								$picker = false;
							} else {
								$(this).removeClass('input--err');
								$(this).addClass('input--ok');
								if ($picker != false) {
									$picker = true;
								}
							}
						}
					});

					
				// обязательные поля отсутствуют - разрешение на подтверждение заказа
			} else { 
				if ($picker != false) {
					$picker = true;
				}
			}



			if (!$last) {
				$cur_step.find('.checkout__completed span').remove();

				for (var i=0;i<info.length;i++) {
					if (info[i] != '') {
						$cur_step.find('.checkout__completed').append("<span>"+info[i]+"</span>");
					}				
				}
			}

			if ($picker) {
				$cur_step.attr('data-complete', '1');
				$cur_step.find('.checkout__inner').slideUp(300)
				$cur_step.removeClass('checkout__step--active');
				setTimeout(function(){
					$cur_step.addClass('checkout__step--completed');
					if ($next_step) {
						if (!$next_step.hasClass('checkout__step--completed')) {								
							$next_step.find('.checkout__inner').slideDown(300)
							$next_step.addClass('checkout__step--active');
						} else {								
							$next_step.next().find('.checkout__inner').slideDown(300)
							$next_step.next().addClass('checkout__step--active');
						}

						if ($next_step == payment_step) {
							setTimeout(function(){
								$('.checkoutFrom').slideDown(300);
							}, 500);
						}

					}						
				}, 500);
			} else {
				$cur_step.attr('data-complete', '0');
			}


				// если последний шаг - проверка статуса валидности всех шагов, отправка заказа
				if ($last) {
					var customer_status = Boolean(parseInt(customer_step.attr('data-complete')));
					var delivery_status = Boolean(parseInt(delivery_step.attr('data-complete')));
					var payment_status = Boolean(parseInt(payment_step.attr('data-complete')));

					if (customer_status && delivery_status && payment_status) {
						alert('success');
						var checkout_data = checkout_form.serialize(); // собранные данные
						console.log(checkout_data);
						//checkout_form.submit();						
					} else {
						alert('Заполнены не все данные!');
					}
				}
			});

}

		validateCheckout(customer_next, customer, customer_step, delivery_step); // шаг контактных данных
		validateCheckout(delivery_next, delivery, delivery_step, payment_step); // шаг доставки
		validateCheckout(checkout_order, payment, payment_step, false, true); // последний шаг оплата - отправка заказа


		// вернуться к редактированию прошлых шагов
		checkout_step_back.on('click', function(){
			var current_step = $(this).closest('.checkout__step');

			if (current_step.hasClass('checkoutDelivery')) {
				customer_step.find('.checkout__inner').slideUp(300);
				customer_step.addClass('checkout__step--completed');
				customer_step.removeClass('checkout__step--active');
			}

			var other_step = current_step.siblings();
			other_step.find('.checkout__inner').slideUp(300)
			other_step.removeClass('checkout__step--active');
			setTimeout(function(){
				current_step.find('.checkout__inner').slideDown(300);
				current_step.removeClass('checkout__step--completed');
				current_step.addClass('checkout__step--active');
			}, 500);
		});




		// если пользователь авторизован - пропустить первый шаг, предполагается что с бека уже будут подтянуты значения в поля
		if (checkout_form.hasClass('checkout__authorized')) {

			var step_inputs = customer_step.find('.checkoutCustomer__input');
			var counter = 0;
			var info = [];
			step_inputs.each(function(){
				info[counter] = $(this).val();
				counter++;
			});

			customer_step.find('.checkout__completed span').remove();

			for (var i=0;i<info.length;i++) {
				if (info[i] != '') {
					customer_step.find('.checkout__completed').append("<span>"+info[i]+"</span>");
				}				
			}

			customer_step.attr('data-complete', '1');
			customer_step.find('.checkout__inner').slideUp(300)
			customer_step.removeClass('checkout__step--active');
			setTimeout(function(){
				customer_step.addClass('checkout__step--completed');
				delivery_step.find('.checkout__inner').slideDown(300)
				delivery_step.addClass('checkout__step--active');

				customer_next.trigger('click'); // валидировать поля подтянуты автоматически		
			}, 500);

		}

		$('.checkout__back').on('click', function(e){
			e.preventDefault();
			history.back();
		});
		
	}


	// account =========================================


	var tab_changer = $('.accountNav__btn');
	var open_order_detail = $('.open_order_detail');
	var close_order_detail = $('.close_order_detail');
	var account = $('.account');
	var blog = $('.blog');
	

	if (account.length > 0) {


		tab_changer.on('click', function(){ // переключатель табов и кнопок навигации
			var offsetContainer = $('.accountNav').offset().left;
			var offsetBtn = $(this).offset().left - offsetContainer;
			var data_nav = $(this).data('nav');
			var changer_width = $(this).width();

			$('.accountNav__line').css({
				'left': offsetBtn,
				'width': changer_width
			});

			$(this).parent().siblings().find('.accountNav__btn').removeClass('accountNav__btn--active');
			$(this).addClass('accountNav__btn--active');

			$('.accountTabs__tab').each(function(){
				var $this = $(this);
				if ( $(this).data('nav') == data_nav ) {
					
					// $(this).siblings().removeClass('accountTabs__tab--active');
					// setTimeout(function(){
					//  	$this.addClass('accountTabs__tab--active');
					// }, 400);					
					$(this).siblings().fadeOut(200);
					setTimeout(function(){
						$this.fadeIn(200);
					}, 200);
				}
			});

			if ($(this).data('nav') == 'discount') {
				setTimeout(function(){
					$('.accountDiscProgress').addClass('accountDiscProgress--visited');
				}, 3000);
			}

		});

		$('.accountPet__addPhoto').on('click', function(){
			$('.accountPet__file').trigger('click');
			$('.accountPet__file').on('change', function(){
				$('.accountPet__loaded').text('');
				$('.accountPet__loaded').text( $(this).val() );
			});
		});

		open_order_detail.on('click', function(){
			var order_item = $(this).closest('.accountWish__item');

			var order_detail = order_item.find('.accountHistory__hidden');
			var order_quant = order_item.find('.accountHistory__visible');
			var order_tools = order_item.find('.accountHistory__toolsHidden');
			var order_open = order_item.find('.accountHistory__open');
			var order_close = order_item.find('.accountHistory__close');


			order_item.addClass('accountHistory__item--click');

			setTimeout(function(){
				order_item.removeClass('accountHistory__item--click');
			}, 600);

			setTimeout(function(){
				order_detail.slideToggle(200);
				order_quant.slideToggle(200);
				order_tools.slideToggle(200);
				order_open.slideToggle(200);
				order_close.slideToggle(200);
			}, 400);

		});

		close_order_detail.on('click', function(){
			var order_item = $(this).closest('.accountWish__item');

			var order_detail = $(this).closest('.accountWish__item').find('.accountHistory__hidden');
			var order_quant = $(this).closest('.accountWish__item').find('.accountHistory__visible');
			var order_tools = $(this).closest('.accountWish__item').find('.accountHistory__toolsHidden');
			var order_open = $(this).closest('.accountWish__item').find('.accountHistory__open');
			var order_close = $(this).closest('.accountWish__item').find('.accountHistory__close');

			order_item.addClass('accountHistory__item--click');

			setTimeout(function(){
				order_item.removeClass('accountHistory__item--click');
			}, 600);

			setTimeout(function(){
				order_detail.slideToggle(200);
				order_quant.slideToggle(200);
				order_tools.slideToggle(200);
				order_open.slideToggle(200);
				order_close.slideToggle(200);
			}, 400);

		});

		$('.accountNav ul').slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			variableWidth: true,
			infinite: false,
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					variableWidth: false,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 650,
				settings: {
					slidesToShow: 2,
				}
			},
			]
		});
	}

	if (account.length > 0 || blog.length > 0) {
		for(var i=0;i<open_sort.length;i++) { // открыть сортировку на моб
			open_sort[i].addEventListener('click', function(e){
				this.classList.toggle('open_sort--open');
				this.parentNode.querySelector('.accountWish__sortList').classList.toggle('category__sort--open');
				$('body').toggleClass('shadow');
			});
		}
	}






	// partners =========================================
	var partners = document.querySelector('.partners');


	if (partners) {
		$('.partners__add').on('click', function(){
			$('.partners__file').trigger('click');
			$('.partners__file').on('change', function(){
				$('.partners__path').text('');
				$('.partners__path').text( $(this).val() );
			});
		});
	}
	

	

	









	
}