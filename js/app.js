AOS.init({ duration: 1200 });

    window.addEventListener("load", () => {
      document.querySelector(".loader-wrapper").classList.add("fade-out");
    });

    const secciones = document.querySelectorAll(".seccion-scroll");
    let currentIndex = 0;

    function scrollToSection(index) {
      if (index >= 0 && index < secciones.length) {
        currentIndex = index;
        window.scrollTo({
          top: secciones[currentIndex].offsetTop,
          behavior: "smooth"
        });
      }
    }

    // Scroll con rueda (PC)
    let scrollTimeout;
    window.addEventListener("wheel", (e) => {
      if (scrollTimeout) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToSection(currentIndex + direction);
      scrollTimeout = setTimeout(() => scrollTimeout = null, 800);
    }, { passive: false });

    // Scroll con touch (móviles)
    let startY = 0;
    window.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
    });

    window.addEventListener("touchend", (e) => {
      let endY = e.changedTouches[0].clientY;
      let diff = startY - endY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) scrollToSection(currentIndex + 1);
        else scrollToSection(currentIndex - 1);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 } // Se activa cuando al menos el 10% de la sección es visible
    );

    // Añadir todas las secciones con clase .reveal
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const images = [
      'img/copas.jpg',
      'img/bar.jpg',
      'img/prep.jpg',
      'img/shots2.jpg'
    ];

    let currentIndexGal = 0;
    const mainImage = document.getElementById('mainImage');
    const thumbnailElements = document.querySelectorAll('.thumbnails img');

    function showImage(index) {
      currentIndexGal = index;
      mainImage.src = images[index];
      thumbnailElements.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    }

    thumbnailElements.forEach((thumb) => {
      thumb.addEventListener('click', (e) => {
        const index = parseInt(thumb.dataset.index);
        showImage(index);
      });
    });

    // Cambio automático cada 4 segundos
    setInterval(() => {
      currentIndexGal = (currentIndexGal + 1) % images.length;
      showImage(currentIndexGal);
    }, 4000);

    // Inicializa
    showImage(0);

    //Buble Whatsapp
    // Cambia este número por tu teléfono (incluye prefijo país) y tu mensaje
    const telefono = '5215555555555';
    const mensaje = encodeURIComponent('Hola, necesito más información sobre el servicio.');

    document.getElementById('whatsappBubble').addEventListener('click', function() {
      window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
    });