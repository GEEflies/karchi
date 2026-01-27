const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

// Manually load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

async function testEmail() {
    console.log("Checking environment...");
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
        console.error("❌ CRTICAL: RESEND_API_KEY is missing from .env.local");
        return;
    }
    
    console.log(`✅ Found API Key (starts with: ${apiKey.substring(0, 5)}...)`);

    const resend = new Resend(apiKey);
    
    // Test Address (replace with the one you want to receive)
    const testTo = 'billikkarol3@gmail.com'; 
    const testFrom = 'Karchi <me@karchi.xyz>';
    
    console.log(`Attempting to send email from ${testFrom} to ${testTo}...`);

    try {
        const data = await resend.emails.send({
            from: testFrom,
            to: testTo,
            subject: 'Test Email from Karchi.xyz',
            html: '<p>If you see this, your domain verified Resend API is working correctly and can send to anyone!</p>'
        });

        if (data.error) {
            console.error("❌ Resend API returned an error:", data.error);
        } else {
            console.log("✅ API Call Successful!", data);
        }
    } catch (error) {
        console.error("❌ Exception during send:", error);
    }
}

testEmail();
