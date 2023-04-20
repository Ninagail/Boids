class VideoRecorder {

    static record() {
      print("recording...");
  
      this.chunks = [];
      let stream = document.querySelector('canvas').captureStream();
      this.recorder = new MediaRecorder(stream);
      this.recorder.ondataavailable = e => {
        if (e.data.size) {
          this.chunks.push(e.data);
        }
      };
      this.recorder.onstop = () => this.exportVideo();
      
      if (this.btn) {
        this.btn.onclick = () => this.stop();
        this.btn.textContent = 'stop recording';
      }
      this.lnkDownload && this.lnkDownload.remove();
  
      this.recorder.start();
    }
  
  
    static stop() {
      print("stop recording.");
      if (this.recorder) {
        this.recorder.stop();
        this.recorder = null;
        if (this.btn) {
          this.btn.textContent = 'start recording';
          this.btn.onclick = () => this.record();
        }
      }
    }
  
    static addButton() {
      this.btn = document.createElement('button');
      this.btn.innerHTML = "Record";
      this.btn.onclick = () => this.record();
      document.body.append(this.btn); 
    }
    
    static exportVideo(e) {
      var blob = new Blob(this.chunks, {
        'type': 'video'
      });
      var url = URL.createObjectURL(blob);
  
      // Download link
      let date = year() + "_" + 
          ('0' + (month())).slice(-2) + "_" + 
          ('0' + day()).slice(-2) + "_" + 
          ('0' + hour()).slice(-2) + "_" + 
          ('0' + minute()).slice(-2) + "_" + 
          ('0' + second()).slice(-2);
      this.lnkDownload = document.createElement('a');
      this.lnkDownload.innerHTML = "download video";
      this.lnkDownload.href = url;
      this.lnkDownload.download = "video_" + date + ".webm";
      
      if (this.btn) {
        this.btn.parentNode.insertBefore(this.lnkDownload, this.btn.nextSibling);
      } else {
        document.body.append(this.lnkDownload);
      }
  
    }
  
  }