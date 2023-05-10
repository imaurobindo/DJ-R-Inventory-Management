from django.contrib import admin
from .models import Product, WarehouseAddress




# Register your models here.
admin.site.register(Product)
admin.site.register(WarehouseAddress)

# class IsLiveAdmin(admin.ModelAdmin):
#     pass

# admin.site.register(IsLive, IsLiveAdmin)

# # Update UserAdmin to include the new permission

# UserAdmin.add_fieldsets = (
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'is_live')}),
#     )

# admin.site.unregister(User)
# admin.site.register(User, UserAdmin)