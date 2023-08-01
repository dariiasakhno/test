function onLoad() {
    setDefaultName();
}

function setDefaultName() {
    console.log("function loaded: setDefaultName")
    var currentName = Xrm.Page.getAttribute("name").getValue();

    if (currentName === null || currentName === undefined || currentName === "") {
        var currentDate = new Date();
        var QuotationName = "Quote from [" + currentDate.toLocaleDateString() + "]";
        Xrm.Page.getAttribute("name").setValue(QuotationName);
    }
}


