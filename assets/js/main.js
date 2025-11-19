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

// Build survey -> Telegram
const surveyForm = document.getElementById('build-survey');
const surveyStatus = document.getElementById('survey-status');

if (surveyForm) {
    surveyForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (surveyStatus) {
            surveyStatus.textContent = 'Sending…';
            surveyStatus.classList.remove('text-red-500', 'text-green-600');
            surveyStatus.classList.add('text-gray-500');
        }

        const formData = new FormData(surveyForm);
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/telegram-survey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            if (surveyStatus) {
                surveyStatus.textContent = 'Submitted! We\'ll DM you with next steps.';
                surveyStatus.classList.remove('text-gray-500', 'text-red-500');
                surveyStatus.classList.add('text-green-600');
            }

            surveyForm.reset();
        } catch (error) {
            console.error(error);
            if (surveyStatus) {
                surveyStatus.textContent = 'Something went wrong. Try again or ping us in chat.';
                surveyStatus.classList.remove('text-gray-500', 'text-green-600');
                surveyStatus.classList.add('text-red-500');
            }
        }
    });
}

