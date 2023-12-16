<script setup>
import { onBeforeMount,reactive ,ref} from 'vue';
import httpClient from '@/main'
const railRoutes = reactive([])
const allStations = reactive([])
// const selectedStation = reactive([])
const toAddedRailRouteStopStation = reactive([
    {
        'station':{
            'stationId': '', 'stationName':''
        },
        'costTime':'',
        'preToCurrStPrice':''
    }
])
function addNewStopSt(idx){
    toAddedRailRouteStopStation.splice(idx,0, {
        'station':{
            'stationId': '', 
            'stationName':''
        },
        'costTime':'',
        'preToCurrStPrice':''
    })
}
function removeCurrStopSt(idx){
    if(idx< toAddedRailRouteStopStation.length && idx>=0 ){
        toAddedRailRouteStopStation.splice( idx,1);
    }
}
onBeforeMount(()=>{
    httpClient.get('/getAllRoute').then((res)=>{
        console.log( res.data)
        for( let rr of res.data){
            railRoutes.push(rr)
        }
    })
    httpClient.get('/getAllStation').then(res=>{
        for( let st of res.data){
            allStations.push( st)
        }    
    })
})
function addNewRailRoute(){
    // get all toAddStopStation

    // check is all needed input gets and correct?

    // clear toAddstopStation

    // add rail route request

    // refresh railRoutes
    
}
</script>
<template>
    <div class="card card-body">
        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            新增新路線
        </button>
        <button class="btn btn-outline-primary" type="button" @click="addNewRailRoute" >
            送出
        </button>
    </div>
    <div class="collapse" id="collapseExample">
    <div class="card card-body">
        <ul>
            <li v-for="(stst,idx) of toAddedRailRouteStopStation" :key="stst.station.stationId" style="list-style-type: none;" class="stop-station-box">
                <div class="input-group" style="width:5%">
                    <span class="input-group-text" id="inputGroup-sizing-sm">路線序號{{ idx }}</span>
                </div>
                <div class="input-group"  style="width:20%">
                    <span class="input-group-text" id="inputGroup-sizing-sm">停靠車站</span>
                    <select class="form-select"  v-model="toAddedRailRouteStopStation[idx].station" aria-label="Default select example"><!--v-model="selectedStation[idx]"-->
                        <option v-for="st of allStations" :key="st.stationid" :value="st">{{ st.stationName }}</option>
                    </select>
                </div>
                <div class="input-group"  style="width:20%">
                    <span class="input-group-text" id="inputGroup-sizing-sm">花費時間</span>
                    <input type="number" min="0" step="10" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                </div>
                <div class="input-group" style="width:20%">
                    <span class="input-group-text" id="inputGroup-sizing-sm" >間距價格</span>
                    <input type="number" min="0" step="100" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                </div>
                <div class="btn-group" role="group">
                    <button  class="btn btn-primary " style="margin: 18px auto;" @click="addNewStopSt(idx)">往前增加</button>
                    <button  class="btn btn-primary " style="margin: 18px auto;" @click="addNewStopSt(idx+1)">往後增加  </button>
                    <button  class="btn btn-danger " style="margin: 18px auto" @click="removeCurrStopSt(idx)">移除</button>
                </div>
                </li>
        </ul>
    </div>
    </div>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>路線編號</th>
                    <th>啟程站</th>
                    <th>終點站</th>
                    <th>停靠站數量</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="rr of railRoutes" :key="rr.railRouteId">
                    <td>{{ rr.departStation.stationName }}</td><td>{{ rr.destinateStation.stationName }}</td><td>{{  rr.railRouteId }}</td><td >{{  rr.stopStationCount }}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>
<style>
.stop-station-box{
    display: flex;
    justify-content: space-around;
}
</style>