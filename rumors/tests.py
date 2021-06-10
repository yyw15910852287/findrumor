import pandas as pd
import requests
import re
import os
import json

main_headers = {'user-agent':'Chrome/10'}
main_url = "https://opendata.baidu.com/data/inner?tn=reserved_all_res_tn&dspName=iphone&from_sf=1&dsp=iphone&resource_id=28565&alr=1&query=%E8%82%BA%E7%82%8E&cb=jsonp_1590984651857_59263"
# r = requests.get(main_url, headers=hd)
# r.raise_for_status()
# r.encoding = r.apparent_encoding
# #print(r.request.headers)
# text = r.text
# json_search = re.search('jsonp_1590984651859_62095((.*?})\)',text)
# json_data = json.loads(json_search.group(0))
#
# print(json_data)

try:
    res = requests.get(main_url, headers=main_headers)
    content = str(res.text)

    json_search = re.search('jsonp_1590984651857_59263\((.*?})\)', content)
    json_data = json.loads(json_search.group(1))
    print(json_data)

except Exception as e:
    print(str(e))



# title = "云南昆明出现新确诊新冠肺炎病例？"
# df = pd.read_csv("data1.csv")
# titilelist = df['title'].tolist()
# contentlist = df['content'].tolist()
# for i in range(len(titilelist)):
#     if title == titilelist[i]:
#         content = contentlist[i]
#         break
# print("内容是：",content)