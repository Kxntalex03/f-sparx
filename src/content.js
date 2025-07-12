// src/content.js

(() => {
  let mode = 'auto';

  chrome.storage.sync.get({ mode: 'auto' }, res => {
    mode = res.mode;
  });

  const observer = new MutationObserver(() => {
    const questionEl = document.querySelector('.question-text');
    const answerInput = document.querySelector('input.answer');

    if (questionEl && answerInput && !answerInput.value) {
      const question = questionEl.innerText;
      const subject = mode === 'auto' ? detectSubject(question) : mode;
      const msgType = subject === 'math' ? 'solveMath' : 'solveScience';

      chrome.runtime.sendMessage(
        { type: msgType, question },
        response => {
          if (response?.answer) {
            answerInput.value = response.answer;
            answerInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        }
      );
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  function detectSubject(text) {
    const mathKeywords = ['calculate', 'solve', '\\d+', 'x', 'y'];
    return mathKeywords.some(k => new RegExp(k).test(text)) ? 'math' : 'science';
  }
})();
