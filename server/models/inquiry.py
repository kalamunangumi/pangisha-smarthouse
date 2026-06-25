from extensions import db
from datetime import datetime

class Inquiry(db.Model):

    __tablename__ = "inquiries"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    message = db.Column(
        db.Text,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        default="Pending"
    )

    tenant_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )

    property_id = db.Column(
        db.Integer,
        db.ForeignKey("properties.id")
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )