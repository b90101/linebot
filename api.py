from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
from datetime import datetime,date
import urllib.parse #中文字符進行URL編碼

# t1 = time.time()
# chrome = "C:/Users/User/Desktop/chromedriver.exe"
# driver = webdriver.Chrome(chrome)


# s = urllib.parse.quote("新左營")
# e = urllib.parse.quote("高雄")


# url = f"https://traintime.jsy.tw/#/search?s={s}&e={e}&d=2023-06-13&t=15%3A24"

# driver.get(url)

# WebDriverWait(driver,30).until(
#         EC.presence_of_element_located((By.ID,"train-time-table"))
#     )


# page_source = driver.page_source
# #driver.close()
# soup = BeautifulSoup(page_source, 'html.parser')
# rowsa = soup.find_all(id="train-time-table")
# elements = rowsa[0].find_all(class_="train-time-col bv-example-row-flex-cols p-2")[0]
# print(elements.find_all(class_='train-time-left-side')[0].text)#車號
# print(" "+ elements.find_all('span')[0].text)#車種
# print(elements.find_all(class_='train-time-left-side')[1].text)#點到點 
# str = elements.find_all(class_="col-6")[0].text
# #str1 = elements.find_all(class_="col-6")[0].find_all('div')[0].text
# #str2 = elements.find_all(class_="col-6")[0].find_all('div')[1].text
# #print(str[len(str1):len(str)-len(str2)]) #時間
# #print(str1) #是否準時
# #print(str2) #車程
# t2 = time.time()

# print(t2-t1)

def get_train(s,e):
    chrome = "C:/Users/User/Desktop/chromedriver.exe"
    driver = webdriver.Chrome(chrome)
    s = urllib.parse.quote(s) #啟程地
    e = urllib.parse.quote(e) #目的地
    d = date.today() #今天時間
    t = datetime.now().strftime("%H") + "%" + datetime.now().strftime("%M") + "A" + datetime.now().strftime("%S") 
    url = f"https://traintime.jsy.tw/#/search?s={s}&e={e}&d={d}&t={t}"
    driver.get(url)
    WebDriverWait(driver,30).until(EC.presence_of_element_located((By.ID,"train-time-table")))
    page_source = driver.page_source
    #driver.close()
    soup = BeautifulSoup(page_source, 'html.parser')
    rowsa = soup.find_all(id="train-time-table")
    elements = rowsa[0].find_all(class_="train-time-col bv-example-row-flex-cols p-2")
    arrs = []
    i = 0 
    for element in elements:
        arr = ""
        arr = arr + element.find_all(class_='train-time-left-side')[0].text + " " #車號 + " "
        arr = arr + element.find_all('span')[0].text + ""
        arr = arr + element.find_all(class_='train-time-left-side')[1].text + "  \n"
        arr = arr + element.find_all(class_="col-6")[0].text + " \n\n"
        arrs.append(arr)
        i = i + 1
        if i >= 5: break
    return arrs