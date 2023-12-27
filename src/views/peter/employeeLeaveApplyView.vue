<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import router from "../../router";
import httpClient from "@/main";

const leaves = reactive([]);

onMounted(async () => {
    await view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    await getAllLeaveKinds();
    await getEmp();
});

const employeeLeave = reactive({
    leaveKind: "",
    reason: "",
    startTime: new Date(),
    endTime: new Date(),
    managerId: 1,
    employeeId: 1,
});

function getAllLeaveKinds() {
    httpClient.get("/leave/all").then((res) => {
        leaves.values = res.data;
    });
}

function getEmp() {
    httpClient.get("/employee/dto").then((res) => {
        console.log(res.data);
        employeeLeave.employeeId = res.data.id;
    });
}

function send() {
    httpClient
        .post("/employee/leave", employeeLeave)
        .then((res) => {
            router.push("/emp/index");
        })
        .catch((err) => {
            console.log(err);
        });
}

function leaveApply() {
    employeeLeave.reason = "累累病";
    employeeLeave.startTime = "2023-12-19T08:00";
    employeeLeave.endTime = "2023-12-19T16:00";
}

function leaveApply2() {
    employeeLeave.reason = "星期三症候群";
    employeeLeave.startTime = "2023-12-20T08:00";
    employeeLeave.endTime = "2023-12-20T16:00";
}
</script>
<template>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                請假事由<br /><input type="text" v-model="employeeLeave.reason" class="form-control" />
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                假別
                <select class="form-select" v-model="employeeLeave.leaveKind">
                    <option v-for="(leave, index) in leaves.values">
                        {{ leave.leaveName }}
                    </option>
                </select>
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <label>請假起始時間：</label>
                <input type="datetime-local" v-model="employeeLeave.startTime" class="form-control" />
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <label>請假結束時間：</label>
                <input type="datetime-local" v-model="employeeLeave.endTime" class="form-control" />
            </div>
            <div class="col"></div>
        </div>
    </div>

    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <button @click="send" class="btn btn-outline-success">送出</button>
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container">
        <button @click="leaveApply" class="btn btn-outline-primary">一鍵請假</button>
        <button @click="leaveApply2" class="btn btn-outline-primary">一鍵請假2</button>
    </div>
</template>

<style></style>
