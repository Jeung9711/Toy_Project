from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller
import json
import os

def get_chrome_driver(headless=True):
    chromedriver_autoinstaller.install()

    options = Options()

    if headless:
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')

    return webdriver.Chrome(options=options)

def save_to_json(cafe_name, data):
    save_dir = os.path.join("data","base_menu",cafe_name)
    os.makedirs(save_dir, exist_ok=True)
    
    save_path = os.path.join(save_dir, f"{cafe_name}.json")
    with open(save_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_existing_data(cafe_name):
    try:
        with open(f"data/base_menu/{cafe_name}.json","r",encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    
def wait_for_page_load(driver, css_selector):
    WebDriverWait(driver,10).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, css_selector))
    )