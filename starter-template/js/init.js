(function($){
  $(function(){

    $('.button-collapse').sideNav(); // wire up button to nav bar

    var default_color   = 'grey';
    var primary_color   = 'orange';
    var secondary_color = 'light-blue';

    var primary_text_color   = primary_color   + '-text';
    var secondary_text_color = secondary_color + '-text';

    var main_content_color = 'light';
    var aux_content_color  = 'grey-text text-lighten-4';
    var aux_special_color  = 'white-text';

    $('.j-main-navbar').addClass('lighten-1').addClass(secondary_color).removeClass(default_color);
    $('.j-headline').addClass('header center').addClass(primary_text_color);
    $('.j-action-button').addClass('btn-large waves-effect waves-light').addClass(primary_color).removeClass(default_color);
    $('.page-footer').addClass(primary_color).removeClass(default_color);
    $('.j-madeby-link').addClass('text-lighten-3').addClass(primary_text_color);
    $('.j-column-icon').addClass('center light-blue-text');
    $('.j-main-content').addClass(main_content_color);
    $('.j-aux-content').addClass(aux_content_color);
    $('.j-aux-header, .j-aux-link').addClass(aux_special_color);
    $('.j-nav-desktop').addClass('right hide-on-med-and-down');
    $('.j-banner-row').addClass('row center');
    $('.j-banner-section').addClass('section no-pad-bot');

    // copy menu items to mobile sideNav menu
    $('#nav-mobile').append($('.j-nav-desktop').html());

  }); // end of document ready
})(jQuery); // end of jQuery name space
