<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">

        <div class="footer-section">
          <h3 class="footer-title">快速链接</h3>
          <div class="footer-links">
            <RouterLink to="/services" class="footer-link">服务项目</RouterLink>
            <RouterLink to="/booking" class="footer-link">在线预约</RouterLink>
            <RouterLink to="/about" class="footer-link">关于我们</RouterLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} 义务维修队 | 浙大城市学院 计算机与计算科学学院
        </p>
        
        
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--text-primary);
  color: var(--text-white);
  padding: calc(var(--spacing-xl) * 0.7) 0 calc(var(--spacing-md) * 0.7);
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(var(--spacing-lg) * 0.7);
  margin-bottom: calc(var(--spacing-lg) * 0.7);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-md) * 0.7);
}

.footer-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-white);
}

.footer-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.footer-links {
  display: flex;
  flex-direction: row;
  gap: calc(var(--spacing-lg) * 0.7);
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color var(--transition-fast);
  font-size: 0.9rem;
}

.footer-link:hover {
  color: var(--text-white);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: calc(var(--spacing-md) * 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: calc(var(--spacing-sm) * 0.7);
}

.copyright {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.slogan {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  margin: 0;
  font-style: italic;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
