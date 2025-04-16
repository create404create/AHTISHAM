async function checkStatus() {
    const phone = document.getElementById("phoneNumber").value.trim();
    
    // Input validation
    if (!phone) {
        alert("Please enter a phone number");
        return;
    }
    
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit US phone number");
        return;
    }

    // Show loading indicator
    document.getElementById("result").innerHTML = "<p class='loading'>Checking phone number...</p>";
    
    const apiUrl = `https://tcpa.api.uspeoplesearch.net/tcpa/v1?x=${phone}`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data); // For debugging

        // Format the response data
        const resultHTML = `
            <div class="result-item">
                <strong>Status:</strong> ${data.status || "Unknown"}
            </div>
            <div class="result-item">
                <strong>Phone:</strong> ${data.phone || phone}
            </div>
            <div class="result-item">
                <strong>Blacklist:</strong> <span class="${data.listed ? 'bad' : 'good'}">${data.listed ? "Yes" : "No"}</span>
            </div>
            <div class="result-item">
                <strong>Litigator:</strong> <span class="${data.type ? 'bad' : 'good'}">${data.type || "No"}</span>
            </div>
            <div class="result-item">
                <strong>State:</strong> ${data.state || "Invalid"}
            </div>
            <div class="result-item">
                <strong>DNC National:</strong> <span class="${data.dnc_national ? 'good' : 'neutral'}">${data.dnc_national ? "Yes" : "No"}</span>
            </div>
            <div class="result-item">
                <strong>DNC State:</strong> <span class="${data.dnc_state ? 'good' : 'neutral'}">${data.dnc_state ? "Yes" : "No"}</span>
            </div>
        `;
        
        document.getElementById("result").innerHTML = resultHTML;
        
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = `
            <p class="error">Error fetching data. Please try again later.</p>
            <p class="error-detail">${error.message}</p>
        `;
    }
}
