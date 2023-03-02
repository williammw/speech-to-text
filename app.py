from flask import Flask, request, send_file, render_template
import openai
import os
from dotenv import load_dotenv
import time
from pydub import AudioSegment


# Load environment variables from .env file
load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define function to convert Unicode to readable format and save to file


def save_transcription(transcription):
    # Extract the text from the transcription object
    text = transcription["text"]

    # Save the text to a file
    with open("transcription.txt", "w", encoding="utf-8") as f:
        f.write(text)

    # Return the path to the saved file
    return "transcription.txt"


# Initialize Flask app
app = Flask(__name__)

# Define endpoint to serve index.html


@app.route("/")
def index():
    return render_template("index.html")

# Define endpoint to handle file upload and transcription


@app.route("/transcribe", methods=["POST"])
def transcribe():
    # Get the uploaded file from the request
    file = request.files.get("audio")

    # Check if the file is an MP3 file
    if file.filename.endswith('.mp3'):
        # Start the timer
        start_time = time.time()

        # Convert the file to MP3 format
        audio = AudioSegment.from_file(file)
        file_path = f"./{file.filename}"
        audio.export(file_path, format="mp3")

        # Load the MP3 file as a file-like object
        with open(file_path, "rb") as f:
            # Transcribe the audio using the OpenAI API
            transcription = openai.Audio.transcribe("whisper-1", f)

        # End the timer
        end_time = time.time()

        # Save the transcription to a file
        transcription_path = save_transcription(transcription)

        # Calculate the execution time
        execution_time = end_time - start_time

        # Return a response with a link to download the transcription file
        return f"Transcription complete! Execution time: {execution_time} seconds. <a href='/download/{transcription_path}'>Download transcription</a>"
    else:
        return "Invalid file format. Supported format: MP3"


# Define endpoint to download transcription file


@app.route("/download/<path:path>")
def download(path):
    return send_file(path, as_attachment=True)


# Run the app
if __name__ == "__main__":
    app.run(debug=True)
