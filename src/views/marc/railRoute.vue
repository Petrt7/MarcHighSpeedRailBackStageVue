<script setup>
import { onBeforeMount,reactive ,ref} from 'vue';
import httpClient from '@/main'
const railRoutes = reactive([])
const allStations = reactive([])
const errMsg = ref('')
// const selectedStation = reactive([])
const toAddedRailRouteStopStation = reactive([
    {
        'station':{
            'stationId': '', 'stationName':''
        },
        'costTime':0,
        'preToCurrStPrice':0
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
    // check is all needed input gets and correct? 1. costsTime[i+1] >= costTime[i] 2. all input value not empty 3. preToCurrPrice and costTime >= 0
    errMsg.value =''
    let timeAcc = 0;
    for( let i=0; i<toAddedRailRouteStopStation.length; i++){
        if( toAddedRailRouteStopStation[i].costTime < timeAcc ){
            errMsg.value= ' invalid costTime'
            return
        }
        timeAcc = toAddedRailRouteStopStation[i].costTime;
        if( toAddedRailRouteStopStation[i].costTime<0 || toAddedRailRouteStopStation[i].preToCurrStPrice<0 ){
            errMsg.value =  'cost time and preToCurrPrice must be positive'
            return 
        }
        if( toAddedRailRouteStopStation[i].station==null || toAddedRailRouteStopStation[i].station.stationId==''){
            errMsg.value=' empty station at idx: '+ i
            return
        }
    }
    // add rail route request
    let dto ={
        "stIdList":[],
        "costTimeList":[],
        "toNextStationPriceList":[],
        "depStationId":0,
        "desStationId":0,
        "stationCnt":0
    }
    for( let i=0; i<toAddedRailRouteStopStation.length; i++){
        dto.stIdList.push( toAddedRailRouteStopStation[i].station.stationId)
        dto.costTimeList.push(toAddedRailRouteStopStation[i].costTime)
        if( i>0){
            dto.toNextStationPriceList.push( toAddedRailRouteStopStation[i].preToCurrStPrice)
        }
    }
    dto.depStationId = toAddedRailRouteStopStation[0].station.stationId
    dto.desStationId = toAddedRailRouteStopStation[toAddedRailRouteStopStation.length-1].station.stationId
    dto.stationCnt = toAddedRailRouteStopStation.length
    console.log(dto)
    httpClient.post('/backEndInsertRailRoute',dto).then(res=>{
        console.log(res)
        while( toAddedRailRouteStopStation.length>0){
            toAddedRailRouteStopStation.pop();
        }
        toAddedRailRouteStopStation.push( {
            'station':{
                'stationId': '', 'stationName':''
            },
            'costTime':0,
            'preToCurrStPrice':0
        })
        // refresh railRoutes
        httpClient.get('/getAllRoute').then((res)=>{
            console.log( res.data)
            for( let rr of res.data){
                railRoutes.push(rr)
            }
        })
    })
    .catch(err=>{
        console.log(err)
    })
}
</script>
<template>
<div class="container">
    <div class="card card-body">
        <div class="btn-group" role="group" >
        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            新增新路線
        </button>
        <button class="btn btn-outline-primary" type="button" @click="addNewRailRoute" >
            送出
        </button>
        </div>
        <h3>{{  errMsg }}</h3>
    </div>
    <div class="collapse" id="collapseExample">
    <div class="card card-body">
        <ul>
            <li v-for="(stst,idx) of toAddedRailRouteStopStation" :key="stst.station.stationId" style="list-style-type: none;" class="stop-station-box">

                    <div class="input-group" style="width:75%;margin-right: 0px;" >
                        <span class="input-group-text" id="inputGroup-sizing-sm">{{ idx }}</span>
                        <span class="input-group-text" id="inputGroup-sizing-sm">停靠車站</span>
                        <select class="form-select "  v-model="toAddedRailRouteStopStation[idx].station" aria-label="Default select example"><!--v-model="selectedStation[idx]"-->
                            <option v-for="st of allStations" :key="st.stationid" :value="st">{{ st.stationName }}</option>
                        </select>
                        <span class="input-group-text" id="inputGroup-sizing-sm">到達時間（分鐘）</span>
                        <input v-model="toAddedRailRouteStopStation[idx].costTime" type="number" min="0" step="10" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                        <span class="input-group-text" id="inputGroup-sizing-sm" >與上一站間的票價</span>
                        <input v-model="toAddedRailRouteStopStation[idx].preToCurrStPrice" type="number" min="0" step="100" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                    </div>
                    <div class="input-group" style="width: 25%;margin-left:0px">
                        <button  class="btn btn-primary "  @click="addNewStopSt(idx)">往前增加</button>
                        <button  class="btn btn-primary "  @click="addNewStopSt(idx+1)">往後增加  </button>
                        <button  class="btn btn-danger "  @click="removeCurrStopSt(idx)">移除</button>
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
                    <td>{{  rr.railRouteId }}</td>
                    <td>{{ rr.departStation.stationName }}</td><td>{{ rr.destinateStation.stationName }}</td><td >{{  rr.stopStationCount }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<style>
.stop-station-box{
    display: flex;
    justify-content: space-around;
}
</style>