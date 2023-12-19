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

      <div id="result">{{ result }}</div>

      <div id="loginUser">{{ loginUser }}</div>
    </div>
  </div>
</template>
