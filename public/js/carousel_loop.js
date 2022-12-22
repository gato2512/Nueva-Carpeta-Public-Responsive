function GetArrayByHTML(htmlElements) {
    var newArray = []
    for (var x = 0; x < htmlElements.length; x++) {
        newArray[x] = htmlElements[x]
    }
    return newArray
}
document.addEventListener("DOMContentLoaded", function() {

    var loopText = document.getElementsByClassName("hidden-question-text")[0].getElementsByClassName("mrQuestionText")[0].innerHTML,
        loopContainer = document.getElementsByClassName('carousel-loop')[0],
        controlsHidden = document.getElementsByClassName("hidden-question-controls")[0],
        inputs = controlsHidden.getElementsByClassName('mrSingle'),
        optionsText = controlsHidden.getElementsByClassName('mrGridQuestionText'),
        categorytText = controlsHidden.getElementsByClassName("mrGridCategoryText"),
        carouselItemContainer = document.getElementsByClassName("questions-wraper")[0],
        template_struct = []

    for (var i = 0; i < categorytText.length; i++) {
        var option = {
            category: categorytText[i].getElementsByClassName('mrQuestionText')[0].textContent,
            inputs: []
        }
        var startIndex = i * (inputs.length / categorytText.length)
        var endIndex = optionsText.length * (i + 1)

        for (var o = startIndex; o < endIndex; o++) {
            var textIndex = o - startIndex

            option.inputs.push({
                control: inputs[o],
                text: optionsText[textIndex].getElementsByClassName('mrQuestionText')[0]
            })
        }
        template_struct.push(option)

    }
    console.log(template_struct)
    template_struct.forEach(function(iter) {
        var question = document.createElement("div")
        var questionText = document.createElement("div")
        var questionControls = document.createElement("div")
        var questionInfo = document.createElement("div")
        var regNum = new RegExp("[0-9]+")

        questionText.classList.add("question_text")
        question.classList.add("question", "carousel-item")
        questionControls.classList.add("question_controls")
        questionInfo.classList.add("question_info")

        iter.inputs.forEach(function(input) {
            var itemRadio = document.createElement("div")
            var labelRadio = document.createElement("label")
            labelRadio.setAttribute("for", input.control.id)

            labelRadio.innerHTML = input.text.innerHTML.match(regNum)[0]
            if (input.text.getElementsByClassName("extreme-scale-text")[0]) {
                var infoParrafo = document.createElement("p")
                infoParrafo.innerHTML = input.text.innerHTML
                questionInfo.appendChild(infoParrafo)
            }
            itemRadio.classList.add("item-radio")

            itemRadio.appendChild(input.control)
            itemRadio.appendChild(labelRadio)

            questionControls.appendChild(itemRadio)
        })

        questionText.innerHTML = iter.category

        question.appendChild(questionText)
        question.appendChild(questionInfo)
        question.appendChild(questionControls)

        carouselItemContainer.appendChild(question)
    })

    var carouseles = document.getElementsByClassName("carousel")

    if (carouseles) {
        GetArrayByHTML(carouseles).forEach(function(c, index) {
            var currIndex = 0
            var items = GetArrayByHTML(c.getElementsByClassName("carousel-item"))
            var indicator = document.getElementById("carousel_indicator")
            var carousel = M.Carousel.init(c, {
                fullWidth: true,
                padding: 14,
                dist: 0,
                duration: 1000
            })

            currIndex = items.indexOf(c.getElementsByClassName("active")[0]) + 1

            indicator.innerHTML = `${currIndex}/${carousel.count}`


            carousel.options.onCycleTo = function() {
                currIndex = items.indexOf(c.getElementsByClassName("active")[0]) + 1
                indicator.innerHTML = `${currIndex}/${carousel.count}`
            }

            c.addEventListener("click", function(event) {
                var forAtt = event.target.getAttribute("for")

                if (forAtt && currIndex < carousel.count) {
                    carousel.next()
                }
            })



        })
    }
    loopContainer.getElementsByClassName("carousel-loop_text")[0].innerHTML = loopText
})



document.addEventListener("DOMContentLoaded", function() {
    var buttonStop = document.getElementsByClassName("mrStop")[0]
    var buttonPrev = document.getElementsByClassName("mrPrev")[0]
    var buttonNext = document.getElementsByClassName("btn-next")[0]

    //Se agrega la clase material icons para que identifique los iconos
    if (buttonStop) {
        buttonStop.classList.add("material-icons")
    }
    if (buttonPrev) {
        buttonPrev.classList.add("material-icons")
    }

    /*if (buttonNext) {
        ControlButtonNext(buttonNext, document.body.scrollHeight !== document.body.clientHeight)
    }*/

    var questions = document.getElementsByClassName("content-hidden")

    Array.from(questions).forEach(function(ques) {
        if (ques.classList.contains("categorical-question")) {
            FormatedCategorical(ques)
        }
        if (ques.classList.contains("satisfaction_scale")) {
            FormatedSatisfactionScale(ques)
        }
        if (ques.classList.contains("single_carousel")) {
            FormatedCarousel(ques)
        }
        if (ques.classList.contains("open-ended")) {
            FormatedOpenEnded(ques)
        }
        if (ques.classList.contains("info-question")) {
            FormatedInfo(ques)
        }

    })

    //Se retira el preloader
    window.onload = function() {
        var preloader = document.getElementById("preloader")
        preloader.classList.add("hide")
        preloader.classList.remove("active")
    }

})

//Formato control de posición para el boton SUIENTE
function ControlButtonNext(buttonNext, hasScroll) {
    var footerHeight = document.getElementsByClassName("app_footer")[0].clientHeight

    if (hasScroll) {
        window.onscroll = function() {
            var scrollTop = document.body.scrollTop
            var clientHeight = document.body.clientHeight;
            var limit = document.body.scrollHeight - footerHeight - clientHeight
            if (scrollTop > (limit)) {
                var newBottomPos = 4 + (scrollTop - limit) + "px"

                buttonNext.style.bottom = newBottomPos
            } else {
                buttonNext.style.bottom = "4px"
            }

        }
    } else {
        var newBottomPos = footerHeight + 4 + "px"
        buttonNext.style.bottom = newBottomPos
    }
}


//Formato para preguta tipo multiple
function FormatedCategorical(ques) {
    var hiddenQuestion = ques
    var containerQuestions = document.getElementsByClassName("questions")[0]


    var question = document.createElement("div")
    var questionText = document.createElement("div")
    var questionControls = document.createElement("div")
    var labels = hiddenQuestion.getElementsByTagName("label")

    question.classList.add("question", "card")
    questionText.classList.add("question_text", "card-content")
    questionControls.classList.add("question_controls", "card-action")

    questionText.innerHTML = hiddenQuestion.getElementsByClassName("mrQuestionText")[0].innerHTML

    Array.from(labels).forEach(function(lab) {
        var parrafo = document.createElement("p")
        var label = document.createElement("label")
        var span = document.createElement("span")
        var controlInput = null
        if (lab.getElementsByClassName("mrMultipleText")[0]) {
            span.innerHTML = lab.getElementsByClassName("mrMultipleText")[0].innerHTML
        }
        if (lab.getElementsByClassName("mrSingleText")[0]) {
            span.innerHTML = lab.getElementsByClassName("mrSingleText")[0].innerHTML
        }
        controlInput = document.getElementById(lab.getAttribute("for"))

        label.appendChild(controlInput)
        label.appendChild(span)
        parrafo.appendChild(label)
        questionControls.appendChild(parrafo)
    })


    question.appendChild(questionText)
    question.appendChild(questionControls)
    containerQuestions.appendChild(question)

}


//Formato para preguta tipo escala de satisfacción
function FormatedSatisfactionScale(ques) {
    var regNum = new RegExp("[0-9]+")
    var hiddenQuestion = ques
    var containerQuestions = document.getElementsByClassName("questions")[0]


    var question = document.createElement("div")
    var questionText = document.createElement("div")
    var questionControls = document.createElement("div")
    var questionInfo = document.createElement("div")
    var labels = hiddenQuestion.getElementsByTagName("label")

    question.classList.add("question", "card", "question_ru")
    questionText.classList.add("question_text", "card-content")
    questionControls.classList.add("question_controls", "card-action")
    questionInfo.classList.add("question_info")

    questionText.innerHTML = hiddenQuestion.getElementsByClassName("mrQuestionText")[0].innerHTML

    Array.from(labels).forEach(function(lab) {
        var itemRadio = document.createElement("div")
        var label = document.createElement("label")
        var input = document.getElementById(lab.getAttribute("for"))
        itemRadio.classList.add("item-radio")

        label.innerHTML = lab.getElementsByClassName("mrSingleText")[0].innerHTML.match(regNum)[0]
        itemRadio.appendChild(input)
        label.setAttribute("for", input.id)
        itemRadio.appendChild(label)
        questionControls.appendChild(itemRadio)
        if (lab.getElementsByClassName("extreme-scale-text")[0]) {
            var infoParrafo = document.createElement("p")
            console.log(lab)
            infoParrafo.innerHTML = lab.innerHTML
            questionInfo.appendChild(infoParrafo)
        }
    })

    question.appendChild(questionText)
    question.appendChild(questionInfo)
    question.appendChild(questionControls)

    containerQuestions.appendChild(question)

}

function GetArrayByHTML(htmlElements) {
    var newArray = []
    for (var x = 0; x < htmlElements.length; x++) {
        newArray[x] = htmlElements[x]
    }
    return newArray
}

//Formato para preguta tipo carrusel, loops

function FormatedCarousel(ques) {

    var loopText = ques.getElementsByClassName("hidden-question-text")[0].getElementsByClassName("mrQuestionText")[0].innerHTML,
        loopContainer = document.getElementsByClassName('carousel-loop')[0],
        controlsHidden = ques.getElementsByClassName("hidden-question-controls")[0],
        inputs = controlsHidden.getElementsByClassName('mrSingle'),
        optionsText = controlsHidden.getElementsByClassName('mrGridQuestionText'),
        categorytText = controlsHidden.getElementsByClassName("mrGridCategoryText"),
        carouselItemContainer = document.getElementsByClassName("questions-wraper")[0],
        template_struct = []

    for (var i = 0; i < categorytText.length; i++) {
        var option = {
            category: categorytText[i].getElementsByClassName('mrQuestionText')[0].textContent,
            inputs: []
        }
        var startIndex = i * (inputs.length / categorytText.length)
        var endIndex = optionsText.length * (i + 1)

        for (var o = startIndex; o < endIndex; o++) {
            var textIndex = o - startIndex

            option.inputs.push({
                control: inputs[o],
                text: optionsText[textIndex].getElementsByClassName('mrQuestionText')[0]
            })
        }
        template_struct.push(option)

    }

    template_struct.forEach(function(iter) {
        var question = document.createElement("div")
        var questionText = document.createElement("div")
        var questionControls = document.createElement("div")
        var questionInfo = document.createElement("div")
        var regNum = new RegExp("[0-9]+")

        questionText.classList.add("question_text")
        question.classList.add("question", "carousel-item")
        questionControls.classList.add("question_controls")
        questionInfo.classList.add("question_info")

        iter.inputs.forEach(function(input) {
            var itemRadio = document.createElement("div")
            var labelRadio = document.createElement("label")
            labelRadio.setAttribute("for", input.control.id)

            labelRadio.innerHTML = input.text.innerHTML.match(regNum)[0]
            if (input.text.getElementsByClassName("extreme-scale-text")[0]) {
                var infoParrafo = document.createElement("span")
                infoParrafo.classList.add("extreme-scale-text")
                infoParrafo.innerHTML = input.text.innerHTML
                questionInfo.appendChild(infoParrafo)
            }
            itemRadio.classList.add("item-radio")

            itemRadio.appendChild(input.control)
            itemRadio.appendChild(labelRadio)

            questionControls.appendChild(itemRadio)
        })

        questionText.innerHTML = iter.category

        question.appendChild(questionText)
        question.appendChild(questionInfo)
        question.appendChild(questionControls)

        carouselItemContainer.appendChild(question)
    })

    var carouseles = document.getElementsByClassName("carousel")

    if (carouseles) {
        GetArrayByHTML(carouseles).forEach(function(c) {
            loopContainer.getElementsByClassName("carousel-loop_text")[0].innerHTML = loopText
            var currIndex = 0
            var items = GetArrayByHTML(c.getElementsByClassName("carousel-item"))
            var indicator = document.getElementById("carousel_indicator")
            var carousel = M.Carousel.init(c, {
                fullWidth: true,
                padding: 14,
                dist: 0,
                duration: 400
            })

            currIndex = items.indexOf(c.getElementsByClassName("active")[0]) + 1

            indicator.innerHTML = `${currIndex}/${carousel.count}`
            carousel.itemHeight = 200
                // console.log(carousel)
            carousel.options.onCycleTo = function() {
                currIndex = items.indexOf(c.getElementsByClassName("active")[0]) + 1
                indicator.innerHTML = `${currIndex}/${carousel.count}`
            }

            c.addEventListener("click", function(event) {
                event.preventDefault()
                var forAtt = event.target.getAttribute("for")
                if (forAtt !== null) {
                    document.getElementById(forAtt).checked = true


                    if (currIndex < carousel.count && document.getElementById(forAtt).checked) {
                        carousel.next()
                    } else if (currIndex == carousel.count) {
                        var isAllAnswered = items.every(function(el) {
                            var inp = el.getElementsByClassName("mrSingle")[0];
                            if (inp) {
                                groupName = inp.name;
                                return mrForm[groupName].value !== ""
                            } else {
                                return false
                            }
                        })
                        if (isAllAnswered) {
                            document.getElementsByClassName("mrNext")[0].click()
                        }
                    }
                }

            })
            document.getElementById("btn-carousel-prev").addEventListener("click", function(event) {
                carousel.prev()
            })
            document.getElementById("btn-carousel-next").addEventListener("click", function(event) {
                carousel.next()
            })
        })
    }

}

//Formato para preguta tipo Abiertas
function FormatedOpenEnded(ques) {
    var hiddenQuestion = ques
    var containerQuestions = document.getElementsByClassName("questions")[0]


    var question = document.createElement("div")
    var questionText = document.createElement("div")
    var questionControls = document.createElement("div")
    var textArea = hiddenQuestion.getElementsByClassName("mrEdit")[0]
    if (textArea) {
        textArea.setAttribute("placeholder", "Ingrese aquí su respuesta")
    }

    textArea.classList.add("materialize-textarea")
    textArea.style.marginLeft = "0"
    question.classList.add("question", "card")
    questionText.classList.add("question_text", "card-content")
    questionControls.classList.add("question_controls", "card-action", "input-field")

    questionText.innerHTML = hiddenQuestion.getElementsByClassName("mrQuestionText")[0].innerHTML

    questionControls.appendChild(textArea)

    question.appendChild(questionText)
    question.appendChild(questionControls)
    containerQuestions.appendChild(question)

}

function FormatedInfo(ques) {
    var hiddenQuestion = ques
    var containerQuestions = document.getElementsByClassName("questions")[0]

    var question = document.createElement("div")
    var questionText = document.createElement("div")

    question.classList.add("question", "card")
    questionText.classList.add("question_text", "card-content")

    questionText.innerHTML = hiddenQuestion.getElementsByClassName("mrQuestionText")[0].innerHTML

    question.appendChild(questionText)

    containerQuestions.appendChild(question)
}

function AutoAdvance() {
    var appContainer = document.getElementsByClassName("app_content")[0]
    var inputs = GetArrayByHTML(appContainer.getElementsByTagName("input"))
    var groups = []
    isAllRadios = inputs.every(function(el) {
        if (groups.indexOf(el.name) == -1) {
            groups.push(el.name)
        }
        return el.getAttribute("type") == "radio"
    })
    var isAllRadiosAnswered = groups.every(function(el) {
        return mrForm[el].value != ""
    })
    if (isAllRadiosAnswered) {
        document.getElementsByClassName("mrNext")[0].click()
    }
}