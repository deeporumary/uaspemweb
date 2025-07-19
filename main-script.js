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

// === FUNGSI UNTUK FILTER PROGRAM DI HALAMAN PROGRAM.HTML ===

// Cek apakah kita berada di halaman program.html
if (window.location.pathname.endsWith('program.html')) {
    
    document.addEventListener('DOMContentLoaded', () => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const programCards = document.querySelectorAll('.program-card');

        // Jika tidak ada elemen filter, hentikan eksekusi
        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Hapus kelas 'active' dari semua tombol
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Tambahkan kelas 'active' ke tombol yang diklik
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                programCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    // Tampilkan kartu jika filter adalah 'all' atau kategorinya cocok
                    if (filter === 'all' || cardCategory === filter) {
                        card.style.display = 'block'; // atau 'flex', tergantung style asli
                    } else {
                        card.style.display = 'none'; // Sembunyikan kartu
                    }
                });
            });
        });
    });
}
