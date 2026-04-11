import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore("order", () => {
  // 工单列表
  const orders = ref([]);

  // 从 localStorage 加载数据
  const loadOrders = () => {
    const savedOrders = localStorage.getItem("fixit-orders");
    if (savedOrders) {
      try {
        orders.value = JSON.parse(savedOrders);
      } catch (error) {
        console.error("Failed to parse orders from localStorage:", error);
        orders.value = [];
      }
    }
  };

  // 保存数据到 localStorage
  const saveOrders = () => {
    localStorage.setItem("fixit-orders", JSON.stringify(orders.value));
  };

  // 创建工单
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      status: "pending", // pending, processing, completed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.value.unshift(newOrder);
    saveOrders();

    // TODO: 后续对接后端 API
    // await api.createOrder(orderData)

    return newOrder;
  };

  // 获取工单列表
  const getOrders = () => {
    loadOrders();
    // TODO: 后续对接后端 API
    // const response = await api.getOrders()
    // orders.value = response.data

    return orders.value;
  };

  // 获取单个工单
  const getOrderById = (id) => {
    return orders.value.find((order) => order.id === id);
  };

  // 更新工单状态
  const updateOrderStatus = (id, status) => {
    const order = orders.value.find((o) => o.id === id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      saveOrders();

      // TODO: 后续对接后端 API
      // await api.updateOrder(id, { status })

      return true;
    }
    return false;
  };

  // 删除工单
  const deleteOrder = (id) => {
    const index = orders.value.findIndex((o) => o.id === id);
    if (index !== -1) {
      orders.value.splice(index, 1);
      saveOrders();

      // TODO: 后续对接后端 API
      // await api.deleteOrder(id)

      return true;
    }
    return false;
  };

  // 初始化时加载数据
  loadOrders();

  return {
    orders,
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
  };
});
