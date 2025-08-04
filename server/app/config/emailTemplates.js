export const getVerifyEmailTemplate = (name, verifyURL) => ({
  subject: "Verify Your ProConnect Account",
  html: `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: #0077b5; padding: 25px 20px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">ProConnect</h1>
        <p style="margin: 5px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">The Professional Network</p>
      </div>
      
      <div style="padding: 30px 25px;">
        <h2 style="margin-top: 0; font-size: 20px; color: #111827;">Hi ${name},</h2>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">Welcome to ProConnect! Please verify your email address to activate your professional account.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyURL}" style="display: inline-block; padding: 12px 30px; background-color: #0077b5; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px; letter-spacing: 0.5px;">Verify Email</a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-bottom: 0;">
          If you didn't request this account, please ignore this email or contact our 
          <a href="mailto:support@proconnect.com" style="color: #0077b5;">support team</a>.
        </p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 5px;">© ${new Date().getFullYear()} ProConnect, Inc. All rights reserved.</p>
        <p style="margin: 0; font-size: 11px;">
          Professional Networking Platform • 123 Business Ave, San Francisco, CA
        </p>
      </div>
    </div>
  `,
});

export const getWelcomeEmailTemplate = (name) => ({
  subject: "Welcome to ProConnect!",
  html: `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: #0077b5; padding: 25px 20px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">ProConnect</h1>
      </div>
      
      <div style="padding: 30px 25px; text-align: center;">
        <div style="margin-bottom: 25px;">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#0077b5" stroke="#0077b5" stroke-width="2"/>
            <path d="M8 11V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 11V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 11V16" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M8 7H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        
        <h2 style="margin: 0 0 15px; font-size: 22px; color: #111827;">Welcome to ProConnect, ${name}!</h2>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
          Your account is now active and ready to help you grow your professional network.
        </p>
        
        <div style="background: #f0f7ff; padding: 15px; border-radius: 6px; text-align: left; margin: 25px 0;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #0077b5;">Get Started:</h3>
          <ol style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">Complete your profile to increase visibility</li>
            <li style="margin-bottom: 8px;">Connect with colleagues and industry peers</li>
            <li>Explore job opportunities tailored for you</li>
          </ol>
        </div>
        
        <a href="https://proconnect.com/dashboard" style="display: inline-block; padding: 12px 30px; background-color: #0077b5; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px; margin-top: 15px;">Go to Dashboard</a>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0;">© ${new Date().getFullYear()} ProConnect. The Professional Network.</p>
      </div>
    </div>
  `,
});

export const getPasswordResetEmail = (name, resetLink) => ({
  subject: "Reset Your ProConnect Password",
  html: `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: #0077b5; padding: 25px 20px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">ProConnect</h1>
      </div>
      
      <div style="padding: 30px 25px;">
        <h2 style="margin-top: 0; font-size: 20px; color: #111827;">Password Reset Request</h2>
        <p style="font-size: 16px; line-height: 1.5;">Hi ${name}, we received a request to reset your ProConnect password.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="display: inline-block; padding: 12px 30px; background-color: #d83a3a; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 16px;">Reset Password</a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-bottom: 5px;">
          <strong>This link will expire in 15 minutes.</strong>
        </p>
        <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">
          If you didn't request this change, please secure your account by changing your password immediately.
        </p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0;">For security reasons, we never ask for your password via email.</p>
      </div>
    </div>
  `,
});

export const getPasswordChangedNotification = (name) => ({
  subject: "Your ProConnect Password Was Changed",
  html: `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <div style="background: #0077b5; padding: 25px 20px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 24px; font-weight: 600;">ProConnect</h1>
      </div>
      
      <div style="padding: 30px 25px;">
        <h2 style="margin-top: 0; font-size: 20px; color: #111827;">Password Updated</h2>
        <p style="font-size: 16px; line-height: 1.5;">Hi ${name}, this is confirmation that your ProConnect password was successfully changed.</p>
        
        <div style="background: #f0f7ff; padding: 15px; border-radius: 6px; margin: 25px 0; border-left: 4px solid #0077b5;">
          <p style="margin: 0; font-size: 14px; color: #0077b5;">
            <strong>Security Tip:</strong> Use a unique password for each of your online accounts.
          </p>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-bottom: 0;">
          If you didn't make this change, please 
          <a href="mailto:security@proconnect.com" style="color: #0077b5;">contact our security team</a> 
          immediately.
        </p>
      </div>
      
      <div style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0;">© ${new Date().getFullYear()} ProConnect. Keeping professionals connected.</p>
      </div>
    </div>
  `,
});
