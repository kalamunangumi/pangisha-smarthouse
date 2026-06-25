from flask import Blueprint
from flask import request
from flask import jsonify

from extensions import db

from models.property import Property
from models.user import User

from schemas.property_schema import (
    property_schema,
    properties_schema
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from utils.decorators import (
    landlord_required
)

properties_bp = Blueprint(
    "properties",
    __name__
)

@properties_bp.route(
    "/properties",
    methods=["GET"]
)
def get_properties():

    query = Property.query

    location = request.args.get("location")

    bedrooms = request.args.get(
        "bedrooms",
        type=int
    )

    max_price = request.args.get(
        "max_price",
        type=float
    )

    if location:

        query = query.filter(
            Property.location_name.ilike(
                f"%{location}%"
            )
        )

    if bedrooms:

        query = query.filter(
            Property.bedrooms == bedrooms
        )

    if max_price:

        query = query.filter(
            Property.price <= max_price
        )

    page = request.args.get(
        "page",
        1,
        type=int
    )

    per_page = request.args.get(
        "per_page",
        10,
        type=int
    )

    paginated = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    return jsonify({
        "total": paginated.total,
        "page": page,
        "pages": paginated.pages,
        "results":
        properties_schema.dump(
            paginated.items
        )
    })

## Get single property
@properties_bp.route(
    "/properties/<int:id>",
    methods=["GET"]
)
def get_property(id):

    property = Property.query.get(id)

    if not property:

        return jsonify({
            "error":"Property not found"
        }),404

    property.views += 1

    db.session.commit()

    return property_schema.jsonify(
        property
    )

## Create property by Landlord
@properties_bp.route(
    "/properties",
    methods=["POST"]
)
@jwt_required()
@landlord_required
def create_property():

    user_id = get_jwt_identity()

    data = request.get_json()

    property = Property(

        title=data["title"],

        description=data["description"],

        price=data["price"],

        bedrooms=data["bedrooms"],

        bathrooms=data["bathrooms"],

        property_type=data["property_type"],

        image_url=data["image_url"],

        location_name=data["location_name"],

        latitude=data.get("latitude"),

        longitude=data.get("longitude"),

        contact_phone=data["contact_phone"],

        user_id=user_id

    )

    db.session.add(property)

    db.session.commit()

    return property_schema.jsonify(
        property
    ),201

## Update property by Landlord
@properties_bp.route(
    "/properties/<int:id>",
    methods=["PATCH"]
)
@jwt_required()
def update_property(id):

    user_id = get_jwt_identity()

    property = Property.query.get(id)

    if not property:

        return jsonify({
            "error":"Property not found"
        }),404

    if property.user_id != int(user_id):

        return jsonify({
            "error":"Unauthorized"
        }),403

    data = request.get_json()

    for key,value in data.items():

        setattr(
            property,
            key,
            value
        )

    db.session.commit()

    return property_schema.jsonify(
        property
    )

## Delete property by Landlord
@properties_bp.route(
    "/properties/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_property(id):

    user_id = get_jwt_identity()

    property = Property.query.get(id)

    if not property:

        return jsonify({
            "error":"Property not found"
        }),404

    if property.user_id != int(user_id):

        return jsonify({
            "error":"Unauthorized"
        }),403

    db.session.delete(property)

    db.session.commit()

    return jsonify({
        "message":"Property deleted"
    })

## Landlord dashboard endpoint
@properties_bp.route(
    "/my-properties",
    methods=["GET"]
)
@jwt_required()
def my_properties():

    user_id = get_jwt_identity()

    properties = Property.query.filter_by(
        user_id=user_id
    ).all()

    return properties_schema.jsonify(
        properties
    )