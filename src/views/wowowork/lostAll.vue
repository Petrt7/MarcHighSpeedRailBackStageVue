<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12">
          <h1>遺失物列表</h1>
          <div>
            <h3>應對流程：</h3>
            <ol>
              <li>先問領取人要找甚麼物品<br />包含時間和掉落地點或班次</li>
              <li>
                逐漸問他詳細物品特徵<br />不能主動回覆特徵<br />不然會有盜領的風險
              </li>
            </ol>
          </div>
          <div id="photoView"></div>
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
                <th>遺失物照片</th>
                <th>修改狀態</th>
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
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    data-bs-toggle="modal"
                    :data-bs-target="'#photoModal' + item.lostPropertyId"
                  >
                    照片
                  </button>

                  <!-- 照片模態框 -->
                  <div
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
                        <div class="modal-body">
                          <!-- 顯示照片的 img 標籤 -->
                          <img
                            :src="
                              backendURL +
                              '/LostProperty/backend/downloadImage/' +
                              item.lostPropertyId
                            "
                            class="card-img-bottom"
                            alt="item.lostPropertyId"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-info"
                    @click="modifyLostProperty(item.lostPropertyId)"
                  >
                    更改
                  </button>
                </td>
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
const backendURL = import.meta.env.VITE_AXIOS_HTTP_BASEURL;

const lostProperties = ref([]);
const LostProperty = ref([]);

function getLostPage() {
  httpClient
    .get("/LostProperty/backend/findAll", lostProperties, {
      headers: {
        "Content-Type": " application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      lostProperties.value = res.data.content;
    })
    .catch(function (err) {
      console.error("Error:", err);
      // Handle the error as needed
    });
}
function showImage(lpid) {
  return backendURL + "/LostProperty/backend/downloadImage/" + lpid;
}
function modifyLostProperty(lostPropertyId) {
  httpClient
    .post("/LostProperty/backend/updateById/" + lostPropertyId, LostProperty, {
      headers: {
        "Content-Type": "multipart/form-data", // 設定 Content-Type 為 multipart/form-data
      },
    })
    .then(function (res) {
      console.log("Response:", res.data);
    })
    .catch(function (err) {
      console.error("Error:", err);
      // Handle the error as needed
    });
  console.log(`Modify lost property with ID: ${lostPropertyId}`);
}
onMounted(getLostPage);
</script>