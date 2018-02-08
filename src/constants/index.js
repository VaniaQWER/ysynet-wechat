export const repairData = {
  //10申请，20指派，30维修中,50待验收，80已拒绝 90已关闭 
  "10": {
    text: "待接修",
    color: 'blue'
  },
  "20": {
    text: "指派",
    color: 'green'
  },
  "30": {
    text: "维修中",
    color: 'gold'
  },
  "50": {
    text: "待验收",
    color: 'orange'
  },
  "80": {
    text: "已拒绝",
    color: 'magenta'
  },
  "90": {
    text: "关闭",
    color: 'red'
  },
}

export const selectOption = {
  urgentFlag: [//紧急度
    { text: "紧急", value: "10" },
    { text: "急", value: "20" },
    { text: "一般", value: "30" },
  ],
  rrpairSend: [//是否送修
    { text: "是", value: "00" },
    { text: "否", value: "01" },
  ],
  spare: [ // 有无备用
    { text: "有备用", value: "00" },
    { text: "无备用", value: "01" },
  ],
  faultDescribe: [ // 故障现象
    { text: "部分功能失效", value: "00" },
    { text: "开机后死机", value: "01" },
    { text: "性能指标偏离", value: "03" },
    { text: "不规则或偶发故障", value: "04" },
    { text: "其他", value: "02" }
  ],
  useFstate: [ //是否停用
    { text: "是", value: "00" },
    { text: "否", value: "01" },
  ],
  offCause: [ //关闭原因
    // 00误报；01无法维修；02维修成本高，99其他 
    { text: "误报", value: "00" },
    { text: "无法维修", value: "01" },
    { text: "维修成本高", value: "02" },
    { text: "其他", value: "99" },
  ],
  //00正常使用；01报废；99其他
  followupTreatment: [ // 后续处理
    { text: "正常使用", value: "00" },
    { text: "报废", value: "01" },
    { text: "其他", value: "99" },
  ],
  repairResult: [ //维修结果
    //00完全修复；01部分修复；02未修复 
    { text: "完全修复", value: "00" },
    { text: "部分修复", value: "01" },
    { text: "未修复", value: "02" },
  ],
  repairContentType: [ // 故障类型
    { text: "暂时性故障", value: "00" },
    { text: "永久性故障", value: "01" },
    { text: "突发性故障", value: "02" },
    { text: "渐发性故障", value: "03" },
    { text: "破坏性故障", value: "04" },
    { text: "非破坏性故障", value: "05" },
    { text: "其他", value: "99" }
  ],
  repairContentTyp: [ // 故障原因
    { text: "设备老化", value: "00" },
    { text: "使用不当", value: "01" },
    { text: "缺乏维护", value: "02" },
    { text: "其他", value: "99" },
  ],
  notCause: [ // 验收不通过原因
    // 00故障未解决；01维修效果不满意；02维修服务质量差；99其他 
    { text: "故障未解决", value: "00" },
    { text: "维修效果不满意", value: "01" },
    { text: "维修服务质量差", value: "02" },
    { text: "其他", value: "99" },
  ]
}
//验收单
export const checkList = [
  {
    RN: 1,
    orderFstate: '10',
    rrpairOrderNo: 'AA180208000001',
    equipmentStandardName:"资产名称1",
    assetsRecord:'AS171218000001',
    repairResult:'00',
    spec:'aaa',
    title: '耳鼻喉头颈外科综合治疗台（带影像系统…………）',
    TotalMoney: 180, //总金额
    repaireTime: '2017-02-03 11:30',//维修时间
    orderTime: '2017-02-03 11:30',//报修时间
  },
  {
    RN: 2,
    orderFstate: '20',
    rrpairOrderNo: 'AA180207000042',
    equipmentStandardName:"资产名称2",
    assetsRecord:'AS171218000002',
    repairResult:'01',
    spec:'bbb',
    title: '耳鼻喉头颈外科综合治疗台（带影像系统…………）',
    TotalMoney: 200, 
    repaireTime: '2017-02-03 09:30',
    orderTime: '2017-02-04 16:30',
  },
  {
    RN: 3,
    orderFstate: '30',
    rrpairOrderNo: 'AA180207000041',
    equipmentStandardName:"资产名称3",
    assetsRecord:'AS171218000003',
    repairResult:'02',
    spec:'ccc',
    title: '耳鼻喉头颈外科综合治疗台（带影像系统…………）',
    TotalMoney: 420, 
    repaireTime: '2017-02-05 09:30',
    orderTime: '2017-02-07 17:30',
  },
  {
    RN: 4,
    orderFstate: '50',
    rrpairOrderNo: 'AA180207000044',
    equipmentStandardName:"资产名称4",
    assetsRecord:'AS171218000004',
    repairResult:'00',
    spec:'ddd',
    title: '耳鼻喉头颈外科综合治疗台（带影像系统…………）',
    TotalMoney: 700, 
    repaireTime: '2017-02-06 06:30',
    orderTime: '2017-02-07 11:30',
  },
  {
    RN: 5,
    orderFstate: '80',
    rrpairOrderNo: 'AA180207000046',
    equipmentStandardName:"资产名称5",
    assetsRecord:'AS171218000002',
    repairResult:'00',
    spec:'eee',
    title: '耳鼻喉头颈外科综合治疗台（带影像系统…………）',
    TotalMoney: 1050, 
    repaireTime: '2017-02-01 13:30',
    orderTime: '2017-02-09 10:30',
  },
  {
    RN: 6,
    orderFstate: '90',
    rrpairOrderNo: 'AA1802080000047',
    equipmentStandardName:"资产名称6",
    assetsRecord:'AS171218000002',
    repairResult:'01',
    spec:'aaa',
    title: '耳鼻喉头颈外科综合治疗台（带影像系统…………）',
    TotalMoney: 50, 
    repaireTime: '2017-02-05 16:30',
    orderTime: '2017-02-07 11:30',
  },
]
