// Declare variables

// getting date 
var currentTime = new Date()
var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
var year = currentTime.getFullYear()
const spantag= document.querySelector('#current-date');
spantag.textContent=(day+ "/" + month + "/" + year);