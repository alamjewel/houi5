sap.ui.define([
    "sct/training/jhoui5/controller/BaseController",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/core/routing/History",
    "sct/training/jhoui5/controller/formatter/JUI5Foramatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, MessageBox, JSONModel, Fragment, History, JUI5Foramatter) {
        "use strict";

        return BaseController.extend("sct.training.jhoui5.controller.Main", {
            _fragmentList: {},
            _bCreate: false,
            formatter: JUI5Foramatter,
            onInit: function () {
                this.oEditModel = new JSONModel({
                    editMode: false
                })

                this.getView().setModel(this.oEditModel, "editModel");

                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute('CustomerDetails').attachPatternMatched(this._onPatternMatched, this);
                oRouter.getRoute('CreateCustomer').attachPatternMatched(this._onCreatePatternMatched, this);
                console.log(123)
            },
            _onPatternMatched: function (OEvent) {
                this._bCreate = false;
                const sPath = OEvent.getParameters().arguments.path;
                this.getView().bindElement(`/${sPath}`)
                this.oEditModel.setProperty("/editMode", false);
                this._showCustomerFragment('DisplayCustomer');
                console.log(sPath)
            },
            _onCreatePatternMatched: function () {
                this._bCreate = true;
                let oNewCustomerContext = this.getView().getModel().createEntry("/CustomerSet");
                this.getView().bindElement(oNewCustomerContext.getPath())
                this.oEditModel.setProperty("/editMode", true);
                this._showCustomerFragment('ChangeCustomer');

            },
            onSave: function () {
                let oModel = this.getView().getModel();
                let oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                let sSuccessText = "Saved successfully";
                /*
                
                let oData = oModel.getData();
                MessageBox.success(JSON.stringify(oData));
                this._toggleEdit(false);
                */
                oModel.submitChanges({
                    success: (oData, response) => {
                        MessageBox.success(sSuccessText, {
                            onClose: () => {
                                if (this.bCreate) {
                                    this.onNavBtnClick();
                                } else {
                                    this._toggleEdit(false);
                                }
                            }
                        });                        
                    },
                    error: (oError) => {
                        MessageBox.error(oError.message);
                    }
                });
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
            onCancelPressed: function () {
                let oModel = this.getView().getModel();
                oModel.resetChanges().then(() => {
                    if (this.bCreate) {
                        this.onNavBtnClick();
                    } else {
                        this._toggleEdit(false);
                    }
                });
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
