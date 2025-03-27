/*let age = 18
let input = prompt("Geben Sie bitte Ihr alter ein, nur die zahl!");

if(input < age){
   alert("Sie sind zu Jung um die Website beizutreten!");
   window.close();
} else if (input >= age){
   alert("Sie sind alt genug um die Website beizutreten!");
}; */


function scrollToHome() {
    const section = document.getElementById('body');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }


function scrollToContact() {
    const section = document.getElementById('contact');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }

function scrollToJoinTheMovement() {
    const section = document.getElementById('Registrieren');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }

// Globale Variable für Particle-Instanz
let particlesInstance = null;

// Preloader-Logik
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 2500);
  }
});

// Particle.js Initialisierung mit Mode-Erkennung
function initParticles() {
  const isBright = document.body.classList.contains('bright-mode');
  
  // Konfiguration mit Mode-abhängigen Farben
  const config = {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: isBright ? '#2c3e50' : '#d2b48c' },
      shape: { type: "circle" },
      opacity: {
        value: isBright ? 0.6 : 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1 }
      },
      size: {
        value: 5,
        random: true,
        anim: { enable: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: isBright ? '#7f8c8d' : '#987284',
        opacity: isBright ? 0.3 : 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  };

  // Vorhandene Instanz bereinigen
  if (particlesInstance) {
    particlesInstance.pJS.fn.vendors.destroypJS();
    particlesInstance = null;
  }

  // Neue Instanz erstellen
  particlesInstance = particlesJS('particles-js', config);
}

// Bright-Mode Toggle mit korrektem Particle-Update
const switchButton = document.getElementById("switch");
if (switchButton) {
  switchButton.addEventListener("change", function() {
    document.body.classList.toggle("bright-mode");
    
    // Warte auf CSS-Transition bevor Particles aktualisiert werden
    setTimeout(() => {
      initParticles();
    }, 100);
  });
}

// Scroll-Pfeil Logik
const setupScrollArrow = () => {
  const scrollArrow = document.getElementById("scrollArrow");
  const arrowIcon = document.getElementById("arrowIcon");

  if (!scrollArrow || !arrowIcon) return;

  const isAtBottom = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    return scrollPosition >= pageHeight - 50;
  };

  const handleScrollClick = () => {
    if (isAtBottom()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const sections = document.querySelectorAll('section');
      let nextSection = Array.from(sections).find(
        section => section.offsetTop > window.scrollY + 10
      );
      if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  scrollArrow.addEventListener('click', handleScrollClick);
  
  window.addEventListener('scroll', () => {
    if (isAtBottom()) {
      scrollArrow.classList.add('up');
      arrowIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
      scrollArrow.classList.remove('up');
      arrowIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
  });
};
// Mobile-Menü-Funktion (nur für Handy)
const setupMobileMenu = () => {
    const menuButton = document.getElementById("headlineDrei");
    if (!menuButton) return;
  
    // Nur auf Mobilgeräten Event-Listener hinzufügen
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleMenuClick = () => {
      if (!mobileMediaQuery.matches) return; // Nur auf Mobilgeräten ausführen
  
      const mobileMenu = document.createElement("aside");
      mobileMenu.className = "upperMenu";
  
      // Menü-Inhalt
      const container = document.createElement("div");
      container.className = "container-inside-menu";
  
      // Linke Spalte
      const leftLinks = document.createElement("div");
      leftLinks.className = "left-links";
      
      const homeLink = document.createElement("a");
      homeLink.textContent = "Home";
      homeLink.className = "added-home-link";
      homeLink.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const portfolioLink = document.createElement("a");
      portfolioLink.textContent = "Portfolio";
      portfolioLink.className = "added-portfolio-link";
      
      leftLinks.append(homeLink, portfolioLink);
  
      // Rechte Spalte
      const rightLinks = document.createElement("div");
      rightLinks.className = "right-links";
      
      const contactLink = document.createElement("a");
      contactLink.textContent = "Contact";
      contactLink.className = "added-contact-link";
      contactLink.onclick = scrollToContact;
      
      const joinLink = document.createElement("a");
      joinLink.textContent = "Join The Movement";
      joinLink.className = "added-logIn-link";
      joinLink.onclick = scrollToJoinTheMovement;
      
      rightLinks.append(contactLink, joinLink);
  
      container.append(leftLinks, rightLinks);
      mobileMenu.appendChild(container);
  
      // Schließen-Button
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "&times;";
      closeBtn.className = "btnClose";
      closeBtn.onclick = () => {
        mobileMenu.classList.add("menuUpper");
        setTimeout(() => mobileMenu.remove(), 600);
      };
      mobileMenu.appendChild(closeBtn);
  
      document.body.appendChild(mobileMenu);
      document.body.style.overflow = "hidden";
    };
  
    // Event-Listener nur hinzufügen wenn Mobile
    if (mobileMediaQuery.matches) {
      menuButton.addEventListener("click", handleMenuClick);
    }
  
    // Bei Größenänderung prüfen
    mobileMediaQuery.addEventListener("change", (e) => {
      if (e.matches) {
        menuButton.addEventListener("click", handleMenuClick);
      } else {
        menuButton.removeEventListener("click", handleMenuClick);
      }
    });
  };
  


// Initialisierung beim DOM-Load
document.addEventListener('DOMContentLoaded', function() {
  initParticles();
  setupScrollArrow();
  setupMobileMenu();
  
});
