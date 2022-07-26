sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("sct.training.jhoui5.controller.Main", {
            _fragmentList: {},
            onInit: function () {
                this.oEditModel = new JSONModel({
                    editMode: false
                })

                this.getView().setModel(this.oEditModel, "editModel");
                this._showCustomerFragment('DisplayCustomer');
            },
            genderFormatter: function (sGender) {
                const oView = this.getView();
                const oi18nModel = oView.getModel('i18n');
                const oResourceBundle = oi18nModel.getResourceBundle();
                const sText = oResourceBundle.getText(sGender);
                return sText;
            },
            onSave: function () {
                this._toogelEdit(false);
                // const oModel = this.getView().getModel();
                // const data = oModel.getData();
                // MessageBox.success(`Current customer name:: ${data.firstName} ${data.lastName}`)
                // {
                //     title: "Success",                                    // default
                //     onClose: null,                                       // default
                //     styleClass: "",                                      // default
                //     actions: sap.m.MessageBox.Action.OK,                 // default
                //     emphasizedAction: sap.m.MessageBox.Action.OK,        // default
                //     initialFocus: null,                                  // default
                //     textDirection: sap.ui.core.TextDirection.Inherit     // default
                // });
            },
            onCancel: function () {
                this._toogelEdit(false);
            },
            _showCustomerFragment: function(sFragmentName) {
                // Clearing the element of the page
                let oPage = this.getView().byId("page");
                oPage.removeAllContent();

                //Load the fragment by sFragmentName

                if(this._fragmentList[sFragmentName]) {
                    oPage.insertContent(this._fragmentList[sFragmentName])
                } else {
                    Fragment.load({
                        id: this.getView().createId(sFragmentName),
                        name: `sct.training.jhoui5.view.fragment.${sFragmentName}`,
                        controller: this
                    }).then(function(oFragment) {
                        this._fragmentList[sFragmentName] = oFragment;
                        oPage.insertContent(oFragment)
                    }.bind(this));
                }
            },
            onEdit: function () {
                this._toogelEdit(true);
            },
            _toogelEdit: function (bEditMode) {
                this.oEditModel.setProperty("/editMode", bEditMode);
                this._showCustomerFragment(bEditMode ? 'ChangeCustomer' : 'DisplayCustomer');
            }
        });
    });
