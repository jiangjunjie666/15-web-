const WalletPage = {
  template: `
      <div class="wallet-page">
        <div class="wallet-header">
          <h1>My Wallet</h1>
          <div class="wallet-balance">
            <h2>Balance</h2>
            <p>
               <span id="wallet-balance">{{ store.balance }}</span>
               <span>ETH</span>
            </p>
          </div>
        </div>
        <div class="wallet-body">
          <div class="wallet-actions">
            <button class="wallet-btn deposit-btn" @click="gotoDepositPage">Deposit</button>
            <button class="wallet-btn transfer-btn">Transfer</button>
          </div>
          <div class="wallet-transactions">
            <h2>Transactions</h2>
            <ul>
              <li v-for="transaction in transactions" :key="transaction.id">
                <span class="transaction-type">{{ transaction.type }}</span>
                <span class="transaction-amount">{{ transaction.amount }} ETH</span>
                <span class="transaction-date">{{ transaction.date }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>`,
  setup() {
    const store = useMoneyStore()
    const transactions = Vue.ref([
      {
        id: 1,
        type: "Deposit",
        amount: 2,
        date: "2023-07-25",
      },
      {
        id: 2,
        type: "Withdraw",
        amount: 1,
        date: "2023-07-24",
      },
      {
        id: 3,
        type: "Transfer",
        amount: 0.5,
        date: "2023-07-23",
      },
    ]);
    const gotoDepositPage = () => {
      router.push('/deposit')
    }
    return {
      store,
      transactions,
      gotoDepositPage
    };
  },
};
