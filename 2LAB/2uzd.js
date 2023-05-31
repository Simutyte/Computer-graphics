
$(function () {

    var KingPointsX = [250, 240, 228, 217, 208, 206, 207, 211, 215, 220, 225, 221, 219, 218, 216, 214, 213, 213, 215, 219, 222, 224, 227, 229, 229, 229, 229, 229, 228, 226, 223, 218, 212, 205, 196, 191, 191, 177, 169, 168, 175, 180, 180, 169, 167];
    var KingPointsY = [26, 28, 31, 35, 40, 44, 53, 65, 75, 84, 92, 96, 100, 104, 105, 107, 109, 111, 113, 114, 115, 118, 121, 123, 155, 171, 186, 202, 214, 226, 238, 250, 262, 274, 286, 292, 298, 310, 322, 334, 346, 347, 351, 351, 360];
    var SoldierPointsX = [250, 220, 208, 201, 196, 194, 194, 197, 203, 213, 225, 208, 203, 208, 228, 226, 224, 221, 217, 212, 204, 188, 185, 174, 169, 168, 175, 172, 172, 173, 250];
    var SoldierPointsY = [34, 46, 58, 70, 82, 94, 106, 118, 130, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 298, 310, 322, 334, 346, 358, 370, 382, 382];
    var BishopPointsX = [256, 241, 231, 221, 216, 216, 211, 211, 216, 226, 221, 211, 211, 216, 201, 211, 201, 196, 201, 216, 216, 211, 211, 216, 226, 226, 226, 221, 216, 211, 206, 191, 181, 181, 196, 191, 176, 151, 136, 131, 136, 146, 131, 126, 126, 151, 201, 256, 250];
    var BishopPointY = [65, 74, 88, 107, 121, 120, 139, 153, 167, 181, 180, 184, 188, 192, 196, 190, 194, 203, 212, 216, 215, 219, 223, 227, 231, 260, 289, 323, 347, 371, 375, 374, 383, 392, 401, 410, 419, 428, 437, 451, 458, 467, 471, 480, 494, 491, 491, 491, 491];
    var QueenPointX = [251, 241, 236, 241, 221, 206, 201, 181, 196, 211, 221, 211, 211, 216, 201, 211, 201, 196, 201, 216, 216, 211, 211, 216, 226, 226, 226, 221, 216, 211, 206, 191, 181, 181, 196, 191, 176, 151, 136, 131, 136, 146, 131, 126, 126, 151, 201, 256];
    var QueenPointY = [15, 19, 33, 42, 51, 60, 74, 68, 92, 121, 180, 184, 188, 192, 196, 190, 194, 203, 212, 216, 215, 219, 223, 227, 231, 260, 289, 323, 347, 371, 375, 374, 383, 392, 401, 410, 419, 428, 437, 451, 458, 467, 471, 480, 494, 493, 492, 491];
    var TowerPointX = [251, 251, 236, 226, 226, 201, 201, 181, 161, 161, 161, 161, 176, 176, 181, 196, 191, 201, 206, 206, 206, 201, 191, 186, 166, 151, 161, 136, 126, 126, 131, 116, 116];
    var TowerPointY = [15, 20, 19, 23, 42, 41, 20, 19, 18, 37, 66, 72, 81, 80, 94, 98, 112, 121, 135, 159, 213, 262, 336, 340, 359, 373, 387, 401, 415, 429, 443, 457, 476];
    var HorsePointX = [];
    var HorcePointY = [];

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var scene = new THREE.Scene();

    // create a camera, which defines where we"re looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    //tower(-35, 8, 35);
    scene.add(generateMesh(TowerPointX, TowerPointY, whiteColor, -35, 11, 35, 0.2, 0.2, 0.2));
    horse(-35, 8, 25, 1, whiteColor);


    scene.add(Bishop(12, whiteColor, -35, 15, 15));
    //queen(-35, 8, 5);*/
    var WhiteQueen = generateMesh(QueenPointX, QueenPointY, whiteColor, -35, 15.5, 5, 0.3, 0.3, 0.3);
    scene.add(WhiteQueen);
    //king(-35, 8, -5);
    var WhiteKing = generateMesh(KingPointsX, KingPointsY, whiteColor, -35, 18.5, -5, 0.35, 0.35, 0.35);
    scene.add(WhiteKing);
    
    //maniskis
    var WhiteBishop2 = Bishop(12, whiteColor, -35, 15, -15);
    scene.add(WhiteBishop2);

    //horse(-35, 8, -25, 1, whiteColor);
    //tower(-35, 8, -35);
    scene.add(generateMesh(TowerPointX, TowerPointY, whiteColor, -35, 11, -35,0.2, 0.2, 0.2));

    //antra eile
    for (let i = 0; i < 8; i++) {
        //soldier(-25, 8, -35+i*10); //pėstininkas
        scene.add(generateMesh(SoldierPointsX, SoldierPointsY, whiteColor, -25, 11.5, -35 + i * 10, 0.2, 0.2, 0.2));
    }

    //kita puse - juodu
    //tower(35, 8, 35);
    scene.add(generateMesh(TowerPointX, TowerPointY, blackColor, 35, 11, 35, 0.2, 0.2, 0.2));
    //horse(35, 8, 25, -1, blackColor);

    scene.add(Bishop(12, blackColor, 35, 15, 15));
    //queen(35, 8, 5);
    scene.add(generateMesh(QueenPointX, QueenPointY, blackColor, 35, 15.5, 5, 0.3, 0.3, 0.3));
    //king(35, 8, -5);
    var BlackKing = generateMesh(KingPointsX, KingPointsY, blackColor, 35, 18.5, -5, 0.35, 0.35, 0.35);
    scene.add(BlackKing);
    scene.add(Bishop(12, blackColor, 35, 15, -15));
    //horse(35, 8, -25, -1, blackColor);

    //tower(35, 8, -35);
    var BlackTower2 = generateMesh(TowerPointX, TowerPointY, blackColor, 35, 11, -35, 0.2, 0.2, 0.2); 
    scene.add(BlackTower2);

    //antra eile
    for (let i = 0; i < 8; i++) {
        //soldier(25, 8, -35 + i * 10);
        scene.add(generateMesh(SoldierPointsX, SoldierPointsY, blackColor, 25, 11.5, -35 + i * 10, 0.2, 0.2, 0.2));
    }

    // kvietimai-------------------------------------------
    //tower(-35, 8, 35);
    //soldier(-35, 8, 35);
    //king(-35, 8, 35);
    //queen(-35, 8, 35);
   // horse(-35, 8, 35);





    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 30;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(25, 180, 25);
    spotLight.target.position.set(-35, 15, -15)
    spotLight.castShadow = true;
    //spotLight.target.updateMatrixWorld();
    spotLight.intensity = 1;
    spotLight.target = WhiteBishop2;
    //spotLight.angle = Math.PI  ;

    
    scene.add(spotLight);
    //scene.add(spotLight.target);


    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    var controls = new function () {

        this.SpotLightX = spotLight.position.x;
        this.SpotLightY = spotLight.position.y;
        this.SpotLightZ = spotLight.position.z;

        this.TargetSpotLightX = spotLight.target.position.x;
        this.TargetSpotLightY = spotLight.target.position.y;
        this.TargetSpotLightZ = spotLight.target.position.z;
        //spotLight.target.updateMatrixWorld();
        scene.add(spotLight.target);

        this.rotateResult = false;
    }

    var WKT = {WhiteKingTarget:function(){spotLight.target = WhiteKing}};
    var WQT = {WhiteQueenTarget:function(){spotLight.target = WhiteQueen}};
    var WB2T = {WhiteBishop2Target:function(){spotLight.target = WhiteBishop2}};
    var BKT = {BlackKingTarget:function(){spotLight.target = BlackKing}};
    var BT2T = {BlackTower2Target:function(){spotLight.target = BlackTower2}};

    var gui = new dat.GUI();
    var guiLight = gui.addFolder("Light");
    var guiTargetLight = gui.addFolder("guiTargetLight");
    guiLight.add(controls, "SpotLightX", -200, 200).onChange(function () {
        spotLight.position.set(controls.SpotLightX, controls.SpotLightY, controls.SpotLightZ)
    });
    guiLight.add(controls, "SpotLightY", -200, 300).onChange(function () {
        spotLight.position.set(controls.SpotLightX, controls.SpotLightY, controls.SpotLightZ)
    });
    guiLight.add(controls, "SpotLightZ", -200, 200).onChange(function () {
        spotLight.position.set(controls.SpotLightX, controls.SpotLightY, controls.SpotLightZ)
    });
    guiLight.add(controls, "TargetSpotLightX", -200, 200).onChange(function () {
        spotLight.position.set(controls.TargetSpotLightX, controls.TargetSpotLightY, controls.TargetSpotLightZ)
    });
    guiLight.add(controls, "TargetSpotLightY", -200, 200).onChange(function () {
        spotLight.position.set(controls.TargetSpotLightX, controls.TargetSpotLightY, controls.TargetSpotLightZ)
    });
    guiLight.add(controls, "TargetSpotLightZ", -200, 200).onChange(function () {
        spotLight.position.set(controls.TargetSpotLightX, controls.TargetSpotLightY, controls.TargetSpotLightZ)
    });
    guiLight.add(spotLight, 'intensity', 0, 2, 0.01);
    gui.add(controls, "rotateResult");
    guiTargetLight.add(WKT, 'WhiteKingTarget');
    guiTargetLight.add(WQT, 'WhiteQueenTarget');
    guiTargetLight.add(WB2T, 'WhiteBishop2Target');
    guiTargetLight.add(BKT, 'BlackKingTarget');
    guiTargetLight.add(BT2T, 'BlackTower2Target');


    // add the output of the renderer to the html element
    $("#WebGL-output").append(renderer.domElement);
    var trackballControls  = new THREE.TrackballControls(camera, renderer.domElement);
    render();

    function render() {
        // render
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        trackballControls.update();

        if (controls.rotateResult && scene) {
            scene.rotation.y += 0.001;
            //      result.rotation.x+=0.04;
            //scene.rotation.z -= 0.005;
        }
    }


    function generateMesh(xcoords, ycoords, color, x, y, z, scaleX, scaleY, scaleZ) {

        var points = [];
        var count = xcoords.length;
        for (var i = 0; i < count; i++) {
            points.push(new THREE.Vector3(25 - xcoords[i] / 10, 0, (ycoords[30] - ycoords[i] - 174) / 10));
        }
        var latheGeometry = new THREE.LatheGeometry(points, Math.ceil(12), 0, 2 * Math.PI);

        var finalMesh = createSimpleMesh(latheGeometry, color);
        finalMesh.position.set(x, y, z);
        finalMesh.scale.set(scaleX, scaleY, scaleZ);
        finalMesh.rotation.set(-Math.PI / 2, 0, 0);
        finalMesh.receiveShadow = true;
        finalMesh.castShadow = true;
        return finalMesh;
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


    function horse(startX, startY, startZ, direction, color) {
        var mat = new THREE.MeshPhongMaterial({ color: color,  shininess: 100 });
        mat.side = THREE.DoubleSide;
        box = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 5), mat);
        box.position.set(startX, 8, startZ);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), mat);
        box.position.set(startX, 8.5, startZ);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.5, 4.5), mat);
        box.position.set(startX, 9, startZ);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 3), mat);
        box.position.set(startX, 10, startZ);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(3, 5, 3), mat);
        box.position.set(startX, 13, startZ);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(5, 4, 3.2), mat);
        box.position.set(startX + 0.75 * direction, 15., startZ); //+- keicia krypti
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 3.2), mat);
        box.position.set(startX + 3 * direction, 15, startZ);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2, 3.2), mat);
        box.position.set(startX, 17, startZ);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), mat);
        box.position.set(startX, 18, startZ+2);
        scene.add(box);
    
        box = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), mat);
        box.position.set(startX, 18, startZ-2);
        scene.add(box);
    }

   
});