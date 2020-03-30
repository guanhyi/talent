/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeTostr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeTostr
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatDateTime (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
};

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength (str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param (json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text (val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge (target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr (arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function isNum (data) {
  var reg = /^\d{1,}$/
  var pattern = new RegExp(reg)
  return pattern.test(data)
}

export function getLetter (data) {
  let LetterDictionaries = {
    A: [
      '癌', '爱', '安', '氨', '鞍', '按', '奥'
    ],
    B: [
      '八', '巴', '芭', '白', '百', '班', '版', '办', '半', '伴', '蚌', '棒', '包', '薄', '宝', '保', '报', '暴', '爆', '北', '本', '苯', '逼', '比', '毕', '边', '编', '变', '标', '表', '滨', '冰', '兵', '丙', '病', '波', '玻', '博', '渤', '搏', '不', '布', '瞭'
    ],
    C: [
      '才', '材', '财', '采', '彩', '参', '餐', '残', '蚕', '仓', '沧', '藏', '曹', '草', '测', '叉', '茶', '柴', '产', '昌', '肠', '常', '厂', '畅', '超', '巢', '朝', '潮', '车', '郴', '沉', '成', '承', '城', '程', '澄', '池', '齿', '赤', '宠', '出', '初', '厨', '滁', '储', '楚', '川', '传', '船', '创', '垂', '春', '纯', '词', '瓷', '辞', '慈', '磁', '聪', '催', '翠', '村', '长'
    ],
    D: [
      '达', '打', '大', '代', '丹', '单', '淡', '弹', '蛋', '氮', '当', '档', '党', '导', '道', '德', '灯', '等', '邓', '低', '滴', '地', '第', '滇', '电', '淀', '雕', '钓', '定', '东', '董', '动', '都', '毒', '独', '读', '杜', '度', '短', '断', '锻', '对', '敦', '多', '调'
    ],
    E: [
      '俄', '鄂', '恩', '儿', '耳', '二'
    ],
    F: [
      '发', '阀', '法', '番', '翻', '钒', '反', '犯', '饭', '方', '芳', '防', '房', '仿', '纺', '放', '飞', '非', '肺', '废', '分', '汾', '粉', '奋', '风', '疯', '烽', '缝', '佛', '服', '符', '涪', '辐', '福', '抚', '辅', '腐', '父', '妇', '阜', '复', '腹', '覆'
    ],
    G: [
      '改', '甘', '肝', '柑', '感', '干', '赣', '钢', '港', '高', '歌', '革', '葛', '个', '各', '铬', '给', '耕', '工', '公', '功', '躬', '共', '贡', '供', '沟', '购', '古', '股', '骨', '固', '故', '关', '观', '管', '惯', '灌', '罐', '光', '广', '规', '硅', '轨', '贵', '桂', '郭', '锅', '国', '果', '过'
    ],
    H: [
      '哈', '孩', '海', '邯', '含', '函', '韩', '寒', '罕', '汉', '焊', '杭', '航', '好', '合', '和', '河', '核', '菏', '贺', '鹤', '黑', '痕', '衡', '红', '宏', '洪', '后', '呼', '湖', '互', '户', '护', '沪', '花', '华', '化', '画', '话', '怀', '淮', '环', '黄', '徽', '回', '会', '惠', '婚', '混', '活', '火', '获'
    ],
    J: [
      '机', '鸡', '基', '激', '吉', '极', '急', '疾', '集', '几', '脊', '计', '记', '纪', '技', '济', '继', '寄', '冀', '加', '佳', '家', '嘉', '夹', '甲', '价', '驾', '监', '检', '减', '简', '建', '剑', '健', '舰', '江', '降', '交', '胶', '焦', '角', '觉', '轿', '教', '揭', '节', '洁', '结', '解', '介', '芥', '今', '金', '津', '紧', '锦', '进', '近', '晋', '京', '经', '荆', '晶', '精', '井', '颈', '景', '警', '净', '竞', '静', '九', '酒', '就', '居', '局', '巨', '剧', '聚', '鹃', '卷', '决', '绝', '军', '菌', '骏'
    ],
    K: [
      '喀', '开', '凯', '刊', '勘', '看', '康', '抗', '考', '科', '颗', '可', '克', '客', '课', '垦', '空', '孔', '恐', '控', '口', '跨', '快', '宽', '矿', '昆'
    ],
    L: [
      '拉', '辣', '莱', '兰', '蓝', '篮', '廊', '浪', '劳', '老', '乐', '了', '雷', '冷', '离', '黎', '理', '力', '历', '立', '丽', '励', '连', '涟', '联', '廉', '炼', '恋', '良', '凉', '粮', '两', '量', '辽', '聊', '林', '临', '磷', '灵', '陵', '零', '岭', '领', '另', '留', '流', '硫', '柳', '六', '龙', '陇', '娄', '楼', '鲁', '陆', '录', '鹿', '路', '露', '伦', '轮', '逻', '洛', '落', '吕', '旅', '铝', '律', '绿', '氯'
    ],
    M: [
      '麻', '马', '麦', '满', '漫', '慢', '芒', '莽', '毛', '锚', '茂', '眉', '梅', '媒', '煤', '每', '美', '镁', '门', '萌', '蒙', '泌', '秘', '密', '蜜', '绵', '棉', '免', '面', '妙', '民', '闽', '敏', '名', '明', '模', '膜', '摩', '磨', '莫', '母', '牡', '木', '牧'
    ],
    N: [
      '纳', '耐', '男', '南', '脑', '内', '能', '泥', '年', '娘', '酿', '鸟', '尿', '宁', '柠', '凝', '农', '暖', '女'
    ],
    O: [
      '欧'
    ],
    P: [
      '帕', '排', '派', '攀', '判', '炮', '培', '喷', '烹', '彭', '膨', '批', '皮', '啤', '偏', '拼', '品', '乒', '平', '评', '苹', '萍', '破', '莆', '葡', '蒲', '浦', '普'
    ],
    Q: [
      '華', '七', '齐', '奇', '棋', '企', '启', '起', '气', '汽', '器', '前', '钱', '乾', '潜', '黔', '强', '墙', '侨', '桥', '钦', '秦', '琴', '禽', '勤', '青', '轻', '清', '情', '庆', '琼', '秋', '求', '球', '区', '趋', '曲', '全', '泉', '拳', '犬', '群'
    ],
    R: [
      '燃', '染', '热', '人', '刃', '认', '日', '荣', '融', '肉', '如', '儒', '乳', '软', '润', '若'
    ],
    S: [
      '三', '散', '色', '森', '沙', '砂', '山', '杉', '陕', '汕', '伤', '商', '上', '尚', '烧', '韶', '少', '邵', '绍', '蛇', '设', '社', '射', '涉', '摄', '深', '神', '沈', '审', '肾', '生', '声', '圣', '胜', '失', '师', '诗', '施', '湿', '十', '石', '时', '实', '食', '史', '世', '市', '事', '饰', '试', '视', '是', '适', '室', '收', '手', '首', '兽', '书', '疏', '输', '蔬', '蜀', '术', '树', '数', '双', '水', '税', '顺', '朔', '司', '丝', '私', '思', '四', '伺', '饲', '松', '宋', '颂', '苏', '诉', '素', '速', '塑', '绥', '随', '岁', '隧', '孙', '缩', '宿'
    ],
    T: [
      '塔', '台', '太', '泰', '潭', '坦', '炭', '探', '碳', '唐', '糖', '陶', '特', '疼', '体', '天', '田', '甜', '条', '铁', '听', '通', '同', '铜', '童', '统', '投', '透', '图', '涂', '土', '吐', '团', '推', '退', '拖', '脱'
    ],
    W: [
      '娃', '瓦', '外', '玩', '顽', '晚', '皖', '万', '网', '望', '危', '威', '微', '为', '围', '唯', '维', '潍', '卫', '未', '胃', '渭', '魏', '温', '文', '我', '乌', '污', '钨', '无', '芜', '吴', '梧', '五', '武', '舞', '物'
    ],
    X: [
      '畜', '行', '厦', '西', '希', '矽', '稀', '锡', '洗', '喜', '戏', '系', '细', '下', '先', '纤', '咸', '显', '县', '现', '乡', '相', '香', '湘', '襄', '向', '项', '象', '橡', '消', '销', '小', '孝', '校', '哮', '效', '协', '鞋', '写', '心', '忻', '新', '信', '星', '刑', '邢', '形', '兴', '杏', '幸', '性', '熊', '休', '修', '徐', '许', '旭', '叙', '蓄', '宣', '选', '学', '雪', '血', '勋', '寻', '循', '训'
    ],
    Y: [
      '压', '鸭', '牙', '雅', '亚', '烟', '延', '岩', '炎', '沿', '研', '盐', '眼', '演', '雁', '燕', '扬', '羊', '阳', '杨', '养', '腰', '遥', '咬', '药', '椰', '冶', '野', '液', '一', '伊', '医', '仪', '沂', '宜', '胰', '移', '遗', '疑', '乙', '义', '艺', '异', '译', '益', '意', '阴', '音', '殷', '银', '引', '饮', '印', '英', '婴', '鹰', '营', '赢', '影', '应', '硬', '永', '优', '邮', '油', '铀', '游', '友', '有', '右', '幼', '余', '鱼', '渔', '渝', '榆', '宇', '羽', '雨', '语', '玉', '预', '豫', '元', '园', '原', '源', '远', '月', '岳', '阅', '越', '粤', '云', '郧', '运'
    ],
    Z: [
      '桉', '缤', '岱', '癫', '芙', '橄', '鲑', '衮', '瀚', '暨', '俪', '泸', '鹭', '珞', '漯', '魅', '岷', '钼', '鄱', '濮', '綦', '晟', '燧', '钛', '潇', '杂', '灾', '载', '再', '在', '脏', '凿', '早', '枣', '造', '噪', '泽', '增', '轧', '债', '粘', '展', '战', '湛', '张', '章', '漳', '招', '昭', '沼', '照', '肇', '哲', '浙', '针', '侦', '真', '诊', '阵', '振', '震', '镇', '征', '整', '正', '证', '郑', '政', '支', '芝', '知', '直', '职', '植', '纸', '指', '志', '制', '质', '治', '致', '掷', '智', '中', '终', '钟', '肿', '种', '仲', '重', '舟', '周', '轴', '珠', '株', '猪', '蛛', '竹', '苎', '住', '注', '驻', '祝', '著', '铸', '筑', '专', '砖', '转', '篆', '装', '追', '桌', '卓', '啄', '咨', '资', '淄', '紫', '自', '宗', '综', '总', '纵', '走', '租', '足', '卒', '阻', '组', '祖', '钻', '最', '遵', '昨', '作', '做'
    ]
  }
  return LetterDictionaries[data]
}
