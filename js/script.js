// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 700, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

$(".mb-0").click(
    function(){
        $(".mb-0").removeClass("active");
        $(this).addClass("active");
        
    }
);
$(document).ready(function(){
    var winHeight = $(window).height();
    var viewHeight = winHeight - 222;
    console.log(viewHeight);
    $(".main-section").css({minHeight:viewHeight});
    
});


$(window).scroll(function (){
  var winScrollTop = $(window).scrollTop();
  if(winScrollTop > $("header").offset().top){
    $(".back-button").fadeIn(300);
  }
  else{
    $(".back-button").fadeOut(300);
  }
});
$('.carousel').carousel({
      interval: 6000
    })


