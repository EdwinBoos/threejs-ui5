sap.ui.define(
    [
        'sap/ui/core/Control',
        'sap/ui/core/HTML',
        'influenz/de/sample/util/THREEPerspectiveCamera',
        
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
                        },
                        width:
                        {
                            defaultValue : 720,
                        },
                        antiAlias:
                        {
                            defaultValue : true,
                        },
                        alpha:
                        {
                            defaultValue : true, 
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
                
                
                init() 
                {
                  
                },
                
                
                onBeforeRendering() 
                {
                    
                    this.setAggregation("camera", this.getAggregation("camera")); 
                    this.setAggregation("ambientLight", this.getAggregation("ambientLight")); 
                    this.setAggregation("directionalLight", this.getAggregation("directionalLight")); 
                    this.scene = new THREE.Scene();
                    this.webGLRenderer = new THREE.WebGLRenderer( { antialias: this.getAntiAlias(), alpha: this.getAlpha() } );
                    this.webGLRenderer.setSize(this.getWidth(), this.getHeight());
                    this.webGLRenderer.setClearColor(0xffffff, 0); 
                    this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
                    
                },
                
                
                getScene() { return this.scene },
                
                
                getWebGLRenderer() { return this.webGLRenderer; },
                
                
                _renderPerFrame() 
                {
                    
                    const camera = this.getAggregation("camera").getCamera();
                    const scene = this.getScene()
                    const webGLRenderer = this.getWebGLRenderer();
                    
                    this.fireNextFrame();
                    webGLRenderer.render(scene, camera);
                    camera.lookAt(scene.position);
                    requestAnimationFrame(this._renderPerFrame.bind(this)); 
                
                }, 
                
                
                renderer:  
                {

                    render(rendererManager, control) 
                    {

                        const scene = control.getScene();
                        const loadingManager = new THREE.LoadingManager();
                        const objLoader = new THREE.OBJLoader(loadingManager);
                        const htmlCanvas = new HTML().setDOMContent(control.getWebGLRenderer().domElement);
                        
                        scene.add(control.getAggregation("ambientLight").getAmbientLight());
                        scene.add(control.getAggregation("directionalLight").getDirectionalLight());
                      
                        rendererManager.write("<div");
                        rendererManager.writeControlData(control);
                        rendererManager.write(">");
                        rendererManager.write("<ul")
                        rendererManager.write(">");
                        rendererManager.renderControl(htmlCanvas); 
                        rendererManager.renderControl(control.getAggregation("camera")) 
                        rendererManager.renderControl(control.getAggregation("ambientLight")) 
                        rendererManager.renderControl(control.getAggregation("directionalLight")) 
                        rendererManager.write("</div>");

                        jQuery.each(control.getObjects(), (x, object) => 
                        { 
                            
                            objLoader.load(object.getObjFilePath(), 
                            
                                loadedObject => 
                                {

                                    loadedObject.position.x = object.getObjPositionX(); 
                                    loadedObject.position.z = object.getObjPositionZ();
                                    loadedObject.position.y = object.getObjPositionY();
    
                                    scene.add(loadedObject);
                                    control._renderPerFrame();

                                }
                            );

                        });
                    }
                },
            })
    });
