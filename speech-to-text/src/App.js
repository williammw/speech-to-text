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
    <div className="App">
      <header className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            Speech to Text Transcription
          </h1>
        </div>
      </header>
      <main className="my-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <UploadForm />
          {isLoading && <ProgressBar progress={progress} />}
          {transcription && <TranscriptionText transcription={transcription} />}
          {error && <p className="text-red-500">{error}</p>}
          {transcription && <ResetButton />}
        </div>
      </main>
    </div>
  );
}

export default App;
