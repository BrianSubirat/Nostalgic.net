document.addEventListener('DOMContentLoaded', () => {
    const mobileNavButtons = document.querySelectorAll('.mobile-nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    mobileNavButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            contentSections.forEach(section => section.style.display = 'none');
            contentSections[index].style.display = 'block';
        });
    });

    // Handle window resize for responsive behavior
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            // If switching back to desktop, ensure content visibility is correct
            const activeIndex = Array.from(mobileNavButtons).findIndex(
                button => button.classList.contains('active')
            );
            if (activeIndex >= 0) {
                document.querySelectorAll('.sidebar-button')[activeIndex].click();
            }
        }
    });

    // Add active state to buttons
    function setActiveButton(buttons, index) {
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons[index].classList.add('active');
    }

    mobileNavButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            setActiveButton(mobileNavButtons, index);
        });
    });
});