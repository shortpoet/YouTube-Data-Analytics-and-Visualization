import os

import pymongo

from splinter import Browser
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.support.ui import Select

import pandas as pd

import re
from pprint import pprint
from datetime import datetime
import time

import sqlalchemy
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, Text, Float, ForeignKey, Date, DateTime, Boolean, BigInteger
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import inspect

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
mongoDb = client.social_blade

collection = mongoDb.social_blade_test

executable_path = {'executable_path': '/Users/soria/Anaconda3/Scripts/chromedriver'}
browser = Browser('chrome', **executable_path)

if mongoDb.social_blade_test.find_one():
    html = mongoDb.social_blade_test.find_one()['social_blade_html']
else:
    url = "https://socialblade.com/youtube/user/GentleWhispering/monthly"
    browser.visit(url)
    html = browser.html
    test_html_dict = {'social_blade_url': url, 'social_blade_html':html}
    collection.update_one({}, {'$set': test_html_dict}, upsert=True)

blade_soup = bs(html, 'html.parser')

script_divs = blade_soup.find_all('script', {'type': 'text/javascript'})
script_divs = script_divs[9:15]
raw_text = script_divs[0].text

def dataframer(blob, val_type):
    string_list = blob.split('+')
    string_list = string_list[1:]
    stripped = [string.strip('"\\n') for string in string_list]
    stripped = [(re.sub(f'\\\\n"', "", string)) for string in stripped]
    stripped = [(re.sub(f'"', "", string)) for string in stripped]
    dict_list = []
    for strip in stripped:
        date_val = strip.split(',')
        date = date_val[0]
        print(date)
        val = date_val[1]
        print(val)
        dict_list.append({'date': date, val_type: val})
    return dict_list

# raw_text = script_divs[0].text
# front_strip = re.sub(r'\Subs\\\\n"(.*)', "", raw_text)
# front_strip

# back_strip = re.search(r'^(.*?)Gained', raw_text).group(0)

# test = re.search(r'.+?(?=Gained)', raw_text).group(0)
# test

# test2 = re.search(r'(?<=Gained).*', raw_text).group(0)
# test2


test = '"2018-11-11,1376\\n" + "2018-11-12,916\\n" + "2018-11-13,1051\\n" + "2018-11-14,1011\\n" + "2018-11-15,1055\\n" + "2018-11-16,1038\\n" + "2018-11-17,987\\n" + "2018-11-18,986\\n" + "2018-11-19,1072\\n" + "2018-11-20,1003\\n" + "2018-11-21,1098\\n" + "2018-11-22,729\\n" + "2018-11-23,1299\\n" + "2018-11-24,950\\n" + "2018-11-25,1046\\n" + "2018-11-26,774\\n" + "2018-11-27,1046\\n" + "2018-11-28,949\\n" + "2018-11-29,930\\n" + "2018-11-30,758\\n" + "2018-12-01,1032\\n" + "2018-12-02,797\\n" + "2018-12-03,1080\\n" + "2018-12-04,1256\\n" + "2018-12-05,1269\\n" + "2018-12-06,1145\\n" + "2018-12-07,1236\\n" + "2018-12-08,1212\\n" + "2018-12-09,1106\\n" + "2018-12-10,1266\\n" + "2018-12-11,1212\\n" + "2018-12-12,1204\\n" + "2018-12-13,-1519\\n" + "2018-12-14,1112\\n" + "2018-12-15,1288\\n" + "2018-12-16,1155\\n" + "2018-12-17,1281\\n" + "2018-12-18,1806\\n" + "2018-12-19,1455\\n" + "2018-12-20,834\\n" + "2018-12-21,1519\\n" + "2018-12-22,1032\\n" + "2018-12-23,884\\n" + "2018-12-24,891\\n" + "2018-12-25,1200\\n" + "2018-12-26,1360\\n" + "2018-12-27,1186\\n" + "2018-12-28,1192\\n" + "2018-12-29,1076\\n" + "2018-12-30,698\\n" + "2018-12-31,880\\n" + "2019-01-01,1260\\n" + "2019-01-02,1413\\n" + "2019-01-03,1115\\n" + "2019-01-04,974\\n" + "2019-01-05,1152\\n" + "2019-01-06,910\\n" + "2019-01-07,712\\n" + "2019-01-08,1842\\n" + "2019-01-09,1561\\n" + "2019-01-10,1117\\n" + "2019-01-11,1493\\n" + "2019-01-12,1198\\n" + "2019-01-13,1050\\n" + "2019-01-14,1011\\n" + "2019-01-15,1152\\n" + "2019-01-16,1042\\n" + "2019-01-17,965\\n" + "2019-01-18,872\\n" + "2019-01-19,919\\n" + "2019-01-20,773\\n" + "2019-01-21,1019\\n" + "2019-01-22,1027\\n" + "2019-01-23,1062\\n" + "2019-01-24,979\\n" + "2019-01-25,893\\n" + "2019-01-26,893\\n" + "2019-01-27,1007\\n" + "2019-01-28,1184\\n" + "2019-01-29,1156\\n" + "2019-01-30,1096\\n" + "2019-01-31,991\\n" + "2019-02-01,1083\\n" + "2019-02-02,1063\\n" + "2019-02-03,1064\\n" + "2019-02-04,624\\n" + "2019-02-05,785\\n" + "2019-02-06,820\\n" + "2019-02-07,841\\n" + "2019-02-08,711\\n"'

# dataframer(test, "daily_subs")

dataframer(raw_text[139:-497], 'daily_subs')