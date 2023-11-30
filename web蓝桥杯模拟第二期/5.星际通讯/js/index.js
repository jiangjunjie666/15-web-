// 密语规则
const codonTable = {
  IIX: '人类',
  VII: '哈喽',
  III: '你好',
  IXI: '赞',
  XVI: '嗨',
  CUV: '打击',
  XII: '夜晚',
  IVI: '我',
  XIC: '想',
  XIV: '交个朋友',
  VIX: '月亮',
  XCI: '代码',
  XIX: '祈福',
  XVI: '和',
  XXI: 'stop'
}

/**
 * @param {string} alienMessage 外星人的密文
 * @return {string}  翻译结果
 */
const translate = (alienMessage) => {
  // TODO：待补充代码
  // 检查密文是否为空
  if (!alienMessage) {
    return ''
  }

  // 切分密文
  const codons = []
  for (let i = 0; i < alienMessage.length; i += 3) {
    codons.push(alienMessage.slice(i, i + 3))
  }
  // 初始化翻译结果
  let translation = ''

  // 遍历密文
  for (const codon of codons) {
    // 检查是否为停止符号
    if (codon === 'XXI') {
      break
    }

    // 查找翻译表
    const translationResult = codonTable[codon]

    // 如果找到翻译结果，则添加到最终结果中
    if (translationResult) {
      translation += translationResult
    } else {
      // 未找到对应翻译结果，返回无效密语
      return '无效密语'
    }
  }
  return translation
}
// 请注意：以下代码用于检测,请勿删除。
try {
  module.exports = translate
} catch (e) {}
