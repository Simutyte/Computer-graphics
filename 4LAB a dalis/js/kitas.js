
$(function () {

    var BishopPointsX = [256, 241, 231, 221, 216, 216, 211, 211, 216, 226, 221, 211, 211, 216, 201, 211, 201, 196, 201, 216, 216, 211, 211, 216, 226, 226, 226, 221, 216, 211, 206, 191, 181, 181, 196, 191, 176, 151, 136, 131, 136, 146, 131, 126, 126, 151, 201, 256, 250];
    var BishopPointY = [65, 74, 88, 107, 121, 120, 139, 153, 167, 181, 180, 184, 188, 192, 196, 190, 194, 203, 212, 216, 215, 219, 223, 227, 231, 260, 289, 323, 347, 371, 375, 374, 383, 392, 401, 410, 419, 428, 437, 451, 458, 467, 471, 480, 494, 491, 491, 491, 491];

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();
	var camera;

    // create a camera, which defines where we"re looking at.
    var camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	// position and point the camera to the center of the scene
	camera1.position.set(-80, 80, 80);
    camera1.lookAt(scene.position);

	camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 150);
	camera2.position.set(-65, 16, -25)
	//camera2.lookAt(-5, 15, -25);
	scene.add(camera2);
	camera2Helper = new THREE.CameraHelper(camera2);
	scene.add(camera2Helper);

	camera2Object = createCamera();
	camera2Object.position.set(camera2.position.x, camera2.position.y, camera2.position.z);
	scene.add(camera2Object);

	camera3 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera3.position.set(-5, 30, 15);

	camera3Object = createCamera();
	camera3Object.position.set(camera3.position.x, camera3.position.y, camera3.position.z);
	//camera3Object.rotation.y =Math.PI;
	scene.add(camera3Object);


    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // axes helper
    var axes = new THREE.AxisHelper( 20 );
     scene.add(axes);


    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;

    // add the plane to the scene
    scene.add(plane);

    // create box
    var width = 10;
    var hight = 8;
    var depth = 10;

    
    var boxGeometry = new THREE.BoxGeometry(width, hight, depth);

    //juodi
    var blackColor = 0x63614b;
    var blackBoxMaterial = new THREE.MeshPhongMaterial({ color: 0x454134, shininess: 100 });

    //balti
    var whiteColor = 0xe6d8ae;
    var whiteBoxMaterial = new THREE.MeshPhongMaterial({ color: 0xf4eedb, shininess: 100 });

    var startX = -35;
    var startZ = 35;
    var lastX = -35;
    var lastZ = 35;
    var reverse = false;
    
    // stack of boxes
    for (i = 1; i <= 64; i++) {


        if (i % 2 == 0) 
            box = new THREE.Mesh(boxGeometry, blackBoxMaterial);
        else
            box = new THREE.Mesh(boxGeometry, whiteBoxMaterial);

        box.castShadow = true;
        box.receiveShadow = true;
        box.position.y = hight / 2;
        box.position.x = lastX;
        box.position.z = lastZ;
        scene.add(box);

        if (i % 8 == 0) {
            lastZ = lastZ - depth;


            if (i % 16 == 0)
                reverse = false;
            else
                reverse = true;

        }
        else {
            if (reverse)
                lastX = lastX - width;
            else
                lastX = lastX + width;
        }
      
    }

    //baltu puse
   
	var WhiteBishop1 = Bishop(12, whiteColor, -35, 15, 15);
    scene.add(WhiteBishop1);

    //camera3.lookAt(new THREE.Vector3(WhiteBishop1.position.x, WhiteBishop1.position.y, WhiteBishop1.position.z));
    camera3.lookAt(WhiteBishop1.position);
    camera3.updateMatrixWorld();

    camera3Object.lookAt(WhiteBishop1.position);
    
    //maniskis - kairesnis
    var WhiteBishop2 = Bishop(12, whiteColor, -5, 15, -25);
    scene.add(WhiteBishop2);

	//var target = new THREE.Vector3();
	//target.set(WhiteBishop2.position.x, WhiteBishop2.position.y, WhiteBishop2.position.z)
    camera2.lookAt(new THREE.Vector3(WhiteBishop2.position.x, WhiteBishop2.position.y, WhiteBishop2.position.z));
	camera2.updateMatrixWorld();
	camera2Helper.update();

    camera2Object.lookAt(WhiteBishop2.position);
    camera2Object.updateMatrixWorld();

    var startdir = new THREE.Vector3();
	startdir.subVectors(camera2.position, new THREE.Vector3(WhiteBishop2.position.x, WhiteBishop2.position.y, WhiteBishop2.position.z));
	var eyeTargetScale = Math.tan(camera2.fov * (Math.PI / 180) / 2) * startdir.length();


    //scene.add(Bishop(12, blackColor, 35, 15, 15));
    
    //scene.add(Bishop(12, blackColor, 35, 15, -15));
    

    zoomInDolly(0);
	

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(25, 180, 25);
    spotLight.target.position.set(0, 0, 0)
    spotLight.castShadow = true;
    spotLight.intensity = 1;

    
    scene.add(spotLight);

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    var controls = new function () {

		this.FOV = 45;
		this.dollyZoom = 0;
        scene.add(spotLight.target);

		this.first = function(){
			changeCamera(1);
		}

		this.changeFOV = function(){
			camera1.fov = controls.FOV;
			camera1.updateProjectionMatrix();
		}

		this.changeDolly = function(){
			zoomInDolly(controls.dollyZoom);
		}

		this.second = function(){
			changeCamera(2);
		}

		this.third = function(){
			changeCamera(3);
		}

        this.rotateResult = false;
		changeCamera(1);
    }


    var gui = new dat.GUI();
	gui.add(controls, "rotateResult");
	gui.add(controls, "first").name('First camera');
	gui.add(controls, "FOV", 2, 100).onChange(controls.changeFOV);
	gui.add(controls, "second").name('Second camera');
	gui.add(controls, "dollyZoom", -100, 100).name('dolly zoom').onChange(controls.changeDolly);
	gui.add(controls, "third").name('Third camera');

    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);
    var trackballControls  = new THREE.TrackballControls(camera, renderer.domElement);
    var zenklas=1;

    render();
    var step = 0;
    var sk;
    function render() {
        // render
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        trackballControls.update();

        if (controls.rotateResult && scene) {
            if(WhiteBishop1.position.x > 35)
                zenklas = -1;
            
            if(WhiteBishop1.position.x < -35)
                zenklas = 1;
			
            step = 0.04;   
			WhiteBishop1.position.x += zenklas*step;

            camera3.lookAt(WhiteBishop1.position);
	        camera3Object.lookAt(WhiteBishop1.position);


            if (  WhiteBishop1.position.x >= camera3.position.x-25 && WhiteBishop1.position.x <= camera3.position.x+5) {
                //console.log("*****");
                sk = Math.cos(-(Math.PI / (30)) * WhiteBishop1.position.x);
                //console.log(sk);
                sk = sk-1;
                //console.log(sk);
                rotation = sk * Math.PI / 2 - Math.PI / 2;
                console.log(rotation);
                camera3.rotation.z = rotation;
                camera3.updateProjectionMatrix();
                camera3Object.rotation.z = rotation;
            }

            
        }
    }


	function changeCamera(nr)
	{
		if(nr == 1)
			camera = camera1;

		if(nr == 2)
			camera = camera2;

		if(nr == 3)
			camera = camera3;
	}

    
    function zoomInDolly(zoom){
        
        camera2.position.x = -65 - (zoom/(100/(-60-WhiteBishop2.position.x)));

        let target = new THREE.Vector3();
        target.set(WhiteBishop2.position.x, WhiteBishop2.position.y, WhiteBishop2.position.z)
        var distance = camera2.position.distanceTo(target);

        camera2.near = distance / 100;
        camera2.far = distance + 100;
        camera2.fov = (180 / Math.PI) * 2 * Math.atan(15 / distance);
        camera2.lookAt(target);
        
        camera2.updateProjectionMatrix();
        camera2.updateMatrixWorld();
        camera2Helper.update();

        camera2Object.position.set(camera2.position.x, camera2.position.y, camera2.position.z);
        camera2Object.updateMatrixWorld();
    }


    function Bishop(segments = 12, color, x, y, z )
    {
        var pointsX = BishopPointsX;
        var pointsY = BishopPointY;

        // add 10 random spheres
        var points = [];
        var height = 5;
        var count = pointsX.length;
        for (var i = 0; i < count; i++) {
            points.push(new THREE.Vector3(25 - pointsX[i] / 10, 0, (pointsY[30] - pointsY[i] - 174) / 10));
        }
        
        var latheGeometry = new THREE.LatheGeometry(points, Math.ceil(segments), 0, 2 * Math.PI);

        latheMesh = createSimpleMesh(latheGeometry, color);

        var sphere = createSimpleMesh(new THREE.SphereGeometry(2, 20, 30), color);
        sphere.position.set(0, 0, 14.5);
        sphere.updateMatrix();

        latheMesh.geometry.merge(sphere.geometry, sphere.matrix);
        latheMesh.position.set(x, y, z);
        latheMesh.scale.set(0.25, 0.25, 0.25);
        latheMesh.rotation.set(-Math.PI/2,0,0);
        latheMesh.receiveShadow = true;
        latheMesh.castShadow = true;
        return latheMesh;
        //scene.add(latheMesh);

    }

    function createSimpleMesh(geom, color = 0xe6d8ae) {

        // assign two materials
        //vienspalvis
        var meshMaterial = new THREE.MeshPhongMaterial({ color: color, shininess: 100 });
        //var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        //var wireFrameMat = new THREE.MeshBasicMaterial({ opacity: 0.5, wireframeLinewidth: 0.5 });
        //wireFrameMat.wireframe = true;

        // create a multimaterial
        var mesh = new THREE.Mesh(geom, meshMaterial);

        return mesh;
    }


	function createCamera() {
		var cameraAxes = new THREE.AxisHelper(20);
		var mat = new THREE.MeshPhongMaterial({ color: 0x555555, shininess: 100 });
		//ilgis, aukstis, plotis
		var body = new THREE.Mesh(new THREE.BoxGeometry(8, 5, 3), mat);
	
		//virsutins r, apatinis r, aukstis, segmentai
		var lens = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 2, 2, 100), mat);
		lens.rotation.z = Math.PI / 2
		lens.position.x += 5;
		
		var middleLens = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.8, 2.01, 100), new THREE.MeshPhongMaterial({ color: 0xFFFF00, shininess: 100 }));
		middleLens.rotation.z = Math.PI / 2;
		middleLens.position.x += 5;

		var top = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 2.5, 100), mat);
		top.rotation.x = Math.PI / 2
		top.position.set(-2.5, 4, 0);
	
		var top2 = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 2.5, 100), mat);
		top2.rotation.x = -Math.PI / 2
		top2.position.set(2.5, 4, 0);
	
		var cameraGroup = new THREE.Group();
		cameraGroup.add(body);
		cameraGroup.add(lens);
		cameraGroup.add(middleLens);
		cameraGroup.add(top);
		cameraGroup.add(top2);
		cameraGroup.add(cameraAxes);
        cameraGroup.rotation.y = -Math.PI / 2;
		cameraGroup.position.z = -4;
		
        // kad logiskai eitu asys
        orientedCamera = new THREE.Group();
        orientedCamera.add(cameraGroup);
		return orientedCamera;
	}
   

   
});


