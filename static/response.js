// Sidebar open/close (mobile & tablet)
function w3_open() {
    document.getElementById("mySidebar").classList.add("w3-show");
    document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").classList.remove("w3-show");
    document.getElementById("myOverlay").style.display = "none";
}

// Rooms dropdown toggle
document.getElementById("dropdown-btn-rooms").addEventListener("click", function () {
    var container = document.getElementById("dropdown-container");
    container.style.display = (container.style.display === "block") ? "none" : "block";
});

// Close sidebar when any nav link is clicked (mobile)
var navLinks = document.getElementsByClassName("clicked-side");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        w3_close();
    });
}

// Responsive video — vertical on mobile, horizontal on desktop
var vid = document.getElementById("vid");
var source = document.createElement("source");
source.id = "hvid";
source.setAttribute("type", "video/mp4");
vid.appendChild(source);

function setVideo() {
    var isMobile = window.matchMedia("(max-width: 700px)").matches;
    var newSrc = isMobile
        ? "static/images/videos/casa_modero_verticaal.mp4"
        : "static/images/videos/casa_modero.mp4";
    if (source.getAttribute("src") !== newSrc) {
        vid.pause();
        source.setAttribute("src", newSrc);
        vid.load();
    }
}

setVideo();
window.addEventListener("resize", setVideo);

// Reveal contact details on click
document.getElementById("phoneContact").addEventListener("click", function () {
    this.textContent = "+31 6 5" + second;
});

document.getElementById("emailContact").addEventListener("click", function () {
    this.textContent = "modero.cartosio" + "@" + "gmail.com";
});