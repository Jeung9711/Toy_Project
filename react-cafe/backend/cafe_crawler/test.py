import requests
from bs4 import BeautifulSoup

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

url = "https://www.theventi.co.kr/new2022/menu/all-view.new.html?uid=460"
response = requests.get(url, headers=headers)

print("응답 코드:", response.status_code)
print("응답 길이:", len(response.text))

soup = BeautifulSoup(response.text, "html.parser")
print("제목:", soup.select_one(".tit").text.strip() if soup.select_one(".tit") else "없음")
