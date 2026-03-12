// Always clear session storage
sessionStorage.removeItem('isStaffAuth');

// ─── Tab Switching ─────────────────────────────────────────────────────────────
const signinTab = document.getElementById('signinTab');
const signupTab = document.getElementById('signupTab');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const loginCard = document.querySelector('.login-card');

signinTab.addEventListener('click', () => {
    signinTab.classList.add('active');
    signupTab.classList.remove('active');
    signinForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    clearErrors();
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    signinTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    signinForm.classList.add('hidden');
    clearErrors();
});

function clearErrors() {
    document.getElementById('signinError').textContent = '';
    document.getElementById('signupError').textContent = '';
}

// ─── Sign In ──────────────────────────────────────────────────────────────────
signinForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const errorEl = document.getElementById('signinError');

    errorEl.style.color = '#10b981';
    errorEl.textContent = '✅ Access granted. Redirecting...';
    sessionStorage.setItem('isStaffAuth', 'true');
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
});

// ─── Sign Up ──────────────────────────────────────────────────────────────────
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const errorEl = document.getElementById('signupError');

    errorEl.style.color = '#10b981';
    errorEl.textContent = '✅ Account created! Redirecting...';
    sessionStorage.setItem('isStaffAuth', 'true');
    setTimeout(() => { window.location.href = 'index.html'; }, 800);
});

// ─── 3D Card Animation ────────────────────────────────────────────────────────
const splitCard = document.querySelector('.split-login-card');
const leftContent = document.querySelector('.login-left-content');
const rightSide = document.querySelector('.login-side-right');

document.addEventListener('mousemove', (e) => {
    if (!splitCard) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate rotation (max 5 degrees for subtlety)
    const rotateY = ((clientX / innerWidth) - 0.5) * 10;
    const rotateX = ((clientY / innerHeight) - 0.5) * -10;

    splitCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Inner parallax effect
    if (leftContent) {
        const moveX = ((clientX / innerWidth) - 0.5) * 20;
        const moveY = ((clientY / innerHeight) - 0.5) * 20;
        leftContent.style.transform = `translateZ(50px) translateX(${moveX}px) translateY(${moveY}px)`;
    }

    if (rightSide) {
        const moveX = ((clientX / innerWidth) - 0.5) * -10;
        const moveY = ((clientY / innerHeight) - 0.5) * -10;
        rightSide.style.transform = `translateZ(20px) translateX(${moveX}px) translateY(${moveY}px)`;
    }
});

// Reset transform when mouse leaves
document.addEventListener('mouseleave', () => {
    if (!splitCard) return;
    splitCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    if (leftContent) leftContent.style.transform = `translateZ(0px) translateX(0) translateY(0)`;
    if (rightSide) rightSide.style.transform = `translateZ(0px) translateX(0) translateY(0)`;
});

