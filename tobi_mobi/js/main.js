window.onload = function () {


	
	// basic =======================================

	var open_dropdown = document.querySelectorAll('.dropdown__title');
	var open_seo = document.querySelectorAll('.seo__readAll');

	if (open_seo) {
		for(var i=0;i<open_seo.length;i++) {
		open_seo[i].addEventListener('click', function(e){ // развернуть блок сео текста
			e.preventDefault();
			var seo = this.parentNode.querySelector('.seo__inner');
			seo.classList.toggle('seo__inner--closed');
			seo.classList.toggle('seo__inner--opened');
		});
	}
}



if (open_dropdown) {
	for(var i=0;i<open_dropdown.length;i++) {
		open_dropdown[i].addEventListener('click', function(e){ // развернуть дропдаун
			e.preventDefault();
			var list = this.parentNode;
			list.classList.toggle('dropdown--open');
			console.log(1);
		});
	}
}



	// header ======================================


	var header_area = document.querySelector('.header');
	var mob_to_open = document.querySelectorAll('.mobile_menu_open');
	var mob_to_close = document.querySelectorAll('.mobile_menu_close');
	var mob_menu = document.querySelector('.mobMenu');
	var top_menu_btn = document.querySelector('.topCatalog__btn');
	var top_menu_items = document.querySelectorAll('.topCatalogMenu__hasChild');
	var top_menu_list = document.querySelector('.topCatalogMenu ul');
	var cart_link = document.querySelector('.headerCart__link');
	var cart_link_mobile = document.querySelector('.headerCart__linkMobile');
	var cart_items = document.querySelector('.headerCart__itemsWrap--cart');
	var wish_link = document.querySelector('.headerWish__link');
	var wish_linkMobile = document.querySelector('.headerWish__linkMobile');
	var wish_items = document.querySelector('.headerCart__itemsWrap--wish');
	var comp_link = document.querySelector('.headerComp__link');
	var comp_link_mobile = document.querySelector('.headerComp__linkMobile');
	var comp_items = document.querySelector('.headerCart__itemsWrap--comp');
	var modal_cart = document.querySelector('#modal_cart');
	var open_modal_cart = document.querySelectorAll('.open_modal_cart');
	var close_modal_cart = document.querySelectorAll('.close_modal_cart');
	var open_cat = document.querySelectorAll('.open_catalog');
	var close_cat = document.querySelectorAll('.close_catalog');
	var catalog = document.querySelector('.topCatalog');
	var open_cat_child = document.querySelectorAll('.open_catalog_child');
	var open_child_child = document.querySelectorAll('.open_child_child');


	if (header_area) {

		for (var i=0;i<mob_to_open.length;i++) {
			mob_to_open[i].addEventListener('click', function(e){ // открытие мобильного меню
				e.preventDefault();
				catalog.classList.remove('topCatalog--open');	
				mob_menu.classList.toggle('mobMenu--open');
			});
		}

		for (var i=0;i<mob_to_close.length;i++) {
			mob_to_close[i].addEventListener('click', function(e){ // закрытие мобильного меню
				e.preventDefault();
				mob_menu.classList.remove('mobMenu--open');
			});
		}

	for(var i=0;i<top_menu_items.length;i++) { // смена визуала рамки меню первого уровня по наведеню на подпункты
		top_menu_items[i].addEventListener('mouseenter', function(){
			top_menu_list.classList.add('hovered');
		});
		top_menu_items[i].addEventListener('mouseleave', function(){
			top_menu_list.classList.remove('hovered');
		});
	}

	cart_link.addEventListener('click', function(e){ // отрыть дропдаун корзины
		e.preventDefault();
		wish_items.classList.remove('headerCart__itemsWrap--open');
		cart_items.classList.toggle('headerCart__itemsWrap--open');
		comp_items.classList.remove('headerCart__itemsWrap--open');
		modal_cart.classList.add('modalCart--open');
		header_area.classList.add('header--active');
	});

	wish_link.addEventListener('click', function(e){ // отрыть дропдаун избранного

		if (!wish_linkMobile.contains(e.target)) { 
		// если мобильная версия то отменяем запрет на переход по ссылке и отправляем пользователя на страницу избранного
		e.preventDefault();
	}
	cart_items.classList.remove('headerCart__itemsWrap--open');
	wish_items.classList.toggle('headerCart__itemsWrap--open');
	comp_items.classList.remove('headerCart__itemsWrap--open');
	if (header_area.classList != 'header--active') {
		header_area.classList.add('header--active');
	}		
});

	comp_link.addEventListener('click', function(e){ // отрыть дропдаун сравнения	

		if (!comp_link_mobile.contains(e.target)) { 
		// если мобильная версия то отменяем запрет на переход по ссылке и отправляем пользователя на страницу сравнения
		e.preventDefault();
	}
	cart_items.classList.remove('headerCart__itemsWrap--open');
	wish_items.classList.remove('headerCart__itemsWrap--open');
	comp_items.classList.toggle('headerCart__itemsWrap--open');
	if (header_area.classList != 'header--active') {
		header_area.classList.add('header--active');
	}
});

	top_menu_btn.addEventListener('mouseenter', function(){ // по наведению на кнопку каталога - скрыть дропдауны корзины, избранного, сравнения
		cart_items.classList.remove('headerCart__itemsWrap--open');
		wish_items.classList.remove('headerCart__itemsWrap--open');
		comp_items.classList.remove('headerCart__itemsWrap--open');
		header_area.classList.remove('header--active');
	});

	document.onclick = function(e){ // закрытие блоков по клику вне них
		if ( !cart_link.contains(e.target) && !cart_items.contains(e.target) ) { // закрытие дропдауна корзины
			cart_items.classList.remove('headerCart__itemsWrap--open');
		};
		if ( !wish_link.contains(e.target) && !wish_items.contains(e.target) ) { // закрытие дропдауна избранного
			wish_items.classList.remove('headerCart__itemsWrap--open');
		};
		if ( !comp_link.contains(e.target) && !comp_items.contains(e.target) ) { // закрытие дропдауна сравнения
			comp_items.classList.remove('headerCart__itemsWrap--open');
		};
		if ( !modal_cart.querySelector('.modal__win').contains(e.target) && !cart_items.contains(e.target) && !cart_link_mobile.contains(e.target) ) { // закрытие popupа корзины
			modal_cart.classList.remove('modal--open', 'modalCart--open');
		};
	};

	for(var i=0;i<open_modal_cart.length;i++) {
		open_modal_cart[i].addEventListener('click', function(e){ // отрыть pop up корзины
			e.preventDefault();
			cart_items.classList.remove('headerCart__itemsWrap--open');
			modal_cart.classList.add('modal--open', 'modalCart--open');
			header_area.classList.remove('header--active');
		});
	}

	for(var i=0;i<close_modal_cart.length;i++) {
		close_modal_cart[i].addEventListener('click', function(e){ // закрыть pop up корзины
			e.preventDefault();
			modal_cart.classList.remove('modal--open', 'modalCart--open')
		});
	}

	cart_link_mobile.addEventListener('click', function(e){ // отрыть дропдаун сравнения
		e.preventDefault();
		e.stopPropagation();
		modal_cart.classList.add('modalCart--open');
		header_area.classList.remove('header--active');
	});

	// добавление кол-ва товара
	var minus = document.querySelectorAll('.minus');
	var plus = document.querySelectorAll('.plus');
	var quantly_in = document.querySelectorAll('.quantly input[name=quantly]');
	var quantly; // тут будет количество
	var quantly_step; // тут будет шаг

	for(var i=0;i<minus.length;i++) {
		minus[i].addEventListener('click', function(e){
			quantly = parseFloat(this.parentNode.querySelector('input').value);
			quantly_step = parseFloat(this.parentNode.querySelector('input').getAttribute('data-step'));
			if (quantly > quantly_step) {
				this.parentNode.querySelector('input').value = quantly - quantly_step;
			}
		});
	}

	for(var i=0;i<plus.length;i++) {
		plus[i].addEventListener('click', function(e){
			quantly = parseFloat(this.parentNode.querySelector('input').value);
			quantly_step = parseFloat(this.parentNode.querySelector('input').getAttribute('data-step'));
			this.parentNode.querySelector('input').value = quantly + quantly_step;		
		});
	}


	for(var i=0;i<open_cat.length;i++) {
		open_cat[i].addEventListener('click', function(e){ // открыть каталог
			e.preventDefault();
			header_area.classList.remove('header--active');
			mob_menu.classList.remove('mobMenu--open');
			
			document.querySelector('.top').classList.add('top--show');
			setTimeout(function(){
				catalog.classList.add('topCatalog--open');
			}, 10);
		});
	}

	for(var i=0;i<close_cat.length;i++) {
		close_cat[i].addEventListener('click', function(e){ // закрыть каталог
			e.preventDefault();
			catalog.classList.remove('topCatalog--open');			
			setTimeout(function(){
				document.querySelector('.top').classList.remove('top--show');
			}, 200);

		});
	}

	for(var i=0;i<open_cat_child.length;i++) {
		open_cat_child[i].addEventListener('click', function(e){ // открыть меню 2 уровня
			e.preventDefault();
			var parent = this.parentNode.parentNode;
			this.classList.toggle('topCatalogMenu__arr--open');
			parent.querySelector('.topCatalogChild').classList.toggle('topCatalogChild--open');
		});
	}

	for(var i=0;i<open_child_child.length;i++) {
		open_child_child[i].addEventListener('click', function(e){ // открыть меню 3 уровня
			e.preventDefault();
			var parent = this.parentNode;
			this.classList.toggle('topCatalogMenu__arr--open');
			parent.querySelector('.topCatalogChild__list').classList.toggle('topCatalogChild__list--open');
		});
	}
}



	// main page =============================================


	var main = document.querySelector('.mainPage');

	if (main) {
		$('.mainSlider__inner').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 4000,
			speed: 700,
			dots: true,
			pauseOnHover: false,
			responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false,
				}
			}
			]
		});

		$('.mainSlider .slick-dots li button').html( $('.progressCircle').clone() );




		$('.related .related__prods').slick({
			infinite: false,
			slidesToShow: 6,
			slidesToScroll: 1,
			variableWidth: true,
			autoplay: true,
			prevArrow: $('.related__left'),
			nextArrow: $('.related__right'),
			responsive: [
			{
				breakpoint: 1750,
				settings: {
					slidesToShow: 6,
					variableWidth: false,
				}
			},
			{
				breakpoint: 1460,
				settings: {
					slidesToShow: 5,
					variableWidth: false,
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					variableWidth: false,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					variableWidth: false,
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 2,
					variableWidth: false,
				}
			}
			]
		});

		$('.brands__items').slick({
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			autoplay: true,
			responsive: [
			{
				breakpoint: 1750,
				settings: {
					slidesToShow: 5,
					variableWidth: false,
				}
			},
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
					variableWidth: false,
				}
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 3,
					variableWidth: false,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					variableWidth: false,
				}
			}
			]
		});
	}



	// category page =========================


	var category = document.querySelector('.category');
	var get_grid = document.querySelectorAll('.en_grid');
	var get_list = document.querySelectorAll('.en_list');
	var get_products = document.querySelector('.products');
	var filter_btn = document.querySelectorAll('.filter__title');
	var filter_btn_showAll = document.querySelectorAll('.filter__all');
	var category = document.querySelector('.category');

	var filter_open = document.querySelectorAll('.category__filterOpen');
	var filter_close = document.querySelectorAll('.category__filterClose');
	var filter = document.querySelector('.filter');


	if (category) {

		for(var i=0;i<get_grid.length;i++) {
		get_grid[i].addEventListener('click', function(e){ // вид превью товара - сетка
			get_products.classList.remove('products--list');
			if (get_products.classList != 'products--grid') {
				get_products.classList.add('products--grid');
			}
		});
	}

	for(var i=0;i<get_list.length;i++) {
		get_list[i].addEventListener('click', function(e){ // вид превью товара - список
			get_products.classList.remove('products--grid');
			if (get_products.classList != 'products--list') {
				get_products.classList.add('products--list');
			}
		});
	}

	for(var i=0;i<filter_btn.length;i++) {
		filter_btn[i].addEventListener('click', function(e){ // открыть пункт фильтра
			this.parentNode.querySelector('.filter__list').classList.toggle('filter__list--open');
			this.classList.toggle('filter__title--open');
		});
	}

	for(var i=0;i<filter_btn_showAll.length;i++) {
		filter_btn_showAll[i].addEventListener('click', function(e){ // открыть остальные пункты
			var others = this.parentNode.querySelectorAll('.filter__row--more')
			for(var i=0;i<others.length;i++) {
				others[i].classList.toggle('filter__row--open');
			}
		});
	}



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



	for(var i=0;i<filter_open.length;i++) {
		filter_open[i].addEventListener('click', function(e){ // развернуть фильтр
			filter.classList.toggle('filter--open');
		});
	}

	for(var i=0;i<filter_close.length;i++) {
		filter_close[i].addEventListener('click', function(e){ // закрыть фильтр
			filter.classList.remove('filter--open');
		});
	}
}



	// product page ======================================================

	var product = document.querySelector('.product');
	var product_btn_all = document.querySelector('.product__btn--all');
	var product_btn_chars = document.querySelector('.product__btn--chars');
	var product_btn_test = document.querySelector('.product__btn--test');
	var product_btn_quest = document.querySelector('.product__btn--quest');
	var product_btn_related = document.querySelector('.product__btn--related');

	var tab_all = document.querySelector('.product__tab--all');
	var tab_chars = document.querySelector('.product__tab--chars');
	var tab_test = document.querySelector('.product__tab--test');
	var tab_quest = document.querySelector('.product__tab--quest');
	var tab_related = document.querySelector('.product__tab--related');

	var product_desc_btn = document.querySelector('.productDescription__btn');
	var product_desc_cont = document.querySelector('.productDescription__content');

	var product_chars_btn = document.querySelectorAll('.productChars__title');
	var product_related_btn = document.querySelectorAll('.productRelated__title');

	var product_test_rate = document.querySelectorAll('.productTest__rateItem');

	var product_test_add = document.querySelector('.productTest__anc');
	var product_test_area = document.querySelector('#testimonial_add');
	var product_quest_add = document.querySelector('.productQuest__anc');
	var product_quest_area = document.querySelector('#question_add');

	var product_test_btn = $('.productTest__btn');


	if (product)  {
		function productTabs(elem, tab) { // переключатель табов
			elem.addEventListener('click', function(e){
				var btn_sibl = this.parentNode.querySelectorAll('.product__btn');
				var btn_cls = this.classList;
				var tab_sibl = tab.parentNode.querySelectorAll('.product__tab');
				var tab_cls = tab.classList;


				for(var i=0;i<btn_sibl.length;i++) {
					if (btn_sibl[i].classList != btn_cls) {
						btn_sibl[i].classList.remove('product__btn--active');
					} else {
						btn_sibl[i].classList.add('product__btn--active');
					}
				}
				for(var i=0;i<tab_sibl.length;i++) {
					if (tab_sibl[i].classList != tab_cls) {
						tab_sibl[i].classList.remove('product__tab--active');
					} else {
						tab_sibl[i].classList.add('product__tab--active');
					}
					if (elem != product_btn_all) {
						tab_sibl[i].classList.add('product__tab--abs');
						document.querySelector('.product .product__info').classList.add('product__tab--abs');
						document.querySelector('.productWidget').classList.add('product__tab--abs');
					} else {
						tab_sibl[i].classList.remove('product__tab--abs');
						document.querySelector('.product .product__info').classList.remove('product__tab--abs');
						document.querySelector('.productWidget').classList.remove('product__tab--abs');
					}
				}


			});
		}


		productTabs(product_btn_all, tab_all);
		productTabs(product_btn_chars, tab_chars);
		productTabs(product_btn_test, tab_test);
		productTabs(product_btn_quest, tab_quest);
		productTabs(product_btn_related, tab_related);


		$('.product__thumbSlider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.product__thumbNav',

		});
		$('.product__thumbNav').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			vertical: true,
			verticalSwiping: true,
			asNavFor: '.product__thumbSlider',
			dots: false,
			focusOnSelect: true,
			infinite: true,
			responsive: [
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 3,
				}
			}
			]
		});

		$('.products .product__nav').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			variableWidth: true,
			arrows: false,
			infinite: false,
			responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					variableWidth: true,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
					variableWidth: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 5,
					variableWidth: true,
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 3,
					variableWidth: true,
				}
			}
			]
		});


	product_desc_btn.addEventListener('click', function(e){  // развернуть описание в карточке товара
		product_desc_cont.classList.toggle('productDescription__content--open');
	});

	for(var i=0;i<product_chars_btn.length;i++) { // развернуть список характеристик в карточке товара
		product_chars_btn[i].addEventListener('click', function(e){
			var others = this.parentNode.querySelector('.productChars__list');
			this.classList.toggle('productChars__title--open');
			others.classList.toggle('productChars__list--open');
			
		});
	}


	for(var i=0;i<product_test_rate.length;i++) {  // рейтинг в карточке товара
		product_test_rate[i].addEventListener('click', function(e){
			var others = this.parentNode.querySelectorAll('.productTest__rateItem')
			var rate = this.querySelector('input').value;
			document.querySelector('.productTest__rateComment span').innerHTML = rate;
			
			for(var i=0;i<others.length;i++) {
				others[i].classList.remove('productTest__rateItem--active');
			}

			this.classList.add('productTest__rateItem--active');
		});
	}


	product_test_add.addEventListener('click', function(e) { // якорь к форме отзыва в карточке товара
		product_test_area.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});

	product_quest_add.addEventListener('click', function(e) { // якорь к форме вопроса в карточке товара
		product_quest_area.scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});

	$('.productRelated__products').each(function(){
		var $this = $(this);
		var left = $this.prev().find('.related__left');
		var right = $this.prev().find('.related__right');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			prevArrow: left,
			nextArrow: right,
			infinite: false,
			responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 1300,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 840,
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
	});

	product_test_btn.on('click', function(e){ // добавление нового отзыва в карточке
		e.preventDefault();

		var rev_name = $(this).parent().find('input[name=name]');
		var rev_text = $(this).parent().find('textarea[name=text]');
		var rev_rate = $(this).parent().find('input[name=rating]');
		var rev_form = $(this).parent();
		var rev_success = $(this).parent().parent().find('.modalReview__success');

		var picker_name = null;
		var picker_text = null;
		var picker_rate = null;

		if (rev_name.val() != '') {
			picker_name = true;
			rev_name.removeClass('input--err');
			rev_name.addClass('input--ok');
		} else {
			picker_name = false;
			rev_name.removeClass('input--ok');
			rev_name.addClass('input--err');
		}

		if (rev_text.val() != '') {
			picker_text = true;
			rev_text.removeClass('input--err');
			rev_text.addClass('input--ok');
		} else {
			picker_text = false;
			rev_text.removeClass('input--ok');
			rev_text.addClass('input--err');
		}

		if (rev_rate.length != 0) {
			rev_rate.each(function(){
				if ( $(this).is(':checked') ) {
					picker_rate = true;
					$('.productTest__rateComment').removeClass('productTest__rateComment--err');
					$('.productTest__rateComment').addClass('productTest__rateComment--ok');
				} else {
					if (picker_rate != true) {
						picker_rate = false;
						$('.productTest__rateComment').removeClass('productTest__rateComment--ok');
						$('.productTest__rateComment').addClass('productTest__rateComment--err');;
					}
				}
			});
		} else {
			picker_rate = true;
		}


		

		if (picker_name && picker_text && picker_rate) {
			rev_form.slideToggle(200);
			setTimeout(function(){
				rev_success.slideToggle(200);
			}, 230);
			setTimeout(function(){
				rev_form.submit();
			}, 2000);
		}

	});



	$('.productRelated__title').on('click', function(){ // развернуть блок похожих товаров в карточке товара
		$(this).toggleClass('productRelated__title--open');
		$(this).parent().find('.productRelated__products').slideToggle(300);
		$(this).parent().find('.title__arrows').toggleClass('title__arrows--open');
	});



	var product_h1 = document.querySelector('h1');
	var product_offset_h1 = product_h1.offsetTop;
	var product_nav = document.querySelector('.product__nav');
	var product_offset_nav = product_nav.offsetTop;
	var product_slot = document.querySelector('.product__slot');


		if ($(window).width() < 768) {
			document.addEventListener('scroll', function(){ // по скроллу меняем вид h1 и слайдера навигации
			if (window.pageYOffset >= product_offset_h1 - 0) {
				product.classList.add('product--fixed');
				product_slot.classList.add('product__slot--fixed');
			} else {
				product.classList.remove('product--fixed');
				product_slot.classList.remove('product__slot--fixed');
			}

			if (window.pageYOffset >= product_offset_nav) {
				product_nav.style = "top:"+product_h1.clientHeight+'px';
			} else {
				product_nav.style = "top: 1px";				
			}
		});
		}
	}



	// checkout =========================================

	var checkout = document.querySelector('.checkout');
	var checkout_login_nav = document.querySelector('.checkoutCustomer__nav');
	


	if (checkout) {

		var checkout_promo_enter = document.querySelector('.checkout_promoEnter');
		var checkout_promo_val = checkout_promo_enter.parentNode.querySelector('input[name=promocode]');

		document.onclick = function(e) { // закрытие popupа авторизации при клике вне его
			if ( !modal_login.querySelector('.modal__win').contains(e.target) && !checkout_login_nav.contains(e.target) ) { 
				modal_login.classList.remove('modal--open');
			}
		}

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


		function validate($btn, $picker, $cur_step, $next_step, $last) { // валидация полей с определенным классом
			if ($last === undefined) {
				$last = false;
			}
			$btn.on('click', function(e){
				e.preventDefault();
				var step_values = $cur_step.find('.checkout__required');
				var step_inputs = $cur_step.find('.checkout__required');
				$picker = null;
				

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
					info[2] = $cur_step.find('input[name=delivery_type]:checked ~ input').val();
				}

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
					$cur_step.removeClass('checkout__step--active');
					setTimeout(function(){
						$cur_step.addClass('checkout__step--completed');
						if ($next_step) {
							if (!$next_step.hasClass('checkout__step--completed')) {
								$next_step.addClass('checkout__step--active');
							} else {
								$next_step.next().addClass('checkout__step--active');
							}
							
						}						
					}, 600);
				} else {
					$cur_step.attr('data-complete', '0');
				}

				if ($last) {
					var customer_status = Boolean(parseInt(customer_step.attr('data-complete')));
					var delivery_status = Boolean(parseInt(delivery_step.attr('data-complete')));
					var payment_status = Boolean(parseInt(payment_step.attr('data-complete')));

					if (customer_status && delivery_status && payment_status) {
						alert('success');
						checkout_form.submit();						
					}
				}
			});
			
		}

		validate(customer_next, customer, customer_step, delivery_step);
		validate(delivery_next, delivery, delivery_step, payment_step);
		validate(checkout_order, payment, payment_step, false, true);

		checkout_step_back.on('click', function(){ // проверка прохождения шагов и отправка формы

			var current_step = $(this).closest('.checkout__step');
			var other_step = current_step.siblings();
			other_step.removeClass('checkout__step--active');
			setTimeout(function(){
				current_step.removeClass('checkout__step--completed');
				current_step.addClass('checkout__step--active');
			}, 600);
		});

		checkout_promo_enter.addEventListener('click', function(){
			if (checkout_promo_val.value == '') {
				checkout_promo_val.classList.remove('input--ok');
				checkout_promo_val.classList.add('input--err');
			} else {
				checkout_promo_val.classList.remove('input--err');
				checkout_promo_val.classList.add('input--ok');
				document.querySelector('.checkoutWidgetTools').classList.add('checkoutWidgetTools--completed');			
			}
		});
		
	}









	// account ==========================

	var account = document.querySelector('.account');
	var account_form = document.querySelector('.accountForm form');
	var account_submit = document.querySelector('.accountForm__submit');
	var account_required = document.querySelectorAll('input.account__required');
	var account_picker;
	var account_pass_new = document.querySelector('input[name=pass_new]');
	var account_pass_repeat = document.querySelector('input[name=pass_repeat]');

	if (account_submit) {
		account_submit.addEventListener('click', function(){ // валидация и отправка формы редактирования личных данных
			account_picker = null;

			for(var i=0;i<account_required.length;i++){
				if (account_required[i].value == '') {
					account_required[i].classList.remove('input--ok');
					account_required[i].classList.add('input--err');
					account_picker = false;
				} else {
					account_required[i].classList.add('input--ok');
					account_required[i].classList.remove('input--err');
					if (account_picker != false) {
						account_picker = true;
					}
				}
			}

			if (account_pass_new.value != '' && account_pass_repeat.value != '' && account_pass_new.value == account_pass_repeat.value) {
				account_pass_new.classList.add('input--ok');
				account_pass_new.classList.remove('input--err');
				account_pass_repeat.classList.add('input--ok');
				account_pass_repeat.classList.remove('input--err');
				if (account_picker != false) {
					account_picker = true;
				}
			} else {
				account_pass_new.classList.remove('input--ok');
				account_pass_new.classList.add('input--err');
				account_pass_repeat.classList.remove('input--ok');
				account_pass_repeat.classList.add('input--err');
				account_picker = false;
			}

			if (account_picker) {
				alert('success');
				account_form.submit();
			} else {
				account_form.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	}





	// orders =========================



	var orders = document.querySelector('.orders');

	var orders_btn_all = document.querySelector('.product__btn--all');
	var orders_btn_inwork = document.querySelector('.product__btn--inWork');
	var orders_btn_completed = document.querySelector('.product__btn--completed');
	var orders_btn_pre = document.querySelector('.product__btn--preOrder');
	var orders_btn_canceled = document.querySelector('.product__btn--canceled');

	var tab_all = document.querySelector('.orders__tab--all');
	var tab_inwork = document.querySelector('.orders__tab--inWork');
	var tab_completed = document.querySelector('.orders__tab--completed');
	var tab_pre = document.querySelector('.orders__tab--preOrder');
	var tab_canceled = document.querySelector('.orders__tab--canceled');


	if (orders) {
		var order_open = document.querySelectorAll('.orders__open');

		for(var i=0;i<order_open.length;i++) {  // 
			order_open[i].addEventListener('click', function(e){
				this.classList.toggle('orders__right--open');
				this.parentNode.parentNode.querySelector('.orders__detail').classList.toggle('orders__detail--open');
			});
		}

		function ordersTabs(elem, tab) { // переключатель табов
			elem.addEventListener('click', function(e){
				var btn_sibl = this.parentNode.querySelectorAll('.product__btn');
				var btn_cls = this.classList;
				var tab_sibl = tab.parentNode.querySelectorAll('.orders__tab');
				var tab_cls = tab.classList;

				for(var i=0;i<btn_sibl.length;i++) {
					if (btn_sibl[i].classList != btn_cls) {
						btn_sibl[i].classList.remove('product__btn--active');
					} else {
						btn_sibl[i].classList.add('product__btn--active');
					}
				}
				for(var i=0;i<tab_sibl.length;i++) {
					if (tab_sibl[i].classList != tab_cls) {
						tab_sibl[i].classList.remove('orders__tab--active');
					} else {
						tab_sibl[i].classList.add('orders__tab--active');
					}
				}


			});
		}


		ordersTabs(orders_btn_all, tab_all);
		ordersTabs(orders_btn_inwork, tab_inwork);
		ordersTabs(orders_btn_completed, tab_completed);
		ordersTabs(orders_btn_pre, tab_pre);
		ordersTabs(orders_btn_canceled, tab_canceled);

		$('.orders .product__nav').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			variableWidth: true,
			arrows: false,
			infinite: false,
			responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
					variableWidth: true,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
					variableWidth: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 5,
					variableWidth: true,
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 3,
					variableWidth: true,
				}
			}
			]
		});
	}




	// reviews =========================


	var review = document.querySelector('.reviews');
	var modal_review = document.querySelector('#modal_review');
	var reviews_close = document.querySelectorAll('.close_modal_review');	
	var reviews_open = document.querySelectorAll('.reviews_open');
	var product_test_rate = document.querySelectorAll('.productTest__rateItem');
	var product_test_btn = $('.productTest__btn');

	if (review) {

		for(var i=0;i<reviews_close.length;i++) {
		reviews_close[i].addEventListener('click', function(e){ // закрыть pop up добавления отзывыа
			e.preventDefault();
			modal_review.classList.remove('modal--open', 'modalCart--open');
		});
	}

	for(var i=0;i<reviews_open.length;i++) {
		reviews_open[i].addEventListener('click', function(e){ // открыть pop up добавления отзывыа
			e.preventDefault();
			modal_review.classList.add('modal--open', 'modalCart--open');
		});
	}

	document.onclick = function(e){ // закрытие блоков по клику вне них
		if ( !modal_review.querySelector('.modal__win').contains(e.target) && !reviews_open[0].contains(e.target)  ) { // закрытие popupа добавления отзыва
			modal_review.classList.remove('modal--open', 'modalCart--open');
		};
	};


for(var i=0;i<product_test_rate.length;i++) {  // рейтинг на странице отзывов
	product_test_rate[i].addEventListener('click', function(e){
		var others = this.parentNode.querySelectorAll('.productTest__rateItem')
		var rate = this.querySelector('input').value;
		document.querySelector('.productTest__rateComment span').innerHTML = rate;

		for(var i=0;i<others.length;i++) {
			others[i].classList.remove('productTest__rateItem--active');
		}

		this.classList.add('productTest__rateItem--active');
	});
}




product_test_btn.on('click', function(e){ // добавление нового отзыва на странице отзывов
	e.preventDefault();

	var rev_name = $('input[name=name]');
	var rev_text = $('textarea[name=text]');
	var rev_rate = $('input[name=rating]');
	var rev_form = $('.productTest__form');
	var rev_success = $('.modalReview__success');

	var picker_name = null;
	var picker_text = null;
	var picker_rate = null;

	if (rev_name.val() != '') { // проверка на пустоту поля имени
		picker_name = true;
		rev_name.removeClass('input--err');
		rev_name.addClass('input--ok');
	} else {
		picker_name = false;
		rev_name.removeClass('input--ok');
		rev_name.addClass('input--err');
	}

	if (rev_text.val() != '') {  // проверка на пустоту поля текста
		picker_text = true;
		rev_text.removeClass('input--err');
		rev_text.addClass('input--ok');
	} else {
		picker_text = false;
		rev_text.removeClass('input--ok');
		rev_text.addClass('input--err');
	}


	rev_rate.each(function(){ // валидация кнопок оценки
		if ( $(this).is(':checked') ) {
			picker_rate = true;
			$('.productTest__rateComment').removeClass('productTest__rateComment--err');
			$('.productTest__rateComment').addClass('productTest__rateComment--ok');
		} else {
			if (picker_rate != true) {
				picker_rate = false;
				$('.productTest__rateComment').removeClass('productTest__rateComment--ok');
				$('.productTest__rateComment').addClass('productTest__rateComment--err');;
			}
		}
	});

	if (picker_name && picker_text && picker_rate) { // при успешной валидации отправить форму
		rev_form.slideToggle(200);
		setTimeout(function(){
			rev_success.slideToggle(200);
		}, 230);
		setTimeout(function(){
			rev_form.submit();
		}, 2000);
	}

});

}


	// compare =========================

	var compare = document.querySelector('.compare');


	if (compare) {

		var compare_fixed = document.querySelector('.compare__fixed');
		var compare_inner = document.querySelectorAll('.compareInner');
		var compare_main = document.querySelector('.main');
		var offset = compare_inner[0].offsetTop;


		document.addEventListener('scroll', function(){ // смена отображения и позиционирования превью товаров
			if (window.pageYOffset > offset) {
				compare_fixed.classList.add('compare__fixed--fixed');
				compare_main.classList.add('main--compareFixed');			
			} else {
				compare_fixed.classList.remove('compare__fixed--fixed');
				compare_main.classList.remove('main--compareFixed');
			}
		});

		// колесо мыши
		(function($){var types=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks;}}
			$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false);}}else{this.onmousewheel=handler;}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false);}}else{this.onmousewheel=null;}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120;}
			if(orgEvent.detail){delta=-orgEvent.detail/3;}
			deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta;}
			if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120;}
			if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120;}
			args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args);}})(jQuery);

			var scroll_elem = $('.compare_scroll');

			$('body').mousewheel(function(e, delta) {
				$('body').removeClass('hidden'); // отменяем запрет на скрол страницы
			});
			$('.compare_scroll').mousewheel(function(e, delta) {
				$('body').addClass('hidden'); // запретить скрол страницы при скроле блоков сравнения
				e.preventDefault();
				e.stopPropagation();
				for (var i=0;i<scroll_elem.length;i++) {
					$('.compare_scroll')[i].scrollLeft -= (delta * 40);
				}
			});

			var product_chars_btn = document.querySelectorAll('.productChars__title');
for(var i=0;i<product_chars_btn.length;i++) { // развернуть список характеристик в сравнении

	product_chars_btn[i].addEventListener('click', function(e){
		var others = this.parentNode.querySelector('.productChars__list');
		var char_list = this.parentNode.parentNode.parentNode.querySelector('.compareInner__chars');
		this.classList.toggle('productChars__title--open');
		others.classList.toggle('productChars__list--open');
		char_list.classList.toggle('compareInner__chars--open');

	});


}


$('.main').on('scroll', function (e) {
	$('.compare__fixed--fixed .compare_scroll').scrollLeft($(this).scrollLeft());
	$('.main').scrollLeft($(this).scrollLeft());
	console.log($(this).scrollLeft());
	console.log($('.compare__fixed--fixed .compare_scroll').scrollLeft());
});

$('.main').on('touchstart touchend touchmove mousewheel touchcancel gesturestart gestureend gesturechange orientationchange', function (e) {
	$('.main').trigger('scroll'); 
});

$('body').on('touchmove', '.compare__fixed--fixed .compare_scroll .preview__name, .compare__fixed--fixed .compare_scroll .preview__thumb, .compare__fixed--fixed .compare_scroll .preview__btn, .compare__fixed--fixed .compare_scroll .close_modal_cart', function (e) {
	$(this).css('pointer-events', 'none'); 
});
$('body').on('touchend', '.compare__fixed--fixed .compare_scroll .preview__name, .compare__fixed--fixed .compare_scroll .preview__thumb, .compare__fixed--fixed .compare_scroll .preview__btn, .compare__fixed--fixed .compare_scroll .close_modal_cart', function (e) {
	$(this).css('pointer-events', 'auto'); 
});

var row = $('.compareInner .compareInner__col').width() * $('.compareHeader .preview').length;
var pd = $('.compareInner').width();
var c = pd * 0.1;

if ($(window).width() < 768) {
	$('.compareInner .productChars__item, .main .compare__title').css('width', row);
	$('.compareInner .productChars__title').css('width', $('.compareInner .productChars__title').width() - c);
	$('.compareInner .compareInner__names .productChars__list').css('width', $('.compareInner .productChars__list').width() - c);
}





}




	// авторизация, регистрация, сброс пароля, изменения пароля, успешная регистрация =========================


	var cart_items = document.querySelector('.headerCart__itemsWrap--cart');
	
	var open_modal_login = document.querySelectorAll('.open_modal_login');
	var close_modal_login = document.querySelectorAll('.close_modal_login');
	var modal_login = document.querySelector('#modal_login');

	var open_modal_register = document.querySelectorAll('.open_modal_register');
	var close_modal_register = document.querySelectorAll('.close_modal_register');
	var modal_register = document.querySelector('#modal_register');

	var open_modal_recovery = document.querySelectorAll('.open_modal_recovery');
	var close_modal_recovery = document.querySelectorAll('.close_modal_recovery');
	var modal_recovery = document.querySelector('#modal_recovery');

	var open_modal_change = document.querySelectorAll('.open_modal_change');
	var close_modal_change = document.querySelectorAll('.close_modal_change');
	var modal_change = document.querySelector('#modal_change');

	var open_modal_reg_success = document.querySelectorAll('.open_modal_reg_success');
	var close_modal_reg_success = document.querySelectorAll('.close_modal_reg_success');
	var modal_reg_success = document.querySelector('#modal_reg_success');

	var pass_show = document.querySelectorAll('.modalLogin__showPass');

	for(var i=0;i<pass_show.length;i++) {
		pass_show[i].addEventListener('click', function(e){ // скрыть/показать пароль
			e.preventDefault();
			var check_status = this.parentNode.querySelector('.input').getAttribute('type');
			if (check_status == 'password') {
				this.parentNode.querySelector('.input').setAttribute('type','text');
				this.classList.add('modalLogin__showPass--showed');
			} else {
				this.parentNode.querySelector('.input').setAttribute('type','password');
				this.classList.remove('modalLogin__showPass--showed');
			}					
		});
	}

	// закомментил, можно случайно закрыть окно, неудобно
	// document.onclick = function(e){ // закрытие блоков по клику вне них
	// 	if ( !modal_login.querySelector('.modal__win').contains(e.target) && !open_modal_login[0].contains(e.target) ) { // закрытие popupа авторизации
	// 		modal_login.classList.remove('modal--open');
	// 	};
	// 	if ( !modal_register.querySelector('.modal__win').contains(e.target) && !open_modal_register[0].contains(e.target) ) { // закрытие popupа регистрации
	// 		modal_register.classList.remove('modal--open');
	// 	};
	// 	if ( !modal_recovery.querySelector('.modal__win').contains(e.target) && !open_modal_recovery[0].contains(e.target) ) { // закрытие popupа сброса пароля
	// 		modal_recovery.classList.remove('modal--open');
	// 	};
	// };


	function validateLoginModal($modal, $pass, $register){
		if ($pass === undefined) {
			$pass = false;
		}
		if ($register === undefined) {
			$register = false;
		}
		var sbm = $modal.querySelector('.modalLogin__submit');
		var form = $modal.querySelector('.modalLogin__form');
		var req = sbm.parentNode.querySelectorAll('.modalLogin_required');
		var inp = sbm.parentNode.querySelectorAll('.input');

		sbm.addEventListener('click', function(){
			var picker = null;

			for (var i=0;i<req.length;i++) {
				if (req[i].value == '') {
					req[i].classList.remove('input--ok');
					req[i].classList.add('input--err');
					picker = false;
				} else {
					req[i].classList.remove('input--err');
					req[i].classList.add('input--ok');
					if (picker != false) {
						picker = true;
					}
				}
			}

			if ($pass) {
				var pass_f = $modal.querySelector('input[name=password]');
				var pass_l = $modal.querySelector('input[name=password_repeat]');

				if (pass_f.value != pass_l.value || pass_f.value == '' || pass_l.value == '' ) {
					pass_f.classList.remove('input--ok');
					pass_f.classList.add('input--err');
					pass_l.classList.remove('input--ok');
					pass_l.classList.add('input--err');
					picker = false;
				} else {
					pass_f.classList.add('input--ok');
					pass_f.classList.remove('input--err');
					pass_l.classList.add('input--ok');
					pass_l.classList.remove('input--err');
					if (picker != false) {
						picker = true;
					}
				}
			}

			if (picker) { // успешная валидация - отправка формы (ajax)

				// if success
				if ($register) { // если это форма регистрации то выводим окно успеха

					$modal.classList.remove('modal--open');
					setTimeout(function(){
						modal_reg_success.classList.add('modal--open');
						for (var i=0;i<inp.length;i++) {
							inp[i].value = '';
							inp[i].classList.remove('input--ok');
						}
					}, 200);

				} else {
					form.submit();
				}
				// else
				// do something
				
			}
		});
	}


	// =====

	if (modal_login) {

		validateLoginModal(modal_login);

		for(var i=0;i<open_modal_login.length;i++) {
		open_modal_login[i].addEventListener('click', function(e){ // отрыть pop up авторизации
			e.preventDefault();
			if (cart_items) {
				cart_items.classList.remove('headerCart__itemsWrap--open');
			}

			modal_register.classList.remove('modal--open');
			modal_recovery.classList.remove('modal--open');
			modal_change.classList.remove('modal--open');
			modal_reg_success.classList.remove('modal--open');
			setTimeout(function(){
				modal_login.classList.add('modal--open');
			}, 200);		
			
		});
	} // for

	for(var i=0;i<close_modal_login.length;i++) {
		close_modal_login[i].addEventListener('click', function(e){ // закрыть pop up авторизации
			e.preventDefault();
			modal_login.classList.remove('modal--open')
		});
	}
}

	// =====

	if (modal_register) {

		validateLoginModal(modal_register, true, true);

		for(var i=0;i<open_modal_register.length;i++) {
		open_modal_register[i].addEventListener('click', function(e){ // отрыть pop up регистрации
			e.preventDefault();
			if (cart_items) {
				cart_items.classList.remove('headerCart__itemsWrap--open');
			}
			
			modal_login.classList.remove('modal--open');
			modal_recovery.classList.remove('modal--open');
			modal_change.classList.remove('modal--open');
			modal_reg_success.classList.remove('modal--open');
			setTimeout(function(){
				modal_register.classList.add('modal--open');
			}, 200);
			
		});
	} // for

	for(var i=0;i<close_modal_register.length;i++) {
		close_modal_register[i].addEventListener('click', function(e){ // закрыть pop up регистрации
			e.preventDefault();
			modal_register.classList.remove('modal--open')
		});
	}
}



	// =====
	
	if (modal_recovery) {

		validateLoginModal(modal_recovery);

		for(var i=0;i<open_modal_recovery.length;i++) {
		open_modal_recovery[i].addEventListener('click', function(e){ // отрыть pop up сброса пароля
			e.preventDefault();
			if (cart_items) {
				cart_items.classList.remove('headerCart__itemsWrap--open');
			}

			modal_login.classList.remove('modal--open');
			modal_register.classList.remove('modal--open');
			modal_change.classList.remove('modal--open');
			modal_reg_success.classList.remove('modal--open');
			setTimeout(function(){
				modal_recovery.classList.add('modal--open');
			}, 200);		
			
		});
	} // for

	for(var i=0;i<close_modal_recovery.length;i++) {
		close_modal_recovery[i].addEventListener('click', function(e){ // закрыть pop up сброса пароля
			e.preventDefault();
			modal_recovery.classList.remove('modal--open')
		});
	}

}

	// ======

	if (modal_change) {

		validateLoginModal(modal_change, true, false);

		for(var i=0;i<open_modal_change.length;i++) {
		open_modal_change[i].addEventListener('click', function(e){ // отрыть pop up успешной регистрации
			e.preventDefault();
			if (cart_items) {
				cart_items.classList.remove('headerCart__itemsWrap--open');
			}

			modal_register.classList.remove('modal--open');
			modal_recovery.classList.remove('modal--open');
			modal_login.classList.remove('modal--open');
			modal_reg_success.classList.remove('modal--open');
			setTimeout(function(){
				modal_change.classList.add('modal--open');
			}, 200);		
			
		});
	} // for

	for(var i=0;i<close_modal_change.length;i++) {
		close_modal_change[i].addEventListener('click', function(e){ // закрыть pop up успешной регистрации
			e.preventDefault();
			modal_change.classList.remove('modal--open')
		});
	}
}

	// ======

	if (modal_reg_success) {

		for(var i=0;i<open_modal_reg_success.length;i++) {
		open_modal_reg_success[i].addEventListener('click', function(e){ // отрыть pop up успешной регистрации
			e.preventDefault();
			if (cart_items) {
				cart_items.classList.remove('headerCart__itemsWrap--open');
			}

			modal_register.classList.remove('modal--open');
			modal_recovery.classList.remove('modal--open');
			modal_login.classList.remove('modal--open');
			modal_change.classList.remove('modal--open');
			setTimeout(function(){
				modal_reg_success.classList.add('modal--open');
			}, 200);		
			
		});
	} // for

	for(var i=0;i<close_modal_change.length;i++) {
		close_modal_reg_success[i].addEventListener('click', function(e){ // закрыть pop up авторизации
			e.preventDefault();
			modal_reg_success.classList.remove('modal--open');
		});
	}
}

















}