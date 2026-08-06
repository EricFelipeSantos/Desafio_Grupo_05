import requests
from django.core.files.storage import Storage
from django.conf import settings
from urllib.parse import quote


class SupabaseStorage(Storage):
    def __init__(self):
        self.project_url = "https://obkwtpudirsrzjhjfnmr.supabase.co"
        self.bucket = "sophie-media"
        self.service_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ia3d0cHVkaXJzcnpqaGpmbm1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTcwMDU2NywiZXhwIjoyMTAxMjc2NTY3fQ.zUUaTe22wsy6hp5ri5j37H78Opz2-F-jo43UwyYAJFU"

    def _save(self, name, content):
        url = f"{self.project_url}/storage/v1/object/{self.bucket}/{name}"
        headers = {
            "Authorization": f"Bearer {self.service_key}",
            "Content-Type": content.file.content_type if hasattr(content.file, 'content_type') else "application/octet-stream",
        }
        content.seek(0)
        response = requests.post(url, headers=headers, data=content.read())
        if response.status_code not in (200, 201):
            raise Exception(f"Erro ao enviar para Supabase: {response.text}")
        return name

    def _open(self, name, mode='rb'):
        raise NotImplementedError("Leitura direta não implementada — use a URL pública.")

    def exists(self, name):
        return False  # sempre permite sobrescrever/gerar novo nome se necessário

    def url(self, name):
        return f"{self.project_url}/storage/v1/object/public/{self.bucket}/{quote(name)}"

    def delete(self, name):
        url = f"{self.project_url}/storage/v1/object/{self.bucket}/{name}"
        headers = {"Authorization": f"Bearer {self.service_key}"}
        requests.delete(url, headers=headers)

    def size(self, name):
        return 0