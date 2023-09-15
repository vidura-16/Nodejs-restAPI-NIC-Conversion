document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registrationForm').style.display = 'none';
  });
  
  document.getElementById('showRegistration').addEventListener('click', function() {
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
  });
  
  
  document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        document.getElementById('registrationMessage').innerText = data.message;
        
        // Clear the input fields
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
    } catch (error) {
        console.error('Error:', error);
    }
});

  
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard.html';
      } else {
        document.getElementById('loginMessage').innerText = data.message;
      }
    } catch (error) {
      console.error('Error:', error);
    }
     // Clear the input fields
     document.getElementById('loginUsername').value = '';
     document.getElementById('loginPassword').value = '';
  });
  