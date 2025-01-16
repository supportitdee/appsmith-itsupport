export default {
	Button1onClick() {
		fetch("http://n8n.cptsnj.online:5678/webhook-test/21eb5d8d-6598-4376-9828-0ab6e02ad8bc", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				message: "Data from Appsmith",
				timestamp: new Date().toISOString()
			})
		})
		.then(response => response.json())
		.then(data => {
			showAlert("Data successfully sent!");
			console.log("Response:", data);
		})
		.catch(error => {
			showAlert("Error sending data!");
			console.error("Error:", error);
		});
	}
}