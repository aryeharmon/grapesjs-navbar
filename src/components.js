export default (editor, opt = {}) => {
  const c = opt;
  const dc = editor.DomComponents;
  const defaultType = dc.getType('default');
  const defaultModel = defaultType.model;
  const burgerType = 'burger-menu';

  dc.addType(burgerType, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        'custom-name': c.labelBurger,
        draggable: false,
        droppable: false,
        copyable: false,
        removable: false,
        script: function () {
          var transEndAdded;
          var isAnimating = 0;
          var stringCollapse = 'gjs-collapse';
          var clickEvent = 'click';
          var transitProp = 'max-height';
          var transitTiming = 'ease-in-out';
          var transitSpeed = 0.25;

          var getTransitionEvent = function() {
            var t, el = document.createElement('void');
            var transitions = {
              'transition': 'transitionend',
              'OTransition': 'oTransitionEnd',
              'MozTransition': 'transitionend',
              'WebkitTransition': 'webkitTransitionEnd'
            }

            for (t in transitions) {
              if (el.style[t] !== undefined){
                return transitions[t];
              }
            }
          }

          var transitEndEvent = getTransitionEvent();

          var getElHeight = function(el) {
            var style = window.getComputedStyle(el);
            var elDisplay = style.display;
            var elPos = style.position;
            var elVis = style.visibility;
            var currentHeight = style.height;
            var elMaxHeight = parseInt(style[transitProp]);

            if (elDisplay !== 'none' && elMaxHeight !== '0') {
              return el.offsetHeight;
            }

            el.style.height = 'auto';
            el.style.display = 'block';
            el.style.position = 'absolute';
            el.style.visibility = 'hidden';
            var height = el.offsetHeight;
            el.style.height = '';
            el.style.display = '';
            el.style.position = '';
            el.style.visibility = '';

            return height;
          };

          var toggleSlide = function(el) {
            isAnimating = 1;
            var elMaxHeight = getElHeight(el);
            var elStyle = el.style;
            elStyle.display = 'block';
            elStyle.transition = transitProp + ' ' + transitSpeed + 's ' + transitTiming;
            elStyle.overflowY = 'hidden';

            if (elStyle[transitProp] == '') {
              elStyle[transitProp] = 0;
            }

            if (parseInt(elStyle[transitProp]) == 0) {
              elStyle[transitProp] = '0';
              setTimeout(function() {
                  elStyle[transitProp] = elMaxHeight + 'px';
              }, 10);
            } else {
              elStyle[transitProp] = '0';
            }
          }

          var toggle = function(e) {
            e.preventDefault();

            if (isAnimating) {
              return;
            }

            var navParent = this.closest(`[data-gjs=navbar]`);
            var navItems = navParent.querySelector(`[data-gjs=navbar-items]`);
            toggleSlide(navItems);

            if (!transEndAdded) {
              navItems.addEventListener(transitEndEvent, function() {
                isAnimating = 0;
                var itemsStyle = navItems.style;
                if (parseInt(itemsStyle[transitProp]) == 0) {
                  itemsStyle.display = '';
                  itemsStyle[transitProp] = '';
                }
              });
              transEndAdded = 1;
            }
          };

          if ( !(stringCollapse in this ) ) {
            this.addEventListener(clickEvent, toggle);
          }

          this[stringCollapse] = 1;
        },
      }),
    }, {
      isComponent(el) {
        if(el.getAttribute &&
          el.getAttribute('data-gjs-type') == burgerType) {
          return {type: burgerType};
        }
      },
    }),
    view: defaultType.view,
  });

  var animations = [
    { value: 'bounce', name: 'bounce'},
    { value: 'flash', name: 'flash'},
    { value: 'pulse', name: 'pulse'},
    { value: 'rubberBand', name: 'rubberBand'},
    { value: 'shake', name: 'shake'},
    { value: 'swing', name: 'swing'},
    { value: 'tada', name: 'tada'},
    { value: 'wobble', name: 'wobble'},
    { value: 'jello', name: 'jello'},
    { value: 'bounceIn', name: 'bounceIn'},
    { value: 'bounceInDown', name: 'bounceInDown'},
    { value: 'bounceInLeft', name: 'bounceInLeft'},
    { value: 'bounceInRight', name: 'bounceInRight'},
    { value: 'bounceInUp', name: 'bounceInUp'},
    { value: 'bounceOut', name: 'bounceOut'},
    { value: 'bounceOutDown', name: 'bounceOutDown'},
    { value: 'bounceOutLeft', name: 'bounceOutLeft'},
    { value: 'bounceOutRight', name: 'bounceOutRight'},
    { value: 'bounceOutUp', name: 'bounceOutUp'},
    { value: 'fadeIn', name: 'fadeIn'},
    { value: 'fadeInDown', name: 'fadeInDown'},
    { value: 'fadeInDownBig', name: 'fadeInDownBig'},
    { value: 'fadeInLeft', name: 'fadeInLeft'},
    { value: 'fadeInLeftBig', name: 'fadeInLeftBig'},
    { value: 'fadeInRight', name: 'fadeInRight'},
    { value: 'fadeInRightBig', name: 'fadeInRightBig'},
    { value: 'fadeInUp', name: 'fadeInUp'},
    { value: 'fadeInUpBig', name: 'fadeInUpBig'},
    { value: 'fadeOut', name: 'fadeOut'},
    { value: 'fadeOutDown', name: 'fadeOutDown'},
    { value: 'fadeOutDownBig', name: 'fadeOutDownBig'},
    { value: 'fadeOutLeft', name: 'fadeOutLeft'},
    { value: 'fadeOutLeftBig', name: 'fadeOutLeftBig'},
    { value: 'fadeOutRight', name: 'fadeOutRight'},
    { value: 'fadeOutRightBig', name: 'fadeOutRightBig'},
    { value: 'fadeOutUp', name: 'fadeOutUp'},
    { value: 'fadeOutUpBig', name: 'fadeOutUpBig'},
    { value: 'flip', name: 'flip'},
    { value: 'flipInX', name: 'flipInX'},
    { value: 'flipInY', name: 'flipInY'},
    { value: 'flipOutX', name: 'flipOutX'},
    { value: 'flipOutY', name: 'flipOutY'},
    { value: 'lightSpeedIn', name: 'lightSpeedIn'},
    { value: 'lightSpeedOut', name: 'lightSpeedOut'},
    { value: 'rotateIn', name: 'rotateIn'},
    { value: 'rotateInDownLeft', name: 'rotateInDownLeft'},
    { value: 'rotateInDownRight', name: 'rotateInDownRight'},
    { value: 'rotateInUpLeft', name: 'rotateInUpLeft'},
    { value: 'rotateInUpRight', name: 'rotateInUpRight'},
    { value: 'rotateOut', name: 'rotateOut'},
    { value: 'rotateOutDownLeft', name: 'rotateOutDownLeft'},
    { value: 'rotateOutDownRight', name: 'rotateOutDownRight'},
    { value: 'rotateOutUpLeft', name: 'rotateOutUpLeft'},
    { value: 'rotateOutUpRight', name: 'rotateOutUpRight'},
    { value: 'slideInUp', name: 'slideInUp'},
    { value: 'slideInDown', name: 'slideInDown'},
    { value: 'slideInLeft', name: 'slideInLeft'},
    { value: 'slideInRight', name: 'slideInRight'},
    { value: 'slideOutUp', name: 'slideOutUp'},
    { value: 'slideOutDown', name: 'slideOutDown'},
    { value: 'slideOutLeft', name: 'slideOutLeft'},
    { value: 'slideOutRight', name: 'slideOutRight'},
    { value: 'zoomIn', name: 'zoomIn'},
    { value: 'zoomInDown', name: 'zoomInDown'},
    { value: 'zoomInLeft', name: 'zoomInLeft'},
    { value: 'zoomInRight', name: 'zoomInRight'},
    { value: 'zoomInUp', name: 'zoomInUp'},
    { value: 'zoomOut', name: 'zoomOut'},
    { value: 'zoomOutDown', name: 'zoomOutDown'},
    { value: 'zoomOutLeft', name: 'zoomOutLeft'},
    { value: 'zoomOutRight', name: 'zoomOutRight'},
    { value: 'zoomOutUp', name: 'zoomOutUp'},
    { value: 'hinge', name: 'hinge'},
    { value: 'jackInTheBox', name: 'jackInTheBox'},
    { value: 'rollIn', name: 'rollIn'},
    { value: 'rollOut', name: 'rollOut'},
  ];



  dc.addType('navigation', {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        type: 'navigation3',
        tagName: 'dov',
        traits: [
          {
            type: 'number',
            label: 'width',
            name: 'width',
            default: '300',
          },
          {
            type: 'select',
            label: 'animate-nav',
            name: 'animate-nav',
            options: [
              { value: 'false', name: 'false' },
              { value: 'true', name: 'true' },
            ]
          },
          {
            type: 'select',
            label: 'Direction',
            name: 'direction',
            options: [
              { value: 'right', name: 'right' },
              { value: 'left', name: 'left' },
            ]
          },
          {
            type: 'select',
            label: 'Animation In',
            name: 'animation-in',
            options: animations,
          },
          {
            type: 'select',
            label: 'Animation Out',
            name: 'animation-out',
            options: animations,
          },
        ],
      }),
    }, {
      isComponent(el) {
        if( el && $(el).hasClass('navbar-items-c')) {
          return {type: 'navigation'};
        }
      },
    }),
    view: defaultType.view,
  });
}
