export interface Product {
  id: string
  name: string
  image: string
  variants: { label: string; color: string; textColor: string }[]
  priceMin: number
  priceMax: number
  inStock: boolean
  stockCount?: number
  cryptoOnly: boolean
  url: string
  description: string
  features: string[]
  durations: { label: string; price: number }[]
}

const defaultFeatures = [
  'Customize aiming settings',
  'Customize maximum aiming speed',
  'Customize and define aiming points',
  'Tries to calculate ballistics',
  'Search and circle targets in different ways',
  'RAM reading algorithms',
  'Search for objects on the ground',
]

const defaultDesc = 'The solution provides aiming assistance, and also allows you to detect enemy positions and gadgets.'

export const allProducts: Product[] = [
  { id:'cod', name:'CALL OF DUTY', image:'/game_cod.jpg', variants:[{label:'BO7',color:'#f59e0b',textColor:'#000'},{label:'BO6',color:'#ff3366',textColor:'#fff'},{label:'MWIII',color:'#00d4ff',textColor:'#000'},{label:'MWII',color:'#7c3aed',textColor:'#fff'},{label:'VG',color:'#f59e0b',textColor:'#000'},{label:'MW19',color:'#00d4ff',textColor:'#000'}], priceMin:5, priceMax:65, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/call-of-duty-mw3-mw2-mw-wz-wz2', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:5},{label:'3 DAYS',price:8},{label:'7 DAYS',price:13},{label:'30 DAYS',price:30},{label:'90 DAYS',price:65}] },
  { id:'apex', name:'APEX LEGENDS', image:'/game_apex.jpg', variants:[], priceMin:4, priceMax:35, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/apex', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:4},{label:'7 DAYS',price:20},{label:'30 DAYS',price:35}] },
  { id:'dbd', name:'DEAD BY DAYLIGHT', image:'/game_dbd.jpg', variants:[], priceMin:5, priceMax:35, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/dbd', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:5},{label:'7 DAYS',price:20},{label:'30 DAYS',price:35}] },
  { id:'pubg', name:'PUBG BATTLEGROUNDS', image:'/game_pubg.jpg', variants:[], priceMin:7, priceMax:45, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/pubg', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:7},{label:'7 DAYS',price:25},{label:'30 DAYS',price:45}] },
  { id:'cs2', name:'COUNTER-STRIKE 2', image:'/game_cs2.jpg', variants:[], priceMin:4, priceMax:30, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/cs2', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:4},{label:'7 DAYS',price:15},{label:'30 DAYS',price:30}] },
  { id:'tarkov', name:'ESCAPE FROM TARKOV', image:'/game_tarkov.jpg', variants:[{label:'EFT',color:'#f59e0b',textColor:'#000'},{label:'ARENA',color:'#ff3366',textColor:'#fff'}], priceMin:4, priceMax:35, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/escape-from-tarkov', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:4},{label:'7 DAYS',price:20},{label:'30 DAYS',price:35}] },
  { id:'tarkov-arena', name:'TARKOV: ARENA', image:'/game_tarkov.jpg', variants:[], priceMin:4, priceMax:35, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/escape-from-tarkov-only-arena', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:4},{label:'7 DAYS',price:20},{label:'30 DAYS',price:35}] },
  { id:'fortnite', name:'FORTNITE', image:'/game_fortnite.jpg', variants:[], priceMin:4, priceMax:35, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/fortnite', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:4},{label:'7 DAYS',price:20},{label:'30 DAYS',price:35}] },
  { id:'battlefield', name:'BATTLEFIELD 2042', image:'/game_battlefield.jpg', variants:[{label:'BF6',color:'#f59e0b',textColor:'#000'},{label:'BF2042',color:'#00d4ff',textColor:'#000'},{label:'BF5',color:'#ff3366',textColor:'#fff'},{label:'BF1',color:'#7c3aed',textColor:'#fff'}], priceMin:8, priceMax:70, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/battlefield-2042', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:8},{label:'7 DAYS',price:35},{label:'30 DAYS',price:70}] },
  { id:'squad', name:'SQUAD', image:'/game_squad.jpg', variants:[], priceMin:10, priceMax:60, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/squad', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:10},{label:'7 DAYS',price:30},{label:'30 DAYS',price:60}] },
  { id:'delta', name:'DELTA FORCE', image:'/game_delta.jpg', variants:[], priceMin:10, priceMax:100, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/delta-force', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:10},{label:'7 DAYS',price:50},{label:'30 DAYS',price:100}] },
  { id:'thefinals', name:'THE FINALS', image:'/game_thefinals.jpg', variants:[], priceMin:6, priceMax:45, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/the-finals', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:6},{label:'7 DAYS',price:25},{label:'30 DAYS',price:45}] },
  { id:'darkdarker', name:'DARK AND DARKER', image:'/game_darkdarker.jpg', variants:[], priceMin:8, priceMax:55, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/dark-and-darker', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:8},{label:'7 DAYS',price:30},{label:'30 DAYS',price:55}] },
  { id:'arenabreakout', name:'ARENA BREAKOUT', image:'/game_arenabreakout.jpg', variants:[{label:'INFINITE',color:'#00d4ff',textColor:'#000'}], priceMin:7, priceMax:50, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/arena-breackout', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:7},{label:'7 DAYS',price:25},{label:'30 DAYS',price:50}] },
  { id:'rogue', name:'ROGUE COMPANY', image:'/game_rogue.jpg', variants:[], priceMin:5, priceMax:30, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/rogue-company', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:5},{label:'7 DAYS',price:15},{label:'30 DAYS',price:30}] },
  { id:'warthunder', name:'WAR THUNDER', image:'/game_warthunder.jpg', variants:[], priceMin:8, priceMax:60, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/war-thunder', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:8},{label:'7 DAYS',price:30},{label:'30 DAYS',price:60}] },
  { id:'unturned', name:'UNTURNED', image:'/game_unturned.jpg', variants:[], priceMin:3, priceMax:25, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/unturned', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:3},{label:'7 DAYS',price:12},{label:'30 DAYS',price:25}] },
  { id:'ww3', name:'WORLD WAR 3', image:'/game_ww3.jpg', variants:[], priceMin:9, priceMax:55, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/world-war-3', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:9},{label:'7 DAYS',price:30},{label:'30 DAYS',price:55}] },
  { id:'insurgency', name:'INSURGENCY: SANDSTORM', image:'/game_insurgency.jpg', variants:[], priceMin:7, priceMax:45, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/insurgency-sandstorm', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:7},{label:'7 DAYS',price:25},{label:'30 DAYS',price:45}] },
  { id:'deadside', name:'DEADSIDE', image:'/game_deadside.jpg', variants:[], priceMin:5, priceMax:35, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/deadside', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:5},{label:'7 DAYS',price:18},{label:'30 DAYS',price:35}] },
  { id:'battlebit', name:'BATTLEBIT', image:'/game_battlebit.jpg', variants:[], priceMin:4, priceMax:30, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/battlebit', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:4},{label:'7 DAYS',price:15},{label:'30 DAYS',price:30}] },
  { id:'grayzone', name:'GRAY ZONE WARFARE', image:'/game_grayzone.jpg', variants:[], priceMin:10, priceMax:70, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/gzw', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:10},{label:'7 DAYS',price:35},{label:'30 DAYS',price:70}] },
  { id:'arcraiders', name:'ARC RAIDERS', image:'/game_arcraiders.jpg', variants:[], priceMin:6, priceMax:40, inStock:true, cryptoOnly:true, url:'https://fecurity.mysellauth.com/product/arc-raiders', description:defaultDesc, features:defaultFeatures, durations:[{label:'1 DAY',price:6},{label:'7 DAYS',price:22},{label:'30 DAYS',price:40}] },
]
