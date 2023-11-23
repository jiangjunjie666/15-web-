const { defineStore } =  Pinia
const {ref} = Vue;

// TODO：待补充代码
const useMoneyStore = defineStore('money', () => {
    const balance = ref(23);
    
    return {
      balance,
    }
})
