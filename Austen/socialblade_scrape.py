from bs4 import BeautifulSoup

import requests

url = "socialblade.com/youtube/top/category/games/mostsubscribed"

r  = requests.get("http://" +url)

data = r.text

soup = BeautifulSoup(data)


print("Start data print=====================================")


# for link in soup.find_all('style="float: left; width: 350px; line-height: 25px;"'):
#     print(link.get())

# Retrieve the parent divs for all articles
results = soup.find_all("span")

# Loop through results to retrieve article title, header, and timestamp of article
for result in results:
    
    title = result.find(style_="float: left; width: 50px; color:#888;")
    
    print(title)

