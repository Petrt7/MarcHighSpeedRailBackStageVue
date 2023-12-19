<template>
    <br />
    <div class="container" style="margin: 10px 37%">
        <router-link to="/emp/author/emp/add"><button v-if="addEmpSystemAuthorPage" class="btn btn-warning"
                style="margin-right: 30px">
                新增員工權限
            </button></router-link>
        <router-link to="/emp/author/dept/add"><button v-if="addDeptSystemAuthorPage" class="btn btn-warning">
                新增部門權限
            </button></router-link>
    </div>
    <br />
    <!-- <div class="container" style="margin: 10px 33%">
        <div v-for="(item, index) in jsonData.data" :key="index">
            <span>
                <p class="a" v-if="item.eName">eName: {{ item.eName }}</p>
            </span>
            <span>
                <p class="a" v-if="item.dName">dName: {{ item.dName }}</p>
            </span>
            <button @click="toEdit({ item })" class="btn btn-warning" style="margin: 10px 10px">
                編輯
            </button>
            <button @click="deleteById({ item })" class="btn btn-danger" style="margin: 10px 10px">
                刪除
            </button>
        </div>
    </div> -->

    <table class="table">
        <thead>
            <tr>
                <th scope="col">員工/部門ID</th>
                <th scope="col">員工/部門名稱</th>
                <th scope="col">編輯</th>
                <th scope="col">刪除</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in jsonData.data">
                <th scope="row">{{ item.eId }}{{ item.dId }}</th>
                <td>
                    <p class="a" v-if="item.eName">{{ item.eName }}</p>
                    <p class="a" v-if="item.dName">{{ item.dName }}</p>
                </td>
                <td>
                    <button @click="toEdit({ item })" v-if="(item.eId !== null && employeeAuthorEditPage) ||
                        (item.dId !== null && departmentAuthorEditPage)
                        " class="btn btn-warning">
                        編輯
                    </button>
                </td>
                <td>
                    <button @click="deleteById({ item })" v-if="deleteAuthor" class="btn btn-danger">
                        刪除
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import { ref, reactive, toRefs, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view, create, del } from "@/audit";
import router from "../../router";
import httpClient from "@/main";

const addEmpSystemAuthorPage = ref(false);
const addDeptSystemAuthorPage = ref(false);
const employeeAuthorEditPage = ref(false);
const departmentAuthorEditPage = ref(false);
const deleteAuthor = ref(false);

const jsonData = reactive({
    data: [],
});

onMounted(async () => {
    view(useRoute().path);
    del(useRoute().path)
        .then((res) => {
            deleteAuthor.value = res;
        })
        .catch((err) => {
            deleteAuthor.value = err;
        });
    view("/emp/author/emp/add")
        .then((res) => {
            addEmpSystemAuthorPage.value = res;
        })
        .catch((err) => {
            addEmpSystemAuthorPage.value = err;
        });
    view("/emp/author/dept/add")
        .then((res) => {
            addDeptSystemAuthorPage.value = res;
        })
        .catch((err) => {
            addDeptSystemAuthorPage.value = err;
        });
    view("/emp/author/emp/edit")
        .then((res) => {
            employeeAuthorEditPage.value = res;
        })
        .catch((err) => {
            employeeAuthorEditPage.value = err;
        });
    view("/emp/author/dept/edit")
        .then((res) => {
            departmentAuthorEditPage.value = res;
        })
        .catch((err) => {
            departmentAuthorEditPage.value = err;
        });
    getAllSystemAuthoMembers();
});

function toEdit(item) {
    if (item.item.eId !== null) {
        router.push({
            path: "/emp/author/emp/edit",
            query: { id: item.item.eId },
        });
    }
    if (item.item.dId !== null) {
        router.push({
            path: "/emp/author/dept/edit",
            query: { id: item.item.dId },
        });
    }
}

async function getAllSystemAuthoMembers() {
    try {
        const response = await httpClient.get("/system-author-member/all");
        jsonData.data = response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function deleteById(item) {
    if (item.item.eId !== null) {
        httpClient
            .delete(`/system-author/delete/emp/${item.item.eId}`)
            .then((res) => {
                console.log(res.data);
                getAllSystemAuthoMembers();
            })
            .catch((err) => {
                console.log(err);
                getAllSystemAuthoMembers();
            });
    } else if (item.item.dId !== null) {
        httpClient
            .delete(`/system-author/delete/dept/${item.item.dId}`)
            .then((res) => {
                console.log(res.data);
                getAllSystemAuthoMembers();
            })
            .catch((err) => {
                console.log(err);
                getAllSystemAuthoMembers();
            });
    }
}
</script>

<style>
.reverse {
    order: -1;
    margin-right: 25px;
    border: none;
}

.a {
    display: inline-block;
    width: 200px;
}
</style>
