<template>
    <div style="margin-top: 10px; margin-left: 33%">
        <div>
            <div v-for="(item, index) in jsonData.data" :key="index">
                <!-- <p v-if="item.eId">eId: {{ item.eId }}</p>
            <p v-if="item.dId">dId: {{ item.dId }}</p> -->
                <div v-if="item.saString">
                    <p>系統權限:</p>
                    <ul>
                        <li v-for="(values, key) in saStringRef.authorJson" :key="key" class="li">
                            <span class="title">{{ saStringRef.systemList[key - 1].systemName }}</span>

                            <!-- 使用 checkbox 進行綁定 -->
                            <label v-for="(value, checkboxIndex) in values" :key="checkboxIndex" class="reverse">
                                <span v-if="checkboxIndex == 0">查看</span>
                                <span v-if="checkboxIndex == 1">新增</span>
                                <span v-if="checkboxIndex == 2">搜尋</span>
                                <span v-if="checkboxIndex == 3">修改</span>
                                <span v-if="checkboxIndex == 4">刪除</span>
                                <input type="checkbox" :value="value"
                                    v-model="saStringRef.authorJson[key][checkboxIndex]" />
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <button @click="updateEmployeeSystemAuthor" class="btn btn-outline-success" style="margin: 10px">
            更新
        </button>
        {{ message }}
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import router from "../../router";
import { useRoute, useRouter } from "vue-router";
import { view, update } from "@/audit";
import httpClient from "@/main";

const route = useRoute();
const judgeUpdate = ref(false);
const message = ref("");
const pagePath = useRoute().path;

// const id = ref(route.query.id);

const jsonData = reactive({
    data: [],
});

const saStringRef = reactive({
    authorJson: {},
    systemList: [],
});

onMounted(async () => {
    view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    getAllSystemAuthors();
});

async function getAllSystemAuthors() {
    try {
        const response = await httpClient.get(`/system-author/emp/${route.query.id}`);
        jsonData.data = response.data;

        const { saString } = jsonData.data[0];
        saStringRef.systemList = saString.systemList;
        let i;
        for (i = 0; i < Object.keys(saStringRef.systemList).length; i++) {
            saStringRef.authorJson[saStringRef.systemList[i].systemId] = [0, 0, 0, 0, 0];
        }

        let id = saStringRef.systemList[Object.keys(saString.authorJson).length - 1].systemId;
        let j;
        for (j = 1; j <= id; j++) {
            if (saString.authorJson[j] != undefined) {
                saStringRef.authorJson[j] = saString.authorJson[j];
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    let a;

    //把1轉成true，0轉成false
    for (a = 1; a <= Object.keys(saStringRef.authorJson).length; a++) {
        saStringRef.authorJson[a].forEach((value, index) => {
            if (value === 1) {
                saStringRef.authorJson[a][index] = true;
            } else if (value === 0) {
                saStringRef.authorJson[a][index] = false;
            }
        });
    }
}

async function updateEmployeeSystemAuthor() {
    await update(pagePath)
        .then((res) => {
            judgeUpdate.value = res;
        })
        .catch((err) => {
            judgeUpdate.value = err;
        });

    if (!judgeUpdate.value) {
        message.value = "沒有此權限";
        return;
    }

    httpClient
        .get(`/system-author/emp/${route.query.id}`)
        .then((res) => {
            jsonData.data = res.data;
            const { saString } = jsonData.data[0];

            let a;
            for (a = 1; a <= Object.keys(saStringRef.authorJson).length; a++) {
                saStringRef.authorJson[a].forEach((value, index) => {
                    if (value === true) {
                        saStringRef.authorJson[a][index] = 1;
                    } else if (value === false) {
                        saStringRef.authorJson[a][index] = 0;
                    }
                });
            }
            saString.authorJson = saStringRef.authorJson;
            saString.systemList = saStringRef.systemList;
            httpClient.put(`/system-author/emp/${route.query.id}`, {
                saString,
            });
        })
        .then((res) => {
            router.push("/emp/author/list");
        });
}
</script>

<style>
.reverse {
    order: -1;
    margin-right: 25px;
    margin-bottom: 20px;
    border: none;
}

.title {
    display: block;
    /* margin-right: 10px; */
}
</style>
