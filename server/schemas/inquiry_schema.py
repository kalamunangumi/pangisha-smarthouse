from extensions import ma
from models.inquiry import Inquiry


class InquirySchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = Inquiry
        load_instance = True


inquiry_schema = InquirySchema()

inquiries_schema = InquirySchema(many=True)