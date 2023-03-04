Flask Backend (app.py)
Overview
This Flask app serves as a backend for a speech-to-text transcription web application. It handles audio file uploads, uses the OpenAI API to transcribe the audio, and allows users to download the resulting transcription in a text file.

Dependencies
Flask: a lightweight web framework for Python
PyDub: a Python audio processing library
OpenAI API: an API for generating and understanding language
Endpoints
/
This endpoint returns the index.html file, which contains the user interface for the speech-to-text transcription web application.

/api/transcribe
This endpoint accepts a POST request with an audio file attached in the audio field. It uses the PyDub library to split the audio file into 5-minute segments and transcribes each segment using the OpenAI API. The resulting transcriptions are combined into a single text file, which is saved to the server. The endpoint returns a message indicating that the transcription is complete and provides a link to download the resulting text file.

/download/transcription
This endpoint allows users to download the resulting transcription text file. It sends the file as an attachment with a unique download name generated using the uuid library.

Running the Application
To run the Flask app, first install the dependencies using pip install -r requirements.txt. Then, run the app using python app.py. The app will run on http://localhost:5000/.

React Frontend (app.js)
Overview
This React app serves as the frontend for a speech-to-text transcription web application. It allows users to upload an audio file, displays the progress of the transcription, and shows the resulting transcription text. Users can also download the resulting transcription text file.

Dependencies
React: a JavaScript library for building user interfaces
axios: a JavaScript library for making HTTP requests
react-dropzone: a React library for drag-and-drop file uploads
Components
UploadForm: a component that allows users to upload an audio file and displays the progress of the transcription
TranscriptionText: a component that displays the resulting transcription text
DownloadButton: a component that allows users to download the resulting transcription text file
State Management
The UploadForm component uses the useState hook to manage the following state:

selectedFile: the currently selected audio file
uploadProgress: the progress of the file upload
isUploading: a boolean indicating whether a file is currently being uploaded
error: an error message to display if the upload fails
The TranscriptionText component uses the useSelector hook from the react-redux library to access the transcription state value from the Redux store.

Handling File Uploads
The UploadForm component uses the onDrop event handler from the react-dropzone library to handle file uploads. When a file is dropped onto the upload area, the handleDrop function is called, which sets the selectedFile state to the dropped file. When the form is submitted, the handleUpload function sends an HTTP POST request to the /api/transcribe endpoint on the Flask backend, with the selected file attached in the audio field. The onUploadProgress callback function updates the uploadProgress state to show the progress of the upload.

Displaying Transcription Text
The TranscriptionText component uses the transcription state value from the Redux store to display the resulting transcription text. If the `