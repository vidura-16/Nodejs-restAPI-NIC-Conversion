document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
  });
  document.getElementById('convertButton').addEventListener('click', async () => {
    const nicNumber = document.getElementById('nicInput').value;
    
    try {
      const response = await fetch('/api/auth/process-nic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ nicNumber })
      });
  
      if (response.ok) {
        const result = await response.json();
        document.getElementById('dob').innerText = `DOB: ${result.birthdate}`;
        document.getElementById('gender').innerText = `Gender: ${result.gender}`;
      } else {
        const data = await response.json();
        document.getElementById('conversionResult').innerText = data.message;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  
  // Check if user is authenticated, if not, redirect to login page
  if (!localStorage.getItem('token')) {
    window.location.href = '/index.html';
  }
  