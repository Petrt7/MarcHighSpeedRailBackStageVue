<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { watch } from "vue";

const path = useRoute().path;
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success" id="backNavBar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/emp/index">
        <!-- <router-link to="/emp/index"> Taiwan High SpeedRail</router-link> -->
        Taiwan High SpeedRail
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mynavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="shoppingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >班次管理系統</a
            >
            <ul class="dropdown-menu" aria-labelledby="shoppingDropdown">
              <li>
                <button class="dropdown-item">
                  <router-link
                    to="/schedule/train"
                    id="fontcolor"
                    class="nav-link"
                    >高鐵列車</router-link
                  >
                </button>
              </li>
              <li>
                <button class="dropdown-item">
                  <router-link
                    to="/schedule/ticketDiscount"
                    class="nav-link"
                    id="fontcolor"
                    >車票優惠</router-link
                  >
                </button>
              </li>
              <li>
                <button class="dropdown-item">
                  <router-link
                    to="/schedule/railRoute"
                    class="nav-link"
                    id="fontcolor"
                    >高鐵路線</router-link
                  >
                </button>
              </li>
              <li>
                <button class="dropdown-item">
                  <router-link
                    to="/schedule/scheduleTemplate"
                    class="nav-link"
                    id="fontcolor"
                    >班次模板</router-link
                  >
                </button>
              </li>
              <li>
                <button class="dropdown-item">
                  <router-link
                    to="/schedule/searchSchedule"
                    class="nav-link"
                    id="fontcolor"
                    >班次搜尋</router-link
                  >
                </button>
              </li>
              <li>
                <button class="dropdown-item">
                  <router-link to="/ticket/sluicegate" class="nav-link" id="fontcolor">虛擬驗票閘門</router-link >
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="shoppingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >遺失物管理系統</a
            >
            <ul class="dropdown-menu" aria-labelledby="shoppingDropdown">
              <li>
                <button class="dropdown-item">
                  <router-link
                    to="/lostParadise/lostAdd"
                    id="fontcolor"
                    class="nav-link"
                    >新增遺失物</router-link
                  >
                </button>
                <button class="dropdown-item">
                  <router-link
                    to="/lostParadise/lostAll"
                    id="fontcolor"
                    class="nav-link"
                    >遺失物列表</router-link
                  >
                </button>
                <button class="dropdown-item">
                  <router-link
                    to="/lostParadise/lostSearch"
                    id="fontcolor"
                    class="nav-link"
                    >遺失物搜尋</router-link
                  >
                </button>
                <button class="dropdown-item">
                  <router-link
                    to="/lostParadise/lostRecord"
                    id="fontcolor"
                    class="nav-link"
                    >領取紀錄</router-link
                  >
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
        </ul>
      </div> -->
    </div>
  </nav>
  <section class="main-container">
    <router-view></router-view>
  </section>
</template>
<style>
#app {
  padding: 0;
  margin: 0;
}
div {
  margin: 0;
}
.dropdown-menu {
  background-color: #198754;
  --bs-dropdown-link-hover-bg: #1cc91c;
}
#backNavBar {
  /* border: 3px solid orange; */
  width: 100%;
  margin-bottom: 20px;
}
</style>