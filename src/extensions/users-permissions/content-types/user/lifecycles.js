console.log('afterCreate Lifecycle Triggered');
module.exports = {
    lifecycles: {
      async afterCreate(event) {
        const { result } = event;
        const { email, username } = result;
        strapi.log.info('User lifecycles.js loaded');

  
        console.log('afterCreate Lifecycle Triggered');
        console.log(`User created with email: ${email}, username: ${username}`);
  
        if (email) {
          try {
            // Adding a 'from' value in the send method
            await strapi.plugins['email'].services.email.send({
              to: email,
              subject: 'Welcome to Our Platform!',
              html: `<p>Hello <strong>${username || 'User'}</strong>,</p>
                     <p>Welcome to our platform! We're excited to have you.</p>`,
              from: process.env.SMTP_FROM,  // Ensure this is used
            });
  
            console.log(`Welcome email sent to ${email}`);
          } catch (error) {
            console.log(`Failed to send welcome email to ${email}`, error);
          }
        }
      },
    },
  };
  