const newlocalFILE = document.getElementById("newlocalFILE");

newlocalFILE.addEventListener('change', (e) => {
  var player = document.getElementById("videoPlayer");
  var currentVID = document.getElementById("currentVID");
  var selectedLocalVID = e.target.files[0];
  currentVID.setAttribute("src", URL.createObjectURL(selectedLocalVID));
  player.load();
  player.play();
})
