from itertools import count
from urllib import request
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum
import json
from server.models import *


# district

   

@csrf_exempt
def district(request):
    districtData = list(tbl_district.objects.values())
    if request.method == 'POST':
        district_name =  request.POST.get("districtName")
        tbl_district.objects.create(
            district_name = district_name
        )
        districtData = list(tbl_district.objects.values())

        return JsonResponse({"msg":"District Inserted Successfully",'district_data':districtData})
    else:
        return JsonResponse({"district_data": districtData})

    

@csrf_exempt
def district_del(request,did):
    if request.method == 'DELETE':
        tbl_district.objects.get(id=did).delete()
        return JsonResponse({"msg":"district deleted successfully"})



@csrf_exempt
def district_edit(request,uid):
    districtData = tbl_district.objects.get(id=uid)
    if request.method == 'POST':
        district_name = request.POST.get("districtName")
        districtData.district_name = district_name
        districtData.save()
        return JsonResponse({"msg":"district updated successfully"})





# admin

@csrf_exempt
def admin_registration(request):
    adminData = list(tbl_admin.objects.values())
    if request.method == 'POST':
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        tbl_admin.objects.create(
            admin_name = name,
            admin_email = email,
            admin_password = password
        )
        return JsonResponse({"msg":"admin inserted successfully"})
    return JsonResponse({"adminData":adminData})






@csrf_exempt
def admin_delete(request,did):
    if request.method == 'DELETE':
        tbl_admin.objects.get(id=did).delete()  
        return JsonResponse({"msg":"Data Deleted Successfully"})


    

@csrf_exempt
def admin_edit(request,eid):
    adminData = tbl_admin.objects.get(id=eid)
    if request.method == 'POST':
        name = request.POST.get("name")
        email = request.POST.get("email")
        adminData.admin_name = name
        adminData.admin_email = email
        adminData.save()
        return JsonResponse({"msg":"admin updated successfully"})
    return JsonResponse({"adminData":adminData})




# @csrf_exempt
# def admin_edit(request,eid):
#     adminData = tbl_admin.objects.get(id=eid)
#     if request.method == 'PUT':
#         data = json.loads(request.body)
#         name = data['name']
#         email = data['email']
#         adminData.admin_name = name
#         adminData.admin_email = email
#         adminData.save()
#         return JsonResponse({"msg":"admin updated successfully"})







# place

@csrf_exempt
def place(request):
    placeData = list(tbl_place.objects.values(
            "id",
            "place_name",
            "district_id",
            "district__district_name"
            ))
    if request.method == 'POST':
        place = request.POST.get("place")
        district = tbl_district.objects.get(id=request.POST.get('district'))
        tbl_place.objects.create(
            place_name = place,
            district = district
        )
        return JsonResponse({"msg":"Place created successfully"})
    return JsonResponse({"placeData":placeData})





@csrf_exempt
def place_delete(request,did):
    if request.method == 'DELETE':
        tbl_place.objects.get(id=did).delete()
        return JsonResponse({"msg":"Place Deleted Successfully"})



@csrf_exempt
def place_edit(request,eid):
    placeData = tbl_place.objects.get(id=eid)
    if request.method == 'POST':
        place_name = request.POST.get("place_name")
        district = tbl_district.objects.get(id=request.POST.get("district"))
        print(district)
        placeData.place_name = place_name
        placeData.district = district
        placeData.save()
        return JsonResponse({"msg":"place updated successfully"})


def place_filter(request,did):
    if request.method == "GET":
        placedata = tbl_place.objects.filter(district=did).values('id','place_name','district_id','district__district_name')
        return JsonResponse({"placeData":list(placedata)})



# user


@csrf_exempt
def user(request):
    if request.method == 'POST' :
        name = request.POST.get("name")
        email = request.POST.get("email")
        address = request.POST.get("address")
        password = request.POST.get("password")
        place = tbl_place.objects.get(id=request.POST.get('place'))
        photo = request.FILES.get("photo")
        emailExists = tbl_user.objects.filter(user_email=email).exists()
        if not emailExists:
            tbl_user.objects.create(
                user_name=name,
                user_email=email,
                user_address=address,
                # user_password=make_password(password),
                user_password=password,
                place = place,
                user_photo=photo
                )
            return JsonResponse({'msg':"Profile Uploded.."})
        else:
            return JsonResponse({"msg": "Email already exists"})

        


@csrf_exempt
def user_list(request):
    userdata = list(tbl_user.objects.values('id','user_name','user_email','user_address','user_password','user_photo','place','place__place_name','place__district__district_name'))
    return JsonResponse({'userdata':userdata})


@csrf_exempt
def user_single(request,uid):
    if request.method == 'GET':
        userData = list(tbl_user.objects.filter(id=uid).values('id','user_name','user_email','user_address','user_password','user_photo','place','place__place_name','place__district__district_name','place__district_id'))
        return JsonResponse({"userData":userData})


@csrf_exempt
def user_edit(request,uid):
    userData = tbl_user.objects.get(id=uid)
    if request.method == 'POST':
        name = request.POST.get("name") 
        email = request.POST.get("email")
        address = request.POST.get("address")
        place = tbl_place.objects.get(id=request.POST.get('place'))
        photo = request.FILES.get("photo")
        userData.user_name = name
        userData.user_email = email
        userData.user_address = address
        userData.place = place
        if photo:
            userData.user_photo = photo
        userData.save()
        return JsonResponse({"msg":"Profile Updated Successfully"})



@csrf_exempt
def user_accept(request,uid):
    if request.method == 'POST':
        userData = tbl_user.objects.get(id=uid)
        userData.user_status = 1
        userData.save()
        return JsonResponse({"msg":"User Accepted Successfully"})

    

@csrf_exempt
def user_reject(request,uid):
    if request.method == 'POST':
        userData = tbl_user.objects.get(id=uid)
        userData.user_status = 2
        userData.save()
        return JsonResponse({"msg":"User Rejected Successfully"})
    


# @csrf_exempt
# def login(request):
#     if request.method == 'POST':
#         email = request.POST.get("email")
#         password = request.POST.get("password")
#         usercount = tbl_user.objects.filter(user_email=email, user_password=password).count()
#         if usercount > 0:
#             user = tbl_user.objects.get(user_email=email, user_password=password)
#             if user.user_status == 0:
#                 return JsonResponse({"msg":"Your request is pending approval","user_id":user.id,"user_status":user.user_status})
#             elif user.user_status == 2:
#                 return JsonResponse({"msg":"Your request has been rejected","user_id":user.id,"user_status":user.user_status})
#             elif user.user_status == 1:
#                 return JsonResponse({"msg":"Login Successful","user_id":user.id,"user_status":user.user_status})
#         else:
#             return JsonResponse({"msg":"Invalid email or password"})



@csrf_exempt
def login(request):
    if request.method == 'POST':
        email = request.POST.get("email")
        password = request.POST.get("password")
        userdata = tbl_user.objects.filter( user_email=email, user_password=password).exists()
        sellerdata = tbl_seller.objects.filter( seller_email=email, seller_password=password).exists()
        # user = tbl_user.objects.filter(user_email=email).first()
        # if user and check_password(password, user.user_password):
        if userdata:
            user = tbl_user.objects.get(user_email=email,user_password=password)
            if user.user_status == 0:
                return JsonResponse({"msg": "Your request is pending approval","user_id": user.id,"user_status": user.user_status})
            elif user.user_status == 2:
                return JsonResponse({"msg": "Your request has been rejected","user_id": user.id,"user_status": user.user_status})
            elif user.user_status == 1:
                return JsonResponse({"msg": "Login Successful","user_id": user.id,"user_status": user.user_status})
        if sellerdata:
            seller = tbl_seller.objects.get(seller_email=email,seller_password=password)
            return JsonResponse({"seller_id": seller.id})

        else:
            return JsonResponse({"msg": "Invalid email or password"})
    

        
        


@csrf_exempt
def change_password(request, uid):
    userData = tbl_user.objects.get(id=uid)
    if request.method == 'POST':
        old_password = request.POST.get("old_password")
        new_password = request.POST.get("new_password")
        confirm_password = request.POST.get("confirm_password")

        if userData.user_password != old_password:
            return JsonResponse({"msg": "Old password is incorrect"})

        if new_password != confirm_password:
            return JsonResponse({"msg": "New password and confirm password do not match"})

        userData.user_password = new_password
        userData.save()
        return JsonResponse({"msg": "Password changed successfully"})




@csrf_exempt
def seller(request):
    if request.method == 'POST' :
        name = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        emailExists = tbl_seller.objects.filter(seller_email=email).exists()
        if not emailExists:
            tbl_seller.objects.create(
                seller_name=name,
                seller_email=email,
                seller_password=password,
                )
            return JsonResponse({'msg':"Account Created .."})
        else:
            return JsonResponse({"msg": "Email already exists"})


@csrf_exempt
def product(request,sid):
        productdata=list(tbl_product.objects.filter(seller=sid).values())
        if request.method=="POST":
            name=request.POST.get("name")
            price=request.POST.get("price")
            seller=tbl_seller.objects.get(id=sid)
            tbl_product.objects.create(product_name=name,product_price=price,seller=seller)
            return JsonResponse({"msg": "Product added successfully"})
        return JsonResponse({'productdata':productdata})

@csrf_exempt
def seller_productlist(request,sid):
    productdata=list(tbl_product.objects.filter(seller_id=sid).values())
    return JsonResponse({'productdata':productdata})

        
@csrf_exempt
def productlist(request):
    productdata=list(tbl_product.objects.values())
    return JsonResponse({'productdata':productdata})
        
@csrf_exempt
def addstock(request, pid):
    product = tbl_product.objects.get(id=pid)  
    stockdata = list(tbl_stock.objects.filter(product=product).values())
    if request.method == "POST":
        count = request.POST.get("stock")  
        tbl_stock.objects.create(stock_count=count, product=product)  
        return JsonResponse({"msg": "Stock added successfully"})
 
    return JsonResponse( {'stockdata': stockdata })

@csrf_exempt
def addcart(request, uid):
        if request.method == "POST":
            productdata=tbl_product.objects.get(id=request.POST.get("pid"))
            userdata=tbl_user.objects.get(id=uid)
            bookingcount=tbl_booking.objects.filter(user=userdata,booking_status=0).count()
            if bookingcount>0:
                    bookingdata=tbl_booking.objects.get(user=userdata,booking_status=0)
                    cartcount=tbl_cart.objects.filter(booking=bookingdata,product=productdata).count()
                    if cartcount>0:
                            return JsonResponse({'msg':"Already added"})
                    else:
                            tbl_cart.objects.create(booking=bookingdata,product=productdata)
                            return JsonResponse({'msg':"Added To cart"})
            else:
                    bookingdata = tbl_booking.objects.create(user=userdata)
                    tbl_cart.objects.create(booking=bookingdata,product=productdata)
                    return JsonResponse({'msg':"Added To cart"})


# @csrf_exempt
# def mycart(request,uid):
#     if request.method == "POST":
#         bookingdata = tbl_booking.objects.get(id=request.POST.get('bid'))
#         bookingdata.booking_status = 1
#         bookingdata.booking_amount = request.POST.get("grandTotal")
#         bookingdata.save()
#         cartdata = tbl_cart.objects.filter(booking=bookingdata)
#         for i in cartdata:
#             i.cart_status = 1
#             i.save()
#         return JsonResponse({"msg":"Checkout Successfully.."})
#     else:
#         bookingcount= tbl_booking.objects.filter(user=uid,booking_status=0).count()
#         if bookingcount>0:
#             bookingdata = tbl_booking.objects.get(user=uid,booking_status=0)
#             cartdata =list( tbl_cart.objects.filter(booking=bookingdata).values('id','cart_qty','cart_status','product_id','booking_id','product__product_name','product__product_price'))
#             return JsonResponse({'cartdata':cartdata})
#         else:
#             return JsonResponse({'msg':"Cart is Empty..."})



@csrf_exempt
def mycart(request, uid):
    if request.method == "POST":
        bookingdata = tbl_booking.objects.get( id=request.POST.get('bid'))
        bookingdata.booking_status = 1
        bookingdata.booking_amount = request.POST.get("grandTotal")
        bookingdata.save()

        cartdata = tbl_cart.objects.filter(booking=bookingdata)

        for i in cartdata:
            i.cart_status = 1
            i.save()

        return JsonResponse({"msg": "Checkout Successfully.."})

    else:
        bookingcount = tbl_booking.objects.filter(user=uid,booking_status=0).count()
        if bookingcount > 0:
            bookingdata = tbl_booking.objects.get(user=uid,booking_status=0)

            cartdata = tbl_cart.objects.filter(booking=bookingdata)
            result = []

            for i in cartdata:
                # Total available stock for this product
                total_stock = tbl_stock.objects.filter( product=i.product_id).aggregate(total=Sum('stock_count'))['total'] or 0

                # Quantity already booked in other carts
                total_cart = tbl_cart.objects.filter(product=i.product_id,cart_status=1).aggregate(total=Sum('cart_qty'))['total'] or 0

                # Available stock
                available_stock = total_stock - total_cart

                result.append({
                    'id': i.id,
                    'cart_qty': i.cart_qty,
                    'cart_status': i.cart_status,
                    'product_id': i.product_id,
                    'booking_id': i.booking_id,
                    'product__product_name': i.product.product_name,
                    'product__product_price': i.product.product_price,
                    'total_stock': available_stock,
                })

            return JsonResponse({'cartdata': result})

        else:
            return JsonResponse({'msg': 'Cart is Empty...'})

        

@csrf_exempt
def cart_qty(request,cid):
    if request.method == "POST":
        cartdata = tbl_cart.objects.get(id=cid)
        cartdata.cart_qty = request.POST.get("qty")
        cartdata.save()
        return JsonResponse({'msg':"Updated.."})

    


@csrf_exempt
def cart_item_remove(request,id):
    if request.method == "POST":
        tbl_cart.objects.get(id=id).delete()
        return JsonResponse({"msg":"Product Removed From Cart..."})

@csrf_exempt
def payment(request,bid):
    bookingData = list(tbl_booking.objects.filter(id=bid).values())
    if request.method == "POST":
        bookingData = tbl_booking.objects.get(id=bid)
        bookingData.booking_status = 2
        bookingData.save()
        return JsonResponse({"msg":"Payment Successfully Done..."})
    return JsonResponse({"bookingData":bookingData})



@csrf_exempt
def orders(request,uid):
    bookingData= list(tbl_booking.objects.filter(user=uid).values())
    cartData = list(tbl_cart.objects.filter(booking__user_id=uid).values('id','booking_id','cart_qty','cart_status','booking__booking_amount','booking__booking_status','product__product_name','product__product_price'))
    print(cartData)
    return JsonResponse ({"cartData":cartData,"bookingData":bookingData})






