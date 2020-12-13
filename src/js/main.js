const main = document.querySelector("main");
const slider = document.querySelector(".third-control-range");
const navList = document.querySelector(".nav-list");
const nav = document.querySelectorAll(".nav-list--item");
const slides = document.querySelectorAll(".slide");

// FULL PAGE SCROLLING
(function () {
    let params = {
        animateTime: 0.7,
        delay: 800,
        animateTiming: "ease",
    };

    // IF SUPPORT PASSIVE
    var supportsPassive = false;
    try {
        window.addEventListener(
            "test",
            null,
            Object.defineProperty({}, "passive", {
                get: function () {
                    supportsPassive = true;
                },
            })
        );
    } catch (e) {}

    var wheelOpt = supportsPassive ? { passive: false } : false;
    ///////////////////////////////////////////////////////////////////

    // WHEEL EVENT HANDLING
    document.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            translateWheel(e.deltaY);
        },
        wheelOpt
    );
    // /////////////////////////////

    //SCROLLING
    // localStorage.setItem("current", 0);
    let translateY = 1;
    // updateDots(localStorage.current);
    let ready = true;

    function translateWheel(delta) {
        if (ready) {
            if (delta > 0 && translateY < 5) {
                ready = false;
                main.style.transform = `translateY(${-translateY * 100}vh)`;
                ++translateY;
            } else if (delta < 0 && translateY > 1) {
                ready = false;
                --translateY;
                main.style.transform = `translateY(${
                    -translateY * 100 + 100
                }vh)`;
            }
            updateDots(translateY - 1);
            main.style.transition = `all ${params.animateTime}s  ${params.animateTiming}`;
        }
        setTimeout(function () {
            ready = true;
        }, params.delay);
    }
    ///////////////////////////////////////

    //TOUCH EVENT HANDLING
    document.addEventListener(
        "touchstart",
        (e) => {
            if (e.target !== slider && !Array.from(nav).includes(e.target)) {
                e.preventDefault();
                touchStart(e);
            }
        },
        wheelOpt
    );

    document.addEventListener(
        "touchend",
        (e) => {
            if (e.target !== slider && !Array.from(nav).includes(e.target)) {
                e.preventDefault();
                touchEnd(e);
            }
        },
        wheelOpt
    );

    let touchStartY = 0;
    let touchEndY = 0;

    function touchStart(e) {
        touchStartY = e.changedTouches[0].clientY;
        touchEndY = 0;
    }

    function touchEnd(e) {
        touchEndY = parseInt(e.changedTouches[0].clientY);
        if (touchEndY < touchStartY) {
            translateWheel(1);
        } else {
            translateWheel(-1);
        }
    }
    //////////////////////////////////////

    function updateDots(index) {
        for (let i = 0; i < nav.length; ++i) {
            nav[i].classList.remove("active");
        }
        nav[index].classList.add("active");
    }

    navList.addEventListener("click", (e) => {
        checkElement(e.target);
    });

    function checkElement(elem) {
        if (elem === nav[0]) {
            main.style.transform = `translateY(0vh)`;
            main.style.transition = `all ${params.animateTime}s  ${params.animateTiming}`;
            translateY = 1;
            updateDots(0);
        }
        if (elem === nav[1]) {
            main.style.transform = `translateY(-100vh)`;
            main.style.transition = `all ${params.animateTime}s  ${params.animateTiming}`;
            translateY = 2;
            updateDots(1);
        }
        if (elem === nav[2]) {
            main.style.transform = `translateY(-200vh)`;
            main.style.transition = `all ${params.animateTime}s  ${params.animateTiming}`;
            translateY = 3;
            updateDots(2);
        }
    }
})();
//  END OF FULL PAGE SCROLLING
(function () {
    slider.addEventListener("input", (e) => {
        if (slider.value < 25) {
            moveSlides(0);
        } else if (slider.value > 25 && slider.value < 75) {
            moveSlides(-100);
        } else if (slider.value >= 75) {
            moveSlides(-200);
        }
    });

    slider.addEventListener("change", (e) => {
        if (slider.value < 25) {
            slider.value = 0;
        } else if (slider.value > 25 && slider.value < 75) {
            slider.value = 50;
        } else if (slider.value >= 75) {
            slider.value = 100;
        }
    });

    function moveSlides(X) {
        slides.forEach((slide) => {
            slide.style.transform = `translateX(${X}${X === 0 ? "" : "vw"})`;
            slide.style.transition = `all 0.5s ease`;
            X += 100;
        });
    }
})();
