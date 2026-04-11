<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <RouterLink to="/" class="logo" @click="closeMenu">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        <div class="logo-text">
          <h1 class="logo-title">义务维修队</h1>
          <p class="logo-subtitle">计算机与计算科学学院</p>
        </div>
      </RouterLink>

      <button class="menu-toggle" @click="toggleMenu" aria-label="菜单">
        <span class="menu-icon" :class="{ open: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <nav class="nav" :class="{ active: isMenuOpen }">
        <RouterLink to="/" class="nav-link" :class="{ active: isActive('/') }" @click="closeMenu">
          首页
        </RouterLink>
        <RouterLink to="/services" class="nav-link" :class="{ active: isActive('/services') }" @click="closeMenu">
          服务项目
        </RouterLink>
        <RouterLink to="/booking" class="nav-link" :class="{ active: isActive('/booking') }" @click="closeMenu">
          在线预约
        </RouterLink>
        <RouterLink to="/about" class="nav-link" :class="{ active: isActive('/about') }" @click="closeMenu">
          关于我们
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-decoration: none;
  color: var(--text-primary);
}

.logo:hover {
  color: var(--primary);
}

.logo-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: var(--text-white);
  border-radius: var(--radius-md);
}

.logo-icon svg {
  width: 24px;
  height: 24px;
}

.logo-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin: 0;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: transparent;
  border: none;
}

.menu-icon {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition-normal);
  border-radius: 2px;
}

.menu-icon.open span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.menu-icon.open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.open span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--primary);
  background: var(--primary-bg);
}

.nav-link.active {
  color: var(--primary);
  background: var(--primary-bg);
  font-weight: 600;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 73px;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    flex-direction: column;
    padding: var(--spacing-lg);
    gap: var(--spacing-sm);
    border-bottom: 1px solid var(--border-light);
    box-shadow: var(--shadow-md);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal);
  }

  .nav.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: var(--spacing-md);
  }
}
</style>
