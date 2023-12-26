<script setup>
// To use Html5QrcodeScanner (more info below)
import httpClient from '@/main'
import {Html5QrcodeScanner} from "html5-qrcode";
import {Html5Qrcode} from "html5-qrcode";
import { onMounted ,ref,reactive} from "vue";
const msg = ref('')
const state=ref(0) // 0 -> 1 - > 2 -> 0
var useCamMode = true;

var html5QrcodeScanner = null
function startCam(){
  console.log('in start cam func')
  state.value=0;
  if(document.getElementById('html5-qrcode-button-camera-start') != null){
    if( useCamMode){
      setTimeout(()=>{
        document.getElementById('html5-qrcode-button-camera-start').click();
      },2500)
    }
  }
}
function closeCam(){
  console.log('in close cam func')
  state.value=1;
  if(document.getElementById('html5-qrcode-button-camera-stop')!=null){
    if( useCamMode){
      setTimeout(()=>{
        document.getElementById('html5-qrcode-button-camera-stop').click();
      },2500)
    }
  }
} 
function bootWebCam(){
  msg.value=''
  if( html5QrcodeScanner===null){
    console.log('add new html5 QRcode Scanner')
  html5QrcodeScanner= new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 500, height: 500} },
  /* verbose= */ false);
  }
    function onScanSuccess(decodedText, decodedResult) {
        closeCam();
        console.log( decodedResult+'::' + decodedText);
        msg.value= '掃描成功，開始驗證車票'
        state.value=1
        let config={
          headers: { 'Content-Type': 'application/json' }
        }
        console.log('go verfyTicketQrcode')
        httpClient.post('/verifyTicketQRcode',decodedText,config).then(res=>{
          console.log( 'get res')
          if(res.status==200){
            state.value =2;
            msg.value = '車票驗證成功，請進入'
            setTimeout( startCam, 4000);
          }
        }).catch(err=>{
          msg.value = '車票驗證失敗'
          startCam();
        })
    }
    
    function onScanFailure(error) {
      
      // state.value = 0;
    }
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    // // To use Html5Qrcode (more info below)
    // let cameraId 
    // navigator.mediaDevices.enumerateDevices().then(function(dev){
    //   for( var i = 0; i< dev.length; i++){
    //     var d = dev[i];
    //     if(d.label == 'C270 HD WEBCAM (046d:0825)')cameraId=d.deviceId
    //   }
    //   html5QrcodeScanner.start({ deviceId: { exact: cameraId} }, config, qrCodeSuccessCallback);
      // })
    
}
onMounted(()=>{
  bootWebCam();
  document.getElementById('html5-qrcode-anchor-scan-type-change').addEventListener('click',()=>{
  console.log('switch scan mode')
  useCamMode = !useCamMode
})
})
</script>
<template>
<div class="container">
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        虛擬閘票機
      </div>
      <div class="card-text">{{ msg }}</div>
    </div>
    <div class="card-body">
      <Transition>
        <div id="reader" v-show="state==0" width="600px"></div>
      </Transition>
      <Transition>
        <div class="container" v-show="state==1|| state==2" style="display: flex; justify-content: center;align-items: center;width: 1396px; height: 800px;">
          <img v-show="state==1" src="../../assets/Turnstile/turnstile.png"/>
          <img v-show="state==2" src="../../assets/Turnstile/open-turnstile.png"/>
        </div>
      </Transition>
    </div>
  </div>
</div>
</template>
<style>
.v-enter-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>