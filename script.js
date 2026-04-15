document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOGIKA AMPLOP & CINEMATIC OPENING ---
    const openBtn = document.getElementById('open-btn');
    const flap = document.querySelector('.flap');
    const letter = document.querySelector('.letter');
    const envelopeScreen = document.getElementById('envelope-screen');
    const cinematicScreen = document.getElementById('cinematic-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    openBtn.addEventListener('click', () => {
        // Mainkan suara cinematic / musik
        bgMusic.play();

        // Animasi Amplop Buka
        flap.classList.add('open');
        setTimeout(() => letter.classList.add('pull'), 500);

        // Setelah 2 detik, hilangkan amplop, mulai cinematic
        setTimeout(() => {
            envelopeScreen.style.opacity = '0';
            setTimeout(() => {
                envelopeScreen.classList.add('hidden');
                cinematicScreen.classList.remove('hidden');
                
                // Setelah cinematic selesai (sekitar 7 detik), masuk ke Main Content
                setTimeout(() => {
                    cinematicScreen.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    document.body.style.overflow = 'auto'; // Buka kunci scroll
                    createFloralMotion(); // Mulai jatuhkan bunga
                }, 7500);

            }, 1500);
        }, 2000);
    });

    // --- 2. FLORAL MOTION (Bunga Jatuh Custom PNG) ---
    function createFloralMotion() {
        const container = document.getElementById('floral-container');
        setInterval(() => {
            const flower = document.createElement('img');
            flower.src = 'assets/bunga.png'; // Pastikan path ini benar
            flower.classList.add('flower');
            
            // Random posisi dan ukuran
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.width = (Math.random() * 20 + 10) + 'px';
            flower.style.animationDuration = (Math.random() * 5 + 5) + 's'; // 5s - 10s
            
            container.appendChild(flower);
            
            // Hapus bunga setelah jatuh agar memori tidak penuh
            setTimeout(() => {
                flower.remove();
            }, 10000);
        }, 800); // Munculkan bunga setiap 0.8 detik
    }

    // --- 3. AUTO SLIDER GALERI (Swiper.js) ---
    var swiper = new Swiper(".mySwiper", {
        effect: "cards",
        grabCursor: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });

    // --- 4. COUNTDOWN ---
    // Atur tanggal pernikahan di sini (Tahun, Bulan-1, Tanggal, Jam, Menit)
    const weddingDate = new Date(2026, 11, 12, 0, 0, 0).getTime(); 

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("hari").innerText = days.toString().padStart(2, '0');
        document.getElementById("jam").innerText = hours.toString().padStart(2, '0');
        document.getElementById("menit").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("detik").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "<h3>Acara Sedang Berlangsung / Selesai</h3>";
        }
    }, 1000);

    // --- 5. RSVP KE GOOGLE SHEETS ---
    // GANTI URL DI BAWAH INI DENGAN URL WEB APP GOOGLE SCRIPT KAMU
    const scriptURL = 'https://script.google.com/macros/s/GANTI_DENGAN_URL_KAMU/exec';
    const form = document.forms['submit-to-google-sheet'];

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.innerHTML = 'Mengirim...';
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                btn.innerHTML = 'Berhasil Terkirim!';
                form.reset();
                setTimeout(() => btn.innerHTML = 'Kirim Konfirmasi', 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = 'Gagal Mengirim';
            });
    });

});

