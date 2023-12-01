<script setup>
import { ref } from 'vue'
import httpClient from "@/main";

const name = ref("");
const gender = ref("");
const birth = ref("");
const id_number = ref("");
const phone_number = ref("");
const contact_number = ref("");
const email = ref("");
const residence_address = ref("");
const contact_address = ref("");
const photo = ref("");
const arrival_date = ref("");
const salary_kind = ref("");
const basic_salary = ref("");
const account = ref("");
const password = ref("");


</script>
<template>
    <div>
        姓名<input type="text" v-model="name">
        性別<input type="text" v-model="gender">
        西元生日<input type="text" v-model="birth">
        身分證字號<input type="text" v-model="id_number">
        手機<input type="text" v-model="phone_number">
        聯絡電話<input type="text" v-model="contact_number">
        信箱<input type="text" v-model="email">
        戶籍地址<input type="text" v-model="residence_address">
        聯絡地址<input type="text" v-model="contact_address">
        到職日<input type="text" v-model="arrival_date">
        薪水<input type="text" v-model="salary_kind">
        <input type="text" v-model="basic_salary">
        員工帳號<input type="text" v-model="account">
        員工密碼<input type="text" v-model="password">
        照片<input type="text" v-model="photo">
    </div>
</template>