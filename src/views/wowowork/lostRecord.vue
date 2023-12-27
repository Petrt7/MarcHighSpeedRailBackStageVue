<template>
  AAA
  <!-- <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12">
          <h1>遺失物領取紀錄</h1>
          <table class="table">
            <thead>
              <tr>
                <th>失物ID</th>
                <th>失物名稱</th>
                <th>失物特徵</th>
                <th>失物領取站</th>
                <th>領取日期</th>
                <th>失物圖片</th>
              </tr>
            </thead>
            <tbody> -->
  <!-- <tr v-for="item in findLosts" :key="item.findLostId">
                <td>{{ item.lostPropertyId }}</td>
                <td>{{ item.simpleOutward }}</td>
                <td>{{ item.detailOutward }}</td>
                <td>{{ item.stayStation }}</td>
                <td>{{ item.findLostDate }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    data-bs-toggle="modal"
                    :data-bs-target="'#photoModal' + item.lostPropertyId"
                  >
                    照片
                  </button> -->

  <!-- 照片模態框 -->
  <!-- <div
                    class="modal fade"
                    :id="'photoModal' + item.lostPropertyId"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">
                            {{ item.detailOutward }}
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body"> -->
  <!-- 顯示照片的 img 標籤 -->
  <!-- <img
                            :src="
                              backendURL +
                              '/LostProperty/backend/downloadImage/' +
                              item.lostPropertyId
                            "
                            class="card-img-bottom"
                            alt="item.findLostId"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { onMounted, reactive } from "vue";
import httpClient from "@/main";
const backendURL = import.meta.env.VITE_AXIOS_HTTP_BASEURL;

const findLosts = reactive({
  findLostId: "",
  lostProperty: {
    lostPropertyId: "",
    tripId: "",
    stationName: "",
    findDate: "",
    stayStation: "",
    simpleOutward: "",
    detailOutward: "",
    letterCheck: "",
    receiveCheck: "",
    // hibernateLazyInitializer: "",
  },
  findLostDate: "",
});
// const findLosts = ref([]);

function getFindLost() {
  httpClient
    .get("/LostProperty/backend/findAll", findLosts, {
      headers: {
        "Content-Type": " application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      //   lostProperties.value = res.data.content;
      //   findLosts.findLostId = res.data.findLostId;
      //   findLosts.lostProperty = res.data.lostProperty;
      //   findLosts.lostPropertyId = res.data.lostProperty.lostPropertyId;
      //   findLosts.tripId = res.data.lostProperty.tripId;
      //   findLosts.stationName = res.data.lostProperty.stationName;
      //   findLosts.findDate = res.data.lostProperty.findDate;
      //   findLosts.stayStation = res.data.lostProperty.stayStation;
      //   findLosts.simpleOutward = res.data.lostProperty.simpleOutward;
      //   findLosts.detailOutward = res.data.lostProperty.detailOutward;
      //   findLosts.letterCheck = res.data.lostProperty.letterCheck;
      //   findLosts.receiveCheck = res.data.lostProperty.receiveCheck;
      //   findLosts.findLostDate = res.data.findLostDate;
      //   findLosts = res.data;
    })
    .catch(function (err) {
      console.error("Error:", err);
      // Handle the error as needed
    });
}
onMounted(getFindLost);
</script>

<style>
</style>