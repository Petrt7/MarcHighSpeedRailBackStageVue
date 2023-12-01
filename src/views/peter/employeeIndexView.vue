<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
const toHRPage = function () {
    router.push('');
}
</script>
<template>
    <div>
        <button>請假申請</button>
        <button>加班申請</button>
        <button>請假加班審核</button>
        <button @click="toHRPage">人力資源管理</button>
        <button>權限管理</button>
    </div>
</template>