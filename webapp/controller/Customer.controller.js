sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sct/training/jhoui5/controller/formatter/JUI5Foramatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JUI5Foramatter) {
        "use strict";

        return Controller.extend("sct.training.jhoui5.controller.Main", {
            formatter: JUI5Foramatter,
            onInit: function () {
            },
            onDelete: function (oEvent) {
                this._onDelete(oEvent.getParameters().listItem)
            },
            _onDelete: function (oListItem) {
                const oModel = this.getView().getModel();
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                // const oSource = oEvent.getSource();
                const sPath = oListItem.getBindingContext().getPath();

                MessageBox.warning(oResourceBundle.getText("deleteWarning"), {
                    title: oResourceBundle.getText("deleteWarningTitle"),
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (oAction) {
                        if(MessageBox.Action.YES == oAction) {
                            oModel.remove(sPath);                            
                        }
                    }
                })
            },
            onItemClick: function (oEvent) {
                const sPath = oEvent.getSource().getBindingContext().getPath();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CustomerDetails", {
                    path: sPath.split("/")[1]
                })
            },
            onAddBtnClick:  function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CreateCustomer", true)
            }
        });
    });
