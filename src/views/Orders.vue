<script setup>
import { computed, onMounted } from 'vue'
import { useOrderStore } from '../stores/orders'

const orderStore = useOrderStore()

const orders = computed(() => orderStore.orders)

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
  <div class="orders-page">
    <section class="page-header">
      <div class="container">
        <h1 class="page-title">我的工单</h1>
        <p class="page-subtitle">查看您的维修预约记录</p>
      </div>
    </section>

    <section class="orders-content">
      <div class="container">
        <div v-if="orders.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h2 class="empty-title">暂无工单</h2>
          <p class="empty-text">您还没有预约过维修服务</p>
          <RouterLink to="/booking" class="btn btn-primary">
            立即预约
          </RouterLink>
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
                <span class="info-label">联系电话：</span>
                <span class="info-value">{{ order.phone }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">宿舍位置：</span>
                <span class="info-value">{{ order.building }} {{ order.room }}室</span>
              </div>
              <div class="info-row">
                <span class="info-label">预约时间：</span>
                <span class="info-value">{{ order.preferredTime }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">故障描述：</span>
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
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.orders-page {
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

.orders-content {
  padding: var(--spacing-2xl) var(--spacing-lg);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.empty-text {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  font-size: 1.05rem;
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

.orders-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.order-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
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
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
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
  gap: var(--spacing-md);
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
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

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .order-info {
    grid-template-columns: 1fr;
  }
}
</style>
