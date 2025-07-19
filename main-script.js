// UAS auralis/main-script.js

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.getElementById("navbar");
    
    // --- Navbar Toggle for Responsive Menu ---
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");
            document.body.classList.toggle("no-scroll");
        });
    }

    // --- Navbar Scroll Effect ---
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // --- Login & Profile Menu Logic ---
    const loginBtn = document.getElementById('loginBtn');
    const profileMenu = document.getElementById('profileMenu');
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileInitials = document.getElementById('profileInitials');
    const profileUsername = document.getElementById('profileUsername');
    const logoutBtn = document.getElementById('logoutBtn');
    const kelolaRelawanLink = document.querySelector('a[href="relawan.html"]');

    function checkLoginStatus() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userData = JSON.parse(currentUser);
            showProfileMenu(userData);
        } else {
            showLoginButton();
        }
    }

    function showProfileMenu(userData) {
        if(loginBtn) loginBtn.style.display = 'none';
        if(profileMenu) profileMenu.style.display = 'block';
        
        if(profileInitials) profileInitials.textContent = userData.username.substring(0, 1).toUpperCase();
        if(profileUsername) profileUsername.textContent = userData.username;

        // Sembunyikan link 'Kelola Relawan' jika bukan admin
        if (kelolaRelawanLink && userData.role !== 'admin') {
            kelolaRelawanLink.parentElement.style.display = 'none';
        }
    }

    function showLoginButton() {
        if(loginBtn) loginBtn.style.display = 'block';
        if(profileMenu) profileMenu.style.display = 'none';
    }

    if (profileTrigger) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if(profileDropdown) profileDropdown.classList.toggle('show');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            // Panggil API logout untuk menghancurkan session di server
            await fetch('api/logout.php');
            localStorage.removeItem('currentUser');
            showLoginButton();
            window.location.href = 'index.html'; // Arahkan ke beranda
        });
    }
    
    // Tutup dropdown jika klik di luar area
    document.addEventListener('click', (e) => {
        if (profileDropdown && profileMenu && !profileMenu.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });

    // Panggil fungsi pengecekan saat halaman dimuat
    checkLoginStatus();
});