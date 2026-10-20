import type { Figure } from '../types';

/**
 * 蘇軾 · 元豐三年二月初一（1080）· 初到黃州
 *
 * The phone is frozen on the day he arrives in 黃州 after the 烏臺詩案.
 * Every quoted line is marked 原文; every rewrite is marked 轉譯.
 */
export const sushi: Figure = {
  id: 'sushi',
  name: '蘇軾',
  moment: {
    dateLine: '元豐三年 二月初一',
    clock: '15:42',
    weatherLine: '黃州 9° 小雨 · 申時',
  },

  lockNotifications: [
    { app: 'messages', title: '子由', time: '現在', body: '嫂與諸姪，弟五月護送南來。兄先安頓。', threadId: 'ziyou' },
    { app: 'wallet', title: '錢包', time: '上午 6:02', body: '官俸已停止入帳。本月 4,500 錢已分作 30 份。' },
    { app: 'calendar', title: '日曆', time: '今天', body: '上〈到黃州謝表〉' },
  ],

  home: {
    weather: { place: '黃州', temp: '9°', condition: '小雨', quote: '鄙陋多雨，氣象昏昏' },
    calendar: {
      month: '庚申年 二月',
      day: '初一',
      events: [
        { title: '抵達黃州', sub: '寓定惠院', color: '#FF3B30' },
        { title: '上〈到黃州謝表〉', color: '#007AFF' },
      ],
    },
  },

  threads: [
    {
      id: 'ziyou',
      name: '子由',
      avatar: '由',
      when: '15:40',
      unread: true,
      messages: [
        { kind: 'system', text: '元豐二年八月 · 兄下御史臺獄' },
        { kind: 'in', text: '臣欲乞納在身官，以贖兄軾。', src: '原文 · 蘇轍〈為兄軾下獄上書〉（節錄；上神宗書，非寄兄）' },
        { kind: 'system', text: '御史臺獄中' },
        { kind: 'out', text: '是處青山可埋骨，他年夜雨獨傷神。\n與君世世為兄弟，更結人間未了因。', src: '原文 · 〈獄中寄子由〉其一（節錄）' },
        { kind: 'system', text: '十二月廿九 · 出獄　責授黃州團練副使' },
        { kind: 'in', text: '弟也被貶了，去筠州監鹽酒稅。', src: '轉譯 · 蘇轍為兄求情，同遭貶謫' },
        { kind: 'in', text: '兄勿以我為念。' },
        { kind: 'system', text: '元豐三年正月 · 陳州' },
        { kind: 'in', text: '我從南都趕來陳州了，陪兄三日。', src: '轉譯 · 據〈子由自南都來陳三日而別〉' },
        { kind: 'system', text: '今天 · 黃州' },
        { kind: 'out', text: '自笑平生為口忙，老來事業轉荒唐。\n長江繞郭知魚美，好竹連山覺筍香。', src: '原文 · 〈初到黃州〉（節錄）' },
        { kind: 'out', text: '到了。先住定惠院，跟和尚吃素。邁兒在身邊，勿念。', src: '轉譯' },
        { kind: 'in', text: '嫂與諸姪，弟五月護送南來。兄先安頓。', src: '轉譯 · 是年五月蘇轍送眷至黃州' },
      ],
    },
    {
      id: 'mai',
      name: '邁兒',
      avatar: '邁',
      when: '十二月',
      messages: [
        { kind: 'system', text: '元豐二年八月 · 御史臺獄' },
        { kind: 'out', text: '每天送飯，平安就只送菜和肉。' },
        { kind: 'out', text: '若有不測，改送魚。', src: '轉譯 · 典出葉夢得《避暑錄話》' },
        { kind: 'in', text: '好。' },
        { kind: 'system', text: '逾月' },
        { kind: 'in', text: '錢糧用完了。兒去陳留想辦法，飯先託親戚代送。', src: '轉譯 · 據《避暑錄話》「忽糧盡，出謀於陳留」' },
        { kind: 'system', text: '親戚不知父子之約，只送來一尾魚鮓' },
        { kind: 'out', text: '……' },
        { kind: 'out', text: '我寫了兩首詩給你叔叔，已託獄卒轉交。', src: '轉譯 · 即〈獄中寄子由〉二首' },
        { kind: 'system', text: '十二月廿九 · 出獄' },
        { kind: 'in', text: '爹，兒陪你去黃州。', src: '轉譯 · 蘇邁隨父赴黃州' },
      ],
    },
    {
      id: 'chenzao',
      name: '陳季常',
      avatar: '陳',
      when: '正月',
      messages: [
        { kind: 'system', text: '元豐三年正月 · 岐亭道上' },
        { kind: 'in', text: '子瞻？你怎麼會在這裡？', src: '轉譯 · 據〈方山子傳〉' },
        { kind: 'out', text: '得罪了，貶去黃州，剛好路過。', src: '轉譯' },
        { kind: 'in', text: '（低頭不語，又仰頭大笑）' },
        { kind: 'in', text: '今晚住我家。', src: '轉譯 · 據〈方山子傳〉' },
        { kind: 'out', text: '你家四壁空空，一家老小倒個個自在。', src: '轉譯 · 據〈方山子傳〉「環堵蕭然，而妻子奴婢皆有自得之意」' },
      ],
    },
    {
      id: 'wanggong',
      name: '王定國',
      avatar: '王',
      when: '十二月',
      messages: [
        { kind: 'system', text: '元豐二年十二月' },
        { kind: 'out', text: '定國，因為我，你被貶到賓州那麼遠。' },
        { kind: 'out', text: '愧甚。', src: '轉譯 · 王鞏受詩案牽連貶監賓州鹽酒稅，為受罰最重者之一' },
      ],
    },
    {
      id: 'yushitai',
      name: '御史臺',
      avatar: '臺',
      when: '七月',
      messages: [
        { kind: 'system', text: '元豐二年七月廿八 · 湖州' },
        { kind: 'in', text: '奉旨追攝蘇軾赴臺。即刻啟程。', src: '轉譯 · 太常博士皇甫遵奉命赴湖州拘捕' },
        { kind: 'system', text: '你已將此對話設為靜音' },
      ],
    },
  ],

  photos: [
    { glyph: '湖', title: '最後一眼湖州', place: '湖州', date: '元豐二年七月廿八', bg: '#3F5E5A', fg: '#F2ECE0', desc: '到任才三個月，御史臺的人就來了。全家追著送出城門，哭聲一路不斷。', src: '轉譯' },
    { glyph: '竹', title: '與可的墨竹', place: '湖州', date: '元豐二年七月', bg: '#E4DBC8', fg: '#22201C', desc: '曬書畫時翻到亡友文與可畫的篔簹谷偃竹，放下畫卷，失聲痛哭。幾週後他就被捕了。', src: '據〈文與可畫篔簹谷偃竹記〉' },
    { glyph: '烏', title: '烏臺', place: '汴京 · 御史臺', date: '元豐二年八月十八', bg: '#22201C', fg: '#F2ECE0', desc: '御史臺院中遍植柏樹，常有烏鴉棲集，所以叫烏臺。這場文字獄後來就叫「烏臺詩案」。', src: '常識 · 烏臺之名典出《漢書》' },
    { glyph: '獄', title: '一百三十日', place: '汴京 · 御史臺獄', date: '八月至十二月', bg: '#A8352A', fg: '#F2ECE0', desc: '詩文被逐字審問，牽強附會成「謗訕君上」。他一度以為自己必死。', src: '轉譯' },
    { glyph: '陳', title: '兄弟三日', place: '陳州', date: '元豐三年正月', bg: '#FBF8F1', fg: '#22201C', desc: '子由從南都趕來陳州送別，兄弟相聚三天。', src: '據〈子由自南都來陳三日而別〉' },
    { glyph: '岐', title: '方山子', place: '麻城 · 岐亭', date: '元豐三年正月', bg: '#7A5A2E', fg: '#F2ECE0', desc: '路上遇見少年時的豪俠朋友陳慥。他如今隱居山中，戴一頂又方又高的帽子，人稱方山子。', src: '據〈方山子傳〉' },
    { glyph: '江', title: '長江繞郭', place: '黃州', date: '元豐三年二月初一', bg: '#9DB4B0', fg: '#22201C', desc: '抵達黃州。江水繞城而過，他先想到的是魚一定很好吃。', src: '據〈初到黃州〉' },
    { glyph: '筍', title: '好竹連山', place: '黃州', date: '元豐三年二月初一', bg: '#6E8B5E', fg: '#F2ECE0', desc: '滿山竹林。剛被貶的人，看見竹子想到的是筍香。', src: '據〈初到黃州〉' },
    { glyph: '院', title: '定惠院', place: '黃州 · 定惠院', date: '元豐三年二月', bg: '#E4DBC8', fg: '#22201C', desc: '家眷還沒到，先借住城東南的定惠院，跟僧人一起吃素。', src: '轉譯' },
  ],
  photosRange: '元豐二年七月至三年二月',
  photosFootnote: '一〇八〇年還沒有相機。\n每一格以一個字，代替那天本該拍下的照片。',

  map: {
    title: '前往黃州',
    subtitle: '自汴京出發 · 約 30 日 · 舟車步行',
    rivers: [
      { name: '汴水', path: 'M0 150 C90 140 200 170 393 150', labelX: 300, labelY: 142, width: 5 },
      { name: '長江', path: 'M15 496 L49 473 L77 485 L133 524 L183 464 L269 344 L301 332 L351 357 L376 380 L393 392', labelX: 196, labelY: 430, width: 9 },
    ],
    priorRoute: 'M332 434 L356 404 L298 317 L254 256 L115 163 L51 131',
    route: 'M51 131 L78 214 L52 272 L86 338 L80 404 L77 469',
    places: [
      { name: '湖州', x: 332, y: 434, origin: true },
      { name: '汴京 · 御史臺', x: 51, y: 131, major: true },
      { name: '陳州', x: 78, y: 214, major: true },
      { name: '蔡州', x: 52, y: 272 },
      { name: '光州', x: 86, y: 338 },
      { name: '岐亭', x: 80, y: 404, major: true },
      { name: '黃州', x: 77, y: 469, destination: true },
    ],
    stops: [
      { name: '湖州', date: '元豐二年七月廿八', note: '在知州任上被捕，沿運河押解北上入京。（灰色虛線）' },
      { name: '汴京 · 御史臺', date: '八月十八 至 十二月廿九', note: '下御史臺獄。約一百三十日後出獄，責授黃州團練副使，不得簽書公事。' },
      { name: '陳州', date: '元豐三年正月', note: '正月初一離京南下。子由自南都趕來，兄弟相聚三日而別。' },
      { name: '岐亭', date: '元豐三年正月', note: '經蔡州、光州，在麻城岐亭遇見隱居的老友陳季常，留宿其家。' },
      { name: '黃州', date: '元豐三年二月初一', note: '目的地。暫寓定惠院。他在這裡住了四年多，後來在城東坡地耕種，自號「東坡居士」。' },
    ],
    defaultStop: 4,
  },

  wallet: {
    backCards: [
      { title: '大宋官俸', right: '已停用', gradient: ['#8E9196', '#5D6066'] },
      { title: '竹筒 · 待客', right: '0 錢', gradient: ['#6E8B5E', '#46623A'] },
    ],
    main: {
      title: '屋梁錢',
      monthlyTotal: 4500,
      dailyAllowance: 150,
      parts: 30,
      footer: ['每日上限 150', '二月 · 30 份'],
      gradient: ['#B0844E', '#6E4A22'],
    },
    takeLabel: '以畫叉挑取今日一份',
    takenLabel: '已取今日 150 錢，畫叉已藏好。',
    transactions: [
      { badge: '齋', color: '#46623A', title: '定惠院 · 隨僧蔬食', sub: '今天 · 午時', amount: '0' },
      { badge: '俸', color: '#6D7076', title: '官俸 · 停止入帳', sub: '元豐二年十二月 · 責授團練副使', amount: '—' },
    ],
    footnote:
      '原文：「日用不得過百五十。」每月初一取四千五百錢分三十份掛在屋梁，每天用畫叉挑一份，用不完的存進大竹筒待客。此法學自湖州隱士賈耘老。出自〈答秦太虛書〉',
  },

  notes: [
    {
      title: '到黃州須辦',
      preview: '申時　寫〈到黃州謝表〉上呈…',
      header: '元豐三年二月初一 申時',
      checklist: [
        { text: '寫〈到黃州謝表〉上呈' },
        { text: '暫寓定惠院，隨僧蔬食', done: true },
        { text: '五月子由送家眷來，另覓住處' },
        { text: '少作詩，少說話' },
      ],
    },
    {
      title: '卜算子（草稿）',
      preview: '夜裡　缺月掛疏桐，漏斷人初靜…',
      header: '寓居定惠院',
      body: '缺月掛疏桐，漏斷人初靜。\n誰見幽人獨往來，縹緲孤鴻影。\n\n驚起卻回頭，有恨無人省。\n揀盡寒枝不肯棲，寂寞沙洲冷。',
      src: '原文 · 〈卜算子·黃州定慧院寓居作〉，作於寓居定惠院期間；實際寫成應晚於初到當日，此處提前放入，屬時間挪用',
    },
  ],
};
