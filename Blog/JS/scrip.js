function mostrarAlerta() {
    alert('Hola');
}


// ========================================
// BLOG DE MR. ROBOT - JAVASCRIPT COMPLETO
// Archivo: /Blog/JS/scrip.js
// ========================================

// ========================================
// SECCIÓN 1: INICIALIZACIÓN DE EMAILJS
// ========================================

(function() {
    // Inicializa EmailJS con tu Public Key
    emailjs.init({
        publicKey: "L96woTwYMmCUmhnyr"
    });
    
    console.log('✓ EmailJS inicializado correctamente');
})();


// ========================================
// SECCIÓN 2: ESPERAR A QUE EL DOM CARGUE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('✓ DOM cargado completamente');
    
    
    // ========================================
    // SECCIÓN 3: SELECCIÓN DE ELEMENTOS
    // ========================================
    
    const contactFormMrRobot = document.getElementById('contact-form-mrrobot');
    
    
    // ========================================
    // SECCIÓN 4: VALIDACIÓN DE EXISTENCIA
    // ========================================
    
    if (!contactFormMrRobot) {
        console.warn('⚠ Formulario no encontrado en esta página');
        return;
    }
    
    console.log('✓ Formulario encontrado, configurando eventos...');
    
    
    // ========================================
    // SECCIÓN 5: EVENT LISTENER DEL FORMULARIO
    // ========================================
    
    contactFormMrRobot.addEventListener('submit', function(e) {
        
        // Prevenir recarga de página
        e.preventDefault();
        
        console.log('📤 Formulario enviado, iniciando proceso...');
        
        
        // Obtener referencias a elementos
        const statusMessage = document.getElementById('status-message-mrrobot');
        const submitBtn = contactFormMrRobot.querySelector('button[type="submit"]');
        
        
        // Mostrar estado "Enviando"
        statusMessage.textContent = 'Enviando opinión...';
        statusMessage.style.color = '#e74c3c';
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        submitBtn.style.background = '#95a5a6';
        submitBtn.style.cursor = 'not-allowed';
        
        
        // Recopilar datos del formulario
        const params = {
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            opinion: document.getElementById('opinion').value
        };
        
        console.log('📋 Datos recopilados:', params);
        
        
        // Validación adicional
        if (!params.nombre || params.nombre.trim() === '') {
            console.error('❌ Error: Nombre vacío');
            statusMessage.textContent = 'Por favor ingresa tu nombre';
            statusMessage.style.color = '#e74c3c';
            submitBtn.disabled = false;
            submitBtn.textContent = '[ TRANSMITIR ]';
            submitBtn.style.background = '#e74c3c';
            submitBtn.style.cursor = 'pointer';
            return;
        }
        
        if (!params.correo || params.correo.trim() === '') {
            console.error('❌ Error: Correo vacío');
            statusMessage.textContent = 'Por favor ingresa tu correo';
            statusMessage.style.color = '#e74c3c';
            submitBtn.disabled = false;
            submitBtn.textContent = '[ TRANSMITIR ]';
            submitBtn.style.background = '#e74c3c';
            submitBtn.style.cursor = 'pointer';
            return;
        }
        
        if (!params.opinion || params.opinion.trim() === '') {
            console.error('❌ Error: Opinión vacía');
            statusMessage.textContent = 'Por favor ingresa tu opinión';
            statusMessage.style.color = '#e74c3c';
            submitBtn.disabled = false;
            submitBtn.textContent = '[ TRANSMITIR ]';
            submitBtn.style.background = '#e74c3c';
            submitBtn.style.cursor = 'pointer';
            return;
        }
        
        console.log('✅ Validación pasada, enviando email...');
        
        
        // Enviar email con EmailJS
        emailjs.send(
            'service_b10e16i',
            'template_blc3ef8',
            params
        )
        
        
        // Manejar respuesta exitosa
        .then(function(response) {
            
            console.log('✅ Email enviado exitosamente!');
            console.log('   Status:', response.status);
            console.log('   Text:', response.text);
            
            // Actualizar UI: Éxito
            statusMessage.textContent = '¡Opinión enviada correctamente! Gracias por tu mensaje sobre Mr. Robot.';
            statusMessage.style.color = '#27ae60';
            
            // Limpiar formulario
            contactFormMrRobot.reset();
            
            // Rehabilitar botón
            submitBtn.disabled = false;
            submitBtn.textContent = '[ TRANSMITIR ]';
            submitBtn.style.background = '#e74c3c';
            submitBtn.style.cursor = 'pointer';
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(function() {
                statusMessage.textContent = '';
                statusMessage.style.color = '';
            }, 5000);
            
        })
        
        
        // Manejar errores
        .catch(function(error) {
            
            console.error('❌ Error al enviar email');
            console.error('   Error completo:', error);
            console.error('   Status:', error.status || 'No disponible');
            console.error('   Text:', error.text || 'No disponible');
            
            // Determinar mensaje de error específico
            let errorMsg = 'Error al enviar: ';
            
            if (error.text) {
                if (error.text.includes('public key')) {
                    errorMsg = 'Error: Public Key inválida. Contacta al administrador.';
                    console.error('💡 Solución: Verifica la Public Key en el código');
                } else if (error.text.includes('service')) {
                    errorMsg = 'Error: Servicio de email no configurado correctamente.';
                    console.error('💡 Solución: Verifica el Service ID y que Gmail esté conectado');
                } else if (error.text.includes('template')) {
                    errorMsg = 'Error: Plantilla de email no encontrada.';
                    console.error('💡 Solución: Verifica el Template ID en EmailJS');
                } else {
                    errorMsg += error.text;
                }
            } else if (error.status === 0) {
                errorMsg = 'Error de conexión. Verifica tu internet o recarga la página.';
                console.error('💡 Solución: Verifica tu conexión a internet');
            } else {
                errorMsg = 'Error desconocido. Intenta nuevamente o contacta al administrador.';
                console.error('💡 Solución: Revisa la consola para más detalles');
            }
            
            // Actualizar UI: Error
            statusMessage.textContent = errorMsg;
            statusMessage.style.color = '#e74c3c';
            
            // Rehabilitar botón
            submitBtn.disabled = false;
            submitBtn.textContent = '[ TRANSMITIR ]';
            submitBtn.style.background = '#e74c3c';
            submitBtn.style.cursor = 'pointer';
        });
        
    });
    
    console.log('✓ Event listener configurado correctamente');
    
    
    // ========================================
    // SECCIÓN 6: FUNCIONALIDADES ADICIONALES
    // ========================================
    
    // Validar nombre (mínimo 3 caracteres)
    const nombreInput = document.getElementById('nombre');
    if (nombreInput) {
        nombreInput.addEventListener('blur', function() {
            if (this.value.length > 0 && this.value.length < 3) {
                alert('El nombre debe tener al menos 3 caracteres');
                this.focus();
            }
        });
    }
    
    
    // Contador de caracteres para opinión
    const opinionTextarea = document.getElementById('opinion');
    if (opinionTextarea) {
        const counter = document.createElement('div');
        counter.style.textAlign = 'right';
        counter.style.fontSize = '12px';
        counter.style.color = '#00ff41';
        counter.style.marginTop = '5px';
        counter.style.fontFamily = "'Courier New', monospace";
        
        opinionTextarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const length = opinionTextarea.value.length;
            const maxLength = 500;
            counter.textContent = `${length} / ${maxLength} caracteres`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#e74c3c';
            } else if (length > maxLength * 0.7) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#00ff41';
            }
        }
        
        opinionTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
    
    
    // Animación de entrada del formulario
    if (contactFormMrRobot) {
        contactFormMrRobot.style.opacity = '0';
        contactFormMrRobot.style.transform = 'translateY(20px)';
        contactFormMrRobot.style.transition = 'opacity 0.5s, transform 0.5s';
        
        setTimeout(function() {
            contactFormMrRobot.style.opacity = '1';
            contactFormMrRobot.style.transform = 'translateY(0)';
        }, 100);
    }
    
    
    // Scroll suave para enlaces del menú
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    console.log('✓ Todas las funcionalidades cargadas');
});


// ========================================
// SECCIÓN 7: FUNCIONES GLOBALES
// ========================================

// Función para alertas personalizadas (opcional)
function mostrarAlerta(mensaje) {
    alert(mensaje);
}

// Función para mensajes temporales
function showTemporaryMessage(message, duration = 3000) {
    const tempMsg = document.createElement('div');
    tempMsg.textContent = message;
    tempMsg.style.position = 'fixed';
    tempMsg.style.top = '20px';
    tempMsg.style.right = '20px';
    tempMsg.style.background = '#2ecc71';
    tempMsg.style.color = 'white';
    tempMsg.style.padding = '15px 25px';
    tempMsg.style.borderRadius = '5px';
    tempMsg.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    tempMsg.style.zIndex = '9999';
    tempMsg.style.transition = 'opacity 0.3s';
    tempMsg.style.fontFamily = "'Courier New', monospace";
    
    document.body.appendChild(tempMsg);
    
    setTimeout(function() {
        tempMsg.style.opacity = '0';
        setTimeout(function() {
            if (tempMsg.parentNode) {
                document.body.removeChild(tempMsg);
            }
        }, 300);
    }, duration);
}


// ========================================
// FIN DEL ARCHIVO
// ========================================

console.log('✓ Script scrip.js cargado completamente');
