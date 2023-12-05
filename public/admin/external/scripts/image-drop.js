function previewImage() {
      // Get the file input element
      const fileInput = document.getElementById('fileInput');

      // Check if a file is selected
      if (fileInput.files.length > 0) {
        // Get the first file
        const file = fileInput.files[0];

        // Create a FileReader to read the file
        const reader = new FileReader();

        // Define the onload event to set the preview image source
        reader.onload = function (e) {
          const previewImage = document.getElementById('preview-image');
          previewImage.src = e.target.result;
          document.getElementById('preview-container').style.display = 'block';
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }