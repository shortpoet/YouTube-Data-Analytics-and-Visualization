import os

import pymongo
from bson.json_util import dumps, loads
from bson.objectid import ObjectId

from splinter import Browser
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
from selenium.common.exceptions import TimeoutException

import pandas as pd

import re
from pprint import pprint
from datetime import datetime as dt
import time
import isodate

import sys
sys.path.append('C:\\Users\\soria\\Documents\\WashUDataDocuments\\HwActivites\\YouTube_Project\\')
from config import YOUTUBE_DATA_API_KEY
import pandas as pd
import json
import os
from pprint import pprint

from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser

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
        val = date_val[1]
        dict_list.append({'dates': date, val_type: val})
    return dict_list

def topicCipher(array):
    if array == '':
        return ''
    else:
        df = pd.DataFrame({'topic_id': array})
        merge = pd.merge(df, topic_df, on='topic_id', how='left')
        return merge['topic_name'].values.tolist()

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
mongoDb = client.asmr_youtube

executable_path = {'executable_path': '/Users/soria/Anaconda3/Scripts/chromedriver'}
browser = Browser('chrome', **executable_path)
driver = webdriver.Chrome()

updated_asmr_df = pd.read_csv('asmr_merge_updated.csv')
updated_asmr_df['channel'] = [re.sub(r'\s+', "", channel) for channel in updated_asmr_df['channel']]
updated_asmr_df = updated_asmr_df.fillna(0)

channel_names = updated_asmr_df['channel'].values.tolist()
sb_urls = updated_asmr_df['sb_url'].values.tolist()
birthyears = updated_asmr_df['birthyear'].values.tolist()
countries = updated_asmr_df['country'].values.tolist()
genders = updated_asmr_df['gender'].values.tolist()
twitters = updated_asmr_df['twitter'].values.tolist()
instagrams = updated_asmr_df['instagram'].values.tolist()
twitches = updated_asmr_df['twitch'].values.tolist()
facebooks = updated_asmr_df['facebook'].values.tolist()
urls = updated_asmr_df['url'].values.tolist()

channel_names = [re.sub(r'\.+', '', name) for name in channel_names]
channel_names = [re.sub(r"'+", '', name) for name in channel_names]

data_types = ['daily_subs', 'total_subs', 'daily_views', 'total_views', 'average_views', 'monthly_views']

if mongoDb.social_blade_asmr_response.find_one():
    asmr_channels_data_list = []
    social_blade_asmr_response_dict = {}
    asmr_social_blade_data_dict = {}
    for index, url in enumerate(sb_urls):
        channel = channel_names[index]
        collection = mongoDb.social_blade_asmr_response
        html = loads(dumps(collection.find({channel : {'$exists':True}})))[0][channel]
    
        blade_soup = bs(html, 'html.parser')
        channel_name = blade_soup.find('h1').text
        id_anchor = blade_soup.find('a', class_='core-button -margin core-small-wide ui-black', rel='nofollow')['href']
        channel_id = re.search(r'(?<=channel/).*', id_anchor).group(0)
        uploads = blade_soup.find('span', id="youtube-stats-header-uploads").text
        subs = blade_soup.find('span', id="youtube-stats-header-subs").text
        views = blade_soup.find('span', id="youtube-stats-header-views").text
        country = blade_soup.find('span', id="youtube-stats-header-country").text
        channel_type = blade_soup.find('span', id="youtube-stats-header-channeltype").text
        date_created = blade_soup.find('span', text='User Created').findNext('span').text
        
        country = countries[index]
        birthyear = birthyears[index]
        gender = genders[index]
        twitter = twitters[index]
        instagram = instagrams[index]
        twitch = twitches[index]
        facebook = facebooks[index]
 
        asmr_social_blade_data_dict.setdefault(channel, {})
        asmr_social_blade_data_dict[channel] = {'channel_name':channel_name, 'channel_id':channel_id, 
                                                'uploads': uploads, 'subs': subs, 'views':views, 'country':country,
                                                'gender': gender, 'birthyear': birthyear, 'twitter': twitter,  
                                                'instagram': instagram, 'twitch': twitch, 'facebook': facebook,  
                                                'channel_type':channel_type, 'date_created':date_created, 'time_series':{}}
        script_divs = blade_soup.find_all('script', {'type': 'text/javascript'})
        script_divs = script_divs[9:15]
        for index, script in enumerate(script_divs):
            asmr_social_blade_data_dict[channel]['time_series'][data_types[index]] = dataframer(script.text, data_types[index])
        collection = mongoDb.social_blade_asmr_data
        collection.update_one({}, {'$set': asmr_social_blade_data_dict}, upsert=True)
        
else:
    asmr_channels_data_list = []
    social_blade_asmr_response_dict = {}
    asmr_social_blade_data_dict = {}
    for index, url in enumerate(sb_urls):
        browser.visit(url)
        html = browser.html

        channel = channel_names[index]
        social_blade_asmr_response_dict.setdefault(channel, {})
        social_blade_asmr_response_dict[channel] = html
        collection = mongoDb.social_blade_asmr_response
        collection.update_one({}, {'$set': social_blade_asmr_response_dict}, upsert=True)

        blade_soup = bs(html, 'html.parser')
        channel_name = blade_soup.find('h1').text
        id_anchor = blade_soup.find('a', class_='core-button -margin core-small-wide ui-black', rel='nofollow')['href']
        channel_id = re.search(r'(?<=channel/).*', id_anchor).group(0)
        uploads = blade_soup.find('span', id="youtube-stats-header-uploads").text
        subs = blade_soup.find('span', id="youtube-stats-header-subs").text
        views = blade_soup.find('span', id="youtube-stats-header-views").text
        channel_type = blade_soup.find('span', id="youtube-stats-header-channeltype").text
        date_created = blade_soup.find('span', text='User Created').findNext('span').text
        
        country = countries[index]
        birthyear = birthyears[index]
        gender = genders[index]
        twitter = twitters[index]
        instagram = instagrams[index]
        twitch = twitches[index]
        facebook = facebooks[index]
 
        asmr_social_blade_data_dict.setdefault(channel, {})
        asmr_social_blade_data_dict[channel] = {'channel_name':channel_name, 'channel_id':channel_id, 
                                                'uploads': uploads, 'subs': subs, 'views':views, 'country':country,
                                                'gender': gender, 'birthyear': birthyear, 'twitter': twitter,  
                                                'instagram': instagram, 'twitch': twitch, 'facebook': facebook,  
                                                'channel_type':channel_type, 'date_created':date_created, 'time_series':{}}
        script_divs = blade_soup.find_all('script', {'type': 'text/javascript'})
        script_divs = script_divs[9:15]
        for index, script in enumerate(script_divs):
            asmr_social_blade_data_dict[channel]['time_series'][data_types[index]] = dataframer(script.text, data_types[index])
        collection = mongoDb.social_blade_asmr_data
        collection.update_one({}, {'$set': asmr_social_blade_data_dict}, upsert=True)

DEVELOPER_KEY = YOUTUBE_DATA_API_KEY
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION,
    developerKey=DEVELOPER_KEY)


collection = mongoDb.topicId_gist_html
if mongoDb.topicId_gist_html.find_one():
    html = mongoDb.topicId_gist_html.find_one()['gist_html']
else:
    url = "https://gist.github.com/stpe/2951130dfc8f1d0d1a2ad736bef3b703"
    driver = webdriver.Chrome()
    driver.get(url)
    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.element_to_be_clickable((By.ID,'user-content-other-topics')))
    html = driver.page_source
topic_id_html_dict = {'topicId_gist_url': driver.current_url, 'gist_html':html}
collection.update_one({}, {'$set': topic_id_html_dict}, upsert=True)
topic_soup = bs(html, 'html.parser')
heading_list = []
topic_headings = topic_soup.find_all('h2')
for heading in topic_headings:
    heading_list.append(heading.text)
topics_dict = {}
topic_dict_list = []
topics = topic_soup.find_all('li')
for index, topic in enumerate(topics[4:20]):
    text = topic.text
    topic_tuple = re.split(r'\s\s\s', text)
    collection = mongoDb.youtube_topicIds
    topic_name = topic_tuple[1]
    topic_id = topic_tuple[0]
    topic_heading = heading_list[0]
    topics_dict.setdefault(topic_heading, [])
    topics_dict[topic_heading].append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    topic_dict_list.append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    collection.update_one({}, {'$set': topics_dict}, upsert=True)
    
for index, topic in enumerate(topics[20:31]):
    text = topic.text
    topic_tuple = re.split(r'\s\s\s', text)
    collection = mongoDb.youtube_topicIds
    topic_name = topic_tuple[1]
    topic_id = topic_tuple[0]
    topic_heading = heading_list[1]
    topics_dict.setdefault(topic_heading, [])
    topics_dict[topic_heading].append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    topic_dict_list.append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    collection.update_one({}, {'$set': topics_dict}, upsert=True)
    
for index, topic in enumerate(topics[31:45]):
    text = topic.text
    topic_tuple = re.split(r'\s\s\s', text)
    collection = mongoDb.youtube_topicIds
    topic_name = topic_tuple[1]
    topic_id = topic_tuple[0]
    topic_heading = heading_list[2]
    topics_dict.setdefault(topic_heading, [])
    topics_dict[topic_heading].append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading}) 
    topic_dict_list.append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    collection.update_one({}, {'$set': topics_dict}, upsert=True)
    
for index, topic in enumerate(topics[45:50]):
    text = topic.text
    topic_tuple = re.split(r'\s\s\s', text)
    collection = mongoDb.youtube_topicIds
    topic_name = topic_tuple[1]
    topic_id = topic_tuple[0]
    topic_heading = heading_list[3]
    topics_dict.setdefault(topic_heading, [])
    topics_dict[topic_heading].append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading}) 
    topic_dict_list.append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    collection.update_one({}, {'$set': topics_dict}, upsert=True)
    
for index, topic in enumerate(topics[50:61]):
    text = topic.text
    topic_tuple = re.split(r'\s\s\s', text)
    collection = mongoDb.youtube_topicIds
    topic_name = topic_tuple[1]
    topic_id = topic_tuple[0]
    topic_heading = heading_list[4]
    topics_dict.setdefault(topic_heading, [])
    topics_dict[topic_heading].append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading}) 
    topic_dict_list.append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    collection.update_one({}, {'$set': topics_dict}, upsert=True)
    
for index, topic in enumerate(topics[61:63]):
    text = topic.text
    topic_tuple = re.split(r'\s\s\s', text)
    collection = mongoDb.youtube_topicIds
    topic_name = topic_tuple[1]
    topic_id = topic_tuple[0]
    topic_heading = heading_list[5]
    topics_dict.setdefault(topic_heading, [])
    topics_dict[topic_heading].append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    topic_dict_list.append({'topic_name': topic_name, 'topic_id': topic_id, 'topic_heading': topic_heading})
    collection.update_one({}, {'$set': topics_dict}, upsert=True)
topics_dict['all_topics'] = topic_dict_list
collection.update_one({}, {'$set': topics_dict}, upsert=True)

topic_df = pd.DataFrame(topic_dict_list)

collection = mongoDb.regionCode_ytApi_response
if mongoDb.regionCode_ytApi_resonse.find_one():
    region_code_search_response = mongoDb.regionCode_ytApi_response.find_one()['region_code_ytApi_response']
else:
    region_code_search_response = youtube.i18nRegions().list(
    part="snippet,id"
        
    ).execute()
region_code_response_dict = {'region_code_ytApi_response': region_code_search_response}
collection.update_one({}, {'$set': region_code_response_dict}, upsert=True)
region_code_dict_list = []
region_codes_dict = {"region_codes": []}
for item in region_code_search_response['items']:
    region = item['snippet']['name']
    region_code = item['snippet']['gl']
    region_codes_dict['region_codes'].append({'region': region, 'region_code': region_code})
    collection = mongoDb.youtube_regionCodes
    collection.update_one({}, {'$set': region_codes_dict}, upsert=True)
    region_code_dict_list.append({'region': region, 'region_code': region_code})
    
collection = mongoDb.videoCategory_ytApi_response
if mongoDb.videoCategory_ytApi_response.find_one():
    all_region_category_list = []
    video_category_response_dict = {}
    region_categories_dict = {}
    for region in region_code_dict_list:
        region_code = region['region_code']
        collection = mongoDb.videoCategory_ytApi_response
        video_category_search_response = loads(dumps(collection.find({region_code : {'$exists':True}})))
        for response in video_category_search_response:
            region_categories_dict.setdefault(region_code, [])
            region_category_list = []
            for item in response[region_code]['items']:
                category_title = item['snippet']['title']
                category_id = item['id']
                category_is_assignable = item['snippet']['assignable']
                category_id_dict = {'category_title': category_title, 'category_id': category_id,\
                                    'category_is_assignable': category_is_assignable, 'region_code': region_code}
                region_category_list.append(category_id_dict)
                region_categories_dict[region_code].append(category_id_dict)
            collection = mongoDb.youtube_videoCategories
            collection.update_one({}, {'$set': region_categories_dict}, upsert=True)
            region['categories'] = region_category_list
            all_region_category_list.append(region_category_list)
else:
    all_region_category_list = []
    video_category_response_dict = {}
    region_categories_dict = {}
    for region in region_code_dict_list:
        region_code = region['region_code']
        video_category_search_response = youtube.videoCategories().list(
            regionCode=region_code,
            part="snippet,id"
        ).execute()
        video_category_response_dict.setdefault(region_code, {})
        video_category_response_dict[region_code] = video_category_search_response
        collection = mongoDb.videoCategory_ytApi_response
        collection.update_one({}, {'$set': video_category_response_dict}, upsert=True)
        region_categories_dict.setdefault(region_code, [])
        region_category_list = []
        for item in video_category_search_response['items']:
            category_title = item['snippet']['title']
            category_id = item['id']
            category_is_assignable = item['snippet']['assignable']
            category_id_dict = {'category_title': category_title, 'category_id': category_id,\
                                'category_is_assignable': category_is_assignable, 'region_code': region_code}
            region_category_list.append(category_id_dict)
            region_categories_dict[region_code].append(category_id_dict)
        collection = mongoDb.youtube_videoCategories
        collection.update_one({}, {'$set': region_categories_dict}, upsert=True)
        region['categories'] = region_category_list
        all_region_category_list.append(region_category_list)

for index, url in enumerate(urls):
    channel = channel_names[index]
    cacheFilePath = f"./../../../youtube_project_caches/{channel}_youtube_scrape_html.txt"
    if os.path.isfile(cacheFilePath):
        with open(cacheFilePath, encoding='utf-8') as cacheFile:
            html = cacheFile.read() 
        video_soup = bs(html, 'html.parser')
        video_soup.find_all('a', id='video-title')
        anchors = video_soup.find_all('a', id='video-title')
        videos = []
        for anchor in anchors:
            _id = anchor['href'][9:]
            video_dict = {'video_id': _id}
            videos.append(video_dict)
        collection = mongoDb.youtube_channel_video_data
        target = channel + '.videos'
        collection.update_one({}, {'$set': {channel: videos} }, upsert=True)
    else:    
        TIMEOUT_IN_SECONDS = 10

        wait = WebDriverWait(driver, TIMEOUT_IN_SECONDS)
        url = url + '/videos'
        driver.get(url)

        wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "#items")))

        def get_count():
            return len(driver.find_elements_by_css_selector("#items #video-title"))

        while True:
            initial_count = get_count()
            driver.execute_script(
                "window.scrollTo(0, document.querySelector('#items').scrollHeight);")
            try:
                wait.until(
                    lambda _: get_count() > initial_count)
            except TimeoutException:
                # No additional content appeared. Abort our loop.
                break

        elements = driver.find_elements_by_css_selector("#items #video-title")

        html = driver.page_source
        with open(cacheFilePath, "w", encoding='utf-8') as cacheFile:
            cacheFile.write(html)

        video_soup = bs(html, 'html.parser')
        video_soup.find_all('a', id='video-title')

        anchors = video_soup.find_all('a', id='video-title')
        videos = []
        for anchor in anchors:
            _id = anchor['href'][9:]
            video_dict = {'video_id': _id}
            videos.append(video_dict)
        collection = mongoDb.youtube_channel_video_data
        target = channel + '.videos'
        collection.update_one({}, {'$set': {channel: videos} }, upsert=True)

if mongoDb.social_blade_asmr_data.find_one():
    for index, url in enumerate(urls):
        
        channel = channel_names[index]
        collection = mongoDb.social_blade_asmr_data
        
        old_video_dict_list = loads(dumps(collection.find({channel : {'$exists':True}})))[0][channel]['videos']
        new_video_dict_list = []
        for video in old_video_dict_list:
        
            video_search_response = youtube.videos().list(
                id=video['video_id'],
                pageToken=None,
                part="snippet,contentDetails,statistics,topicDetails,id",
                maxResults=50


            ).execute()
            try:
                published_at = video_search_response['items'][0]['snippet']['publishedAt']
            except:
                published_at = 0
            try:
                video_id = video_search_response['items'][0]['id']
            except:
                video_id = ""
            try:
                title = video_search_response['items'][0]['snippet']['title']
            except:
                title = ""
            try:
                duration = video_search_response['items'][0]['contentDetails']['duration']
                duration = isodate.parse_duration(duration).total_seconds()
            except:
                duration = 0
            try:
                category_id = video_search_response['items'][0]['snippet']['categoryId']
            except:
                category_id = ""
            try:
                comment_count = video_search_response['items'][0]['statistics']['commentCount']
            except:
                comment_count = 0
            try:
                dislike_count = video_search_response['items'][0]['statistics']['dislikeCount']
            except:
                dislike_count = 0
            try:
                like_count = video_search_response['items'][0]['statistics']['likeCount']
            except:
                like_count = 0
            try:
                topic_ids = video_search_response['items'][0]['topicDetails']['topicIds']
            except:
                topic_ids = ""
            try:
                relevant_topic_ids = video_search_response['items'][0]['topicDetails']['relevantTopicIds']
            except:
                relevant_topic_ids = ""
            video_dict = {
                'video_id': video_id, 'title': title, 'published_at': published_at, 'duration': duration,
                'comment_count': comment_count, 'like_count': like_count, 'dislike_count': dislike_count, 
                'category_id': category_id, 'topic_ids': topicCipher(topic_ids), 
                'relevant_topic_ids': topicCipher(relevant_topic_ids)
            }            
            new_video_dict_list.append(video_dict)
        collection = mongoDb.social_blade_asmr_data
        target = channel + '.videos'
        collection.update_one({}, {'$set': {target: new_video_dict_list} }, upsert=True)

browser.quit()
driver.quit()