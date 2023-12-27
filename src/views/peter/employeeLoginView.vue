<script setup>
import { ref } from "vue";
import httpClient from "@/main";
import { useRouter } from "vue-router";

const account = ref("");
const psw = ref("");
const result = ref("");
const loginUser = ref("");

const router = useRouter();

function postUserInput() {
  httpClient
    .post("/employee/login", null, {
      params: {
        empAccount: account.value,
        psw: psw.value,
      },
    })
    .then(function (response) {
      result.value = response.data;
      clearInput();
      httpClient
        .get("/employee/dto")
        .then(function (res) {
          console.log("res: " + res);
          loginUser.value = res.data.empName;
          router.push("/emp/index");
        })
        .catch(function (err) {
          console.log("err: " + err);
        });
      httpClient
        .get("/employee/dto")
        .then(function (res) {
          console.log("res: " + res);
          loginUser.value = res.data.empName;
          router.push("/emp/index");
        })
        .catch(function (err) {
          console.log("err: " + err);
        });
    })
    .catch(function (err) {
      result.value = err.response.data;
      clearInput();
    });
}

function clearInput() {
  account.value = "";
  psw.value = "";
}

function admin() {
  account.value = "admin";
  psw.value = "6782";
}

function personnel() {
  account.value = "A123456788123";
  psw.value = "A123456788456";
}

function employee() {
  account.value = "A123456789123";
  psw.value = "A123456789456";
}
</script>

<template>
  <div class="row justify-content-center" style="margin: 10% auto">
    <div class="col-10 col-md-5">
      <div class="card">
        <div class="card-header text-bg-success mb-2">員工登入</div>
        <div class="card-body">
          <div id="user-input">
            <div class="input-group">
              <label for="staticEmail" class="col-sm-4 col-form-label">帳號</label>
              <input class="form-control" name="account" v-model.trim="account" />
            </div>
            <br />
            <div class="input-group">
              <label for="staticEmail" class="col-sm-4 col-form-label">密碼</label>
              <input class="form-control" name="password" v-model.trim="psw" type="password" />
            </div>
            <br />
            <button @click="postUserInput" class="btn btn-success mb-2">登入</button>
          </div>
        </div>
      </div>

      <button @click="admin" class="btn btn-outline-primary">管理員</button>
      <button @click="personnel" class="btn btn-outline-primary">人事</button>
      <button @click="employee" class="btn btn-outline-primary">一般員工</button>

      <div id="result" style="color: red">{{ result }}</div>

      <div id="loginUser">{{ loginUser }}</div>
    </div>
  </div>
</template>
