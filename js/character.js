// 角色立绘数据
const characters = [
    {
        id: 1,
        image: 'images1/character1.png',
        name: '角色1'
    },
    {
        id: 2,
        image: 'images1/character2.png',
        name: '角色2'
    },
    {
        id: 3,
        image: 'images1/character3.png',
        name: '角色3'
    }
];

// 获取随机角色
function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

// 更新角色立绘
function updateCharacter() {
    const character = getRandomCharacter();
    const characterContainer = document.querySelector('.character-container');
    if (characterContainer) {
        // 创建新的图片元素
        const newImage = new Image();
        newImage.src = character.image;
        newImage.alt = character.name;
        newImage.classList.add('character-image');
        
        // 添加淡入淡出效果
        characterContainer.style.opacity = '0';
        setTimeout(() => {
            characterContainer.innerHTML = '';
            characterContainer.appendChild(newImage);
            characterContainer.style.opacity = '1';
        }, 300);
    }
}

// 页面加载时更新角色
document.addEventListener('DOMContentLoaded', updateCharacter);

// 监听页面可见性变化
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateCharacter();
    }
});

// 导出函数供其他文件使用
window.updateCharacter = updateCharacter; 