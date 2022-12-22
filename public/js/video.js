document.addEventListener("DOMContentLoaded",function(){
    var videos=document.getElementsByClassName("video-board")
    if (videos.length > 0){
        Array.from(videos).forEach(function(vid){
            let src = vid.dataset.videosrc
            vid.innerHTML="<video width='100%' src='"+ src +"' controls></video>"
        })
    }
})