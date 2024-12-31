function createFirework() {
    // 创建烟花主体
    const firework = document.createElement('div');
    firework.style.position = 'absolute';
    firework.style.width = '4px';
    firework.style.height = '4px';
    firework.style.borderRadius = '50%';
    firework.style.zIndex = '1000';  // 确保在最上层
    
    // 随机位置
    const startX = Math.random() * window.innerWidth;
    firework.style.left = startX + 'px';
    firework.style.bottom = '0';
    
    // 随机颜色
    const colors = ['#ff0', '#f0f', '#0ff', '#ff4500', '#7fff00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.backgroundColor = color;
    firework.style.boxShadow = `0 0 6px ${color}`;
    
    document.querySelector('.fireworks').appendChild(firework);
    
    // 第一阶段：上升动画
    const riseAnimation = firework.animate([
        {
            transform: 'translateY(0)',
            opacity: 1
        },
        {
            transform: 'translateY(-400px)',
            opacity: 1
        }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    // 当上升动画结束时，创建爆炸效果
    riseAnimation.onfinish = () => {
        firework.remove();
        createExplosion(startX, window.innerHeight - 400, color);
    };
}

function createExplosion(x, y, color) {
    // 创建多个粒子形成爆炸效果
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        document.querySelector('.fireworks').appendChild(particle);
        
        // 随机角度和距离
        const angle = (i * 12) + Math.random() * 30;
        const distance = 50 + Math.random() * 100;
        const rad = angle * Math.PI / 180;
        
        // 爆炸动画
        const animation = particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(rad) * distance}px, ${Math.sin(rad) * distance}px) scale(0.5)`,
                opacity: 0.7
            },
            {
                transform: `translate(${Math.cos(rad) * (distance + 50)}px, ${Math.sin(rad) * (distance + 50)}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 900,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }
}

// 每隔一段时间创建新的烟花
setInterval(createFirework, 1000);

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // 创建星星
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 6}s`;
        container.appendChild(star);
    }
    
    // 创建气泡
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
        container.appendChild(bubble);
        
        // 动画结束后移除气泡
        setTimeout(() => {
            bubble.remove();
        }, 8000);
    }, 500);
}

// 初始化浮动元素
createFloatingElements(); 