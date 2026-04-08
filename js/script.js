
// ---------------------- reproductor -------------------------
const audio = document.querySelector('.player__audio');
const playBtn = document.querySelector('.player__btn--play');
const backBtn = document.querySelector('.player__btn--back');
const forwardBtn = document.querySelector('.player__btn--forward');

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.classList.add('is-playing');
    } else {
        audio.pause();
        playBtn.classList.remove('is-playing');
    }
});

backBtn.addEventListener('click', () => {
    audio.currentTime -= 5;
});

forwardBtn.addEventListener('click', () => {
    audio.currentTime += 5;
});

audio.addEventListener('ended', () => {
    playBtn.classList.remove('is-playing');
});

// ---------------------- temporizador -------------------------
function updateTimer() {
    const targetDate = new Date("june 6, 2026 21:30:00").getTime();
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);

// ---------------------- Lightbox -------------------------
function initLightbox() {
    // Buscar todos los botones que abran el lightbox
    const btnEjemplos = document.querySelectorAll('.btn-ejemplo');
    if (btnEjemplos.length === 0) return;

    // 1. Crear el DOM del modal una sola vez
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';

    const container = document.createElement('div');
    container.className = 'lightbox__container';

    const img = document.createElement('img');
    img.className = 'lightbox__image';
    img.alt = 'Imagen de ejemplo';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox__close';
    closeBtn.setAttribute('aria-label', 'Cerrar');

    // Ensamblar e inyectar al DOM
    container.appendChild(img);
    container.appendChild(closeBtn);
    lightbox.appendChild(container);
    document.body.appendChild(lightbox);

    // 2. Funciones de apertura y cierre
    const openLightbox = (imageSrc) => {
        img.src = imageSrc;
        lightbox.classList.add('is-open');
        document.body.classList.add('is-locked');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('is-open');
        document.body.classList.remove('is-locked');
    };

    // 3. Listeners
    btnEjemplos.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Obtiene la ruta de la imagen desde un atributo data-src, o usa un default
            const src = btn.dataset.src || 'assets/imagenes/dresscode.webp';
            openLightbox(src);
        });
    });

    // Cerrar al clickear el botón de la X
    closeBtn.addEventListener('click', closeLightbox);

    // Cerrar al clickear fuera de la imagen (en el fondo oscuro)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Cerrar al presionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    });
}

initLightbox();

// ---------------------- Playlist WhatsApp -------------------------
function initPlaylistForm() {
    // Número de WhatsApp para enviar las recomendaciones
    const WHATSAPP_NUMBER = '543814061443';

    const playlistSection = document.querySelector('.playlist');
    if (!playlistSection) return;

    const submitBtn = playlistSection.querySelector('.section__button');
    const nameInput = document.getElementById('playlist__name');
    const songInput = document.getElementById('playlist__musica');

    if (!submitBtn || !nameInput || !songInput) return;

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const song = songInput.value.trim();

        if (!name || !song) {
            alert('Por favor, completa tu nombre y la canción que recomiendas.');
            return;
        }

        const message = `Hola, mi nombre es ${name} y mi tema recomendado es ${song}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        // Limpiar los campos después de enviar
        nameInput.value = '';
        songInput.value = '';
    });
}

initPlaylistForm();



// --------------------------------gift---------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const boton = document.getElementById('mostrarBoton');
    const textoDesplegable = document.getElementById('textoDesplegable');

    boton.addEventListener('click', function () {
        textoDesplegable.classList.toggle('mostrar');
    });
});


function copyText() {
    var aliasText = document.getElementById('alias').innerText; // Obtener el texto del alias
    var tempInput = document.createElement('input');
    tempInput.value = aliasText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Mostrar el mensaje de "¡Copiado!"
    var copyMessage = document.getElementById('copyMessage');
    copyMessage.style.display = 'block';
    setTimeout(function () {
        copyMessage.style.display = 'none';
    }, 1500); // Ocultar el mensaje después de 1.5 segundos
}



function copyCbuText() {
    const aliasText = document.getElementById('cbuAlias').textContent;
    const copyMessage = document.getElementById('copyCbuMessage');

    const textarea = document.createElement('textarea');
    textarea.value = aliasText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    copyMessage.style.display = 'block';
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 2000);
}



// --------------- confirmacion --------------------------------------


document.addEventListener('DOMContentLoaded', function () {
    // Definir los números de teléfono
    const recipientNumber1 = '543815668587'; // Número para el primer botón
    const recipientNumber2 = '543816591298'; // Número para el segundo botón

    // Función para enviar mensaje por WhatsApp
    function sendMessage(phoneNumber) {
        const userName = document.getElementById('userFullName').value.trim();
        const userMessage = document.getElementById('customMessage').value.trim();
        const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

        if (!attendanceStatus) {
            alert('Por favor, selecciona si asistirás o no.');
            return;
        }

        if (userName === '') {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const finalMessage = `*Presencia:* ${attendanceStatus.value}\n*Nombre y Apellido:* ${userName}\n*Mensaje:* ${userMessage ? userMessage : 'N/A'}`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

        // Abre la URL de WhatsApp en una nueva pestaña
        window.open(whatsappLink, '_blank');

        // Mostrar mensaje de confirmación
        alert('Mensaje enviado');

        // Limpiar los campos de entrada
        document.getElementById('userFullName').value = '';
        document.getElementById('customMessage').value = '';
        document.querySelectorAll('input[name="attendanceOption"]').forEach(radio => radio.checked = false);

        // Redirigir a la sección con id 'correo'
        window.location.hash = 'correo';
    }

    // Asignar eventos a los botones
    document.getElementById('btnConfirmacion1').addEventListener('click', function () {
        sendMessage(recipientNumber1);
    });

    document.getElementById('btnConfirmacion2').addEventListener('click', function () {
        sendMessage(recipientNumber2);
    });
});