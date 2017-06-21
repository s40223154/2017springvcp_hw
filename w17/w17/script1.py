from browser import document
import math
# 準備繪圖畫布
'''
canvas = document["canvas1"]
ctx = canvas.getContext("2d")
'''

def axises(ctx):
    ctx.beginPath()
    # 設定線的寬度為 5 個單位
    ctx.lineWidth = 5
    # 將畫筆移動到 (0, 0) 座標點
    ctx.moveTo(0, 0)
    # 然後畫直線到 (100, 0) 座標點
    ctx.strokeStyle = "red"
    ctx.lineTo(100, 0)
    ctx.lineTo(90, 10)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    # 畫右上左下的斜線
    ctx.moveTo(0, 0)
    ctx.strokeStyle = "green"
    ctx.lineTo(0, 100)
    ctx.lineTo(10, 90)
    # 設定顏色為藍色, 也可以使用 "rgb(0, 0, 255)" 字串設定顏色值
    #ctx.strokeStyle = "blue"
    # 實際執行畫線
    ctx.stroke()
    ctx.closePath()
'''
axises(ctx)
# 以下可以利用 ctx 物件進行畫圖
# 先畫一條直線
ctx.beginPath()
# 設定線的寬度為 1 個單位
ctx.lineWidth = 1
# 將畫筆移動到 (100, 100) 座標點
ctx.moveTo(100, 100)
# 然後畫直線到 (150, 200) 座標點
ctx.lineTo(150, 200)
# 畫右上左下的斜線
ctx.moveTo(150, 100)
ctx.lineTo(100, 200)
# 設定顏色為藍色, 也可以使用 "rgb(0, 0, 255)" 字串設定顏色值
ctx.strokeStyle = "blue"
# 實際執行畫線
ctx.stroke()
ctx.closePath()
'''
