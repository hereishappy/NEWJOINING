const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQF-wXDjpt6WfghxrPT8BCxcX-RP51QZHL9I41l5vYDR_r2aXKsYIhpW7D9N8KvfUi/exec';

const employeeForm = document.getElementById('employeeForm');
const uploadForm = document.getElementById('uploadForm');
const statusDiv = document.getElementById('status');

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
  }).catch(err => {
    statusDiv.textContent = 'Error: ' + err;
  });
});

uploadForm.addEventListener('submit', function(e) {
  e.preventDefault();
  statusDiv.textContent = 'Uploading...';
  const formData = new FormData(uploadForm);

  // Check for files before POST (best practice)
  let fileCount = 0;
  ['aadharFront', 'aadharBack', 'bankPassbook', 'photo'].forEach(
    k => { if (formData.get(k) instanceof File && formData.get(k).name) fileCount++; }
  );
  if (fileCount === 0) {
    statusDiv.textContent = "Please select at least one file before uploading.";
    return;
  }

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
  }).catch(err => {
    statusDiv.textContent = 'Error: ' + err;
  });
});
