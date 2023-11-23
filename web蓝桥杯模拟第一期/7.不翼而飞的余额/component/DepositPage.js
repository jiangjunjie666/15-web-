const DepositPage = {
  template: `
    <div class="deposit-page wallet-page">
      <div class="wallet-header">
        <h1>Deposit</h1>
        <div class="wallet-balance">
          <h2>Balance</h2>
          <p>
          <!-- TODO：待补充代码，在 # deposit-balance 中正确显示钱包余额  -->  
           <span id="deposit-balance">{{ store.balance }}</span>
           <span>ETH</span>
          </p>
        </div>
      </div>
      <div class="deposit-body">
        <p>Please enter the amount you want to deposit:</p>
        <input type="number" v-model="depositAmount" />
        <button @click="deposit">Deposit</button>
      </div>
    </div>`,
  setup() {
    const depositAmount = Vue.ref() // 输入框中的的值->存款金额
    const store = useMoneyStore() // 引入 store

    // TODO：待补充代码，完善点击存款按钮事件
    function deposit() {
      if (!isNaN(depositAmount.value) && depositAmount.value >= 0) {
        store.balance += depositAmount.value
        depositAmount.value = null
      }
    }
    return {
      deposit,
      depositAmount,
      store
    }
  }
}
