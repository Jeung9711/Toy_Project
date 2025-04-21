import json
import os
import requests
from utils import save_to_json, get_chrome_driver, wait_for_page_load
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
import time

# 각 카페별 최초 크롤링 - 기준이 되는 메뉴

# 메가박스 최초 크롤링
def crawl_mega_first():
    driver = get_chrome_driver()
    url = "https://www.mega-mgccoffee.com/menu/?menu_category1=1&menu_category2=1"
    driver.get(url)
    time.sleep(2)

    result = []
    while True:
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        menu_items = soup.select("#menu_list > li")


        for item in menu_items:
            name_tag = item.select_one(".inner_modal_open .cont_text_inner.text_wrap.cont_text_title")
            image_tag = item.select_one(".inner_modal_open .cont_gallery_list_img img")
            desc_list = item.select(".inner_modal .cont_list_small2 ul li")

            if not name_tag or not image_tag:
                continue
            
            name = name_tag.text.strip()
            image = image_tag["src"]
            nutrition = [li.text.strip() for li in desc_list] if desc_list else []

            result.append({
                "cafe" : "megacoffee",
                "name" : name,
                "image" : image,
                "nutrition" : nutrition
            })

        # 다음 페이지로 이동
        try:
            more_button = driver.find_element(By.CLASS_NAME, "board_page_next")
            ActionChains(driver).move_to_element(more_button).click().perform()
            time.sleep(3)
        except NoSuchElementException:
            print("모든 메뉴 로딩 완료")
            break

    driver.quit()

    save_to_json("mega_coffee",result)

    print(f"mega crawling complete! {len(result)} done")

# crawl_mega_first()

# 더 벤티 최초 크롤링
def crawl_theventi_first():
    base_url = "https://www.theventi.co.kr/new2022/menu/"
    start_url = base_url + "all.html?mode=1"
    driver = get_chrome_driver()
    driver.get(start_url)
    time.sleep(2)

    result = []

    exclude_tab = ["사이드메뉴/RTD","qksfuehdanf"]
    exclude_keywords = ["텀블러","크루키","파이만주","쉐이크밀","벤티츄",""]

    def is_valid_menu(name):
        return all(keyword not in name for keyword in exclude_keywords)
    
    tab_elements = driver.find_elements(By.CSS_SELECTOR,".tab.box  a")
    print(f"tab_elements : {len(tab_elements)}")

    for tab in tab_elements:
        try:
            tab_name = tab.text.strip()
            if tab_name in exclude_tab:
                continue
            
            tab.click()
            wait_for_page_load(driver, ".menu_list")

            tab_elements = driver.find_elements(By.CSS_SELECTOR, ".tab.box a")
            print(f"탭 클릭 후 HTML 구조 확인: {tab_name}")
        except:
            print(f"{tab_name} 클릭 실패")
            continue

        menu_links = driver.find_elements(By.CSS_SELECTOR, ".menu_list li > a")
        print(f"menu link : {len(menu_links)}")

        for a_tag in menu_links:
            href = a_tag.get_attribute("href")
            
            if not href or not href.startswith("all-view"):
                continue

            detail_url = base_url + href

            driver.get(detail_url)
            time.sleep(2)

            try:
                wait_for_page_load(driver, ".menu_desc_wrap .txt_box .tit")
                name_element = driver.find_element(By.CSS_SELECTOR, ".menu_desc_wrap .txt_box .tit")
                name = name_element.text.strip()

                if not is_valid_menu(name):
                    continue
                
                image_tag = driver.find_element(By.CSS_SELECTOR, ".menu_desc_wrap img")
                image = image_tag.get_attribute("src") if image_tag else ""

                desc= driver.find_element(By.CSS_SELECTOR, ".table")
                nutrition = {}
                if desc:
                    headers = [th.text.strip() for th in desc.select("thead th")]
                    values = [td.text.strip() for td in desc.select("tbody td")]

                    if len(headers) == len(values):
                        nutrition = dict(zip(headers, values))

                result.append({
                    "cafe" : "theventi",
                    "name" : name,
                    "image" : image,
                    "nutrition" : nutrition
                })

            except Exception as e:
                print(f"page error: {e}")
                continue

    save_to_json("theventi",result)
    print(f"the venti crawling done. {len(result)}")
    print(driver.current_url)
    print(BeautifulSoup(driver.page_source, "html.parser").prettify()[:1000])  # 처음 1000자만 출력
    driver.quit()


crawl_theventi_first()
