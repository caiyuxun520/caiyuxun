// 文章数据示例
const articlesData = [
  {
    id: 'ART-001',
    title: '全新SideStory登场',
    author: '才羽尋',
    date: '2025-5-31',
    category: '活动',
    summary: 'SideStory「红丝绒」限时活动即将开启',
    content: '<p>SideStory「红丝绒」限时活动即将开启 一、全新SideStory「红丝绒」，活动关卡开启   二、【永不落幕】限时寻访开启  三、新干员登场，信赖获取提升  四、集成回顾「重返古堡」活动开启  五、材料跳转功能优化  六、【时代】&【命途迭代】系列，新装限时上架  七、复刻时装限时上架  八、新增【蓝卡坞摄影棚】主题家具，限时获取  九、礼包限时上架  十、采购中心【高级凭证区】&【通用凭证区】可兑换内容追加  更多活动内容请持续关注《明日方舟》游戏内公告及官方公告。</p>',
    cover: 'images3/article1.jpg',
    readTime: '5分钟阅读',
    tags: ['活动']
  },
  {
    id: 'ART-002',
    title: '瑞普赛斯复活，旨在摧毁泰拉大陆',
    author: '才羽尋',
    date: '2025-04-01',
    category: '生活',
    summary: '瑞普赛斯在源石中诞生，凯尔希医生命悬一线',
    content: '<p>"你好，我叫普瑞赛斯，科学家兼语言学者，开普勒号空间站的行星观测者，喜欢记录群星之间的低语。很高兴遇见你——在这片寂静的宇宙里，你我每一次相遇都是亿万光年编织的奇迹。""它很美，对吗？ 这是恒星临终时的歌谣。当一颗垂死的巨恒星坍缩，它的光芒在爆发中化作绚烂的叹息，抛洒出碳、氧、铁……这些尘埃最终凝结成行星、海洋，以及你我。""我们本就是星辰的遗民，是宇宙漫长光阴里所写下的诗集。""睡吧我的博士，只当是一场长远的休息，就像我们在漫长岁月中的小憩一样。不论经历了多少宇宙纪元的流转，还是见证了脉冲星每一次韵律脉动。在那时间的尽头，我们终再次相见。""但，我希望你的梦境里有我～"</p>',
    cover: 'images3/article2.jpg',
    readTime: '10分钟阅读',
    tags: ['生活']
  }
];

let filteredArticles = [...articlesData];
let currentPage = 1;
const pageSize = 3;
let currentCategory = '全部';
let currentSearch = '';
let currentDate = '';

function renderArticles() {
  const articlesGrid = document.querySelector('.articles-grid');
  // 筛选
  filteredArticles = articlesData.filter(article => {
    let match = true;
    if (currentCategory !== '全部' && article.category !== currentCategory) match = false;
    if (currentSearch && !article.title.includes(currentSearch)) match = false;
    if (currentDate && article.date !== currentDate) match = false;
    return match;
  });
  // 分页
  const total = filteredArticles.length;
  const totalPages = Math.ceil(total / pageSize);
  if(currentPage > totalPages) currentPage = totalPages || 1;
  const start = (currentPage-1)*pageSize;
  const end = start+pageSize;
  const pageData = filteredArticles.slice(start, end);
  // 渲染
  articlesGrid.innerHTML = '';
  pageData.forEach(article => {
    articlesGrid.innerHTML += `
      <article class="article-card">
        <div class="article-image">
          <img src="${article.cover}" alt="文章配图">
        </div>
        <div class="article-content">
          <div class="article-meta">
            <span class="article-date">${article.date}</span>
            <span class="article-category">${article.category}</span>
          </div>
          <h2 class="article-title">${article.title}</h2>
          <p class="article-excerpt">${article.summary}</p>
          <div class="article-footer">
            <span class="read-time">${article.readTime}</span>
            <button class="read-more" data-id="${article.id}">阅读更多</button>
          </div>
        </div>
      </article>
    `;
  });
  // 分页导航
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pagination = document.querySelector('.pagination');
  if (!pagination) return;
  let html = `<button class="page-btn prev" ${currentPage===1?'disabled':''}>上一页</button><div class="page-numbers">`;
  for(let i=1;i<=totalPages;i++){
    html += `<span class="page-number${i===currentPage?' active':''}">${i}</span>`;
  }
  html += `</div><button class="page-btn next" ${currentPage===totalPages||totalPages===0?'disabled':''}>下一页</button>`;
  pagination.innerHTML = html;
  // 事件
  pagination.querySelector('.prev').onclick = function(){if(currentPage>1){currentPage--;renderArticles();}};
  pagination.querySelector('.next').onclick = function(){if(currentPage<totalPages){currentPage++;renderArticles();}};
  pagination.querySelectorAll('.page-number').forEach((el,idx)=>{
    el.onclick = function(){currentPage=idx+1;renderArticles();}
  });
}

// 搜索
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
searchBtn.onclick = function() {
  currentSearch = searchInput.value.trim();
  currentPage = 1;
  renderArticles();
};
searchInput.onkeydown = function(e){if(e.key==='Enter'){searchBtn.onclick();}};

// 日期筛选
const dateFilter = document.getElementById('dateFilter');
dateFilter.onchange = function() {
  currentDate = this.value;
  currentPage = 1;
  renderArticles();
};

// 标签筛选
const tagEls = document.querySelectorAll('.filter-tag');
tagEls.forEach(tagEl => {
  tagEl.onclick = function() {
    tagEls.forEach(t=>t.classList.remove('active'));
    this.classList.add('active');
    currentCategory = this.textContent;
    currentPage = 1;
    renderArticles();
  };
});

// 阅读更多（文章详情弹窗）
document.querySelector('.articles-grid').onclick = function(e) {
  if(e.target.classList.contains('read-more')) {
    const id = e.target.dataset.id;
    const article = articlesData.find(a=>a.id===id);
    if(article) openModal(article);
  }
};

// 文章详情模态框
const articleModal = document.getElementById('articleModal');
const modalBody = articleModal.querySelector('.modal-body');
function openModal(article) {
  modalBody.innerHTML = `
    <h2>${article.title}</h2>
    <div class="modal-meta">
      <span>${article.author}</span> · <span>${article.date}</span> · <span>${article.category}</span>
    </div>
    <div class="modal-content">${article.content}</div>
    <div class="modal-tags">${article.tags.map(t=>`<span class='tag'>${t}</span>`).join(' ')}</div>
  `;
  articleModal.style.display = 'block';
}
articleModal.querySelector('.close-modal').onclick = function() {
  articleModal.style.display = 'none';
};

// 初始化
renderArticles(); 