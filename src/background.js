// src/background.js

// Temporary hard-coded API key – move to chrome.storage or env in production
const OPENAI_API_KEY = 'AIzaSyCXBl-ig44AvbQK1vzAbZJf7mkVVo4YxmY';

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === 'solveMath') {
    solveViaOpenAI(`Solve this math problem step by step: ${message.question}`)
      .then(answer => sendResponse({ answer }))
      .catch(() => sendResponse({ answer: '' }));
  } else if (message.type === 'solveScience') {
    solveViaOpenAI(`Explain how to answer this science question: ${message.question}`)
      .then(answer => sendResponse({ answer }))
      .catch(() => sendResponse({ answer: '' }));
  }
  return true; // keep channel open for async response
});

async function solveViaOpenAI(prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 256,
      temperature: 0
    })
  });

  if (!res.ok) throw new Error('OpenAI error');
  const { choices } = await res.json();
  return choices[0].message.content.trim();
}
