export default function() {
  var player = document.getElementById("videoPlayer");
  var currentVID = document.getElementById("currentVID");
  var selectedLocalVID = document.getElementById("newlocalFILE").files[0];
  currentVID.setAttribute("src", window.URL.createObjectURL(selectedLocalVID));
  player.load();
  player.play();
}
