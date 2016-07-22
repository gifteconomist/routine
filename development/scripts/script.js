$(document).ready(function() {
  
  $(document).on('mouseover', '.brand-logo', function() {
    var src = $(this).attr("src").match(/[^\.]+/) + "-front.svg";
    $(this).attr("src", src);
  })
  
  $(document).on('mouseout', '.brand-logo', function() {
    var src = $(this).attr("src").replace("-front.svg", ".svg");
    $(this).attr("src", src);
  })
})
