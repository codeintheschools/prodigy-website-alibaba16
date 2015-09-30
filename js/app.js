/*Problem: user when clicking in image goes to a dead end */
/*Solution: Create an overlay with the large image- lightbox*/
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

$overlay.append($image);

/* Add overplay*/
$("body").append($overlay);
  /* a caption*/
  $overlay.append($caption)
  
  /*  An image to overlay*/
$overlay.append($image);
 

/* 1) Capture the click event on a link to an image */
$(".imageGallery a").click(function(event){
  event.preventDefault();
 var imageLocation = $(this).attr("href");
    /* 1.2) Update the overlay with the image linked on the link*/
    $image.attr("src", imageLocation)
  
  // show overlay
 $overlay.show();

 // get childs alt attr and set caption
 var captionText = $(this).children("img").attr("alt");
$caption.text(captionText);                           
                           

  });                           

/* 3) When overlay is clicked*/
$overlay.click(function(){
  /* 3.1) Hide overlay*/
  $overlay.hide();
  
  
  
});
  
  /********************************
  Animation
  *********************************/
  $(".animation").hide().show("slow");
  
    /********************************
  Drawing box
  *********************************/
  
  /* Problem: NO user interaction causes no change to application*/
/* Solution: When user interact causes changes appropriately*/

var color = $(".select").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d")
var lastEvent;
var mouseDown = false;
//When clecking on control list items 
$(".controls").on("click", "li",function(){
  // Deselect sibling element
    $(this).siblings().removeClass("select");
  //Select clicked elements
    $(this).addClass("select");
  //cache current color
  color = $(this).css("background-color");

});


// When new color is pressed
  $("#revealColorSelect").click(function(){;
  //Show color select or hide the olor select 
    $("#colorSelect").toggle();                                  
   });

//Update the "new color" span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g +", " + b + ")");
}
//When color sliders change
$("input[type=range]").change(changeColor);

// When "add color" is pressed 
$("#addNewColor").click(function() {
  //Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});
//On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true
})
.mousemove(function(e){
    //Draw lines
  if(mouseDown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.strokeStyle = color;
//      lastEvent = e; 
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});








  