const FormValidator = {
  template: `
    <div>
      <slot></slot>
    </div>
  `,
  props: ['rules', 'formData'], //rules 表单验证规则 formData 表单数据
  setup(props, { emit }) {
    const errors = ref({}) // 表单验证错误信息对象，使用 Vue 3 的 ref 函数创建响应式对象
    const hasErrors = computed(() => Object.keys(errors.value).length > 0) // 是否存在验证错误的计算属性，根据 errors 的长度判断

    // 根据类型进行验证的函数
    validateByType = (type, val) => {
      switch (type) {
        case 'email':
          return is_email(val) // 调用 is_email 函数验证邮箱格式
        case 'phone':
          return is_phone(val) // 调用 is_phone 函数验证手机号格式
        case 'number':
          return isNaN(Number(val)) // 验证是否为数字
        default:
          return true // 默认情况下返回 true，表示验证通过
      }
    }

    const validateForm = () => {
      return new Promise((resolve, reject) => {
        errors.value = {} // 清空之前的错误信息

        // TODO：目标 3 编写通用的表单验证规则，并将错误信息放置到 errors 对象中
        for (const field in props.rules) {
          const fieldRules = props.rules[field]

          for (const rule of fieldRules) {
            if (rule.required && !props.formData[field]) {
              errors.value[field] = rule.message
              break
            }

            if (rule.type && !validateByType(rule.type, props.formData[field])) {
              errors.value[field] = rule.message
              break
            }

            if (rule.min && props.formData[field].length < rule.min) {
              errors.value[field] = rule.message
              break
            }

            if (rule.max && props.formData[field].length > rule.max) {
              errors.value[field] = rule.message
              break
            }
          }
        }

        // 添加对 nickname 字段的非空判断
        if (props.rules.nickname && !props.formData.nickname) {
          errors.value.nickname = '昵称不能为空'
        }
        // TODO：END
        if (hasErrors.value) {
          resolve(false) // 存在错误，验证失败
        } else {
          resolve(true) // 不存在错误，验证通过
        }

        // 触发 "valid" 事件，并传递错误信息对象
        emit('valid', errors.value)
      })
    }

    return {
      validateForm
    }
  }
}
