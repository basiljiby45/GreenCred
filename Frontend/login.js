document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.role === 'user') {
        window.location.href = 'home.html';
      } else if (data.role === 'volunteer') {
        window.location.href = 'volunteer.html';
      }
    } else {
      alert(data.error);
    }
  } catch (err) {
    alert('Login failed. Please try again.');
    console.error(err);
  }
});
