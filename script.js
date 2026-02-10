const params = new URLSearchParams(window.location.search);
const type = params.get("type");

const resultDiv = document.getElementById("result");

if(resultDiv) {
    if(type === "2bhk") {
        resultDiv.innerHTML = `
            <h2>2 BHK Plan (~1000 sq ft)</h2>
            <p>Living: 14x12 ft</p>
            <p>Kitchen: 10x10 ft</p>
            <p>2 Bedrooms + 2 Bathrooms</p>
        `;
    }
    else if(type === "3bhk") {
        resultDiv.innerHTML = `
            <h2>3 BHK Plan (~1500 sq ft)</h2>
            <p>Large Living Area</p>
            <p>3 Bedrooms + 2 Bathrooms</p>
        `;
    }
    else if(type === "duplex") {
        resultDiv.innerHTML = `
            <h2>Duplex Plan (~2000 sq ft)</h2>
            <p>Ground + First Floor</p>
            <p>Modern staircase + Balcony</p>
        `;
    }
}

function calculateCost() {
    const area = parseFloat(document.getElementById("area").value);
    const material = parseFloat(document.getElementById("material").value);
    const labour = parseFloat(document.getElementById("labour").value);

    const total = area * (material + labour);

    document.getElementById("resultCost").innerHTML =
        "Total Cost: ₹ " + total.toLocaleString("en-IN");
}