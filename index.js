navigator.mediaDevices
  .getUserMedia({ audio: true, video: true })
  .then((mediaStreamObj) => {
    let video = document.getElementById("video-1");
    video.srcObject = mediaStreamObj;

    // get elements from dom
    let startRecording = document.getElementById("start-recording");
    let stopRecording = document.getElementById("stop-recording");
    let videoPreview = document.getElementById("video-2");
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let dataChunks = [];

    // add listeners to html elements
    // start recording
    startRecording.addEventListener("click", (event) => {
      console.log("RECORDING STARTED");
      startRecording.style.backgroundColor = "black";
      startRecording.style.color = "white";
      mediaRecorder.start();
    });
    // stop recording
    stopRecording.addEventListener("click", (event) => {
      mediaRecorder.stop();
      alert("RECORDING STOPPED");
      startRecording.style.backgroundColor = "white";
      startRecording.style.color = "black";
    });
    // pushing real time data into dataChunks
    mediaRecorder.ondataavailable = (event) => {
      dataChunks.push(event.data);
    };
    // save the video as a BLOB
    mediaRecorder.onstop = (event) => {
      let blob = new Blob(dataChunks, { type: "video/mp4" });
      dataChunks = [];
      let videoURL = window.URL.createObjectURL(blob);
      console.log(typeof videoURL);
      videoPreview.src = videoURL;
    };
  })
  .catch((error) => {
    console.log(error);
  });
