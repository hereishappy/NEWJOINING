// CHANGE THIS URL TO YOUR APPS SCRIPT WEB APP URL
const SCRIPT_URL = 'YOUR_SCRIPT_WEB_APP_URL'; // e.g. https://script.google.com/macros/s/xxxxxx/exec

const employeeForm = document.getElementById('employeeForm');
const uploadForm = document.getElementById('uploadForm');
const statusDiv = document.getElementById('status');

// Handle employee form
employeeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  statusDiv.textContent = 'Submitting...';
  const formData = new FormData(employeeForm);
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(data => {
      statusDiv.textContent = data.message || 'Data saved!';
    }).catch(err => {
      statusDiv.textContent = 'Error: ' + err;
    });
});

// Handle uploads
uploadForm.addEventListener('submit', function(e) {
  e.preventDefault();
  statusDiv.textContent = 'Uploading...';
  const formData = new FormData(uploadForm);
  fetch(`${SCRIPT_URL}?action=upload`, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(data => {
      statusDiv.textContent = data.message || 'Files uploaded!';
    }).catch(err => {
      statusDiv.textContent = 'Error: ' + err;
    });
});