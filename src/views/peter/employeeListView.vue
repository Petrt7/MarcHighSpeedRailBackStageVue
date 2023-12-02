<template>
    <h1>empListView</h1>
    <router-link to="/emp/hrms/add_emp"><button>新增員工</button></router-link>
    <table>
        <th>員工ID</th>
        <th>員工姓名</th>
        <tr v-for="(emp, index) in data.emps">
            <td>{{ emp.employeeId }}</td>
            <td>{{ emp.employeeName }}</td>
            <button @click="toEdit">編輯</button>
            <button>刪除</button>
        </tr>
    </table>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import httpClient from '@/main';
import router from '../../router';


const data = reactive({
    emps: ''
});

onMounted(() => {
    getemp();
});

const getemp = function () {
    httpClient.get("/employee/all")
        .then((res) => {
            console.log(res.data);
            data.emps = res.data;
            console.log("emps: " + data.emps);
        })
        .catch((err) => {
            console.log(err);
        });
};

function toEdit() {
    router.push('/emp/hrms/emp_data')
}

</script>



