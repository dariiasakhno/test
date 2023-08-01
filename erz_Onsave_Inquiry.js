function onSave() {
    console.log("Onsave loaded");
    var con_deliverydatedate = Xrm.Page.getAttribute("con_deliverydatedate").getValue();
    var currentName = Xrm.Page.getAttribute("con_name").getValue();
    var con_inquirynumber = Xrm.Page.getAttribute("con_inquirynumber").getValue();
    var con_supplierid = Xrm.Page.getAttribute("con_supplierid").getValue();


    if (con_deliverydatedate && con_inquirynumber && con_supplierid) {
        var extractedDigits = extractDigitsFromZeroes(con_inquirynumber);
        var con_supplierName = getSupplierName(con_supplierid);

        if (currentName && currentName.startsWith("Inquiry from")) {
            var datumHeute = new Date().toLocaleDateString();
            var updatedName;

            if (currentName.includes("[")) {
                var dateRegex = /\[(.*?)\]/;
                var savedDate = currentName.match(dateRegex)[1];

                if (savedDate !== datumHeute) {
                    updatedName = currentName;
                } else {
                    updatedName = "Inquiry from " + datumHeute + " for " + con_supplierName + " [" + extractedDigits + "]";
                }
            } else {
                updatedName = "Inquiry from " + datumHeute + " for " + con_supplierName + " [" + extractedDigits + "]";
            }

            Xrm.Page.getAttribute("con_name").setValue(updatedName);
        } else {
            var updatedName = currentName || getDefaultName(con_inquirynumber, con_supplierName, extractedDigits);
            Xrm.Page.getAttribute("con_name").setValue(updatedName);

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


function getDefaultName(con_inquirynumber, supplierName, extractedDigits) {
    var currentDate = new Date().toLocaleDateString();
    return "Inquiry from " + currentDate + " for " + supplierName + " [" + extractedDigits + "]";
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


/*
function onSave() {
    console.log("Onsave loaded");
    var con_deliverydatedate = Xrm.Page.getAttribute("con_deliverydatedate").getValue();
    var currentName = Xrm.Page.getAttribute("con_name").getValue();
    var con_inquirynumber = Xrm.Page.getAttribute("con_inquirynumber").getValue();

    if (con_deliverydatedate && con_inquirynumber) {
        var extractedDigits = extractDigitsFromZeroes(con_inquirynumber);
        var con_supplierid = Xrm.Page.getAttribute("con_supplierid").getValue();

        if (con_supplierid && con_supplierid.length > 0) {
            var supplierId = con_supplierid[0].id;
            var supplierName = "";

            retrieveSupplierName(supplierId)
                .then(function (name) {
                    supplierName = name;

                    if (currentName && currentName.startsWith("Angebot vom")) {
                        var currentDate = new Date().toLocaleDateString();
                        var updatedName = "Angebot vom " + currentDate + " für " + supplierName + " [" + extractedDigits + "]";
                        Xrm.Page.getAttribute("con_name").setValue(updatedName);
                    } el?Ъse {

                        var updatedName = getDefaultName(con_inquirynumber, supplierName, extractedDigits);
                        Xrm.Page.getAttribute("con_name").setValue(updatedName);
                    }
                })
                .catch(function (error) {
                    console.log("Error retrieving supplier name:", error);
                });
        } else {
            console.log("No supplier selected.");
        }
    }
}

function retrieveSupplierName(supplierId) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/con_suppliers(" + supplierId + ")?$select=con_name", true);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=*");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var result = JSON.parse(this.response);
                    var name = result.con_name;
                    resolve(name);
                } else {
                    var error = JSON.parse(this.response).error;
                    reject(error);
                }
            }
        };
        req.send();
    });
}

function getDefaultName(con_inquirynumber, supplierName, extractedDigits) {
    var currentDate = new Date().toLocaleDateString();
    return "Angebot vom " + currentDate + " für " + supplierName + " [" + extractedDigits + "]";
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





var originalNameValue = "";

function onSave() {
    var con_deliverydatedate = Xrm.Page.getAttribute("con_deliverydatedate").getValue();
    var con_supplierid = Xrm.Page.getAttribute("con_supplierid").getValue();
    var con_inquirynumber = Xrm.Page.getAttribute("con_inquirynumber").getValue();

    if (con_deliverydatedate && con_supplierid && con_inquirynumber) {
        var extractedDigits = extractDigitsFromZeroes(con_inquirynumber);
        var name = "";

        if (con_supplierid !== null && con_supplierid !== undefined && Array.isArray(con_supplierid) && con_supplierid.length > 0) {
            name = con_supplierid[0].name;
        }

        var currentDate = new Date().toLocaleDateString();
        var defaultName = "Angebot vom " + currentDate + " für " + name + " [" + con_inquirynumber + "]";

        if (originalNameValue !== "") {
            Xrm.Page.getAttribute("con_name").setValue(originalNameValue);
        } else {
            Xrm.Page.getAttribute("con_name").setValue(defaultName);
        }
    }
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

function saveOriginalNameValue() {
    var con_name = Xrm.Page.getAttribute("con_name");
    if (con_name) {
        originalNameValue = con_name.getValue();
    }
}

Xrm.Page.getAttribute("con_name").addOnChange(saveOriginalNameValue);



function checkQuotenumber(value) {
    if (value === null || value === undefined || value === "") {
        return false;
    }
    return true;
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


function updateNameFieldWithDigits() {
    var con_inquirynumber = Xrm.Page.getAttribute("con_inquirynumber").getValue();
    if (con_inquirynumber !== null && con_inquirynumber !== undefined) {
        var extractedDigits = extractDigitsFromZeroes(con_inquirynumber);
        var currentName = Xrm.Page.getAttribute("con_name").getValue();
        var updatedName = currentName + " [" + extractedDigits + "]";
        Xrm.Page.getAttribute("con_name").setValue(updatedName);
    }

    var con_supplierid = Xrm.Page.getAttribute("con_supplierid").getValue();
    if (con_supplierid !== null && con_supplierid !== undefined) {
        updateNameField();
    }
}

function updateNameField() {
    var con_supplierid = Xrm.Page.getAttribute("con_supplierid").getValue();
    if (con_supplierid !== null && con_supplierid !== undefined) {
        var name = con_supplierid[0].name;
        var currentName = Xrm.Page.getAttribute("con_name").getValue();

        if (currentName === null || currentName === undefined || !currentName.startsWith("Angebot vom")) {
            var updatedName = "Angebot vom " + name;
            Xrm.Page.getAttribute("con_name").setValue(updatedName);
        }
    }
}
*/

