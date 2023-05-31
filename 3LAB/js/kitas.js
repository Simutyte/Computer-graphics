const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var stats = initStats();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xEEEEEE, 1.0);
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

camera.position.z = 20;

//add spotlight for the shadows
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 0, 30 );
spotLight.castShadow = true;
scene.add( spotLight );

const axesHelper = new THREE.AxesHelper( 40 );
scene.add( axesHelper );

let controls = new THREE.TrackballControls( camera, renderer.domElement );  

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
    stats.update();
}
animate();

//-------------------------------------------
// GUI
//-------------------------------------------

var obj = {
	points: 1000,
	R: 10,
	H: 25,
	redraw: function(){ console.log("clicked"); drawCone(this.R, this.H, this.points); }
};

var gui = new dat.gui.GUI();

gui.add(obj, 'points').min(100).max(10000).step(100).onChange(function (value){
	drawCone(obj.R, obj.H, value);
});
gui.add(obj, 'R').min(5).max(30).step(1).onChange(function (value){
	drawCone(value, obj.H, obj.points);
});
gui.add(obj, 'H').min(5).max(60).step(1).onChange(function (value){
	drawCone(obj.R, value, obj.points);
});
gui.add(obj, 'redraw');

function initStats(){

  var stats = new Stats();
  stats.setMode(0); //0: fps, 1: ms

  //Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById("WebGL-output").append(stats.domElement);

  return stats;
}



function toUV(point){
	var u = Math.atan2(point.x, point.z)/(2*Math.PI); 
	var v = (point.y + obj.H/2)/obj.H; 
	if(u < 0) 
	{ 
        u++;
    }
	if(v < 0) 
	{ 
        v++;
    }
	var rez = [u, v];
    return rez;
}

var texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/Simutyte/TRY/main/chess.png');
texture.wrapS = THREE.RepeatWrapping;
//texture.wrapT = THREE.RepeatWrapping;
var wireframe = new THREE.MeshBasicMaterial({wireframe: true, color:0xff0000, side: THREE.DoubleSide});

var textureMat = new THREE.MeshBasicMaterial({map: texture, color: 0xffffff, side: THREE.DoubleSide});
var cone = null;

function drawCone(R, H, iter){
	if (cone != null){
		scene.remove(cone);
	}
	var conePoints = new Array();
	var uv = [];
	for (var i = 0; i < iter; ){
		var x = (Math.random() * (R*2))-R;
		var y = (Math.random() * (H*2))-H;
		var z = (Math.random() * (R*2))-R;
		if ( x*x+z*z <= (R/H)*(R/H)*(y-H/2)*(y-H/2)){
			if(-(H/2) <= y && y <= (H/2))
			{
				conePoints.push(new THREE.Vector3(x,y,z));
				i++;
			}
			
		}
	}
	
	var geometry = new ConvexGeometry(conePoints);
	for (var i = 0; i < geometry.faces.length; ++i){
		var u1 = toUV(geometry.vertices[geometry.faces[i].a])[0];
		var v1 = toUV(geometry.vertices[geometry.faces[i].a])[1];
		var u2 = toUV(geometry.vertices[geometry.faces[i].b])[0];
		var v2 = toUV(geometry.vertices[geometry.faces[i].b])[1];
		var u3 = toUV(geometry.vertices[geometry.faces[i].c])[0];
		var v3 = toUV(geometry.vertices[geometry.faces[i].c])[1];

		var RS = 0.3;
		var LS = 0.6;
		if(u1 < RS && u2 < RS && u3 > LS)
			u3 = u3 - 1;
		else if(u3 < RS && u1 < RS && u2 > LS)
			u2 = u2 - 1;
		else if(u2 < RS && u3 < RS && u1 > LS)
			u1 = u1 - 1;

		if(u1 > LS && u2 > LS && u3 < RS)
			u3 = u3 + 1;
		else if(u3 > LS && u1 > LS && u2 < RS)
			u2 = u2 + 1;
		else if(u2 > LS && u3 > LS && u1 < RS)
			u1 = u1 + 1;


		/*if(v1 < RS && v2 < RS && v3 > LS)
			v3 = v3 - 1;
		else if(v3 < RS && v1 < RS && v2 > LS)
			v2 = v2 - 1;
		else if(u2 < RS && v3 < RS && v1 > LS)
			v1 = v1 - 1;

		if(v1 > LS && v2 > LS && v3 < RS)
			v3 = v3 + 1;
		else if(v3 > LS && v1 > LS && v2 < RS)
			v2 = v2 + 1;
		else if(v2 > LS && v3 > LS && v1 < RS)
			v1 = v1 + 1;*/	

		uv.push( 
			[new THREE.Vector2( u1, v1),
			new THREE.Vector2( u2, v2),
			new THREE.Vector2( u3, v3)]);
		geometry.faceVertexUvs[0].push(uv[i]);
	}
	//console.log(geometry);
	cone = SceneUtils.createMultiMaterialObject(geometry, [textureMat, wireframe]);
	scene.add(cone);
}

drawCone(obj.R, obj.H, obj.points);

