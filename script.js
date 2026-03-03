const elements = document.querySelectorAll(".service-card, .glass-card");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
},{threshold:0.2});

elements.forEach(el=>{
  el.style.opacity = 0;
  el.style.transform = "translateY(50px)";
  el.style.transition = "all .8s ease";
  observer.observe(el);
});
