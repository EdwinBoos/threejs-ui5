sap.ui.define(
    [
        'sap/ui/core/Control',
    ],

    (Control) => {

        'use strict';

        return Control.extend("influenz.de.threeui5.util.THREEBaseLight",
            {

                metadata: {

                    properties:
                    {
                        color : { defaultValue : 0xffeedd, type : "int" },
                    }
                },
                
                
                renderer : { }

            })
    });
