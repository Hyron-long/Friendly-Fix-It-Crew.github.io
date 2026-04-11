<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '../stores/orders'

const router = useRouter()
const orderStore = useOrderStore()

// 预约通知配置
const noticeConfig = {
  title: '⚠️ 注意事项',
  items: [
    '请您携带您设备的电源/充电器',
    '若您需更换硅脂、导热膏等耗材，请提前自备',
    '若您需要加装、更换硬盘、内存条等硬件，请提前自备',
    '我们不接受导热介质为"液金"的设备更换导热介质的需求',
    '请尽早前往维修地点，维修编号仅供管理，具体维修顺序以现场到达顺序和维修队员指定为准'
  ]
}

// 服务选项配置
const serviceOptions = [
  { id: 'other', label: '其他（我看不懂下面的选项 或 我的问题不在下面的选项里 或 自行填写需求）' },
  { id: 'clean_dust', label: '维护：清灰换硅脂（自备耗材）' },
  { id: 'disk_full', label: '维护：C盘（或其他硬盘）满了' },
  { id: 'clean_software', label: '维护：清理广告、垃圾、流氓软件' },
  { id: 'install_hardware', label: '安装：内存条、硬盘（自备硬件）' },
  { id: 'install_windows_soft', label: '安装：Windows安装软件：Office、aTrust（学校VPN）、PyCharm（JetBrains系列）、Adobe系列等' },
  { id: 'install_mac_soft', label: '安装：Mac安装软件：Office、aTrust（学校VPN）、PyCharm（JetBrains系列）等' },
  { id: 'install_os', label: '安装、重装：Windows系统、Linux系统' },
  { id: 'network_issue', label: '故障：连不上网' },
  { id: 'boot_issue', label: '故障：不开机、开机黑屏、开机蓝屏、开机卡死' },
  { id: 'gaming_issue', label: '故障：打游戏（或其他高负载）蓝屏、黑屏、花屏、卡死' },
  { id: 'water_damage', label: '故障：进水（或其他液体）' },
  { id: 'other_device', label: '其他设备：打印机或路由器服务' }
]

// 维修点选项
const repairLocationOptions = [
  { id: 'onsite_agreed', label: '我和维修人员已经现场协定' },
  { id: '2026_week6', label: '2026年4月12日（第6周） 教三101 15:00-18:00' }
]

const formData = reactive({
  name: '',
  studentId: '',
  phone: '',
  selectedServices: [],
  otherServiceDescription: '',
  repairLocation: '',
  description: ''
})

const errors = reactive({
  name: '',
  studentId: '',
  phone: '',
  selectedServices: '',
  repairLocation: '',
  description: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateField = (field) => {
  switch (field) {
    case 'name':
      errors.name = formData.name.trim() ? '' : '请输入姓名'
      break
    case 'studentId':
      errors.studentId = /^[0-9]{8,12}$/.test(formData.studentId.trim()) ? '' : '请输入8-12位数字的学号或工号'
      break
    case 'phone':
      errors.phone = /^1[3-9]\d{9}$/.test(formData.phone.trim()) ? '' : '请输入有效的手机号码'
      break
    case 'selectedServices':
      errors.selectedServices = formData.selectedServices.length > 0 ? '' : '请至少选择一项服务'
      break
    case 'repairLocation':
      errors.repairLocation = formData.repairLocation ? '' : '请选择维修点'
      break
    case 'description':
      // 如果选择了"其他"服务，需要填写描述
      if (formData.selectedServices.includes('other')) {
        errors.description = formData.otherServiceDescription.trim().length >= 5 ? '' : '请描述您的具体需求（至少5个字）'
      } else {
        errors.description = formData.description.trim().length >= 5 ? '' : '请补充说明故障情况（至少5个字）'
      }
      break
  }
}

const validateForm = () => {
  validateField('name')
  validateField('studentId')
  validateField('phone')
  validateField('selectedServices')
  validateField('repairLocation')
  validateField('description')

  return !Object.values(errors).some(error => error)
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // 获取选中的服务标签
    const serviceLabels = formData.selectedServices.map(id => {
      const option = serviceOptions.find(opt => opt.id === id)
      return option ? option.label : id
    })

    // 创建工单
    orderStore.createOrder({
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
      phone: formData.phone.trim(),
      services: serviceLabels,
      otherServiceDescription: formData.otherServiceDescription.trim(),
      repairLocation: formData.repairLocation,
      description: formData.description.trim(),
      status: 'pending'
    })

    // 显示成功提示
    showSuccess.value = true

    // 重置表单
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key] = []
      } else {
        formData[key] = ''
      }
    })

    // 3秒后跳转到工单页面
    setTimeout(() => {
      router.push('/booking')
    }, 3000)
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    isSubmitting.value = false
  }
}

// 切换服务选择
const toggleService = (serviceId) => {
  const index = formData.selectedServices.indexOf(serviceId)
  if (index > -1) {
    formData.selectedServices.splice(index, 1)
  } else {
    formData.selectedServices.push(serviceId)
  }
  validateField('selectedServices')
}
</script>

<template>
  <div class="order-form">
    <!-- 注意事项 -->
    <div class="notice-box">
      <h3 class="notice-title">{{ noticeConfig.title }}</h3>
      <ul class="notice-list">
        <li v-for="(item, index) in noticeConfig.items" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-grid">
        <!-- 姓名 -->
        <div class="form-group">
          <label class="form-label">
            姓名 <span class="required">*</span>
          </label>
          <input
            v-model="formData.name"
            type="text"
            class="form-input"
            :class="{ error: errors.name }"
            placeholder="请输入您的姓名"
            @blur="validateField('name')"
          />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>

        <!-- 学号或工号 -->
        <div class="form-group">
          <label class="form-label">
            学号或工号 <span class="required">*</span>
          </label>
          <input
            v-model="formData.studentId"
            type="text"
            class="form-input"
            :class="{ error: errors.studentId }"
            placeholder="请输入8-12位数字的学号或工号"
            maxlength="12"
            @blur="validateField('studentId')"
          />
          <span v-if="errors.studentId" class="error-message">{{ errors.studentId }}</span>
        </div>

        <!-- 联系电话 -->
        <div class="form-group">
          <label class="form-label">
            联系电话 <span class="required">*</span>
          </label>
          <input
            v-model="formData.phone"
            type="tel"
            class="form-input"
            :class="{ error: errors.phone }"
            placeholder="请输入手机号码"
            maxlength="11"
            @blur="validateField('phone')"
          />
          <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- 需求服务（多选） -->
      <div class="form-group full-width">
        <label class="form-label">
          需求服务（可多选） <span class="required">*</span>
          <span class="service-count">已选择 {{ formData.selectedServices.length }}/13 项</span>
        </label>
        <div class="service-options">
          <div
            v-for="option in serviceOptions"
            :key="option.id"
            class="service-option"
            :class="{ selected: formData.selectedServices.includes(option.id) }"
            @click="toggleService(option.id)"
          >
            <input
              type="checkbox"
              :checked="formData.selectedServices.includes(option.id)"
              :value="option.id"
              class="service-checkbox"
            />
            <span class="service-label">{{ option.label }}</span>
          </div>
        </div>
        <span v-if="errors.selectedServices" class="error-message">{{ errors.selectedServices }}</span>
      </div>

      <!-- 其他服务描述 -->
      <div v-if="formData.selectedServices.includes('other')" class="form-group full-width">
        <label class="form-label">
          请描述您的具体需求 <span class="required">*</span>
        </label>
        <textarea
          v-model="formData.otherServiceDescription"
          class="form-textarea"
          :class="{ error: errors.description && formData.selectedServices.includes('other') }"
          placeholder="请详细描述您的需求"
          rows="3"
          @blur="validateField('description')"
        ></textarea>
      </div>

      <!-- 维修点选择 -->
      <div class="form-group full-width">
        <label class="form-label">
          维修点 <span class="required">*</span>
        </label>
        <div class="radio-group">
          <div
            v-for="option in repairLocationOptions"
            :key="option.id"
            class="radio-option"
            :class="{ selected: formData.repairLocation === option.id }"
            @click="formData.repairLocation = option.id; validateField('repairLocation')"
          >
            <input
              type="radio"
              :checked="formData.repairLocation === option.id"
              :value="option.id"
              class="radio-input"
            />
            <span class="radio-label">{{ option.label }}</span>
          </div>
        </div>
        <span v-if="errors.repairLocation" class="error-message">{{ errors.repairLocation }}</span>
      </div>

      <!-- 补充说明 -->
      <div v-if="!formData.selectedServices.includes('other')" class="form-group full-width">
        <label class="form-label">
          补充说明（选填）
        </label>
        <textarea
          v-model="formData.description"
          class="form-textarea"
          placeholder="如有其他需要说明的情况，请在此填写"
          rows="4"
        ></textarea>
      </div>

      <div class="form-actions">
        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">提交预约</span>
          <span v-else>提交中...</span>
        </button>
      </div>
    </form>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="success-message">
      <div class="success-icon">✓</div>
      <h3>预约成功！</h3>
      <p>我们会尽快处理您的工单，请前往“我的工单”查看详情。</p>
      <p>3秒后自动跳转...</p>
    </div>
  </div>
</template>

<style scoped>
.order-form {
  max-width: 900px;
  margin: 0 auto;
}

/* 注意事项样式 */
.notice-box {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.notice-title {
  font-size: 1.1rem;
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
  padding: var(--spacing-xs) 0;
  color: #856404;
  line-height: 1.6;
  position: relative;
  padding-left: var(--spacing-lg);
  font-size: 0.9rem;
}

.notice-list li::before {
  content: '•';
  position: absolute;
  left: var(--spacing-sm);
  color: #ffc107;
  font-weight: bold;
}

.form {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.service-count {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: normal;
}

.required {
  color: #e74c3c;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  transition: all var(--transition-fast);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-bg);
}

.form-input.error,
.form-textarea.error {
  border-color: #e74c3c;
}

.form-input.error:focus,
.form-textarea.error:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: -4px;
}

/* 服务选项样式 */
.service-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.service-option {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--bg-primary);
}

.service-option:hover {
  border-color: var(--primary);
  background: var(--primary-bg);
}

.service-option.selected {
  border-color: var(--primary);
  background: var(--primary-bg);
}

.service-checkbox {
  margin-top: 2px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: var(--primary);
}

.service-label {
  flex: 1;
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.5;
  cursor: pointer;
}

/* 单选按钮组样式 */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  background: var(--bg-primary);
}

.radio-option:hover {
  border-color: var(--primary);
  background: var(--primary-bg);
}

.radio-option.selected {
  border-color: var(--primary);
  background: var(--primary-bg);
}

.radio-input {
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: var(--primary);
}

.radio-label {
  flex: 1;
  font-size: 0.9rem;
  color: var(--text-primary);
  cursor: pointer;
}

.form-actions {
  margin-top: var(--spacing-xl);
  display: flex;
  justify-content: center;
}

.submit-button {
  background: var(--primary);
  color: var(--text-white);
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  transition: all var(--transition-fast);
  min-width: 200px;
}

.submit-button:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-xl);
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: var(--radius-lg);
  text-align: center;
  color: #155724;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #28a745;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto var(--spacing-md);
}

.success-message h3 {
  color: #155724;
  margin-bottom: var(--spacing-sm);
}

.success-message p {
  color: #155724;
  margin: var(--spacing-xs) 0;
}

@media (max-width: 768px) {
  .form {
    padding: var(--spacing-md);
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .notice-box {
    padding: var(--spacing-md);
  }

  .service-option,
  .radio-option {
    padding: var(--spacing-sm);
  }
}
</style>
