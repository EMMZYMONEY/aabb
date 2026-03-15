// ================================================
// js/script.js - Shared JavaScript for ABILINCOLN ENTERPRISES website
// ================================================

// === EmailJS Configuration ===
// Replace these with your actual EmailJS credentials from https://dashboard.emailjs.com
const EMAILJS_USER_ID     = "jsI2-IDR3gzFErYgs";       // ← e.g. user_abc123xyz
const EMAILJS_SERVICE_ID  = "service_voxlj8i";   // ← e.g. service_abilincoln
const EMAILJS_TEMPLATE_ID = "template_poeoitp";  // ← e.g. template_contact

// Initialize EmailJS (only once)
(function(){
  if (EMAILJS_USER_ID !== "YOUR_EMAILJS_USER_ID") {
    emailjs.init(EMAILJS_USER_ID);
  } else {
    console.warn("EmailJS User ID not configured yet. Form submissions won't work until updated.");
  }
})();

// === Handle Service Request Form (request.html) ===
function initContactForm() {
  const form = document.getElementById('service-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = {
      from_name:    document.getElementById('name')?.value.trim()    || 'Not provided',
      phone:        document.getElementById('phone')?.value.trim()   || 'Not provided',
      email:        document.getElementById('email')?.value.trim()   || 'Not provided',
      service:      document.getElementById('service')?.value        || 'Not selected',
      message:      document.getElementById('message')?.value.trim() || 'No additional details',
      sent_at:      new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })
    };

    // Send via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
      .then(function(response) {
        alert("✅ Request submitted successfully!\n\nWe'll contact you shortly via WhatsApp and email.");
        form.reset();
      })
      .catch(function(error) {
        console.error("EmailJS error:", error);
        alert("Sorry, there was a problem sending your request.\n\nPlease try again or message us directly on WhatsApp.");
      })
      .finally(function() {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}

// === Run when page loads ===
document.addEventListener('DOMContentLoaded', function() {
  // Initialize form if present
  initContactForm();

  // Optional: Add any global behaviors here (e.g. smooth scroll, analytics, etc.)
  // Example:
  // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  //   anchor.addEventListener('click', function(e) {
  //     e.preventDefault();
  //     document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  //   });
  // });
});

// === Optional: Expose a global helper if needed on other pages ===
window.Abilincoln = {
  submitForm: initContactForm  // can be called manually if needed
};