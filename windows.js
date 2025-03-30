import anime from 'anime';

document.addEventListener('DOMContentLoaded', () => {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(window => {
        const titleBar = window.querySelector('.window-title-bar');
        
        // Make windows draggable
        titleBar.addEventListener('mousedown', startDragging);
    });

    function startDragging(e) {
        const window = e.target.closest('.window');
        const startX = e.clientX - window.offsetLeft;
        const startY = e.clientY - window.offsetTop;

        function moveWindow(e) {
            window.style.left = `${e.clientX - startX}px`;
            window.style.top = `${e.clientY - startY}px`;
        }

        function stopDragging() {
            document.removeEventListener('mousemove', moveWindow);
            document.removeEventListener('mouseup', stopDragging);
        }

        document.addEventListener('mousemove', moveWindow);
        document.addEventListener('mouseup', stopDragging);
    }

    // Window controls
    const controls = document.querySelectorAll('.window-controls button');
    controls.forEach(control => {
        control.addEventListener('click', (e) => {
            const window = e.target.closest('.window');
            const action = e.target.className;

            switch(action) {
                case 'close':
                    anime({
                        targets: window,
                        opacity: [1, 0],
                        scale: [1, 0.5],
                        duration: 300,
                        complete: () => window.style.display = 'none'
                    });
                    break;
                case 'minimize':
                    window.style.minHeight = '30px';
                    break;
                case 'maximize':
                    window.style.width = '100%';
                    window.style.height = '100%';
                    break;
            }
        });
    });
});