sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/HTML',
    ],

    (Control, HTML) => {

        'use strict';

        return Control.extend("influenz.de.threeui5.util.THREEScene",
            {

                metadata: 
                {

                    properties: 
                    {
                        
                        height:
                        {
                            defaultValue : 1280,
                            type : "int"
                        },
                        width:
                        {
                            defaultValue : 720,
                            type : "int"
                        },
                        antiAlias:
                        {
                            defaultValue : true,
                            type : "boolean"
                        },
                        alpha:
                        {
                            defaultValue : true,
                            type : "boolean"
                        },
                        
                    },
                    events: 
                    {
                        
                        nextFrame : { enablePreventDefault : true }
                        
                    },
                    aggregations: 
                    {
                        
                        objects:
                        {
                            type : "influenz.de.threeui5.util.THREEObject",
                            multiple : true,
                            singularName : "object" 
                        },
                        camera:
                        {
                            types:  [ 
                                        "influenz.de.threeui5.util.THREEPerspectiveCamera",
                                        "influenz.de.threeui5.util.THREECubeCamera"
                                    ],
                                    multiple : false
                        },
                        directionalLight:
                        {
                            type: "influenz.de.threeui5.util.THREEDirectionalLight" ,
                            multiple: false
                        },
                        ambientLight:
                        {
                            type: "influenz.de.threeui5.util.THREEAmbientLight" ,
                            multiple: false
                        },

                    },

                },
                
                
                init() { },
                
                
                onBeforeRendering() 
                {

                    const loadingManager = new THREE.LoadingManager();
                    const objLoader = new THREE.OBJLoader(loadingManager);
                    const textureLoader = new THREE.TextureLoader(loadingManager);

                    this.scene = new THREE.Scene();
                    this.webGLRenderer = new THREE.WebGLRenderer( { antialias: this.getAntiAlias(), alpha: this.getAlpha() } );
                    this.webGLRenderer.setSize(this.getWidth(), this.getHeight());

                    jQuery.each(this.getObjects(), (x, object) =>
                        objLoader.load(object.getObjFilePath(), loadedObject =>
                            {

                                loadedObject.position.x = object.getObjPositionX();
                                loadedObject.position.z = object.getObjPositionZ();
                                loadedObject.position.y = object.getObjPositionY();

                                this.getScene().add(loadedObject);
                                this.getScene().add(this.getAggregation("directionalLight").getDirectionalLight());
                                this.getScene().add(this.getAggregation("ambientLight").getAmbientLight());
                                textureLoader.load(object.getTexturePath(), texture => {
                                    texture.needsUpdate = true;

                                    loadedObject.traverse(child => {
                                        if (child instanceof THREE.Mesh)
                                        {
                                            child.material.map = texture;
                                        }
                                    });
                                });
                            }
                        )
                    );
                },


                getScene() { return this.scene },


                getWebGLRenderer() { return this.webGLRenderer; },


                _renderPerFrame()
                {

                    const scene = this.getScene();
                    const camera = this.getAggregation("camera").getCamera();
                    const webGLRenderer = this.getWebGLRenderer();


                    this.fireNextFrame();
                    camera.lookAt(scene.position);
                    requestAnimationFrame(this._renderPerFrame.bind(this));
                    webGLRenderer.render(scene, camera);

                },


                renderer:
                {

                    render(rendererManager, control)
                    {

                        rendererManager.write("<div");
                        rendererManager.writeControlData(control);
                        rendererManager.write(">");
                        rendererManager.write("<ul");
                        rendererManager.write(">");
                        rendererManager.renderControl(control.getAggregation("camera"));
                        rendererManager.renderControl(control.getAggregation("ambientLight"));
                        rendererManager.renderControl(control.getAggregation("directionalLight"));
                        rendererManager.renderControl(new HTML().setDOMContent(control.getWebGLRenderer().domElement));
                        rendererManager.write("</div>");
                        control._renderPerFrame();

                    }
                },
            })
    });
