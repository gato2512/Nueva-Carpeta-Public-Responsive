window.onload = function () {
    var platformSelection = null;
    var userAgent = navigator.userAgent;
    var isAndroid = /Android/i.test(userAgent);
    var isIPhone = /iPad|iPhone|iPod/i.test(userAgent);
    platformSelection = document.getElementById("platformSelection");

    if(platformSelection) {
        var radios = null;
        radios = platformSelection.getElementsByClassName("mrSingle");
        if(radios) {
            groupName = radios[0].name;
            if(isAndroid || isIPhone) {
                mrForm[groupName].value = "Mobile";
            }
            else {
                mrForm[groupName].value = "PC";
            }
        }
    }
}