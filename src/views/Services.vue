<script setup>
import { RouterLink } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'

const services = [
  {
    icon: '🧹',
    title: '清灰、换硅脂',
    description: '清理电脑内部灰尘，更换CPU散热硅脂，提升散热效果，降低运行温度'
  },
  {
    icon: '💾',
    title: 'C盘/硬盘/内存清理',
    description: '深度清理系统垃圾文件，优化磁盘空间，释放存储空间，提升运行速度'
  },
  {
    icon: '🚫',
    title: '流氓软件清理',
    description: '检测并卸载各类流氓软件、捆绑软件，清理恶意插件，优化系统环境'
  },
  {
    icon: '📢',
    title: '广告弹窗清理',
    description: '清除浏览器广告插件，阻止恶意弹窗，净化浏览体验，提升上网效率'
  },
  {
    icon: '💿',
    title: '重装系统',
    description: 'Windows系统重装服务，包含系统安装、驱动配置、基础软件安装'
  },
  {
    icon: '📝',
    title: '安装和激活Office',
    description: 'Microsoft Office套件安装与激活，Word、Excel、PowerPoint等办公软件配置'
  },
  {
    icon: '🖨️',
    title: '安装打印机驱动',
    description: '打印机驱动程序安装与配置，网络连接打印机设置，打印功能测试'
  },
  {
    icon: '🔧',
    title: '添加或更换配件',
    description: '内存条加装、硬盘更换、SSD升级等硬件配件加装或更换服务'
  },
  {
    icon: '✨',
    title: '其他未提及的服务',
    description: '其他电脑相关维修服务，如有特殊需求请联系我们'
  }
]
</script>

<template>
  <div class="services-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">服务项目</h1>
        <p class="page-subtitle">我们提供全方位的电脑维修服务，所有服务完全免费</p>
      </div>
    </section>

    <section class="services-list">
      <div class="container">
        <div class="services-grid">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            :icon="service.icon"
            :title="service.title"
            :description="service.description"
          />
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2 class="cta-title">需要我们的帮助？</h2>
        <p class="cta-text">立即预约，我们的维修团队将为您提供专业服务</p>
        <RouterLink to="/booking" class="btn btn-primary">
          立即预约
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.services-page {
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--text-white);
  padding: var(--spacing-2xl) var(--spacing-lg);
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: var(--text-white);
}

.page-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.services-list {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.cta-section {
  background: var(--bg-secondary);
  padding: var(--spacing-2xl) var(--spacing-lg);
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.cta-text {
  font-size: 1.05rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

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
  background: var(--primary);
  color: var(--text-white);
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
