const express = require('express');
const multer = require('multer');
const fs = require('fs');
const openai = require('openai');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Set OpenAI API key
openai.api_key = process.env.OPENAI_API_KEY;

// Define middleware to handle file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = uuidv4() + path.extname(file.originalname);
    cb(null, filename);
  },
});
const upload = multer({ storage });

// Define endpoint to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define endpoint to handle file upload and transcription
app.post('/api/transcribe', upload.single('audio'), (req, res) => {
  // Check if the file is an MP3 file
  if (req.file && req.file.mimetype === 'audio/mpeg') {
    // Start the timer
    const startTime = new Date().getTime();

    // Split the audio file into 10-minute segments
    const segmentLength = 5 * 60 * 1000; // 10 minutes in milliseconds
    const filePath = req.file.path;
    const audioSegments = [];
    const ffmpegCommand = `ffmpeg -i ${filePath} -f segment -segment_time ${segmentLength / 1000} -c copy uploads/%03d${path.extname(filePath)}`;
    exec(ffmpegCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`ffmpeg error: ${error.message}`);
        res.send('Transcription failed.');
        return;
      }
      if (stderr) {
        console.error(`ffmpeg stderr: ${stderr}`);
        res.send('Transcription failed.');
        return;
      }
      const files = fs.readdirSync('uploads/').filter((file) => file !== req.file.filename);
      files.sort();
      let transcriptions = [];
      let combinedSegment = null;
      for (let i = 0; i < files.length; i++) {
        const segment = fs.readFileSync('uploads/' + files[i]);
        audioSegments.push(segment);
        // Combine segment with previous segment(s) if length is less than segment length
        if (combinedSegment !== null && combinedSegment.length + segment.length < segmentLength) {
          combinedSegment = Buffer.concat([combinedSegment, segment]);
        } else if (combinedSegment !== null) {
          segment = Buffer.concat([combinedSegment, segment]);
          combinedSegment = null;
        }

        // Transcribe the audio using the OpenAI API
        openai.Audio.transcribe('whisper-1', segment, (err, result) => {
          if (err) {
            console.error(err);
            res.send('Transcription failed.');
            return;
          }
          transcriptions.push(result.text);
          if (transcriptions.length === audioSegments.length) {
            // Concatenate the transcriptions into a single string
            const transcriptionText = transcriptions.join('\n');

            // End the timer
            const endTime = new Date().getTime();

            // Save the transcription to a file
            const transcriptionPath = `transcription_${uuidv4()}.txt`;
            fs.writeFileSync(transcriptionPath, transcriptionText);

            // Calculate the execution time
            const executionTime = (endTime - startTime) / 1000;
                    // Return a response with a link to download the transcription file
        res.send(`Transcription complete! Execution time: ${executionTime} seconds. <a href='/download/transcription'>Download transcription</a>`);
    });
} else {
    res.status(400).send("Invalid file format. Supported format: MP3");
}});

// Define endpoint to download transcription file
app.get('/download/transcription', (req, res) => {
const path = path.join(__dirname, 'transcription.txt');
const downloadName = `transcription_${uuidv4()}.txt`;
res.download(path, downloadName);
});

// Define endpoint to return transcriptions as JSON
app.get('/api/transcriptions', (req, res) => {
const path = path.join(__dirname, 'transcription.txt');
const transcriptionText = fs.readFileSync(path, 'utf-8');
const transcriptions = transcriptionText.split('\n');
res.json(transcriptions);
});

// Start the app
const port = process.env.PORT || 5000;
app.listen(port, () => {
console.log(`App listening on port ${port}`);
});

