from rest_framework import serializers
from django.contrib.auth.models import User

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data): # aqui ele está buscando o usuário pelo email e senha
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            raise serializers.ValidationError('Email e senha são obrigatórios.')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Email não cadastrado.')
        
        if not user.check_password(password):
            raise serializers.ValidationError('Senha incorreta.')
        
        if not user.is_active:
            raise serializers.ValidationError('Usuário inativo.')
        
        data['user'] = user
        return data