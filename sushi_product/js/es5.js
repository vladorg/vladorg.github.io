"use strict";

window.onload = function () {
  var getElem = function getElem(selector) {
    var single = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return single ? document.querySelector(selector) : document.querySelectorAll(selector);
  },
      isMobile = window.innerWidth <= 768 ? true : false,
      isTablet = window.innerWidth > 768 && window.innerWidth < 992 ? true : false,
      getCoords = function getCoords(elem) {
    return elem.getBoundingClientRect().top + pageYOffset;
  }; // BASE ================================================


  var main_slider = getElem('.banner__slider'),
      modal_close = getElem('.modal__close', false),
      modals = {
    root: getElem('.modal', false),
    auth: {
      opener: getElem('.open_auth', false),
      item: getElem('.modalAuth')
    },
    register: {
      opener: getElem('.open_register', false),
      item: getElem('.modalRegister')
    },
    forgot: {
      opener: getElem('.open_forgot', false),
      item: getElem('.modalForgot')
    },
    check: {
      opener: getElem('.open_check', false),
      item: getElem('.modalCheck')
    },
    reset: {
      opener: getElem('.open_reset', false),
      item: getElem('.modalReset')
    },
    change_success: {
      opener: getElem('.open_change_success', false),
      item: getElem('.modalSuccessPass')
    },
    ask: {
      opener: getElem('.open_ask', false),
      item: getElem('.modalAsk')
    },
    review: {
      opener: getElem('.open_review', false),
      item: getElem('.modalReview')
    },
    review_manager: {
      opener: getElem('.open_review_manager', false),
      item: getElem('.modalReviewManager')
    },
    callback: {
      opener: getElem('.open_callback', false),
      item: getElem('.modalCallback')
    },
    user_info: {
      opener: getElem('.open_user_info', false),
      item: getElem('.modalUserInfo')
    },
    user_address: {
      opener: getElem('.open_user_address', false),
      item: getElem('.modalUserAddress')
    },
    add_address: {
      opener: getElem('.open_add_address', false),
      item: getElem('.modalAddAddress')
    },
    share_article: {
      opener: getElem('.open_share', false),
      item: getElem('.modalShare')
    },
    open_tender: {
      opener: getElem('.open_tender', false),
      item: getElem('.modalTender')
    }
  },
      top_btn = getElem('.toTop'),
      seo_btn = getElem('.seo__more', false),
      open_dropdown = getElem('.dropdown__title', false),
      open_acordion = getElem('.accordion__title', false),
      prod_btns_wrap = getElem('.productsSlider__buttons'),
      wish_add = getElem('.wish_add', false),
      select_item = getElem('.select__item', false),
      download = getElem('.download', false),
      add_to_cart = getElem('.preview__buy', false),
      quantity_plus = getElem('.quantly .quantly__plus', false),
      quantity_minus = getElem('.quantly .quantly__minus', false),
      quantity_input = getElem('.quantly .quantly__input', false),
      hide_text_opener = getElem('.texthide__opener', false);
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('preview__buy')) {
      e.target.classList.add('preview__buy--added');
      e.target.dataset.added ? e.target.innerText = e.target.dataset.added : null;
      e.target.disabled = true;
    }

    if (e.target.classList.contains('preview__wish')) {
      if (!e.target.classList.contains('open_auth')) {
        e.target.classList.add('preview__wish--added');
        e.target.disabled = true;
      }
    }

    if (e.target.classList.contains('productPageCheckout__wish')) {
      if (!e.target.classList.contains('open_auth')) {
        e.target.classList.add('productPageCheckout__wish--added');
        e.target.disabled = true;
      }
    }
  }); // scroll top button show and scrolled

  window.addEventListener('scroll', function (e) {
    if (pageYOffset >= 900) {
      top_btn.classList.add('toTop--active');
    } else {
      top_btn.classList.remove('toTop--active');
    }
  });
  top_btn.addEventListener('click', function (e) {
    //window.scrollTo({ top: 0, behavior: 'smooth' });
    $("html, body").animate({
      scrollTop: 0
    });
  }); // open modals

  openModals(modals.auth.opener, modals.auth.item, 'auth'); // auth

  openModals(modals.register.opener, modals.register.item, 'register'); // register

  openModals(modals.forgot.opener, modals.forgot.item, 'forgot'); // forgot

  openModals(modals.check.opener, modals.check.item, 'check'); // check

  openModals(modals.reset.opener, modals.reset.item, 'reset'); // reset

  openModals(modals.change_success.opener, modals.change_success.item, 'change success'); // change success

  openModals(modals.callback.opener, modals.callback.item, 'callback'); // callback

  openModals(modals.ask.opener, modals.ask.item, 'ask'); // ask

  openModals(modals.review.opener, modals.review.item, 'review'); // review for director

  openModals(modals.review_manager.opener, modals.review_manager.item, 'review_manager'); // review for manager

  openModals(modals.user_info.opener, modals.user_info.item, 'user_info'); // change user info

  openModals(modals.user_address.opener, modals.user_address.item, 'user_address'); // change user addresses

  openModals(modals.add_address.opener, modals.add_address.item, 'add_address'); // add user address

  openModals(modals.share_article.opener, modals.share_article.item, 'share_article'); // share article

  openModals(modals.open_tender.opener, modals.open_tender.item, 'open_tender'); // open tender

  function openModals(elem, modal, name) {
    if (modal) {
      for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener('click', function (e) {
          e.preventDefault();
          closeModals(); // close other modals before open target modal

          modal.classList.add('modal--open');
          document.body.classList.add('no-scroll');
          setTimeout(function () {
            document.body.classList.add('hasActiveModal');
          }, 200);
        });
      }
    } else {
      return console.log("modal ".concat(name, " is undefined"));
    }
  } // close all modals


  for (var i = 0; i < modal_close.length; i++) {
    modal_close[i].addEventListener('click', closeModals);
  }

  function closeModals() {
    for (var _i = 0; _i < modals.root.length; _i++) {
      modals.root[_i].classList.remove('modal--open');
    }

    document.body.classList.remove('no-scroll');
    document.body.classList.remove('hasActiveModal');
  } // close modal when click outside them


  document.addEventListener('click', function (e) {
    if (document.body.classList.contains('hasActiveModal')) {
      for (var _i2 = 0; _i2 < modals.root.length; _i2++) {
        if (modals.root[_i2].classList.contains('modal--open')) {
          var current_modal = modals.root[_i2].querySelector('.modal__win');

          if (!current_modal.contains(e.target)) {
            modals.root[_i2].classList.remove('modal--open');

            document.body.classList.remove('no-scroll');
            document.body.classList.remove('hasActiveModal');
          }
        }
      }
    }
  }); // main slider

  if (main_slider) {
    var swiper_main = new Swiper(main_slider, {
      slidesPerView: 1,
      slidesPerColumn: 1,
      progressbarOpposite: true,
      loop: true,
      effect: 'slide',
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      autoHeight: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function renderBullet(index, className) {
          return '<div class="dot swiper-pagination-bullet"><div class="progressCircle"><div class="progressCircle__inner"><div class="progressCircle__mask full"><div class="fill"></div></div><div class="progressCircle__mask half"><div class="fill"></div></div><div class="progressCircle__inside"></div></div></div></div>';
        }
      }
    }); // function on customize slides change effect

    swiper_main.on('slideChangeTransitionStart', function () {
      var slide_text = getElem('.banner .swiper-slide-active .banner__title').innerHTML;
      var slide_btn_text = getElem('.banner .swiper-slide-active .banner__link').innerText;
      var slide_btn_href = getElem('.banner .swiper-slide-active .banner__link').getAttribute('href');
      var caption = getElem('.banner__captions .banner__caption'); // animation fade out caption elements

      caption.querySelector('.banner__title').classList.remove('banner__title--anim');
      caption.querySelector('.banner__link').classList.remove('banner__link--anim');
      setTimeout(function () {
        caption.querySelector('.banner__title').innerHTML = slide_text;
        caption.querySelector('.banner__link').innerHTML = slide_btn_text;
        caption.querySelector('.banner__link').setAttribute('href', slide_btn_href);
      }, 200); // switch caption content when fade out animation will end

      setTimeout(function () {
        caption.querySelector('.banner__title').classList.add('banner__title--anim');
        caption.querySelector('.banner__link').classList.add('banner__link--anim');
      }, 400); // fade in caption with new content
    });
  } // default slider params


  var slider_params = {
    slidesPerView: 4,
    spaceBetween: 16,
    init: false,
    watchOverflow: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    observer: true,
    observeParents: true,
    //rebuildOnUpdate: true,
    slideVisibleClass: 'swiper-slide-visible',
    navigation: {
      nextEl: null,
      prevEl: null
    },
    breakpoints: {
      1400: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 3
      },
      600: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  };
  var partners_params = {
    slidesPerView: 5,
    spaceBetween: 16,
    init: false,
    watchOverflow: true,
    watchSlidesVisibility: true,
    slideVisibleClass: 'swiper-slide-visible',
    navigation: {
      nextEl: null,
      prevEl: null
    },
    breakpoints: {
      1400: {
        slidesPerView: 5
      },
      1200: {
        slidesPerView: 4
      },
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 2
      }
    }
  }; //sliderRender(article_posts, 'article_posts_slider', 'article_posts', '.articlePageSidebar__slider', slider_params, 'mobile');

  function sliderRender(elem, slider, id, root, params) {
    var device_mode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'all';

    if (elem) {
      params.navigation.nextEl = "".concat(root, " .sliderArrows__next--").concat(id);
      params.navigation.prevEl = "".concat(root, " .sliderArrows__prev--").concat(id);

      var _slider = new Swiper(elem, params);

      var controls = document.querySelectorAll("".concat(root, " .sliderArrows__arrow"));
      sliderArrows(_slider);

      if (device_mode == 'desktop') {
        if (!isMobile) {
          _slider.init();
        } else {
          controls.forEach(function (el) {
            el.remove();
          });
        }
      } else if (device_mode == 'mobile') {
        if (isMobile) {
          _slider.init();
        } else {
          controls.forEach(function (el) {
            el.remove();
          });
        }
      } else {
        _slider.init();
      }
    }
  } // switch active status for slider arrows when slides swiping will end of start


  function sliderArrows(slider) {
    slider.on('activeIndexChange', function () {
      this.navigation.prevEl.classList.add('sliderArrows__arrow--active');
      this.navigation.nextEl.classList.add('sliderArrows__arrow--active');
    });
    slider.on('reachBeginning', function () {
      var _this = this;

      setTimeout(function () {
        _this.navigation.prevEl.classList.remove('sliderArrows__arrow--active');
      }, 100);
    });
    slider.on('reachEnd', function () {
      var _this2 = this;

      setTimeout(function () {
        _this2.navigation.nextEl.classList.remove('sliderArrows__arrow--active');
      }, 100);
    });
  } // seo block text toggle


  if (seo_btn) {
    for (var _i3 = 0; _i3 < seo_btn.length; _i3++) {
      seo_btn[_i3].addEventListener('click', function () {
        var seo = this.closest('.seo');
        var text = this.parentNode.querySelector('.seo__text');

        if (seo.classList.contains('seo--full')) {
          seo.classList.remove('seo--full', 'seo--scroll');
        } else {
          seo.classList.add('seo--full');
          setTimeout(function () {
            seo.classList.add('seo--scroll');
          }, 400);
        }
      });
    }
  } // default dropdown


  if (open_dropdown) {
    for (var _i4 = 0; _i4 < open_dropdown.length; _i4++) {
      open_dropdown[_i4].addEventListener('click', function (e) {
        e.preventDefault();
        var list = this.parentNode;
        list.classList.toggle('dropdown--open');
      });
    }
  } // default acordion


  if (open_acordion) {
    var _loop = function _loop(_i5) {
      open_acordion[_i5].addEventListener('click', function (e) {
        if (open_acordion[_i5].parentNode.classList.contains('accordion__item--open')) {
          open_acordion[_i5].parentNode.classList.remove('accordion__item--open');

          open_acordion[_i5].parentNode.querySelector('.accordion__content').classList.remove('accordion__content--scroll');

          setTimeout(function () {
            open_acordion[_i5].parentNode.querySelector('.accordion__content').classList.remove('scroll');
          }, 400);
        } else {
          open_acordion[_i5].parentNode.classList.add('accordion__item--open');

          setTimeout(function () {
            open_acordion[_i5].parentNode.querySelector('.accordion__content').classList.add('scroll');

            open_acordion[_i5].parentNode.querySelector('.accordion__content').classList.add('accordion__content--scroll');
          }, 400);
        }
      });
    };

    for (var _i5 = 0; _i5 < open_acordion.length; _i5++) {
      _loop(_i5);
    }
  } // tabs switch


  if (prod_btns_wrap) {
    prod_btns_wrap.addEventListener('click', function (e) {
      if (e.target.classList.contains('productsSlider__btn')) {
        // get target tab
        var tab = e.target.dataset.tab; // update tabs

        var _loop2 = function _loop2(_i6) {
          tabs_prod[_i6].classList.remove('productsSlider__tabWrap--active');

          if (tabs_prod[_i6].dataset.tab == tab) {
            var wrap = tabs_prod[_i6].parentNode;
            setTimeout(function () {
              wrap.style.height = "".concat(tabs_prod[_i6].clientHeight, "px");
            }, 0);

            tabs_prod[_i6].classList.add('productsSlider__tabWrap--active');
          }
        };

        for (var _i6 = 0; _i6 < tabs_prod.length; _i6++) {
          _loop2(_i6);
        } // update slider arrows


        for (var _i7 = 0; _i7 < prod_arrows.length; _i7++) {
          prod_arrows[_i7].classList.remove('productsSlider__arrows--active');

          if (prod_arrows[_i7].dataset.tab == tab) {
            prod_arrows[_i7].classList.add('productsSlider__arrows--active');
          }
        } // update buttons active class


        for (var _i8 = 0; _i8 < prod_btns.length; _i8++) {
          prod_btns[_i8].classList.remove('productsSlider__btn--active');
        }

        e.target.classList.add('productsSlider__btn--active');
      }
    });
  } // add to wishlist


  if (wish_add) {
    var _loop3 = function _loop3(_i9) {
      wish_add[_i9].addEventListener('click', function (e) {
        if (wish_add[_i9].classList.contains('wish_add--added')) {
          console.log('return');
          return false;
        } else {
          wish_add[_i9].classList.add('wish_add--added');
        }

        if (!wish_add[_i9].classList.contains('preview__wish')) {
          var wish_text = wish_add[_i9].dataset.added;
          wish_add[_i9].querySelector('span').innerText = wish_text;
        }
      });
    };

    for (var _i9 = 0; _i9 < wish_add.length; _i9++) {
      _loop3(_i9);
    }
  } // custom select


  if (select_item) {
    var _loop4 = function _loop4(_i10) {
      select_item[_i10].addEventListener('click', function (e) {
        var select_val = select_item[_i10].dataset.value;

        var parent = select_item[_i10].closest('.select');

        parent.querySelector('input[type=hidden]').value = select_val;
        parent.querySelector('.dropdown').classList.remove('dropdown--open');
        parent.querySelector('.dropdown__title').innerText = select_val;
      });
    };

    for (var _i10 = 0; _i10 < select_item.length; _i10++) {
      _loop4(_i10);
    }
  } // oploading files


  if (download) {
    download.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var target = el.parentNode.querySelector('input[type=file]');
        var info = el.parentNode.querySelector('.uploaded');
        target.addEventListener('change', function () {
          info.innerText = this.value;
        });
        target.click();
      });
    });
  } // quantity


  if (quantity_plus) {
    var quantity_plus_time, quantity_minus_time;
    quantity_plus.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        clearTimeout(quantity_plus_time);
        quantity_plus_time = setTimeout(function () {
          var input = el.parentNode.querySelector('input[name="quantly"]');

          if (input.value.length > 3 || input.value == 999) {
            input.value = 999;
          } else {
            input.value = parseInt(input.value) + 1;
          }
        }, 200);
      });
    });
    quantity_minus.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        clearTimeout(quantity_minus_time);
        quantity_minus_time = setTimeout(function () {
          var input = el.parentNode.querySelector('input[name="quantly"]');
          input.value != 1 ? input.value = parseInt(input.value) - 1 : null;
        }, 200);
      });
    });
    quantity_input.forEach(function (el) {
      el.addEventListener('change', function (e) {
        var quantity = el.value;

        if (isNaN(+quantity)) {
          el.value = 1;
        } else {
          if (quantity == "" || quantity == 0) {
            el.value = 1;
          }

          if (quantity.length > 3) {
            el.value = quantity.slice(0, 3);
          }
        }
      });
    });
  } // show hidden text


  if (hide_text_opener) {
    hide_text_opener.forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (el.closest('.texthide').classList.contains('texthide--open')) {
          el.closest('.texthide').classList.remove('texthide--open', 'texthide--ova');
          el.closest('.texthide').querySelector('.texthide__text').scrollTop = 0;
        } else {
          el.closest('.texthide').classList.add('texthide--open');
          setTimeout(function () {
            el.closest('.texthide').classList.add('texthide--ova');
          }, 600);
        }
      });
    });
  } // HEADER  ================================================


  var catalog_btn = getElem('.catalog__btn', false),
      catalog = getElem('.catalog'),
      header = getElem('.header'),
      banner = getElem('.banner'),
      open_wish = getElem('.open_wish', false),
      open_cart = getElem('.open_cart', false),
      wishlist_wrap = getElem('.header__tool--wish'),
      wishlist = getElem('.wishlist'),
      cart_wrap = getElem('.header__tool--cart'),
      cart = getElem('.cart'),
      logged = getElem('.logged'),
      logged_wrap = getElem('.header__tool--logged'),
      open_logged = getElem('.open_logged', false),
      open_mobile = getElem('.open_mobile', false),
      close_mobile = getElem('.close_mobile', false),
      mobile_menu = getElem('.mobileMenu'),
      open_child = getElem('.open_child', false),
      close_child = getElem('.close_child', false),
      mobile_catalog_child_opener = getElem('.mobileCatalog__opener', false),
      open_search = getElem('.open_search', false),
      search = getElem('.header__search'); // open catalog 

  if (catalog_btn) {
    for (var _i11 = 0; _i11 < catalog_btn.length; _i11++) {
      catalog_btn[_i11].addEventListener('click', function () {
        var _this3 = this;

        catalog.classList.toggle('catalog--open');

        if (catalog.classList.contains('catalog--open')) {
          document.body.classList.add('no-scroll');
          setTimeout(function () {
            _this3.classList.add('ic-close');
          }, 200);
        } else {
          document.body.classList.remove('no-scroll');
          setTimeout(function () {
            _this3.classList.remove('ic-close');
          }, 200);
        }
      });
    }
  } // header for all pages except checkout


  if (!header.classList.contains('header--checkout')) {
    // fix header
    var scroll_height;
    var header_height = header.clientHeight;
    window.addEventListener('scroll', function () {
      if (isMobile) {
        scroll_height = banner ? banner.clientHeight : header.clientHeight;
      } else {
        scroll_height = header.clientHeight;
      }

      if (this.pageYOffset > scroll_height) {
        if (!isMobile) {
          !banner ? document.body.style.paddingTop = "".concat(header_height, "px") : null;
        }

        header.classList.remove('header--opacity');
        header.classList.add('header--fix');
      } else if (this.pageYOffset == 0) {
        header.classList.remove('header--fix');
        banner ? header.classList.add('header--opacity') : document.body.style.paddingTop = 0;
      }
    }); // open cart

    for (var _i12 = 0; _i12 < open_cart.length; _i12++) {
      open_cart[_i12].addEventListener('click', function (e) {
        if (window.innerWidth > 768) {
          e.preventDefault();
          wishlist.classList.remove('headerDropdown--open');
          logged.classList.remove('headerDropdown--open');
          setTimeout(function () {
            cart.classList.toggle('headerDropdown--open');
          }, 200);
        } else {
          var link = this.getAttribute('data-link');

          if (link) {
            window.location = link;
          } else {
            console.log('cart link is not set or set incorrect');
          }
        }
      });
    } // open wish


    for (var _i13 = 0; _i13 < open_wish.length; _i13++) {
      open_wish[_i13].addEventListener('click', function (e) {
        cart.classList.remove('headerDropdown--open');
        logged.classList.remove('headerDropdown--open');
        setTimeout(function () {
          wishlist.classList.toggle('headerDropdown--open');
        }, 200);
      });
    } // open logged


    var _loop5 = function _loop5(_i14) {
      open_logged[_i14].addEventListener('click', function (e) {
        e.preventDefault();
        cart.classList.remove('headerDropdown--open');
        wishlist.classList.remove('headerDropdown--open');
        setTimeout(function () {
          open_logged[_i14].classList.toggle('open_logged--opened');

          logged.classList.toggle('headerDropdown--open');
        }, 200);
      });
    };

    for (var _i14 = 0; _i14 < open_logged.length; _i14++) {
      _loop5(_i14);
    }

    cart.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
    wishlist.addEventListener('click', function (e) {
      return e.stopPropagation();
    });
    logged.addEventListener('click', function (e) {
      return e.stopPropagation();
    }); // close drops when click outside them

    document.addEventListener('click', function (e) {
      if (!cart_wrap.contains(e.target)) {
        cart.classList.remove('headerDropdown--open');
      }

      if (!wishlist_wrap.contains(e.target)) {
        wishlist.classList.remove('headerDropdown--open');
      }

      if (logged_wrap) {
        if (!logged_wrap.contains(e.target)) {
          logged.classList.remove('headerDropdown--open');

          for (var _i15 = 0; _i15 < open_logged.length; _i15++) {
            open_logged[_i15].classList.remove('open_logged--opened');
          }
        }
      }
    }); // open search

    var _loop6 = function _loop6(_i16) {
      open_search[_i16].addEventListener('click', function () {
        open_search[_i16].classList.toggle('header__searchMobile--open');

        document.body.classList.toggle('no-scroll');
        setTimeout(function () {
          search.classList.toggle('header__search--open');
        }, 300);
      });
    };

    for (var _i16 = 0; _i16 < open_search.length; _i16++) {
      _loop6(_i16);
    } // MOBILE MENU
    // open


    var _loop7 = function _loop7(_i17) {
      open_mobile[_i17].addEventListener('click', function () {
        open_mobile[_i17].classList.add('open_mobile--hidden');

        mobile_menu.classList.add('mobileMenu--open');
        document.body.classList.add('no-scroll');
      });
    };

    for (var _i17 = 0; _i17 < open_mobile.length; _i17++) {
      _loop7(_i17);
    } // close


    for (var _i18 = 0; _i18 < close_mobile.length; _i18++) {
      close_mobile[_i18].addEventListener('click', function () {
        mobile_menu.classList.remove('mobileMenu--open');
        document.body.classList.remove('no-scroll');

        for (var _i19 = 0; _i19 < open_mobile.length; _i19++) {
          open_mobile[_i19].classList.remove('open_mobile--hidden');
        }
      });
    } // open child menu


    var _loop8 = function _loop8(_i20) {
      open_child[_i20].addEventListener('click', function (e) {
        e.preventDefault();

        open_child[_i20].parentNode.querySelector('.mobileMenu__child').classList.add('mobileMenu__child--open');
      });
    };

    for (var _i20 = 0; _i20 < open_child.length; _i20++) {
      _loop8(_i20);
    } // close child menu


    var _loop9 = function _loop9(_i21) {
      close_child[_i21].addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        close_child[_i21].parentNode.classList.remove('mobileMenu__child--open');
      });
    };

    for (var _i21 = 0; _i21 < close_child.length; _i21++) {
      _loop9(_i21);
    } // open child catalog items


    var _loop10 = function _loop10(_i22) {
      mobile_catalog_child_opener[_i22].addEventListener('click', function (e) {
        var item = mobile_catalog_child_opener[_i22].parentNode.querySelector('.mobileCatalog__child');

        item.classList.toggle('mobileCatalog__child--open');
      });
    };

    for (var _i22 = 0; _i22 < mobile_catalog_child_opener.length; _i22++) {
      _loop10(_i22);
    }
  } // end header for all pages except checkout
  // HOME PAGE


  var home = getElem('.home'),
      home_categories_slider = getElem('.categories__slider'),
      home_special = getElem('.productsSlider__special'),
      home_bestseller = getElem('.productsSlider__bestseller'),
      home_new = getElem('.productsSlider__new'),
      home_partners = getElem('.partners__slider'),
      home_clients = getElem('.clients__slider'),
      prod_btns = getElem('.productsSlider__btn', false),
      prod_arrows = getElem('.productsSlider__arrows', false),
      tabs_prod = getElem('.productsSlider__tabWrap', false);

  if (home) {
    var showManager = function showManager() {
      var managers_wrap = getElem('.feedback__managers');
      var managers = getElem('.feedback__manager', false);
      var num = Math.floor(Math.random() * Math.floor(managers.length));
      managers_wrap.classList.remove('feedback__managers--load');
      managers[num].classList.add('feedback__manager--active');
    };

    // initialization sliders
    //elem, slider, id, root, params, device_mode = 'all'
    sliderRender(home_categories_slider, 'categories_slider', 'categories', '.categories', slider_params);
    sliderRender(home_special, 'home_special_slider', 'special', '.productsSlider', slider_params, 'desktop');
    sliderRender(home_bestseller, 'home_bestseller_slider', 'bestseller', '.productsSlider', slider_params, 'desktop');
    sliderRender(home_new, 'home_new_slider', 'new', '.productsSlider', slider_params, 'desktop'); // main feedback managers random show

    showManager();
    $('.parallax-background').parallaxBackground({}); // main sections show

    var elems = [getElem('.categories'), getElem('.productsSlider'), getElem('.partners'), getElem('.aboutBlock'), getElem('.clients'), getElem('.recipes'), getElem('.feedback')],
        cords = [],
        showBlocks = function showBlocks(cord, block) {
      return pageYOffset >= cord - 500 ? block.classList.remove('section--hide') : null;
    };

    elems.forEach(function (item) {
      cords.push(getCoords(item));
      pageYOffset > 0 ? item.classList.remove('section--hide') : null;
    });
    window.addEventListener('scroll', function (e) {
      return elems.forEach(function (item, index) {
        return showBlocks(cords[index], item);
      });
    });
  }

  sliderRender(home_clients, 'home_clients_slider', 'clients', '.clients', partners_params);
  sliderRender(home_partners, 'home_partners_slider', 'partners', '.partners', partners_params); // CATALOG PAGES

  var category_offers = getElem('.offers__slider'),
      sidebar_item = getElem('.navigation__childOpener', false),
      category_catalog_opener = getElem('.open_category_catalog', false),
      category_catalog_closer = getElem('.close_category_catalog', false),
      category_catalog = getElem('.sidebar--catalog');
  var slider_offers_params = partners_params;
  slider_offers_params.breakpoints = {
    600: {
      slidesPerView: 2
    },
    320: {
      slidesPerView: 1
    }
  }; //elem, slider, id, root, params, device_mode = 'all' --- args

  sliderRender(category_offers, 'category_offers_slider', 'offers', '.offers', slider_offers_params, 'mobile'); // sidebar navigation child menus toggler

  if (sidebar_item) {
    var _loop11 = function _loop11(_i23) {
      sidebar_item[_i23].addEventListener('click', function (e) {
        if (sidebar_item[_i23].parentNode.classList.contains('navigation__item--open')) {
          sidebar_item[_i23].parentNode.classList.remove('navigation__item--scroller');

          setTimeout(function () {
            sidebar_item[_i23].parentNode.classList.remove('navigation__item--open');
          }, 200);
        } else {
          sidebar_item[_i23].parentNode.classList.toggle('navigation__item--open');

          setTimeout(function () {
            sidebar_item[_i23].parentNode.classList.toggle('navigation__item--scroller');
          }, 400);
        }
      });
    };

    for (var _i23 = 0; _i23 < sidebar_item.length; _i23++) {
      _loop11(_i23);
    }
  } // open catalog mobile menu


  if (category_catalog_opener) {
    for (var _i24 = 0; _i24 < category_catalog_opener.length; _i24++) {
      category_catalog_opener[_i24].addEventListener('click', function (e) {
        var header_height = header.clientHeight;
        category_catalog.style.top = "".concat(header_height, "px");
        category_catalog.classList.add('sidebar--open');
        document.body.classList.add('no-scroll');
      });
    }
  } // close catalog mobile menu


  if (category_catalog_closer) {
    for (var _i25 = 0; _i25 < category_catalog_closer.length; _i25++) {
      category_catalog_closer[_i25].addEventListener('click', function (e) {
        isTablet ? category_catalog.classList.remove('sidebar--open') : null;
        isMobile ? category_catalog.classList.remove('sidebar--open') : null;
        document.body.classList.remove('no-scroll');
      });
    }
  } // PRODUCT PAGE


  var related_products = getElem('.related__slider'),
      product_recipes = getElem('.itemsSlider'),
      galleryThumbs = new Swiper('.productPageImages__bottom', {
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        slidesPerView: 4
      },
      320: {
        slidesPerView: 3
      }
    }
  }),
      galleryTop = new Swiper('.productPageImages__top', {
    thumbs: {
      swiper: galleryThumbs
    }
  }),
      product_info_opener = getElem('.productPageInfo__more'),
      product_info_rows = getElem('.productPageInfo__rows');

  if (product_info_opener && product_info_rows) {
    product_info_opener.addEventListener('click', function (e) {
      product_info_opener.classList.add('productPageInfo__more--hide');
      setTimeout(function () {
        product_info_rows.classList.add('productPageInfo__rows--full');
      }, 200);
    });
  } //elem, slider, id, root, params, device_mode = 'all' --- args


  sliderRender(related_products, 'related_products_slider', 'related', '.related', slider_params);
  sliderRender(product_recipes, 'product_recipes_slider', 'recipes', '.productPageRecipes', slider_params, 'mobile'); // CART PAGE

  var promo_inp = getElem('#cart_promo'),
      cart_page_wrap = getElem('.cartContent .container'),
      cart_page_empty = getElem('.cartContentEmpty'),
      promo_btn = getElem('#cart_promo_add'),
      promo_btn_changer = promo_btn_enable.bind(promo_inp);
  var promo_add_timer; // on write promo code call btn enabler with debounce

  if (promo_inp) {
    promo_inp.addEventListener('input', function () {
      clearTimeout(promo_add_timer);
      promo_add_timer = setTimeout(promo_btn_changer, 400);
    });
  }

  function promo_btn_enable() {
    if (!this.value == '' && this.value.length > 3) {
      promo_btn.classList.remove('btn--disabled');
    } else {
      promo_btn.classList.add('btn--disabled');
    }
  } // CHECKOUT PAGE


  var checkout_page = getElem('.checkoutPage'),
      checkout_tab_btn = getElem('.checkoutOrderCustomer__btn', false),
      checkout_tab = getElem('.checkoutOrderCustomer__form', false),
      customer_accept = getElem('#customer_accept'),
      customer_log = getElem('#customer_log'),
      checkout_order = getElem('#checkout_order'),
      checkout_customer = getElem('.checkoutOrderCustomer'),
      checkout_customer_inner = getElem('.checkoutOrderCustomer__inner'),
      checkout_change = getElem('.checkoutOrder__change', false),
      checkout_form = getElem('.checkoutOrder'),
      checkout_customer_saved = getElem('.checkoutOrderCustomer .checkoutOrder__saved'),
      checkout_info = getElem('.checkoutOrderInfo'),
      checkout_info_trigger = getElem('.checkoutOrderInfo__defaultContent span'),
      checkout_info_radios = getElem('.checkoutOrderInfo input[type=radio]', false),
      checkout_city_pick = getElem('.checkoutOrderDelivery__cityAcc', false),
      checkout_new_address = getElem('.new_address', false);

  if (checkout_page) {
    (function () {
      var activateInputs = function activateInputs(items, flag) {
        if (items) {
          for (var _i30 = 0; _i30 < items.length; _i30++) {
            flag ? items[_i30].disabled = true : items[_i30].disabled = false;
          }
        }
      };

      var validate = function validate(items, mode) {
        var result = null; // mode default is default

        if (mode == 'default') {
          if (items) {
            if (items.length > 0) {
              items.forEach(function (el) {
                if (el.value == "" || el.value.length < 3) {
                  if (el.parentNode.classList.contains('select')) {
                    el.parentNode.classList.remove('select--ok');
                    el.parentNode.classList.add('select--err');
                  } else {
                    el.classList.remove('input--ok');
                    el.classList.add('input--err');
                  }

                  console.log("failed validate: ".concat(el.getAttribute('name')));
                  result = false;
                } else {
                  if (el.parentNode.classList.contains('select')) {
                    el.parentNode.classList.remove('select--err');
                    el.parentNode.classList.add('select--ok');
                  } else {
                    el.classList.remove('input--err');
                    el.classList.add('input--ok');
                  }

                  result != false ? result = true : null;
                }
              });
            } else {
              result = true;
              console.log('no items for validate!');
            }
          } else {
            console.log('items is not defined!');
          }
        } else {
          console.log('validate mode is no defined!');
        }

        return result;
      };

      var getValues = function getValues(items) {
        var result = {};
        items.forEach(function (el) {
          var key = el.getAttribute('name');
          var val = el.value;
          result[key] = val;
        });
        return result;
      };

      var confirmFirstStep = function confirmFirstStep(item) {
        if (item) {
          item.addEventListener('click', function (e) {
            var inputs = [];
            var inputs_save = []; // prepare fields for validate and save

            if (checkout_customer) {
              var inputs_temp = checkout_customer.querySelectorAll('input');
              inputs_temp.forEach(function (el) {
                if (!el.disabled && el.classList.contains('required')) {
                  inputs.push(el);
                  inputs_save.push(el);
                } else if (!el.disabled) {
                  inputs_save.push(el);
                }
              });
            } // validate found fields


            var customer_status = validate(inputs, 'default');
            var checkout_customer_values = getValues(inputs_save);

            if (item == customer_log) {
              var checkout_customer_data = JSON.stringify(checkout_customer_values); // if auth - send ajax auth request
            } else {
              /* if validate successfly
                - set valid status for customer stage
                - enable order button
                - save customer info
                - hide first step
              */
              if (customer_status) {
                checkout_customer.dataset.valid = 'true';
                checkout_order.disabled = false;
                checkout_order.classList.remove('btn--disabled');
                var checkout_customer_hide = checkout_customer_inner.animate([{
                  opacity: 1
                }, {
                  opacity: 0
                }], {
                  duration: 400
                });
                checkout_customer_hide.addEventListener('finish', function () {
                  checkout_customer.classList.remove('checkoutOrder__step--active');
                  checkout_customer.classList.add('checkoutOrder__step--completed');
                  setTimeout(function () {
                    checkout_info.classList.add('checkoutOrder__step--active');
                  }, 200);
                });

                for (var k in checkout_customer_values) {
                  var _item = document.createElement('span');

                  checkout_customer_values[k] ? _item.innerHTML = checkout_customer_values[k] : _item.innerHTML = '---';
                  checkout_customer_saved.appendChild(_item);
                }
              } else {
                checkout_customer.dataset.valid = 'false';
                checkout_order.disabled = true;
                checkout_order.classList.add('btn--disabled');
                checkout_customer.classList.remove('checkoutOrderCustomer--completed');
              }
            }
          });
        }
      };

      if (checkout_tab_btn) {
        var _loop12 = function _loop12(_i26) {
          checkout_tab_btn[_i26].addEventListener('click', function (e) {
            var tab = checkout_tab_btn[_i26].dataset.tab;

            for (var _i27 = 0; _i27 < checkout_tab_btn.length; _i27++) {
              checkout_tab_btn[_i27].classList.remove('checkoutOrderCustomer__btn--active');
            }

            checkout_tab_btn[_i26].classList.add('checkoutOrderCustomer__btn--active');

            for (var _i28 = 0; _i28 < checkout_tab.length; _i28++) {
              if (checkout_tab[_i28].dataset.tab == tab) {
                checkout_tab[_i28].classList.add('checkoutOrderCustomer__form--active'); // activate


                var inputs = checkout_tab[_i28].querySelectorAll('input, textarea');

                activateInputs(inputs, false);
              } else {
                checkout_tab[_i28].classList.remove('checkoutOrderCustomer__form--active'); // disactivate


                var _inputs = checkout_tab[_i28].querySelectorAll('input, textarea');

                activateInputs(_inputs, true);
              }
            }
          });
        };

        // switch customer tabs and toggle inputs disabled status
        for (var _i26 = 0; _i26 < checkout_tab_btn.length; _i26++) {
          _loop12(_i26);
        }
      }

      if (checkout_city_pick) {
        var _loop13 = function _loop13(_i29) {
          checkout_city_pick[_i29].addEventListener('click', function (e) {
            var city = checkout_city_pick[_i29].innerText;

            var parent = checkout_city_pick[_i29].closest('.checkoutOrderDelivery__city');

            parent.querySelector('input[name=city]').value = city;
          });
        };

        for (var _i29 = 0; _i29 < checkout_city_pick.length; _i29++) {
          _loop13(_i29);
        }
      }

      if (checkout_change) {
        checkout_change.forEach(function (el) {
          el.addEventListener('click', function (e) {
            var current_step = getElem(".".concat(el.dataset.step));
            var all_steps = getElem('.checkoutOrder__step', false);
            var step_saved = current_step.querySelector('.checkoutOrder__saved');
            all_steps.forEach(function (elem) {
              elem.classList.remove('checkoutOrder__step--active');
            });
            step_saved.innerHTML = "";
            current_step.classList.add('checkoutOrder__step--active');
            current_step.classList.remove('checkoutOrder__step--completed');
          });
        });
      } // accept checkout first step


      confirmFirstStep(customer_accept); // auth button

      confirmFirstStep(customer_log);

      if (checkout_info_radios) {
        checkout_info_radios.forEach(function (el) {
          if (el.classList.contains('checkoutOrder__hasContent')) {
            // disable/enable inputs on change active radio child content
            el.addEventListener('click', function (e) {
              var parent = el.closest('.checkoutOrder__item');
              var inputs = parent.querySelectorAll('.checkoutOrder__wrap input, .checkoutOrder__wrap textarea');
              var others = parent.parentNode.querySelectorAll('.checkoutOrder__wrap input, .checkoutOrder__wrap textarea');
              others.forEach(function (el) {
                var parent = el.closest('.checkoutOrder__item');
                var inputs = parent.querySelectorAll('.checkoutOrder__wrap input, .checkoutOrder__wrap textarea');
                activateInputs(inputs, true);
              });
              activateInputs(inputs, false);
            });
          }
        });
      }

      if (checkout_new_address) {
        checkout_new_address.forEach(function (el) {
          el.addEventListener('click', function (e) {
            var parent = el.closest('.checkoutOrder__content');
            var item_hide = parent.querySelector('.checkoutOrder__wrap');
            var item_show = parent.querySelector('.checkoutOrder__newAddress');
            var inputs_show = item_show.querySelectorAll('input, textarea');
            var hide = item_hide.animate([{
              opacity: 1
            }, {
              opacity: 0
            }], {
              duration: 400
            });
            activateInputs(inputs_show, false);
            hide.addEventListener('finish', function () {
              item_hide.innerHTML = item_show.innerHTML;
              item_show.remove();
            });
          });
        });
      }

      if (checkout_info_trigger) {
        checkout_info_trigger.addEventListener('click', function (e) {
          return customer_log.click();
        });
      } // order create


      if (checkout_order) {
        checkout_order.addEventListener('click', function (e) {
          e.preventDefault();
          var inputs = [];

          if (checkout_info) {
            var inputs_temp = checkout_info.querySelectorAll('input.required, textarea.required');
            inputs_temp.forEach(function (el) {
              !el.disabled ? inputs.push(el) : null;
            });
          }

          var info_status = validate(inputs, 'default');

          if (info_status) {
            checkout_info.dataset.valid = 'true';
          } else {
            checkout_info.dataset.valid = 'false';
          }

          if (JSON.parse(checkout_customer.dataset.valid) && JSON.parse(checkout_info.dataset.valid)) {
            checkout_form.submit();
          } else {
            isMobile ? window.scrollTo({
              top: getCoords(checkout_info),
              behavior: 'smooth'
            }) : null;
          }
        });
      }
    })();
  } // ACCOUNT PAGE


  var order_info_opener = getElem('.order_info_opener', false);

  if (order_info_opener) {
    var order_info_sliding = function order_info_sliding() {
      var parent = this.closest('.accountPageOrders__item');
      var item_inner = parent.querySelector('.accountPageOrders__inner');
      var item_arrow = this.closest('.accountPageOrders__opener');
      item_inner.classList.toggle('accountPageOrders__inner--open');
      isMobile ? parent.classList.toggle('accountPageOrders__item--open') : null;
      setTimeout(function () {
        item_arrow.classList.toggle('accountPageOrders__opener--open');
      }, 400);

      if (item_inner.classList.contains('accountPageOrders__inner--scroll')) {
        item_inner.classList.remove('accountPageOrders__inner--scroll');
      } else {
        setTimeout(function () {
          item_inner.classList.add('accountPageOrders__inner--scroll');
        }, 600);
      }
    };

    var order_info_opener_timer;
    order_info_opener.forEach(function (el) {
      var order_info_sliding_binded = order_info_sliding.bind(el);
      el.addEventListener('click', function (e) {
        clearTimeout(order_info_opener_timer);
        order_info_opener_timer = setTimeout(order_info_sliding_binded, 300);
      });
    });
  } // ARTICLE PAGE


  var article_rate_setter = getElem('.articlePage__star', false),
      article_open_share = getElem('.open_share', false),
      article_share_items_wrap = getElem('.modalShare__item', false),
      article_share_link = getElem('#article_share_link'),
      article_share_copy = getElem('.modalShare__copy'),
      article_posts = getElem('.articlePageSidebar__slider .swiper-container'),
      latest_posts = getElem('.articlePageSidebar__latestSlider .swiper-container'); // set article rate

  if (article_rate_setter) {
    article_rate_setter.forEach(function (el) {
      el.addEventListener('click', function (e) {
        var rate = el.dataset.rate;
        var wrapper = el.parentNode;
        var parent = el.closest('.articlePage__stars');
        var label = parent.querySelector('.articlePage__label');

        if (wrapper.classList.contains('articlePage__starsWrap')) {
          wrapper.dataset.value = rate;
          label.innerText = label.dataset.rated;
          parent.classList.add('articlePage__stars--rated'); // ajax for add rate begin .......
        }
      });
    });
  } // when open share modal - genetate social share links


  if (article_open_share) {
    article_open_share.forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (article_share_items_wrap) {
          article_share_items_wrap.forEach(function (elem) {
            var share_data = elem.dataset.share;
            var link = window.location.href;
            var title = getElem('h1').innerText;
            console.log(link);
            console.log(title);

            switch (share_data) {
              case "facebook":
                elem.setAttribute('href', "https://www.facebook.com/sharer/sharer.php?u=".concat(link));
                break;

              case "twitter":
                elem.setAttribute('href', "https://twitter.com/intent/tweet?text=".concat(title, "&url=").concat(link));
                break;

              case "telegram":
                elem.setAttribute('href', "https://t.me/share/url?url=".concat(link, "&text=").concat(title));
                break;

              default:
                console.log('no mush cases');
            }
          });
        }

        if (article_share_link) {
          article_share_link.value = window.location.href;
        }
      });
    });
  } // copy share link on click


  if (article_share_copy) {
    article_share_copy.addEventListener('click', function () {
      copyToClipboard(article_share_link.value);
      this.classList.add('modalShare__copy--copied');
      this.innerText = this.dataset.copied;
    });
  }

  function copyToClipboard(text) {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);

    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0);
    }

    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  sliderRender(article_posts, 'article_posts_slider', 'article_posts', '.articlePageSidebar__slider', slider_params, 'mobile');
  sliderRender(latest_posts, 'latest_posts_slider', 'latest_posts', '.articlePageSidebar__latestSlider', slider_params, 'mobile'); // PARTNERS PAGE

  var partners_tenders = getElem('.partnersPageTenders__wrap');
  var partners_tenders_params = partners_params;
  partners_tenders_params.slidesPerView = 2;
  partners_tenders_params.breakpoints = {
    1200: {
      slidesPerView: 2
    },
    320: {
      slidesPerView: 1
    }
  };
  sliderRender(partners_tenders, 'partners_tenders_slider', 'tenders', '.partnersPageTenders', partners_tenders_params); // REMOVE PRODUCTS

  var cart_remove_item = getElem('.cart .headerDropdown__del', false),
      wish_remove_item = getElem('.wishlist .headerDropdown__del', false),
      wish_remove_item_all = getElem('.accountPageWishlist .wishlist_delete_all'),
      wish_page_empty = getElem('.accountPageWishlist .cartContentEmpty'),
      wish_page_wrap = getElem('.accountPageWishlist'),
      wish_page_remove_item = getElem('.itemsWishlist .itemsWishlist__del', false),
      cart_item_del = getElem('.cartPage .cartContentProducts__del', false),
      cart_item_del_all = getElem('.cartPage .cartContent__removeAll'); // delete header cart dropdown product

  if (cart_remove_item) {
    var args = {
      mode: 'default',
      root: '.cart',
      elem: '.headerDropdown__item',
      parent: '.headerDropdown__items',
      callback: null // need to set fn for delete product from server

    };
    cart_remove_item.forEach(function (el) {
      var del_fn = removeProduct.bind(el, args);
      el.addEventListener('click', del_fn);
    });
  } // delete header wishlist dropdown product


  if (wish_remove_item) {
    var _args = {
      mode: 'default',
      root: '.wishlist',
      elem: '.headerDropdown__item',
      parent: '.headerDropdown__items',
      callback: null // need to set fn for delete product from server

    };
    wish_remove_item.forEach(function (el) {
      var del_fn = removeProduct.bind(el, _args);
      el.addEventListener('click', del_fn);
    });
  } // delete wishlist page product


  if (wish_page_remove_item) {
    var _args2 = {
      mode: 'wish-page',
      root: '.accountPageWishlist',
      elem: '.items__item',
      parent: '.itemsWishlist',
      callback: null // need to set fn for delete product from server

    };
    wish_page_remove_item.forEach(function (el) {
      var del_fn = removeProduct.bind(el, _args2);
      el.addEventListener('click', del_fn);
    });
  } // delete cart page product


  if (cart_item_del) {
    var _args3 = {
      mode: 'cart-page',
      root: '.cartContent',
      elem: '.cartContentProducts__item',
      parent: '.cartContentProducts',
      callback: null // need to set fn for delete product from server

    };
    cart_item_del.forEach(function (el) {
      var del_fn = removeProduct.bind(el, _args3);
      el.addEventListener('click', del_fn);
    });
  } // delete all cart page products


  if (cart_item_del_all) {
    cart_item_del_all.addEventListener('click', function () {
      var items = this.closest('.cartContent').querySelectorAll('.cartContentProducts__item');

      var _loop14 = function _loop14(_i31) {
        var item_hide = items[_i31].animate([{
          opacity: 1
        }, {
          opacity: 0
        }], {
          duration: 300
        });

        item_hide.addEventListener('finish', function () {
          items[_i31].remove();

          if (cart_page_empty) {
            cart_page_empty.innerText = getElem('.cartContent').dataset.empty;
          }

          cart_page_wrap.innerHTML = '';
          cart_page_wrap.appendChild(cart_page_empty);
          cart_page_wrap.classList.add('cartContent--empty');
        });
      };

      for (var _i31 = 0; _i31 < items.length; _i31++) {
        _loop14(_i31);
      }
    });
  } // delete all wishlist page products


  if (wish_remove_item_all) {
    wish_remove_item_all.addEventListener('click', function () {
      var items = this.closest('.accountPageUser').querySelectorAll('.items__item');

      var _loop15 = function _loop15(_i32) {
        var item_hide = items[_i32].animate([{
          opacity: 1
        }, {
          opacity: 0
        }], {
          duration: 300
        });

        item_hide.addEventListener('finish', function () {
          items[_i32].remove();

          if (wish_page_empty) {
            wish_page_empty.innerText = getElem('.accountPageWishlist').dataset.empty;
          }

          wish_page_wrap.innerHTML = '';
          wish_page_wrap.appendChild(wish_page_empty);
          getElem('.accountPageUser').classList.add('accountPageUser--empty');
        });
      };

      for (var _i32 = 0; _i32 < items.length; _i32++) {
        _loop15(_i32);
      }
    });
  }
  /*
  remove products function for:
  - header dropdown cart products
  - header dropdown wishlist products
  - cart page products
  - account wishlist page products
  
  after delete product, need to set callback function
  include ajax request for delete from server.
  
  for delete all products on one click has another functions
  */


  function removeProduct(args) {
    var mode = args.mode,
        root = args.root,
        elem = args.elem,
        parent = args.parent,
        callback = args.callback,
        item = this.closest(elem),
        par = item.closest(parent),
        root_el = getElem(root),
        empty = root_el.dataset.empty,
        ajax = callback || function () {
      console.log('callback is not defined');
    };

    item.classList.add('sad_face');
    setTimeout(function () {
      // need for waiting css fade in animation
      var item_list;
      var item_hide = item.animate([{
        opacity: 1
      }, {
        opacity: 0
      }], {
        duration: 300
      });
      item_hide.addEventListener('finish', function () {
        item.remove();
        item_list = par.querySelectorAll(elem);

        if (item_list.length == 0) {
          if (mode == 'cart-page') {
            var empty_el = getElem('.cartContentEmpty');

            if (empty_el) {
              empty_el.innerText = empty;
            }

            cart_page_wrap.innerHTML = '';
            cart_page_wrap.appendChild(cart_page_empty);
            cart_page_wrap.classList.add('cartContent--empty');
          } else if (mode == 'wish-page') {
            if (wish_page_empty) {
              wish_page_empty.innerText = getElem('.accountPageWishlist').dataset.empty;
            }

            wish_page_wrap.innerHTML = '';
            wish_page_wrap.appendChild(wish_page_empty);
            getElem('.accountPageUser').classList.add('accountPageUser--empty');
          } else {
            root_el.innerHTML = empty;
            root_el.classList.add('empty_products_list');
          }
        }

        ajax();
      });
    }, 500);
  }
};