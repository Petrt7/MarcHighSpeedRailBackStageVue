<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const path = useRoute().path;


</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="javascript:void(0)">Taiwan High Speed Rail</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
        </ul>
      </div>
    </div>
  </nav>
  <section>
    <router-view></router-view>
  </section>
</template>
