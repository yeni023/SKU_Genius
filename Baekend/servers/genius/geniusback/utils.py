from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from openai import OpenAI
import requests
import logging
import os

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')


def generate(question):#별도로 학습된 모델 추가? langchain을 써야만하는 이유 프리셋으로 나이대별 구분
    api_key = os.getenv("OPENAI_API_KEY")
    chat_model = ChatOpenAI(openai_api_key=api_key, model="gpt-3.5-turbo", temperature=0.7)
    prompt_template = ChatPromptTemplate.from_template("Role : 너는 아이들과 10대들을 위한 동화를 작성하는 동화 작가야.\n"
                                                       "Question: {question}\nAnswer:")
    chain=LLMChain(llm=chat_model, prompt=prompt_template)

    try:
        response = chain.run(question=question, max_tokens=50)
        return response.strip()
    except Exception as e:
        print(f"Error in generating question: {str(e)}")
        return "Error generating question."



def generate_image(subject):
    api_key = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=api_key)
    response = client.images.generate(
        model = "dall-e-3",
        prompt = subject,
    )

    try:
        # 응답 데이터 처리
        image_url = response.data[0].url
        return image_url
    except Exception as e:
        return None, f"Error in generating image: {str(e)}"
