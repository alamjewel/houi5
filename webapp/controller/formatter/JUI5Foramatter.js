sap.ui.define([], function() {
    return {
        genderFormatter: function (sGender) {
            const oView = this.getView();
            const oi18nModel = oView.getModel('i18n');
            const oResourceBundle = oi18nModel.getResourceBundle();
            const sText = oResourceBundle.getText(sGender == 1 ? 'male' : 'female');
            return sText;
        }
    }
})