/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

/*===== MENU CLOSE =====*/
const closeMenu = (closeId, navId) => {
    const close = document.getElementById(closeId),
        nav = document.getElementById(navId)

    if (close && nav) {
        close.addEventListener('click', () => {
            nav.classList.remove('show')
        })
    }
}
closeMenu('nav-close', 'nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

/*===== PROJECT MODAL FUNCTIONALITY =====*/

// Project data storage
const projectData = {
    project1: {
        title: "ParkMate - Smart Parking System",
        fullDescription: " A web-based smart parking system developed using PHP, JavaScript, and MySQL. Features include user authentication, role-based access, and intelligent parking slot allocation using Dijkstra’s algorithm.The project also focuses on backend logic and basic security considerations such as input validation and session handling.",
        features: [
            "Three user roles: Regular Users, Parking Staff, Super Admin",
            "Real-time map with nearest parking using Haversine formula",
            "Smart slot selection with Dijkstra's algorithm for shortest path",
            "Online booking with vehicle types (car, bike, electric)",
            "QR code generation for entry/exit",
            "eSewa payment integration (test mode)",
            "Staff dashboard for check-in/out and walk-in bookings",
            "Super admin panel with grid editor and slot management",
            "Real-time updates across all views"
        ],
        images: [
            "assets/photos/project1/parking-gallery-1.png",
            "assets/photos/project1/parking-gallery-2.png",
            "assets/photos/project1/parking-gallery-3.png",
            "assets/photos/project1/parking-gallery-4.png",
            "assets/photos/project1/parking-gallery-5.png",
            "assets/photos/project1/parking-gallery-6.png",
            "assets/photos/project1/parking-gallery-7.png"
        ],
        techStack: ["PHP", "MySQL", "JavaScript", "Leaflet.js", "Dijkstra's Algorithm", "Haversine Formula", "eSewa API", "PHPMailer"],
        liveDemo: "https://sps.free.nf/SPS/home.php",
        github: "#"
    },
    project2: {
        title: "PowerHouse Gym Management System",
        fullDescription: "PowerHouse is a complete web-based gym management system developed to streamline gym operations, automate administrative tasks, and enhance user experience for both gym members and administrators. The system eliminates manual record-keeping issues and provides a centralized platform for managing memberships, shift allocations, and subscription tracking.",
        features: [
            "Member Registration & Authentication - Secure user signup with email verification",
            "Admin Dashboard - Complete control over member applications, approvals, and plan management",
            "Membership Plans - Silver, Gold, and Platinum plans with customizable shift timings",
            "Shift Management - Morning and evening shifts with slot capacity tracking",
            "Change Request System - Members can request plan changes with admin approval workflow",
            "Renewal Management - Automated subscription renewal with expiry tracking",
            "Real-time Notifications - Instant feedback for admin actions and user requests",
            "Email Integration - PHPMailer for password reset and notifications",
            "Payment Tracking - Multiple duration options"
        ],
        images: [
            "assets/photos/project2/gym-gallery-1.png",
            "assets/photos/project2/gym-gallery-2.png",
            "assets/photos/project2/gym-gallery-3.png",
            "assets/photos/project2/gym-gallery-4.png",
            "assets/photos/project2/gym-gallery-5.png",
            "assets/photos/project2/gym-gallery-6.png",
            "assets/photos/project2/gym-gallery-7.png",
            "assets/photos/project2/gym-gallery-8.png"
        ],
        techStack: ["PHP 8.x", "MySQL", "JavaScript", "HTML5", "CSS3", "PHPMailer", "Git"],
        liveDemo: "https://powerhouse.free.nf/",
        github: "https://github.com/yourusername/powerhouse-gym-management"
    }
};

// Open modal function
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];

    if (!project) return;

    // Set modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalFullDescription').textContent = project.fullDescription;
    document.getElementById('modalMainImage').src = project.images[0];

    // Set features
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');

    // Set tech stack
    const techStackContainer = document.getElementById('modalTechStack');
    techStackContainer.innerHTML = project.techStack.map(tech =>
        `<span class="projects__modal-tech-tag">${tech}</span>`
    ).join('');

    // Set links
    document.getElementById('modalLiveDemo').href = project.liveDemo;
    document.getElementById('modalGithub').href = project.github;

    // Set thumbnails - dynamically handles ANY number of images
    const thumbnailsContainer = document.getElementById('modalThumbnails');
    thumbnailsContainer.innerHTML = project.images.map((img, index) =>
        `<img src="${img}" alt="Image ${index + 1}" class="projects__modal-thumbnail" onclick="changeModalImage(${index})">`
    ).join('');

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Add active class to first thumbnail
    const thumbnails = document.querySelectorAll('.projects__modal-thumbnail');
    if (thumbnails[0]) thumbnails[0].classList.add('active');
}

// Change modal image function
function changeModalImage(index) {
    const mainImage = document.getElementById('modalMainImage');
    const images = document.querySelectorAll('.projects__modal-thumbnail');
    const currentImages = [];

    images.forEach(img => {
        currentImages.push(img.src);
    });

    if (currentImages[index]) {
        mainImage.src = currentImages[index];

        // Update active class
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }
}

// Close modal function
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
}

// Close modal on escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

// Scroll Reveal Animations
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });