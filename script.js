const stateRates = {
Delhi:2100,Maharashtra:2000,Karnataka:1900,TamilNadu:1850,
Telangana:1950,Kerala:2200,Gujarat:1800,Rajasthan:1750,
WestBengal:1650,Punjab:1900,Haryana:2000,Bihar:1600,
MadhyaPradesh:1700,Odisha:1550,Assam:1500,
AndhraPradesh:1850,Jharkhand:1600,Chhattisgarh:1650,Goa:2300
};

let chart;

function updateRates(){
const state=document.getElementById("state").value;
if(stateRates[state]){
const base=stateRates[state];
document.getElementById("material").value=Math.round(base*0.7);
document.getElementById("labour").value=Math.round(base*0.3);
}
}

function calculateCost(){
const area=parseFloat(document.getElementById("area").value);
const material=parseFloat(document.getElementById("material").value);
const labour=parseFloat(document.getElementById("labour").value);
const quality=parseFloat(document.getElementById("quality").value);

if(!area||!material||!labour){alert("Fill all fields");return;}

const rate=(material+labour)*quality;
const total=area*rate;

document.getElementById("resultCost").innerHTML=
`Total Cost: ₹ ${total.toLocaleString("en-IN")}<br>
Rate per sq ft: ₹ ${Math.round(rate)}`;

if(chart) chart.destroy();

chart=new Chart(document.getElementById("costChart"),{
type:'pie',
data:{
labels:['Material','Labour'],
datasets:[{
data:[material*quality,labour*quality],
backgroundColor:['#38bdf8','#f97316']
}]
}
});
}

/* 3D HOUSE */
if(document.getElementById("threeContainer")){
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/400,0.1,1000);
const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,400);
document.getElementById("threeContainer").appendChild(renderer.domElement);

const geometry=new THREE.BoxGeometry();
const material=new THREE.MeshBasicMaterial({color:0x38bdf8,wireframe:true});
const cube=new THREE.Mesh(geometry,material);
scene.add(cube);
camera.position.z=3;

function animate(){
requestAnimationFrame(animate);
cube.rotation.x+=0.01;
cube.rotation.y+=0.01;
renderer.render(scene,camera);
}
animate();
}