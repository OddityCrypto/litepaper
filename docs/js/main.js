document.addEventListener('DOMContentLoaded', () => {
    // Track current section and link
    let currentSection = document.querySelector('section');
    let currentLink = document.querySelector('.sidebar-nav a');

    // Set initial active states
    currentSection.classList.add('active');
    currentLink.classList.add('active');

    // Handle sidebar link clicks
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Update active link
            document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentLink = link;

            // Get and scroll to target section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active section
                document.querySelectorAll('section').forEach(s => {
                    s.classList.remove('active');
                    s.classList.add('inactive');
                });
                
                targetSection.classList.remove('inactive');
                targetSection.classList.add('active');
                currentSection = targetSection;

                // Smooth scroll
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Find current section
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                // Update active section
                if (currentSection !== section) {
                    document.querySelectorAll('section').forEach(s => {
                        s.classList.remove('active');
                        s.classList.add('inactive');
                    });
                    section.classList.remove('inactive');
                    section.classList.add('active');
                    currentSection = section;

                    // Update active link
                    const correspondingLink = document.querySelector(`.sidebar-nav a[href="#${section.id}"]`);
                    if (correspondingLink && correspondingLink !== currentLink) {
                        document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
                        correspondingLink.classList.add('active');
                        currentLink = correspondingLink;
                    }
                }
            }
        });
    });
}); 