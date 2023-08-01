function onSave() {
    var con_targetdeliverydateon = Xrm.Page.getAttribute("con_targetdeliverydateon").getValue();
    var currentName = Xrm.Page.getAttribute("name").getValue();
    var con_quotenumber = Xrm.Page.getAttribute("con_quotenumber").getValue();
    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();

    if (con_targetdeliverydateon && con_quotenumber && con_accountid) {
        var extractedDigits = extractDigitsFromZeroes(con_quotenumber);
        var supplierName = getSupplierName(con_accountid);

        if (!currentName || currentName.startsWith("Quote from")) {
            var updatedName = "Quote from " + new Date().toLocaleDateString() + " for " + supplierName + " [" + extractedDigits + "]";
            Xrm.Page.getAttribute("name").setValue(updatedName);
        }
    } else {
        var defaultName = "Quote from " + new Date().toLocaleDateString() + " for " + supplierName + " [" + extractedDigits + "]";
        Xrm.Page.getAttribute("name").setValue(defaultName);
    }
}

function getSupplierName(supplierId) {
    if (supplierId && Array.isArray(supplierId) && supplierId.length > 0 && supplierId[0].name) {
        var name = supplierId[0].name;
        return name;
    }
    return "";
}

function extractDigitsFromZeroes(value) {
    if (typeof value !== 'string' || value === null || value === undefined) {
        return "";
    }
    var regex = /0+(\d+)/;
    var match = value.match(regex);
    if (match === null || match === undefined) {
        return "";
    }
    return match[1];
}

Xrm.Page.data.entity.addOnSave(onSave);





/*
function onSave() {
    console.log("Onsave loaded");
    var con_targetdeliverydateon = Xrm.Page.getAttribute("con_targetdeliverydateon").getValue();
    var name = Xrm.Page.getAttribute("name").getValue();
    var con_quotenumber = Xrm.Page.getAttribute("con_quotenumber").getValue();
    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();

    if (con_targetdeliverydateon && con_quotenumber && con_accountid) {
        var extractedDigits = extractDigitsFromZeroes(con_quotenumber);
        var supplierName = getSupplierName(con_accountid);

        if (name && name.startsWith("Quote from")) {
            var currentDate = new Date().toLocaleDateString();
            var updatedName;

            if (name.includes("[")) {
                var dateRegex = /\[(.*?)\]/;
                var savedDate = name.match(dateRegex)[1];

                if (savedDate !== currentDate) {
                    updatedName = name;
                } else {
                    updatedName = "Quote from " + currentDate + " for " + supplierName + " [" + extractedDigits + "]";
                }
            } else {
                updatedName = "Quote from " + currentDate + " for " + supplierName + " [" + extractedDigits + "]";
            }

            Xrm.Page.getAttribute("name").setValue(updatedName);
        } else {
            var defaultName = "Quote from " + new Date().toLocaleDateString() + " for " + supplierName + " [" + extractedDigits + "]";
            Xrm.Page.getAttribute("name").setValue(defaultName);
        }
    }
}

function getSupplierName(supplierId) {
    if (supplierId && Array.isArray(supplierId) && supplierId.length > 0) {
        var name = supplierId[0].name;
        return name;
    }
    return "";
}

function extractDigitsFromZeroes(value) {
    if (typeof value !== 'string' || value === null || value === undefined) {
        return "";
    }
    var regex = /0+(\d+)/;
    var match = value.match(regex);
    if (match === null || match === undefined) {
        return "";
    }
    return match[1];
}



function onSave() {
    var con_targetdeliverydateon = Xrm.Page.getAttribute("con_targetdeliverydateon").getValue();
    var currentName = Xrm.Page.getAttribute("name").getValue();
    var con_quotenumber = Xrm.Page.getAttribute("con_quotenumber").getValue();

    if (con_targetdeliverydateon !== null && con_targetdeliverydateon !== undefined) {
        var currentDate = new Date();
        var targetDeliveryDate = new Date(con_targetdeliverydateon);

        if (targetDeliveryDate.toDateString() !== currentDate.toDateString()) {
            return;
        }
    }

    if (!checkQuotenumber(con_quotenumber)) {
        return;
    }

    var extractedDigits = extractDigitsFromZeroes(con_quotenumber);

    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();
    var name = con_accountid[0].name;
    var datumHeute = new Date();

    if (Xrm.Page.getAttribute("effectivefrom").getValue() === null) {
        Xrm.Page.getAttribute("effectivefrom").setValue(datumHeute);
    }

    var dateOnly = new Date(Date.now() + 12096e5);

    if (Xrm.Page.getAttribute("effectiveto").getValue() === null) {
        Xrm.Page.getAttribute("effectiveto").setValue(dateOnly);
    }

    if (currentName !== null && currentName !== undefined && !currentName.startsWith("Angebot vom")) {
        var QuotationName = "Angebot vom [" + datumHeute.toLocaleDateString() + "]" + "[" + extractedDigits + "]" + " fÃ¼r " + name;
        Xrm.Page.getAttribute("name").setValue(QuotationName);
    } else {
        var updatedName = currentName.replace(/\[[0-9]+\]/, "[" + extractedDigits + "]");
        if (updatedName !== currentName) {
            Xrm.Page.getAttribute("name").setValue(updatedName);
        } else {
            var defaultName = "Angebot vom [" + datumHeute.toLocaleDateString() + "]";
            Xrm.Page.getAttribute("name").setValue(defaultName);
        }
    }

    var output = "Quote: con_accountTitle: " + name + ", con_quotenumber: " + extractedDigits;
    console.log(output);
}


function extractDigitsFromZeroes(value) {
    if (typeof value !== 'string' || value === null || value === undefined) {
        return "";
    }
    var regex = /0+(\d+)/;
    var match = value.match(regex);
    if (match === null || match === undefined) {
        return "";
    }
    return match[1];
}


function updateNameField() {
    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();
    if (con_accountid !== null && con_accountid !== undefined) {
        var name = con_accountid[0].name;
        var currentName = Xrm.Page.getAttribute("name").getValue();

        if (currentName === null || currentName === undefined || !currentName.startsWith("Quote from")) {
            var updatedName = "Quote from [" + datumHeute.toLocaleDateString() + "] for " + name;
            Xrm.Page.getAttribute("name").setValue(updatedName);
        }
    }
}
*/

/*
function onSave() {
    var con_targetdeliverydateon = Xrm.Page.getAttribute("con_targetdeliverydateon").getValue();
    var currentName = Xrm.Page.getAttribute("name").getValue();
    var con_quotenumber = Xrm.Page.getAttribute("con_quotenumber").getValue();

    if (con_targetdeliverydateon !== null && con_targetdeliverydateon !== undefined) {
        var currentDate = new Date();
        var targetDeliveryDate = new Date(con_targetdeliverydateon);

        if (targetDeliveryDate.toDateString() !== currentDate.toDateString()) {
            return;
        }
    }

    if (!checkQuotenumber(con_quotenumber)) {
        return;
    }

    var extractedDigits = extractDigitsFromZeroes(con_quotenumber);

    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();
    var name = con_accountid[0].name;
    var datumHeute = new Date();

    if (Xrm.Page.getAttribute("effectivefrom").getValue() === null) {
        Xrm.Page.getAttribute("effectivefrom").setValue(datumHeute);
    }

    var dateOnly = new Date(Date.now() + 12096e5);

    if (Xrm.Page.getAttribute("effectiveto").getValue() === null) {
        Xrm.Page.getAttribute("effectiveto").setValue(dateOnly);
    }

    if (currentName !== null && currentName !== undefined && !currentName.startsWith("Angebot vom")) {
        var QuotationName = "Angebot vom [" + datumHeute.toLocaleDateString() + "]" + "[" + extractedDigits + "]" + " fÃ¼r " + name;
        Xrm.Page.getAttribute("name").setValue(QuotationName);
    } else {
        var updatedName = currentName.replace(/\[[0-9]+\]/, "[" + extractedDigits + "]");
        if (updatedName !== currentName) {
            Xrm.Page.getAttribute("name").setValue(updatedName);
        } else {
            var defaultName = "Angebot vom [" + datumHeute.toLocaleDateString() + "]";
            Xrm.Page.getAttribute("name").setValue(defaultName);
        }
    }

    var output = "Quote: con_accountTitle: " + name + ", con_quotenumber: " + extractedDigits;
    console.log(output);
}


function extractDigitsFromZeroes(value) {
    if (typeof value !== 'string' || value === null || value === undefined) {
        return "";
    }
    var regex = /0+(\d+)/;
    var match = value.match(regex);
    if (match === null || match === undefined) {
        return "";
    }
    return match[1];
}


function updateNameField() {
    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();
    if (con_accountid !== null && con_accountid !== undefined) {
        var name = con_accountid[0].name;
        var currentName = Xrm.Page.getAttribute("name").getValue();

        if (currentName === null || currentName === undefined || !currentName.startsWith("Quote from")) {
            var updatedName = "Quote from [" + datumHeute.toLocaleDateString() + "] for " + name;
            Xrm.Page.getAttribute("name").setValue(updatedName);
        }
    }
}



function onSave() {
    var con_targetdeliverydateon = Xrm.Page.getAttribute("con_targetdeliverydateon").getValue();
    var currentName = Xrm.Page.getAttribute("name").getValue();
    var con_quotenumber = Xrm.Page.getAttribute("con_quotenumber").getValue();

    if (con_targetdeliverydateon !== null && con_targetdeliverydateon !== undefined) {
        var currentDate = new Date();
        var targetDeliveryDate = new Date(con_targetdeliverydateon);

        if (targetDeliveryDate.toDateString() !== currentDate.toDateString()) {
            return;
        }
    }

    if (!checkQuotenumber(con_quotenumber)) {
        return;
    }

    var extractedDigits = extractDigitsFromZeroes(con_quotenumber);

    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();
    var name = con_accountid[0].name;
    var datumHeute = new Date();

    if (Xrm.Page.getAttribute("effectivefrom").getValue() === null) {
        Xrm.Page.getAttribute("effectivefrom").setValue(datumHeute);
    }

    var dateOnly = new Date(Date.now() + 12096e5);

    if (Xrm.Page.getAttribute("effectiveto").getValue() === null) {
        Xrm.Page.getAttribute("effectiveto").setValue(dateOnly);
    }

    if (currentName !== null && currentName !== undefined && !currentName.startsWith("Angebot vom")) {
        var QuotationName = "Angebot vom [" + datumHeute.toLocaleDateString() + "]" + "[" + extractedDigits + "]" + " fÃ¼r " + name;
        Xrm.Page.getAttribute("name").setValue(QuotationName);
    } else {
        var updatedName = currentName.replace(/\[[0-9]+\]/, "[" + extractedDigits + "]");
        if (updatedName !== currentName) {
            Xrm.Page.getAttribute("name").setValue(updatedName);
        } else {
            var defaultName = "Angebot vom [" + datumHeute.toLocaleDateString() + "]";
            Xrm.Page.getAttribute("name").setValue(defaultName);
        }
    }

    var output = "Quote: con_accountTitle: " + name + ", con_quotenumber: " + extractedDigits;
    console.log(output);
}


function extractDigitsFromZeroes(value) {
    if (typeof value !== 'string' || value === null || value === undefined) {
        return "";
    }
    var regex = /0+(\d+)/;
    var match = value.match(regex);
    if (match === null || match === undefined) {
        return "";
    }
    return match[1];
}


function updateNameField() {
    var con_accountid = Xrm.Page.getAttribute("con_accountid").getValue();
    if (con_accountid !== null && con_accountid !== undefined) {
        var name = con_accountid[0].name;
        var currentName = Xrm.Page.getAttribute("name").getValue();

        if (currentName === null || currentName === undefined || !currentName.startsWith("Quote from")) {
            var updatedName = "Quote from [" + datumHeute.toLocaleDateString() + "] for " + name;
            Xrm.Page.getAttribute("name").setValue(updatedName);
        }
    }
}
*/