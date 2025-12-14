// dynamic-final.js - Efectos dinámicos para estructura original

class PortfolioEffects {
    constructor() {
        this.initEffects();
    }

    initEffects() {
        this.setupNavbarScroll();
        this.setupSkillAnimations();
        this.setupHover3DEffects();
        this.setupScrollReveal();
        this.setupCertificateModals();
        this.setupContactForm();
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    setupSkillAnimations() {
        // Animar barras de habilidades cuando son visibles
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = `${width}%`;
                    observer.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    setupHover3DEffects() {
        // Efecto 3D en cards
        const cards = document.querySelectorAll('.hover-grow');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale3d(1.05, 1.05, 1.05)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
        
        // Efecto de elevación
        const hoverLiftItems = document.querySelectorAll('.hover-lift');
        
        hoverLiftItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = 'var(--shadow-lg)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = 'var(--shadow-md)';
            });
        });
    }

    setupScrollReveal() {
        // Revelar elementos al hacer scroll
        const revealElements = document.querySelectorAll('[data-aos]');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    setupCertificateModals() {
        // Animación al abrir modales
        const certModals = document.querySelectorAll('.certificate-modal');
        
        certModals.forEach(modal => {
            modal.addEventListener('show.bs.modal', () => {
                const certificateDisplay = modal.querySelector('.certificate-display');
                if (certificateDisplay) {
                    certificateDisplay.style.opacity = '0';
                    certificateDisplay.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        certificateDisplay.style.transition = 'all 0.5s ease';
                        certificateDisplay.style.opacity = '1';
                        certificateDisplay.style.transform = 'scale(1)';
                    }, 100);
                }
            });
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateField(input);
            });
            
            input.addEventListener('blur', () => {
                if (input.value) {
                    input.classList.add('filled');
                } else {
                    input.classList.remove('filled');
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        
        if (!value) {
            field.classList.remove('valid');
            field.classList.add('invalid');
            return false;
        }
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.remove('valid');
                field.classList.add('invalid');
                return false;
            }
        }
        
        field.classList.remove('invalid');
        field.classList.add('valid');
        return true;
    }

    // Efecto de ripple en botones
    setupRippleEffects() {
        const buttons = document.querySelectorAll('.btn-hover-effect');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Añadir keyframes CSS para ripple
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioEffects();
    portfolio.setupRippleEffects();
    
    // Inicializar AOS si no está ya inicializado
    if (typeof AOS !== 'undefined' && !AOS.initialized) {
        AOS.init();
    }
});

// Helper para tooltips dinámicos
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = el.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = `${rect.top - 40}px`;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.zIndex = '9999';
            
            el._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', () => {
            if (el._tooltip) {
                el._tooltip.remove();
                delete el._tooltip;
            }
        });
    });
}

// Cargar tooltips cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTooltips);