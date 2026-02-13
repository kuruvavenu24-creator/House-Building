/* AI HOUSE PREDICTION */
function predictPlan(){

const budget=parseFloat(document.getElementById("budget").value);
const family=parseFloat(document.getElementById("family").value);

if(!budget || !family){
alert("Enter budget and family size");
return;
}

let plan="";

if(budget < 1500000){
plan="Small 1BHK (~600 sq ft)";
}
else if(budget < 3000000){
plan="2BHK (~1000 sq ft)";
}
else if(budget < 5000000){
plan="3BHK (~1500 sq ft)";
}
else{
plan="Luxury Duplex (~2000+ sq ft)";
}

if(family >=5) plan="3BHK or Duplex Recommended";

document.getElementById("prediction").innerHTML=
`<h2>AI Suggested Plan:</h2><p>${plan}</p>`;

initPanorama();
}


/* 360° PANORAMA */
function initPanorama(){

if(document.getElementById("panorama").children.length > 0) return;

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/500,1,1100);

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,500);
document.getElementById("panorama").appendChild(renderer.domElement);

const geometry=new THREE.SphereGeometry(500,60,40);
geometry.scale(-1,1,1);

const texture=new THREE.TextureLoader().load(
"https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
);

const material=new THREE.MeshBasicMaterial({map:texture});
const mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);

camera.position.set(0,0,0.1);

function animate(){
requestAnimationFrame(animate);
renderer.render(scene,camera);
}
animate();

/* Mouse control */
document.addEventListener("mousemove",function(e){
camera.rotation.y = (e.clientX / window.innerWidth) * 2 * Math.PI;
camera.rotation.x = (e.clientY / window.innerHeight) * Math.PI / 4;
});
}