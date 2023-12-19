<template>
    <br />
    <br />
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <select class="form-select" v-model="empName">
                    <option v-for="(emp, index) in json.emps" :key="index">
                        {{ emp.id }}:{{ emp.name }}
                    </option>
                </select>
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container" style="margin: 10px 20%">
        <ul>
            <li v-for="(system, index) in author.systems" :key="index">
                <div>
                    <span class="span">{{ system.systemName }}</span>
                    <span>
                        <input type="checkbox" v-model="system.permissions[0]" class="check" /> 查看
                        <input type="checkbox" v-model="system.permissions[1]" class="check" /> 新增
                        <input type="checkbox" v-model="system.permissions[2]" class="check" /> 搜尋
                        <input type="checkbox" v-model="system.permissions[3]" class="check" /> 修改
                        <input type="checkbox" v-model="system.permissions[4]" class="check" /> 刪除
                    </span>
                </div>
            </li>
        </ul>

        <button @click="addAuthor" class="btn btn-outline-success">新增</button>
    </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import httpClient from "@/main";
import router from "../../router";
import { view } from "@/audit";

const empName = ref("");

const json = reactive({
    emps: [],
});

const author = reactive({
    systems: [],
    info: "",
});

onMounted(async () => {
    view(useRoute().path);
    await getAllEmployees();
    await getAllSystems();
});

async function getAllEmployees() {
    const res = await httpClient.get("/employee/session-all");
    json.emps = res.data;
}

async function getAllSystems() {
    const res = await httpClient.get("/system/all");
    author.systems = res.data.map((system) => ({
        ...system,
        permissions: [false, false, false, false, false],
    }));
}

function changeToInteger() {
    let count = 0;
    author.systems.forEach((e) => {
        let count2 = 0;
        e.permissions.forEach((p) => {
            if (p === true) {
                author.systems[count].permissions[count2] = 1;
                count2++;
            } else if (p === false) {
                author.systems[count].permissions[count2] = 0;
                count2++;
            }
        });
        count++;
    });
    console.log(author.systems);
}

function addAuthor() {
    changeToInteger();
    author.info = empName.value;
    // console.log(author.info);
    httpClient
        .post("/system-author/emp/add", author)
        .then((res) => {
            console.log(res);
            router.push("/emp/author/list");
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>

<style>
.span {
    display: inline-block;
    width: 300px;
    /* margin-bottom: 10px; */
}

.check {
    margin-left: 20px;
}
</style>
