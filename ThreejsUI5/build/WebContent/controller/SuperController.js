sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("influenz.de.threeui5.controller.SuperController",{handleNavigateBack:function(){this.getOwnerComponent().navigateBack()},getModel:function(e){return this.getView().getModel(e)},setModel:function(e,t){return this.getView().setModel(e,t)},getODataModel:function(){return this.getOwnerComponent().getModel("odataModel")},getI18nResourceBundle:function(){return this.getOwnerComponent().getModel("i18n").getResourceBundle()},getRouter:function(){return this.getOwnerComponent().getRouter()},getEventBus:function(){return sap.ui.getCore().getEventBus()}})});