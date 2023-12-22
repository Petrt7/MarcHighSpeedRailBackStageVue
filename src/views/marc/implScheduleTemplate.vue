<script setup>
import { onBeforeMount,reactive ,ref,computed} from 'vue';
import httpClient from '@/main'
import router from '../../router/index'
const props= defineProps(['schtid'])
const scheduleTemplate = reactive({})
const allTicketDiscount = reactive([])
const trainSeatMaxRange = ref(0)
//will use to impl schedule Template
const selectYear = ref(new Date().getFullYear())
const selectMonth = ref(new Date().getMonth()+1)
const selectDay = ref(new Date().getDate())
const discSeatRange = reactive([])
const msg = ref('')
const loading = ref(false)
function isSartRange(idx){
    return idx==0
}
function isEndRange(idx){
    return idx>= discSeatRange.length-1
}
function insertSeatRange(idx){
    discSeatRange.splice(idx, 0,{
        // seatStart:insertStart,
        seatEnd: 1,
        selectDisc: allTicketDiscount[0].ticketDiscountId
    })
}
function removeSeatRange(idx){
    if( discSeatRange.length==1){
        return;
    }
    discSeatRange.splice(idx,1)
    discSeatRange[discSeatRange.length-1].seatEnd = trainSeatMaxRange
}
function implScheduleTemplate(){
    loading.value = true;
    
    msg.value= '';
    // check input not empty 
    for( let ds of discSeatRange){
        if( ds.seatEnd==null || ds.selectDisc==null){
            msg.value = 'invalid input'
            return
        }
        if( ds.seatEnd <=0 ){
            msg.value = 'negetive seat range '
            return
        }
    }
    // check seat range 1.less then trainSeatMaxRange 2. Acsending
    let acc=0;
    for( let ds of discSeatRange){
        if( ds.seatEnd<= acc){
            msg.value = 'wrong seat range'
            return
        }
        acc= ds.seatEnd
    }
    let tmp = scheduleTemplate.departTime.split(':')
    let departTimeStr = selectYear.value+'-'+selectMonth.value+'-'+selectDay.value
    if( discSeatRange[discSeatRange.length-1].seatEnd != trainSeatMaxRange.value){
        msg.value = 'wrong not meet train seat range'
        return 
    }
    httpClient.post('/impSingleScheduleTemplate',{
        "schtId": scheduleTemplate.scheduleTemplateId,
        "implDate": departTimeStr,
        "seatRangeList": discSeatRange.map((v,i)=>v.seatEnd),
        "discountTypeIdList":discSeatRange.map((v,i)=>v.selectDisc)
    }).then(res=>{
        if(res.status==200){
            msg.value='新增班次成功'
        }else{
            msg.value='新增班次失敗'
        }
        loading.value = false;
    }).catch(err=>{
        console.log(err)
        msg.value= 'implement schedule failed'
        loading.value = false;
    })
}
onBeforeMount(() => {
    httpClient.get('/getScheduleTemplateById?schtid='+props['schtid']).then((res)=>{
        console.log(res)
        if(res.status==200){
            scheduleTemplate.scheduleTemplateId= res.data.scheduleTemplateId
            scheduleTemplate.train = res.data.train
            scheduleTemplate.railRoute= res.data.railRoute
            scheduleTemplate.departTime = res.data.departTime
            scheduleTemplate.destinateTime = res.data.destinateTime
            scheduleTemplate.costMinute = res.data.costMinute
            httpClient.get('/getTrainSeatMaxRange/'+scheduleTemplate.train.trainId).then(res=>{
                if( res.status==200){
                    trainSeatMaxRange.value = res.data
                    discSeatRange.push({
                        seatEnd: trainSeatMaxRange.value,
                        selectDisc: allTicketDiscount[0].ticketDiscountId
                    })
                }
            })
        }
    }).catch(err=>{
        console.log(err)
    })
    httpClient.get('/getAllDiscount').then(res=>{
        if(res.status==200){
            for( let disc  of res.data){
                allTicketDiscount.push( disc)
            }
        }
    })
})
</script>
<template>
    <div class="container">
        <div class="row" v-if="loading">
            <div class="col" style="display: flex;justify-content: space-between;margin: 5% 20%;">
                <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
                <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
                <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
                <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
                <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
                <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
            </div>
        </div>
        <div v-else class="row">
            <h3>{{  msg }}</h3>
        </div>
        <div class="row">
            <div class="col-1">
                <button @click="router.push('/schedule/scheduleTemplate')" class="btn btn-outline-secondary">回上一頁</button>
            </div>
            <div class="col-8">
                <div class="input-group">
                    <span class="input-group-text">部署時間</span>
                    <input type="number" v-model="selectYear" class="form-control"/><span class="input-group-text">年</span>
                    <input type="number" v-model="selectMonth" min="1" max="12" class="form-control"/><span class="input-group-text">月</span>
                    <input type="number" v-model="selectDay" min="1" max="31" class="form-control"/><span class="input-group-text">日</span>
                </div>
            </div>
            <div class="col-1">
                <button @click="implScheduleTemplate" class="btn btn-outline-primary">產生班次</button>
            </div>
        </div>
        <div v-for="(discSeat,idx) of discSeatRange" class="row">
            <div class="col-4">
                <div class=" input-group">
                    <span class="input-group-text" id="basic-addon1">序號：{{ idx }}</span>
                    <span class="input-group-text" id="basic-addon1">座位範圍</span>
                    ~<input class="form-control" :disabled="isEndRange(idx)" type="number" min="1" v-model="discSeat.seatEnd" step="50">
                </div>
            </div>
            <div class="col-4">
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">選擇車票優惠</span>
                    <select class="form-control" v-model="discSeat.selectDisc">
                        <option v-for="(disc,idx) of allTicketDiscount" :key="disc.ticketDiscountId" :value="disc.ticketDiscountId">{{ disc.ticketDiscountName }}</option>
                    </select>
                </div>
            </div>
            <div class="col-2">
                <div class="input-group">
                    <button @click="insertSeatRange(idx)" class="btn btn-secondary">插入</button>
                    <button @click="removeSeatRange(idx)" :disabled="isSartRange(idx)" class="btn btn-danger">x</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>