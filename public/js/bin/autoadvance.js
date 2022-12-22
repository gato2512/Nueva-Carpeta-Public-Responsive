document.addEventListener("DOMContentLoaded", function () {
    var questionControls = null
    questionControls = Array.prototype.slice.call(document.getElementsByClassName("input-field"));
    if(questionControls.length > 0) {
        questionControls.forEach(function (control) {
            var singleInputs = null
            singleInputs = control.getElementsByClassName("mrSingle");
            control.addEventListener("click", function(e){	
                if (e.target.tagName == "INPUT") {
                    if (singleInputs.length > 0) {
                        groupName = singleInputs[0].name
                        if (mrForm[groupName].value !== "") {
                            document.getElementsByClassName("mrNext")[0].click()
                        }
                    }
                }
            })
        })
    }
})