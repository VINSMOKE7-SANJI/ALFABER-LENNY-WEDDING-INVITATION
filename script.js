document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.envelope-wrapper');
    const flap = document.querySelector('.flap');
    const letter = document.querySelector('.letter');
    const envelopeScreen = document.getElementById('envelope-screen');
    const cinematicScreen = document.getElementById('cinematic-screen');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    // KLIK AMPLOP
    wrapper.addEventListener('click', () => {
        bgMusic.play();
        flap.classList.add('open');
        setTimeout(() => letter.classList.add('pull'), 500);

        setTimeout(() => {
            envelopeScreen.style.opacity = '0';
            setTimeout(() => {
                envelopeScreen.classList.add('hidden');
                // Tampilkan Cinematic
                cinematicScreen.classList.remove('hidden');
                setTimeout(() => {
                    cinematicScreen.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    document.body.classList.remove('no-scroll');
                    createFlowers();
                }, 8000); // Durasi Cinematic
            }, 1000);
        }, 2000);
    });

    // BUNGA JATUH
    function createFlowers() {
        const container = document.getElementById('floral-container');
        setInterval(() => {
            const f = document.createElement('img');
            f.src = 'assets/bunga.png';
            f.className = 'flower';
            f.style.left = Math.random() * 100 + 'vw';
            f.style.width = (Math.random() * 20 + 10) + 'px';
            f.style.animationDuration = (Math.random() * 3 + 4) + 's';
            container.appendChild(f);
            setTimeout(() => f.remove(), 7000);
        }, 500);
    }

    // SWIPER
    new Swiper(".mySwiper", { autoplay: { delay: 2000 } });

    // COUNTDOWN (Contoh 12 Des 2026)
    const target = new Date("Dec 12, 2026 00:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        document.getElementById("hari").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("jam").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("menit").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("detik").innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }, 1000);
});
