// Инициализация карты
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 18
}).addTo(map);

// Функция для заполнения карточки
function showIslandCard(island) {
    const card = document.getElementById('card');
    
    card.innerHTML = `
        <h2>${island.name}</h2>
        <div class="flag">${island.flag}</div>
        <p><strong>Страна:</strong> ${island.country}</p>
        <p><strong>Язык:</strong> ${island.language}</p>
        <p><strong>Площадь:</strong> ${island.area}</p>
        <hr style="border-color: #334155; margin: 15px 0;">
        <p><strong>История:</strong><br>${island.history}</p>
        <p style="margin-top: 10px;"><strong>💡 Факт:</strong><br>${island.funFact}</p>
    `;
    
    // Плавно перемещаем карту к острову
    map.flyTo(island.coords, 5, {
        animate: true,
        duration: 1.5
    });
}

// Добавляем маркеры на карту
islandsData.forEach(island => {
    const marker = L.marker(island.coords).addTo(map);
    
    marker.bindTooltip(island.name);
    
    marker.on('click', () => {
        showIslandCard(island);
    });
});