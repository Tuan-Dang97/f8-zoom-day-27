const players = [
    {
        id: 1,
        name: "Minh",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
    },
    {
        id: 2,
        name: "Linh",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"
    },
    {
        id: 3,
        name: "Đức",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop"
    },
    {
        id: 4,
        name: "Trang",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"
    }
];

let currentIndex = 0;
let isMoving = false;
let startX = 0;
let isDragging = false;

const cardStack = document.getElementById('cardStack');

function createCard(player) {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <div class="card-image" style="background-image: url('${player.image}')">
            <div class="card-name">${player.name}</div>
        </div>
    `;
    
    card.addEventListener('mousedown', startSwipe);
    card.addEventListener('mousemove', doSwipe);
    card.addEventListener('mouseup', endSwipe);
    
    card.addEventListener('touchstart', startSwipe);
    card.addEventListener('touchmove', doSwipe);
    card.addEventListener('touchend', endSwipe);
    
    return card;
}

function startSwipe(e) {
    if (isMoving) return;
    e.preventDefault();
    startX = e.clientX || e.touches[0].clientX;
    isDragging = true;
}

function doSwipe(e) {
    if (!isDragging) return;
    
    const moveX = (e.clientX || e.touches[0].clientX) - startX;
    const card = e.target.closest('.card');
    
    if (!card) return;
    
    card.style.transform = `translateX(${moveX}px) rotate(${moveX * 0.15}deg)`;
    
    if (moveX > 50) {
        card.style.background = 'lightgreen';
        card.style.boxShadow = '0 10px 20px rgba(0,255,0,0.2)';
    } else if (moveX < -50) {
        card.style.background = 'lightcoral';
        card.style.boxShadow = '0 10px 20px rgba(255,0,0,0.2)';
    } else {
        card.style.background = 'white';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
}

function endSwipe(e) {
    if (!isDragging) return;
    
    const moveX = (e.clientX || e.changedTouches[0].clientX) - startX;
    const card = e.target.closest('.card');
    
    if (!card) return;
    
    if (moveX > 100) {
        swipeRight(card);
    } else if (moveX < -100) {
        swipeLeft(card);
    } else {
        card.style.transition = 'transform 0.2s ease-out';
        card.style.transform = 'translateX(0) rotate(0deg)';
        card.style.background = 'white';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        
        setTimeout(() => {
            card.style.transition = '';
        }, 200);
    }
    
    startX = 0;
    isDragging = false;
}

function swipeLeft(card) {
    isMoving = true;    
    card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    card.style.transform = 'translateX(-400px) rotate(-45deg)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.remove();
        nextCard();
        isMoving = false;
    }, 300);
}

function swipeRight(card) {
    isMoving = true;    
    card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    card.style.transform = 'translateX(400px) rotate(45deg)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.remove();
        nextCard();
        isMoving = false;
    }, 300);
}

function nextCard() {
    currentIndex++;
    
    if (currentIndex >= players.length) {
        currentIndex = 0;
    }
    
    showCard();
}

function showCard() {
    const card = createCard(players[currentIndex]);
    cardStack.appendChild(card);
}

function start() {
    showCard();
}

start();