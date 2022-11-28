// 1) Instantiate Upload.js (at start of app).
const upload = Upload({ apiKey: "free" })

// <input type="file" onchange="onFileSelected(event)" />
async function onFileSelected(event) { 
  try {
    // 2) Hide upload button when upload starts.
    uploadButton.remove()
    
    // 3) Upload file & show progress.
    const [ file ]    = event.target.files
    const { fileUrl } = await upload.uploadFile(file, { 
      onProgress: ({ progress }) => 
        h2.innerHTML = `File uploading... ${progress}%`
    })
    
    // 4) Display uploaded file URL.
    h2.innerHTML = `
      Step 1: Upload an image
      <br>
      File uploaded:
      <a href="${fileUrl}" target="_blank">${fileUrl}</a>`
  } catch(e) {
    // 5) Display errors.
    h2.innerHTML = `Please try another file:<br/><br/>${e.message}`
  }
}