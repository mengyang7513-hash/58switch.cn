/* ==========================================================
   海上数码 · 共享脚本
   图标 / 购物车(跨页 localStorage) / Toast / 灯箱 / 导航 / 滚动动画
   ========================================================== */

/* ---------- 内联 SVG 图标 ---------- */
const ICON = {
  game:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M7 12h4M9 10v4M16 11h.01M18.5 13.5h.01"/></svg>',
  chip:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  sd:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="16" rx="2"/><path d="M17 10h4v6l-4 4"/><path d="M7 8h6M7 12h4"/></svg>',
  tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 1 0 5 5L21 21H3l8.7-8.7"/><path d="M14.7 6.3 18 3l3 3-3.3 3.3"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="8" width="14" height="10" rx="2"/><path d="M15 12h4l3 3v3h-7"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>',
  down:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  cart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.4 12h11.2L21 7H6"/></svg>',
  menu:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};
function icon(n){ return ICON[n] || ICON.check; }

/* ---------- Toast ---------- */
let _tt;
function toast(msg){
    let el = document.getElementById('toast');
    if(!el){ el = document.createElement('div'); el.id='toast'; el.className='toast'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(_tt); _tt = setTimeout(()=>el.classList.remove('show'), 2300);
}

/* ---------- 灯箱 ---------- */
function openLB(src){
    let box = document.getElementById('lightbox');
    if(!box){
        box = document.createElement('div');
        box.id = 'lightbox'; box.className = 'lightbox';
        box.innerHTML = '<span class="x">✕</span><img alt="">';
        box.onclick = closeLB;
        document.body.appendChild(box);
    }
    box.querySelector('img').src = src;
    box.classList.add('on');
}
function closeLB(){ const b = document.getElementById('lightbox'); if(b) b.classList.remove('on'); }

/* ---------- 购物车（跨页面 localStorage） ---------- */
const CART_KEY = 'hssm_cart';
function loadCart(){
    try{
        const raw = JSON.parse(localStorage.getItem(CART_KEY)) || {};
        const out = {};
        Object.keys(raw).forEach(k=>{
            const v = raw[k];
            if(typeof v === 'number') out[k] = {n:k, p:0, i:'', q:v};
            else if(v && typeof v === 'object') out[k] = {n:v.n||k, p:v.p||0, i:v.i||'', q:v.q||0};
        });
        return out;
    }catch(e){ return {}; }
}
function saveCart(){ try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){} }
let cart = loadCart();

function cartCount(){ return Object.keys(cart).reduce((s,k)=>s+(cart[k].q||0),0); }
function renderBadge(){
    document.querySelectorAll('.cart-badge').forEach(b=>{
        const n = cartCount();
        b.textContent = n;
        b.style.display = n ? 'flex' : 'none';
    });
}
function addCart(id, name, price, img){
    cart[id] = cart[id] || {n:name, p:price, i:img, q:0};
    cart[id].q += 1; cart[id].n = name; cart[id].p = price; cart[id].i = img;
    saveCart(); renderBadge(); renderCart(); toast('已加入购物车');
    const b = document.querySelector('.cart-badge');
    if(b){ b.style.transform='scale(1.45)'; setTimeout(()=>b.style.transform='scale(1)',200); }
}
function setQty(id, d){
    if(!cart[id]) return;
    cart[id].q += d;
    if(cart[id].q <= 0) delete cart[id];
    saveCart(); renderBadge(); renderCart();
}
function delItem(id){ delete cart[id]; saveCart(); renderBadge(); renderCart(); }
function renderCart(){
    const body = document.getElementById('cartBody');
    if(!body) return;
    const keys = Object.keys(cart);
    const totalEl = document.getElementById('cartTotal');
    if(!keys.length){
        body.innerHTML = '<div class="empty">🛒 购物车还是空的<br>去「服务商城」挑一挑吧</div>';
        if(totalEl) totalEl.textContent = '0';
        return;
    }
    let total = 0;
    body.innerHTML = keys.map(k=>{
        const it = cart[k]; total += it.p * it.q;
        return `<div class="ci">
            <div class="ci-img">${it.i?`<img src="${it.i}" alt="">`:'🎮'}</div>
            <div style="flex:1;min-width:0">
                <div class="ci-name">${it.n}</div>
                <div class="ci-price">¥${it.p} × ${it.q}</div>
                <div class="qty"><button onclick="setQty('${k}',-1)">−</button><span>${it.q}</span><button onclick="setQty('${k}',1)">+</button></div>
            </div>
            <span class="ci-del" onclick="delItem('${k}')">删除</span>
        </div>`;
    }).join('');
    if(totalEl) totalEl.textContent = total;
}
function openCart(){
    const d = document.getElementById('cartDrawer');
    if(!d){ location.href = 'shop.html'; return; }
    renderCart(); d.classList.add('on'); document.getElementById('mask').classList.add('on');
}
function closeAll(){
    document.querySelectorAll('.drawer').forEach(d=>d.classList.remove('on'));
    const m = document.getElementById('mask'); if(m) m.classList.remove('on');
}
function checkout(){
    if(!cartCount()){ toast('购物车是空的哦'); return; }
    toast('订单已生成，请扫码联系客服确认');
    closeAll(); openCS();
}
function openCS(){
    const d = document.getElementById('csDrawer');
    if(d){ d.classList.add('on'); document.getElementById('mask').classList.add('on'); }
    else toast('客服微信：haishangshuma9527');
}
function copyText(t){
    if(navigator.clipboard) navigator.clipboard.writeText(t).then(()=>toast('已复制：'+t));
    else toast(t);
}
function copyAddr(){ copyText('上海市松江区九亭镇沪松公路1399弄69号616室 孟先生 13167730518'); }

/* ---------- 表单 ---------- */
function submitForm(e){
    e.preventDefault();
    toast('已提交，客服会尽快与你联系');
    e.target.reset();
}

/* ---------- 导航 / 滚动 / 动画 ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
    renderBadge(); renderCart();

    const nav = document.querySelector('.navbar');
    const onScroll = ()=>{ if(nav) nav.classList.toggle('scrolled', window.scrollY > 20); };
    onScroll(); window.addEventListener('scroll', onScroll);

    const tgl = document.querySelector('.nav-toggle');
    if(tgl) tgl.onclick = ()=>document.querySelector('.nav-menu').classList.toggle('open');

    const io = new IntersectionObserver(es=>{
        es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold:.12 });
    document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

    document.querySelectorAll('.nav-menu a').forEach(a=>{
        try{
            if(a.pathname.split('/').pop() === location.pathname.split('/').pop()) a.classList.add('active');
        }catch(e){}
    });
});
