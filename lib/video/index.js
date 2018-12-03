const request = require('request');
const jsdom = require('jsdom');
const FileReader = require('filereader');
const videoUrl =
  'http://html5multimedia.com/code/ch9/media/elephants-dream-medium.mp4';

module.exports = cb => {
  request({ url: videoUrl, encoding: null }, function(err, response, body) {
    console.log('requested');
    jsdom.env('<p></p>', [], function(err, window) {
      const document = window.document;
      // const newlocalFILE = document.getElementById("newlocalFILE");

      // newlocalFILE.addEventListener('change', (e) => {
      //   var player = document.getElementById("videoPlayer");
      //   var currentVID = document.getElementById("currentVID");
      //   var selectedLocalVID = e.target.files[0];
      //   // currentVID.setAttribute("src", URL.createObjectURL(selectedLocalVID));
      //   // player.load();
      //   // player.play();

      //   createImage(selectedLocalVID)
      // })

      console.log('jsdom');
      createImage(body);

      function createImage(file) {
        var fileReader = new FileReader();

        console.log('creating file');
        fileReader.onload = function() {
          var blob = new Blob([fileReader.result], { type: file.type });
          var url = URL.createObjectURL(blob);
          var video = document.createElement('video');

          console.log('file onload');
          var timeupdate = function() {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate);
              video.pause();
            }
          };

          var snapImage = function() {
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas
              .getContext('2d')
              .drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toDataURL();

            console.log('snap image');

            cb(image);
            var success = image.length > 100000;
            if (success) {
              var img = document.createElement('img');
              img.src = image;
              document.getElementsByTagName('div')[0].appendChild(img);
              URL.revokeObjectURL(url);
            }
            return success;
          };

          video.addEventListener('loadeddata', function() {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate);
            }
          });

          video.addEventListener('timeupdate', timeupdate);
          video.preload = 'metadata';
          video.src = url;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.play();
        };

        fileReader.readAsArrayBuffer(file);
      }
    });
  });
};
