var default_color      = 'grey';
var primary_color      = 'darken-3 blue-grey';
var secondary_color    = 'darken-1 red';
var main_content_color = 'light';
var aux_content_color  = 'grey-text text-lighten-4';
var aux_special_color  = 'white-text';

var primary_text_color   = primary_color   + '-text';
var secondary_text_color = secondary_color + '-text';

var substitutions = [
    {
        semantic: ['a.action-button', ],
        styling:  [primary_color, 'btn-large', 'waves-effect', 'waves-light', ],
    },

    {
        semantic: ['nav', ],
        styling:  [secondary_color, ],
    },
    {
        semantic: ['nav ul#nav-mobile', ],
        styling:  ['side-nav', ],
    },
    {
        semantic: ['nav ul.nav-desktop', ],
        styling:  ['right', 'hide-on-med-and-down', 'list-no-dot', ],
    },

    {
        semantic: ['header', ],
        styling:  ['section', 'no-pad-bot', ],
    },
    {
        semantic: ['header div', ],
        styling:  ['row', 'center', ],
    },
    {
        semantic: ['header h1', 'header h2', 'header h3', ],
        styling:  [primary_text_color, 'header', 'center', ],
    },
    {
        semantic: ['header h4', 'header h5', 'header h6', 'body p', ],
        styling:  [main_content_color, ],
    },

    {
        semantic: ['main', ],
        styling:  ['row', ],
    },
    {
        semantic: ['main h1', 'main h2:not(:has(i))', 'main h3', ],
        styling:  [primary_text_color, 'center', ],
    },
    {
        semantic: ['main h2:has(i)', ],
        styling:  [secondary_text_color, 'center', ],
    },
    {
        semantic: ['main section', ],
        styling:  ['row', ],
    },
    {
        semantic: ['main article', ],
        styling:  ['col', 's12', 'm4', ],
    },
    {
        semantic: ['main article h1', 'main article h2', 'main article h3', 'main article h4', 'main article h5', 'main article h6', ],
        styling:  ['center', ],
    },

    {
        semantic: ['footer', ],
        styling:  [primary_color, ],
    },
    {
        semantic: ['footer section', ],
        styling:  ['row', ],
    },
    {
        semantic: ['footer a', 'footer h1', 'footer h2', 'footer h3', 'footer h4', 'footer h5', 'footer h6', 'footer div'],
        styling:  [aux_special_color, ],
    },
    {
        semantic: ['footer div', ],
        styling:  ['col', 's12', 'm5', 'l3'],
    },
    {
        semantic: ['footer article:not(.linklist)', ],
        styling:  ['col', 's12', 'l6', ],
    },
    {
        semantic: ['footer article.linklist', ],
        styling:  ['col', 's12', 'm6', 'l3', ],
    },
    {
        semantic: ['footer article p'],
        styling:  [aux_content_color, ],
    },
    {
        semantic: ['footer section.footer-copyright a'],
        styling:  [primary_text_color, 'text-lighten-3', ],
    },
];

function formatBySemantics($context){
    if(($context instanceof jQuery) === false){throw "Invalid Argument, Expected jQuery Object";}

    for(var i in substitutions){
        var sub = substitutions[i];
        var semantics = [].concat(sub.semantic);
        for(var j in semantics){
            $context.find($(semantics[j])).removeClass(default_color).addClass(sub.styling.join(' '));
        }
    }
}

function isElementInViewport (el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
        rect.top    >= 0 &&
        rect.left   >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right  <= (window.innerWidth  || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

var scrollLock = false;

function redraw(){
    var f = $('.late-load:first');
    if(f.length !== 0 && !scrollLock && isElementInViewport(f))
    {
        scrollLock = true;
        f.removeClass('late-load');
        var url = f.data('page');
        if(url){
            $.ajax(url)
                .done(function(data){
                    f.replaceWith(data);
                    formatBySemantics($('body'));
                })
                .always(function(){
                    scrollLock = false;
                    redraw();
                })
            ;
        } else {
            scrollLock = false;
        }
    }
}

(function($){                                          // create safe jQuery namespace
  $(function(){                                        // document.ready

    $('.button-collapse').sideNav();                   // wire up button to nav bar
    $('#nav-mobile').append($('.nav-desktop').html()); // copy menu items to mobile sideNav menu

    formatBySemantics($('body'));

    $(window).on('DOMContentLoaded load resize scroll', redraw); // infinite scroll sections

  }); // end of document.ready
})(jQuery); // end of jQuery namespace
