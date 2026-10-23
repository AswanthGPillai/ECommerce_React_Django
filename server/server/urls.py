
from django.urls import path
from django.conf.urls.static import static
from server import views
from django.conf import settings

urlpatterns = [

    # district
    path('district/',views.district),
    path('district_del/<int:did>/',views.district_del),
    path('district_edit/<int:uid>/',views.district_edit),

    # admin
    path('admin_registration/',views.admin_registration),
    path('admin_delete/<int:did>/',views.admin_delete),
    path('admin_edit/<int:eid>/',views.admin_edit),

    # place
    path('place/',views.place),
    path('place_delete/<int:did>/',views.place_delete),
    path('place_filter/<int:did>/',views.place_filter),
    path('place_edit/<int:eid>/',views.place_edit),

    # user
    path('user/',views.user),
    path('user_list/',views.user_list),
    # login
    path('login/',views.login),
    path('user_accept/<int:uid>/',views.user_accept),
    path('user_reject/<int:uid>/',views.user_reject),

    path('user_single/<int:uid>/',views.user_single),

    path('user_edit/<int:uid>/',views.user_edit),

    path('change_password/<int:uid>/',views.change_password),

    
    path('seller/',views.seller),

    path('product/<int:sid>/',views.product),
    path('seller_productlist/<int:sid>/',views.seller_productlist),
    path('productlist/',views.productlist),
    path('addstock/<int:pid>/',views.addstock),

    path('addcart/<int:uid>/',views.addcart),
    path('mycart/<int:uid>/',views.mycart),
    path('cart_qty/<int:cid>/',views.cart_qty),

    path('cart_item_remove/<int:id>/',views.cart_item_remove),

    path('payment/<int:bid>/',views.payment),

    path('orders/<int:uid>/',views.orders),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)