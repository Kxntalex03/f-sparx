document.addEventListener('DOMContentLoaded', () => {
  const apiInput = document.getElementById('apikey');
  const saveBtn = document.getElementById('saveKey');
  const testBtn = document.getElementById('testKey');
  const statusEl = document.getElementById('status');

  // Load saved key
  chrome.storage.sync.get(['geminiApiKey'], (result) => {
    if (result.geminiApiKey) {
      apiInput.value = result.geminiApiKey;
    }
  });

  // Save key
  saveBtn.addEventListener('click', () => {
    const key = apiInput.value.trim();
    if (!key) return statusEl.textContent = '❌ Please enter a valid key.';
    chrome.storage.sync.set({ geminiApiKey: key }, () => {
      statusEl.textContent = '✅ API key saved.';
    });
  });

  // Test key
  testBtn.addEventListener('click', async () => {
    const key = apiInput.value.trim();
    if (!key) return statusEl.textContent = '❌ Please enter a valid key before testing.';

    statusEl.textContent = '⏳ Testing...';

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + key, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Say hello" }] }]
        })
      });
      const data = await res.json();

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        statusEl.textContent = '✅ Gemini API is working!';
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      statusEl.textContent = '❌ API test failed. Check your key.';
    }
  });
});
