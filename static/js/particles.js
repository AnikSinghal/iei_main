document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particle-container');
    document.body.appendChild(particleContainer);

    let lastX = 0;
    let lastY = 0;

    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 0.5; // Smaller size range for stars
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.opacity = '0.8'; // Initial opacity
        star.style.animation = 'spread 2s ease-out forwards'; // Apply spread animation
        particleContainer.appendChild(star);
        return star;
    }

    function twinklingStars(event) {
        const { clientX: x, clientY: y } = event;
        const stars = [];
        const count = 15; // Number of stars per mouse movement

        // Increase the random range by 3x
        const spreadMultiplier = 150; 

        // Create stars in a line between the current and last positions
        for (let i = 0; i < count; i++) {
            const offsetX = (x - lastX) * (i / count) + (Math.random() - 0.5) * spreadMultiplier; // Create a line effect
            const offsetY = (y - lastY) * (i / count) + (Math.random() - 0.5) * spreadMultiplier; // Create a line effect
            const starX = lastX + offsetX;
            const starY = lastY + offsetY;
            const star = createStar(starX, starY);
            stars.push(star);
        }

        lastX = x;
        lastY = y;
    }

    document.addEventListener('mousemove', twinklingStars);
});
