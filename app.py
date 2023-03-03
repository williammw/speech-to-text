import tempfile
from tempfile import NamedTemporaryFile
from flask import Flask, request, send_file, render_template
import openai
import os
from dotenv import load_dotenv
import time
from pydub import AudioSegment
import json

# Load environment variables from .env file
load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define function to convert Unicode to readable format and save to file


def save_transcription(transcription_text, save_dir):
    transcription_path = os.path.join(save_dir, 'transcription.txt')

    with open(transcription_path, 'w') as f:
        f.write(transcription_text)

    return transcription_path


# Initialize Flask app
app = Flask(__name__)

# Define endpoint to serve index.html


@app.route("/")
def index():
    return render_template("index.html")

# Define endpoint to handle file upload and transcription

# Define endpoint to handle file upload and transcription


@app.route("/transcribe", methods=["POST"])
def transcribe():
    # Get the uploaded file from the request
    file = request.files.get("audio")

    # Check if the file is an MP3 file
    if file.filename.endswith('.mp3'):
        # Start the timer
        start_time = time.time()

        # Load the input file using PyDub
        audio = AudioSegment.from_file(file)

        # Split the audio file into 10-minute segments
        segment_length = 10 * 60 * 1000  # 10 minutes in milliseconds
        audio_segments = []
        for i in range(0, len(audio), segment_length):
            segment = audio[i:i+segment_length]
            audio_segments.append(segment)

        # Transcribe each audio segment using the Whisper API
        transcriptions = []
        for i, segment in enumerate(audio_segments):
            with tempfile.NamedTemporaryFile(suffix='.mp3') as temp_file:
                # Export the audio segment to a temporary file
                segment.export(temp_file.name, format='mp3')

                # Transcribe the audio using the OpenAI API
                transcription = openai.Audio.transcribe("whisper-1", temp_file)
                transcriptions.append(transcription['text'])

        # Concatenate the transcriptions into a single string
        transcription_text = '\n'.join(transcriptions)

        # End the timer
        end_time = time.time()

        # Save the transcription to a file
        save_dir = os.path.dirname(os.path.abspath(__file__))
        transcription_path = save_transcription(transcription_text, save_dir)

        # Calculate the execution time
        execution_time = end_time - start_time

        # Return a response with a link to download the transcription file
        return f"Transcription complete! Execution time: {execution_time} seconds. <a href='/download/{transcription_path}'>Download transcription</a>"
    else:
        return "Invalid file format. Supported format: MP3"



# Define endpoint to download transcription file
@app.route("/download/<path:path>")
def download(path):
    return send_file(
        path,
        as_attachment=True,
        download_name=os.path.basename(path) or "transcription.txt",
        max_age=0,
        cache_timeout=0,
    )


# Run the app
if __name__ == "__main__":
    app.run(debug=True)
