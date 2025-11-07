const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQF-wXDjpt6WfghxrPT8BCxcX-RP51QZHL9I41l5vYDR_r2aXKsYIhpW7D9N8KvfUi/exec';

const employeeForm = document.getElementById('employeeForm');
const uploadForm = document.getElementById('uploadForm');
const statusDiv = document.getElementById('status');

// Handle employeeForm data submission
employeeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  statusDiv.textContent = 'Submitting...';
  const formData = new FormData(employeeForm);
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(text => {
    let data;
    try { data = JSON.parse(text); } catch {
      statusDiv.textContent = 'Unexpected server response: ' + text;
      return;
    }
    statusDiv.textContent = data.message || 'Data saved!';
  })
  .catch(err => {
    statusDiv.textContent = 'Error: ' + err;
  });
});

// Handle uploadForm file uploads with employee folder creation
uploadForm.addEventListener('submit', function(e) {
  e.preventDefault();
  statusDiv.textContent = 'Uploading...';
  const formData = new FormData(uploadForm);
  // Important: attach action so backend knows this is a file upload
  formData.append('action', 'upload');
  
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: formData
  })
  .then(res => res.text())
  .then(text => {
    let data;
    try { data = JSON.parse(text); } catch {
      statusDiv.textContent = 'Unexpected server response: ' + text;
      return;
    }
    statusDiv.textContent = data.message || 'Files uploaded!';
  })
  .catch(err => {
    statusDiv.textContent = 'Error: ' + err;
  });
});
