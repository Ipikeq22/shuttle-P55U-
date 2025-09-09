// 圖片輪播功能
const images = [
  'pic/0p.jpg',
  'pic/1p.jpg',
  'pic/2p.jpg',
  'pic/3p.jpg',
  'pic/4p.jpg',
  'pic/5p.jpg',
  'pic/6p.jpg',
  'pic/7p.jpg',
  'pic/8p.jpg',
  'pic/9p.jpg',
  'pic/a10.png'
];

let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// 設置主圖片
function setMainImage(index) {
  currentImageIndex = index;
  const mainImg = document.getElementById('mainImg');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  mainImg.src = images[index];
  
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  
  // 滾動縮圖到可見位置（手機優化）
  if (window.innerWidth <= 768) {
    const activeThumb = thumbnails[index];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }
}

// 切換圖片（前一張/後一張）
function changeImage(direction) {
  currentImageIndex += direction;
  
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  
  setMainImage(currentImageIndex);
}

// 觸控滑動支援
function handleTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50; // 最小滑動距離
  const swipeDistance = touchEndX - touchStartX;
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      changeImage(-1); // 向右滑動，顯示前一張
    } else {
      changeImage(1); // 向左滑動，顯示下一張
    }
  }
}

// 鍵盤控制（桌面版）
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    changeImage(-1);
  } else if (e.key === 'ArrowRight') {
    changeImage(1);
  }
});

// 為主圖片添加觸控事件
document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.querySelector('.main-image');
  if (mainImage) {
    mainImage.addEventListener('touchstart', handleTouchStart, { passive: true });
    mainImage.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
});

// Tab 切換
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// 數量控制
function changeQuantity(change) {
  const quantityInput = document.getElementById('quantity');
  let currentValue = parseInt(quantityInput.value);
  let newValue = currentValue + change;
  
  if (newValue >= 1 && newValue <= 10) {
    quantityInput.value = newValue;
  }
}

// 型號選擇和價格更新
const variantPrices = {
  'p55u': { current: 24900, original: 27900 },
  'p55u3': { current: 29900, original: 32900 },
  'p55u5': { current: 39900, original: 42900 }
};

document.addEventListener('DOMContentLoaded', () => {
  const variantInputs = document.querySelectorAll('input[name="variant"]');
  variantInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const selectedVariant = e.target.value;
      const prices = variantPrices[selectedVariant];
      
      document.getElementById('currentPrice').textContent = `NT$ ${prices.current.toLocaleString()}`;
      document.querySelector('.original-price').textContent = `NT$ ${prices.original.toLocaleString()}`;
      
      const discount = prices.original - prices.current;
      document.querySelector('.discount').textContent = `省 NT$ ${discount.toLocaleString()}`;
    });
  });
});

// YouTube 影片播放功能
function playVideo() {
  const preview = document.querySelector('.video-preview');
  const iframe = document.getElementById('video-iframe');
  const iframeElement = iframe.querySelector('iframe');
  
  // 設定 iframe src
  iframeElement.src = 'https://www.youtube.com/embed/B5HFzK8AkpQ?autoplay=1';
  
  // 隱藏預覽圖，顯示 iframe
  preview.style.display = 'none';
  iframe.style.display = 'block';
}

// 手機導航優化
function optimizeForMobile() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // 為按鈕添加觸控反饋
    const buttons = document.querySelectorAll('button, .thumbnail, .tab');
    buttons.forEach(button => {
      button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      }, { passive: true });
      
      button.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });
    });
    
    // 優化縮圖滾動
    const thumbnailContainer = document.querySelector('.thumbnails');
    if (thumbnailContainer) {
      thumbnailContainer.style.scrollBehavior = 'smooth';
    }
  }
}

// 視窗大小改變時重新優化
window.addEventListener('resize', () => {
  optimizeForMobile();
  
  // 重新設置當前圖片以確保縮圖正確顯示
  if (window.innerWidth <= 768) {
    setMainImage(currentImageIndex);
  }
});

// 防止雙擊縮放（iOS Safari）
document.addEventListener('touchend', function(e) {
  const now = new Date().getTime();
  const timeSince = now - lastTouchEnd;
  
  if (timeSince < 300 && timeSince > 0) {
    e.preventDefault();
  }
  
  lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;

// 平滑滾動到錨點
function smoothScrollTo(element) {
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Tab切換時滾動到頂部（手機版）
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const tabContent = document.querySelector('.tab-content.active');
        if (tabContent) {
          smoothScrollTo(tabContent);
        }
      }, 100);
    }
  });
});

// 圖片懶加載優化
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  setMainImage(0);
  optimizeForMobile();
  
  // 如果支援 Intersection Observer，啟用懶加載
  if ('IntersectionObserver' in window) {
    lazyLoadImages();
  }
  
  // 預載下一張圖片（性能優化）
  if (images.length > 1) {
    const nextImg = new Image();
    nextImg.src = images[1];
  }
});

// 添加載入狀態指示器
function showLoading() {
  const mainImg = document.getElementById('mainImg');
  mainImg.style.opacity = '0.5';
}

function hideLoading() {
  const mainImg = document.getElementById('mainImg');
  mainImg.style.opacity = '1';
}

// 圖片載入優化
document.getElementById('mainImg').addEventListener('load', hideLoading);
document.getElementById('mainImg').addEventListener('loadstart', showLoading);

