<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="about-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">关于我们</h1>
        <p class="page-subtitle">了解义务维修队的故事</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-section">
          <h2 class="section-title">团队介绍</h2>
          <p class="section-text">
            义务维修队是由计算机与计算科学学院学生自发组织的技术服务团队，
            致力于为校内师生提供免费、专业、高效的电脑维修服务。
          </p>
          <p class="section-text">
            我们秉承"你总有风，轮到你楼"的服务理念，每周定期在弘毅楼办公室开展义务维修活动，
            帮助同学们解决各种电脑使用问题。
          </p>
        </div>

        <div class="about-section">
          <h2 class="section-title">我们的使命</h2>
          <div class="mission-cards">
            <div class="mission-card">
              <div class="mission-icon">🎯</div>
              <h3 class="mission-title">服务师生</h3>
              <p class="mission-text">
                为校内师生提供免费专业的电脑维修服务
              </p>
            </div>
            <div class="mission-card">
              <div class="mission-icon">💡</div>
              <h3 class="mission-title">技术交流</h3>
              <p class="mission-text">
                在实践中提升技术能力，分享维修经验
              </p>
            </div>
            <div class="mission-card">
              <div class="mission-icon">🤝</div>
              <h3 class="mission-title">互助奉献</h3>
              <p class="mission-text">
                发扬互助精神，用技术回馈校园
              </p>
            </div>
          </div>
        </div>

        <div class="about-section">
          <h2 class="section-title">服务内容</h2>
          <p class="section-text">
            我们提供全方位的电脑维修服务，包括但不限于：清灰换硅脂、系统重装、
            软件安装、病毒清理、硬件检测、打印机配置等。所有服务完全免费！
          </p>
          <RouterLink to="/services" class="btn btn-outline">
            查看完整服务项目
          </RouterLink>
        </div>

        <div class="about-section">
          <h2 class="section-title">服务时间</h2>
          <div class="schedule-card">
            <div class="schedule-item">
              <div class="schedule-icon">🕐</div>
              <div class="schedule-info">
                <h4 class="schedule-title">每周日</h4>
                <p class="schedule-time">15:00 - 18:00</p>
              </div>
            </div>
            <div class="schedule-location">
              <div class="schedule-icon">📍</div>
              <div class="schedule-info">
                <h4 class="schedule-title">服务地点</h4>
                <p class="schedule-address">弘毅楼办公室</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-section">
          <h2 class="section-title">联系方式</h2>
          <div class="contact-info">
            <p class="contact-text">
              如有任何问题或特殊需求，欢迎通过以下方式联系我们：
            </p>
            <ul class="contact-list">
              <li>
                <span class="contact-icon">📧</span>
                <span>邮箱：fix@hzcu.xin</span>
              </li>
              <li>
                <span class="contact-icon">🌐</span>
                <span>网站：fix.hzcu.xin</span>
              </li>
              <li>
                <span class="contact-icon">💬</span>
                <span>微信公众号：义务维修队</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
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

.about-content {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

.about-section {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  position: relative;
  padding-bottom: var(--spacing-sm);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--primary);
  border-radius: 2px;
}

.section-text {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
  font-size: 1.05rem;
}

.mission-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.mission-card {
  background: var(--bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
  border: 1px solid var(--border-light);
  transition: all var(--transition-normal);
}

.mission-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.mission-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.mission-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.mission-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.schedule-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.schedule-item,
.schedule-location {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.schedule-icon {
  font-size: 2rem;
}

.schedule-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.schedule-time,
.schedule-address {
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-weight: 500;
}

.contact-info {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.contact-text {
  margin-bottom: var(--spacing-md);
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  color: var(--text-secondary);
  font-size: 1rem;
}

.contact-icon {
  font-size: 1.25rem;
}

.cta-section {
  text-align: center;
  background: var(--bg-secondary);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
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
  margin-top: var(--spacing-lg);
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

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .mission-cards {
    grid-template-columns: 1fr;
  }

  .schedule-card {
    grid-template-columns: 1fr;
  }
}
</style>
