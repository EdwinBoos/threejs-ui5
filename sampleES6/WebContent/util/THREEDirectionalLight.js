sap.ui.define(
    [
        'influenz/de/threeui5/util/THREEBaseLight',
    ],

    (THREEBaseLight) => {

        'use strict';

        return THREEBaseLight.extend("influenz.de.threeui5.util.THREEDirectionalLight",
            {

                metadata: {

                    properties:
                    {
                        
                        intensity : { defaultValue : 1.0 },
                        position1Of3DVector : { type : "int" },
                        position2Of3DVector : { type : "int" },
                        position3Of3DVector : { type : "int" },
                     

                    }
                },


                onBeforeRendering()  
                {  
                    
                    this.directionalLight = new THREE.DirectionalLight(this.getColor(), this.getIntensity());
                    this.directionalLight.position.set(this.getPosition1Of3DVector(), this.getPosition2Of3DVector(), this.getPosition3Of3DVector());
                    
                },
                

                renderer: {  render(rendererManager, control) { } },
                
                
                getDirectionalLight() { return this.directionalLight; }, 


                onAfterRendering: {} 

            })
    });
