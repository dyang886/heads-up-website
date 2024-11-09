document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("contact-form");
    const submitButton = form.querySelector("button[type='submit']");
    const responseElement = document.getElementById("form-response");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Disable the submit button and set text to "Submitting..."
        submitButton.disabled = true;
        submitButton.innerText = "Submitting...";

        // Collect form data
        const formData = {
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
        };

        // Send data to the Firebase Function
        try {
            const response = await fetch("https://us-central1-heads-up-cloud.cloudfunctions.net/submitContactForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Form submission was successful
                responseElement.innerText = "Form submitted successfully!";
                responseElement.style.color = "green";
            } else {
                // Handle error if response is not ok
                responseElement.innerText = "Error submitting form. Please try again.";
                responseElement.style.color = "red";
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            responseElement.innerText = "Error submitting form. Please try again.";
            responseElement.style.color = "red";
        } finally {
            // Re-enable the button and reset its text
            submitButton.disabled = false;
            submitButton.innerText = "Submit";
        }
    });
});
