 
// Slideshow Images
var slideIndex = 1;
showDivs(slideIndex, "1");
showDivs(slideIndex, "2");
showDivs(slideIndex, "3");
  
function currentDiv(n, slideNumber) {
    showDivs(slideIndex = n, slideNumber);
}
  
function showDivs(n, slideNumber) {
    var i;
    var x = document.getElementsByClassName("mySlides" + slideNumber);
    var dots = document.getElementsByClassName("demo" + slideNumber);
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " w3-opacity-off";
}


// Rooms dropdown butten add event listener
$( "#dropdown-btn-rooms" ).click(function() {
    console.log( "Handler for .click() called." );
    dropdown_blocked = $( "#dropdown-container" ).css('display');
    if (dropdown_blocked === "block"){
        $( "#dropdown-container" ).css('display', "none")
    }else{
        $( "#dropdown-container" ).css('display', "block")
    }
});
