document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Background
    initMatrix();

    // DOM Elements
    const transformBtn = document.getElementById('transform-btn');
    const gameBtn = document.getElementById('game-btn');
    const robot = document.getElementById('robot');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentOverlay = document.getElementById('content-overlay');
    const gameOverlay = document.getElementById('game-overlay');
    const contentBody = document.getElementById('content-body');
    const closeButtons = document.querySelectorAll('.close-btn');
    const contentModal = document.querySelector('.content-modal');
    const downloadButton = document.getElementById('downloadCV');
    const cvDownloadLink = document.getElementById('cvDownloadLink');

    let isRobotMode = false;
    let hasDownloaded = false;

    // Sound Effects
    const transformSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    const buttonSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1432/1432-preview.mp3');
    const hoverSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
    const downloadSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2310/2310-preview.mp3');

    // Set volume for sounds
    [transformSound, buttonSound, hoverSound, downloadSound].forEach(sound => {
        sound.volume = 0.3;
    });

    // Matrix Background
    function initMatrix() {
        const canvas = document.getElementById('matrixBackground');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // CV Download Handler
    downloadButton.addEventListener('click', async () => {
        if (!hasDownloaded) {
            try {
                await downloadSound.play();
                hasDownloaded = true;
                
                // Trigger download
                cvDownloadLink.click();
                
                // Visual feedback
                downloadButton.style.transform = 'translate(-50%, -50%) scale(1.2)';
                downloadButton.style.boxShadow = '0 0 50px var(--accent)';
                
                // Transform back after download
                setTimeout(() => {
                    transformBack();
                    hasDownloaded = false;
                }, 1500);
            } catch (err) {
                console.log('Download failed:', err);
            }
        }
    });

    // Transform Button Click Handler
    transformBtn.addEventListener('click', async () => {
        isRobotMode = !isRobotMode;
        
        try {
            transformSound.currentTime = 0;
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

    function transformToRobot() {
        // Hide nav buttons with animation
        navButtons.forEach((btn, index) => {
            setTimeout(() => {
                btn.style.opacity = '0';
                btn.style.transform = 'scale(0)';
                btn.style.pointerEvents = 'none';
            }, index * 100);
        });

        // Show robot with animation
        setTimeout(() => {
            robot.style.display = 'block';
            setTimeout(() => {
                robot.classList.add('active');
                createParticles(window.innerWidth / 2, window.innerHeight / 2);
            }, 50);
            transformBtn.querySelector('span').textContent = 'Transform Back';
            
            // Reset download state
            hasDownloaded = false;
            downloadButton.style.transform = 'translate(-50%, -50%)';
            downloadButton.style.boxShadow = 'none';
        }, navButtons.length * 100 + 100);
    }

    function transformBack() {
        // Hide robot
        robot.classList.remove('active');
        createParticles(window.innerWidth / 2, window.innerHeight / 2);
        
        setTimeout(() => {
            robot.style.display = 'none';
            // Show nav buttons
            navButtons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.opacity = '1';
                    btn.style.transform = 'scale(1)';
                    btn.style.pointerEvents = 'auto';
                }, index * 100);
            });
        }, 500);

        transformBtn.querySelector('span').textContent = 'Transform into CV Robot';
    }
    // Hangman Game Logic
    class HangmanGame {
        constructor() {
            this.words = ['JAVASCRIPT', 'PYTHON', 'CODING', 'ENGINEER', 'NETWORK', 'ROBOTICS', 'COMPUTER', 'SYSTEMS'];
            this.word = '';
            this.guessed = new Set();
            this.remainingGuesses = 6;
            this.canvas = document.getElementById('hangmanCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.initCanvas();
        }

        initCanvas() {
            this.canvas.width = 300;
            this.canvas.height = 300;
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00ff9d';
            this.ctx.lineCap = 'round';
        }

        drawHangman(stage) {
            const ctx = this.ctx;
            ctx.beginPath();
            switch(stage) {
                case 0: // Base
                    ctx.moveTo(50, 250);
                    ctx.lineTo(250, 250);
                    break;
                case 1: // Poleole
                    ctx.moveTo(100, 250);
                    ctx.lineTo(100, 50);
                    break;
                case 2: // Top
                    ctx.moveTo(100, 50);
                    ctx.lineTo(200, 50);
                    break;
                case 3: // Rope
                    ctx.moveTo(200, 50);
                    ctx.lineTo(200, 90);
                    break;
                case 4: // Head
                    ctx.arc(200, 110, 20, 0, Math.PI * 2);
                    break;
                case 5: // Body & Arms
                    ctx.moveTo(200, 130);
                    ctx.lineTo(200, 190);
                    ctx.moveTo(200, 150);
                    ctx.lineTo(170, 170);
                    ctx.moveTo(200, 150);
                    ctx.lineTo(230, 170);
                    break;
                case 6: // Legs
                    ctx.moveTo(200, 190);
                    ctx.lineTo(170, 220);
                    ctx.moveTo(200, 190);
                    ctx.lineTo(230, 220);
                    break;
            }
            ctx.stroke();
        }

        newGame() {
            this.word = this.words[Math.floor(Math.random() * this.words.length)];
            this.guessed.clear();
            this.remainingGuesses = 6;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawHangman(0);
            this.updateDisplay();
            this.enableAllButtons();
        }

        makeGuess(letter) {
            if (this.guessed.has(letter)) return;
            
            this.guessed.add(letter);
            if (!this.word.includes(letter)) {
                this.remainingGuesses--;
                this.drawHangman(6 - this.remainingGuesses);
            }
            this.updateDisplay();
        }

        updateDisplay() {
            const wordDisplay = document.querySelector('.word-display');
            const message = document.querySelector('.message');
            
            wordDisplay.textContent = this.word
                .split('')
                .map(letter => this.guessed.has(letter) ? letter : '_')
                .join(' ');

            if (this.isGameWon()) {
                message.textContent = 'Congratulations! You won! 🎉';
                message.style.color = '#00ff9d';
                this.disableAllButtons();
                createParticles(this.canvas.width / 2, this.canvas.height / 2);
            } else if (this.remainingGuesses === 0) {
                message.textContent = `Game Over! The word was: ${this.word}`;
                message.style.color = '#ff4444';
                this.disableAllButtons();
            } else {
                message.textContent = `Remaining guesses: ${this.remainingGuesses}`;
                message.style.color = '#00ff9d';
            }
        }

        isGameWon() {
            return this.word.split('').every(letter => this.guessed.has(letter));
        }

        createKeyboard() {
            const keyboard = document.querySelector('.keyboard');
            keyboard.innerHTML = '';
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
                const button = document.createElement('button');
                button.textContent = letter;
                button.addEventListener('click', () => {
                    buttonSound.currentTime = 0;
                    buttonSound.play().catch(err => console.log('Sound playback failed:', err));
                    this.makeGuess(letter);
                    button.disabled = true;
                });
                keyboard.appendChild(button);
            });
        }

        enableAllButtons() {
            document.querySelectorAll('.keyboard button').forEach(button => {
                button.disabled = false;se;
            });
        }

        disableAllButtons() {
            document.querySelectorAll('.keyboard button').forEach(button => {
                button.disabled = true;
            });
        }
    }

    // Initialize Hangman Game
    let hangmanGame;
    gameBtn.addEventListener('click', () => {
        gameOverlay.style.display = 'flex';
        setTimeout(() => {
            gameOverlay.style.opacity = '1';
            if (!hangmanGame) {
                hangmanGame = new HanHangmanGame();
                hangmanGame.createKeyboard();
                document.querySelector('.new-game-btn').addEventListener('click', () => {
                    hangmanGame.newGame();
                });
                hangmanGame.newGame();
            }
        }, 10);
    });

    // Navigation Button Click Handlers
    navButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const sectionId = button.getAttribute('data-section');
            const content = document.getElementById(sectionId).innerHTML;
            
            try {
                buttonSound.currentTime = 0;
                await buttonSound.play();
            } catch (err) {
                console.log('Audio playback failed:', err);
            }

            createParticles(
                button.offsetLeft + button.offsetWidth / 2,
                button.offsetTop + button.offsetHeight / 2
            );

            contentBody.innerHTML = content;
            contentOverlay.style.display = 'flex';
            
            requestAnimationFrame(() => {
                contentOverlay.style.opacity = '1';
                contentModal.style.transform = 'scale(1)';
                setTimeout(() => {
                    contentBody.style.opacity = '1';
                    contentBody.style.transform = 'translateY(0)';
                }, 100);
            });
        });

        // Add hover sound effect
        button.addEventListener('mouseenter', async () => {
            try {
                hoverSound.currentTime = 0;
                await hoverSound.play();
            } catch (err) {
                console.log('Hover sound playback failed:', err);
            }
        });
    });

    // Close Button Handlers
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const overlay = btn.closest('.content-overlay, .game-overlay');
            closeOverlay(overlay);
        });
    });

    function closeOverlay(overlay) {
        overlay.style.opacity = '0';
        const modal = overlay.querySelector('.content-modal, .game-modal');
        const content = overlay.querySelector('.content-body');
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
        }
        
        if (modal) modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            overlay.style.display = 'none';
            if (content) content.innerHTML = '';
        }, 300);
    }

    // Click outside to close
    [contentOverlay, gameOverlay].forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay(overlay);
            }
        });
    });

    // Escape key to close overlays
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            [contentOverlay, gameOverlay].forEach(overlay => {
                if (overlay.style.display === 'flex') {
                    closeOverlay(overlay);
                }
            });
        }
    });

    // Particle Effect System
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
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 50 + 50;
            const size = Math.random() * 5 + 2;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--accent);
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 10px var(--accent);
            `;

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

    // Touch Support for Mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                button.click();
            });
        });
    }
});
