window.addEventListener('load', () => {

  /*
  *** Intro
  */

  // get DOM elements short helper
  const get_el = (selector, single = true) => {
    if (selector) {
      return single ? document.querySelector(selector) : document.querySelectorAll(selector);
    }    
  }
  

  // try wrapper for correct working all script
  const try_fn = fn => {
    let callback = fn || function() {};
    try {
      callback();
    }
    catch(e){
      console.warn(`error in module: ** ${callback.name} **, with message: ${e.message}`);
    }
  }

  // hide/show elems like a jQuery slideToggle()
  const slide = (item, parent, class_opened, item_height) => {
    if (parent.classList.contains(class_opened)) {
      parent.classList.remove(class_opened);
      item.removeAttribute('style');
    } else {
      parent.classList.add(class_opened);
      item.style.height = `${item_height}px`;
    }
  }

  const openModal = modal => {
    if (modal) {
      const target = get_el(modal);
      const modals = get_el('.modal', false);

      modals.forEach(modal => {
        modal.classList.remove('modal--opened');
      });
      target.classList.add('modal--opened');
      document.documentElement.classList.add('blocked');
    }    
  }

  /*
    forms validation
    - form class = form--control
    - fields class = required
    - for_result param: true --- returned validation result & not submit target form
    - for_result param: false (default) --- submit target form
  */
  function form_validate(for_result = false) {       
    let fields = this.querySelectorAll('.required');
    let flag = null;            

    fields.forEach(field => {
      switch(field.name) {
        case 'password':
          flag = field_validate(field, reg_password, flag);
          break;
        case 'password_repeat':
          let password = field.closest('.form').querySelector('input[name=password]').value;
          if (field.value == '' || field.value != password) {
            field.classList.remove('input--ok');
            field.classList.remove('input--err');
            setTimeout(() => {
              field.classList.add('input--err');
            }, 0);  
            flag = false;
          } else {
            field.classList.remove('input--err');
            field.classList.add('input--ok');
            flag != false ? flag = true : null;
          }
          break;
        case 'email':
          flag = field_validate(field, reg_email, flag);
          break;
        case 'agree':
          if (field.checked) {
            field.parentNode.querySelector('label').classList.remove('error');
            flag != false ? flag = true : null;
          } else {
            field.parentNode.querySelector('label').classList.add('error');
            flag = false;
          }
          break;
        default:
          flag = field_validate(field, false, flag);
          break;
      }        
    });

    if (for_result) {
      return flag;
    }      

    if (flag) {
      let modal = this.closest('.modal');  
            
      if (modal) { // if target form is from modal
        let modal_hash = `#${modal.id}`;
        switch(modal_hash) {
          case '#modalForgot':
            openModal('#modalReseted');
            setTimeout(() => {
              this.submit();
            }, 3000);
            break;
          case '#modalChange':
            openModal('#modalChanged');
            setTimeout(() => {
              this.submit();
            }, 3000);
            break;
          case '#modalRegister':
            openModal('#modalRegistered');
            setTimeout(() => {
              this.submit();
            }, 3000);
            break;
          default:
            this.submit();
            break;
        }
      } else {
        this.submit();
      }
            
    } else {
      console.log('form is not valid...');
    }
  };

  function field_validate(field, reg, flag) {
    let result = flag;
    if (reg) {
      if (!reg.test(field.value)) {
        field.classList.remove('input--ok');
        field.classList.remove('input--err');
        setTimeout(() => {
          field.classList.add('input--err');
        }, 0);          
        result = false;
      } else {
        field.classList.remove('input--err');
        field.classList.add('input--ok');
        result != false ? result = true : null;
      }
    } else {
      if (field.value == '') {
        field.classList.remove('input--ok');
        field.classList.remove('input--err');
        setTimeout(() => {
          field.classList.add('input--err');
        }, 0);          
        result = false;
      } else {
        field.classList.remove('input--err');
        field.classList.add('input--ok');
        result != false ? result = true : null;
      }
    }
   
    return result;
  };



  /*
  *** Global variables
  */
  const menu_button = get_el('.menu__btn', false);
  const menu = get_el('.menuContent');
  const drops = get_el('.dropdown', false);
  const isMobile = window.innerWidth <= 768 ? true : false;
  const getCoords = elem => elem.getBoundingClientRect().top + pageYOffset;
  const accordion_opened = get_el('.accordion--opened', false);
  const header_height = get_el('.header').scrollHeight;

  let reg_password = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g; // validation pattern for password
  let reg_email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // validation pattern for email
  let swiper_pagination = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    renderBullet: function (index, className) {
      return `<div class="${className} bullet"></div>`;
    },
  }

  let products_custom_slider_params = {
    slidesPerView: 3,
    speed: 200,
    effect: 'slide',
    watchSlidesVisibility: true,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 401100,
      disableOnInteraction: false
    },
    slideVisibleClass: 'swiper-slide-visible',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: swiper_pagination,
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1224: {
        slidesPerView: 3
      }
    }
  };
  let products_default_slider_params = {...products_custom_slider_params, slidesPerView: 4, breakpoints: {
    320: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    },
    1440: {
      slidesPerView: 4
    }
  }};



  /* *** all modules list *** */
  const modules = [
    base,
    header,
    index,
    catalog,
    product_big,
    product,
    cart,
    checkout,
    compare,
    account,
    account_info,
    account_orders,
    article_page,
    info,
    footer
  ];

  /* *** call all modules *** */
  modules.forEach(fn => try_fn(fn));



  /*
  ***** MODULES BEGIN *****
  */

  /*
  *** Base
  */
  function base() {
    const drop_btn = get_el('.dropdown__btn', false);
    const accordion_btn = get_el('.accordion__btn', false);
    const seo_btn = get_el('.seo__more', false);
    const products_custom_row = get_el('.productsListCustom', false);
    const products_default_row = get_el('.productsListDefault', false);
    const throttle_delay = 300;
    const quantity_input = get_el('.quantity__value', false);
    const pass_shower  = get_el('.pass_shower', false);
    const form_control = get_el('.form.form--control', false);
    const sidebar_opener = get_el('.open_sidebar', false);
    const current_url = window.location;
    const modal_hashs = [
      '#modalAuth',
      '#modalRegister',
      '#modalForgot',
      '#modalReseted',
      '#modalChange',
      '#modalChanged',
      '#modalRegistered',
      '#modalCredits',
      '#modalProductReview'
    ];

    let throttle_call = 1;    
    let quantity_minus_time;
    let quantity_plus_time;
    
    
    drop_btn.forEach(el => {
      el.addEventListener('click', e => el.closest('.dropdown').classList.toggle('dropdown--opened'));
    });

    /* init opened accordions */
    accordion_opened.forEach(el => {
      setTimeout(() => {
        let t = el.querySelector('.accordion__content');
        let h = t.scrollHeight;
        t.style.height = `${h}px`;
      }, 0);
    })
    /* *** */

    accordion_btn.forEach(el => {
      el.addEventListener('click', e => {
        let parent = el.closest('.accordion');
        let list = parent.querySelector('.accordion__content');
        let list_height = list.scrollHeight;

        slide(list, parent, 'accordion--opened', list_height);
      });
    });

    seo_btn.forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        let parent = el.closest('.seo');
        let list = parent.querySelector('.seo__content');
        let list_height = list.scrollHeight;

        slide(list, parent, 'seo--opened', list_height);
      });
    });

    quantity_input.forEach(input => {
      const f = quantity.bind(input);
      input.addEventListener('change', f);
    });

    pass_shower.forEach(btn => {
      btn.addEventListener('click', e => {
        let root = btn.closest('.pass-wrap');

        if (root) {
          let target = root.querySelector('.input');

          if (btn.classList.contains('active')) {
            target.type = 'password';
            btn.classList.remove('active');
          } else {
            target.type = 'text';
            btn.classList.add('active');
          }          
        }        
      });
    });

    document.addEventListener('click', e => {
      const t = e.target;
      const t_c = t.classList;

      // main menu
      try{
        if (!t_c.contains('menuContent') && !t_c.contains('menu__btn') && !menu.contains(t)) {
          menu.classList.remove('menuContent--opened');
        }
        if (t_c.contains('menuContent__close')) {
          menu.classList.remove('menuContent--opened');
        }
      }
      catch(e) {}     

      // drops
      if (!t_c.contains('dropdown__inner') && !t_c.contains('dropdown__btn')) {
        drops.forEach(el => {
          el.classList.remove('dropdown--opened');
        })
      }

      // color_picker
      if (t_c.contains('color-picker')) {
        !t_c.contains('active') ? colorPicker.call(t) : null;
      }

      // tabs
      if (t_c.contains('tabs__btn')) {
        !t_c.contains('tabs__btn--active') ? tabs.call(t) : null;
      }

      // preview compare
      if (t_c.contains('preview__compare') || t.parentNode.classList.contains('preview__compare')) {
        if (t.parentNode.classList.contains('preview__compare')) {
          t.parentNode.disabled = true;
          t.parentNode.classList.add('preview__compare--added');
        } else {
          t.disabled = true;
          t.classList.add('preview__compare--added');
        }
      }

      // preview wishlist
      if (t_c.contains('preview__wishlist') || t.parentNode.classList.contains('preview__wishlist')) {
        if (t.parentNode.classList.contains('preview__wishlist')) {
          t.parentNode.disabled = true;
          t.parentNode.classList.add('preview__wishlist--added');
        } else {
          t.disabled = true;        
          t.classList.add('preview__wishlist--added');
        }        
      }

      // preview buy
      if (t_c.contains('preview__buy') || t.parentNode.classList.contains('preview__buy')) {
        if (t.parentNode.classList.contains('preview__buy')) {
          t.parentNode.disabled = true;
          t.parentNode.classList.add('preview__buy--added');
        } else {
          t.disabled = true;        
          t.classList.add('preview__buy--added');
        }        
      }

      // anchors
      t_c.contains('anchor') ? anchor.call(t) : null;

      // quantity
      if (t_c.contains('quantity__minus')) {
        clearTimeout(quantity_minus_time);
        quantity_minus_time = setTimeout(() => {
          quantity.call(t, 'minus');
        }, 200);
      }
      if (t_c.contains('quantity__plus')) {
        clearTimeout(quantity_plus_time);
        quantity_plus_time = setTimeout(() => {
          quantity.call(t, 'plus');
        }, 200);
      }

      // promocode & cashback open field
      if (t_c.contains('open_field') || t.parentNode.classList.contains('open_field')) {
        t.closest('.enter').classList.add('enter--opened');
      }

      // promocode & cashback change field
      if (t_c.contains('change_field') || t.parentNode.classList.contains('change_field')) {
        t.closest('.enter').classList.remove('enter--entered');
        t.closest('.enter').classList.add('enter--opened');   
      }

      // promocode & cashback validate and open success msg
      if (t_c.contains('accept_field')) {
        const root = t.closest('.enter');
        const input = root.querySelector('.input');
        if (input.value != '') {
          t.closest('.enter').classList.remove('enter--opened');
          t.closest('.enter').classList.add('enter--entered');
          input.classList.remove('input--err');
          input.value = null;
        } else {
          input.classList.remove('input--err');
          setTimeout(() => {
            input.classList.add('input--err');
          }, 0);
        }
      }

      // close modals
      if (t_c.contains('modal__close')) { // close on button click
        t.closest('.modal').classList.remove('modal--opened');
        setTimeout(() => {
          document.documentElement.classList.remove('blocked');
        }, 400);
      }
      // if (t_c.contains('modal')) { // close when outside click
      //   get_el('.modal--opened').classList.remove('modal--opened');
      //   setTimeout(() => {
      //     document.documentElement.classList.remove('blocked');
      //   }, 400);
      // }

      // open credits modal
      if (t_c.contains('open_credits') || t.parentNode.classList.contains('open_credits')) {
        e.preventDefault();
        openModal('#modalCredits');
      }

      // open auth modal
      if (t_c.contains('open_auth') || t.parentNode.classList.contains('open_auth')) {
        e.preventDefault();
        openModal('#modalAuth');
      }

      // open register modal
      if (t_c.contains('open_register') || t.parentNode.classList.contains('open_register')) {
        e.preventDefault();
        openModal('#modalRegister');
      }

      // open reset modal
      if (t_c.contains('open_forgot') || t.parentNode.classList.contains('open_forgot')) {
        e.preventDefault();
        openModal('#modalForgot');
      }

      // open reseted modal
      if (t_c.contains('open_reseted') || t.parentNode.classList.contains('open_reseted')) {
        e.preventDefault();
        openModal('#modalReseted');
      }

      // open change modal
      if (t_c.contains('open_change') || t.parentNode.classList.contains('open_change')) {
        e.preventDefault();
        openModal('#modalChange');
      }

      // open changed modal
      if (t_c.contains('open_changed') || t.parentNode.classList.contains('open_changed')) {
        e.preventDefault();
        openModal('#modalChanged');
      }

      // open registered modal
      if (t_c.contains('open_registered') || t.parentNode.classList.contains('open_registered')) {
        e.preventDefault();
        openModal('#modalRegistered');
      }

      // open product review modal
      if (t_c.contains('open_product_review') || t.parentNode.classList.contains('open_product_review')) {
        e.preventDefault();
        openModal('#modalProductReview');
      }

    });
    
    document.addEventListener('scroll', e => {
      const throtte_current = Date.now();
      
      // throttle scroll
      if (throtte_current > throttle_call + throttle_delay) {

        /* hide/show menu on scroll */
        try {
          if (window.pageYOffset > menu.clientHeight) {
            menu.classList.remove('menuContent--opened');
          }
        }
        catch(e){}

        /* update anchors active status */
        updateAnchors();


        /* update throttle (don't touch)*/
        throttle_call = throtte_current;
      }

    });

    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        let modal = get_el('.modal.modal--opened');

        if (!modal) {
          return
        }

        modal.classList.remove('modal--opened');
        setTimeout(() => {
          document.documentElement.classList.remove('blocked');
        }, 400);
      }
    });

    products_custom_row.forEach(el => new Swiper(el, products_custom_slider_params));
    products_default_row.forEach(el => new Swiper(el, products_default_slider_params));

    form_control.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        form_validate.call(form);
      });
    });

    sidebar_opener.forEach(btn => btn.addEventListener('click', toggle_sidebar));


    function colorPicker() {
      let code = this.dataset.color;
      let others;
      let images;

      if (this.closest('.preview__colors')) {
        others = this.closest('.preview__colors').querySelectorAll('.color-picker');
        images = this.closest('.preview__caption').querySelectorAll('.preview__images img');
      } else if (this.closest('.productBigMain__pickers')) {
        others = this.closest('.productBigMain__pickers').querySelectorAll('.color-picker');
        images = this.closest('.productBigMain').querySelectorAll('.productBigMain__images');
      } else if (this.closest('.productMainInfoOptions__content')) {
        others = this.closest('.productMainInfoOptions__content').querySelectorAll('.color-picker');
        images = null;
      } else {
        return
      }

      others.forEach(el => {
        el.classList.remove('active');
      });
      if (images) {
        images.forEach(el => {
          if (el.dataset.color == code) {
            el.classList.remove('hidden');
            el.classList.add('visible');
          } else {
            el.classList.remove('visible')
            el.classList.add('hidden');
          }
        });
      }
      
      this.classList.add('active');
    }

    function tabs() {
      let tab_code = this.dataset.tab;
      let parent = this.closest('.tabs');
      let tab_buttons = parent.querySelectorAll('.tabs__btn');
      let tabs = parent.querySelectorAll('.tabs__content');

      tab_buttons.forEach(el => {
        el.classList.remove('tabs__btn--active');
      });
      tabs.forEach(el => {
        if (el.dataset.tab == tab_code) {
          el.classList.add('tabs__content--active');
        } else {
          el.classList.remove('tabs__content--active')
        }
      });
      this.classList.add('tabs__btn--active');
    }

    function anchor() {
      let data = this.dataset.section;
      let sections = get_el('.anchor-section', false);
      let buttons = this.parentNode.querySelectorAll('.anchor');
      buttons.forEach(btn => {
        setTimeout(() => {
          btn.classList.remove('active');
        }, 400);        
      });
      sections.forEach(section => {
        if (section.dataset.section == data) {
          window.scrollTo({ top: getCoords(section), behavior: 'smooth' });
        }
      });
      setTimeout(() => {
        this.classList.add('active');
      }, 400);
      
    }

    function updateAnchors() {
      const scroll_top = window.pageYOffset;
      const sections = get_el('.anchor-section', false);
      const anchors = get_el('.anchor', false);
      const dead_line = get_el('.productsIntDefault') || get_el('.feedback') || get_el('.footer')

      sections.forEach(section => {
        const section_offset = getCoords(section) - 200;
        const section_data = section.dataset.section;
        if (scroll_top > section_offset) {
          anchors.forEach(anchor => {
            if (anchor.dataset.section == section_data) {
              anchors.forEach(el => {
                el.classList.remove('active');
              });
              anchor.classList.add('active');
            }
          });
        }
        if (scroll_top > getCoords(dead_line) - 200) {
          anchors.forEach(anchor => {
            anchor.classList.remove('active');
          });
        }
      });
    }

    function quantity(action) {
      const parent = this.closest('.quantity');
      const input = parent.querySelector('.quantity__value');

      switch (action) {
        case 'minus':
          input.value != 1 ? input.value = parseInt(input.value) - 1 : null;
          break;
        case 'plus':
          if (input.value.length > 3 || input.value == 999) {
            input.value = 999;
          } else {
            input.value = parseInt(input.value) + 1;
          }
          break;
        default:
          if (this.classList.contains('quantity__value')) {
            let quantity = this.value;
            if (isNaN(+quantity) || quantity[0] == "-") {
              this.value = 1
            } else {
              if (quantity == "" || quantity == 0) {
                this.value = 1;
              }
              if (quantity.length > 3) {
                this.value = quantity.slice(0, 3);
              }
            }
          } else {
            return
          }
      }
    }

    function toggle_sidebar() {
      let _this = this;
      let elem = this.closest('body').querySelector('#live_sidebar');
    
      if (elem) {  
        if (_this.classList.contains('active')) {
          elem.classList.remove('active');
          _this.classList.remove('active');
          document.documentElement.classList.remove('blocked');
          setTimeout(() => {
            _this.style.opacity = 1;
          }, 600);        
        } else {
          elem.classList.add('active');
          _this.style.opacity = 0;
          document.documentElement.classList.add('blocked');
          setTimeout(() => {
            _this.classList.add('active');
          }, 600);
        } 
      } else {
        console.log('target sidebar is not found...');
        return;
      }
    }

    try {
      (() => {
        get_el('input[name=phone]', false).forEach(el => {
          let mask = IMask(el, {
            mask: '+{38}(000)000-00-00'
          });
        });
      })();
    }
    catch(e){};


    try {
      modal_hashs.forEach(hash => {        
        let current_hash = current_url.hash;
        if (current_hash) {
          if (current_hash == hash) {
            openModal(`${hash}`);
          } else {
            console.log('incorrect hash');
          }
        }                
      });
    }
    catch(e){};

  }



  /*
  *** Header
  */
  function header() {

    menu_button.forEach(el => el.addEventListener('click', e => menu.classList.toggle('menuContent--opened')));

  }



  /*
  *** Main page
  */
  function index() {

    const banner = get_el('.banner__slider');
    const popular_buttons = get_el('.populars__buttons');
    const equipment_buttons = get_el('.equipments__buttons');
    const brands_items = get_el('.brands__wrap .container');
    const blog_articles = get_el('.blog .blog__inner');
    let tabs_buttons_slider_params = {
      slidesPerView: 4,
      init: false,
      speed: 200,
      effect: 'slide',
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      slideVisibleClass: 'swiper-slide-visible',
      breakpoints: {
        320: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 4
        }
      }
    };

    
    /* *** main screen slider *** */

    let main_slider = new Swiper(banner, {
      slidesPerView: 1,
      slidesPerColumn: 1,
      loop: false,
      autoHeight: false,
      speed: 600,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 20001111,
        disableOnInteraction: false
      },
      pagination: swiper_pagination
    });

    /* *** end *** */



    /* *** popular products slider *** */

    let popular_buttons_slider = new Swiper(popular_buttons, tabs_buttons_slider_params);
    isMobile ? popular_buttons_slider.init() : null;

    /* *** end *** */



    /* *** equipment products slider *** */

    let equipment_buttons_slider = new Swiper(equipment_buttons, tabs_buttons_slider_params);
    isMobile ? equipment_buttons_slider.init() : null;

    /* *** end *** */



    /* *** brands slider *** */    

    let brands_items_slider = new Swiper(brands_items, {
      slidesPerView: 2,
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
      init: false,
      speed: 200,
      effect: 'slide',
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      slideVisibleClass: 'swiper-slide-visible',
      spaceBetween: 24,
      pagination: swiper_pagination
    });
    isMobile ? brands_items_slider.init() : null;

    /* *** end *** */



    /* *** blog articles slider *** */  

    let blog_articles_slider = new Swiper(blog_articles, {
      slidesPerView: 3,
      loop: false,
      speed: 200,
      effect: 'slide',
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      slideVisibleClass: 'swiper-slide-visible',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: swiper_pagination,
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        600: {
          slidesPerView: 2
        },
        1440: {
          slidesPerView: 3
        }
      }
    });

    /* *** end *** */

  

    /* *** AOS - animation on scroll *** */ 
    /*
      * enabled on a desktop only
      * if mobile - don't init
      * if error script - remove style from DOM & throw error to try_fn wrapper
      * styles don't working in screens less than 768px    
    */

    try {
      // throw ('111');
      !isMobile ? AOS.init() : null;
    }
    catch(e) {
      get_el('link', false).forEach(link => {
        if (link.dataset.style == 'aos') {
          link.remove();
          console.log('aos style link has been removed');
        }
      });
      throw new Error('aos is not defined...');
    }

    /* *** end *** */

  }


  
  /*
  *** Catalog page
  */
  function catalog() {
    const ui_slider = get_el('#ui_slider');
    const childs_wrap = get_el('.catalogChilds .swiper-container');

    let {max: ui_max,min: ui_min,step: ui_step} = ui_slider.dataset;
    let ui_subs = [
      get_el('.filter__priceSubMin'), 
      get_el('.filter__priceSubMax')
    ];
    let ui_vals = [
      get_el('.filter__min'), 
      get_el('.filter__max')
    ];

    noUiSlider.create(ui_slider, {
        start: [+ui_min, +ui_max],
        step: +ui_step,
        connect: true,
        range: {
            'min': +ui_min,
            'max': +ui_max
        },
        format: {
          to: function (value) {
            return parseInt(value)
          },
          from: function (value) {
            return parseInt(value)
          }
        }
    });

    ui_slider.noUiSlider.on('update', function (values, handle) {
      ui_subs[handle].innerText = values[handle];
      ui_vals[handle].value = values[handle];
    });


    ui_vals.forEach((el, handle) => {
      el.addEventListener('change', function () {
        ui_slider.noUiSlider.setHandle(handle, this.value);
      });
    });

    let childs_slider = new Swiper(childs_wrap, {
      slidesPerView: 2,
      init: false,
      speed: 200,
      effect: 'slide',
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      slideVisibleClass: 'swiper-slide-visible',
      pagination: swiper_pagination,
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        }
      }
    });    

    isMobile ? childs_slider.init() : null;
    
  }


  /*
  *** Product pages
  */
  function product_big() {

    const adv_photos = get_el('.productPresentSlider');
    const payment_delivery = get_el('.productDelivery__content');
    const slot = get_el('.productBigSlot');
    const feedback = get_el('.feedback');
    const footer = get_el('.footer');
    const nav_opener = get_el('.productBigNav__btn');
    const present_images = get_el('.productPresentInfo__images');
    const complect_images = get_el('.productComplectation__photos');

    // slider for product advanced advantages
    let adv_timer;
    let adv_slider = new Swiper(adv_photos, {
      slidesPerView: 5,
      loop: true,
      autoHeight: false,
      speed: 400,
      init: false,
      spaceBetween: 24,
      centeredSlides: true,
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      slideVisibleClass: 'swiper-slide-visible',
      autoplay: {
        delay: 4022200,
        disableOnInteraction: false
      },
      pagination: swiper_pagination,
      on: {
        init: function () { caption_debounce.call(this) },
        slideChangeTransitionStart: function () { caption_debounce.call(this) },
        sliderMove: function () { caption_debounce.call(this) }
      },
      breakpoints: {
        1440: {
          slidesPerView: 5
        },
        1224: {
          slidesPerView: 4
        },
        992: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        },
        320: {
          slidesPerView: 1,
          centeredSlides: false
        }
      }
    });

    adv_slider.init();

    function caption_debounce() {
      let f = updateCaption.bind(this);
      clearTimeout(adv_timer);
		  adv_timer = setTimeout(f, 200);
    }

    function updateCaption() {
      let caption = this.$el[0].querySelector('.productPresentSlider__caption');
      let caption_title = caption.querySelector('.productPresentSlider__title');
      let caption_content = caption.querySelector('.productPresentSlider__content');
      let slide = this.slides[this.activeIndex];
      let title = slide.querySelector('.title').innerText;
      let content = slide.querySelector('.content').innerText;
      
      let caption_anim = caption.animate([{ opacity: '1' },{ opacity: '0' }], {duration: 200});
      caption_anim.addEventListener('finish', () => {
        caption_title.innerText = title;
        caption_content.innerText = content;
        caption.animate([{ opacity: '0' },{ opacity: '1' }], {duration: 200});
      });      
    }
    // end advantages slider


    let params = {
      slidesPerView: 1,
      loop: false,
      autoHeight: false,
      speed: 200,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 20001111,
        disableOnInteraction: false
      },
      pagination: swiper_pagination
    };

    let payment_delivery_slider = new Swiper(payment_delivery, params);    
    let present_images_slider = new Swiper(present_images, {...params, loop: true, init: false});
    let complect_images_slider = new Swiper(complect_images, {...params, loop: true, init: false});

    isMobile ? present_images_slider.init() : null;
    isMobile ? complect_images_slider.init() : null;


    // init 360 view
    window.CI360.init();


    /* hide/show slot on scroll */
    window.addEventListener('scroll', e => {
      try {      
        window.pageYOffset > header_height ? slot.classList.add('productBigSlot--show') : null;
        if (feedback) {
          const feedback_offset = getCoords(feedback) - feedback.scrollHeight;
          window.pageYOffset > feedback_offset ? slot.classList.remove('productBigSlot--show') : null;
        } else {
          const footer_offset = getCoords(footer) - footer.scrollHeight;
          window.pageYOffset > footer_offset ? slot.classList.remove('productBigSlot--show') : null;
        }
      }
      catch(e) {}
    });

    /* hide/show navigation */
    nav_opener.addEventListener('click', function() {
      this.closest('.productBigNav').classList.toggle('productBigNav--opened');
    }); 

  }

  function product() {

    /* product images gallery */
    let product_nav = new Swiper('.productMainImages__nav', {
      spaceBetween: 8,
      slidesPerView: 5,
      spaceBetween: 55,
      breakpoints: {
        1223: {
          slidesPerView: 5
        },
        992: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3
        },
        320: {
          slidesPerView: 5,
          spaceBetween: 30
        }

      }
    });
    let product_thumb = new Swiper('.productMainImages__thumb', {
      thumbs: {
        swiper: product_nav
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
    });

    /* product delivery tab */
    const payment_delivery_product = get_el('.productDelivery__content');
    let payment_delivery_product_slider = new Swiper(payment_delivery_product, {
      slidesPerView: 1,
      speed: 200,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      observer: true,
      observeParents: true,
      pagination: swiper_pagination
    });

    /* product review anchor */
    const goto_reviews = get_el('.goto_reviews', false);
    const tab = get_el('.productReviews');
    const rev_tab_btn = get_el('.productTabs__btn--reviews');
    goto_reviews.forEach(el => {
      el.addEventListener('click', e => {
        if (tab && rev_tab_btn) {
          rev_tab_btn.click();
          window.scrollTo({ top: getCoords(tab), behavior: 'smooth' });
        }      
      });
    });    

    let tabs_buttons_slider = new Swiper('.productTabs__buttons', {
      slidesPerView: 3,
      init: false,
      speed: 200,
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      slideVisibleClass: 'swiper-slide-visible',
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        500: {
          slidesPerView: 3
        }
      }
    });
    isMobile ? tabs_buttons_slider.init() : null;

  }



  /*
  *** Cart page
  */
  function cart() {
    const wish_all = get_el('#add_to_wish_all');
    const delete_all = get_el('#cart_del_all');

    // add to wishilst all products
    wish_all.addEventListener('click', e => {
      wish_all.disabled = true;
      wish_all.classList.add('active');
      get_el('.preview', false).forEach(product => product.querySelector('.preview__wishlist').click());
      console.log('cart add all to wish button click...');
    });
    // delete all products
    delete_all.addEventListener('click', e => {
      get_el('.preview', false).forEach(product => product.querySelector('.preview__delete').click());
    });

  }



  /*
  *** Checkout
  */
  function checkout() {
    const checkout_pick = get_el('.checkoutStep__pick', false);
    const checkout_pick_child = get_el('.checkoutStepItem__child input[type=radio]', false);
    const form = get_el('#checkoutForm');
    const nav_items = get_el('.breadcrumbs__item', false);
    const steps = get_el('.checkoutStep', false);
    const customer_step = get_el('.checkoutCustomer');
    const delivery_step = get_el('.checkoutDelivery');
    const payment_step = get_el('.checkoutPayment');
    const customer_btn = get_el('#customer_btn');
    const delivery_btn = get_el('#delivery_btn');
    const order_btn = get_el('#order_btn');
    const back_to_customer = get_el('.back_to_customer', false);
    const back_to_delivery = get_el('.back_to_delivery', false);
    const customer_summary = get_el('.checkoutSummary__customer');
    const delivery_summary = get_el('.checkoutSummary__delivery');

    /* block submit form && show formdata */
    form.onsubmit = e => {
      e.preventDefault();
      let data = new FormData(form);
      for (key of data.keys()) {
        if (e.submitter == order_btn) {
          console.log(`${key}: ${data.get(key)}`);
        }        
      }
    }

    /* 
      - toggle item active status
      - select first child radio button if it will be found
      - clear required inputs when radio change
    */
    checkout_pick.forEach(el => {
      el.addEventListener('change', e => {
        let root = el.closest('.checkoutStepItems');
        let current = el.closest('.checkoutStepItem');
        let current_radios = current.querySelectorAll('.checkoutStepItem__child input[type=radio]');

        root.querySelectorAll('.checkoutStepItem').forEach(item => {
          let radios = item.querySelectorAll('.checkoutStepItem__child input[type=radio]');
          let fields = item.querySelectorAll('.required');

          item.classList.remove('active');
          radios.forEach(radio => {
            radio.checked = false;
          });
          fields.forEach(field => {
            field.value = null;
            field.classList.remove('input--err','input--ok')
          });
        });

        current.classList.add('active');
        if (current_radios.length) {
          current_radios[0].checked = true;
        }
      })
    });

    /* clear child required inputs when radio change */
    checkout_pick_child.forEach(el => {
      el.addEventListener('change', e => {
        let root = el.closest('.checkoutStepItem__child');
        let current = el.closest('.checkoutStepItem__radio');

        root.querySelectorAll('.checkoutStepItem__radio').forEach(item => {
          let fields = item.querySelectorAll('.required');
          fields.forEach(field => {
            field.value = null;
            field.classList.remove('input--err','input--ok')
          });
        });
      })
    });


    customer_btn.addEventListener('click', step_customer);
    delivery_btn.addEventListener('click', step_delivery);
    order_btn.addEventListener('click', step_order);

    back_to_customer.forEach(btn => btn.addEventListener('click', e => {
      customer_summary.classList.remove('active');
      update(customer_step);
    }));
    back_to_delivery.forEach(btn => btn.addEventListener('click', e => {      
      delivery_summary.classList.remove('active');
      update(delivery_step);
    }));

    

    function step_customer() {
      let summary_fields = customer_step.querySelectorAll('input:not(.checkbox)');
      let required_fields = customer_step.querySelectorAll('.required');
      let result = validate(required_fields);      
      
      if (result) {
        update(delivery_step);
        summary(customer_summary, summary_fields);
      }
    }

    function step_delivery() {
      let summary_fields = delivery_step.querySelectorAll('input[name=delivery]:checked, input[name=new_post_address]')
      let checked_radios = delivery_step.querySelectorAll('input[type=radio]:checked');
      let required_fields = [];      

      checked_radios.forEach(radio => {
        let fields = radio.closest('.checkoutStepItem__radio').querySelectorAll('.required');
        if (fields.length) {
          fields.forEach(field => required_fields.push(field));
        }
      });

      let result = validate(required_fields);    
      if (result) {
        update(payment_step);
        summary(delivery_summary, summary_fields);
      }
    }

    function step_order() {    
      let checked_radios = payment_step.querySelectorAll('input[type=radio]:checked');
      let required_fields = [];

      checked_radios.forEach(radio => {
        let fields = radio.closest('.checkoutStepItem__radio').querySelectorAll('.required');
        if (fields.length) {
          fields.forEach(field => required_fields.push(field));
        }
      });  
      
      let result = validate(required_fields);
      
      if (result) {
        /* 
          success validation all steps
          ajax send data or submit #checkoutForm...
        */

        document.location.pathname = 'success.html';
      }
    }

    function validate(fields) {
      let result = null;

      if (fields.length) {
        fields.forEach(field => {
          if (field.value == '') {
            field.classList.remove('input--ok');
            field.classList.remove('input--err');
            setTimeout(() => {
              field.classList.add('input--err');
            }, 0);          
            result = false;
          } else {
            field.classList.remove('input--err');
            field.classList.add('input--ok');
            result != false ? result = true : null;
          }
        });
      } else {
        result = true;
      }

      return result;
    }

    function update(s) {
      let step_id = s.dataset.step;

      steps.forEach(s => s.classList.remove('active'));
      s.classList.add('active');
      if (step_id) {
        nav_items.forEach(item => {          
          if (item.dataset.step == step_id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }

    function summary(item, fields) {
      let summary_row = item.querySelector('.checkoutSummary__data');

      item.classList.add('active');
      summary_row.innerText = null;
      fields.forEach(field => {
        let s = document.createElement('span');
        if (field.value != '') {          
          s.innerText = field.value;
        } else {
          s.innerText = '-';
        }
        summary_row.appendChild(s);        
      });
    }

  }



  /*
  *** Compare
  */
  function compare() {
    const change_category = get_el('.change_category', false);
    const change_sort = get_el('.compareContent__sort .radio', false);
    const chars = get_el('.compareChars');
    const chars_tabs = get_el('.compareChars__tab', false);

    const compare_slider = new Swiper('.compareContent__products', {
      slidesPerView: 3,
      speed: 200,
      spaceBetween: 24,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.compare_next',
        prevEl: '.compare_prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        500: {
          slidesPerView: 3
        },
        1224: {
          slidesPerView: 3
        }
      }
    });

    const compare_chars_slider = new Swiper('.compareChars__cols', {
      slidesPerView: 3,
      speed: 200,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        500: {
          slidesPerView: 3
        },
        1224: {
          slidesPerView: 3
        }
      }
    });


    // synchronization sliders
    compare_slider.forEach((slider, i) => slider.controller.control = compare_chars_slider[i]);
    compare_chars_slider.forEach((slider, i) => slider.controller.control = compare_slider[i]);


    change_category.forEach(btn => {
      btn.addEventListener('click', e => {
        if (!btn.classList.contains('active') && btn.dataset.id) {        
          let id = btn.dataset.id;
          let tabs = get_el('.compareContent__tab', false);
          let chars = get_el('.compareChars__tab', false);
          let buttons = get_el('.change_category', false);

          buttons.forEach(el => el.dataset.id == id ? el.classList.add('active') : el.classList.remove('active'));
          tabs.forEach(tab => tab.dataset.id == id ? tab.classList.add('active') : tab.classList.remove('active'));
          chars.forEach(char => char.dataset.id == id ? char.classList.add('active') : char.classList.remove('active'));
        } else {
          console.log('repeated click && not set data-id attr');
          return
        }
      })
    });

    change_sort.forEach(sort => sort.addEventListener('change', compare_sort.bind(sort)));

    function compare_sort() {
      let cols = get_el('.compareChars__col', false);

      if (this.value == 'differences') {
        chars.classList.add('differences');
      } else {
        chars.classList.remove('differences');
      }

      cols.forEach(col => {
        let next_col = col.nextSibling.nextSibling;
        let names = col.closest('.compareChars__tab').querySelectorAll('.compareChars__name');
        if (next_col) {
          let current_values = col.querySelectorAll('.compareChars__value');
          let next_values = next_col.querySelectorAll('.compareChars__value');
          
          current_values.forEach((val, i) => {
            if (val.innerText != next_values[i].innerText) {
              cols.forEach(el => {
                el.querySelectorAll('.compareChars__value')[i].classList.add('no_match');
                names[i].classList.add('no_match');
              });
            }
          });
        }
      });

      chars_tabs.forEach(el => {
        let names = el.querySelectorAll('.compareChars__name.no_match');
        let cols = el.querySelectorAll('.compareChars__col');

        names.forEach((name, i) => {
          if (i % 2) {
            name.classList.add('even');
          } else {
            name.classList.add('odd');
          }
        });

        cols.forEach(col => {
          col.querySelectorAll('.compareChars__value.no_match').forEach((val, i) => {
            if (i % 2) {
              val.classList.add('even');
            } else {
              val.classList.add('odd');
            }
          });
        })
      })
    }

  }



  /*
  *** Account base
  */
  function account() {}



  /*
  *** Account info
  */
  function account_info() {

    // user contacts
    const edit_info = get_el('.change_info');
    const save_info = get_el('.save_info');
    const cancel_info = get_el('.cancel_info');
    const user_info = get_el('#user_contacts');
    const inputs = user_info.querySelectorAll('.input');
    let current_info = {};

    edit_info.addEventListener('click', function(e) { 
      inputs.forEach(el => {
        current_info[el.name] = el.value;
      });

      if (!user_info.classList.contains('editing')) {
        user_info.classList.add('editing');
        inputs.forEach(input => input.readOnly = false);        
        this.disabled = true;
        this.classList.add('active');
      }     
    });

    save_info.addEventListener('click', e => {
      let result = form_validate.call(user_info, true);

      if (result) {
        disable_info();
      
        let new_data = new FormData(user_info);
        // for (key of new_data.keys()) {
        //   console.log(`${key}: ${new_data.get(key)}`);      
        // }

        /* ajax save here...... */
      }
    });

    cancel_info.addEventListener('click', e => {
      inputs.forEach(el => el.value = current_info[el.name]);
      disable_info();
    });


    function disable_info() {
      user_info.classList.remove('editing');
      inputs.forEach(input => input.readOnly = true);
      edit_info.disabled = false;
      edit_info.classList.remove('active');
    }




    // user addresses
    const edit_address = get_el('.change_addresses');
    const user_addresses = get_el('#user_addresses');
    const save_address = get_el('.save_address');
    const cancel_address = get_el('.cancel_address');
    const edit_form = get_el('#addresses_edit');
    const inputs_address = edit_form.querySelectorAll('.input');
    const address_adding_row = get_el('.accountAddressesChange__row--new');
    let current_addresses = {};

    edit_form.onsubmit = e => e.preventDefault();

    edit_address.addEventListener('click', function(e) { 
      inputs_address.forEach(el => current_addresses[el.name] = el.value);

      if (!user_addresses.classList.contains('editing')) {
        user_addresses.classList.add('editing');
      } 
      this.disabled = true;
      this.classList.add('active');
    });

    save_address.addEventListener('click', e => {
      let flag = null;

      inputs_address.forEach(el => {
        if (!el.disabled) {
          if (el.value == '') {
            el.classList.remove('input--err');
            setTimeout(() => {
              el.classList.add('input--err');
            }, 0);
            flag = false;
          } else {
            el.classList.remove('input--err');
            flag != false ? flag = true : null;
          }
        }        
      });

      if (flag) {
        let new_data = new FormData(edit_form);
        for (key of new_data.keys()) {
          console.log(`${key}: ${new_data.get(key)}`);      
        }

        disable_addresses();
        adding_fields(false);

        /* ajax save here...... */
      }

      
    });

    cancel_address.addEventListener('click', e => {
      inputs_address.forEach(el => el.value = current_addresses[el.name]);
      disable_addresses();
      adding_fields(false);
    });

    /* for dynamic buttons */
    document.addEventListener('click', e => {

      // change address radio
      if (e.target.name == 'address') {
        let current_address = e.target.value;
        let current_id = e.target.dataset.address_id;

        console.log(`${current_address} (id=${current_id})`);
        /* ajax change default address here...... */
      }


      // change active address (call a trigger radio button)
      if (e.target.classList.contains('change_active')) {
        let id = e.target.dataset.address;
        let address = e.target.innerText;
        e.target.closest('.dropdown').querySelector('.dropdown__btn').innerText = address;
        get_el(`.radio#${id}`).click();
      }


      // delete address
      if (e.target.classList.contains('address_delete') || e.target.parentNode.classList.contains('address_delete')) {
        let address_id = null;
        if (e.target.classList.contains('address_delete')) {
          address_id = parseInt(e.target.dataset.id);
        } else {
          address_id = parseInt(e.target.parentNode.dataset.id)
        }

        console.log(address_id);
        /* ajax delete here...... */
      }


      // show address add row fields
      if (e.target.classList.contains('address_add') || e.target.parentNode.classList.contains('address_add')) {
        adding_fields(true);        
      }
      

      // add new address button
      if (e.target.classList.contains('add_address')) {
        edit_address.click();
        adding_fields(true, true);        
      }

    });

    function disable_addresses() {
      user_addresses.classList.remove('editing');
      edit_address.disabled = false;
      edit_address.classList.remove('active');
      inputs_address.forEach(el => el.classList.remove('input--err'));
    }

    function adding_fields(action, trigger = false) {
      let fields = address_adding_row.querySelectorAll('.input');
      if (action) {
        address_adding_row.classList.add('active');
        trigger ? window.scrollTo({ top: getCoords(address_adding_row) - 200, behavior: 'smooth' }) : null;
        fields.forEach(el => {
          el.disabled = false;
          trigger ? el.classList.add('input--err') : null;
        });
      } else {
        address_adding_row.classList.remove('active');
        fields.forEach(el => {
          el.disabled = true;
          el.value = null;
        });
      }
    }

  }



  /*
  *** Account orders
  */
  function account_orders() {

    document.addEventListener('click', e => {
      if (e.target.classList.contains('open_order') || e.target.parentNode.classList.contains('open_order')) {
        e.target.closest('.accountOrder').classList.toggle('active');
      }
    });
  }



  /*
  *** Article page
  */
  function article_page() {
    const rate_buttons = get_el('.article_rate', false);

    rate_buttons.forEach(btn => {
      let rate_index = +btn.dataset.rate;

      btn.addEventListener('mouseenter', e => {
        e.preventDefault();
        btn.classList.add('hover');
        for(let el of rate_buttons) {
          if (!el.classList.contains('hover')) {
            el.classList.add('hover');
          } else {
            break;
          }
        }
      });

      btn.addEventListener('mouseleave', e => {
        e.preventDefault();
        rate_buttons.forEach(el => el.classList.remove('hover'));
      });

      btn.addEventListener('click', e => {
        let rate_title = btn.parentNode.querySelector('.rate_title');
        let rated_title = rate_title.dataset.rated;

        if (rated_title) {
          rate_title.innerText = rated_title;
          rate_title.classList.add('active');
        }

        btn.classList.add('active');

        for(let el of rate_buttons) {          
          if (!el.classList.contains('active')) {
            el.classList.add('active');
          } else {
            break;
          }
        }

        rate_buttons.forEach(el => el.disabled = true);

        console.log(rate_index);
      });
      
    });
  }



  /*
  *** Info pages
  */
  function info() {
    const gallery = get_el('.gallery .swiper-container');
    const credit_news = get_el('.creditPage .news .swiper-container');

    let params = {
      slidesPerView: 2,
      init: false,
      speed: 200,
      spaceBetween: 16,
      effect: 'slide',
      watchSlidesVisibility: true,
      observer: true,
      observeParents: true,
      slideVisibleClass: 'swiper-slide-visible',
      pagination: swiper_pagination
    };

    let gallery_slider = new Swiper(gallery, {...params,
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        500: {
          slidesPerView: 2
        }
      }
    });   
    
    let credit_news_slider = new Swiper(credit_news, {...params,
      slidesPerView: 1
    }); 

    isMobile ? gallery_slider.init() : null;
    isMobile ? credit_news_slider.init() : null;
  }



  /*
  *** Footer
  */
  function footer() {
    let menu_opener = get_el('.footer__opener', false);

    menu_opener.forEach(el => {
      el.addEventListener('click', e => {
        let parent = el.closest('.footer__col');
        let list = parent.querySelector('.footer__list');
        let list_height = list.scrollHeight;

        slide(list, parent, 'footer__col--opened', list_height);
      });
    });
  }

});