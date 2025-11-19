// Console Easter Egg
const style = "font-size: 14px; background: #E5007A; color: white; padding: 4px 8px; border-radius: 4px;";
console.log("%c You found us. Builders like you belong here. Apply now.", style);

// Scroll reveal animation script
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
revealElements.forEach(el => observer.observe(el));

// Form submission logic
const form = document.getElementById('application-form');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        window.location.href = '#!';
        console.log('Form submitted');
    });
}

