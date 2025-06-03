// 等待页面加载完成
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    updateDateTime();
    initializeNewsScroll();
    initializeToolbar();
});

// 初始化导航菜单
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        // 点击事件
        item.addEventListener('click', () => {
            const link = item.getAttribute('data-link');
            if (link) {
                // 添加过渡动画效果
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = link;
                }, 300);
            }
        });

        // 悬停音效
        item.addEventListener('mouseenter', () => {
            playHoverSound();
        });
    });
}

// 播放悬停音效
function playHoverSound() {
    const audio = new Audio('assets/hover.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {
        // 处理浏览器可能阻止自动播放的情况
        console.log('Audio autoplay was prevented');
    });
}

// 更新日期时间
function updateDateTime() {
    const dateElement = document.querySelector('.date');
    const timeElement = document.querySelector('.time');

    function update() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '/');
        const timeStr = now.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        dateElement.textContent = dateStr;
        timeElement.textContent = timeStr;
    }

    // 初始更新
    update();
    // 每秒更新一次
    setInterval(update, 1000);
}

// 初始化新闻滚动
function initializeNewsScroll() {
    const newsItems = [
        { tag: '新会员时间', text: '新的文章已发布' },
        { tag: '最新动态', text: '图片专辑更新：都市印象' },
        { tag: '系统公告', text: '网站功能优化完成' }
    ];

    const newsContent = document.querySelector('.news-content');
    let currentIndex = 0;

    function updateNews() {
        const item = newsItems[currentIndex];
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <span class="news-tag">${item.tag}</span>
            <span class="news-text">${item.text}</span>
        `;

        // 添加淡入淡出效果
        newsContent.style.opacity = '0';
        setTimeout(() => {
            newsContent.innerHTML = '';
            newsContent.appendChild(newsItem);
            newsContent.style.opacity = '1';
        }, 300);

        currentIndex = (currentIndex + 1) % newsItems.length;
    }

    // 初始更新
    updateNews();
    // 每5秒更新一次
    setInterval(updateNews, 5000);
}

// 初始化工具栏
function initializeToolbar() {
    // 添加按钮点击事件
    const addBtns = document.querySelectorAll('.add-btn');
    addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            playHoverSound();
            // 这里可以添加具体的添加逻辑
        });
    });

    // 工具按钮点击事件
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playHoverSound();
            // 这里可以添加具体的工具按钮功能
        });
    });
}

// 添加页面载入动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加页面切换动画
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    }
});

// 留言板本地存储功能
if (document.getElementById('messageForm')) {
    // 分页相关变量
    let currentPage = 1;
    const pageSize = 3;

    function getMessages() {
        return JSON.parse(localStorage.getItem('messages') || '[]');
    }
    function saveMessages(messages) {
        localStorage.setItem('messages', JSON.stringify(messages));
    }
    function getTotalPages(messages) {
        return Math.max(1, Math.ceil(messages.length / pageSize));
    }
    function renderMessages() {
        const messagesList = document.querySelector('.messages-list');
        // 不再获取sortMessages，直接按时间顺序（最早到最新）
        let messages = getMessages();
        let html = '';
        if (messages.length === 0) {
            html = messagesList.innerHTML;
        } else {
            const totalPages = getTotalPages(messages);
            if (currentPage > totalPages) currentPage = totalPages;
            const startIdx = (currentPage - 1) * pageSize;
            const endIdx = startIdx + pageSize;
            const pageMessages = messages.slice(startIdx, endIdx);
            pageMessages.forEach((msg, idx) => {
                html += `<div class=\"message-item\" data-idx=\"${startIdx + idx}\">\n                    <div class=\"message-header\">\n                        <div class=\"message-info\">\n                            <span class=\"message-author\">${msg.name}</span>\n                            <span class=\"message-date\">${msg.date}</span>\n                        </div>\n                        <div class=\"message-actions\">\n                            <button class=\"reply-btn\">回复</button>\n                            <button class=\"delete-btn\">删除</button>\n                        </div>\n                    </div>\n                    <div class=\"message-content\"><p>${msg.message}</p></div>\n                    <div class=\"message-replies\">`;
                if (msg.replies && msg.replies.length) {
                    msg.replies.forEach(reply => {
                        html += `<div class=\"reply-item\">\n                            <div class=\"reply-header\">\n                                <span class=\"reply-author\">${reply.name}</span>\n                                <span class=\"reply-date\">${reply.date}</span>\n                            </div>\n                            <div class=\"reply-content\"><p>${reply.message}</p></div>\n                        </div>`;
                    });
                }
                html += `</div></div>`;
            });
        }
        // 渲染分页
        const totalPages = getTotalPages(messages);
        let paginationHtml = `<div class=\"pagination\">\n`;
        paginationHtml += `<button class=\"page-btn prev\" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>\n`;
        paginationHtml += `<div class=\"page-numbers\">`;
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `<span class=\"page-number${i === currentPage ? ' active' : ''}\">${i}</span>`;
        }
        paginationHtml += `</div>\n`;
        paginationHtml += `<button class=\"page-btn next\" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>\n`;
        paginationHtml += `</div>`;
        messagesList.innerHTML = html + paginationHtml;
    }
    // 提交留言
    document.getElementById('messageForm').onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim() || '匿名';
        const message = document.getElementById('message').value.trim();
        if (!message) return;
        const date = new Date().toLocaleString();
        const messages = getMessages();
        messages.push({ name, message, date, replies: [] });
        saveMessages(messages);
        this.reset();
        currentPage = getTotalPages(getMessages()); // 跳到最后一页
        renderMessages();
    };
    // 回复
    document.querySelector('.messages-list').onclick = function(e) {
        if (e.target.classList.contains('reply-btn')) {
            const idx = e.target.closest('.message-item').dataset.idx;
            const replyModal = document.getElementById('replyModal');
            replyModal.style.display = 'block';
            replyModal.dataset.idx = idx;
        }
        // 删除按钮
        if (e.target.classList.contains('delete-btn')) {
            const idx = parseInt(e.target.closest('.message-item').dataset.idx);
            let messages = getMessages();
            if (confirm('确定要删除这条留言吗？')) {
                messages.splice(idx, 1);
                saveMessages(messages);
                // 如果当前页已无留言，自动跳到上一页
                const totalPages = getTotalPages(messages);
                if (currentPage > totalPages) currentPage = totalPages;
                renderMessages();
            }
        }
        // 分页按钮
        if (e.target.classList.contains('page-btn')) {
            if (e.target.classList.contains('prev') && currentPage > 1) {
                currentPage--;
                renderMessages();
            }
            if (e.target.classList.contains('next')) {
                const messages = getMessages();
                const totalPages = getTotalPages(messages);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderMessages();
                }
            }
        }
        // 点击页码跳转
        if (e.target.classList.contains('page-number')) {
            const page = parseInt(e.target.textContent);
            if (!isNaN(page)) {
                currentPage = page;
                renderMessages();
            }
        }
    };
    document.querySelector('.close-modal').onclick = function() {
        document.getElementById('replyModal').style.display = 'none';
    };
    document.getElementById('replyForm').onsubmit = function(e) {
        e.preventDefault();
        const idx = document.getElementById('replyModal').dataset.idx;
        const replyText = document.getElementById('replyText').value.trim();
        if (!replyText) return;
        const messages = getMessages();
        messages[idx].replies = messages[idx].replies || [];
        messages[idx].replies.push({ name: '站长', message: replyText, date: new Date().toLocaleString() });
        saveMessages(messages);
        document.getElementById('replyModal').style.display = 'none';
        document.getElementById('replyForm').reset();
        renderMessages();
    };
    // 初始渲染
    renderMessages();
}

// 广告轮播
const adList = [
    { type: 'image', src: 'images3/ad1.jpg', link: 'https://ak.hypergryph.com', alt: '广告1' },
    { type: 'image', src: 'images3/ad2.jpg', link: 'https://www.bilibili.com', alt: '广告2' },
    { type: 'video', src: 'video/ad1.mp4', link: 'https://m.kfc.com.cn', alt: '广告视频' }
];
let adIndex = 0;
let adTimer = null;

function renderAd() {
    const adContent = document.getElementById('adContent');
    if (!adContent) return;
    const ad = adList[adIndex];
    let html = '';
    if (ad.type === 'image') {
        html = `<a href="${ad.link}" target="_blank"><img src="${ad.src}" alt="${ad.alt}" style="width:220px;height:124px;object-fit:cover;border-radius:12px;"></a>`;
    } else if (ad.type === 'video') {
        html = `<a href="${ad.link}" target="_blank"><video src="${ad.src}" autoplay loop muted style="width:220px;height:124px;object-fit:cover;border-radius:12px;"></video></a>`;
    }
    adContent.innerHTML = html;
}
function nextAd() {
    adIndex = (adIndex + 1) % adList.length;
    renderAd();
}
function prevAd() {
    adIndex = (adIndex - 1 + adList.length) % adList.length;
    renderAd();
}
function startAdTimer() {
    adTimer = setInterval(nextAd, 5000);
}
function stopAdTimer() {
    clearInterval(adTimer);
}
if (document.getElementById('adNext')) {
    document.getElementById('adNext').onclick = function() { stopAdTimer(); nextAd(); startAdTimer(); };
    document.getElementById('adPrev').onclick = function() { stopAdTimer(); prevAd(); startAdTimer(); };
    document.getElementById('adClose').onclick = function() {
        document.getElementById('adCarousel').style.display = 'none';
        stopAdTimer();
    };
    renderAd();
    startAdTimer();
} 