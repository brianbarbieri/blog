// Script to open and close sidebar when on tablets and phones
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

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

var headSlideIndex = 1;
showHeadSlide(headSlideIndex);

function plusSlide(n) {
    showHeadSlide(headSlideIndex += n);
}

function showHeadSlide(n) {
    var i;
    var x = document.getElementsByClassName("headSlide");
    if (n > x.length) {headSlideIndex = 1}
    if (n < 1) {headSlideIndex = x.length}
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    x[headSlideIndex-1].style.display = "block";  
}

// Rooms dropdown butten add event listener
$( "#dropdown-btn-rooms" ).click(function() {
    dropdown_blocked = $( "#dropdown-container" ).css('display');
    if (dropdown_blocked === "block"){
        $( "#dropdown-container" ).css('display', "none")
    }else{
        $( "#dropdown-container" ).css('display', "block")
    }
});

var elements = document.getElementsByClassName('clicked-side');
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function() {
        w3_close();
    });
};

var w = window.matchMedia("(max-width: 700px)");
var vid = document.getElementById("vid");
var source = document.createElement("source");
source.id = "hvid";
source.setAttribute("type", "video/mp4");
vid.appendChild(source);

if (w.matches) {
    vid.pause();
    source.removeAttribute("src");
    source.setAttribute("src", "static/images/videos/casa_modero_verticaal.mp4");
    vid.load();
} else {
    vid.pause();
    source.removeAttribute("src");
    source.setAttribute("src", "static/images/videos/casa_modero.mp4");
    vid.load();
}

window.addEventListener("resize", function(){
    var w = window.matchMedia("(max-width: 700px)");
    var vid = document.getElementById("vid");
    var source = document.getElementById("hvid");

    if (w.matches) {
        vid.pause();
        source.src = "static/images/videos/casa_modero_verticaal.mp4";
        vid.load();
    } else {
        vid.pause();
        source.src = "static/images/videos/casa_modero.mp4";
        vid.load();
    }
});

const phoneContact = document.getElementById("phoneContact");
phoneContact.addEventListener("click", function() {
    phoneContact.textContent = "+39 331 173 1906";
});

const emailContact = document.getElementById("emailContact");
emailContact.addEventListener("click", function() {
    emailContact.textContent = "modero.cartosio@gmail.com";
});