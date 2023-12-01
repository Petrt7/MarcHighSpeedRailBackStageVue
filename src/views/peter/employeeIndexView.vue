<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
// const toHRPage = function () {
//     router.push('/emp/hr');
// }
</script>
<template>
    <div>
        <button>請假申請</button>
        <button>加班申請</button>
        <button>請假加班審核</button>
        <router-link to="/emp/hrms"><button>人力資源管理</button></router-link>
        <button>權限管理</button>
    </div>
</template>