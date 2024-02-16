from mongoengine import Document, StringField, EmailField, IntField

class User(Document):
    name = StringField(required=True)
    email = EmailField(required=True)
    regionalLanguage = StringField(required=True)
    password = StringField(required=True)
    phoneNumber = IntField(required=True)
