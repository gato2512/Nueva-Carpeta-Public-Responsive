document.addEventListener('DOMContentLoaded', function () {
    let gallery = document.querySelector(".galery-responsive")
    let spans = gallery.querySelector("span").querySelector("span").querySelectorAll("span")
    
    for(let idx = 0; idx < spans.length; idx++) {

        if(spans[idx].querySelector("input") && spans[idx].querySelector("img")==undefined){
            spans[idx].classList.add("exclusive")
        }
        
    }
})