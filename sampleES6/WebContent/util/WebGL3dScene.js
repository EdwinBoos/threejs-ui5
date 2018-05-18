sap.ui.define(
    
    ['sap/ui/core/Control'],

    (Control) => 
    {
    
        'use strict';

        return Control.extend("influenz.de.sample.util.webGL3dScene", 
        {

            metadata: 
            { 
                properties: 
                {
                    webGLAntiAlias: 
                    {
                        
                        type: "boolean"
                        
                    },
                    webGLAlpha: 
                    {
                        
                        type: "boolean"
                        
                    },
                    height: 
                    {
                        
                        type: "string", 
                        defaultValue: "1280"
                        
                    },
                    width: 
                    {
                        
                        type: "string",
                        defaultValue: "720"
                        
                    },
                    texturePath: 
                    {
                        
                        type: "string",
                        defaultType: "",
                        
                    },
                    objFilePath: 
                    {
                        
                        type: "string",
                        defaultType: "",
                        
                    },
                    webGLCameraPositionZ: 
                    {
                        
                        type: "string"
                        
                    },
                    webGLCameraPositionX: 
                    {
                        
                        type: "string"
                        
                    },
                    webGLCameraPositionY: 
                    {
                        
                        type: "string"
                        
                    },
                },  
                events : 
                {
                
                },
                "aggregations":
                {
                    "objects":
                    {
                        "type" : "influenz.de.sample.util.WebGL3dObject",
                        "multiple" : true ,
                        "singularName" : "object"
                    }
            }

            },


            
            init()  {   },
            

            renderer: 
            {

                render(rendererManager, control) 
                {
         
                        const webGLCamera = new THREE.PerspectiveCamera(45, control.getWidth() / control.getHeight(), 1, 2000);
                        const webGLAmbientLight = new THREE.AmbientLight(0x101030);
                        const webGLDirectionalLight = new THREE.DirectionalLight(0xffeedd);
                        const webGLScene = new THREE.Scene();
                        const loadingManager = new THREE.LoadingManager();
                        const imageLoader = new THREE.ImageLoader(loadingManager); 
                        const objLoader = new THREE.OBJLoader(loadingManager);
                        const webGLRenderer = new THREE.WebGLRenderer( );

                        webGLDirectionalLight.position.set(0, 0, 1); 
                        webGLCamera.position.z = control.getWebGLCameraPositionZ();
                        webGLCamera.position.y = control.getWebGLCameraPositionY();
                        webGLCamera.position.x = control.getWebGLCameraPositionX();

                        webGLScene.add(webGLAmbientLight);
                        webGLScene.add(webGLDirectionalLight)

                        rendererManager.write("<div"); 
                        rendererManager.writeControlData(control);
                        rendererManager.write(">");
                        rendererManager.write("<ul");
                        rendererManager.write(">");
                        jQuery.each(control.getObjects(), (x, object) => 
                        { 

                            rendererManager.renderControl(object);
                            objLoader.load(object.getObjFilePath(), objfile => 
                            { 
                                objfile.traverse(child => 
                                    {
                                        if (child instanceof THREE.Mesh) 
                                        {
                                            //child.material.map = webGLTexture;
                                        }
                                    }
                                );

                                //objfile.position.y = 0; 
                                //objfile.position.x = 0;
                                //objfile.position.z = 0;
                                webGLScene.add(objfile);
                                animate();

                                function animate()
                                {
                                    const SPEED = 0.01;
                                    //object.getAggregation("webGLDOM").rotation.y -= SPEED;
                                    //object.getAggregation("webGLDOM").rotation.x -= SPEED * 0.7;

                                    requestAnimationFrame(animate);
                                    webGLCamera.lookAt(webGLScene.position);
                                    webGLRenderer.render(webGLScene, webGLCamera);

                                }     

                            });
                        })
                        //rendererManager.write("</ul>");
                        rendererManager.write("</div>");
                        
                    

                
                }
            },


            onAfterRendering: function(event) {   }
            

        })
    });
;
