<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import router from "../../router";
import httpClient from "@/main";

onMounted(async () => {
    await view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    await getAllCarryForwards();
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
