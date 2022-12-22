document.addEventListener('DOMContentLoaded', function () {

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
                if(mrCategorical.length > 0) {
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

