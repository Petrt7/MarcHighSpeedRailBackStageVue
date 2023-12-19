<script setup>
import { onUpdated, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import navbar from "./components/navbar.vue";
import httpClient from "@/main";
import "./audit";

const path = useRoute().path;

const login = ref("");

onUpdated(() => { });

function test() {
  httpClient
    .get("/employee/dto")
    .then((res) => {
      login.value = res.data.id;
      // console.log(res.data);
      console.log(login);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
  <navbar></navbar>
  <section>
    <router-view></router-view>
  </section>
</template>
