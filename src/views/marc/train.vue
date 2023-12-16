<script setup>
import { onBeforeMount,reactive ,ref} from 'vue';
import httpClient from '@/main'
const trains = reactive([])
const inputTrainType = ref('')
const inputTrainDescript = ref('')
onBeforeMount(()=>{
    httpClient.get('/getAllTrain').then((res)=>{
        console.log(res.data)
        for( let t of res.data){
            trains.push( t)
        }
    })
})
function addTrainAndRefresh(){
    // cleear trains
    while(trains.length > 0){
        trains.pop();
    }
    // to add train [[ wait to complete ]]

    //

    httpClient.get('/getAllTrain').then((res)=>{
        console.log(res.data)
        for( let t of res.data){
            trains.push( t)
        }
    })
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <label for="insertTrainType" class="form-label">列車系列</label>
                <input type="text" :value="inputTrainType" class="form-control" id="insertTrainType" placeholder="新增列車系列">
            </div>
            <div class="col-4">
                <label for="insertTrainDescript" class="form-label">列車敘述</label>
                <input type="text" :value="inputTrainDescript" class="form-control" id="insertTrainDescript" placeholder="新增列車敘述">
            </div>
            <div class="col-2">
                <button @click="addTrainAndRefresh" type="button" class="btn btn-primary">新增列車</button>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>列車編號</th>
                    <th>列車描述</th>
                    <th>列車類型</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="train of trains" :key="train.trainId">
                    <td>{{ train.trainId }}</td>
                    <td>{{ train.trainDescription }}</td>
                    <td>{{  train.trainType }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style></style>