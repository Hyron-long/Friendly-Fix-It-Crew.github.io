<script setup>
import { RouterLink } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'

const services = [
  { icon: '🧹', title: '清灰、换硅脂', description: '清理电脑内部灰尘，更换CPU散热硅脂' },
  { icon: '💾', title: 'C盘/硬盘/内存清理', description: '清理系统垃圾，释放存储空间' },
  { icon: '🚫', title: '流氓软件清理', description: '卸载恶意软件，优化系统环境' },
  { icon: '📢', title: '广告弹窗清理', description: '清除广告插件，净化浏览体验' },
  { icon: '💿', title: '重装系统', description: '系统重装与基础配置' },
  { icon: '📝', title: '安装和激活Office', description: 'Office软件安装与激活' },
  { icon: '🖨️', title: '安装打印机驱动', description: '打印机驱动程序安装配置' },
  { icon: '🔧', title: '添加或更换配件', description: '硬件配件加装或更换服务' },
  { icon: '✨', title: '其他未提及的服务', description: '其他电脑相关维修服务' }
]
</script>

<template>
  <div class="home">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">义务维修队</h1>
          <p class="hero-subtitle">计算机与计算科学学院</p>
            每周都有专业维修团队为您服务
          <div class="hero-actions">
            <RouterLink to="/booking" class="btn btn-primary">
              立即预约
            </RouterLink>
            <RouterLink to="/services" class="btn btn-secondary">
              查看服务
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务信息 -->
    <section class="info-section">
      <div class="container">
        <h2 class="section-title">服务信息</h2>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">🕐</div>
            <h3 class="info-title">服务时间</h3>
            <p class="info-text">每周日 15:00-18:00</p>
          </div>
          <div class="info-card">
            <div class="info-icon">📍</div>
            <h3 class="info-title">服务地点</h3>
            <p class="info-text">教三101</p>
          </div>
          <div class="info-card">
            <div class="info-icon">💰</div>
            <h3 class="info-title">服务费用</h3>
            <p class="info-text">完全免费</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务项目预览 -->
    <section class="services-preview">
      <div class="container">
        <h2 class="section-title">服务项目</h2>
        <p class="section-subtitle">我们提供全方位的电脑维修服务</p>
        <div class="services-grid">
          <ServiceCard
            v-for="service in services.slice(0, 6)"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
          />
        </div>
        <div class="view-all">
          <RouterLink to="/services" class="btn btn-outline">
            查看全部服务
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
}

/* Hero 区域 */
.hero {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--text-white);
  padding: var(--spacing-2xl) var(--spacing-lg);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--text-white);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: var(--spacing-lg);
  opacity: 0.9;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-xl);
}

.badge-text {
  font-size: 1rem;
  font-weight: 500;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: var(--spacing-2xl);
  opacity: 0.95;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* 按钮样式 */
.btn {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.btn-primary {
  background: var(--text-white);
  color: var(--primary);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--text-white);
  border: 2px solid var(--text-white);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary);
  color: var(--text-white);
  transform: translateY(-2px);
}

/* 信息区域 */
.info-section {
  padding: var(--spacing-2xl) var(--spacing-lg);
  background: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  font-size: 1.05rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xl);
}

.info-card {
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  border: 1px solid var(--border-light);
  transition: all var(--transition-normal);
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.info-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
}

.info-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.info-text {
  color: var(--text-secondary);
  font-size: 1rem;
}

/* 服务项目预览 */
.services-preview {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.view-all {
  text-align: center;
  margin-top: var(--spacing-2xl);
}

/* 响应式 */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
}
</style>
