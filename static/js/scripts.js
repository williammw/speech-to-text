document.addEventListener("DOMContentLoaded", () => {

  const uploadForm = document.getElementById("upload-form");
  const audioInput = document.getElementById("audio");
  const chooseBtn = document.getElementById("choose-btn");
  const submitBtn = document.getElementById("submit-btn");
  const loadingIcon = document.getElementById("loading-icon");
  const processingText = document.getElementById("processing-text");
  const downloadLink = document.getElementById("download-link");
  const dropArea = document.getElementById("drop-area");
  const link = document.getElementById("link");

  // Show loading icon and hide other elements
  function showLoading() {
  chooseBtn.classList.add("hidden");
  submitBtn.classList.add("hidden");
  loadingIcon.classList.remove("hidden");
  processingText.classList.add("hidden");
  downloadLink.classList.add("hidden");
}

  // Show processing text and hide other elements
  function showProcessing() {
    loadingIcon.classList.add("hidden");
    processingText.classList.remove("hidden");
  }

  // Show submit button and hide other elements
  function showSubmitBtn() {
    processingText.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  }

  // Show download link
  function showDownloadLink(url) {
  downloadLink.href = url + "/transcription.txt";
  loadingIcon.classList.add("hidden");
  transcription.classList.remove("hidden");
  downloadLink.classList.remove("hidden");
}


  // Show notification message
  function showNotification(message) {
    document.getElementById("notification-text").textContent = message;
    document.getElementById("notification").classList.remove("hidden");
  }

  // Drag and drop file functionality
  dropArea.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dropArea.classList.add("hover");
  });

  dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("hover");
  });

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("hover");
    const file = e.dataTransfer.files[0];
    audioInput.files = [file];
    uploadForm.dispatchEvent(new Event("submit"));
  });

  // Choose file button functionality
  chooseBtn.addEventListener("click", () => {
    audioInput.click();
  });

  audioInput.addEventListener("change", () => {
    uploadForm.dispatchEvent(new Event("submit"));
  });

  // Form submit functionality
  uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/transcribe");
    xhr.upload.addEventListener("progress", (event) => {
      const percent = (event.loaded / event.total) * 100;
      document.getElementById("bar").style.width = percent + "%";
    });
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = xhr.responseText;
          const url = response.match(/href=['"]?([^'">]+)['"]?/)[1];
          showDownloadLink(url);
          showSubmitBtn();
          showNotification("Transcription complete!");
        } else {
          showNotification("Error: " + xhr.statusText);
        }
      } else {
        showLoading();
        showNotification("Uploading...");
      }
    };
    xhr.send(formData);
    showProcessing();
  });
});
