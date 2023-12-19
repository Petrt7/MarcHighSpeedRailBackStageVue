<script setup>
import { onBeforeMount,reactive ,ref} from 'vue';
import httpClient from '@/main'
const allDiscount = reactive([])
const msg = ref('')
const toAddDisc = reactive({
    ticketDiscountType:'',
    ticketDiscountName:'',
    ticketDiscountPercentage:100,
    ticketdiscountAmount:0,
    purchaseEarlyDay:0
})
function clearToAddDisc(){
    toAddDisc.ticketDiscountName=''
    toAddDisc.ticketDiscountType=''
    toAddDisc.ticketDiscountPercentage=100;
    toAddDisc.ticketdiscountAmount=0;
    toAddDisc.purchaseEarlyDay=0
}
function addDiscount(){
    msg.value=''
    // check input 
    if( toAddDisc.ticketDiscountName==='' || toAddDisc.ticketDiscountType===''){
        msg.value='invalid input'
        return 
    }
    //
    httpClient.post('/insertTicketDiscount',{
        ticketDiscountType:toAddDisc.ticketDiscountName,
        ticketDiscountName:toAddDisc.ticketDiscountType,
        discountPercentage:toAddDisc.ticketDiscountPercentage,
        discountAmount:toAddDisc.ticketdiscountAmount,
        purchaseEarlyDay:toAddDisc.purchaseEarlyDay
    }).then(res=>{
        if( res.status == 200){
            msg.value='新增成功'
        }
    }).then(()=>{
        // refresh disc list
        while( allDiscount.length>0){
            allDiscount.pop();
        }
        clearToAddDisc()
        httpClient.get('/getAllDiscount').then((res)=>{
        for(let disc of res.data){
            allDiscount.push(
                {
                    ticketDiscountId: disc.ticketDiscountId,
                    ticketDiscountType: disc.ticketDiscountType,
                    ticketDiscountName: disc.ticketDiscountName,
                    ticketDiscountPercentage: disc.ticketDiscountPercentage,
                    ticketDiscountAmount: disc.ticketDiscountAmount,
                    purchaseEarlyLimitDay: disc.purchaseEarlyLimitDay
                })
            }
        }).catch(err=>{
            console.log(err)
            msg.value='刷新車票優惠失敗'
        })
    }).catch(err=>{
        console.log(err)
        msg.value='新增失敗'
    })
}
onBeforeMount(()=>{
    httpClient.get('/getAllDiscount').then((res)=>{
        for(let disc of res.data){
            allDiscount.push(
                {
                    ticketDiscountId: disc.ticketDiscountId,
                    ticketDiscountType: disc.ticketDiscountType,
                    ticketDiscountName: disc.ticketDiscountName,
                    ticketDiscountPercentage: disc.ticketDiscountPercentage,
                    ticketDiscountAmount: disc.ticketDiscountAmount,
                    purchaseEarlyLimitDay: disc.purchaseEarlyLimitDay
                }
            )
        }
    })
})
</script>
<template>
    <div class="container">
        <h3>{{ msg }}</h3>
        <div class="row">
            <div class="btn-group" role="group" aria-label="toAddNewDisc">
                <button type="button" @click="clearToAddDisc" class="btn btn-secondary">清除</button>
                <button type="button" @click="addDiscount" class="btn btn-primary">新增車票優惠</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>車票優惠編號</th>
                    <th>車票優惠類型</th>
                    <th>車票優惠名稱</th>
                    <th>車票優惠折數</th>
                    <th>車票優惠折扣額</th>
                    <th>車票訂位提早天數</th>
                </tr>
                <tr>
                    <th><input disabled class="form-control" type="text"></th>
                    <th><input v-model="toAddDisc.ticketDiscountType" class="form-control" type="text"></th>
                    <th><input v-model="toAddDisc.ticketDiscountName" class="form-control" type="text"></th>
                    <th><input v-model="toAddDisc.ticketDiscountPercentage" class="form-control" type="number" min="0"></th>
                    <th><input v-model="toAddDisc.ticketdiscountAmount" class="form-control" type="number" min="0"></th>
                    <th><input v-model="toAddDisc.purchaseEarlyDay" class="form-control" type="number" min="0"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="disc of allDiscount" :key="disc.ticketDiscountId">
                    <td>{{  disc.ticketDiscountId }}</td>
                    <td> {{  disc.ticketDiscountType }}</td>
                    <td>{{  disc.ticketDiscountName }}</td>
                    <td>{{ disc.ticketDiscountPercentage }}%</td>
                    <td>{{ disc.ticketDiscountAmount }}</td>
                    <td>{{ disc.purchaseEarlyLimitDay }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style></style>