
from bs4 import BeautifulSoup
import time
import re  # python의 정규표현식 모듈

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys



def crawl_default(driver, url):
    """
    가장 기본적인 크롤링 함수 템플릿
    :param driver: selenium webdriver
    :param url: 카페의 크롤링 대상 페이지 URL
    :return: 메뉴 정보 리스트 (딕셔너리 형태)
    """
    driver.get(url)
    time.sleep(2)  # 로딩 대기

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    result = []

    # 예시용 반복 - 필요한 경우 이 부분을 수정해서 사용
    menu_items = soup.select(".menu-item")  # ← 실제 클래스명으로 변경
    for item in menu_items:
        name = item.select_one(".menu-name").text.strip() if item.select_one(".menu-name") else "이름 없음"
        image_tag = item.select_one("img")
        img_url = image_tag["src"] if image_tag and image_tag.has_attr("src") else None

        result.append({
            "menu_name": name,
            "img_url": img_url,
            "cafe_name": "기본카페",  # 추후 설정
            "theme": None  # 이미지 OCR 또는 키워드 추출 시 사용 가능
        })

    return result


# 메가 커피 크롤링
def crawl_mega(driver, url):

    crawl_url = url + "menu/?menu_category1=1&menu_category2=1"
    driver.get(crawl_url)
    time.sleep(2)

    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # 신메뉴 크롤링
    # 신메뉴 설명 -> 신메뉴 추출 -> 전체 메뉴에서 필터링 -> 해당값만 저장
    description_div = soup.select_one('div.cont_box.menu01 div.cont_list_content_align .cont_text_wrap')
    new_menu_keywords = []
    if description_div:
        text = description_div.get_text(strip=True)
        print("설명 텍스트>", text)
        new_menu_keywords = re.findall(r"'([^']+)'", text) # '' 사이 추출
        print("추출된 텍스트>", new_menu_keywords)
    
    result = []
    html = '.cont_boxs.menu_box #menu_list #menu_list'
    container = soup.select_one(html)
    if not container:
        print("container 못찾음")
        return result
    
    items = container.select("li")
    for item in items:
        name_tag = item.select_one(".inner_modal_open .cont_text_box .text.text1")
        image_tag = item.select_one('.inner_modal_open .cont_gallery_list_img img')
        desc_list = item.select('.inner_modal .cont_list.cont_list2.cont_list_small.cont_list_small2 ul li')

        if not name_tag or not image_tag:
            continue

        name = name_tag.text.strip()
        image = image_tag["src"]
        desc = [li.text.strip() for li in desc_list] if desc_list else ""

        nutrition = {}
        for line in desc:
            parts = line.split()
            if len(parts) == 2:
                key, value = parts
                nutrition[key] = value
            elif len(parts) == 1:
                nutrition[parts[0]] = "정보 없음"

        if any(keyword in name for keyword in new_menu_keywords):
            result.append({
                "cafe" : "메가커피",
                "name" : name,
                "image" : image,
                "price" : None,
                "nutrition" : nutrition,
            })
    
    print(f"total {len(result)} new menu")
    for r in result:
        print(r)
    return result

#스타벅스 크롤링
def crawl_starbucks(driver, url):

    # 스타벅스 이벤트 창으로 이동
    crawl_url = url+'/whats_new/campaign_list.do'
    driver.get(crawl_url)
    time.sleep(2)

    # 신메뉴를 클릭

    

