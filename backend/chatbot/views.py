from django.http import JsonResponse
import json
from .langchain_rag import get_answer
from django.shortcuts import render

def chatbot_ui(request):
    return render(request, "chatbot.html")

def ask_question(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            question = data.get('question', '')
            if not question:
                return JsonResponse({'error': 'No question provided'}, status=400)

            print("🟡 Incoming question:", question)
            answer_object = get_answer(question) # Renamed to avoid confusion
            
            # Extract the content string from the AIMessage object
            # LangChain's invoke method returns an object with a 'content' attribute
            if hasattr(answer_object, 'content'):
                answer_text = answer_object.content
            else:
                # Fallback in case the structure changes or is unexpected
                answer_text = str(answer_object) 

            print("🟢 Got answer:", answer_text)
            return JsonResponse({'answer': answer_text}) # Send the extracted text

        except Exception as e:
            print("🔴 Exception occurred:", str(e))
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
