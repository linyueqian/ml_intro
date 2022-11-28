window.onload = function() {

  const file = document.getElementById("file-input");
  const canvas = document.getElementById("canvas");
  const h3 = document.getElementById('name')
  const audio = document.getElementById("audio");

  file.onchange = function() {

    const files = this.files; // FileList containing File objects selected by the user (DOM File API)
    console.log('FILES[0]: ', files[0])
    audio.src = URL.createObjectURL(files[0]); // Creates a DOMString containing the specified File object

    const name = files[0].name
    h3.innerText = `${name}` // Sets <h3> to the name of the file

    ///////// <CANVAS> INITIALIZATION //////////
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ///////////////////////////////////////////


    const context = new AudioContext(); // (Interface) Audio-processing graph
    let src = context.createMediaElementSource(audio); // Give the audio context an audio source,
    // to which can then be played and manipulated
    const analyser = context.createAnalyser(); // Create an analyser for the audio context

    src.connect(analyser); // Connects the audio context source to the analyser
    analyser.connect(context.destination); // End destination of an audio graph in a given context
    // Sends sound to the speakers or headphones


    /////////////// ANALYSER FFTSIZE ////////////////////////
    analyser.fftSize = 16384;


    const bufferLength = analyser.frequencyBinCount; // (read-only property)
    const dataArray = new Uint8Array(bufferLength); // Converts to 8-bit unsigned integer array
    // At this point dataArray is an array with length of bufferLength but no values
    console.log('DATA-ARRAY: ', dataArray) // Check out this array of frequency values!

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height - 10;
    console.log('WIDTH: ', WIDTH, 'HEIGHT: ', HEIGHT)

    const barWidth = (WIDTH / bufferLength) * 13;
    console.log('BARWIDTH: ', barWidth)

    console.log('TOTAL WIDTH: ', (117*10)+(118*barWidth)) // (total space between bars)+(total width of all bars)

    let barHeight;
    let x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame); // Takes callback function to invoke before rendering

      x = 0;

      analyser.getByteFrequencyData(dataArray); // Copies the frequency data into dataArray
      // Results in a normalized array of values between 0 and 255
      // Before this step, dataArray's values are all zeros (but with length of 8192)

      ctx.fillStyle = "#fff"; // Clears canvas before rendering bars (black with opacity 0.2)
      ctx.fillRect(0, 0, WIDTH, HEIGHT); // Fade effect, set opacity to 1 for sharper rendering of bars

      let r, g, b;
      let bars = 118 // Set total number of bars you want per frame

      for (let i = 0; i < bars; i++) {
        barHeight = (dataArray[i] * 2.5);

        if (dataArray[i] > 210){
          r = 251
          g = 133
          b = 0
        } else if (dataArray[i] > 200){
          r = 255
          g = 183
          b = 3
        } else if (dataArray[i] > 190){
          r = 2
          g = 48
          b = 71
        } else if (dataArray[i] > 180){
          r = 33
          g = 158
          b = 188
        } else {
          r = 142
          g = 202
          b = 230
        }

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, (HEIGHT - barHeight), barWidth, barHeight);
        // (x, y, i, j)
        // (x, y) Represents start point
        // (i, j) Represents end point

        x += barWidth + 10 // Gives 10px space between each bar
      }
    }

    audio.play();
    renderFrame();
  };
};
