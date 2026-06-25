from extensions import db, bcrypt
from datetime import datetime


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(100),
        nullable=False,
        unique=True
    )

    email = db.Column(
        db.String(150),
        nullable=False,
        unique=True
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        nullable=False,
        default="tenant"
    )

    phone_number = db.Column(
        db.String(20)
    )

    profile_image = db.Column(
        db.String(500)
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    properties = db.relationship(
        "Property",
        backref="landlord",
        cascade="all, delete-orphan"
    )

    favorites = db.relationship(
        "Favorite",
        backref="user",
        cascade="all, delete-orphan"
    )

    inquiries = db.relationship(
        "Inquiry",
        backref="tenant",
        cascade="all, delete-orphan"
    )

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(
            password
        ).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(
            self.password_hash,
            password
        )

    def __repr__(self):
        return f"<User {self.username}>"