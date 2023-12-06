<template>
    <div style="padding: 20px">
        <span style="margin: 40%"></span>
        <router-link to="/emp/hrms/add_emp"><button class="btn btn-primary">新增員工</button></router-link>
        <div style="border: solid 1px; margin: 10px 10%; text-align: center">
            <table style="margin: 5px 5%; padding: 5px; width: 50%">
                <th>員工ID</th>
                <th>員工姓名</th>
                <tr v-for="(emp, index) in data.emps">
                    <td>{{ emp.id }}</td>
                    <td>{{ emp.name }}</td>
                    <button @click="toEdit({ emp })" class="btn btn-warning" style="margin: 10px 10px">
                        編輯
                    </button>
                    <button @click="deleteEmployee({ emp })" class="btn btn-danger">刪除</button>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import httpClient from "@/main";
import router from "../../router";

const data = reactive({
    emps: "",
});

onMounted(() => {
    getemp();
});

const getemp = function () {
    httpClient
        .get("/employee/session-all")
        .then((res) => {
            console.log(res.data);
            data.emps = res.data;
            console.log("emps: " + data.emps);
        })
        .catch((err) => {
            console.log(err);
        });
};

function toEdit(emp) {
    console.log("emp: " + emp.emp.id);
    console.dir(emp);
    httpClient.get(`/employee/detail/${emp.emp.id}`).then((res) => {
        console.log(res.data);

        router.push({
            path: "/emp/hrms/emp_data",
            // query: { data: JSON.stringify(res.data) },
            query: { id: emp.emp.id },
        });
    });
}

function deleteEmployee(emp) {
    console.log("deleteEmpId: " + emp.emp.id);
    httpClient
        .delete(`/employee/${emp.emp.id}`)
        .then((res) => {
            console.log(res.data);
            getemp();
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>
