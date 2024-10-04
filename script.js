const start = document.getElementById("start-btn");
const stopp = document.getElementById("stop-btn");

const alltext = document.getElementById("finalTranscript");

start.addEventListener("click", startRecording);

stopp.addEventListener("click", stopRecording);

const textOutput = document.getElementById("output");

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

window.onload = getLocalStream();

function startRecording() {
  console.log("start recording");

  recognition.start();
  outputAudioData();
}

function stopRecording() {
  console.log("stop recording");
  recognition.stop();
}

function getLocalStream() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      console.log("Got stream");
    })
    .catch((err) => {
      console.error("Error: " + err);
    });
}

const allWordsSet = new Set(); // Persistent set to store all unique words

function outputAudioData() {
  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    const words = transcript.split(" ");
    console.log("words", words);

    // Add the new words to the persistent Set
    words.forEach((word) => {
      allWordsSet.add(word); // Set automatically handles duplicates
    });

    console.log("allWordsSet", allWordsSet);

    // Get the latest word from the transcript and display it
    const latestWord = words[words.length - 1];
    textOutput.innerHTML = latestWord;

    // Update the alltext DOM element after a delay with new unique words
    setTimeout(() => {
      alltext.innerHTML = ""; // Clear the DOM content first
      allWordsSet.forEach((word) => {
        alltext.innerHTML += word + " "; // Append all unique words
      });
    }, 500);
  };
}
