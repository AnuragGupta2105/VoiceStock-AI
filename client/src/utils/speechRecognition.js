export function startVoiceRecognition(onResult) {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert("Speech Recognition is not supported in this browser.");

    return;

  }

  const recognition = new SpeechRecognition();

  // ==========================
  // Configuration
  // ==========================

  recognition.lang = "en-IN"; // Better for English + Hindi

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  recognition.continuous = false;

  // ==========================
  // Start after small delay
  // ==========================

  setTimeout(() => {

    recognition.start();

  }, 300);

  // ==========================
  // Success
  // ==========================

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript.trim();

    recognition.stop();

    onResult(transcript);

  };

  // ==========================
  // Error
  // ==========================

  recognition.onerror = (event) => {

    console.log("Speech Error:", event.error);

    recognition.stop();

    onResult("");

  };

  // ==========================
  // End
  // ==========================

  recognition.onend = () => {

    recognition.stop();

  };

}