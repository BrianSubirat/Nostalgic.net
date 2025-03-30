document.addEventListener('DOMContentLoaded', () => {
    function updateSystemClock() {
        const clockElement = document.getElementById('system-clock');
        const now = new Date();
        clockElement.textContent = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    // Update clock every second
    setInterval(updateSystemClock, 1000);
    updateSystemClock(); // Initial call
});

