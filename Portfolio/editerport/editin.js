/* -------------------------
   Slider logic: center-focused row
   ------------------------- */
(function(){
  const carousel = document.getElementById('carousel');
  const cards = Array.from(carousel.querySelectorAll('.card'));
  const left = document.querySelector('.arrow.left');
  const right = document.querySelector('.arrow.right');
  const filters = document.querySelectorAll('.filter-btn');
  let visibleCards = cards.slice(); // current set after filter
  let centerIndex = 1; // index in visibleCards considered center (initial)
  const spacing = 18; // gap
  const cardWidth = () => visibleCards[0] ? visibleCards[0].offsetWidth : 190;
  const container = document.getElementById('row');

  // helpers
  function updateLayout(animate=true){
    // ensure at least 3 visible for center effect; if less, adapt
    const cw = cardWidth();
    // position carousel so that centerIndex card is centered in container
    const containerWidth = container.offsetWidth;
    const centerCard = visibleCards[centerIndex] || visibleCards[0];
    if(!centerCard) return;
    const centerCardLeft = Array.from(carousel.children).indexOf(centerCard) * (cw + spacing);
    // compute desired scrollLeft so centerCard is centered in container
    const desiredScrollLeft = centerCardLeft - (containerWidth/2 - cw/2) + 36; // accounting padding
    if(animate) carousel.style.transition = 'transform .35s cubic-bezier(.2,.9,.2,1)';
    else carousel.style.transition = 'none';
    // apply transform instead of scroll to allow animation
    carousel.style.transform = `translateX(${-desiredScrollLeft}px)`;

    // update classes for center and dim
    carousel.querySelectorAll('.card').forEach(c => c.classList.remove('center','dim'));
    // center card
    if(centerCard){
      centerCard.classList.add('center');
      // neighbors dim
      const all = Array.from(visibleCards);
      const idx = all.indexOf(centerCard);
      if(all[idx-1]) all[idx-1].classList.add('dim');
      if(all[idx+1]) all[idx+1].classList.add('dim');
    }
  }

  // initial layout after images/videos loaded
  function init(){
    // rebuild visibleCards depending on filter (initial all)
    visibleCards = Array.from(carousel.querySelectorAll('.card')).filter(c => c.style.display !== 'none');
    // clamp centerIndex
    centerIndex = Math.min(Math.max(1, Math.floor(visibleCards.length/2)), visibleCards.length-1);
    if(visibleCards.length === 1) centerIndex = 0;
    updateLayout(false);
  }

  // on window resize adjust and recalc sizes
  window.addEventListener('resize', () => {
    updateLayout(false);
  });

  // navigation handlers
  left.addEventListener('click', () => {
    if(centerIndex > 0) centerIndex--;
    updateLayout();
  });
  right.addEventListener('click', () => {
    if(centerIndex < visibleCards.length - 1) centerIndex++;
    updateLayout();
  });

  // make cards clickable: open modal with larger video
  const modal = document.getElementById('modal');
  const modalVideo = document.getElementById('modalVideo');

  carousel.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if(!card) return;
    const vid = card.querySelector('video');
    if(!vid) return;
    modalVideo.src = vid.currentSrc || vid.src;
    modal.classList.add('show');
    modalVideo.play();
  });

  modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target === modalVideo){
      modal.classList.remove('show');
      modalVideo.pause();
      modalVideo.src = '';
    }
  });

  // auto-play on hover, pause when not hovered
  carousel.querySelectorAll('video').forEach(v => {
    v.addEventListener('mouseenter', () => {
      v.play().catch(()=>{});
    });
    v.addEventListener('mouseleave', () => {
      v.pause();
      v.currentTime = 0;
    });
    // mobile: tap to play handled via modal click
  });

  // drag / swipe to move center selection
  let isDown=false, startX=0, scrollLeft=0;
  const sliderWrap = carousel;
  sliderWrap.addEventListener('pointerdown', (e)=>{
    isDown=true; startX = e.clientX; sliderWrap.style.cursor='grabbing';
  });
  sliderWrap.addEventListener('pointermove', (e)=>{
    if(!isDown) return;
  });
  sliderWrap.addEventListener('pointerup', (e)=>{
    isDown=false; sliderWrap.style.cursor='default';
    // detect direction
    const diff = startX - e.clientX;
    if(Math.abs(diff) > 30){
      if(diff > 0 && centerIndex < visibleCards.length-1) centerIndex++;
      else if(diff < 0 && centerIndex > 0) centerIndex--;
      updateLayout();
    }
  });
  sliderWrap.addEventListener('pointercancel', ()=>{isDown=false});

  // keyboard nav
  window.addEventListener('keydown',(e)=>{
    if(e.key === 'ArrowLeft'){ if(centerIndex>0) centerIndex--; updateLayout();}
    if(e.key === 'ArrowRight'){ if(centerIndex<visibleCards.length-1) centerIndex++; updateLayout();}
    if(e.key === 'Escape' && modal.classList.contains('show')){ modal.classList.remove('show'); modalVideo.pause(); modalVideo.src=''; }
  });

  /* FILTERS: show/hide cards and reset visibleCards & centerIndex */
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const all = Array.from(carousel.querySelectorAll('.card'));
      all.forEach(c=>{
        const cat = c.dataset.category || '';
        if(filter === 'all' || cat === filter) c.style.display = 'flex';
        else c.style.display = 'none';
      });
      // rebuild visibleCards
      visibleCards = Array.from(carousel.querySelectorAll('.card')).filter(c => c.style.display !== 'none');
      // set centerIndex to 1 if possible else 0
      centerIndex = visibleCards.length > 2 ? 1 : 0;
      // reset transform then update
      carousel.style.transform = 'translateX(0px)';
      setTimeout(()=>updateLayout(false), 60);
    });
  });

  // Contact form submission
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });

  // Scroll to contact section when clicking "Work with me"
  document.getElementById('contactBtn').addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });

  // initial setup after small delay to allow browser to compute sizes
  window.addEventListener('load', ()=>{ setTimeout(init, 120); });

  // optional: make center change automatically every Xs (commented out to keep control)
  // let autoTicker = setInterval(()=>{ if(centerIndex < visibleCards.length-1) centerIndex++; else centerIndex=0; updateLayout(); }, 4500);

})();
