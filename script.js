// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

const headerLink = document.querySelector(".header > a");
headerLink.onmouseover = function () { ballBounce() };
headerLink.onmouseleave = function () { ballStopBounce() };

// Adds bounce on hover
function ballBounce() {
    balls = headerLink.children;
    balls[0].classList.add("fa-bounce");
    balls[1].classList.add("fa-bounce");
}
function ballStopBounce() {
    balls = headerLink.children;
    balls[0].classList.remove("fa-bounce");
    balls[1].classList.remove("fa-bounce");
}

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }

    scrollIndicator();
}

// Fill and unfill scrollbar
function scrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById('scrollbar').style.width = scrolled + "%";
}