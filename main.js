const fs = require('fs');
const googleTTS = require('google-tts-api');

// Function to convert text to WAV file
async function textToWav(text, outputFile) {
    const chunkSize = 300; // Define the desired chunk size (can be adjusted as needed)
    const chunks = [];

    // Split the text into smaller chunks
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }

    const promises = [];

    // Generate audio URL and download for each chunk
    for (let i = 0; i < chunks.length; i++) {
        const url = googleTTS.getAudioUrl(chunks[i], {
            lang: 'en',
            slow: false,
            host: 'https://translate.google.com',
        });

        const file = fs.createWriteStream(`${outputFile}_${i}.wav`);

        const promise = new Promise((resolve, reject) => {
            require('https')
                .get(url, (response) => {
                    response.pipe(file);
                    response.on('end', () => {
                        resolve();
                    });
                })
                .on('error', (err) => {
                    console.error(err);
                    reject(err);
                });
        });

        promises.push(promise);
    }

    await Promise.all(promises);
}

// Usage
const text = 'Paste text here to convert';

const outputFile = 'output';

textToWav(text, outputFile)
    .then(() => {
        console.log('Conversion completed.');
    })
    .catch((error) => {
        console.error('Conversion failed:', error);
    });

// //In treminal Node main.js to start conversion 



