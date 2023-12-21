
  <template>
  <div class="container" id="lostform">
    <div id="app" class="container mt-5">
      <form @submit.prevent="postLostItem">
        <h1>新增遺失物</h1>
        <div class="mb-3">
          <label for="tripId" class="form-label">撿拾到的車次</label>
          <input
            v-model="LostProperty.tripId"
            type="number"
            class="form-control"
            id="tripId"
          />
        </div>
        <div class="mb-3">
          <label for="stationName" class="form-label">撿拾到的站名</label>
          <select
            v-model="LostProperty.stationName"
            type="text"
            class="form-control"
            id="stationName"
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
        </div>
        <div class="mb-3">
          <label for="findDate" class="form-label">撿拾到的日子</label>
          <input
            v-model="LostProperty.findDate"
            type="date"
            class="form-control"
            id="findDate"
            required
          />
        </div>
        <div class="mb-3">
          <label for="stayStation" class="form-label">遺失物存放車站</label>
          <select
            v-model="LostProperty.stayStation"
            type="text"
            class="form-control"
            id="stayStation"
            required
          >
            <option value="" disabled selected>請選擇站名 ▽</option>
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
        </div>
        <div class="mb-3">
          <label for="simpleOutward" class="form-label">物品名稱</label>
          <input
            v-model="LostProperty.simpleOutward"
            type="text"
            class="form-control"
            id="simpleOutward"
            required
          />
        </div>
        <div class="mb-3">
          <label for="detailOutward" class="form-label">物品詳細外觀</label>
          <textarea
            v-model="LostProperty.detailOutward"
            class="form-control"
            id="detailOutward"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="lostPhoto" class="form-label">遺失物圖片上傳</label>
          <input
            type="file"
            @change="handleFileChange"
            class="form-control"
            id="lostPhoto"
            accept="image/*"
          />
        </div>

        <button type="submit" class="btn btn-primary">預覽</button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { reactive } from "vue";
import httpClient from "@/main";

const LostProperty = reactive({
  tripId: "",
  stationName: "",
  findDate: "",
  stayStation: "",
  simpleOutward: "",
  detailOutward: "",
  lostPhoto: null, // To store the file
});

const postLostItem = function () {
  const formData = new FormData();
  formData.append("lostProperty", JSON.stringify(LostProperty)); // 將 LostProperty 轉為 JSON 字串並加入 FormData

  // 添加圖片文件，如果 LostProperty.lostPhoto 為 null，則設置為空字串
  formData.append("lostPhoto", LostProperty.lostPhoto || "");

  httpClient
    .post("/LostProperty/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 設定 Content-Type 為 multipart/form-data
      },
    })
    .then(function (res) {
      console.log("Response:", res.data);
      // Handle the response as needed
    })
    .catch(function (err) {
      console.error("Error:", err);
      // Handle the error as needed
    });
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  LostProperty.lostPhoto = file;
};
</script>

<style>
#lostform {
  width: 50%;
  border: 2px solid rgb(188, 188, 188);
  box-shadow: 0px 5px 5px rgb(188, 188, 188);
  padding-bottom: 20px;
}
</style>
