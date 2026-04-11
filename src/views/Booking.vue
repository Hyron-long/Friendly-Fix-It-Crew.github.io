<script setup>
import { computed, onMounted } from 'vue'
import { useOrderStore } from '../stores/orders'
import OrderForm from '../components/OrderForm.vue'

const orderStore = useOrderStore()
const orders = computed(() => orderStore.orders)

// 预约通知配置 - 方便统一修改
const bookingNotice = {
  title: '📋 预约须知',
  items: [
    '请如实填写个人信息和需求服务，以便我们更好地为您服务',
    '请您携带您设备的电源/充电器',
    '若您需更换硅脂、导热膏等耗材，请提前自备',
    '若您需要加装、更换硬盘、内存条等硬件，请提前自备',
    '我们不接受导热介质为“液金”的设备更换导热介质的需求',
    '请尽早前往维修地点，维修编号仅供管理，具体维修顺序以现场到达顺序和维修队员指定为准',
    '所有服务完全免费，无需任何费用'
  ]
}

const statusMap = {
  pending: { label: '待处理', class: 'status-pending' },
  processing: { label: '处理中', class: 'status-processing' },
  completed: { label: '已完成', class: 'status-completed' }
}

const getStatusInfo = (status) => {
  return statusMap[status] || { label: '未知', class: '' }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  orderStore.getOrders()
})
</script>

<template>
  <div class="booking-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">在线预约</h1>
        <p class="page-subtitle">填写以下信息，我们会尽快为您安排维修服务</p>
      </div>
    </section>

    <section class="booking-content">
      <div class="container">
        <div class="booking-notice">
          <h3 class="notice-title">{{ bookingNotice.title }}</h3>
          <ul class="notice-list">
            <li v-for="(item, index) in bookingNotice.items" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="form-section">
          <h2 class="form-title">填写预约信息</h2>
          <OrderForm />
        </div>

        <!-- 分隔线 -->
        <div class="section-divider">
          <span class="divider-text">我的工单</span>
        </div>

        <!-- 我的工单区域 -->
        <div class="orders-section">
          <div v-if="orders.length === 0" class="empty-orders">
            <p class="empty-text">您还没有预约过维修服务</p>
          </div>
          <div v-else class="orders-list">
            <div
              v-for="order in orders"
              :key="order.id"
              class="order-card"
            >
              <div class="order-header">
                <div class="order-id">
                  <span class="order-label">工单号：</span>
                  <span class="order-number">{{ order.id }}</span>
                </div>
                <div class="order-status" :class="getStatusInfo(order.status).class">
                  {{ getStatusInfo(order.status).label }}
                </div>
              </div>

              <div class="order-info">
                <div class="info-row">
                  <span class="info-label">预约人：</span>
                  <span class="info-value">{{ order.name }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">学号/工号：</span>
                  <span class="info-value">{{ order.studentId }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">联系电话：</span>
                  <span class="info-value">{{ order.phone }}</span>
                </div>
                <div class="info-row full-width">
                  <span class="info-label">需求服务：</span>
                  <div class="service-tags">
                    <span v-for="(service, index) in order.services" :key="index" class="service-tag">
                      {{ service }}
                    </span>
                  </div>
                </div>
                <div v-if="order.otherServiceDescription" class="info-row full-width">
                  <span class="info-label">其他需求说明：</span>
                  <span class="info-value">{{ order.otherServiceDescription }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">维修点：</span>
                  <span class="info-value">{{ order.repairLocation }}</span>
                </div>
                <div v-if="order.description" class="info-row full-width">
                  <span class="info-label">补充说明：</span>
                  <span class="info-value">{{ order.description }}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">提交时间：</span>
                  <span class="info-value">{{ formatDate(order.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.booking-page {
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

.booking-content {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.booking-notice {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.notice-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: #856404;
}

.notice-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.notice-list li {
  padding: var(--spacing-sm) 0;
  color: #856404;
  line-height: 1.6;
  position: relative;
  padding-left: var(--spacing-lg);
}

.notice-list li::before {
  content: '•';
  position: absolute;
  left: var(--spacing-sm);
  color: #ffc107;
  font-weight: bold;
}

.section-divider {
  display: flex;
  align-items: center;
  margin: var(--spacing-2xl) 0;
}

.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-light);
}

.divider-text {
  padding: 0 var(--spacing-lg);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.orders-section {
  margin-bottom: var(--spacing-2xl);
}

.empty-orders {
  text-align: center;
  padding: var(--spacing-xl);
}

.empty-text {
  color: var(--text-secondary);
  font-size: 1rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.order-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  transition: all var(--transition-normal);
}

.order-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--primary);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-light);
}

.order-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.order-number {
  font-family: var(--font-mono);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.order-status {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-processing {
  background: #cce5ff;
  color: #004085;
}

.status-completed {
  background: #d4edda;
  color: #155724;
}

.order-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.info-row.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.info-value {
  color: var(--text-primary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.service-tag {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--primary-bg);
  color: var(--primary);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  line-height: 1.4;
}

.form-section {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
  text-align: center;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .booking-notice {
    padding: var(--spacing-md);
  }
}
</style>
