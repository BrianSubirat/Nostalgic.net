document.addEventListener('DOMContentLoaded', () => {
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookEntries = document.getElementById('guestbook-entries');

    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');

        if (nameInput.value && messageInput.value) {
            const entry = document.createElement('div');
            entry.innerHTML = `
                <strong>${nameInput.value}</strong>: 
                ${messageInput.value}
                <hr>
            `;
            guestbookEntries.prepend(entry);
            
            // Clear inputs
            nameInput.value = '';
            messageInput.value = '';
        }
    });
});