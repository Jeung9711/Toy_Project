from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import chromedriver_autoinstaller

def get_chrome_driver(headless=True):
    chromedriver_autoinstaller.install()

    options = Options()

    if headless:
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')

    return webdriver.Chrome(options=options)