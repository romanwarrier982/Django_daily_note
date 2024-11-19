from django.contrib.auth import get_user_model  
from rest_framework import serializers  

User = get_user_model()  

class UserSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = User  
        fields = ('first_name', 'last_name', 'username', 'email', 'password')  

    def create(self, validated_data):
        user = User(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user