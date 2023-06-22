<template>
  <header>
    <div class="header">
      <router-link class="header__item" to="/">Интернет магазин</router-link>
      <router-link class="header__item" to="/corp" @click="activeRoute = '/corp'"
        >Корпоративный сайт</router-link
      >
      <router-link class="header__item" to="/land">Лэндинг</router-link>
      <router-link class="header__item" to="/ind">Индивидальный проект</router-link>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  width: 80%;
  height: 50px;
  margin: auto;

  display: flex;
  justify-content: space-around;
  align-items: center;

  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}

.header__item {
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

.header__item:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
