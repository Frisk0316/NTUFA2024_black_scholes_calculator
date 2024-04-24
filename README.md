# NTUFA2024_black_scholes_calculator 期中作業

### 環境與使用程式

* 環境：Ubuntu 22.04, Docker 24.0.5
* 前端：react 18.2.0
* 後端：Python 3.10.9

### 如何執行專案

(a) 使用 Docker 開啟（需要 root）
1. 進入目錄並 build 專案
   
```
sudo docker-compose build
```

2. 執行專案
   
```
sudo docker-compose up
```
 
(b) 分別執行程式
1. 開啟前端

```
cd frontend

// 若第一次開啟可能需要進行安裝
npm install

// 開啟前端
npm start
```

2. 開啟後端

```
# 第一次開啟可能需要安裝所需軟體
pip3 install -r requirements.txt

cd backend 

# 開啟後端程式
$ python3 main.py
```

### 執行結果(以影片展示)
https://github.com/Frisk0316/NTUFA2024_black_scholes_calculator/assets/79501315/5e210db6-5400-42fb-8493-3a52f468f945

