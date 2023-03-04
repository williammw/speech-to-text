import React from 'react';
import { useSelector } from 'react-redux';
import { selectApiState } from './apiSlice';
import UploadForm from './components/UploadForm';
import ProgressBar from './components/ProgressBar';
import TranscriptionText from './components/TranscriptionText';
import ResetButton from './components/ResetButton';

function App() {
  const { isLoading, progress, transcription, error } =
    useSelector(selectApiState);

  return (
    <div className="mx-auto max-w-4xl my-8">
      <h1 className="text-3xl font-bold mb-4">Speech to Text Transcription</h1>
      <UploadForm />
      {isLoading && <ProgressBar progress={progress} />}
      {transcription && <TranscriptionText transcription={transcription} />}
      {error && <p className="text-red-500">{error}</p>}
      {transcription && <ResetButton />}
    </div>
  );
}

export default App;
