sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History,) {
        "use strict";

        return Controller.extend("sct.training.jhoui5.controller.Base", {
            onNavBtnClick: function () {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();
                if(sPreviousHash != undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this .getOwnerComponent().getRouter();
                    oRouter.navTo("RouteMain")
                }
            }
        });
    });
