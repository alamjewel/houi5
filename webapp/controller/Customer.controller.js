sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("sct.training.jhoui5.controller.Main", {
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
            }
        });
    });
