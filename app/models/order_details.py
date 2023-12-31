from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderDetail(db.Model):
    __tablename__= "order_details"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")))
    quantity = db.Column(db.Integer,default=1)
    #inserting way of tracking if product has been returned
    returned = db.Column(db.Boolean,default=False)

    db.UniqueConstraint('product_id','order_id',name="uix1")
    product = db.relationship("Product", back_populates="orders")
    order = db.relationship("Order", back_populates="products")

    def to_dict(self):
        return {
            "id": self.id,
            "quantity": self.quantity,
            "product": self.product.to_dict_descriptive(),
            "order_id": self.order_id,
            "returned": self.returned
        }
