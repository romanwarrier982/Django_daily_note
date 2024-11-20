from django.contrib import admin
from .models import Note

# Register your models here.
class NoteAdmin(object):
    list_display = ["title"]

admin.site.register(Note)