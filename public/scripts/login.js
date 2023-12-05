const container = document.getElementById('auth');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const signUp = document.getElementById('register-form');
const signIn = document.getElementById('login-form');

signUp.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const formData = {
      email: signUp.elements['email'].value,
      password: signUp.elements['password'].value
    };    
    console.log(formData);
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
        })
        .then(response => {
          console.log('Response from server:',response );
          window.location.href = response.url;
        })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
    });
})
signIn.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const formData = {
    email: signIn.elements['email'].value,
    password: signIn.elements['password'].value
  };
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if(!response.ok) {
      return response.text();
    }
    return window.location.href = response.url;
  })
  .then(data => {
    console.log('Response from server:', data);
  })
  
  .catch(error => {
    // Xử lý lỗi khi có lỗi kết nối hoặc lỗi từ server
    console.log('Error:', error.message);
  });
});
