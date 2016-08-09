$(document).ready(function() {
  var titlePosY = $('.stage__text__title').offset().top;  
  
  $(window).scroll(function() {
    var outine = $('.outine');
    var articleTitle = $('.brand-nav')
    if ($(window).scrollTop() > titlePosY){
      outine.addClass('outine-onscroll');
      articleTitle.addClass('title-hide');
      }
    else {
      outine.removeClass('outine-onscroll');
      articleTitle.removeClass('title-hide');
    }
  
  });
});
  


