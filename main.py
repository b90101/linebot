import uvicorn
import json
import api
import dict

from fastapi import FastAPI, Request

# 載入 LINE Message API 相關函式庫
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

access_token = 'NVPQZO5r3Oprj1GqXI2LZw39cDZiHoq0njvQGGH3C8pLAIjowx+zAZZPqmSMdCkErKjvnOit3uY6rFWEZReWyytKlP22lrsg8Im+09PkMKYOVjxpskDh5yBNgWD4prKcH/UlREgiGWfEUsIVhIUeogdB04t89/1O/w1cDnyilFU='
secret = '3c766252148136a11d84d7dbc0a71ff5'
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="templates/static"), name="static")

@app.post("/")
async def fun(request:Request):
    body = await request.body()
    try:
        json_data = json.loads(body)                         # json 格式化訊息內容
        line_bot_api = LineBotApi(access_token)              # 確認 token 是否正確
        handler = WebhookHandler(secret)                     # 確認 secret 是否正確
        signature = request.headers['X-Line-Signature']      # 加入回傳的 headers
        handler.handle(body.decode(), signature)                 # 綁定訊息回傳的相關資訊
        tk = json_data['events'][0]['replyToken']                # 取得回傳訊息的 Token
        type = json_data['events'][0]['message']['type']         # 取得 LINe 收到的訊息類型
        if type=='text':
            msg = json_data['events'][0]['message']['text']      # 取得 LINE 收到的文字訊息
            s,e = msg.split()
            if s not in dict.data or e not in dict.data:
                reply = "輸入站名錯誤"
            else:
                arr = api.get_train(s,e)
                reply = f"{s} 到 {e} \n"
                for i in range(len(arr)):
                    reply = reply + arr[i] 
        else:
            reply = '你傳的不是文字呦～'
        print(json_data)
        line_bot_api.reply_message(tk,TextSendMessage(reply))# 回傳訊息
    except:    
        print("error")                                     # 如果發生錯誤，印出收到的內容
    return 'OK'                                              # 驗證 Webhook 使用，不能省略



@app.get("/postmsg")
def fun():
    line_bot_api = LineBotApi(access_token)
    userid = ""
    try:
        line_bot_api.push_message(userid, TextSendMessage(text='https://liff.line.me/1661443965-5VqJ4EVL'))
        return '訊息已發送'
    except:
        print("error")
        return "error"


@app.get("/web")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/post")
async def post(request: Request):
    body = await request.body()
    json_data = json.loads(body)
    s = json_data['s'][6:]
    e = json_data['e'][6:]
    id = json_data['id']
    print(s)
    print(e)
    if s not in dict.data or e not in dict.data:
                reply = "輸入站名錯誤"
    else:
                reply = f"{s} 到 {e} \n"
                arr = api.get_train(s,e)
                for i in range(len(arr)):
                    reply = reply + arr[i] 
    line_bot_api = LineBotApi(access_token)
    try:
        line_bot_api.push_message(id,TextSendMessage(reply))
        return '訊息已發送'
    except:
        print("error")
        return "error"


if __name__ == "__main__":
   uvicorn.run("main:app",host = "127.0.0.1",port=80,reload=True)
