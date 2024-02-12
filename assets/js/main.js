function sendSEOReport() {
  let websiteUrl = document.getElementById("user-website").value;
  let userEmail = document.getElementById("user-email").value;

  emailjs
    .send("service_glmq70d", "report_v70ap6s", {
      website_url: websiteUrl,
      user_email: userEmail,
    })
    .then(
      function (response) {
        console.log("Email sent successfully:", response);
        alert("SEO report has been sent to your email!");
      },
      function (error) {
        console.error("Email sending failed:", error);
        alert("Failed to send SEO report. Please try again later.");
      }
    );
  return false;
}

async function fetchSEOData(websiteUrl) {
  const searchConsoleUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    websiteUrl
  )}/searchAnalytics/query`;
  const requestBody = {
    startDate: "2022-01-01",
    endDate: "2022-12-31",
    dimensions: ["query"],
    rowLimit: 10,
  };

  try {
    const response = await fetch(searchConsoleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_GOOGLE_SEARCH_CONSOLE_API_KEY",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch SEO data");
    }

    const data = await response.json();
    console.log("SEO Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return null;
  }
}
