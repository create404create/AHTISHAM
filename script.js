async function checkDNC() {
    const phone = document.getElementById("phoneNumber").value.trim();
    
    // Validate Input
    if (!phone || !/^\d{10}$/.test(phone)) {
        alert("❌ Invalid! Enter 10-digit US Number (e.g., 6028205380)");
        return;
    }

    // Show Loading
    document.getElementById("result").innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Checking DNC Status for ${phone}...</p>
        </div>
    `;

    // API Call
    try {
        const response = await fetch(`https://tcpa.api.uspeoplesearch.net/tcpa/v1?x=${phone}`);
        const data = await response.json();

        // Check if API returned valid data
        if (!data || !data.phone) {
            throw new Error("Invalid API Response");
        }

        // Display Results
        document.getElementById("result").innerHTML = `
            <div class="result-box">
                <h3>📱 ${data.phone}</h3>
                <p><strong>Status:</strong> <span class="${data.status === 'ok' ? 'success' : 'error'}">${data.status.toUpperCase()}</span></p>
                <p><strong>Blacklisted:</strong> ${data.listed ? "🔴 YES (Avoid Calling)" : "🟢 NO (Safe)"}</p>
                <p><strong>Litigator:</strong> ${data.type ? "⚠️ YES (Legal Risk)" : "✅ NO"}</p>
                <p><strong>State:</strong> ${data.state || "N/A"}</p>
                <p><strong>DNC National:</strong> ${data.dnc_national ? "🔕 YES (Do Not Call)" : "📞 NO"}</p>
                <p><strong>DNC State:</strong> ${data.dnc_state ? "🔕 YES (Do Not Call)" : "📞 NO"}</p>
            </div>
        `;

    } catch (error) {
        document.getElementById("result").innerHTML = `
            <div class="error-box">
                <p>🚨 Error Fetching Data!</p>
                <p><em>${error.message || "API Not Responding"}</em></p>
                <button onclick="checkDNC()">Try Again</button>
            </div>
        `;
    }
}
