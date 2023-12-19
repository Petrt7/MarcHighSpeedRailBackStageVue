<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-4"></div>
            <div class="col-4">
                <input type="file" @change="fileSelected" class="form-control" />
                <img v-if="data.emp.photo" :src="data.emp.photo" width="150" />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                ID<br /><input type="text" v-model="data.emp.id" class="form-control" />
            </div>
            <div class="col-4">
                姓名<br /><input type="text" v-model="data.emp.name" class="form-control" />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                性別<br /><input type="text" v-model="data.emp.gender" class="form-control" />
            </div>
            <div class="col-4">
                生日<br /><input type="text" v-model="data.emp.birth" class="form-control" />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                身分證字號<br /><input type="text" v-model="data.emp.idNumber" class="form-control" />
            </div>
            <div class="col-4">
                Email<br /><input type="text" v-model="data.emp.email" class="form-control" />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                手機<br /><input type="text" v-model="data.emp.phoneNumber" class="form-control" />
            </div>
            <div class="col-4">
                聯絡電話<br /><input type="text" v-model="data.emp.contackNumber" class="form-control" />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                戶籍地址<br /><input type="text" v-model="data.emp.residenceAddress" class="form-control" />
            </div>
            <div class="col-4">
                聯絡地址<br /><input type="text" v-model="data.emp.contactAddress" class="form-control" />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                到職日<br /><input type="date" v-model="data.emp.arrivalDate" class="form-control" />
            </div>
            <div class="col-4">
                薪水<br />
                <select class="form-select" v-model="data.emp.salaryKind">
                    <option>時薪</option>
                    <option>日薪</option>
                    <option>月薪</option>
                    <option>年薪</option>
                </select>
                <input type="text" v-model="data.emp.basicSalary" class="form-control" />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-4">
                <table>
                    <th>部門名稱</th>
                    <th>生效日期</th>
                    <tr v-for="(hDept, index) in data.emp.historicalDepartment">
                        <!-- <td>{{ hDept.department.departmentName }}</td> -->
                        <td>
                            <select class="form-select" v-model="deptName" @change="addDaprtment">
                                <option v-for="(dept, index) in depts">
                                    {{ dept.name }}
                                </option>
                            </select>
                        </td>
                        <!-- <input type="date" v-model="data.emp.historicalDepartment[0].departmentEffectiveDate" /> -->
                        <td>
                            <input type="date" v-model="hDept.departmentEffectiveDate" class="form-control" />
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-4">
                <table>
                    <th>職稱</th>
                    <tr>
                        <td>
                            <select class="form-select" v-model="titleName" @change="addTitle">
                                <option v-for="(title, index) in titles">
                                    {{ title.titleName }}
                                </option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-5">
                <table>
                    <th>學歷</th>
                    <tr>
                        <td>學校名稱</td>
                        <td>科系</td>
                        <td>離校日</td>
                    </tr>
                    <tr v-for="(educ, index) in data.emp.educationalQualifications">
                        <td><input type="text" v-model="educ.schoolName" class="form-control" /></td>
                        <td>
                            <input type="text" v-model="educ.schoolDepartment" class="form-control" />
                        </td>
                        <td>
                            <input type="text" v-model="educ.dateOfLeavingSchool" class="form-control" />
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
                    <tr v-for="(ecp, index) in data.emp.emergencyContactPerson">
                        <td>
                            <input type="text" v-model="ecp.emergencyContactPersonName" class="form-control" />
                        </td>
                        <td>
                            <input type="text" v-model="ecp.emergencyContactPersonRelationship" class="form-control" />
                        </td>
                        <td>
                            <input type="text" v-model="ecp.emergencyContactPersonPhoneNumber" class="form-control" />
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-3"></div>
        </div>
        <button @click="updateEmployeeDetail" class="btn btn-outline-primary">
            確認修改
        </button>

        {{ msg }}
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import router from "../../router";
import { useRoute, useRouter } from "vue-router";
import { view } from "@/audit";
import httpClient from "@/main";
const route = useRoute();

console.log(route.query.id);

const depts = ref([]);
const deptName = ref("");

const titles = ref([]);
const titleName = ref("");

const msg = ref("");

const data = reactive({
    emp: "",
});

//站存dept資料之後可以push進去真正的資料的array裡面
const empDept = reactive({
    department: { departmentId: null },
    departmentEffectiveDate: null,
});

//站存title資料之後可以push進去真正的資料的array裡面
const empTitle = reactive({
    title: { titleId: null },
});

onMounted(() => {
    view(useRoute().path).then((res) => {
        if (res === false) {
            router.push("/error");
        }
    });
    getemp();
    getdept();
    getTitle();
});

const getemp = function () {
    httpClient
        .get(`/employee/detail/${route.query.id}`)
        .then((res) => {
            console.log(res.data);
            data.emp = res.data;
            //fotmat時間格式從ISOString到<input type="date">可以接受的格式
            data.emp.arrivalDate = data.emp.arrivalDate.split("T")[0];
            deptName.value = data.emp.historicalDepartment[0].department.departmentName;
            titleName.value = data.emp.empTitle[0].title.titleName;
        })
        .catch((err) => {
            console.log(err);
        });
};

//找到所有部門
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

//找到所有職稱
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

// function testPush() {
//     data.emp.historicalDepartment.push("部門");
// }

function updateEmployeeDetail() {
    // console.log(data.emp);
    // data.emp.employeeHistoricalDepartment.push(empDept);
    httpClient
        .put("/employee/detail", data.emp)
        .then((res) => {
            console.log(res.data);
            msg.value = "更新成功";
            // getemp();
            setTimeout(() => {
                router.push("/emp/hrms/emp_list");
            }, "2000");
        })
        .catch((err) => {
            console.log(err);
        });
}

//取得圖片
function fileSelected(e) {
    const file = e.target.files.item(0);
    const reader = new FileReader();
    reader.addEventListener("load", imageLoaded);
    reader.readAsDataURL(file);
}

//
function imageLoaded(e) {
    data.emp.photo = e.target.result;
    // console.log(image.value);
}

// function testPhoto() {
//     console.log(data.emp.photo);
// }

// 當選擇部門，由deptName搜尋該部門的其他屬性並加入到data.emp.employeeHistoricalDepartment
function addDaprtment() {
    httpClient
        .get(`/department/${deptName.value}`)
        .then((res) => {
            empDept.department.departmentId = res.data.id;
            empDept.departmentEffectiveDate =
                data.emp.historicalDepartment[0].departmentEffectiveDate;
            data.emp.employeeHistoricalDepartment = [];
            if (empDept.departmentEffectiveDate !== null) {
                data.emp.employeeHistoricalDepartment.push(empDept);
            }
            console.log(data.emp);
        })
        .catch((err) => {
            console.log(err);
        });
}

// 當選擇部門，由titleName搜尋該職稱的其他屬性並加入到data.emp.empTitle
function addTitle() {
    data.emp.empTitle = [];
    httpClient
        .get(`/title/${titleName.value}`)
        .then((res) => {
            empTitle.title.titleId = res.data.titleId;
            empTitle.title.titleName = res.data.titleName;

            data.emp.empTitle = [];
            data.emp.empTitle.push(empTitle);
        })
        .catch((err) => {
            console.log(err);
        });
}
</script>
