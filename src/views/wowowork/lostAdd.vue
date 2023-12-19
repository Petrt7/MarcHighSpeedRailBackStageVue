<template>
  <div class="container">
    <h1>新增遺失物</h1>
  </div>
</template>


<script setup>
import httpClient from "@/main";
import { reactive } from "vue";
const LostProperty = reactive({
  LPtripId: "",
  LPstationName: "",
  LPfindDate: "",
  LPstayStation: "",
  LPsimpleOutward: "",
  LPdetailOutward: "",
  LPphoto: "",
});

const postLostItem = function () {
  httpClient
    .post("/LostProperty/add", LostProperty)
    .then(function (res) {})
    .catch(function (err) {
      console.log("err: " + err);
    });
};
</script>