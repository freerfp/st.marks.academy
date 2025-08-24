
// Mobile menu
document.querySelector('.menu-toggle')?.addEventListener('click', ()=>{
  const links = document.querySelector('.links');
  if(!links) return; links.style.display = links.style.display==='flex' ? 'none' : 'flex';
});

// Scroll reveals
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); } });
},{threshold:.12});
document.querySelectorAll('.reveal-up,.reveal-fade,.reveal-left').forEach(el=>io.observe(el));

// Auto-load gallery images
function loadGallery(){
  const wrap = document.getElementById('gallery');
  if(!wrap) return;
  // We can't read directory from browser; so we embed list at build time:
  const imgs = window.__GALLERY__ || [];
  imgs.forEach(src=>{
    const fig = document.createElement('figure');
    fig.className = 'tile reveal-fade';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    fig.appendChild(img);
    wrap.appendChild(fig);
    io.observe(fig);
    fig.addEventListener('click', ()=>openLightbox(src));
  });
}
function openLightbox(src){
  const lb = document.getElementById('lightbox');
  lb.querySelector('img').src = src;
  lb.classList.add('open');
}
document.getElementById('lightbox')?.addEventListener('click', (e)=>{
  if(e.target.classList.contains('lightbox') || e.target.classList.contains('close')){
    e.currentTarget.classList.remove('open');
  }
});

// Inject gallery list generated at build
window.__GALLERY__ = [];

window.__GALLERY__ = ['assets/img/gallery/photo1.jpg', 'assets/img/gallery/photo2.jpg', 'assets/img/gallery/photo3.jpg', 'assets/img/gallery/photo4.jpg'];
loadGallery();
