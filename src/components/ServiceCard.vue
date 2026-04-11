<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  iconSvg: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="service-card">
    <div class="service-icon">
      <div v-if="iconSvg" v-html="iconSvg" class="icon-svg"></div>
      <span v-else class="icon-text">{{ icon }}</span>
    </div>
    <div class="service-content">
      <h3 class="service-title">{{ title }}</h3>
      <p v-if="description" class="service-description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
  transition: all var(--transition-normal);
  cursor: default;
}

.service-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.service-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--primary-bg);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.icon-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.icon-svg {
  width: 24px;
  height: 24px;
}

.icon-svg :deep(svg) {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

.service-content {
  flex: 1;
  min-width: 0;
}

.service-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 var(--spacing-xs);
  color: var(--text-primary);
}

.service-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .service-card {
    padding: var(--spacing-md);
  }

  .service-icon {
    width: 40px;
    height: 40px;
  }

  .icon-text {
    font-size: 1.25rem;
  }

  .service-title {
    font-size: 0.9rem;
  }

  .service-description {
    font-size: 0.8rem;
  }
}
</style>
