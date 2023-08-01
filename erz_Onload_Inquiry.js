function onLoad() {
    setDefaultName();
}

function setDefaultName() {
    console.log("function loaded: setDefaultName")
    var currentName = Xrm.Page.getAttribute("con_name").getValue();

    if (currentName === null || currentName === undefined || currentName === "") {
        var currentDate = new Date();
        var QuotationName = "Inquiry from [" + currentDate.toLocaleDateString() + "]";
        Xrm.Page.getAttribute("con_name").setValue(QuotationName);
    }
}
