<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import router from "../../router";
import httpClient from "@/main";

onMounted(async () => {
    view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    getAllCarryForwards();
});

const logs = reactive([]);

function getAllCarryForwards() {
    httpClient.get("/employee/leave/carry-forward").then((res) => {
        logs.values = res.data;
        console.log(res.data);
    });
}

function loged(log) {
    log.CarryForwardDate = new Date().toISOString();
    httpClient
        .put("/employee/leave/carry-forward", log)
        .then((res) => {
            getAllCarryForwards();
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>
<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">員工ID</th>
                <th scope="col">假別</th>
                <th scope="col">原因</th>
                <th scope="col">起始時間</th>
                <th scope="col">結束時間</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(log, index) in logs.values">
                <th>{{ log.employeeId }}</th>
                <td>{{ log.leaveKind }}</td>
                <td>{{ log.reason }}</td>
                <td><input type="datetime-local" :value="log.startTime" disabled /></td>
                <td><input type="datetime-local" :value="log.endTime" disabled /></td>
                <td><button @click="loged(log)" class="btn btn-outline-success">紀錄</button></td>
            </tr>
        </tbody>
    </table>
</template>
