<script setup>
import { onBeforeMount,reactive ,ref,computed} from 'vue';
import httpClient from '@/main'
import router from '../../router/index'
const allTrain= reactive([])
const allRailRoute = reactive([])
const allScheduleTemplate = reactive([])
const msg= ref('')
const filterMode = ref('toSouth')// toNorth all
const filterModeArr = reactive([ 'toSouth','toNorth'])
const filterModeArrIdx = ref(0)
const selectHour = ref(8)
const selectMinute  = ref(0)
const selectTrainId = ref(null)
const selectRailRouteId = ref(null)
onBeforeMount(()=>{
    httpClient.get('/getAllScheduleTemplate').then(res=>{
        if( res.status==200){
            // console.log( res.data)
            for( let scht of res.data){
                allScheduleTemplate.push({
                    scheduleTemplateId: scht.scheduleTemplateId,
                    train: scht.train,
                    railRoute: scht.railRoute,
                    departTime: scht.departTime,
                    destinateTime: scht.destinateTime,
                    costMinute: scht.costMinute
                })
            }
        }
    })
    httpClient.get('/getAllTrain').then((res)=>{
        console.log(res.data)
        for( let t of res.data){
            allTrain.push( t)
        }
    })
    httpClient.get('/getAllRoute').then((res)=>{
        console.log( res.data)
        for( let rr of res.data){
            allRailRoute.push(rr)
        }
    })
})
const toNorthSouthText= computed(()=>{
    if( filterMode.value=='toSouth'){
        return '往南'
    }
    return '往北'
})
const scheduleTemplateFilter= computed(()=>{
  // filter toNorth toSouth
    let filtedScht = allScheduleTemplate
    return filtedScht.filter((a)=>{
        if(filterMode.value=='toSouth'){
            return a.railRoute.departStation.stationId< a.railRoute.destinateStation.stationId
        }else if(filterMode.value=='toNorth'){
            return a.railRoute.departStation.stationId> a.railRoute.destinateStation.stationId
        }
        return true;
    }).sort((a,b)=>{

        let aTimeStrArr= a.toString().split(':')
        let bTimeStrArr= b.toString().split(':')
        // a.getHours()
        if( parseInt(aTimeStrArr[0]) > parseInt(bTimeStrArr[0])){
            return true;
        }else if( parseInt(aTimeStrArr[0]) < parseInt(bTimeStrArr[0])){
            return false
        }
        if( parseInt(aTimeStrArr[1]) > parseInt(bTimeStrArr[1])){
            return true;
        }else if( parseInt(aTimeStrArr[1]) < parseInt(bTimeStrArr[1])){
            return false
        }
        if( parseInt(aTimeStrArr[2]) > parseInt(bTimeStrArr[2])){
            return true;
        }else if( parseInt(aTimeStrArr[2]) < parseInt(bTimeStrArr[2])){
            return false
        }
        return true;
    })
})
function addScheduleTemplate(){
    // check input are all selected 
    msg.value=''
    if( selectTrainId.value==null || selectRailRouteId.value==null){
        msg.value = 'invalid input'
        return ;
    }
    let depTimeStr = selectHour.value+':'+selectMinute.value
    console.log(depTimeStr)
    // try to add schedule Template
    httpClient.post('/insertScheduleTemplate?tid='+selectTrainId.value+'&rrid='+selectRailRouteId.value+'&deptime='+depTimeStr).then(res=>{
        console.log(res)
        if(res.status==200){
            // clear all schedule Template
            console.log('here')
            while( allScheduleTemplate.length>0){
                allScheduleTemplate.pop();
            }
            // load new schedule Template
            httpClient.get('/getAllScheduleTemplate').then(res=>{
                if( res.status==200){
                    // console.log( res.data)
                    for( let scht of res.data){
                        allScheduleTemplate.push({
                            scheduleTemplateId: scht.scheduleTemplateId,
                            train: scht.train,
                            railRoute: scht.railRoute,
                            departTime: scht.departTime,
                            destinateTime: scht.destinateTime,
                            costMinute: scht.costMinute
                        })
                    }
                }
            })
        }
    }).catch(err=>{
        console.log(err);
        msg.value='add schedule Template failed'
    })
}
</script>
<template>
    <div class="container">
        <h3>{{ msg }}</h3>
        <div class="row">
            <div class="btn-group" role="group" aria-label="toAddNewSchTemplate">
                <button type="button"  class="btn btn-secondary">清除</button>
                <button type="button" @click="addScheduleTemplate" class="btn btn-primary">新增班次模板</button>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                    <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">列車</span>
                    <select class="form-control" v-model="selectTrainId">
                        <option v-for="train of allTrain" :key="train.trainId" :value="train.trainId">{{ train.trainId }}-{{ train.trainDescription }}</option>
                    </select>
                </div>
            </div>
            <div class="col-3">
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">路線</span>
                    <select class="form-control" v-model="selectRailRouteId">
                        <option v-for="railRoute of allRailRoute" :key="railRoute.railRouteId" :value="railRoute.railRouteId">{{ railRoute.railRouteId }}-{{  railRoute.departStation.stationName }}-{{ railRoute.destinateStation.stationName }}-{{  railRoute.stopStationCount }}站</option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">時間</span>
                    <input class="form-control" type="number" v-model="selectHour" value="8" min="0" max="23">
                    <span class="input-group-text" id="basic-addon1">點</span>
                    <input class="form-control" type="number" v-model="selectMinute" value="0" min="0" max="59">
                    <span class="input-group-text" id="basic-addon1">分</span>
                </div>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>班次模板編號</th>
                    <th>列車編號</th>
                    <th>路線般號<label style="color:green">{{ toNorthSouthText }}</label></th>
                    <th @click="{filterModeArrIdx+=1;filterModeArrIdx%=2 ;filterMode=filterModeArr[filterModeArrIdx]}"><button class="btn btn-outline-secondary">發車時間</button></th>
                    <th>結束時間</th>
                    <th>花費分鐘</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="scht of scheduleTemplateFilter" :key="scht.scheduleTemplateId">
                    <td>{{ scht.scheduleTemplateId }}</td>
                    <td>{{ scht.train.trainId }}-{{ scht.train.trainDescription }}</td>
                    <td>{{ scht.railRoute.railRouteId }}-{{ scht.railRoute.departStation.stationName }}-{{ scht.railRoute.destinateStation.stationName }}-{{ scht.railRoute.stopStationCount }}站</td>
                    <td>{{  scht.departTime }}</td>
                    <td>{{  scht.destinateTime }}</td>
                    <td>{{  scht.costMinute }}</td>
                    <td><button class="btn btn-primary" @click="router.push('/schedule/implScheduleTemplate/'+scht.scheduleTemplateId)">安排班次</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style></style>