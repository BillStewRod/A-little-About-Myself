
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);


/** ADD LOADING ANIMATION **/
gsap.from("nav", {y: "-100%", ease: "power3.out", duration: 1.3}, 1.5);
gsap.from(".controls", {x: "20px", opacity: 0, duration: 1}, 1.3);
gsap.from(".arrows", {opacity: 0, duration: 1}, 1.3);
gsap.from(".header-wrp .socials, .header-wrp .arrowDown", {x: "-20px", opacity: 0, duration: 1}, 1.3);



/* cursor logic */
window.addEventListener("mousemove", (e) => {
    gsap.to(".cursor", {x: e.clientX, y: e.clientY});
    gsap.to(".cursor-follow", {x: e.clientX, y: e.clientY, duration: 1.5, ease: "power3.out"});
})

document.body.classList.remove("loading");


var imageView = false; // represents whether an image is currently largely displayed
var currentOpenImage; // saves the image element currently open in view
var slide = 1; // current slide number/id
var pauseSlider = false; // whether slider progress timer is paused
var progress = 0; // how many seconds in current slide


function init() {
    let imgs = document.querySelectorAll(".header-wrp img");

    imgs.forEach((i) => {
        i.addEventListener("mouseenter", () => {
            if (imageView) return;

            // darken all images instead of hovered one
            imgs.forEach((f) => {
                if (f == i) return;
                gsap.to(f, {opacity: .3});
            });

            // pause slider on image hover
            pauseSlider = true;
        });
        i.addEventListener("mouseleave", () => {
            if (imageView) return;
            
            // reset all images to initial state
            imgs.forEach((f) => {
                gsap.to(f, {opacity: 1});
            });

            // resume slider on mouseleave
            pauseSlider = false;
        });

        i.addEventListener("click", selectImage);
    });
}
window.onload = init();

// Timeline for image click
var tli = gsap.timeline();

function selectImage(img) {
    
    // do not interrupt animations
    if (tli.isActive()) {
        return;
    }

    // Close image if open
    if (imageView) {
        closeImage(img);
        return;
    }

    // reset all images to initial state
    currentOpenImage = img;

    // Change cursor of image wrapper (cross cursor for close)
    img.target.parentNode.classList.add("crossCursor");

    // Clean up previous image click timeline for new image
    tli = gsap.timeline();

    // Darken all images except the selected one to open
    // (this was previously without '".slide" + slide')
    let imgs = document.querySelectorAll(".slide" + slide + " .img");

    imgs.forEach((f) => {
        if (f == img.target.parentNode) return;
        tli.to(f, {opacity: 0}, 0);
    });

    // set image open state to true
    imageView = true;

    // hide the slide headlines
    tli.to(".slide" + slide + " h2", {opacity: 0}, 0);

    // hide animated background
    tli.to(".bg", {opacity: 0}, .6);

    // if not the centered image (i1), transform to center
    if (!img.target.parentNode.classList.contains("i1"))
        tli.to(img.target.parentNode, {x: "-50%", y: "-50%"}, 0);

    // resize image to full screen
    tli.to(img.target.parentNode, {width: "80vw",
        height: "80vh", opacity: 1, ease: "power3.out", 
        duration: 1}, .5);

    // hide cursor (the following cursor)
    gsap.to(".c", {opacity: 0});

}

function closeImage(img) {
    // Reverse the image open animation
    tli.reverse();

    // Set the image view state to false
    imageView = false;

    // hide the cross cursor
    img.target.parentNode.classList.remove("crossCursor");

    // unhide follow cursor
    gsap.to(".c", {opacity: 1});
}


/** SLIDE ANIMATION **/

// Set timelines for each slide with the fade in animation for each slide element
var tl1 = gsap.timeline({paused: false});
var ease = CustomEase.create("custom", "M0,0 C0.246,0.041 0.22,0.315 0.359,0.606 0.427,0.748 0.571,0.989 1,1 ");

tl1.from(".slide1 .i1 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .7);
tl1.from(".slide1 .i2 img", {x: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .2);
tl1.from(".slide1 .i3 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl1.from(".slide1 .i4 img", {y: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .4);
tl1.from(".slide1 .i5 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl1.from(".slide1 .i6 img", {x: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .9);
tl1.fromTo(".slide1 .title1 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, .9);
tl1.fromTo(".slide1 .title2 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, 1.1);


// second slide animation
var tl2 = gsap.timeline({paused: true});
tl2.from(".slide2 .i1 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .7);
tl2.from(".slide2 .i2 img", {x: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .2);
tl2.from(".slide2 .i3 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl2.from(".slide2 .i4 img", {y: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .4);
tl2.from(".slide2 .i5 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl2.from(".slide2 .i6 img", {x: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .9);
tl2.fromTo(".slide2 .title1 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, .9);
tl2.fromTo(".slide2 .title2 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, 1.1);

// third slide animation
var tl3 = gsap.timeline({paused: true});
tl3.from(".slide3 .i1 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .7);
tl3.from(".slide3 .i2 img", {x: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .2);
tl3.from(".slide3 .i3 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl3.from(".slide3 .i4 img", {y: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .4);
tl3.from(".slide3 .i5 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl3.from(".slide3 .i6 img", {x: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .9);
tl3.fromTo(".slide3 .title1 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, .9);
tl3.fromTo(".slide3 .title2 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, 1.1);

// fourth slide animation
var tl4 = gsap.timeline({paused: true});
tl4.from(".slide4 .i1 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .7);
tl4.from(".slide4 .i2 img", {x: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .2);
tl4.from(".slide4 .i3 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl4.from(".slide4 .i4 img", {y: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .4);
tl4.from(".slide4 .i5 img", {y: "110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .5);
tl4.from(".slide4 .i6 img", {x: "-110%", opacity: 0, ease: ease, duration: 1, scaleY: .5}, .9);
tl4.fromTo(".slide4 .title1 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, .9);
tl4.fromTo(".slide4 .title2 span", {y: '40%', opacity: 0, duration: 1, ease: 'power3.out'}, {y: '0%', opacity: 1}, 1.1);


// change to the slide with new id
function changeSlide(id) {
    // close image view if still open
    if (imageView) {
        closeImage(currentOpenImage);
    }

    // Reverse the show animation from the current slide
    window["tl" + slide].reverse(1);

    // play new animation for next slide
    window["tl" + id].restart();

    // remove active state from any slide (slide is represented through header element)
    let slides = document.querySelectorAll("header");
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    // set the new slide as active (for click and hover functionality)
    let newSlide = document.querySelector(".slide" + id);
    newSlide.classList.add("active");

    // update slide id
    slide = id;

    // reset controls to inactive
    let controls = document.querySelectorAll(".controls ul li");
    controls.forEach((f) => {
        f.classList.remove("active");
    });

    // set new active
    controls[id - 1].classList.add("active");

    // reset progress to zero on manual slide change
    progress = 0;
    // unpause slider if previously paused
    pauseSlider = false;

}


// add click events to right controls
var controls = document.querySelectorAll(".controls ul li");
for (let i = 0; i < controls.length; i++) {
    controls[i].addEventListener("click", () => {
        changeSlide(i+1);
    });
}

function startProgressBar() {
    setInterval(() => {
        // if slider is paused, skip interval
        if (pauseSlider) return;

        // add 100ms to progress on every interval,
        // progress represents the seconds in
        progress += .1;

        // after 8 seconds, change slide and restart progress
        if (progress >= 8) {
            changeSlide((slide % 4) + 1);
            progress = 0;
        }

        // apply progress state to progress bar
        gsap.to(".slideProgress", {scaleX: progress / 8, duration: .3});
    }, 100);
}
startProgressBar();



// change slide by arrow clicks
let prevArrow = document.querySelector(".arrows svg:nth-child(1)");
let nextArrow = document.querySelector(".arrows svg:nth-child(2)");
prevArrow.addEventListener("click", () => {
    let delta = slide == 1 ? 4 : slide - 1;
    changeSlide(delta);
})
nextArrow.addEventListener("click", () => {
    changeSlide((slide % 4) + 1);
})


/** STUDIO SCROLL EFFECT */
var gridTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#studio',
        start: 'top center',
        once: true
    }
});

var gridElements = document.querySelectorAll(".grid .grid-el");
// gradually fade in each element
for (let i = 1; i <= gridElements.length; i++) {
    gridTl.from(`.grid .grid-el:nth-child(${i}) .row *`, {y: '150%', duration: 1}, .3 * (i - 1));
    gridTl.from(`.grid .grid-el:nth-child(${i}) .img-wrp`, {height: 0, duration: 1}, .3 * 1);
    gridTl.from(`.grid .grid-el:nth-child(${i}) img`, {scale: 1.5, duration: 1, ease: "power3.out"}, .3*i);
}

// resize the while grid on animation
gridTl.from(".grid", {height: 0, duration: 2}, 0);

/** CONTACT SCROLL EFFECT */

var scrollTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#studio .grid .grid-el:last-child',
        start: 'top+=100 top',
        end: '+=300',
        scrub: 1,
    }
});

// move grid upwards and hide
scrollTl.to("#studio .grid", {y: '-20%', opacity: 0}, 0);

// add fade in and pull row
scrollTl.from(".contact-grid", {y: '20%', opacity: 0}, .3);
scrollTl.from(".contact-grid .row", {y: '-100%', opacity: 0}, .3);
