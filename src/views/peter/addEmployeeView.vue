<script setup>
import { onUpdated, onMounted, ref, reactive } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import httpClient from "@/main";
import router from "../../router";
import { view } from "@/audit";
// import bootstrap from "bootstrap";

const depts = ref([]);
const titles = ref([]);
const a = ref(0);
const deptName = ref("");
const titleName = ref("");

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
    employeePassword: "",
    employeeHistoricalDepartment: [
        { department: { departmentId: null }, departmentEffectiveDate: null },
    ],
    employeeEducationalQualifications: [
        { schoolName: null, schoolDepartment: null, dateOfLeavingSchool: null },
    ],
    emergencyContactPerson: [
        {
            emergencyContactPersonName: null,
            emergencyContactPersonRelationship: null,
            emergencyContactPersonPhoneNumber: null,
        },
    ],
    employeeTitle: [
        {
            title: { titleId: null },
        },
    ],
    employeeWorkExperience: [
        {
            companyName: null,
            employmentDate: null,
            resignationDate: null,
            salaryKind: null,
            salaryAmount: null,
        },
    ],
});

const empDept = reactive({
    department: { departmentId: null },
    departmentEffectiveDate: null,
});

const empTitle = reactive({
    title: { titleId: null },
});

const empEQ = reactive({
    schoolName: null,
    schoolDepartment: null,
    dateOfLeavingSchool: null,
});

const empECP = reactive({
    emergencyContactPersonName: null,
    emergencyContactPersonRelationship: null,
    emergencyContactPersonPhoneNumber: null,
});

onMounted(() => {
    view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    getdept();
    getTitle();
});

onUpdated(() => {
    empDept.departmentEffectiveDate = employeeInfo.employeeArrivalDate;
});

const postEmpData = function () {
    employeeInfo.employeeAccount = employeeInfo.employeeIdNumber + 123;
    employeeInfo.employeePassword = employeeInfo.employeeIdNumber + 456;
    httpClient
        .post("/employee/add", employeeInfo)
        .then(function (res) {
            console.log("res: " + res);
            router.push("/emp/hrms/emp_list");
        })
        .catch(function (err) {
            console.log("err: " + err);
        });
};

const fill = function () {
    employeeInfo.employeeAccount = employeeInfo.employeeIdNumber + 123;
    employeeInfo.employeePassword = employeeInfo.employeeIdNumber + 456;
    employeeInfo.employeeName = "威志";
    employeeInfo.employeeGender = "男";
    employeeInfo.employeeBirth = "2000-12-02";
    employeeInfo.employeeIdNumber = "A123456789";
    employeeInfo.employeePhoneNumber = "0987654321";
    employeeInfo.employeeContactNumber = "0987654321";
    employeeInfo.employeeEmail = "test@gamil.com";
    employeeInfo.employeeResidenceAddress = "無居住地";
    employeeInfo.employeeContactAddress = "無居住地";
    employeeInfo.employeeArrivalDate = "2023-12-02";
    employeeInfo.employeeSalaryKind = "月薪";
    employeeInfo.employeeBasicSalary = 40000;
    employeeInfo.employeeEducationalQualifications.shift();
    empEQ.schoolName = "威志大學";
    empEQ.schoolDepartment = "威志系";
    empEQ.dateOfLeavingSchool = "2023-12-02";
    employeeInfo.employeeEducationalQualifications.push(empEQ);
    employeeInfo.emergencyContactPerson.shift();
    empECP.emergencyContactPersonName = "無名氏";
    empECP.emergencyContactPersonRelationship = "寵物";
    empECP.emergencyContactPersonPhoneNumber = "0987654321";
    employeeInfo.emergencyContactPerson.push(empECP);
    // employeeInfo.employeeHistoricalDepartment.push("部門一");
    // deptName.value = "部門一";

    console.log(employeeInfo);
};

function fileSelected(e) {
    const file = e.target.files.item(0);
    const reader = new FileReader();
    reader.addEventListener("load", imageLoaded);
    reader.readAsDataURL(file);
}

function imageLoaded(e) {
    employeeInfo.employeePhoto = e.target.result;
    a.value = 1;
}

function rechoose() {
    employeeInfo.employeePhoto = null;
    a.value = 0;
}

const getdept = function () {
    httpClient
        .get(`/department/all`)
        .then((res) => {
            // console.log(res.data);
            depts.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

const getTitle = function () {
    httpClient
        .get(`/title/all`)
        .then((res) => {
            // console.log(res.data);
            titles.value = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

//當選擇部門，由deptName搜尋該部門的其他屬性並加入到employeeInfo.employeeHistoricalDepartment
function addDaprtment() {
    httpClient
        .get(`/department/${deptName.value}`)
        .then((res) => {
            empDept.department.departmentId = res.data.id;
            employeeInfo.employeeHistoricalDepartment = [];
            employeeInfo.employeeHistoricalDepartment.push(empDept);
        })
        .catch((err) => {
            console.log(err);
        });
}
function addTitle() {
    httpClient
        .get(`/title/${titleName.value}`)
        .then((res) => {
            empTitle.title.titleId = res.data.titleId;
            employeeInfo.employeeTitle = [];
            employeeInfo.employeeTitle.push(empTitle);
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>

<template>
    <div class="container">
        <div>
            <div class="row justify-content-center">
                <div class="col-4">
                    姓名
                    <input class="form-control" type="text" v-model="employeeInfo.employeeName" />
                </div>
                <div class="col-4"></div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    性別
                    <input type="text" class="form-control" v-model="employeeInfo.employeeGender" />
                </div>
                <div class="col-4">
                    西元生日
                    <input type="date" class="form-control" v-model="employeeInfo.employeeBirth" />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    身分證字號
                    <input type="text" class="form-control" v-model="employeeInfo.employeeIdNumber" />
                </div>
                <div class="col-4">
                    手機
                    <input type="text" class="form-control" v-model="employeeInfo.employeePhoneNumber" />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    聯絡電話
                    <input type="text" class="form-control" v-model="employeeInfo.employeeContactNumber" />
                </div>
                <div class="col-4">
                    信箱
                    <input type="text" class="form-control" v-model="employeeInfo.employeeEmail" />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    戶籍地址
                    <input type="text" class="form-control" v-model="employeeInfo.employeeResidenceAddress" />
                </div>
                <div class="col-4">
                    聯絡地址
                    <input type="text" class="form-control" v-model="employeeInfo.employeeContactAddress" />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    到職日
                    <input type="date" class="form-control" v-model="employeeInfo.employeeArrivalDate" />
                </div>
                <div class="col-4">
                    薪水
                    <select class="form-select" v-model="employeeInfo.employeeSalaryKind">
                        <option>時薪</option>
                        <option>日薪</option>
                        <option>月薪</option>
                        <option>年薪</option>
                    </select>
                    <br />
                    <input type="text" class="form-control" v-model="employeeInfo.employeeBasicSalary" />
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    任職部門
                    <select class="form-select" v-model="deptName" @change="addDaprtment">
                        <option v-for="(dept, index) in depts">
                            {{ dept.name }}
                        </option>
                    </select>
                </div>
                <div class="col-4">
                    職稱
                    <select class="form-select" v-model="titleName" @change="addTitle">
                        <option v-for="(title, index) in titles">
                            {{ title.titleName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-5">
                    <table>
                        <th>學歷</th>
                        <tr>
                            <td>
                                學校
                                <input type="text" class="form-control"
                                    v-model="employeeInfo.employeeEducationalQualifications[0].schoolName" />
                            </td>

                            <td>
                                科系
                                <input type="text" class="form-control" v-model="employeeInfo.employeeEducationalQualifications[0].schoolDepartment
                                    " />
                            </td>

                            <td>
                                離校時間
                                <input type="date" class="form-control" v-model="employeeInfo.employeeEducationalQualifications[0].dateOfLeavingSchool
                                    " />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-3"></div>
            </div>
            <div class="row justify-content-center">
                <div class="col-5">
                    <table>
                        <th>緊急聯絡人</th>
                        <tr>
                            <td>姓名</td>
                            <td>關係</td>
                            <td>聯絡電話</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" class="form-control" v-model="employeeInfo.emergencyContactPerson[0].emergencyContactPersonName
                                    " />
                            </td>
                            <td>
                                <input type="text" class="form-control" v-model="employeeInfo.emergencyContactPerson[0]
                                        .emergencyContactPersonRelationship
                                    " />
                            </td>
                            <td>
                                <input type="text" class="form-control" v-model="employeeInfo.emergencyContactPerson[0]
                                        .emergencyContactPersonPhoneNumber
                                    " />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-3"></div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    照片
                    <div id="box" v-if="a == 0">
                        <div id="add" v-if="a == 0">+</div>
                        <input type="file" @change="fileSelected" id="theFile" v-if="a == 0" />
                    </div>
                    <br v-if="a != 0" />
                    <img v-if="employeeInfo.employeePhoto" :src="employeeInfo.employeePhoto" width="150" />
                    <br v-if="a != 0" />
                    <br />
                    <button class="btn btn-outline-warning" @click="rechoose" v-if="a != 0">
                        重新選擇照片
                    </button>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4">
                    <button class="btn btn-outline-primary" @click="postEmpData">送出</button>
                </div>
                <div class="col-4">
                    <button class="btn btn-outline-success" @click="fill">一件填寫</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#box {
    border: 5px dashed #ccc;
    width: 150px;
    height: 150px;
    text-align: center;
    position: relative;
}

#add {
    font: bold 100px Tahoma;
    color: #ccc;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#theFile {
    width: 150px;
    height: 150px;
    opacity: 0;
    cursor: pointer;
}

div {
    margin: 20px;
}

td {
    margin: 20px;
}
</style>
