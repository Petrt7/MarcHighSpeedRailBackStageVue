<script setup>
import { onBeforeMount,reactive ,ref,computed} from 'vue';
import httpClient from '@/main'
import router from '../../router/index'
const allStation = reactive([])
const selectYear = ref((new Date().getFullYear()))
const selectMonth = ref((new Date().getMonth())+1)
const selectDay = ref((new Date().getDate()))
const selectHour = ref( 8)
const selectMinute = ref( 0)
const selectOnStationId = ref(null)
const selectOffStationId = ref(null)
const schedulResult = reactive([])
const validDateRange = computed(()=>{
    let m = selectMonth.value;
    if( m==1 || m==3  || m==5  || m==7 || m==8 || m==10 || m==12 ){
        return 31
    }
    if( m==2 ){
        let y = selectYear.value;
        return (y%4!=0)? 28: (y%100!=0)? 29: (y%400==0)?29:28
    }
    return 30
})
function search(){
    //
    while( schedulResult.length>0){
        schedulResult.pop();
    }
    httpClient.get('/searchScheduleByTimeGetOnOffStation/'+selectOnStationId.value+'/'+selectOffStationId.value+'/'+selectYear.value+'-'+selectMonth.value+'-'+selectDay.value+'-'+selectHour.value+'-'+selectMinute.value).then(res=>{
        // console.log(res.data)
        for( let sch of res.data){
            schedulResult.push({
                'scheduleId': sch.scheduleId,
                'getOnStation' : sch.getOnStation,
                'getOffStation': sch.getOffStation,
                'getOnTime': sch.getOnTime,
                'getOffTime': sch.getOffTime,
                'durationMinute': sch.durationMinute
            })
        }
    }).catch(err=>console.log(err))
}
onBeforeMount(()=>{
    httpClient.get('/getAllStation').then((res)=>{
        for( let st of res.data){
            allStation.push(st)
        }
        selectOnStationId.value = allStation[0].stationId
        selectOffStationId.value= allStation[allStation.length-1].stationId
    }).then(()=>{
        search()
    })
})
</script>
<template>
<div class="container">
    <div class="row">
        <div class="col">
            <div class="input-group">
                <select v-model="selectYear" class="form-control">
                    <option v-for="y of [...Array(200).keys()].map(i=>i+ 1900)" :value="y">{{y }}</option>
                </select>
                <span class="input-group-text" id="basic-addon1">年</span>
                <select v-model="selectMonth" class="form-control">
                    <option v-for="m in 12" :value="m">{{m }}</option>
                </select>
                <span class="input-group-text" id="basic-addon1">月
                </span>
                <select v-model="selectDay" class="form-control">
                    <option v-for="d in validDateRange" :value="d">{{ d }}</option>
                </select>
                <span class="input-group-text" id="basic-addon1">日</span>
                <select v-model="selectHour" class="form-control">
                    <option v-for="hr in 24" :value="hr-1">{{ hr-1 }}</option>
                </select>
                <span class="input-group-text" id="basic-addon1">時</span>
                <select v-model="selectMinute" class="form-control">
                    <option v-for="mm in 60" :value="mm-1">{{ mm-1 }}</option>
                </select>
                <span class="input-group-text" id="basic-addon1">分</span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-3">
            <div class="input-group">
            <span class="input-group-text" id="basic-addon1">上車車站</span>
            <select v-model="selectOnStationId" class="form-control">
                <option v-for="st of allStation" :key="st.stationId" :value="st.stationId">{{ st.stationName }}</option>
            </select>
            </div>
        </div>
        <div class="col-3">
            <div class="input-group">
            <span class="input-group-text" id="basic-addon1">下車車站</span>
            <select v-model="selectOffStationId" class="form-control">
                <option v-for="st of allStation" :key="st.stationId" :value="st.stationId">{{ st.stationName }}</option>
            </select>
            </div>
        </div>
        <div class="col-4">
            <div class="input-group">
                <button class="btn btn-primary form-contorl" @click="search">
                    搜尋
                </button>  
            </div>
        </div>
    </div>
    <div class="row">
        <div class="table col">
            <thead>
                <tr >
                    <th scope="col">#</th>
                    <th scope="col">班次編號</th>
                    <th scope="col">上車車站</th>
                    <th scope="col">上車時間</th>
                    <th scope="col">下車車站</th>
                    <th scope="col">下車時間</th>
                    <th scope="col">旅途時間</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(result,idx) in schedulResult" :key="result.scheduleId">
                    <th scope="row">{{ idx }}</th>
                    <td>{{ result.scheduleId }}</td>
                    <td>{{  result.getOnStation.stationName }}</td>
                    <td>{{  result.getOnTime }}</td>
                    <td>{{  result.getOffStation.stationName }}</td>
                    <td>{{  result.getOffTime }}</td>
                    <td>{{  result.durationMinute }}</td>
                    <td><button class="btn btn-primary" @click="router.push('/schedule/scheduleRestSeat/'+result.scheduleId)">檢視班次訂位狀態</button></td>
                </tr>
            </tbody>
        </div>
    </div>
</div>
</template>
<style>
</style>