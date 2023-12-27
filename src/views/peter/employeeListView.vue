<template>
    <div style="padding: 20px">
        <span style="margin: 44%"></span>
        <router-link to="/emp/hrms/add_emp"><button v-if="judgeAddEmployeePage" class="btn btn-success">
                新增員工
            </button></router-link>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">員工ID</th>
                    <th scope="col">員工姓名</th>
                    <th scope="col" v-if="judgeEmployeeDataPage">編輯</th>
                    <th scope="col" v-if="judgeDelete">刪除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(emp, index) in data.emps">
                    <th scope="row">{{ emp.id }}</th>
                    <td>{{ emp.name }}</td>
                    <td v-if="judgeEmployeeDataPage">
                        <button @click="toEdit({ emp })" class="btn btn-warning">編輯</button>
                    </td>
                    <td v-if="judgeDelete">
                        <button @click="deleteEmployee({ emp })" class="btn btn-danger">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view, del } from "@/audit";
import httpClient from "@/main";
import router from "../../router";

const judgeAddEmployeePage = ref(false);
const judgeEmployeeDataPage = ref(false);
const judgeDelete = ref(false);

const data = reactive({
    emps: "",
});

onMounted(async () => {
    await view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    await view("/emp/hrms/add_emp")
        .then((res) => {
            judgeAddEmployeePage.value = res;
        })
        .catch((err) => {
            judgeAddEmployeePage.value = err;
        });
    await view("/emp/hrms/emp_data")
        .then((res) => {
            judgeEmployeeDataPage.value = res;
        })
        .catch((err) => {
            judgeEmployeeDataPage.value = err;
        });
    await del(useRoute().path)
        .then((res) => {
            judgeDelete.value = res;
        })
        .catch((err) => {
            judgeDelete.value = err;
        });
    await getemp();
});

const getemp = function () {
    httpClient
        .get("/employee/session-all")
        .then((res) => {
            data.emps = res.data;
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
