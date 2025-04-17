from selenium import webdriver
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

def save_to_json(filename, data):
    os.mkdir(os.path.dirname(filename), exist_ok=True)
    
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)