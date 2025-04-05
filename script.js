document.addEventListener('DOMContentLoaded', function() {
    // AI Builder Modal
    const getStartedBtn = document.getElementById('getStartedBtn');
    const aiModal = document.getElementById('aiModal');
    const closeModal = document.getElementById('closeModal');
    const generateBtn = document.getElementById('generateBtn');
    
    if (getStartedBtn && aiModal) {
        getStartedBtn.addEventListener('click', () => {
            aiModal.classList.remove('hidden');
        });
        
        closeModal.addEventListener('click', () => {
            aiModal.classList.add('hidden');
        });
        
        generateBtn.addEventListener('click', generateWebsite);
    }

    // Magical Submit Button Effects
    const magicButton = document.getElementById('magicSubmit');
    
    if (magicButton) {
        magicButton.addEventListener('click', function(e) {
            e.preventDefault();
            createParticles(this);
            setTimeout(() => {
                alert('Your message has been sent! ✨');
                this.closest('form').reset();
            }, 1000);
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3D Cube Interaction
    const cube = document.querySelector('.cube');
    if (cube) {
        let mouseX = 0;
        let mouseY = 0;
        let cubeX = 0;
        let cubeY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            
            cubeX = mouseX * 20;
            cubeY = -mouseY * 20;
            
            cube.style.transform = `rotateX(${cubeY}deg) rotateY(${cubeX}deg)`;
        });
    }
});

function generateWebsite() {
    const prompt = document.getElementById('aiPrompt').value;
    const style = document.getElementById('styleSelect').value;
    const color = document.getElementById('colorSelect').value;
    
    if (!prompt.trim()) {
        alert('Please describe your website requirements');
        return;
    }
    
    // Show loading state
    const generateBtn = document.getElementById('generateBtn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;
    
    // Simulate AI processing
    setTimeout(() => {
        const previewArea = document.getElementById('previewArea');
        const previewContent = document.getElementById('previewContent');
        
        // Generate preview based on inputs
        previewContent.innerHTML = `
            <div class="mb-4">
                <h4 class="text-xl font-semibold">Your ${style} Website</h4>
                <p class="text-gray-600">Based on: "${prompt}"</p>
            </div>
            <div class="flex flex-wrap gap-4">
                <div class="w-full md:w-1/3 bg-${color}-100 p-4 rounded-lg">
                    <h5 class="font-medium">Homepage</h5>
                    <p class="text-sm text-gray-500">Hero section with call-to-action</p>
                </div>
                <div class="w-full md:w-1/3 bg-${color}-100 p-4 rounded-lg">
                    <h5 class="font-medium">About</h5>
                    <p class="text-sm text-gray-500">Your story and team</p>
                </div>
                <div class="w-full md:w-1/3 bg-${color}-100 p-4 rounded-lg">
                    <h5 class="font-medium">Contact</h5>
                    <p class="text-sm text-gray-500">Form and social links</p>
                </div>
            </div>
            <div class="mt-6">
                <button class="px-6 py-3 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition-colors">
                    Continue to Build <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        `;
        
        previewArea.classList.remove('hidden');
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
        previewArea.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Builder Page Functionality
function initBuilderPage() {
    // Sidebar toggle functionality
    const sidebarIcons = document.querySelectorAll('.sidebar-icon');
    sidebarIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            sidebarIcons.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content section
            const sectionId = this.dataset.section;
            if(sectionId) {
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.add('hidden');
                });
                document.getElementById(sectionId).classList.remove('hidden');
            }
        });
    });

    // URL Importer
    const urlInput = document.querySelector('.url-importer');
    if(urlInput) {
        urlInput.addEventListener('change', function() {
            if(this.value) {
                // Show loading state
                const generateBtn = document.getElementById('generateBtn');
                const originalText = generateBtn.innerHTML;
                generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
                generateBtn.disabled = true;
                
                // Simulate URL analysis
                setTimeout(() => {
                    // Update preview with imported content
                    const preview = document.getElementById('aiPreview');
                    preview.innerHTML = `
                        <div class="p-4">
                            <h3 class="text-xl font-semibold mb-2">Imported from: ${this.value}</h3>
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div class="bg-purple-900/50 p-3 rounded-lg">
                                    <h4 class="font-medium">Color Scheme</h4>
                                    <p class="text-sm opacity-80">Extracted from source</p>
                                </div>
                                <div class="bg-purple-900/50 p-3 rounded-lg">
                                    <h4 class="font-medium">Layout</h4>
                                    <p class="text-sm opacity-80">Responsive design</p>
                                </div>
                            </div>
                        </div>
                    `;
                    generateBtn.innerHTML = originalText;
                    generateBtn.disabled = false;
                }, 2000);
            }
        });
    }

    // Generate button
    const generateBtn = document.getElementById('generateBtn');
    if(generateBtn) {
        generateBtn.addEventListener('click', function() {
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            this.disabled = true;
            
            // Simulate AI generation
            setTimeout(() => {
                // Create particle effect
                createParticles(this);
                
                // Show success modal
                document.getElementById('successModal').classList.remove('hidden');
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        });
    }
}

function createParticles(button) {
    const particles = 15;
    const buttonRect = button.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        const color = `hsl(${Math.random() * 60 + 300}, 100%, 50%)`;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 30;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.position = 'fixed';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.opacity = '1';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.boxShadow = `0 0 ${size}px ${size/2}px ${color}`;
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { 
                transform: `translate(-50%, -50%) translate(0, 0)`,
                opacity: 1 
            },
            { 
                transform: `translate(-50%, -50%) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`,
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
}