<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12">
          <h2>失物招領列表</h2>
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>失物ID</th>
                <th>行程ID</th>
                <th>站名</th>
                <th>發現日期</th>
                <th>停留站</th>
                <th>簡易外觀</th>
                <th>詳細外觀</th>
                <th>信件檢查</th>
                <th>接收檢查</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in lostProperties"
                :key="item.lostPropertyId"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.lostPropertyId }}</td>
                <td>{{ item.tripId }}</td>
                <td>{{ item.stationName }}</td>
                <td>{{ item.findDate }}</td>
                <td>{{ item.stayStation }}</td>
                <td>{{ item.simpleOutward }}</td>
                <td>{{ item.detailOutward }}</td>
                <td>{{ item.letterCheck ? "是" : "否" }}</td>
                <td>{{ item.receiveCheck ? "是" : "否" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import httpClient from "@/main";
const lostProperties = ref([]);

onMounted(() => {
  httpClient
    .get("/LostProperty/backend/findAll", lostProperties, {
      headers: {
        "Content-Type": " application/json", // 設定 Content-Type 為 multipart/form-data
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch(function (err) {
      console.error("Error:", err);
      // Handle the error as needed
    });
});
</script>