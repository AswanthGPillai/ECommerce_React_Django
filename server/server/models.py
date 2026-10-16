from django.db import models

class tbl_district(models.Model):
    district_name = models.CharField(max_length=100)

class tbl_admin(models.Model):
    admin_name = models.CharField(max_length=100)
    admin_email = models.CharField(max_length=100)
    admin_password = models.CharField(max_length=100)

class tbl_place(models.Model):
    place_name = models.CharField(max_length=100)
    district = models.ForeignKey(tbl_district,on_delete=models.CASCADE)

class tbl_user(models.Model):
    user_name = models.CharField(max_length=100)
    user_email = models.CharField(max_length=100)
    user_address = models.CharField(max_length=100)
    place = models.ForeignKey(tbl_place,on_delete=models.CASCADE)
    user_password = models.CharField(max_length=100)
    user_status = models.IntegerField(default=0)
    user_photo = models.FileField(upload_to="Assets/UserDocs")



class tbl_seller(models.Model):
    seller_name=models.CharField(max_length=30)
    seller_email=models.CharField(max_length=30)
    seller_password=models.CharField(max_length=30)



class tbl_product(models.Model):
    product_name=models.CharField(max_length=30)
    product_price=models.CharField(max_length=30)
    seller=models.ForeignKey(tbl_seller,on_delete=models.CASCADE)
  

    

class tbl_stock(models.Model):
    stock_count=models.CharField(max_length=30)
    product=models.ForeignKey(tbl_product,on_delete=models.CASCADE)


class tbl_booking(models.Model):
    booking_date=models.DateField(auto_now_add=True)
    booking_status=models.IntegerField(default=0)
    booking_amount=models.CharField(max_length=30)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_cart(models.Model):
    cart_qty=models.IntegerField(default=1)
    cart_status=models.IntegerField(default=0)
    booking=models.ForeignKey(tbl_booking,on_delete=models.CASCADE)
    product=models.ForeignKey(tbl_product,on_delete=models.CASCADE)