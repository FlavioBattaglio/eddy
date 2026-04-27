



//  rilevare quando gli elementi entrano nella viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1 // Attiva al  10% di visibilit
});




//Funzione segnalibro navbar
fetch("navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar-container").innerHTML = data;
    
    //Si abilita l'effetto fading dopo aver caricato il navbar
    document.querySelectorAll('.ef-fade').forEach(el => {
      observer.observe(el);
    });
    

  });


//Funzione segnalibro footer
fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-container").innerHTML = data;
 
  });