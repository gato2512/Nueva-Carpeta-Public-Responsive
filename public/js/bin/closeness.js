
document.addEventListener('DOMContentLoaded', function () {
    let sliderTemplate = document.getElementsByClassName("sliter_template")

    
    Array.from(sliderTemplate).forEach(st => {

        let sliderContainer = st.getElementsByClassName('sliderContainer')[0]
        let output = st.getElementsByClassName('mrEdit')[0]
        let image_src = st.getElementsByClassName("data_imagesrc")[0].dataset.imagesrc
        let image_container = st.getElementsByClassName("brand-image_container")[0]

        sliderContainer.innerHTML = `
            <input class='slider' type="range" name="myrange" min="0" max="100" value="0" step="0.001">
        `
        image_container.innerHTML = `
            <img src="${image_src}"/>
        `
        let slider = st.getElementsByClassName('slider')[0]

        
        
        
        slider.addEventListener('mousemove', function () {
            UpdateSlider(slider.value)
        })
        slider.addEventListener('touchmove', function () {
            UpdateSlider(slider.value)
        })

        const UpdateSlider = function(value) {
            let sliValue = value;
            output.value = sliValue.replace(".",",")
            let color = `linear-gradient(90deg, red ${sliValue}%, white ${sliValue}%)`
            slider.style.background = color;
        }

    });

})