var main = document.querySelector("main");
var custom = document.querySelector("#minicircle");
var videocontainer = document.querySelector("#vidcontainer");
var cursor = document.querySelector("#vidcursor");
var img = document.querySelector("#vidcontainer img ");
var video = document.querySelector("#vidcontainer video");
var line = document.querySelectorAll("#hero #line3 h1");


function loader() {
  gsap.from("#loader .line h1", {
    y: 100,
    duration: 0.8,
    stagger: 0.25,
    ease: "ease.in",
  });

  var count = document.querySelector("#count");
  var time = 0;

  setInterval(function () {
    if (time < 100) {
      time++;

      count.textContent = time;
      console.log(time);
    } else {
      time = 100;
      clearInterval;
    }
  }, 25);

  gsap.to("#loader", {
    y: -600,
    delay: 2.9,
    display: "none",
    ease: "power3.in",
  });

  gsap.to("#loader .line h1,h5", {
    opacity: 0,
    delay: 2.7,
    ease: "easein",
  });

  gsap.from("#page1 section h1", {
    y: 100,
    duration: 0.8,
    stagger: 0.2,
    ease: "ease.in",
    delay: 3,
  });
  gsap.from("nav", {
    opacity: 0,
    delay: 3.5,
    duration: 1,
  });

}
function locoandscroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    multiplier: 1, // Adjust this value to change scroll speed
    lerp: 0.1,     // Adjust this value to change smoothness
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    }
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function sheryanimation() {
  Shery.imageEffect("#page3 #inner2 .holder #mid .images", {
    style: 5,
    config: {
      a: { value: 1.15, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.76015361762255 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 1, y: 1 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.24, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.46, range: [0, 10] },
      metaball: { value: 0.41, range: [0, 2] },
      discard_threshold: { value: 0.28, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.26, range: [0, 2] },
      noise_scale: { value: 9.16, range: [0, 100] },
    },
    gooey: true,
  });
}
function videocontainercursor() {
  videocontainer.addEventListener("mouseenter", function () {
    gsap.to("#minicircle", {
      scale: 0,
    });

    videocontainer.addEventListener("mousemove", function (dets) {
      gsap.to("#vidcursor", {
        left: dets.x - 480,
        top: dets.y - 250,
      });
    });
  });

  videocontainer.addEventListener("mouseleave", function () {
    gsap.to("#minicircle", {
      scale: 1,
    });
    gsap.to("#vidcursor", {
      top: "-15%",
      left: "70%",
    });
    video.pause();
  });

  var flag = 0;
  videocontainer.addEventListener("click", function () {
    if (flag == 0) {
      video.play();
      img.style.opacity = 0;
      cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z"></path></svg>`;
      gsap.to(cursor, {
        scale: 0.5,
      });

      flag = 1;
    } else {
      video.pause();
      img.style.opacity = 1;
      cursor.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"
              ></path>
            </svg>`;
      gsap.to(cursor, {
        scale: 1,
        // top: "-5vh",
        // left: "30vh",
      });
      flag = 0;
    }
  });

  // Mobile version
  var mobileFlag = 0;
  videocontainer.addEventListener("touchstart", function () {
    if (mobileFlag == 0) {
      video.play();
      img.style.opacity = 0;
      cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z"></path></svg>`;
      gsap.to(cursor, {
        scale: 0.5,
      });
      mobileFlag = 1;
    } else {
      video.pause();
      img.style.opacity = 1;
      cursor.innerHTML = `<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M19.376 12.4161L8.77735 19.4818C8.54759 19.635 8.23715 19.5729 8.08397 19.3432C8.02922 19.261 8 19.1645 8 19.0658V4.93433C8 4.65818 8.22386 4.43433 8.5 4.43433C8.59871 4.43433 8.69522 4.46355 8.77735 4.5183L19.376 11.584C19.6057 11.7372 19.6678 12.0477 19.5146 12.2774C19.478 12.3323 19.4309 12.3795 19.376 12.4161Z"
              ></path>
            </svg>`;
      gsap.to(cursor, {
        scale: 1,
        x:"55vh",
        y:"-45vh"
      
    })
    mobileFlag = 0;
  };
})}
function circleMouseFollower() {
  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;
  const ease = 0.15; // Adjust this value to change the smoothness (lower = smoother)

  document.addEventListener("mousemove", function (dets) {
    mouseX = dets.clientX;
    mouseY = dets.clientY;
  });

  function animate() {
    let distX = mouseX - circleX;
    let distY = mouseY - circleY + window.scrollY;

    circleX += distX * ease;
    circleY += distY * ease;

    gsap.set("#minicircle", {
      left: circleX,
      top: circleY,
    });

    requestAnimationFrame(animate);
  }

  animate();
}
function rectanglecursor() {
  const rectangle = document.querySelector("#rectangle img");
  const line3 = document.querySelector("#hero #line3");
  const custom = document.querySelector("#minicircle");
  let locoScroll;

  // Initialize locoScroll after a short delay to ensure it's available
  setTimeout(() => {
    locoScroll = document.querySelector('[data-scroll-container]').__scrollInstance;
  }, 100);

  let mouseX = 0;
  let mouseY = 0;
  let rectX = 0;
  let rectY = 0;

  document.addEventListener("mousemove", function (dets) {
    mouseX = dets.clientX;
    mouseY = dets.clientY;
  });

  function updateRectanglePosition() {
    let scrollY = locoScroll ? locoScroll.scroll.instance.scroll.y : window.scrollY;
    
    rectX += (mouseX - rectX) * 0.1;
    rectY += (mouseY - rectY + scrollY) * 0.1;

    gsap.set(rectangle, {
      x: rectX,
      y: rectY,
      xPercent: -50,
      yPercent: -50
    });

    requestAnimationFrame(updateRectanglePosition);
  }

  updateRectanglePosition();

  line3.addEventListener("mouseenter", function () {
    gsap.to(rectangle, {
      opacity: 1,
    
      // duration: 0.3
    });
    gsap.to(custom, {
      opacity: 0,
      // duration: 0.3
    });
  });

  line3.addEventListener("mouseleave", function () {
    gsap.to(rectangle, {
      opacity: 0,
      // scale: 0.5,
      // duration: 0.1,
      // ease: "power4.out"
    });
    gsap.to(custom, {
      opacity: 1,
      // duration: 0.3
    });
  });
}
function footerAnimation() {
  // Select all container elements with the same class (assuming ".container")
  const containers = document.querySelectorAll(".inline");

  containers.forEach(container => {
    // Find h1 and h2 elements within each container
    const h1 = container.querySelector(".h1");
    const h2 = container.querySelector(".h2");

    if (h1 && h2) { // Ensure both h1 and h2 exist for animation
      // Pre-wrap text in spans (assuming you want this within containers)
      h1.innerHTML = h1.textContent.split("").map(char => `<span>${char}</span>`).join("");
      h2.innerHTML = h2.textContent.split("").map(char => `<span>${char}</span>`).join("");

      const h1Spans = h1.querySelectorAll("span");
      const h2Spans = h2.querySelectorAll("span");

      // Event listener for the container (targeted animation)
      container.addEventListener("mouseenter", function () {
        // Clear any existing animations
        gsap.killTweensOf(h1Spans);
        gsap.killTweensOf(h2Spans);

        // Animate h1 opacity to 0 with stagger
        gsap.to(h1Spans, { opacity: 0, stagger: 0.15, ease: "power3.out" });

        // Animate h2 opacity to 1 with delay and stagger
        gsap.to(h2Spans, { opacity: 1, stagger: 0.1, ease: "power3.in" });
        // svg
        gsap.to("footer #heading svg",{
          x:60
        })
      });

      container.addEventListener("mouseleave", function () {
        // Clear any existing animations
        gsap.killTweensOf(h1Spans);
        gsap.killTweensOf(h2Spans);

        // Animate h1 opacity back to 1 with stagger, delay, and reverse
        gsap.to(h1Spans, { opacity: 1, stagger: 0.02, reverse: true, ease: "power4.in" });

        // Animate h2 opacity back to 0 with stagger, reverse
        gsap.to(h2Spans, { opacity: 0, stagger: 0.01, reverse: true, ease: "power4.out" });
        gsap.to("footer #heading svg",{
          x:0
        })
      });
    } 
  });
}
function magneticButton(element) {
  const children = element.children[0]

  element.addEventListener('mousemove', e => {
    const { left, top, width, height } = element.getBoundingClientRect()
    const centerX = left + width / 2 
    const centerY = top + height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY
    const deltaX = mouseX - centerX
    const deltaY = mouseY - centerY
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

    gsap.to(element, {
      duration: 0.5,
      x: deltaX * 1.5, // Increased from 0.2 to 0.4
      y: deltaY * 1.5, // Increased from 0.2 to 0.4
      ease: "power2.out"
    })

    if (children) {
      children.style.transform = `
        translate3d(${deltaX * 0.2}px, ${deltaY * 0.2}px, 0) // Increased from 0.1 to 0.2
        rotate3d(${-deltaY / 100}, ${deltaX / 100}, 0, ${distance / 10}deg)
      `
    }
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      duration: 1.2,
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)"
    })
    if (children) {
      children.style.transform = ''
    }
  })
}
function magneticButtononall() {
  const aTags = document.querySelectorAll('nav a');
  aTags.forEach(a => {
    magneticButton(a);
  });

  magneticButton(document.querySelector("#menuicon-open"))
  magneticButton(document.querySelector("#menuicon-close"))
}
function menu() {
  let tl = gsap.timeline({ paused: true })

  tl.to("#menu", {
    duration: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power2.out"
  })
  
  tl.from("#menu-left .inline .h1", {
    opacity: 0,
    y: 100,
    stagger: 0.1,
    duration: 0.75,
    ease: "power1.inOut"
  }, "<")

  tl.from("#menu-right h3", {
    opacity: 0,
    stagger: 0.1,
    duration: 0.75,
    ease: "power1.inOut"
  }, "<")

  tl.from("#menu-right h2", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.75,
    ease: "power1.inOut"
  }, "<")

  function openmenu() {
    document.querySelector("#menu").style.pointerEvents = "all"
    tl.play()
  }

  function closemenu() {
    document.querySelector("#menu").style.pointerEvents = "none"
    tl.reverse()
  }

  document.querySelector("#menuicon-open").addEventListener("click", openmenu)
  document.querySelector("#menuicon-close").addEventListener("click", closemenu)
}



document.addEventListener('DOMContentLoaded', function() {
  // Your existing code here
  
  menu();
  magneticButtononall();
  footerAnimation();
  rectanglecursor();
  videocontainercursor();
  circleMouseFollower();
  loader();
  locoandscroll();

  sheryanimation()
});











