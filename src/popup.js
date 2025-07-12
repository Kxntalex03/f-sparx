// src/popup.js

document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="mode"]');

  chrome.storage.sync.get({ mode: 'auto' }, ({ mode }) => {
    document.querySelector(`input[value="${mode}"]`).checked = true;
  });

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      chrome.storage.sync.set({ mode: radio.value });
    });
  });
});
