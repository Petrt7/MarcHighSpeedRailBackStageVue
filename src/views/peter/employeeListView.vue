<script setup>
import { onMounted, reactive, ref } from 'vue';

onMounted(() => {
    getemp(emps);
})

var emps = {}

const getemp = function () {
    httpClient.get("/employee/all")
        .then((res) => {
            console.log(res.data)
            emps = reactive(res.data)
            console.log("emps: " + emps)
        })
        .catch((err) => {
            console.log(err)
        })
}

function a() {
    console.log("emps測試a: " + emps)
}
</script>
<template>
    <h1>empListView</h1>
    <router-link to="/emp/hrms/add_emp"><button>新增員工</button></router-link>
    <ul>
        測試
        <!-- <li v-if="emps" v-for="(emp, index) in emps">
            員工ID: {{ emp.employeeId }}
        </li> -->
    </ul>
    {{ emps }}
    <button @click="a">測試</button>
    <router-link to="/emp/hrms/add_emp"><button>新增員工</button></router-link>
    <ul>
        測試
        <!-- <li v-if="emps" v-for="(emp, index) in emps">
            員工ID: {{ emp.employeeId }}
        </li> -->
    </ul>
    {{ emps }}
    <button @click="a">測試</button>
</template>