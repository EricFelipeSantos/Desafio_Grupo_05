from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = "Cria um superusuário padrão se ele ainda não existir"

    def handle(self, *args, **kwargs):
        User = get_user_model()
        email = "maxwerda@hotmail.com"
        password = "SophieBaby@2026#Kids"

        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.SUCCESS("Superusuário já existe."))
            return

        User.objects.create_superuser(email=email, password=password)
        self.stdout.write(self.style.SUCCESS(f"Superusuário {email} criado com sucesso."))