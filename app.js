// 地図初期化
const map = L.map('map').setView([33.5597, 133.5311], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 高知のお店データ（例、ジャンルごとに複数店舗追加）
const shops = [
  // 麺類
  {name: "麺屋まる", genre: "men", lat: 33.565, lng: 133.537, info: "美味しいラーメン"},
  {name: "そば処たかち", genre: "men", lat: 33.568, lng: 133.540, info: "手打ちそば"},
  {name: "うどん天", genre: "men", lat: 33.562, lng: 133.545, info: "讃岐うどん"},
  // 和食
  {name: "和食さくら", genre: "washoku", lat: 33.570, lng: 133.540, info: "新鮮な魚を使った和食"},
  {name: "お寿司高知", genre: "washoku", lat: 33.562, lng: 133.534, info: "地元のネタが自慢"},
  {name: "天ぷら匠", genre: "washoku", lat: 33.556, lng: 133.538, info: "揚げたて天ぷら"},
  // 中華
  {name: "中華料理龍", genre: "chuka", lat: 33.558, lng: 133.525, info: "本格中華"},
  {name: "中華飯店福", genre: "chuka", lat: 33.555, lng: 133.533, info: "ランチが人気"},
  {name: "餃子の王様", genre: "chuka", lat: 33.560, lng: 133.528, info: "手作り餃子"},
  // 洋食
  {name: "洋食カフェ", genre: "western", lat: 33.562, lng: 133.530, info: "オムライスが人気"},
  {name: "洋食レストラン海", genre: "western", lat: 33.560, lng: 133.535, info: "ハンバーグが美味しい"},
  {name: "ステーキ館", genre: "western", lat: 33.558, lng: 133.540, info: "肉厚ステーキ"},
  // 高知の特産品
  {name: "土佐の味処", genre: "kochisan", lat: 33.559, lng: 133.528, info: "カツオのたたきが名物"},
  {name: "高知特産カフェ", genre: "kochisan", lat: 33.561, lng: 133.529, info: "地元食材ランチ"},
  {name: "カツオ屋本店", genre: "kochisan", lat: 33.565, lng: 133.533, info: "カツオ料理専門"},
  // スイーツ
  {name: "スイーツ工房", genre: "sweets", lat: 33.561, lng: 133.532, info: "手作りケーキ"},
  {name: "カフェ和スイーツ", genre: "sweets", lat: 33.564, lng: 133.536, info: "抹茶スイーツが人気"},
  {name: "パティスリー高知", genre: "sweets", lat: 33.558, lng: 133.531, info: "フルーツタルトが美味しい"}
];

let markers = [];

// マーカー表示関数
function showMarkers(selectedGenre) {
  // 既存マーカー削除
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const selectedShops = shops.filter(shop => shop.genre === selectedGenre);

  selectedShops.forEach(shop => {
    const marker = L.marker([shop.lat, shop.lng], {
      icon: L.divIcon({
        className: 'marker-label',
        html: shop.name
      })
    }).addTo(map).bindPopup(`<b>${shop.name}</b><br>${shop.info}`);
    markers.push(marker);
  });

  // 地図中心を平均座標に
  if (selectedShops.length > 0) {
    const avgLat = selectedShops.reduce((sum, s) => sum + s.lat, 0) / selectedShops.length;
    const avgLng = selectedShops.reduce((sum, s) => sum + s.lng, 0) / selectedShops.length;
    map.setView([avgLat, avgLng], 12);
  }
}

// ボタン押下
document.getElementById('showBtn').addEventListener('click', () => {
  const selectedGenre = document.getElementById('genre').value;
  showMarkers(selectedGenre);
});
