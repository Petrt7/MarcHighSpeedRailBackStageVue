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
                <th>班次號碼</th>
                <th>站名</th>
                <th>發現日期</th>
                <th>遺失物所在站</th>
                <th>簡易外觀</th>
                <th>詳細外觀</th>
                <th>信件檢查</th>
                <th>接收檢查</th>
                <th>遺失物照片</th>
                <th>修改狀態</th>
                <th>　</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in lostProperties"
                :key="item.lostPropertyId"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.lostPropertyId }}</td>
                <td v-if="!item.isEditing">{{ item.tripId }}</td>
                <td v-if="item.isEditing">
                  <input
                    type="text"
                    class="form-control"
                    id="tripIdd"
                    v-model="item.tripId"
                  />
                </td>
                <td v-if="!item.isEditing">{{ item.stationName }}</td>
                <td v-if="item.isEditing">
                  <select
                    type="text"
                    class="form-control"
                    v-model="item.stationName"
                  >
                    <option value="">無</option>
                    <option value="南港">南港</option>
                    <option value="台北">台北</option>
                    <option value="板橋">板橋</option>
                    <option value="桃園">桃園</option>
                    <option value="新竹">新竹</option>
                    <option value="苗栗">苗栗</option>
                    <option value="台中">台中</option>
                    <option value="彰化">彰化</option>
                    <option value="雲林">雲林</option>
                    <option value="嘉義">嘉義</option>
                    <option value="台南">台南</option>
                    <option value="左營">左營</option>
                  </select>
                </td>
                <td v-if="!item.isEditing">{{ item.findDate }}</td>
                <td v-if="item.isEditing">
                  <input
                    type="date"
                    class="form-control"
                    v-model="item.findDate"
                  />
                </td>
                <td v-if="!item.isEditing">{{ item.stayStation }}</td>
                <td v-if="item.isEditing">
                  <select
                    type="text"
                    class="form-control"
                    v-model="item.stayStation"
                  >
                    <option value="南港">南港</option>
                    <option value="台北">台北</option>
                    <option value="板橋">板橋</option>
                    <option value="桃園">桃園</option>
                    <option value="新竹">新竹</option>
                    <option value="苗栗">苗栗</option>
                    <option value="台中">台中</option>
                    <option value="彰化">彰化</option>
                    <option value="雲林">雲林</option>
                    <option value="嘉義">嘉義</option>
                    <option value="台南">台南</option>
                    <option value="左營">左營</option>
                  </select>
                </td>
                <td v-if="!item.isEditing">{{ item.simpleOutward }}</td>
                <td v-if="item.isEditing">
                  <input
                    type="text"
                    class="form-control"
                    v-model="item.simpleOutward"
                    id="simpleOutwardd"
                  />
                </td>
                <td v-if="!item.isEditing">{{ item.detailOutward }}</td>
                <td v-if="item.isEditing">
                  <textarea class="form-control" v-model="item.detailOutward" />
                </td>
                <td v-if="!item.isEditing">
                  {{ item.letterCheck ? "是" : "否" }}
                </td>
                <td v-if="item.isEditing">
                  是：<input
                    type="radio"
                    class="form-check-input mt-0"
                    value="true"
                    v-model="item.letterCheck"
                  /><br />
                  否：<input
                    type="radio"
                    class="form-check-input mt-0"
                    value="false"
                    v-model="item.letterCheck"
                  />
                </td>
                <td v-if="!item.isEditing">
                  {{ item.receiveCheck ? "是" : "否" }}
                </td>
                <td v-if="item.isEditing">
                  是：<input
                    type="radio"
                    class="form-check-input mt-0"
                    value="true"
                    v-model="item.receiveCheck"
                  /><br />
                  否：<input
                    type="radio"
                    class="form-check-input mt-0"
                    value="false"
                    v-model="item.receiveCheck"
                  />
                </td>
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
                <td v-if="!item.isEditing">
                  <button
                    type="button"
                    class="btn btn-info"
                    @click="modifyLostProperty(item)"
                  >
                    更改
                  </button>
                </td>
                <td v-if="item.isEditing">
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="changeLostProperty(item)"
                  >
                    完成
                  </button>
                </td>
                <td v-if="item.isEditing">
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="deleteLost(item.lostPropertyId)"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ul class="pagination">
        <li class="page-item">
          <button v-if="currentPageNum == 1" type="button" class="page-link">
            第一頁
          </button>
          <button
            v-else
            type="button"
            class="page-link"
            @click="goSomePage(currentPageNum - 1, pageContent)"
          >
            上一頁
          </button>
        </li>

        <li class="page-item" v-for="pageNum in totalPages">
          <button
            v-if="currentPageNum == pageNum"
            type="button"
            class="page-link active"
          >
            {{ pageNum }}
          </button>
          <button
            v-else
            type="button"
            class="page-link"
            @click="goSomePage(pageNum, pageContent)"
          >
            {{ pageNum }}
          </button>
        </li>

        <li class="page-item">
          <button
            v-if="currentPageNum == totalPages"
            type="button"
            class="page-link"
          >
            最後一頁
          </button>
          <button
            v-else
            type="button"
            class="page-link"
            @click="goSomePage(currentPageNum + 1, pageContent)"
          >
            下一頁
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import httpClient from "@/main";
import router from "../../router";
const backendURL = import.meta.env.VITE_AXIOS_HTTP_BASEURL;

const totalPages = ref(1);
const currentPageNum = ref(1);
const pageContent = ref([]);

function goSomePage(somePage, pageContent) {
  // console.log('somePage' + somePage)
  // console.log('click!!!')
  pageContent, somePage;
}

const lostProperties = ref([]);
const lostPhoto = ref([]);
const LostProperty = reactive({
  lostPropertyId: "",
  tripId: "",
  stationName: "",
  findDate: "",
  stayStation: "",
  simpleOutward: "",
  detailOutward: "",
  letterCheck: "",
  receiveCheck: "",
});
const tempLostProperty = reactive({
  lostPropertyId: "",
  tripId: "",
  stationName: "",
  findDate: "",
  stayStation: "",
  simpleOutward: "",
  detailOutward: "",
  letterCheck: "",
  receiveCheck: "",
});

function deleteLost(id) {
  httpClient
    .delete("/LostProperty/backend/deleteByLostPropertyId/" + id)
    .then((res) => {
      alert("刪除了 id = " + id + " 的遺失物");
      location.reload();
    })
    .catch(function (err) {
      console.error("發生錯誤:", err);
    });
}

function getLostPage() {
  httpClient
    .get("/LostProperty/backend/findAll", lostProperties, {
      headers: {
        "Content-Type": " application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      totalPages.value = res.data.totalPages;
      currentPageNum.value = res.data.pageable.pageNumber + 1;
      pageContent.value = res.data.content;
      //   lostProperties.value = res.data.content;
      lostProperties.value = res.data.content.map((prop) => ({
        ...prop,
        isEditing: false,
      }));
    })
    .catch(function (err) {
      console.error("Error:", err);
      // Handle the error as needed
    });
}
function showImage(lpid) {
  return backendURL + "/LostProperty/backend/downloadImage/" + lpid;
}
async function modifyLostProperty(item) {
  await (item.isEditing = !item.isEditing);
  if (item.isEditing === false) {
    console.log("取消");
    // item = tempLostProperty;
  } else {
    console.log("更改");
    // tempLostProperty = {
    //   lostPropertyId: item.lostPropertyId,
    //   tripId: item.tripId,
    //   stationName: item.stationName,
    //   findDate: item.findDate,
    //   stayStation: item.stayStation,
    //   simpleOutward: item.simpleOutward,
    //   detailOutward: item.detailOutward,
    //   // lostPhoto: null,
    //   letterCheck: item.letterCheck,
    //   receiveCheck: item.receiveCheck,
    // };
    // console.log(item);
  }
}
function changeLostProperty(item) {
  httpClient
    .post(
      "/LostProperty/backend/updateById/" + item.lostPropertyId,
      {
        lostPropertyId: item.lostPropertyId,
        tripId: item.tripId,
        stationName: item.stationName,
        findDate: item.findDate,
        stayStation: item.stayStation,
        simpleOutward: item.simpleOutward,
        detailOutward: item.detailOutward,
        // lostPhoto: null,
        letterCheck: item.letterCheck,
        receiveCheck: item.receiveCheck,
      },
      {
        headers: {
          "Content-Type": "application/json", // 設定 Content-Type 為 multipart/form-data
        },
      }
    )
    .then(function (res) {
      console.log("Response:", res.data);
      item.isEditing = !item.isEditing;
    })
    .catch(function (err) {
      modifyLostProperty(item);
      item.isEditing = !item.isEditing;
      // Handle the error as needed
    });
}
// function postImage(item) {
//   httpClient
//     .post("/LostProperty/backend/postImage/" + item.lostPropertyId, lostPhoto, {
//       headers: {
//         "Content-Type": "image/jpeg",
//       },
//     })
//     .then(function (res) {
//       console.log(res.data);
//     })
//     .catch(function (err) {
//       console.error("Error:", err);
//     });
// }

onMounted(getLostPage);
</script>
<style>
#tripIdd {
  width: 4em;
}
#simpleOutwardd {
  width: 6em;
}
</style>