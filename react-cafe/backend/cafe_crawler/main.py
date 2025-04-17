from cafes import cafes
from crawler import crawl_mega, crawl_default
from utils import get_chrome_driver, save_to_json

# 크롤링할 카페의 타입과 함수를 연결하는 객체
crawl_funcs = {
    "mega" : crawl_mega,
    "default" : crawl_default,
}

driver = get_chrome_driver()

all_results = []

for cafe in cafes:
    print(f"{cafe.name} 크롤링 시작")
    func = crawl_funcs.get(cafe.crawl_type, crawl_funcs["default"])
    result = func(driver, cafe.url)
    all_results.extend(result)

driver.quit()

for menu in all_results:
    print(menu)