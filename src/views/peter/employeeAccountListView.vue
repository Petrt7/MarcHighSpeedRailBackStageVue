<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">員工ID</th>
                <th scope="col">員工姓名</th>
                <th scope="col">員工帳號</th>
                <th scope="col">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(emp, index) in emps">
                <th>{{ emp.id }}</th>
                <td>{{ emp.name }}</td>
                <td>{{ emp.acc }}</td>
                <td><button class="btn btn-warning" @click="toEdit({ emp })">編輯</button></td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import httpClient from "@/main";
import router from "../../router";
import { view, create } from "@/audit";

onMounted(() => {
    getAcc();
});

const emps = ref([]);

const emp = reactive({
    id: null,
    name: null,
    acc: null,
});

function getAcc() {
    httpClient
        .get("/employee/account")
        .then((res) => {
            // console.log(res.data);
            emps.value = res.data;
            console.log(emps);
        })
        .catch((err) => { });
}

function toEdit(emp) {
    console.log("emp: " + emp.emp.id);
    console.dir(emp);

    router.push({
        path: "/emp/psw/edit",
        query: { id: emp.emp.id, name: emp.emp.name, acc: emp.emp.acc },
    });
}
</script>
