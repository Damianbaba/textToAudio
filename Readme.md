# Text-to-WAV Conversion Script

This is a Node.js script that uses the `google-tts-api` library to convert text into WAV audio files. The script splits the input text into smaller chunks, generates audio URLs using Google Text-to-Speech API, and downloads the audio chunks as WAV files.

## Prerequisites

- Node.js installed
- `google-tts-api` package installed (`npm install google-tts-api`)

## Usage

1. Replace the placeholder text with the text you want to convert within the `text` variable.
2. Run the script using the terminal: `node main.js`.
