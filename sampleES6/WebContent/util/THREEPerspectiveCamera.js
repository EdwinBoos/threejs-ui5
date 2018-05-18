sap.ui.define(
    [
        'influenz/de/sample/util/THREEBaseCamera',

    ],

    (THREEBaseCamera) => {

        'use strict';

        return THREEBaseCamera.extend("influenz.de.sample.util.THREEPerspectiveCamera",
            {

                metadata: 
                {

                },


                onBeforeRendering()   
                {
                    
                    this.perspectiveCamera = new THREE.PerspectiveCamera(45, 720 / 1280, 1, 2000);
                    this.perspectiveCamera.position.z = this.getCameraPositionZ();
                    this.perspectiveCamera.position.y = this.getCameraPositionY();
                    this.perspectiveCamera.position.x = this.getCameraPositionX();
                    
                },
                
                
                getCamera() { return this.perspectiveCamera; },


                renderer: {  render(rendererManager, control) { } },


                onAfterRendering: {}

            })
    });
