export const sentDoctorSignEmail = async ({ email, password }) => {
  
    if (!email || !password) {
        console.error("EmailJS aborted: Missing email or password parameter");
        return { success: false, error: "Missing parameters" };
    }

    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const templateParams = {
        user_email: email, 
        email: email,      
        password: password 
    };

    const payload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: templateParams
    };

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const resultText = await response.text();
        if (!response.ok) throw new Error(`EmailJS Error: ${resultText}`);

        console.log('Email sent successfully:', resultText);
        return { success: true, data: resultText };
    } catch (error) {
        console.error('Failed to send doctor signup email:', error);
        return { success: false, error: error.message };
    }
};