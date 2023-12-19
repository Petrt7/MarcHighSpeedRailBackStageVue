<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";
import httpClient from "@/main";
import router from "../../router";

const judgeAuthorListPage = ref(false);
const judgeHrmsView = ref(false);
const judgeLeaveApplyView = ref(false);
const leaveAuditView = ref(false);

onMounted(() => {
    view(useRoute().path);

    view("/emp/author/list")
        .then((res) => {
            judgeAuthorListPage.value = res;
        })
        .catch((err) => {
            judgeAuthorListPage.value = err;
        });

    view("/emp/hmrs")
        .then((res) => {
            judgeHrmsView.value = res;
        })
        .catch((err) => {
            judgeHrmsView.value = err;
        });

    view("/emp/leave/apply")
        .then((res) => {
            judgeLeaveApplyView.value = res;
        })
        .catch((err) => {
            judgeLeaveApplyView.value = err;
        });

    view("/emp/leave/audit")
        .then((res) => {
            leaveAuditView.value = res;
        })
        .catch((err) => {
            leaveAuditView.value = err;
        });
});
</script>
<template>
    <div class="container">
        <div class="container text-center" style="margin-top: 15%">
            <div class="row align-items-center">
                <div class="col">
                    <router-link to="/emp/author/list"><button v-if="judgeAuthorListPage" class="btn btn-warning btn-lg">
                            權限管理
                        </button></router-link>
                </div>
                <div class="col">
                    <router-link to="/emp/hrms"><button v-if="judgeHrmsView" class="btn btn-warning btn-lg">
                            人資管理
                        </button></router-link>
                </div>
                <div class="col">
                    <router-link to="/emp/leave/apply"><button v-if="judgeLeaveApplyView" class="btn btn-warning btn-lg">
                            請假申請
                        </button></router-link>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="container text-center">
            <div class="row align-items-center">
                <div class="col">
                    <router-link to="/emp/leave/audit"><button v-if="leaveAuditView" class="btn btn-warning btn-lg">
                            請假審核
                        </button></router-link>
                </div>
                <div class="col"></div>
                <div class="col"></div>
            </div>
        </div>
    </div>
</template>
