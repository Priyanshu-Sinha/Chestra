var playCheck = "play";
var slider = document.getElementById("bpm");
var output = document.querySelector(".value");
output.innerHTML = slider.value; 

document.querySelector('#play')?.addEventListener('click', async () => {
  if (playCheck === "play") {
	  await Tone.start()
	  console.log('audio is ready')
    Tone.Transport.start()
    playCheck = "stop"
    document.getElementById('play').src = "./Logos-and-ill./rec-stop.png"
  } else {
    Tone.Transport.stop()
    playCheck = "play"
    document.getElementById('play').src = "./Logos-and-ill./rec.png"
  }
})
function sequencer() {
  const kick = new Tone.Player("./Drums/kick.wav").toDestination();
  const clap = new Tone.Player("./Drums/clap.wav").toDestination();
  const chat = new Tone.Player("./Drums/closed-hat.wav").toDestination();
  const ohat = new Tone.Player("./Drums/opened-hat.wav").toDestination();
  let index = 0;

  Tone.Transport.scheduleRepeat(repeat, "16n");
  Tone.Transport.bpm.value = 98;
  document.querySelector('.value').innerHTML = document.getElementById('bpm').value;
  function repeat() {
    let step = index % 16;
    let kickInputs = document.querySelector(
      `.kick input:nth-child(${step + 1})`
    );
    let cHatInputs = document.querySelector(
      `.chat input:nth-child(${step + 1})`
    );
    let clapInputs = document.querySelector(
      `.clap input:nth-child(${step + 1})`
    );
    let oHatInputs = document.querySelector(
      `.ohat input:nth-child(${step + 1})`
    );
    if (kickInputs.checked) {
      kick.start();
    }
    if (cHatInputs.checked) {
      chat.start();
    }
    if (clapInputs.checked) {
      clap.start();
    }
    if (oHatInputs.checked) {
      ohat.start();
    }
    index++;
  }
  slider.oninput = function() {
  output.innerHTML = this.value;
  Tone.Transport.bpm.value = this.value;
}
}

sequencer();