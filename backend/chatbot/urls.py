from django.urls import path
from .views import ask_question, chatbot_ui

urlpatterns = [
    path("ask/", ask_question, name="ask"),
    path("", chatbot_ui, name="chatbot-ui"),
]
