// ./api/profile/models/Profile.js

module.exports = {
    lifecycles: {
      async afterCreate(event) {
        try {
          const { result } = event;
  
          // Access the related user from the profile (OneToOne relation)
          const user = result.user;
  
          // Ensure user exists and has an email address
          if (!user || !user.email) {
            console.log("User email not found.");
            return;
          }
  
          const { email, username } = user;
  
          // Prepare email data
          const emailData = {
            to: email,  // User's email address
            subject: 'Profile Created Successfully!',
            template: 'profile-creation-email',  // The template file name
            context: {
              user: user, // Pass the user object to template for dynamic content
            }
          };
  
          // Send email using Strapi's email service
          await strapi.plugins['email'].services.email.sendTemplatedEmail(emailData);
          
          console.log(`Profile creation email sent to: ${email}`);
        } catch (error) {
          console.error('Error while sending profile creation email:', error);
        }
      },
    },
  };
  