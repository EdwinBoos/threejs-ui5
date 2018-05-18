sap.ui.define(
    [
        'influenz/de/sample/util/THREEBaseLight',
    ],

    (THREEBaseLight) => {

        'use strict';

        return THREEBaseLight.extend("influenz.de.sample.util.THREEAmbientLight",
            {

                metadata: {

                    properties:
                    {
                        
                    }
                    
                },


                onBeforeRendering()
                {

                    this.ambientLight = new THREE.AmbientLight(this.getColor());

                },


                getAmbientLight() { return this.ambientLight; },


                renderer: {  render(rendererManager, control) { } },


                onAfterRendering: {}
                

            })
    });
