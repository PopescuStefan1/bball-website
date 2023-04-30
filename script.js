// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

const headerLink = document.querySelector(".header > a");
if (headerLink !== null) {
  headerLink.onmouseover = function () {
    ballBounce();
  };
  headerLink.onmouseleave = function () {
    ballStopBounce();
  };
}

// Adds bounce on hover

function ballBounce() {
  setTimeout(function () {
    balls = headerLink.children;
    balls[0].classList.add("fa-bounce");
    balls[1].classList.add("fa-bounce");
  }, 150);
}
function ballStopBounce() {
  setTimeout(function () {
    balls = headerLink.children;
    balls[0].classList.remove("fa-bounce");
    balls[1].classList.remove("fa-bounce");
  }, 150);
}

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  scrollIndicator();
}

// Fill and unfill scrollbar and parallax backgrounds
function scrollIndicator() {
  // Fill scrollbar
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("scrollbar").style.width = scrolled + "%";

  // Scroll parallax backgrounds
  const parallaxes = document.querySelectorAll(".parallax");
  for (const parallax of parallaxes) {
    if (parallax.classList.contains("first-par")) {
      parallax.style.backgroundPosition = `50% ${scrolled * 2}%`;
    } else {
      parallax.style.backgroundPosition = `50% ${scrolled}%`;
    }
  }
}

const handleOnMouseMove = (e) => {
  const { currentTarget: target } = e;

  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

for (const card of document.querySelectorAll(".card")) {
  card.onmousemove = (e) => handleOnMouseMove(e);
}

// Open and close image gallery
const fullImgDiv = document.getElementById("fullImgDiv");

const closeButton = document.getElementById("closeButton");
closeButton.addEventListener(
  "click",
  function () {
    fullImgDiv.style.display = "none";
  },
  false
);

const images = document.getElementsByClassName("picture-child");
const fullImg = document.getElementById("fullImg");
const backgroundsUrl = [];

for (let index = 0; index < images.length; index++) {
  backgroundsUrl[index] = window
    .getComputedStyle(images[index])
    .backgroundImage.slice(5, -2);
    images[index].addEventListener(
      "click",
      function () {
        fullImgDiv.style.display = "flex";
        fullImg.src = backgroundsUrl[index];
      },
      false
    );
}