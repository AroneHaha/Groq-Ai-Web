const startMic = document.getElementById("mic-btn");
const promptText = document.getElementById("text-area");
const botVoiceResponse = document.querySelector('.response');
const microphoneIcon = startMic.querySelector("i")

// ======================== INITIALIZE VOICE RECOGNITION ========================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'en-US';

let isRecognizing = false;

startMic.addEventListener('click', () => {
    if (isRecognizing) {
        recognition.stop();
        microphoneIcon.className = 'fas fa-microphone';
    } else {
        microphoneIcon.className = 'fas fa-stop';
        recognition.start();
    }
    isRecognizing = !isRecognizing;
});


// ============ JUST IN CASE THERE/S BUG/S, ICON WILL AUTOMATICALLY GO BACK AS MIC =============
recognition.onend = () => {
    microphoneIcon.className = 'fas fa-microphone';
    isRecognizing = false;
};

// ======================== ON RESULT ========================
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    promptText.value = transcript;
};