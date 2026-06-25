from flask import Blueprint
from flask import jsonify
from flask import request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import db

from models.inquiry import Inquiry
from models.property import Property

from schemas.inquiry_schema import (
    inquiry_schema,
    inquiries_schema
)

inquiries_bp = Blueprint(
    "inquiries",
    __name__
)

## Create inquiry
@inquiries_bp.route(
    "/inquiries",
    methods=["POST"]
)
@jwt_required()
def create_inquiry():

    user_id = get_jwt_identity()

    data = request.get_json()

    property_id = data.get(
        "property_id"
    )

    message = data.get(
        "message"
    )

    property = Property.query.get(
        property_id
    )

    if not property:

        return jsonify({
            "error":"Property not found"
        }),404

    inquiry = Inquiry(

        message=message,

        tenant_id=user_id,

        property_id=property_id
    )

    db.session.add(inquiry)

    db.session.commit()

    return inquiry_schema.jsonify(
        inquiry
    ),201

## Tenant view own inquiries
@inquiries_bp.route(
    "/my-inquiries",
    methods=["GET"]
)
@jwt_required()
def my_inquiries():

    user_id = get_jwt_identity()

    inquiries = Inquiry.query.filter_by(
        tenant_id=user_id
    ).all()

    return inquiries_schema.jsonify(
        inquiries
    )

## Landlord view property inquiries
@inquiries_bp.route(
    "/property-inquiries",
    methods=["GET"]
)
@jwt_required()
def property_inquiries():

    user_id = get_jwt_identity()

    inquiries = Inquiry.query.join(
        Property
    ).filter(
        Property.user_id == user_id
    ).all()

    return inquiries_schema.jsonify(
        inquiries
    )

## Update inquiry status
@inquiries_bp.route(
    "/inquiries/<int:id>",
    methods=["PATCH"]
)
@jwt_required()
def update_inquiry(id):

    inquiry = Inquiry.query.get(id)

    if not inquiry:

        return jsonify({
            "error":"Inquiry not found"
        }),404

    data = request.get_json()

    inquiry.status = data.get(
        "status",
        inquiry.status
    )

    db.session.commit()

    return inquiry_schema.jsonify(
        inquiry
    )
