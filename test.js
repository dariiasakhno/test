--------------------------------------------------------1---------------------------------------------------------------
function setConUomidValue() {
    var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");

    if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
        var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
        const entityID = variantcodeidValue.replace("{", "").replace("}", "");
        console.log("value for variantcodeid: ");
        console.log(entityID);

        Xrm.WebApi.retrieveRecord("product", entityID, "?$select=con_packaging").then(function success(result) {
            console.log("Retrieved package: " + result.con_packaging);

            var conUomidAttribute = Xrm.Page.getAttribute("con_uomid");
            if (conUomidAttribute != null) {
                conUomidAttribute.setRequiredLevel("none");
                console.log("Setting con_uomid value: " + result.con_packaging);
                conUomidAttribute.setValue(result.con_packaging);
            } else {
                console.log("con_uomid attribute not found on the page.");
            }
        }, function (error) {
            console.log(error.message);
        });
    }
}
--------------------------------------------------------1---------------------------------------------------------------

/*
--------------------------------------------------------2---------------------------------------------------------------
try {
    Xrm.WebApi.retrieveRecord("product", entityID, "?$select=con_packaging").then(function success(result) {
        console.log("Retrieved package: " + result.con_packaging);

        var conUomidAttribute = Xrm.Page.getAttribute("con_uomid");
        if (conUomidAttribute != null) {
            conUomidAttribute.setRequiredLevel("none");
            console.log("Setting con_uomid value: " + result.con_packaging);

            var lookupValue = [{
                id: entityID,
                name: result.con_packaging,
                entityType: "product"
            }];

            conUomidAttribute.setLookupValue(lookupValue);
        } else {
            console.log("con_uomid attribute not found on the page.");
        }
    }, function (error) {
        console.log(error.message);
    });
} catch (error) {
    console.log(error);
}
--------------------------------------------------------2---------------------------------------------------------------


--------------------------------------------------------3---------------------------------------------------------------
async function setConUomidValue() {
     var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");
        if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
            var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
            const entityID = variantcodeidValue.replace("{", "").replace("}", "");
            console.log("value for variantcodeid: ");
            console.log(entityID);
            try {
                const result = await Xrm.WebApi.retrieveRecord("product", entityID, "?$select=con_packaging");
                console.log("Retrieved package: " + result.con_packaging);

                var conUomidAttribute = Xrm.Page.getAttribute("con_uomid");
                if (conUomidAttribute != null) {
                    conUomidAttribute.setRequiredLevel("none");
                    console.log("Setting con_uomid value: " + result.con_packaging);
                    conUomidAttribute.setValue(result.con_packaging);
                } else {
                    console.log("con_uomid attribute not found on the page.");
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

setConUomidValue();
--------------------------------------------------------3---------------------------------------------------------------

--------------------------------------------------------4---------------------------------------------------------------

function setConUomidValue() {
    var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");
        if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
            var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
            const entityID = variantcodeidValue.replace("{", "").replace("}", "");
            console.log("value for variantcodeid: ");
            console.log(entityID);

            Xrm.WebApi.retrieveRecord("product", entityID, "?$select=con_packaging")
                .then(function success(result) {
                    console.log("Retrieved package: " + result.con_packaging);
                    return Promise.resolve(result.con_packaging);
                })
                .then(function (con_packaging_value) {
                    var conUomidAttribute = Xrm.Page.getAttribute("con_uomid");
                    if (conUomidAttribute != null) {
                        conUomidAttribute.setRequiredLevel("none");
                        console.log("Setting con_uomid value: " + con_packaging_value);
                        conUomidAttribute.setValue(con_packaging_value);
                    } else {
                        console.log("con_uomid attribute not found on the page.");
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        }
    }
--------------------------------------------------------4---------------------------------------------------------------
--------------------------------------------------------5-callback------------------------------------------------------
    function setConUomidValue() {
        var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");

        if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
            var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
            const entityID = variantcodeidValue.replace("{", "").replace("}", "");
            console.log("value for variantcodeid: ");
            console.log(entityID);

            Xrm.WebApi.retrieveRecord("product", entityID, "?$select=con_packaging", function (result) {
                console.log("Retrieved package: " + result.con_packaging);

                var conUomidAttribute = Xrm.Page.getAttribute("con_uomid");
                if (conUomidAttribute != null) {
                    conUomidAttribute.setRequiredLevel("none");
                    console.log("Setting con_uomid value: " + result.con_packaging);
                    conUomidAttribute.setValue(result.con_packaging);
                } else {
                    console.log("con_uomid attribute not found on the page.");
                }
            }, function (error) {
                console.log(error.message);
            });
        }
    }

setConUomidValue();
--------------------------------------------------------5---------------------------------------------------------------
/*
var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");
if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
    var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
    console.log(variantcodeidValue);

    //con_uomid
    var queryUomid = "/Product?$filter=con_variantcodeid eq '" + variantcodeidValue + "'";
    Xrm.WebApi.retrieveMultipleRecords("Product", queryUomid, "?$select=con_uomid&$top=1")
    if (result.entities.length > 0) {
        var con_uomid = result.entities[0].con_uomid;
        console.log(con_uomid);
    }

    //con_supplierinquiryid
    var querySupplierInquiryId = "/Product?$filter=con_variantcodeid eq '" + variantcodeidValue + "'";
    Xrm.WebApi.retrieveMultipleRecords("Product", querySupplierInquiryId, "?$select=con_supplierinquiryid&$top=1")
    if (result.entities.length > 0) {
        var con_supplierinquiryid = result.entities[0].con_supplierinquiryid;
        console.log(con_supplierinquiryid);
    }


    //con_qty
    var queryQty = "/Product?$filter=con_variantcodeid eq '" + variantcodeidValue + "'";
    Xrm.WebApi.retrieveMultipleRecords("Product", queryQty, "?$select=con_qty&$top=1")
    if (result.entities.length > 0) {
        var con_qty = result.entities[0].con_qty;
        console.log(con_qty);
    }

}


var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");
if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
    var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
    console.log(variantcodeidValue);

    //con_uomid
    var queryUomid = "/Product?$filter=con_variantcodeid eq '" + variantcodeidValue + "'";
    Xrm.WebApi.retrieveMultipleRecords("Product", queryUomid, "?$select=con_uomid&$top=1").then(function(result) {
        if (result.entities.length > 0) {
            var con_uomid = result.entities[0].con_uomid;
            console.log(con_uomid);
        }
    }).catch(function(error) {
        console.error("Error retrieving con_uomid: " + error.message);
    });

    //con_supplierinquiryid
    var querySupplierInquiryId = "/Product?$filter=con_variantcodeid eq '" + variantcodeidValue + "'";
    Xrm.WebApi.retrieveMultipleRecords("Product", querySupplierInquiryId, "?$select=con_supplierinquiryid&$top=1").then(function(result) {
        if (result.entities.length > 0) {
            var con_supplierinquiryid = result.entities[0].con_supplierinquiryid;
            console.log(con_supplierinquiryid);
        }
    }).catch(function(error) {
        console.error("Error retrieving con_supplierinquiryid: " + error.message);
    });

    //con_qty
    var queryQty = "/Product?$filter=con_variantcodeid eq '" + variantcodeidValue + "'";
    Xrm.WebApi.retrieveMultipleRecords("Product", queryQty, "?$select=con_qty&$top=1").then(function(result) {
        if (result.entities.length > 0) {
            var con_qty = result.entities[0].con_qty;
            console.log(con_qty);
        }
    }).catch(function(error) {
        console.error("Error retrieving con_qty: " + error.message);
    });
}



var uomidAttribute = Xrm.Page.getAttribute("con_uomid");
var supplierinquiryidAttribute = Xrm.Page.getAttribute("con_supplierinquiryid");
var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");
var qtyAttribute = Xrm.Page.getAttribute("con_qty");

var uomidValue = uomidAttribute.getValue();
var supplierinquiryidValue = supplierinquiryidAttribute.getValue();
var variantcodeidValue = variantcodeidAttribute.getValue();
var qtyValue = qtyAttribute.getValue();

console.log(uomidValue);
console.log(supplierinquiryidValue);
console.log(variantcodeidValue);
console.log(qtyValue);


function autoFillUomid() {
    var variantcodeidInput = document.getElementById('con_variantcodeid');
    var uomidInput = document.getElementById('con_uomid');

    var variantcodeidValue = variantcodeidInput.value;

    database.connect().then(function() {
        return database.query('SELECT con_uomid FROM your_table WHERE con_variantcodeid = ?', [variantcodeidValue]);
    }).then(function(result) {
        if (result.length > 0) {
            const con_uomid = result[0].con_uomid;
            uomidInput.value = con_uomid;
        } else {
            uomidInput.value = '';
        }
    }).catch(function(error) {
        console.error("Error executing database query: " + error);
    });
}

autoFillUomid();


function autoFillUomid() {
    var variantcodeidInput = document.getElementById('con_variantcodeid');
    var uomidInput = document.getElementById('con_uomid');

    var variantcodeidAttribute = Xrm.Page.getAttribute("con_variantcodeid");
    var variantcodeidValue = null;
    if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
        variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
        console.log(variantcodeidValue);
    }

    if (variantcodeidValue === '\n' + 'Tire 1000-20-16PR PT20' ||
        variantcodeidValue === '100% VISCOSE YARN NE 30/1' ||
        variantcodeidValue === '100%NYLON 6 70/24/2 PA' ||
        variantcodeidValue === '25-kg-Säcke' ||
        variantcodeidValue === '2-HYDROXYPROPYL METHACRYLA' ||
        variantcodeidValue === '3-(1-PIPERAZINYL)-1,2-BENZ' ||
        variantcodeidValue === '300-kg-Big Bags' ||
        variantcodeidValue === '5-CHLOROETHYL-6-CHLOROINDO' ||
        variantcodeidValue === '65/35 POLYESTER/VISCOSE RI' ||
        variantcodeidValue === 'A1-SMG' ||
        variantcodeidValue === 'ABC DRY POWDER EXTINGUISH' ||
        variantcodeidValue === 'Abrechnung Palettenkonto') {
        uomidInput.value = 'BB-1,500MT';
    } else if (variantcodeidValue === 'ABS TYPWARE' ||
        variantcodeidValue === 'ABS-MAHLGUT' ||
        variantcodeidValue === 'AC34B3' ||
        variantcodeidValue === 'AC34B4' ||
        variantcodeidValue === 'AC34B5' ||
        variantcodeidValue === 'AC34B6' ||
        variantcodeidValue === 'AC44B4' ||
        variantcodeidValue === 'AC44B6' ||
        variantcodeidValue === 'Acesulfame K' ||
        variantcodeidValue === 'ACESULFAME K' ||
        variantcodeidValue === 'Acetic Acid' ||
        variantcodeidValue === 'Acetone' ||
        variantcodeidValue === 'Acetyl acetone' ||
        variantcodeidValue === 'Acetophenone') {
        uomidInput.value = 'FLASCHE';
    } else {
        uomidInput.value = '';
    }

    variantcodeidInput.addEventListener('change', autoFillUomid);
}

autoFillUomid();


if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
    var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
    const entityID = variantcodeidValue.replace("{", "").replace("}", "");
    console.log("value for variantcodeid: ");
    console.log(entityID);

    Xrm.WebApi.retrieveRecord("product", entityID,  "?$select=con_packaging").then(function success(result) {
            //console.log("Retrieved values: currencyname: " + result.currencyname);
            // console.log("Retrieved values: currencysymbol: " + result.currencysymbol);
            console.log("Retrieved package: " + result.con_packaging);
            Xrm.Page.getAttribute("con_uomid").setValue(result);
        }

        , // handle error conditions
        function (error) {
            console.log(error.message);
        }
    )
    ;
}
//

if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
    var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
    const entityID = variantcodeidValue.replace("{", "").replace("}", "");
    console.log("value for variantcodeid: ");
    console.log(entityID);

    Xrm.WebApi.retrieveRecord("product", entityID,  "?$select=con_packaging").then(function success(result) {
            //console.log("Retrieved values: currencyname: " + result.currencyname);
            // console.log("Retrieved values: currencysymbol: " + result.currencysymbol);
            console.log("Retrieved package: " + result.con_packaging_id);



        }

        , // handle error conditions
        function (error) {
            console.log(error.message);
        }
    )
    ;
}


}

, // handle error conditions
function (error) {
    console.log(error.message);
}
)
;
}
//

if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
    var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
    const entityID = variantcodeidValue.replace("{", "").replace("}", "");
    console.log("value for variantcodeid: ");
    console.log(entityID);

    Xrm.WebApi.retrieveRecord("product", entityID,  "?$select=con_packaging").then(function success(result) {
            console.log("Retrieved package: " + result.con_packaging);
            Xrm.Page.getAttribute("con_uomid").setValue(result);
        }

        , // handle error conditions
        function (error) {
            console.log(error.message);
        }
    )
    ;
}
VM1306:4 value for variantcodeid:
VM1306:5 F3C7693F-BE7A-EC11-8D21-6045BD8D1746
Promise {<pending>}
    VM1306:10 Retrieved package: MT

    //

    if (variantcodeidAttribute != null && variantcodeidAttribute.getValue() != null) {
        var variantcodeidValue = variantcodeidAttribute.getValue()[0].id;
        const entityID = variantcodeidValue.replace("{", "").replace("}", "");
        console.log("value for variantcodeid: ");
        console.log(entityID);

        Xrm.WebApi.retrieveRecord("product", entityID,  "?$select=con_packaging").then(function success(result) {
        //console.log("Retrieved values: currencyname: " + result.currencyname);
        // console.log("Retrieved values: currencysymbol: " + result.currencysymbol);
        console.log("Retrieved package: " + result.con_packaging);
        Xrm.Page.getAttribute("con_uomid").setValue(result);
    }

        , // handle error conditions
        function (error) {
        console.log(error.message);
    }
        )
        ;
    }
    //

    let transactionCurrencyID = Xrm.Page.getAttribute("transactioncurrencyid").getValue();
    Xrm.Page.getAttribute("erz_calc_currency01").setValue(transactionCurrencyID);0
    :
    {entityType: 'transactioncurrency', id: '{DAD1E673-FF3E-EC11-8C60-000D3AAF3F20}', name: 'Euro'}
    length
    :
    1
    [[Prototype]]
    :
    Array(0)

    let transactionCurrencyID = Xrm.Page.getAttribute("transactioncurrencyid").getValue();
    Xrm.Page.getAttribute("erz_calc_currency01").setValue(transactionCurrencyID);


    console.log(transactionCurrencyID);

    */