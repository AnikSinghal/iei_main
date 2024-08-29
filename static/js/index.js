document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        this.querySelector('.card-inner').classList.toggle('is-flipped');
    });
});
document.addEventListener("DOMContentLoaded", function() {
    console.log('JavaScript loaded');

    // Typing animation
    const texts = ["Welcome to Our Society", "Engaging with Passion, Driving Change."];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    const typingSpeed = 150;
    const erasingSpeed = 100;
    const newTextDelay = 2000;

    function type() {
        if (index < texts[count].length) {
            letter = texts[count].charAt(index);
            currentText += letter;
            document.querySelector('.typing').textContent = currentText;
            index++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (index > 0) {
            currentText = currentText.substring(0, currentText.length - 1);
            document.querySelector('.typing').textContent = currentText;
            index--;
            setTimeout(erase, erasingSpeed);
        } else {
            count = (count + 1) % texts.length;
            setTimeout(type, typingSpeed + 1100);
        }
    }

    type();

    // Slide-in effect for sections
    const sections = document.querySelectorAll('.slide-in-section:not(#contact)'); // Exclude contact section

    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + scrollY;
            const sectionBottom = sectionTop + section.offsetHeight;

            // Trigger slide-in when halfway into viewport
            if (scrollY + windowHeight / 2 > sectionTop && scrollY + windowHeight / 2 < sectionBottom) {
                section.classList.add('slide-in');
            }
            // Do not remove the class once added
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Check on page load
});


document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
