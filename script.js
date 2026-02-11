// 20+ Indian State Base Rates (example averages)
const stateRates = {
    "Delhi": 2100,
    "Maharashtra": 2000,
    "Karnataka": 1900,
    "Tamil Nadu": 1850,
    "Telangana": 1950,
    "Uttar Pradesh": 1700,
    "Kerala": 2200,
    "Gujarat": 1800,
    "Rajasthan": 1750,
    "West Bengal": 1650,
    "Punjab": 1900,
    "Haryana": 2000,
    "Bihar": 1600,
    "Madhya Pradesh": 1700,
    "Odisha": 1550,
    "Assam": 1500,
    "Andhra Pradesh": 1850,
    "Jharkhand": 1600,
    "Chhattisgarh": 1650,
    "Goa": 2300
};

// Construction type multipliers
const typeMultiplier = {
    basic: 1,
    standard: 1.15,
    premium: 1.30
};

let chartInstance = null;

// Update material & labour split automatically
function updateRates() {

    const state = document.getElementById("state").value;

    if(stateRates[state]) {

        const baseRate = stateRates[state];

        // 70% material, 30% labour split example
        const material = Math.round(baseRate * 0.7);
        const labour = Math.round(baseRate * 0.3);

        document.getElementById("material").value = material;
        document.getElementById("labour").value = labour;
    }
}

function calculateCost() {

    const state = document.getElementById("state").value;
    const type = document.getElementById("type").value;
    const area = parseFloat(document.getElementById("area").value);
    const material = parseFloat(document.getElementById("material").value);
    const labour = parseFloat(document.getElementById("labour").value);

    if(!state || !area || !material || !labour) {
        alert("Please fill all fields");
        return;
    }

    const multiplier = typeMultiplier[type];
    const ratePerSqft = (material + labour) * multiplier;
    const totalCost = area * ratePerSqft;

    document.getElementById("resultCost").innerHTML = `
        <h3>Total Building Cost: ₹ ${totalCost.toLocaleString("en-IN")}</h3>
        <p>Rate per sq ft: ₹ ${Math.round(ratePerSqft)}</p>
        <p>Construction Type: ${type.toUpperCase()}</p>
    `;

    generateChart(material * multiplier, labour * multiplier);
}

// Pie Chart
function generateChart(materialCost, labourCost) {

    const ctx = document.getElementById("costChart");

    if(chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Material Cost', 'Labour Cost'],
            datasets: [{
                data: [materialCost, labourCost],
                backgroundColor: ['#1e3c72', '#ff9800']
            }]
        }
    });
}