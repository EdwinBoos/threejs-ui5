
sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/HTML',
    ],

    (Control, HTML) => {

        'use strict';

        return Control.extend("influenz.de.sample.util.THREEScene",
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
                            type : "influenz.de.sample.util.THREEObject",
                            multiple : true,
                            singularName : "object" 
                        },
                        camera:
                        {
                            types:  [ 
                                        "influenz.de.sample.util.THREEPerspectiveCamera", 
                                        "influenz.de.sample.util.THREECubeCamera"
                                    ],
                                    multiple : false
                        },
                        directionalLight:
                        {
                            type: "influenz.de.sample.util.THREEDirectionalLight" ,
                            multiple: false
                        },
                        ambientLight:
                        {
                            type: "influenz.de.sample.util.THREEAmbientLight" ,
                            multiple: false
                        },

                    },

                },
                
                
                init() { },
                
                
                onBeforeRendering() 
                {

                    this.scene = new THREE.Scene();
                    this.webGLRenderer = new THREE.WebGLRenderer( { antialias: this.getAntiAlias(), alpha: this.getAlpha() } );
                    this.webGLRenderer.setSize(this.getWidth(), this.getHeight());

                },
                
                
                getScene() { return this.scene },
                
                
                getWebGLRenderer() { return this.webGLRenderer; },
                
                
                _renderPerFrame() 
                {

                    const scene = this.getScene();
                    const camera = this.getAggregation("camera").getCamera();
                    const webGLRenderer = this.getWebGLRenderer();

                    scene.add(this.getAggregation("directionalLight").getDirectionalLight());
                    scene.add(this.getAggregation("ambientLight").getAmbientLight());

                    this.fireNextFrame();
                    camera.lookAt(scene.position);
                    requestAnimationFrame(this._renderPerFrame.bind(this));
                    webGLRenderer.render(scene, camera);

                },


                renderer:
                {

                    render(rendererManager, control) 
                    {

                        const objLoader = new THREE.OBJLoader(new THREE.LoadingManager());

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

                        jQuery.each(control.getObjects(), (x, object) =>
                            objLoader.load(object.getObjFilePath(), loadedObject =>
                                {

                                    loadedObject.position.x = object.getObjPositionX();
                                    loadedObject.position.z = object.getObjPositionZ();
                                    loadedObject.position.y = object.getObjPositionY();
                                    control.getScene().add(loadedObject);

                                }
                            )
                        );

                        control._renderPerFrame();

                    }
                },
            })
    });
