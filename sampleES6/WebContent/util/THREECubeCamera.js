sap.ui.define(
    [
        'influenz/de/sample/util/THREEBaseCamera',

    ],

    (THREEBaseCamera) => {

        'use strict';

        return THREEBaseCamera.extend("influenz.de.sample.util.THREECubeCamera",
            {

                metadata:
                {

                },


                onBeforeRendering()
                {

                    this.cubeCamera = new THREE.CubeCamera(45, 720 / 1280, 1, 2000);
                    this.cubeCamera.position.z = this.getCameraPositionZ();
                    this.cubeCamera.position.y = this.getCameraPositionY();
                    this.cubeCamera.position.x = this.getCameraPositionX();

                },


                getCamera() { return this.cubeCamera; },


                renderer: {  render(rendererManager, control) { } },


                onAfterRendering: {} 

            })
    });
