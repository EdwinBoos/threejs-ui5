sap.ui.define(['influenz/de/threeui5/util/THREEBaseCamera'],function(THREEBaseCamera){'use strict';return THREEBaseCamera.extend("influenz.de.threeui5.util.THREECubeCamera",{metadata:{},onBeforeRendering:function onBeforeRendering(){this.cubeCamera=new THREE.CubeCamera(45,720/1280,1,2000);this.cubeCamera.position.z=this.getCameraPositionZ();this.cubeCamera.position.y=this.getCameraPositionY();this.cubeCamera.position.x=this.getCameraPositionX();},getCamera:function getCamera(){return this.cubeCamera;},renderer:{render:function render(rendererManager,control){}},onAfterRendering:{}});});