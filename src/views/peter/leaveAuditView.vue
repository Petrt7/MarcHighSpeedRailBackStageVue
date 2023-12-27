<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import router from "../../router";
import httpClient from "@/main";

const audits = reactive([]);

onMounted(async () => {
    await view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    await getAudit();
});

function getAudit() {
    httpClient
        .get("/employee/dto")
        .then((res) => {
            httpClient
                .get("/employee/leave/audit", {
                    params: {
                        id: res.data.id,
                    },
                })
                .then((res) => {
                    audits.values = res.data.map((auditItem) => ({
                        ...auditItem,
                    }));
                    console.log(audits);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

function approve(audit) {
    audit.resultSnadDate = new Date().toISOString();
    audit.audit = "success";
    httpClient
        .put("/employee/leave/audit", audit)
        .then((res) => {
            getAudit();
        })
        .catch((err) => {
            console.log(err);
        });
}

function turnDown(audit) {
    audit.resultSnadDate = new Date().toISOString();
    audit.audit = "fail";
    httpClient
        .put("/employee/leave/audit", audit)
        .then((res) => {
            getAudit();
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
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(audit, index) in audits.values">
                <th>{{ audit.employeeId }}</th>
                <td>{{ audit.leaveKind }}</td>
                <td>{{ audit.reason }}</td>
                <td><input type="datetime-local" :value="audit.startTime" disabled /></td>
                <td><input type="datetime-local" :value="audit.endTime" disabled /></td>
                <td>
                    <button @click="approve(audit)" class="btn btn-outline-success">核准</button>
                </td>
                <td>
                    <button @click="turnDown(audit)" class="btn btn-outline-danger">駁回</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
