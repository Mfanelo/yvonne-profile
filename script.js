document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const transformBtn = document.getElementById('transform-btn');
    const robot = document.getElementById('robot');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentOverlay = document.getElementById('content-overlay');
    const contentBody = document.getElementById('content-body');
    const closeBtn = document.querySelector('.close-btn');
    const contentModal = document.querySelector('.content-modal');

    let isRobotMode = false;

    // Sound Effects
    const transformSound = new Audio('https://www.soundjay.com/mechanical/sounds/robot-transformation-1.mp3');
    const buttonSound = new Audio('https://www.soundjay.com/button/sounds/button-09.mp3');

    // Transform Button Click Handler
    transformBtn.addEventListener('click', async () => {
        isRobotMode = !isRobotMode;
        
        try {
            await transformSound.play();
        } catch (err) {
            console.log('Audio playback failed:', err);
        }

        if (isRobotMode) {
            // Hide nav buttons
            navButtons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.opacity = '0';
                    btn.style.transform = 'scale(0)';
                    btn.style.pointerEvents = 'none';
                }, index * 100);
            });

            // Show robot
            setTimeout(() => {
                robot.style.display = 'block';
                robot.classList.add('active');
                transformBtn.querySelector('span').textContent = 'Transform Back';
            }, navButtons.length * 100 + 100);

        } else {
            // Hide robot
            robot.classList.remove('active');
            setTimeout(() => {
                robot.style.display = 'none';
            }, 500);

            // Show nav buttons
            navButtons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.transform = 'scale(1)';
                    btn.style.pointerEvents = 'auto';
                }, index * 100);
            });
            transformBtn.querySelector('span').textContent = 'Transform into Robot';
        }
    });

    // Navigation Button Click Handlers
    navButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const sectionId = button.getAttribute('data-section');
            const content = document.getElementById(sectionId).innerHTML;
            
            try {
                await buttonSound.play();
            } catch (err) {
                console.log('Audio playback failed:', err);
            }

            // Display content
            contentBody.innerHTML = content;
            contentOverlay.style.display = 'flex';
            
            // Animation
            setTimeout(() => {
                contentOverlay.style.opacity = '1';
                contentModal.style.transform = 'scale(1)';
            }, 10);
        });
    });

    // Close Button Handler
    closeBtn.addEventListener('click', closeOverlay);
    contentOverlay.addEventListener('click', (e) => {
        if (e.target === contentOverlay) closeOverlay();
    });

    function closeOverlay() {
        contentOverlay.style.opacity = '0';
        contentModal.style.transform = 'scale(0.9)';
        setTimeout(() => {
            contentOverlay.style.display = 'none';
        }, 300);
    }

    // Escape key to close overlay
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contentOverlay.style.display === 'flex') {
            closeOverlay();
        }
    });

    // Add particle effect function
    function createParticles(x, y) {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.left = x + 'px';
        particlesContainer.style.top = y + 'px';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '1000';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 5 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = 'var(--accent)';
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.left = '0px';
            particle.style.top = '0px';

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 50 + 50;
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

    // Add hover sound effect to buttons
    const hoverSound = new Audio('https://www.soundjay.com/button/sounds/button-16.mp3');
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            try {
                const sound = hoverSound.cloneNode();
                sound.volume = 0.2;
                sound.play();
            } catch (err) {
                console.log('Hover sound playback failed:', err);
            }
        });
    });
});
