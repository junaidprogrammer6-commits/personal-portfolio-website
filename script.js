const body = document.body;
const header = document.querySelector(".header");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
const themeBtn = document.getElementById("themeBtn");
const topBtn = document.getElementById("topBtn");
const navLinks = document.querySelectorAll(".nav-link");
const typingText = document.getElementById("typingText");


// =========================
// TYPING EFFECT
// =========================

const roles = ["Frontend Developer", "Backend Developer"];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const current = roles[roleIndex];

  typingText.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = deleting ? 55 : 95;

  if (!deleting && charIndex > current.length) {

    speed = 1300;
    deleting = true;

  } else if (deleting && charIndex < 0) {

    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    speed = 350;

  }

  setTimeout(typeEffect, speed);
}

typeEffect();


// =========================
// MOBILE MENU
// =========================

menuBtn.addEventListener("click", () => {

  navbar.classList.toggle("open");

  menuBtn.textContent =
    navbar.classList.contains("open")
      ? "✕"
      : "☰";

});


navLinks.forEach(link => {

  link.addEventListener("click", () => {

    navbar.classList.remove("open");
    menuBtn.textContent = "☰";

  });

});


// =========================
// DARK / LIGHT THEME
// =========================

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

  body.classList.add("light");
  themeBtn.textContent = "☾";

}


themeBtn.addEventListener("click", () => {

  body.classList.toggle("light");

  const isLight = body.classList.contains("light");

  themeBtn.textContent =
    isLight ? "☾" : "☀";

  localStorage.setItem(
    "portfolio-theme",
    isLight ? "light" : "dark"
  );

});


// =========================
// SCROLL
// =========================

function handleScroll() {

  header.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );

  topBtn.classList.toggle(
    "show",
    window.scrollY > 450
  );


  const sections =
    document.querySelectorAll("section[id]");

  let current = "";


  sections.forEach(section => {

    const top = section.offsetTop - 150;

    if (window.scrollY >= top) {
      current = section.id;
    }

  });


  navLinks.forEach(link => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );

  });

}

window.addEventListener(
  "scroll",
  handleScroll
);

handleScroll();


// =========================
// BACK TO TOP
// =========================

topBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


// =========================
// SCROLL REVEAL + SKILL BARS
// =========================

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");


        // New Skill Cards
        if (
          entry.target.classList.contains(
            "skill-card"
          )
        ) {

          const bars =
            entry.target.querySelectorAll(
              ".skill-progress span"
            );


          bars.forEach(bar => {

            bar.style.width =
              bar.dataset.width;

          });

        }

      }

    });

  },
  {
    threshold: 0.15
  }
);


// Observe all reveal elements

document
  .querySelectorAll(".reveal")
  .forEach(el => {

    observer.observe(el);

  });


// =========================
// CONTACT FORM
// =========================

const contactForm =
  document.getElementById("contactForm");

const formMessage =
  document.getElementById("formMessage");


contactForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    formMessage.textContent = `Thanks ${name}! Opening your email app...`;

    const body = `${message}\n\nFrom: ${name}\nEmail: ${email}`;
    window.location.href =
      `mailto:junaidprogrammer6@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    contactForm.reset();

    setTimeout(() => {

      formMessage.textContent = "";

    }, 5000);

  }
);


// =========================
// CURRENT YEAR
// =========================

document.getElementById("year").textContent =
  new Date().getFullYear();