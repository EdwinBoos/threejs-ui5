sap.ui.define(
    [
        'sap/ui/core/Control',

    ],

    (Control) => {

        'use strict';

        return Control.extend("influenz.de.threeui5.util.THREEObject",
            {

                metadata: {
                    
                    properties :
                    {

                        texturePath :
                        {
                            type: "string",
                        },
                        objFilePath :
                        {
                            type: "string",
                        },
                        objPositionX :
                        {
                            defaultValue : 0,
                        },
                        objPositionY :
                        {
                            defaultValue : 0,
                        },
                        objPositionZ :
                        {
                            defaultValue : 0,
                        }
                        
                    }
                },


                init()  {},


                renderer: {},


                onAfterRendering: {}
                
            })
    });
