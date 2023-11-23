const FormInput = {
  template: `
  <div>
    <input class="form-input" :placeholder="holder" v-model="inputValue"  />
    <div v-if="showMessage" class="error-message">{{ showMessage }}</div>
  </div>
  `,
  props: {
    value: String, // v-model 绑定的值，这里取名为 inputValue
    showMessage: String, // 是否显示消息
    holder: String // 输入框的占位符
  },
  setup(props, { emit }) {
    const inputValue = ref(props.value)
    const holder = ref(props.holder)

    //  TODO：目标 1 当输入框的值变化时，触发 input 事件更新父组件的 v-model 值
    watch(inputValue, (newValue) => {
      emit('update:value', newValue)
    })
    //  TODO：end
    return {
      inputValue,
      holder
    }
  }
}
