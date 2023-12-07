<script setup>
import { ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
// const toHRPage = function () {
//     router.push('/emp/hr');
// }
// const path = useRoute().path;
// console.log(path);
</script>
<template>
    <div class="container">
        <div class="container text-center" style="margin-top: 15%">
            <div class="row align-items-center">
                <div class="col"><button class="btn btn-primary btn-lg">請假申請</button></div>
                <div class="col"><button class="btn btn-primary btn-lg">加班申請</button></div>
                <div class="col">
                    <button class="btn btn-primary btn-lg">請假加班審核</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="container text-center">
            <div class="row align-items-center">
                <div class="col">
                    <router-link to="/emp/hrms"><button class="btn btn-primary btn-lg">人力資源管理</button></router-link>
                </div>
                <div class="col"><button class="btn btn-primary btn-lg">權限管理</button></div>
                <div class="col"></div>
            </div>
        </div>
    </div>
</template>
