const galleryData = [
    {
        id: 'AK-P-001',
        type: 'image',
        category: 'personal',
        src: 'images2/loges.jpg',
        date: '2024-03-30',
        description: '干员资料档案',
        tags: ['个人记录']
    },
    {
        id: 'AK-P-002',
        type: 'image',
        category: 'personal',
        src: 'images2/铃兰.jpg',
        date: '2023-06-20',
        description: '干员资料档案',
        tags: ['个人记录']
    },
    {
        id: 'AK-P-003',
        type: 'image',
        category: 'personal',
        src: 'images2/澄闪.jpg',
        date: '2024-07-17',
        description: '干员资料档案',
        tags: ['个人记录']
    },
    {
        id: 'AK-P-004',
        type: 'image',
        category: 'personal',
        src: 'images2/艾雅法拉.jpg',
        date: '2019-11-23',
        description: '干员资料档案',
        tags: ['个人记录']
    },
    {
        id: 'AK-P-005',
        type: 'image',
        category: 'personal',
        src: 'images2/凯尔希.jpg',
        date: '2020-04-28',
        description: '干员资料档案',
        tags: ['个人记录']
    },
    {
        id: 'AK-P-006',
        type: 'image',
        category: 'personal',
        src: 'images2/林.jpg',
        date: '2024-01-26',
        description: '干员资料档案',
        tags: ['个人记录']
    },
    {
        id: 'AK-P-007',
        type: 'image',
        category: 'personal',
        src: 'images2/维什戴尔.jpg',
        date: '2024-05-03',
        description: '干员资料档案',
        tags: ['个人记录']
    },
    {
        id: 'AK-T-001',
        type: 'image',
        category: 'work',
        src: 'images2/火山旅梦.jpg',
        date: '2025-05-01',
        description: '特别事务记录',
        tags: ['工作相关']
    },
    {
    id: 'AK-T-002',
    type: 'image',
    category: 'work',
    src: 'images2/追迹落日以西.jpg',
    date: '2022-04-30',
    description: '特别事务记录',
    tags: ['工作相关']
    },
    {
        id: 'AK-T-003',
        type: 'image',
        category: 'work',
        src: 'images2/众生行迹.jpg',
        date: '2024-12-01',
        description: '特别事务记录',
        tags: ['工作相关']
        },
        {
            id: 'AK-T-004',
            type: 'image',
            category: 'work',
            src: 'images2/生路.jpg',
            date: '2025-10-12',
            description: '特别事务记录',
            tags: ['工作相关']
            },
            {
                id: 'AK-T-005',
                type: 'image',
                category: 'work',
                src: 'images2/愚人船.jpg',
                date: '2023-09-06',
                description: '特别事务记录',
                tags: ['工作相关']
                },
    {
        id: 'AK-G-001',
        type: 'image',
        category: 'collection',
        src: 'images3/1.png',
        date: '2023-05-02',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-002',
        type: 'image',
        category: 'collection',
        src: 'images3/2.jpg',
        date: '2022-09-22',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-003',
        type: 'image',
        category: 'collection',
        src: 'images3/3.jpg',
        date: '2024-08-13',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-004',
        type: 'image',
        category: 'collection',
        src: 'images3/4.jpg',
        date: '2025-03-01',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-005',
        type: 'image',
        category: 'collection',
        src: 'images3/5.jpg',
        date: '2019-09-19',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-006',
        type: 'image',
        category: 'collection',
        src: 'images3/6.jpg',
        date: '2024-09-04',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-007',
        type: 'image',
        category: 'collection',
        src: 'images3/7.jpg',
        date: '2023-08-11',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-008',
        type: 'image',
        category: 'collection',
        src: 'images3/8.jpg',
        date: '2023-07-27',
        description: '收藏图片',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-009',
        type: 'video',
        category: 'collection',
        src: 'video/9.mp4',
        date: '2023-06-22',
        description: '收藏视频',
        tags: ['收藏图片']
    },
    {
        id: 'AK-G-010',
        type: 'video',
        category: 'collection',
        src: 'video/10.mp4',
        date: '2022-05-25',
        description: '收藏视频',
        tags: ['收藏图片']
    }
 
];

let filteredData = [...galleryData];
let currentView = 'grid';
let currentCategory = 'all';
let currentYear = '';
let currentMonth = '';
let currentSearch = '';
let pageSize = 8;
let currentPage = 1;
let modalIndex = 0;


function renderGallery() {
    const imageGrid = document.querySelector('.image-grid');
    // 筛选
    filteredData = galleryData.filter(item => {
        let match = true;
        if (currentCategory !== 'all' && item.category !== currentCategory) match = false;
        if (currentYear && !item.date.startsWith(currentYear)) match = false;
        if (currentMonth && item.date.slice(5,7) !== currentMonth) match = false;
        if (currentSearch && !(item.id.includes(currentSearch) || item.description.includes(currentSearch))) match = false;
        return match;
    });
    // 分页
    const total = filteredData.length;
    const totalPages = Math.ceil(total / pageSize);
    if(currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage-1)*pageSize;
    const end = start+pageSize;
    const pageData = filteredData.slice(start, end);
    // 统计
    document.getElementById('imageCount').textContent = galleryData.filter(i=>i.type==='image').length;
    document.getElementById('videoCount').textContent = galleryData.filter(i=>i.type==='video').length;
    // 渲染
    imageGrid.innerHTML = '';
    pageData.forEach((item, idx) => {
        let mediaHtml = item.type==='image' ? `<img src="${item.src}" alt="${item.id}">` : `<video src="${item.src}" controls style="max-width:100%;max-height:180px;"></video>`;
        imageGrid.innerHTML += `
        <div class="image-item" data-idx="${start+idx}" data-category="${item.category}">
            <div class="item-frame">
                <div class="item-content">
                    ${mediaHtml}
                    <div class="item-info">
                        <h3>档案编号：${item.id}</h3>
                        <p class="date">记录时间：${item.date}</p>
                        <p class="description">${item.description}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="action-btn view">查看</button>
                    <button class="action-btn download">下载</button>
                    <button class="action-btn share">分享</button>
                </div>
            </div>
        </div>`;
    });
    // 分页导航
    const pagination = document.getElementById('pagination');
    if (pagination) {
        pagination.innerHTML = `
            <button id="prevPageBtn" class="rhodes-btn" ${currentPage===1?'disabled':''}>上一页</button>
            <span class="page-info">第 ${currentPage} / ${totalPages} 页</span>
            <button id="nextPageBtn" class="rhodes-btn" ${currentPage===totalPages||totalPages===0?'disabled':''}>下一页</button>
        `;
        document.getElementById('prevPageBtn').onclick = function() {
            if(currentPage>1){currentPage--;renderGallery();}
        };
        document.getElementById('nextPageBtn').onclick = function() {
            if(currentPage<totalPages){currentPage++;renderGallery();}
        };
    }
}

function renderAd() {
    const adContent = document.getElementById('adContent');
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

// 分类点击
const categoryList = document.querySelectorAll('.category-list li');
categoryList.forEach(li => {
    li.onclick = function() {
        categoryList.forEach(l=>l.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.dataset.category;
        currentPage = 1;
        renderGallery();
    };
});
// 年月筛选
const yearFilter = document.getElementById('yearFilter');
const monthFilter = document.getElementById('monthFilter');
// 填充年份
const years = Array.from(new Set(galleryData.map(i=>i.date.slice(0,4))));
years.forEach(y=>{
    let opt = document.createElement('option');
    opt.value = y; opt.textContent = y;
    yearFilter.appendChild(opt);
});
yearFilter.onchange = function() {
    currentYear = this.value;
    currentPage = 1;
    renderGallery();
};
monthFilter.onchange = function() {
    currentMonth = this.value;
    currentPage = 1;
    renderGallery();
};
// 填充月份
for(let m=1;m<=12;m++){
    let mm = m.toString().padStart(2,'0');
    let opt = document.createElement('option');
    opt.value = mm; opt.textContent = mm;
    monthFilter.appendChild(opt);
}
// 搜索
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-btn');
searchBtn.onclick = function() {
    currentSearch = searchInput.value.trim();
    currentPage = 1;
    renderGallery();
};
searchInput.onkeydown = function(e){if(e.key==='Enter'){searchBtn.onclick();}};
// 视图切换
const modeBtns = document.querySelectorAll('.mode-btn');
modeBtns.forEach(btn=>{
    btn.onclick = function() {
        modeBtns.forEach(b=>b.classList.remove('active'));
        this.classList.add('active');
        currentView = this.dataset.mode;
        document.querySelector('.image-grid').className = 'image-grid '+currentView+'-view';
    };
});
// 查看/下载/分享
const imageGrid = document.querySelector('.image-grid');
imageGrid.onclick = function(e) {
    const item = e.target.closest('.image-item');
    if (!item) return;
    const idx = parseInt(item.dataset.idx);
    if (e.target.classList.contains('view')) {
        openModal(idx);
    }
    if (e.target.classList.contains('download')) {
        const data = filteredData[idx-(currentPage-1)*pageSize];
        if(data.type==='image'){
            const a = document.createElement('a');
            a.href = data.src;
            a.download = data.id+data.src.slice(data.src.lastIndexOf('.'));
            document.body.appendChild(a);a.click();a.remove();
        }else if(data.type==='video'){
            window.open(data.src);
        }
    }
    if (e.target.classList.contains('share')) {
        const data = filteredData[idx-(currentPage-1)*pageSize];
        navigator.clipboard.writeText(location.origin+'/'+data.src).then(()=>{
            alert('已复制分享链接！');
        });
    }
};
// 模态框
const mediaModal = document.getElementById('mediaModal');
const mediaView = mediaModal.querySelector('.media-view');
const mediaTitle = mediaModal.querySelector('.title');
const mediaDate = mediaModal.querySelector('.date');
const mediaDesc = mediaModal.querySelector('.description');
const mediaTags = mediaModal.querySelector('.tags');
function openModal(idx) {
    modalIndex = idx;
    const data = filteredData[idx-(currentPage-1)*pageSize];
    mediaView.innerHTML = data.type==='image' ? `<img src="${data.src}" style="max-width:100%;max-height:400px;">` : `<video src="${data.src}" controls autoplay style="max-width:100%;max-height:400px;"></video>`;
    mediaTitle.textContent = '档案编号：'+data.id;
    mediaDate.textContent = '记录时间：'+data.date;
    mediaDesc.textContent = data.description;
    mediaTags.innerHTML = data.tags.map(t=>`<span class='tag'>${t}</span>`).join(' ');
    mediaModal.style.display = 'block';
}
mediaModal.querySelector('.close-modal').onclick = function() {
    mediaModal.style.display = 'none';
};
mediaModal.querySelector('.nav-btn.prev').onclick = function() {
    if(modalIndex>0){openModal(modalIndex-1);}
};
mediaModal.querySelector('.nav-btn.next').onclick = function() {
    if(modalIndex<filteredData.length-1){openModal(modalIndex+1);}
};
// 实时时间和日期
function updateDateTime() {
    const timeEl = document.getElementById('currentTime');
    const dateEl = document.getElementById('currentDate');
    function update() {
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
        dateEl.textContent = now.toLocaleDateString('zh-CN');
    }
    update();
    setInterval(update, 1000);
}
updateDateTime();
// 视频播放时自动静音背景音乐
function handleMediaSound() {
    const bgVideo = document.getElementById('bgVideo');
    // 监听所有视频
    document.addEventListener('play', function(e) {
        if (e.target.tagName === 'VIDEO' && e.target !== bgVideo) {
            bgVideo.muted = true;
        }
    }, true);
    document.addEventListener('pause', function(e) {
        if (e.target.tagName === 'VIDEO' && e.target !== bgVideo) {
            // 检查是否还有其他视频在播放
            const playing = Array.from(document.querySelectorAll('video')).some(
                v => v !== bgVideo && !v.paused && !v.ended
            );
            if (!playing) bgVideo.muted = false;
        }
    }, true);
    document.addEventListener('ended', function(e) {
        if (e.target.tagName === 'VIDEO' && e.target !== bgVideo) {
            // 检查是否还有其他视频在播放
            const playing = Array.from(document.querySelectorAll('video')).some(
                v => v !== bgVideo && !v.paused && !v.ended
            );
            if (!playing) bgVideo.muted = false;
        }
    }, true);
}
handleMediaSound();
// 初始化
renderGallery();
renderAd();
startAdTimer(); 