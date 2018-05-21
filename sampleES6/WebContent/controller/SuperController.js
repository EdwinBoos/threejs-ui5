sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
    ],

    (Controller) => {


        "use strict"; 


        return Controller.extend("influenz.de.threeui5.controller.SuperController", {


            handleNavigateBack() { this.getOwnerComponent().navigateBack(); }, 


            getModel (name) { return this.getView().getModel(name); },


            setModel (model, name) { return this.getView().setModel(model, name); },


            getRouter() { return this.getOwnerComponent().getRouter(); },


            getEventBus() { return sap.ui.getCore().getEventBus(); },



        });
    }
);

