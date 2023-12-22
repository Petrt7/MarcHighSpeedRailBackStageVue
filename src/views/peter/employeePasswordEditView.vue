<template>
    <br />
    <br />
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <a style="font-weight: bold">員工ID</a>
                <br />{{ route.query.id }}
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <a style="font-weight: bold">員工姓名</a><br />{{ route.query.name }}
            </div>
            <div class="col"></div>
        </div>
    </div>
    <!-- <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">員工帳號<br />{{ route.query.acc }}</div>
            <div class="col"></div>
        </div>
    </div> -->
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <a style="font-weight: bold">新密碼</a>
                <br />
                <input type="password" v-model="psw" class="form-control" />
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <a style="font-weight: bold">確認密碼</a>
                <br />
                <input type="password" v-model="psw2" class="form-control" /><br />
                <p style="color: red">{{ msg }}</p>
            </div>
            <div class="col"></div>
        </div>
    </div>
    <div class="container text-center">
        <div class="row align-items-start">
            <div class="col"></div>
            <div class="col">
                <button class="btn btn-outline-success" @click="edit">修改密碼</button>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>
<script setup>
import { onUpdated, reactive, ref } from "vue";
import router from "../../router";
import { useRoute, useRouter } from "vue-router";
import { view } from "@/audit";
import httpClient from "@/main";

const route = useRoute();
console.log(route.query.id);

const psw = ref("");
const psw2 = ref("");

const msg = ref("");

const emp = reactive({
    id: 0,
    name: "",
    acc: "",
    psw: "",
});

onUpdated(() => {
    if (psw.value !== psw2.value) {
        msg.value = "密碼需相同";
    }
    if (psw.value === psw2.value) {
        msg.value = "";
    }
});

function edit() {
    if (psw.value === psw2.value) {
        emp.id = route.query.id;
        emp.name = route.query.name;
        emp.acc = route.query.acc;
        emp.psw = psw2;
        httpClient.put("/employee/account/update", emp);
    }
}
</script>
