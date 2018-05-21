sap.ui.define(
    [
        'influenz/de/threeui5/util/THREEBaseLight',
    ],

    (THREEBaseLight) => {

        'use strict';

        return THREEBaseLight.extend("influenz.de.threeui5.util.THREEAmbientLight",
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
