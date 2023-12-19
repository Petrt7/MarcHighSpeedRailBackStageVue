<script setup>
import { onBeforeMount,reactive ,ref,computed} from 'vue';
import httpClient from '@/main'
const props = defineProps(['schid'])
const allStopStation = reactive([{
    'stopStation':{
        'stationId':'all',
        'stationName':'全部'
    }
}])
const allDiscount = reactive([{
    'ticketDiscountId':'all',
    'ticketDiscountName':'全部'
}])
const mode = computed(()=>{
    if(interValMode.value == true){
        return '間隔模式'
    }
    return '一般模式'
})
const interValMode = ref(false)
const getOnStationId = ref(null)
const getOffStationId = ref(null)
const selectDiscountId = ref('')
const stationMap = reactive({})
const discMap = reactive({})
const schRestSeats = reactive([])
const filterSchRestSeats = computed(()=>{
    let res = schRestSeats
    let seqMap = {}
    for( let i = 1; i<allStopStation.length; i++){
        seqMap[allStopStation[i].stopStation.stationId] = i
    }
    if( interValMode.value == true){
        res = res.filter( srs =>{
            // find endst idx -  startst idx ==1
            if( seqMap[srs.startStationId] == seqMap[srs.endStationId]-1) return true
            return false;
        })
    }


    if( getOnStationId.value!=='all'){
        res = res.filter(srs => srs.startStationId== getOnStationId.value)
    }
    if( getOffStationId.value!=='all'){
        res = res.filter(srs=> srs.endStationId== getOffStationId.value)
    }
    if( selectDiscountId.value !== 'all'){
        res = res.filter(srs=>srs.ticketDiscountId==selectDiscountId.value)
    }
    return res;
})
//onMounted 1.get railRouteStopStation by Id 
onBeforeMount(()=>{
    httpClient.get('/getScheduleStopStationByScheduleId?schid='+props.schid).then((res)=>{
        console.log( res.data)
        for( let st of res.data){
            allStopStation.push( st)
            stationMap[ st.stopStation.stationId ]= st.stopStation.stationName
        }
        allStopStation.sort( (a,b)=> a.railRouteStopStationSequence- b.railRouteStopStationSequence);
        getOffStationId.value = allStopStation[0].stopStation.stationId
        getOnStationId.value = allStopStation[0].stopStation.stationId

    }).catch(err=>console.log(err))
    httpClient.get('/getAllDiscount').then(res=>{
        console.log(res.data)
        for( let d of res.data){
            allDiscount.push( d);
            discMap[ d.ticketDiscountId ]= d.ticketDiscountName
        }
        selectDiscountId.value = allDiscount[0].ticketDiscountId
    }).catch(err=>console.log(err))
    httpClient.get('/getScheduleRestSeat?schid='+props.schid).then(res=>{
        console.log(res.data)
        for( let s of res.data){
            schRestSeats.push(s)
        }
    }).catch(err=>{
        console.log(err)
    })
})
</script>
<template>
<div class="container">
    <div class="row">
        <div class="col">
            <div class="input-group">
                <button class="btn btn-outline-secondary" @click="$router.push('/schedule/searchSchedule')">回上一頁</button>
                <button class="btn btn-outline-secondary" @click="interValMode=(interValMode==true)?false:true">{{ mode }}</button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">上車車站</span>
                <select v-model="getOnStationId" class="form-control">
                    <option v-for="st of allStopStation" :key="st.stopStation.stationId" :value="st.stopStation.stationId">{{st.stopStation.stationName }}</option>
                </select>
                <span class="input-group-text" id="basic-addon1">下車車站</span>
                <select v-model="getOffStationId" class="form-control">
                    <option v-for="st of allStopStation" :key="st.stopStation.stationId" :value="st.stopStation.stationId">{{st.stopStation.stationName }}</option>
                </select>
                <span class="input-group-text" id="basic-addon1">優惠類型</span>
                <select v-model="selectDiscountId" class="form-control">
                    <option v-for="tck of allDiscount" :key="tck.ticketDiscountId" :value="tck.ticketDiscountId">{{ tck.ticketDiscountName}}</option>
                </select>
                <button type="button" @click="searchRestSeat" class="btn btn-primary">搜尋</button>
            </div>
        </div>
    </div>
    <div class="row">
        <table class="table">
            <!-- <thead>
                <tr>
                    
                </tr>
            </thead> -->
            <tbody>
                <tr v-for="(schrs,idx) in filterSchRestSeats " :key="idx">
                    <td>{{  stationMap[ schrs.startStationId] }}</td>
                    <td>{{  stationMap[ schrs.endStationId] }}</td>
                    <td>{{  discMap[ schrs.ticketDiscountId] }}</td>
                    <td>{{  schrs.restSeatAmount }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<style></style>