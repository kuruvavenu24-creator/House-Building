/* ===============================
   🔥 STATE RATES (20+ STATES)
=================================*/

const stateRates = {
Delhi:2100,
Maharashtra:2000,
Karnataka:1900,
"Tamil Nadu":1850,
Telangana:1950,
Kerala:2200,
Gujarat:1800,
Rajasthan:1750,
"West Bengal":1650,
Punjab:1900,
Haryana:2000,
Bihar:1600,
"Madhya Pradesh":1700,
Odisha:1550,
Assam:1500,
"Andhra Pradesh":1850,
Jharkhand:1600,
Chhattisgarh:1650,
Goa:2300
};

let chartInstance;

/* ===============================
   🔥 UPDATE RATES BASED ON STATE
=================================*/

function updateRates(){
const state=document.getElementById("state")?.value;

if(state && stateRates[state]){
const base=stateRates[state];

// 70% material, 30% labour split
document.getElementById("material").value=Math.round(base*0.7);
document.getElementById("labour").value=Math.round(base*0.3);
}
}

/* ===============================
   🔥 COST CALCULATOR
=================================*/

function calculateCost(){

const area=parseFloat(document.getElementById("area")?.value);
const material=parseFloat(document.getElementById("material")?.value);
const labour=parseFloat(document.getElementById("labour")?.value);
const quality=parseFloat(document.getElementById("quality")?.value || 1);

if(!area || !material || !labour){
alert("Please fill all required fields");
return;
}

const ratePerSqft=(material+labour)*quality;
const total=area*ratePerSqft;

document.getElementById("resultCost").innerHTML=
`<h3>Total Cost: ₹ ${total.toLocaleString("en-IN")}</h3>
<p>Rate per sq ft: ₹ ${Math.round(ratePerSqft)}</p>`;

/* 🔥 PIE CHART */
if(typeof Chart !== "undefined"){
if(chartInstance) chartInstance.destroy();

chartInstance=new Chart(document.getElementById("costChart"),{
type:'pie',
data:{
labels:['Material Cost','Labour Cost'],
datasets:[{
data:[material*quality,labour*quality],
backgroundColor:['#38bdf8','#f97316']
}]
}
});
}
}

/* ===============================
   🔥 AI HOUSE PREDICTION
=================================*/

function predictPlan(){

const budget=parseFloat(document.getElementById("budget")?.value);
const family=parseFloat(document.getElementById("family")?.value);

if(!budget || !family){
alert("Enter budget and family size");
return;
}

let plan="";

if(budget < 1500000){
plan="1BHK (~600 sq ft)";
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

const predictionDiv=document.getElementById("prediction");
if(predictionDiv){
predictionDiv.innerHTML=
`<h2>AI Suggested Plan:</h2><p>${plan}</p>`;
}
}

/* ===============================
   🔥 360° ROOM VIEWER
=================================*/

let scene, camera, renderer, mesh;

const roomImages = {
hall: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
kitchen: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
bedroom: "https://images.unsplash.com/photo-1505693314120-0d443867891c",
bathroom: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
};

function initScene(){

if(!document.getElementById("panorama")) return;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth/500, 1, 1100);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);

const container=document.getElementById("panorama");
container.innerHTML="";
container.appendChild(renderer.domElement);

camera.position.set(0,0,0.1);

animate();
}

function loadRoom(room){

if(!roomImages[room]) return;

if(!scene) initScene();

const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1,1,1);

const texture = new THREE.TextureLoader().load(roomImages[room]);

const material = new THREE.MeshBasicMaterial({ map: texture });

if(mesh) scene.remove(mesh);

mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
}

function animate(){
requestAnimationFrame(animate);
if(renderer && scene && camera){
renderer.render(scene,camera);
}
}

/* 🔥 MOUSE CONTROL FOR 360 */
document.addEventListener("mousemove", function(e){
if(!camera) return;

camera.rotation.y = (e.clientX / window.innerWidth) * 2 * Math.PI;
camera.rotation.x = (e.clientY / window.innerHeight) * Math.PI / 4;
});