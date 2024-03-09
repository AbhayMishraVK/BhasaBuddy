from flask_mail import Message, Mail
import logging
 
# Set up logging
logging.basicConfig(level=logging.INFO)

def send_message_to_all_users(app):

    mail = Mail(app)

    try:
        with app.app_context(): # Create an application context

            # Retrieve all users from the database
            users = app.mongo.db.user.find({})

            # Prepare the email message
            # Prepare the email message
            message = Message("🎉 Time to Learn with Bahasa Buddy! 📚",
                  sender="your_email@example.com",
                  recipients=[user['email'] for user in users])
            message.body = f""" Hello there!\n\nWe hope you're having a fantastic day! 😊 It's time for a quick reminder from Bahasa Buddy, your regional language learning companion.\n\nLearning a new language opens doors to new opportunities and experiences. So why not take a few moments today to engage with Bahasa Buddy and explore the wonders of language learning?\n\nWhether you're mastering vocabulary, practicing pronunciation, or diving into cultural insights, Bahasa Buddy is here to support you every step of the way.\n\nDon't forget, consistent practice leads to progress! Keep up the great work, and remember, every step you take brings you closer to fluency.\n\nHappy learning!\n\nBest regards,\nThe Bahasa Buddy Team 🌟"""

            # Send the email
            mail.send(message)

            print("Message sent successfully to all users")
    except Exception as e:
        logging.error(f"Error sending message to all users: {e}")

 