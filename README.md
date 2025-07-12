# F* Sprx

F* Sprx is a Chrome extension that automatically reads Sparx Maths & Science questions, solves them via OpenAI, and fills in the answer fields—cutting down homework time to seconds.

## Features

- Auto-detects whether a question is Maths or Science  
- Sends prompt to OpenAI’s chat‐completion endpoint  
- Auto-fills answer fields when they appear  
- Quick mode toggle: Auto, Maths only, Science only  

## Setup & Installation

1. Clone this repo  
2. `npm install`  
3. `npm run build`  
4. Open Chrome → Extensions → Enable Developer Mode → Load unpacked → Select this project’s root folder  

## Configuring Your API Key

> **Warning:** Don’t commit your key to a public repo.  

- In `src/background.js`, replace the `OPENAI_API_KEY` value with your own key  
- (Optional) Move the key into `chrome.storage.sync` or use a `.env` + Webpack DefinePlugin for better security  

## Development

- `npm run watch` to rebuild on file changes  
- Inspect background logs via chrome://extensions → Service Worker → Inspect  
- Edit source files in `src/`

## Folder Structure

