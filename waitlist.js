// Select the form and the success message container
const form = document.querySelector('.waitlist-form');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  // Create a FormData object from the form
  const formData = new FormData(form);

  // Submit the form data via fetch
  fetch(form.action, {
    method: form.method,
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      // Show the success message (you can also use a modal or alert)
      successMessage.style.display = 'block';
      // Optionally reset the form
      form.reset();
      // Hide the message after a few seconds (optional)
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    } else {
      // Handle error response (customize as needed)
      alert('Error: ' + JSON.stringify(data.error));
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  });
});
