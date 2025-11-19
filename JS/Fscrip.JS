// ========================================
// MANEJO DE SPOILERS Y MÚSICA
// /Blog/JS/final-spoilers.js
// ========================================

// Variables globales
let musicaActiva = false;
const audio = document.getElementById('final-music');

// Función para revelar contenido
function revelarContenido() {
    // Ocultar overlay de spoilers
    const overlay = document.getElementById('spoiler-overlay');
    overlay.style.display = 'none';
    
    // Mostrar contenido principal
    const contenido = document.getElementById('contenido-principal');
    contenido.style.display = 'block';
    
    // Animación suave
    contenido.style.opacity = '0';
    setTimeout(() => {
        contenido.style.transition = 'opacity 1s';
        contenido.style.opacity = '1';
    }, 100);
    
    // Scroll al inicio
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    console.log('Contenido revelado - Spoilers aceptados');
}

// Función para reproducir/pausar música
function toggleMusica() {
    const btnMusica = document.querySelector('.btn-musica');
    
    if (!audio) {
        alert('Archivo de audio no encontrado. Por favor, agrega el archivo en /Blog/audio/mr-robot-finale.mp3');
        return;
    }
    
    if (musicaActiva) {
        // Pausar música
        audio.pause();
        btnMusica.textContent = '🎵 Reproducir música del final';
        btnMusica.style.background = '#667eea';
        musicaActiva = false;
        console.log('Música pausada');
    } else {
        // Reproducir música
        audio.play().catch(function(error) {
            console.error('Error al reproducir audio:', error);
            alert('No se pudo reproducir el audio. Verifica que el archivo existe.');
        });
        btnMusica.textContent = '⏸️ Pausar música';
        btnMusica.style.background = '#e74c3c';
        musicaActiva = true;
        console.log('Música reproduciendo');
    }
}

// Configurar volumen del audio
if (audio) {
    audio.volume = 0.3; // 30% de volumen
    console.log('Audio configurado - volumen al 30%');
}

// Prevenir que el overlay se cierre accidentalmente
const overlay = document.getElementById('spoiler-overlay');
if (overlay) {
    overlay.addEventListener('click', function(e) {
        // Solo cerrar si hacen click en el modal mismo, no en el fondo
        if (e.target === this) {
            // No hacer nada
        }
    });
}

// Log de carga
console.log('Script final-spoilers.js cargado correctamente');
