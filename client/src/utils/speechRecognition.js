export function startVoiceRecognition(onResult) {

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {

    alert(
      "Speech Recognition is not supported in this browser."
    );

    return;

  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {

    const transcript =
      event.results[0][0].transcript;

    onResult(transcript);

  };

  recognition.onerror = (event) => {

    let message = "";

    switch (event.error) {

      case "not-allowed":
        message =
          "Microphone permission denied.";
        break;

      case "network":
        message =
          "Network error. Check your internet.";
        break;

      case "no-speech":
        message =
          "No speech detected.";
        break;

      case "audio-capture":
        message =
          "No microphone found.";
        break;

      default:
        message =
          "Voice recognition failed.";

    }

    onResult(null, message);

    recognition.stop();

  };

}