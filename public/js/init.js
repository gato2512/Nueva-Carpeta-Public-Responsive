document.addEventListener('DOMContentLoaded', function() {

    var elems = document.querySelectorAll('select');
    var FormSelect = M.FormSelect.init(elems, {});

    elems = document.querySelectorAll('.fixed-action-btn');
    var FloatButton = M.FloatingActionButton.init(elems, { direction: 'left' });

    elems = document.querySelectorAll('.tooltipped');
    var Tooltips = M.Tooltip.init(elems, {});




    //Formateo de textAreas
    var textAreas = document.getElementsByTagName("textarea");
    for (var x = 0; x < textAreas.length; x++) {
        textAreas[x].classList.add("materialize-textarea")
    }

    //Formateo de las grillas
    var tables = document.getElementsByClassName("sbt-grid")

    if (tables) {
        for (var t = 0; t < tables.length; t++) {
            formatTables(tables[t].getElementsByClassName("mrQuestionTable")[0])

        }
    }

    //Formateo de las abiertas
    var abiertas = document.getElementsByClassName("sbt-open-ended")

    if (abiertas) {
        for (var a = 0; a < abiertas.length; a++) {
            var inputField = abiertas[a].getElementsByClassName("input-field")[0];
            var mrEdit = inputField.getElementsByClassName("mrEdit")[0]
            var PlaceHolder = "Ingrese aquí su información"
            mrEdit.setAttribute("placeholder", PlaceHolder)
        }
    }
    //Formateo de las preguntas de datos personales

    var personalDatas = document.getElementsByClassName("sbt-personal-data")

    if (personalDatas.length > 0) {
        for (var p = 0; p < personalDatas.length; p++) {
            formatPersonalData(personalDatas[p])
        }
    }

    var mrPrev = document.getElementsByClassName("mrPrev")[0]

    if (!mrPrev) {
        document.getElementById("btnPrev").style.display = "none";
    }

    //Formateo del autocomplete

    var autoCompletes = document.getElementsByClassName("sbt_autocomplete");

    for (var aut = 0; aut < autoCompletes.length; aut++) {
        formatAutocomplete(autoCompletes[aut]);
    }


    //

    var SingleQuestions = null;
    var MultipleQuestions = null;
    var _inputFields = null;
    var mrCategorical = null;

    _inputFields = Array.prototype.slice.call(document.getElementsByClassName("input-field"));
    if (_inputFields.length > 0) {
        _inputFields.forEach(_input => {

            SingleQuestions = Array.prototype.slice.call(_input.getElementsByClassName("mrSingle"))
            MultipleQuestions = Array.prototype.slice.call(_input.getElementsByClassName("mrMultiple"))
            if (SingleQuestions.length > 0 || MultipleQuestions.length > 0) {
                mrCategorical = Array.prototype.slice.call(_input.getElementsByClassName("mrEdit"))
                if (mrCategorical.length > 0) {
                    mrCategorical.forEach(cat => {
                        cat.setAttribute("placeholder", "¿Cuál?");
                    });
                }
            }

        });
    }
});


//formatTables Formatea las Grillas(Tablas)
function formatTables(table) {
    var trs, tBody, tHead
    var tds = table.getElementsByTagName("td");
    if (tds) {

        for (var td = 0; td < tds.length; td++) {
            var input = tds[td].getElementsByTagName("input")[0]
            if (input !== undefined) {
                var label = document.createElement("label")
                var span = document.createElement("span")

                label.appendChild(span)
                label.setAttribute("for", input.id)
                tds[td].appendChild(label)
            }
        }

        trs = table.getElementsByTagName("tr");
        tBody = document.createElement("tbody");
        tHead = document.createElement("thead");

        for (var tr = 0; tr < trs.length; tr++) {
            if (tr == 0) {
                tHead.appendChild(trs[tr].cloneNode(true));
            } else {
                tBody.appendChild(trs[tr].cloneNode(true))
            }

        }
        table.innerHTML = "";
        table.classList.add("responsive-table")
        table.appendChild(tHead);
        table.appendChild(tBody)

        // var grid = document.querySelector(".sbt-grid")
        // var table = grid.querySelector(".mrQuestionTable")
        var td = Array.from(tds)
        var tdFilter = td.filter(function(iter) {
            return iter.querySelector(".mrEdit") && (iter.querySelector(".mrMultiple") || iter.querySelector(".mrSingle"))
        })
        tdFilter.forEach(function(op) {

            var span = op.querySelector("span")
            var input = op.querySelector("input")

            var template = `${input.outerHTML}
        				<label for="${op.querySelector("input").id}">
        					<span></span>
        				</label>
        				${span.outerHTML}`


            op.innerHTML = template
        })
    }

}

function formatPersonalData(container) {
    var _inputField = container.getElementsByClassName("input-field")[0]
    var _textArea = []
    var _label = []

    copyHTMLNodes(_inputField.getElementsByClassName("mrEdit"), _textArea)
    copyHTMLNodes(_inputField.getElementsByTagName("label"), _label)




    if (_inputField.getElementsByClassName("material-icons")[0]) {
        var _icon = _inputField.getElementsByClassName("material-icons")[0]
        _inputField.innerHTML = "";

        _inputField.appendChild(_icon)
        for (var inp = 0; inp < _textArea.length; inp++) {
            _inputField.appendChild(_textArea[inp])
            _inputField.appendChild(_label[inp])
        }


    } else {
        _inputField.innerHTML = "";

        for (var txArea = _textArea.length - 1; txArea >= 0; txArea--) {
            _inputField.appendChild(_textArea[txArea])
            _inputField.appendChild(_label[txArea])
        }
    }

}

function copyHTMLNodes(fromArray, toArray) {
    for (var c = 0; c < fromArray.length; c++) {
        toArray.push(fromArray[c].cloneNode());
    }
}

function formatAutocomplete(container) {
    var _inputField = container.getElementsByClassName("input-field")[0]
    var _textArea = _inputField.getElementsByTagName("input")[0]
    var _label = _inputField.getElementsByTagName("label")[0]
    var _icon = _inputField.getElementsByClassName("material-icons")[0]

    _inputField.innerHTML = "";

    _inputField.appendChild(_icon)
    _inputField.appendChild(_textArea)
    _inputField.appendChild(_label)
}

//Formato para preguta tipo carrusel, loopss
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