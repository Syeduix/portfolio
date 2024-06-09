window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span",
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 50%",
      onEnter: () => timeline.play(),
    });
  }

  $("[words-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-rotate-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.set($(this).find(".word"), { transformPerspective: 1000 });
    tl.from($(this).find(".word"), {
      rotationX: -90,
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[words-slide-from-right]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      x: "1em",
      duration: 0.6,
      ease: "power2.out",
      stagger: { amount: 0.2 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-up]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: 100,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.6 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-slide-down]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      yPercent: -120,
      duration: 0.3,
      ease: "power1.out",
      stagger: { amount: 0.7 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.2,
      ease: "power1.out",
      stagger: { amount: 0.8 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[letters-fade-in-random]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), {
      opacity: 0,
      duration: 0.05,
      ease: "power1.out",
      stagger: { amount: 0.4, from: "random" },
    });
    createScrollTrigger($(this), tl);
  });

  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true,
      },
    });
    tl.from($(this).find(".word"), {
      opacity: 0.2,
      duration: 0.2,
      ease: "power1.out",
      stagger: { each: 0.4 },
    });
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

const swiperPlayer = new Swiper(".swiper.is-player", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  followFinger: false,
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  initialSlide: 2,
});

const swiperCard = new Swiper(".swiper.is-card", {
  effect: "cards",
  grabCursor: true,
  cardsEffect: {
    slideShadows: false,
  },
  initialSlide: 2,
});

swiperPlayer.controller.control = swiperCard;
swiperCard.controller.control = swiperPlayer;

import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
app.load("https://prod.spline.design/545aZVLbC-ogHpeP/scene.splinecode");


<!--navigation-code-->

$(".nav_wrap").each(function () {
    let hamburgerEl = $(this).find(".nav_hamburger_wrap");
    let navLineEl = $(this).find(".nav_hamburger_line");
    let menuContainEl = $(this).find(".menu_contain");
    let flipItemEl = $(this).find(".nav_hamburger_base");
    let menuWrapEl = $(this).find(".menu_wrap");
    let menuBaseEl = $(this).find(".menu_base");
    let menuLinkEl = $(this).find(".menu_link");
  
    let flipDuration = 0.6;
  
    function flip(forwards) {
      let state = Flip.getState(flipItemEl);
      if (forwards) {
        flipItemEl.appendTo(menuContainEl);
      } else {
        flipItemEl.appendTo(hamburgerEl);
      }
      Flip.from(state, { duration: flipDuration });
    }
  
    let tl = gsap.timeline({ paused: true });
    tl.set(menuWrapEl, { display: "flex" });
    tl.from(menuBaseEl, {
      opacity: 0,
      duration: flipDuration,
      ease: "none",
      onStart: () => {
        flip(true);
      }
    });
    tl.to(navLineEl.eq(0), { y: 4, rotate: 45, duration: flipDuration }, "<");
    tl.to(navLineEl.eq(1), { y: -4, rotate: -45, duration: flipDuration }, "<");
    tl.from(menuLinkEl, {
      opacity: 0,
      yPercent: 50,
      duration: 0.2,
      stagger: { amount: 0.2 },
      onReverseComplete: () => {
        flip(false);
      }
    });
  
    function openMenu(open) {
      if (!tl.isActive()) {
        if (open) {
          tl.play();
          hamburgerEl.addClass("nav-open");
        } else {
          tl.reverse();
          hamburgerEl.removeClass("nav-open");
        }
      }
    }
  
    hamburgerEl.on("click", function () {
      if ($(this).hasClass("nav-open")) {
        openMenu(false);
      } else {
        openMenu(true);
      }
    });
  
    menuBaseEl.on("mouseenter", function () {
      openMenu(false);
    });
    menuBaseEl.on("click", function () {
      openMenu(false);
    });
  
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        openMenu(false);
      }
    });
  });