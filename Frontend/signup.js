document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;

    // Client-side validation
    if (!name || !username || !password || !rePassword || !email || !dob) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== rePassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        console.log('Sending signup request:', { name, username, email, dob }); // Debug log
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, username, password, email, dob }),
        });

        console.log('Server response status:', response.status); // Debug log
        const data = await response.json();
        console.log('Server response data:', data); // Debug log

        if (response.ok) {
            alert('Signup successful! Redirecting...');
            window.location.href = '/index.html';
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred. Please try again.');
    }
});