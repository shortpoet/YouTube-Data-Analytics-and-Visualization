# YouTube-Data-Analytics-and-Visualization

## Google Cloud Platform 

### Steps to monitor API usage 

From what I can tell, most read requests are pretty cheap as far as quota goes, and it seems they just limit you and you don't have to pay from the SO answer, but you never know.  

* https://developers.google.com/youtube/v3/determine_quota_cost
*https://stackoverflow.com/questions/27225044/does-using-the-youtube-data-api-generate-any-cost

* Navigate to Google Cloud Platform home console.cloud.google.com
* From hamburger menu, click APIs and Services
* Above the list of APIs, check Hide Unused APIs 
* Select YouTube Data API v3
* Select View Metrics
* Methods are listed at the bottom

## Useful Links

* https://developers.google.com/youtube/v3/determine_quota_cost
* https://github.com/DataSnaek/Trending-YouTube-Scraper
* https://www.kaggle.com/datasnaek/youtube-new/version/114
* https://console.cloud.google.com/marketplace/details/google/youtube.googleapis.com
* https://www.shivarweb.com/4277/scrape-export-video-information-youtube/
* https://developers.google.com/apis-explorer/#p/youtube/v3/
* https://en.wikipedia.org/wiki/List_of_JavaScript_libraries
* https://github.com/rohitkhatri/youtube-python
* https://developers.google.com/youtube/v3/docs/videos
* https://developers.google.com/youtube/v3/docs/channels/list
* https://developers.google.com/youtube/v3/docs/videos/list
* https://developers.google.com/youtube/v3/docs/guideCategories/list
* https://developers.google.com/youtube/v3/docs/activities/list
* https://developers.google.com/youtube/v3/docs/search/list# 
    * (check link to "see topic IDs supported as of")
    * seems searching by topic might be more expensive on the quota costing 100 units but so far when I've used it it defaults to the cost of the resource parts (part:snippet, contentDetails, etc.)
* http://www.channelcrawler.com/

## Questions to ask the data:

* subscriber count versus upload frequency
* subscriber count versus video duration
* slice across genre/category
* connect to viewers through comments 
    * count frequency of mention of particular geographical keywords to try and infer a correlation