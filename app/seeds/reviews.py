from ..models.reviews import Review
# from ..models.review_images import ReviewImage
from ..models import db, SCHEMA, environment
from datetime import datetime
from sqlalchemy.sql import text

def seed_reviews():

    print("seeding reviews NOWWWWWW ")

    review1 = Review (
        rating= 3,
        review_date= datetime.now(),
        product_id= 1,
        member_id= 1,
        headline="No melty",
        content="Didn't melt the way I wanted it to. Not the best topping for cheesy potatoes",
        review_image="https://www.eatingwithfoodallergies.com/wp-content/uploads/2021/03/Gluten-free-cheesy-potatoes-500x375.jpg"
        )
    # image1 = ReviewImage(
    #     url="https://www.eatingwithfoodallergies.com/wp-content/uploads/2021/03/Gluten-free-cheesy-potatoes-500x375.jpg",
    #     review_id=1
    # )
    review2 = Review(
        rating= 1,
        review_date= datetime.now(),
        product_id= 1,
        member_id= 9,
        headline="Death!",
        content="I almost got killed with the purchase! Will never be buying again.",
        review_image="https://m.media-amazon.com/images/M/MV5BYjBkZmQ2YmQtNTE3OC00NDU1LThiY2MtM2I2ZWRkYWM4MzIyXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_.jpg"
        )
    # image2= ReviewImage(
    #     url="https://m.media-amazon.com/images/M/MV5BYjBkZmQ2YmQtNTE3OC00NDU1LThiY2MtM2I2ZWRkYWM4MzIyXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_.jpg",
    #     review_id = 2
    # )

    review3 = Review(
        rating= 5,
        review_date= datetime.now(),
        product_id= 2,
        member_id= 2,
        headline="Fantastic!!!",
        content="A crowd favorite! Brought for a charcuterie night and it was the most eaten cheese!",
        review_image="https://i.redd.it/eldfr5c0af841.jpg"
        )
    # image3 = ReviewImage(
    #     url="https://i.redd.it/eldfr5c0af841.jpg",
    #     review_id=3
    # )
    review4 = Review(
        rating= 4,
        review_date= datetime.now(),
        product_id= 3,
        member_id= 5,
        headline="Not bad",
        content="My friend Sebastian Hastings told me to get this! I'm happy I listened, but I do think I like a milder taste more"
        )

    review5 = Review(
        rating= 1,
        review_date= datetime.now(),
        product_id= 3,
        member_id= 4,
        headline="Never again...",
        content="Why is this still on the market?"
        )

    review6 = Review(
        rating= 5,
        review_date= datetime.now(),
        product_id= 7,
        member_id= 6,
        headline="Classic!!",
        content="What a classic! Best with honey and toast"
        )

    review7 = Review(
        rating= 2,
        review_date= datetime.now(),
        product_id= 5,
        member_id= 7,
        headline="Avoid this!",
        content="It sucked"
        )

    # images = [image1,image2,image3]
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    # post_images = [db.session.add(image) for image in images]

    db.session.commit()

    print("Successful Reviewsss completed!!!!!")

    return [review1, review2, review3, review4, review5, review6, review7]

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()