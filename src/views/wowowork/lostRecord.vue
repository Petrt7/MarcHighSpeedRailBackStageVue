<template>
  <div>
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
            <tbody>
              <tr v-for="item in findLosts" :key="item.findLostId">
                <td>{{ item.lostPropertyId }}</td>
                <td>{{ item.simpleOutward }}</td>
                <td>{{ item.detailOutward }}</td>
                <td>{{ item.stayStation }}</td>
                <td>{{ item.findLostDate }}</td>
                <td>
                  <button @click="getPhoto(item.lostPropertyId)"
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
                            :src="item.photo"
                            
                            class="card-img-bottom"
                            alt="item.findLostId"
                          />
                          <!--:src="
                              backendURL +
                              '/LostProperty/backend/downloadImage/' +
                              item.lostPropertyId
                            "-->
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
  </div>
</template>

<script setup>
const backURL = import.meta.env.VITE_AXIOS_HTTP_BASEURL; 
import { onMounted, reactive , onBeforeMount} from "vue";
import httpClient from "@/main";
onBeforeMount(()=>{
  const backendURL = import.meta.env.VITE_AXIOS_HTTP_BASEURL; 
})

const findLosts = reactive([]);
// const findLosts = ref([]);

function getFindLost() {
  httpClient
    .get("/FindLost/backend/findAll", findLosts, {
      headers: {
        "Content-Type": " application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
        // lostProperties.value = res.data.content;
        for( let d of res.data){
          findLosts.push({
            findLostId : d.findLostId,
            // findLosts.lostProperty = d.lostProperty;
            lostPropertyId : d.lostPropertyId,
            tripId : d.tripId,
            stationName : d.stationName,
            findDate : d.findDate,
            stayStation : d.stayStation,
            simpleOutward : d.simpleOutward,
            detailOutward : d.detailOutward,
            letterCheck : d.letterCheck,
            receiveCheck : d.receiveCheck,
            findLostDate : d.findLostDate,
            photo: null
          })
        }
      // findLosts = res.data;
    })
    .catch(function (err) {
      console.error("Error:", err);
      // Handle the error as needed
    });
}

function getPhoto(id){
  httpClient.get('/LostProperty/backend/downloadImage/' +id).then((res)=>{
    if(res.status==200){
      console.log( res);
      // find in finddLosts of item.lostPropertyId == id
      for( let i =0; i<findLosts.length ; i++){
        if( findLosts[i].lostPropertyId == id){
          findLosts[i].photo=backURL+'/LostProperty/backend/downloadImage/' +id
          // console.log( ' find lost in arr , try to add img')
          // findLosts[i].photo = "data:image/png;base64,"+res.data;
        }
      }
    }
  })
}
onMounted(getFindLost);
</script>

<style>
</style>