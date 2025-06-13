from django.shortcuts import render, redirect
from django.conf import settings
from userauths.models import User, Profile
from userauths.serializer import ProfileSerializer
from store.models import Product, Category, Gallery, Specification, Size, Color, Cart, CartOrder, CartOrderItem, Coupons, Wishlist, Review, ProductFaq, Notification,Tax
from store.serializers import ProductFaqSerializer, CategorySerializer,VendorSerializer,WishlistSerializer, ProductSerializer, CartSerializer, CartOrderSerializer, CartOrderItemSerializer,CouponsSerializer, NotificationSerializer, ReviewSerializer,SummarySerializer, EarningSerializer, CouponSummarySerializer, NotificationSummarySerializer
from vendor.models import Vendor
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from decimal import Decimal
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.db import models
from rest_framework.decorators import api_view
from django.db.models.functions import ExtractMonth
from datetime import datetime, timedelta



class DashboardStatsAPIView(generics.ListAPIView):
    serializer_class = SummarySerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)

        #Calculate summary values
        #get count od products with the same vendor
        product_counts = Product.objects.filter(vendor=vendor).count()
        #get count of orders with the same vendor
        order_count = CartOrder.objects.filter(vendor=vendor, payment_status="paid").count()
        #get count sum of ptotals in orders  with the same vendor
        revenue = CartOrderItem.objects.filter(vendor=vendor, order__payment_status="paid").aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0
        #return data for serializator
        return [
            {
                "products": product_counts,
                "orders": order_count,
                "revenue": revenue,
            }
        ]
    
    
    def list(self, *args, **kwargs):
        #get queryset
        queryset = self.get_queryset()
        #get serialized data from get_wueryset function, passing more than one object so many=True
        serializer = self.get_serializer(queryset, many=True)
        #send data to frontend
        return Response(serializer.data)



#create API for rendering the couhnts for created orders by vendor in certai  month
@api_view (('GET',))
def MonthlyOrderChartAPIView(request, vendor_id):
    vendor=Vendor.objects.get(id=vendor_id)

    orders= CartOrder.objects.filter(vendor=vendor)
    #count and order  the created orders by months
    orders_per_month = orders.annotate(month=ExtractMonth("date")).values("month").annotate(orders=models.Count("id")).order_by("month")

    return Response(orders_per_month)

#create API for rendering the couhnts for created products by vendor in certai  month
@api_view (('GET',))
def MonthlyProductChartAPIView(request, vendor_id):
    vendor=Vendor.objects.get(id=vendor_id)

    products= Product.objects.filter(vendor=vendor)
    #count and order the created products by months
    products_per_month = products.annotate(month=ExtractMonth("date")).values("month").annotate(products=models.Count("id")).order_by("month")

    return Response(products_per_month)


class ProductAPIView(generics.ListAPIView):
    """ API view for product  from vendor perspective"""
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    #query for products filter by vendor_id
    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        return Product.objects.filter(vendor=vendor)
    

class OrderAPIView(generics.ListAPIView):
    """ API view for orders  from vendor perspective"""
    permission_classes = [AllowAny]
    serializer_class = CartOrderSerializer
    #query of products filtered by vendor_id
    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        return CartOrder.objects.filter(vendor=vendor, payment_status="paid")
    
    
class OrderdetailAPIView(generics.RetrieveAPIView):
    """ API view for order details  from vendor perspective"""
    permission_classes = [AllowAny]
    serializer_class = CartOrderSerializer

    #query of products filtered by vendor_id and order_oid
    def get_object(self):
        vendor_id = self.kwargs['vendor_id']
        order_oid = self.kwargs['order_oid']

        vendor = Vendor.objects.get(id=vendor_id)

        return CartOrder.objects.get(vendor=vendor, oid=order_oid)
    

class RevenueAPIView(generics.ListAPIView):
    """ API view for vendor revenue  from paid orders"""
    permission_classes = [AllowAny]
    serializer_class = CartOrderItemSerializer
    #qyery of cartOrderItems filtered by vendor, and returning the money "total_revenue" form "sub_total" data, 
    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)

        return CartOrderItem.objects.filter(vendor=vendor, order__payment_status="paid").aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0  
   


class FilterProductAPIView(generics.ListAPIView):
    """ API view with definition of filtering the products from vendor with status data (stattes)"""
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        #get filstered instance with the request
        filter = self.request.GET.get("filter")#get filter from URL by porduct status


        #define conditions for filtering the products 
        if filter == "published":
            product = Product.objects.filter(vendor=vendor, status="published")

        elif filter == "in_review":
            product = Product.objects.filter(vendor=vendor, status="in_review")

        elif filter == "disabled":
            product = Product.objects.filter(vendor=vendor, status="disabled")

        elif filter == "draft":
            product = Product.objects.filter(vendor=vendor, status="draft")

        else:
            product = Product.objects.filter(vendor=vendor)

        return product
    


class EarningAPIView(generics.ListAPIView):
    """ API view for vendor revenue for one month from paid orders"""
    permission_classes = [AllowAny]
    serializer_class = EarningSerializer  


    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)

        #defining the one month revenue variable and set the instance of it, set the variable for cunting one month ago revenue
        one_month_ago = datetime.today() - timedelta(days=28)
        monthly_revenue = CartOrderItem.objects.filter(vendor=vendor, order__payment_status="paid", date__gte=one_month_ago).aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0  
        total_revenue = CartOrderItem.objects.filter(vendor=vendor, order__payment_status="paid").aggregate(total_revenue=models.Sum(models.F('sub_total') + models.F('shipping_amount')))['total_revenue'] or 0  
        #creating serialized data for return to frontend
        return [
            {
            "total_revenue": total_revenue,
            "monthly_revenue": monthly_revenue
        }
        ]


    def list(self, *args, **kwargs):
        #get queryset
        queryset = self.get_queryset()
        #get serialized data from get_wueryset function, passing more than one object so many=True
        serializer = self.get_serializer(queryset, many=True)
        #send data to frontend
        return Response(serializer.data)
    

@api_view(('GET',)) 
def MonthlyEarningTracker(request, vendor_id):
    vendor = Vendor.objects.get(id=vendor_id)

    monthly_earning_tracker = (
        CartOrderItem.objects
        .filter(vendor=vendor, order__payment_status="paid")
        .annotate(month=ExtractMonth ("data"))
        .values("month")
        .annotate(
            sales_count = models.Sum("qty"),
            total_earning = models.Sum(models.F("sub_total") + models.F("shipping_amount"))
        ).order_by('-month')
    )

    return Response(monthly_earning_tracker)



class ReviewListAPIView(generics.ListAPIView):
    """ API view to ernder all reviews for vendor porducts"""
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        return Review.objects.filter(product__vendor=vendor) #getting data for review via foreign key product__vendor
    


class ReviewDetailAPIView(generics.RetrieveAPIView):
    """ API view to render  review for vendor porduct"""
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    #filter reviews with vendor data and review id to het just one review
    def get_object(self):
        vendor_id = self.kwargs['vendor_id']
        review_id = self.kwargs['review_id']

        vendor=Vendor.objects.get(id=vendor_id)
        review = Review.objects.filter(product__vendor=vendor, id=review_id) #getting data for review via foreign key product__vendor

        return Review.objects.get(id=review_id)


class CouponListCreateAPIView(generics.ListAPIView):
    """ API view to ernder all coupons for vendor"""
    serializer_class = CouponsSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        return Coupons.objects.filter(vendor=vendor) #getting data for coupon via foreign key vendor    
    
    def create(self, request, *args, **kwargs):

        payload = request.data
        vendor_id = payload['vendor_id']
        code = payload['code']
        discount = payload['discount']
        active = payload['active']



        vendor = Vendor.objects.get(id=vendor_id)
        Coupons.objects.create(
            vendor=vendor,
            code=code,
            discount=discount,
            active=(active.lower() == "true")
        )
        return Response ({"message": "Couon Created SUccessfuly"}, status=status.HTTP_201_CREATED)
    

class CouponDetailsAPIView(generics.RetrieveAPIView):
    """ API view to render  coupon for vendor"""
    serializer_class = CouponsSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        vendor_id = self.kwargs['vendor_id']
        coupon_id = self.kwargs['coupon_id']

        vendor=Vendor.objects.get(id=vendor_id)
        coupon = Coupons.objects.get(vendor=vendor, id=coupon_id) #getting data for coupon 

        return coupon


class CouponStatsAPIView(generics.ListAPIView):
    """ API view to ernder all coupon stats for vendor"""
    serializer_class = CouponSummarySerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)


        total_coupons = Coupons.objects.filter(vendor=vendor).count()
        total_active = Coupons.objects.filter(vendor=vendor, active=True).count()
        #creating serialized data for return to frontend
        return [
            {
                'total_coupons' : total_coupons,
                'total_active' : total_active
            }
        ]

    def list(self, *args, **kwargs):
        #get queryset
        queryset = self.get_queryset()
        #get serialized data from get_wueryset function, passing more than one object so many=True
        serializer = self.get_serializer(queryset, many=True)
        #send data to frontend
        return Response(serializer.data)
    
    
class NotificationUnseenAPIView(generics.ListAPIView):
    """ API view to ernder all unseen notifications for vendor"""
    serializer_class = NotificationSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        return Notification.objects.filter(vendor=vendor, seen=False).order_by('-id') #getting data for notification 
    

class NotificationSeenAPIView(generics.ListAPIView):
    """ API view to ernder all seen notifications for vendor"""
    serializer_class = NotificationSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        return Notification.objects.filter(vendor=vendor, seen=True).order_by('-id') #getting data for notification



class NotificationSummaryAPIView(generics.ListAPIView):
    """ API view to ernder all notification summary for vendor"""
    serializer_class = NotificationSummarySerializer
    permission_classes = [AllowAny] 

    def get_queryset(self):
        vendor_id = self.kwargs['vendor_id']
        vendor = Vendor.objects.get(id=vendor_id)
        
        unread_noti = Notification.objects.filter(vendor=vendor, seen=False).count()
        read_noti = Notification.objects.filter(vendor=vendor, seen=True).count()
        all_noti = Notification.objects.filter(vendor=vendor).count()
        
        return [
            {
               "read_noti" : read_noti,
                "unread_noti" : unread_noti,
                "all_noti" : all_noti
            }
        ]

    def list(self, *args, **kwargs):
        #get queryset
        queryset = self.get_queryset()
        #get serialized data from get_wueryset function, passing more than one object so many=True
        serializer = self.get_serializer(queryset, many=True)
        #send data to frontend
        return Response(serializer.data)



class NotificationVendorMarkAsSeen(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        vendor_id = self.kwargs['vendor_id']
        noti_id = self.kwargs['noti_id']


        vendor = Vendor.objects.get(id=vendor_id)
        noti = Notification.objects.get(id=noti_id)
        noti.seen = True
        noti.save()

        return noti



class VendorProfileUpdateView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]


    def get_object(self):
        pass



class ShopUpdateView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = VendorSerializer
    permission_classes = [AllowAny]



class ShopAPIView(generics.RetrieveAPIView):

    serializer_class = VendorSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        vendor_slug = self.kwargs['vendor_slug']
        return Vendor.objects.get(slug=vendor_slug)
    


class ShopProductAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


    def get_queryset(self):
        vendor_slug = self.kwargs['vendor_slug']
        vendor = Vendor.objects.get(slug=vendor_slug)
        return Product.objects.filter(vendor=vendor)






