document.addEventListener('DOMContentLoaded', () => {
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    const contentSections = document.querySelectorAll('.content-section');

    sidebarButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            contentSections.forEach(section => section.style.display = 'none');
            contentSections[index].style.display = 'block';
        });
    });

    // Simple hit counter
    let hitCount = localStorage.getItem('hitCounter') || 0;
    hitCount++;
    localStorage.setItem('hitCounter', hitCount);
    document.getElementById('hit-counter').textContent = `Visitors: ${hitCount}`;
});