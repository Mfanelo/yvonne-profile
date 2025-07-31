document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const transformButton = document.getElementById('transform-btn');
    const robot = document.getElementById('robot');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentOverlay = document.getElementById('content-overlay');
    const closeButton = document.querySelector('.close-btn');
    const contentBody = document.querySelector('.content-body');

    // Audio Elements
    const transformSound = new Audio('https://www.soundjay.com/mechanical/sounds/robot-transformation-1.mp3');
    const buttonSound = new Audio('https://www.soundjay.com/button/sounds/button-09.mp3');

    let isRobotMode = false;

    // Transform Button Click Handler
    transformButton.addEventListener('click', async () => {
        isRobotMode = !isRobotMode;
        
        try {
            await transformSound.play();
        } catch (err) {
            console.log('Audio playback failed:', err);
        }

        if (isRobotMode) {
            transformToRobot();
        } else {
            transformBack();
        }
    });

    // Transform to Robot Function
    function transformToRobot() {
        // Hide navigation buttons with animation
        navButtons.forEach((button, index) => {
            setTimeout(() => {
                button.style.transform = 'scale(0)';
                button.style.opacity = '0';
            }, index * 100);
        });

        // Show robot after buttons are hidden
        setTimeout(() => {
            robot.classList.add('active');
            // Animate robot parts
            animateRobotParts();
        }, navButtons.length * 100 + 200);

        transformButton.querySelector('span').textContent = 'Transform Back';
    }

    // Transform Back Function
    function transformBack() {
        // Hide robot
        robot.classList.remove('active');

        // Show buttons after robot is hidden
        setTimeout(() => {
            navButtons.forEach((button, index) => {
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                    button.style.opacity = '1';
                }, index * 100);
            });
        }, 500);

        transformButton.querySelector('span').textContent = 'Transform into Robot';
    }

    // Animate Robot Parts
    function animateRobotParts() {
        const parts = robot.children;
        Array.from(parts).forEach((part, index) => {
            part.style.animation = `moveIn 0.5s ${index * 0.1}s forwards`;
        });
    }

    // Navigation Button Click Hk Handlers
    navButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const sectionId = button.dataset.section;
            const content = document.getElementById(sectionId).innerHTML;
            
            try {
                await buttonSound.play();
            } catch (err) {
                console.log('Audio playback failed:', err);
            }

            // Show content with animation
            contentBody.innerHTML = content;
            contentOverlay.classList.add('active');
            
            // Animate content appearance
            contentBody.style.opacity = '0';
            contentBody.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                contentBody.style.opacity = '1';
                contentBody.style.transform = 'translateY(0)';
            }, 100);
        });
    });

    // Close Button Handler
    closeButton.addEventListener('click', () => {
        contentOverlay.classList.remove('active');
    });

    // Click Outside to Close
    contentOverlay.addEventListener('click', (e) => {
        if (e.target === contentOverlay) {
            contentOverlay.classList.remove('active');
        }
    });

    // Escape Key to Close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contentOverlay.classList.contains('active')) {
            contentOverlay.classList.remove('active');
        }
    });

    // Add these CSS keyframes dynamically
    c  const style = document.createElement('style');
    style.textContent = `
        @keyframes moveIn {
            from {
                opacity: 0;
                transform: translate(var(--x, 0), var(--y, 20px)) scale(0);
            }
            to {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    // Add hover sound effect to buttons
    const addHoverSound = (button) => {
        const hoverSound = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3');
        button.addEventListener('mouseenter', async () => {
            try {
                const sound = hoverSound.cloneNode();
                sound.volume = 0.2;
                await sound.play();
            } catch (err) {
                console.log('Hover sound playback failed:', err);
            }
        });
    };

    // Add hover sound to all buttons
    navButtons.forEach(addHoverSound);
    addHoverSound(transformButton);
});

// Add particle effect function
function createParticles(x, y) {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.left = x + 'px';
    particlesContainer.style.top = y + 'px';
    particlesContainer.style.pointerEvents = 'none';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = (Math.random() * 360) * Math.PI / 180;
        const velocity = Math.random() * 100 + 50;
        const size = Math.random() * 5 + 2;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = 'var(--accent)';
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.left = '0px';
        particle.style.top = '0px';

        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 500,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });

        particlesContainer.appendChild(particle);
    }

    setTimeout(() => {
        particlesContainer.remove();
    }, 2000);
}

// Add particle effect to button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});
