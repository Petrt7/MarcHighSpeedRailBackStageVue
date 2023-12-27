<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import httpClient from "@/main";
import router from "../../router";

// Initialization for ES Users
// import { Popover, initMDB } from "mdb-ui-kit";

// initMDB({ Popover });

const judgeAuthorListPage = ref(false);
const judgeHrmsView = ref(false);
const judgeLeaveApplyView = ref(false);
const leaveAuditView = ref(false);
const judgeEmployeeAccountListView = ref(false);

const reads = reactive([]);

onMounted(async () => {
    await view(useRoute().path).then((res) => {
        if (!res) {
            router.push("/error");
        }
        console.log(res);
    });

    await view("/emp/author/list")
        .then((res) => {
            judgeAuthorListPage.value = res;
        })
        .catch((err) => {
            judgeAuthorListPage.value = err;
        });

    await view("/emp/hrms")
        .then((res) => {
            judgeHrmsView.value = res;
        })
        .catch((err) => {
            judgeHrmsView.value = err;
        });

    await view("/emp/leave/apply")
        .then((res) => {
            judgeLeaveApplyView.value = res;
        })
        .catch((err) => {
            judgeLeaveApplyView.value = err;
        });

    await view("/emp/leave/audit")
        .then((res) => {
            leaveAuditView.value = res;
        })
        .catch((err) => {
            leaveAuditView.value = err;
        });
    await view("/emp/acc/list")
        .then((res) => {
            judgeEmployeeAccountListView.value = res;
        })
        .catch((err) => {
            judgeEmployeeAccountListView.value = err;
        });
    await getAllUnreadLeaves();
});

function getAllUnreadLeaves() {
    httpClient
        .get("/employee/leave/unread", {
            params: {
                id: 2,
            },
        })
        .then((res) => {
            reads.values = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function logout() {
    httpClient
        .put("/employee/logout")
        .then((res) => {
            router.push("/");
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>
<template>
    <div class="container">
        <router-link to="/emp/leave/read"><img v-if="reads.values.length === 0" src="../../assets/img/bell.png"
                style="width: 25px; margin-left: 90%; cursor: pointer" /></router-link>
        <router-link to="/emp/leave/read"><img v-if="reads.values.length !== 0" src="../../assets/img/notification.png"
                style="width: 25px; margin-left: 90%; cursor: pointer" /></router-link>

        <button class="btn btn-outline-success" style="margin-left: 10px" @click="logout">
            登出
        </button>
        <div class="container text-center" style="margin-top: 12%">
            <div class="row align-items-center">
                <div class="col">
                    <router-link to="/emp/leave/apply"><button v-if="judgeLeaveApplyView" class="btn btn-success btn-lg">
                            請假申請
                        </button></router-link>
                </div>
                <div class="col">
                    <router-link to="/emp/author/list"><button v-if="judgeAuthorListPage" class="btn btn-success btn-lg">
                            權限管理
                        </button></router-link>
                </div>
                <div class="col">
                    <router-link to="/emp/hrms"><button v-if="judgeHrmsView" class="btn btn-success btn-lg">
                            人資管理
                        </button></router-link>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="container">
        <div class="container text-center">
            <div class="row align-items-center">
                <div class="col">
                    <router-link to="/emp/leave/audit"><button v-if="leaveAuditView" class="btn btn-success btn-lg">
                            請假審核
                        </button></router-link>
                </div>
                <div class="col">
                    <router-link to="/emp/acc/list"><button v-if="judgeEmployeeAccountListView"
                            class="btn btn-success btn-lg">
                            員工帳號密碼管理
                        </button></router-link>
                </div>
                <div class="col"></div>
            </div>
        </div>
    </div>
</template>
