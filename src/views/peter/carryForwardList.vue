<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import router from "../../router";
import httpClient from "@/main";

onMounted(async () => {
    view(useRoute().path);
    getAllCarryForwards();
});

function getAllCarryForwards() {
    httpClient.get("/employee/leave/carry-forward").then((res) => {
        console.log(res.data);
    });
}
</script>
<template>
    <div></div>
</template>
