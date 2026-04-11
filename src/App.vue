<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <main class="main-content">
    <router-view />
  </main>
  <Footer />
</template>

<style scoped>
.main-content {
  flex: 1;
  padding-bottom: var(--spacing-2xl);
}
</style>
