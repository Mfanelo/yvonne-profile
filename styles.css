:root {
    --primary: #1a1a2e;
    --secondary: #0084ff;
    --accent: #00ff9d;
    --light: #e6e6e6;
    --dark: #16213e;
    --metallic: #4a4a4a;
    --robot-glow: rgba(0, 255, 157, 0.5);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Orbitron', sans-serif;
}

body {
    background: var(--primary);
    color: var(--light);
    min-height: 100vh;
    overflow-x: hidden;
}

.container {
    width: 100%;
    min-height: 100vh;
    position: relative;
}

/* Header Styles */
.header {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
}

.title {
    font-size: 4rem;
    color: var(--accent);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    animation: glow 2s ease-in-out infinite alternate;
}

.subtitle {
    color: var(--secondary);
    font-size: 1.2rem;
    margin-bottom: 3rem;
    letter-spacing: 2px;
}

/* Navigation Buttons */
.nav-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 500px;
    margin: 2rem 0;
}

.nav-button {
    padding: 1.2rem 2rem;
    background: transparent;
    border: 2px solid var(--accent);
    color: var(--accent);
    border-radius: 30px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 1px;
}

.nav-button:hover {
    background: var(--accent);
    color: var(--primary);
    transform: scale(1.05);
    box-shadow: 0 0 20px var(--accent);
}

/* Transform Button */
.transform-button {
    margin-top: 2rem;
    padding: 1.5rem 3rem;
    background: transparent;
    border: 3px solid var(--accent);
    color: var(--accent);
    border-radius: 50px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.transform-button:hover {
    background: var(--accent);
    color: var(--primary);
    transform: scale(1.1);
    box-shadow: 0 0 30px var(--accent);
}

/* Robot Styles */
.robot-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    width: 300px;
    height: 500px;
    display: none;
    z-index: 100;
    transition: transform 0.5s ease;
}

.robot-container.active {
    transform: translate(-50%, -50%) scale(1);
}

.robot-part {
    position: absolute;
    background: var(--metallic);
    border: 2px solsolid var(--accent);
    box-shadow: 0 0 20px var(--robot-glow);
    transition: all 0.5s ease;
}

.head {
    width: 100px;
    height: 100px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px;
}

.eye {
    position: absolute;
    width: 20px;
    height: 20px;
    background: var(--accent);
    border-radius: 50%;
    top: 30px;
}

.eye.left { left: 20px; }
.eye.right { right: 20px; }

.body {
    width: 200px;
    height: 250px;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 30px;
}

.arm {
    width: 40px;
    height: 180px;
    top: 140px;
    border-radius: 20px;
}

.arm.left { left: 20px; }
.arm.right { right: 20px; }

.leg {
    width: 50px;
    height: 150px;
    bottom: 0;
    border-radius: 20px;
}

.leg.left { left: 60px; }
.leg.rigright { right: 60px; }

/* Content Overlay */
.content-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(26, 26, 46, 0.95);
    display: none;
    justify-content: center;
    align-items: cententer;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.content-modal {
    background: var(--dark);
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    border: 2px solid var(--accent);
    box-shadow: 0 0 30px var(--robot-glow);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    color: var(--accent);
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.close-btn:hover {
    color: var(--secondary);
    transform: scale(1.1);
}

/* Content Styling */
.content-section h2 {
    color: var(--accent);
    margin-bottom: 1.5rem;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.skill-item {
    background: rgba(0, 255, 157, 0.1);
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    border: 1px solid var(--accent);
}

.skill-item i {
    font-size: 2.5rem;
    color: var(--accent);
    margin-bottom: 1rem;
}

.experience-item, .education-item {
    margin-bottom: 1.5rem;
}

.cert-list li {
    margin-bottom: 0.5rem;
    list-style: none;
    padding-left: 1.5rem;
    position: relative;
}

.cert-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent);
}

/* Animations */
@keyframes glow {
    from {
        text-shadow: 0 0 10px var(--accent),
                     0 0 20px var(--accent),
                     0 0 30px var(--secondary);
    }
    to {
        text-shadow: 0 0 20px var(--accent),
                     0 0 30px var(--accent),
                     0 0 40px var(--secondary);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .title {
        font-size: 2.5rem;
    }

    .subtitle {
        font-size: 1rem;
    }

    .nav-button {
        padding: 1rem;
        font-size: 0.9rem;
    }

    .transform-button {
        padding: 1.2rem 2rem;
        font-size: 1.1rem;
    }

    .robot-container {
        transform: translate(-50%, -50%) scale(0.7);
    }

    .robot-container.active {
        transform: translate(-50%, -50%) scale(0.7);
    }

    .content-modal {
        width: 95%;
        padding: 1.5rem;
    }
}
