<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { view } from "@/audit";

const judgeEmpListPage = ref(false);
const judgeAttendanceListPage = ref(false);

onMounted(() => {
    view(useRoute().path);
    view("/emp/hrms/emp_list")
        .then((res) => {
            judgeEmpListPage.value = res;
        })
        .catch((err) => {
            judgeEmpListPage.value = err;
        });
    view("/emp/hrms/emp_attendance")
        .then((res) => {
            judgeAttendanceListPage.value = res;
        })
        .catch((err) => {
            judgeAttendanceListPage.value = err;
        });
});
</script>
<template>
    <div class="container">
        <div style="margin: 20% 10px">
            <div class="grid text-center">
                <div class="g-col-4">
                    <router-link to="/emp/hrms/emp_list"><button v-if="judgeEmpListPage" class="btn btn-warning btn-lg"
                            style="margin: 20px">
                            人事
                        </button></router-link>
                    <router-link to="/emp/hrms/emp_attendance"><button v-if="judgeAttendanceListPage"
                            class="btn btn-warning btn-lg">
                            出勤
                        </button></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
