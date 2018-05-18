sap.ui.define(
    [
        'sap/ui/core/Control',

    ],

    (Control) => {

        'use strict';

        return Control.extend("influenz.de.sample.util.THREEBaseCamera",
            {

                metadata: {

                    properties:
                    {
                        
                        cameraPositionX:
                        {
                            defaultValue : 10,
                        },
                        cameraPositionY:
                        {
                            defaultValue : 10,
                        },
                        cameraPositionZ:
                        {
                            defaultValue : 120,
                        },

                    }
                },
                
                
                getCamera() {},
                

                renderer: {},


                onAfterRendering: {}

            })
    });
