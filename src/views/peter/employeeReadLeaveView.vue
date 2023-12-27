<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import router from "../../router";
import httpClient from "@/main";

onMounted(async () => {
    await view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    await getAllUnreadLeaves();
    await readLeaves();
});

const reads = reactive([]);

function getAllUnreadLeaves() {
    httpClient
        .get("/employee/leave/unread", {
            params: {
                id: 2,
            },
        })
        .then((res) => {
            reads.values = res.data;
        });
}

function readLeaves() {
    httpClient.put("/employee/leave/read");
}

// function loged(log) {
//     log.CarryForwardDate = new Date().toISOString();
//     httpClient
//         .put("/employee/leave/carry-forward", log)
//         .then((res) => {
//             getAllCarryForwards();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }
</script>
<template>
    <table class="table">
        <thead>
            <tr>
                <!-- <th scope="col">員工ID</th> -->
                <!-- <th scope="col">假別</th> -->
                <th scope="col">請假原因</th>
                <th scope="col">起始時間</th>
                <th scope="col">結束時間</th>
                <th scope="col">請假結果</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(read, index) in reads.values">
                <!-- <th>{{ read.employeeId }}</th>
                <td>{{ read.leaveKind }}</td> -->
                <td>{{ read.reason }}</td>
                <td><input type="datetime-local" :value="read.startTime" disabled /></td>
                <td><input type="datetime-local" :value="read.endTime" disabled /></td>
                <td>{{ read.audit }}</td>
                <!-- <td><button @click="loged(log)" class="btn btn-outline-success">紀錄</button></td> -->
            </tr>
        </tbody>
    </table>
</template>
