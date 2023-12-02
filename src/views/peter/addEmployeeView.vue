<script setup>
import { ref, reactive } from 'vue'
import httpClient from "@/main";
import router from '../../router';

const employeeInfo = reactive({
    employeeName: "",
    employeeGender: "",
    employeeBirth: "",
    employeeIdNumber: "",
    employeePhoneNumber: "",
    employeeContactNumber: "",
    employeeEmail: "",
    employeeResidenceAddress: "",
    employeeContactAddress: "",
    employeePhoto: "",
    employeeArrivalDate: "",
    employeeSalaryKind: "",
    employeeBasicSalary: 0,
    employeeAccount: "",
    employeePassword: ""
});


const postEmpData = function () {
    // console.log(employeeInfo.value.employeeAccount)
    // moment(Birth).format('YYYY/MM/DD hh:mm:ss');
    employeeInfo.value.employeeAccount = employeeInfo.value.employeeIdNumber + 123
    employeeInfo.value.employeePassword = employeeInfo.value.employeeIdNumber + 456
    // console.log(employeeInfo.employeeBirth)
    httpClient.post("/employee/add", employeeInfo.value)
        .then(function (res) {
            console.log("res: " + res)
            router.push("/emp/hrms/emp_list")
        })
        .catch(function (err) {
            console.log("err: " + err)
        })
}

const fill = function () {
    // employeeInfo.value.employeeAccount = employeeInfo.value.employeeIdNumber + 123
    // employeeInfo.value.employeePassword = employeeInfo.value.employeeIdNumber + 456
    // employeeInfo.value.employeeName = '威志'
    // employeeInfo.value.employeeGender = '男'
    // employeeInfo.value.employeeBirth = '2000-12-02'
    // employeeInfo.value.employeeIdNumber = 'A123456789'
    // employeeInfo.value.employeePhoneNumber = '0987654321'
    // employeeInfo.value.employeeContactNumber = '0987654321'
    // employeeInfo.value.employeeEmail = 'test@gamil.com'
    // employeeInfo.value.employeeResidenceAddress = '無居住地'
    // employeeInfo.value.employeeContactAddress = '無居住地'
    // employeeInfo.value.employeeArrivalDate = '2023-12-02'
    // employeeInfo.value.employeeSalaryKind = '月薪'
    // employeeInfo.value.employeeBasicSalary = 40000
    // employeeInfo.value.employeePhoto = 'qwer'
    // console.log(employeeInfo.value)
    employeeInfo.employeeAccount = employeeInfo.employeeIdNumber + 123
    employeeInfo.employeePassword = employeeInfo.employeeIdNumber + 456
    employeeInfo.employeeName = '威志'
    employeeInfo.employeeGender = '男'
    employeeInfo.employeeBirth = '2000-12-02'
    employeeInfo.employeeIdNumber = 'A123456789'
    employeeInfo.employeePhoneNumber = '0987654321'
    employeeInfo.employeeContactNumber = '0987654321'
    employeeInfo.employeeEmail = 'test@gamil.com'
    employeeInfo.employeeResidenceAddress = '無居住地'
    employeeInfo.employeeContactAddress = '無居住地'
    employeeInfo.employeeArrivalDate = '2023-12-02'
    employeeInfo.employeeSalaryKind = '月薪'
    employeeInfo.employeeBasicSalary = 40000
    employeeInfo.employeePhoto = 'qwer'
    console.log(employeeInfo)
}

</script>

<template>
    <div>
        姓名<input type="text" v-model="employeeInfo.employeeName">
        性別<input type="text" v-model="employeeInfo.employeeGender">
        西元生日<input type="date" v-model="employeeInfo.employeeBirth">
        身分證字號<input type="text" v-model="employeeInfo.employeeIdNumber">
        手機<input type="text" v-model="employeeInfo.employeePhoneNumber">
        聯絡電話<input type="text" v-model="employeeInfo.employeeContactNumber">
        信箱<input type="text" v-model="employeeInfo.employeeEmail">
        戶籍地址<input type="text" v-model="employeeInfo.employeeResidenceAddress">
        聯絡地址<input type="text" v-model="employeeInfo.employeeContactAddress">
        到職日<input type="date" v-model="employeeInfo.employeeArrivalDate" pattern="\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}">
        薪水<input type="text" v-model="employeeInfo.employeeSalaryKind">
        <input type="text" v-model="employeeInfo.employeeBasicSalary">
        照片<input type="text" v-model="employeeInfo.employeePhoto">
    </div>
    <button @click="postEmpData">送出</button>
    <button @click="fill">一件填寫</button>
</template>