var tipuesearch = {"pages":[{"text":"2016Fall 修課成員網誌","tags":"misc","title":"About","url":"./pages/about/"},{"text":"齒輪各部位定義 利用漸開線原理, 以 Brython 繪製單(17t-11t-13t)正齒輪廓: 第1齒輪從順時鐘轉 90 度之後, 必須配合目前的標記線所作 地2齒要配合第一齒逆時針90度之後要在+上原本的一齒所以(-90 deg-math.pi/n11) 第3齒要配合第2齒+原本一齒(-90 deg-math.pi/n13)之後再配合第一齒+上半圈扣掉第一齒輪的1齒在乘上n11/n13(180 deg-math.pi/n11) n11/n13) window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=17, pa=20, color=\"black\" , rot): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2)/2 #r17 , r11 n17 = 17 n11 = 11 n13 = 13 canvas_size = canvas.height*0.5 r17 = canvas_size*0.8*n17/(n17+n11+n13) r11 = canvas_size*0.8*n11/(n17+n11+n13) r13 = canvas_size*0.8*n13/(n17+n11+n13) x17 = x - r17 - 2*r11 y17 = y x11 = x - r11 y11 = y x13 = x + r13 y13 = y # 齒數 n = 17 # 壓力角 pa = 20 rot = 90 #gear1 = Spur(ctx).Gear(x, y, r, n, pa, \"gray\" , rot) ctx.save() ctx.translate(x17,y17) ctx.rotate(90*deg) ctx.translate(-x17,-y17) gear17 = Spur(ctx).Gear(x17, y17, r17, n17, pa, \"gray\" , rot) ctx.restore() ctx.save() ctx.translate(x11,y11) ctx.rotate(-90*deg-math.pi/n11) ctx.translate(-x11,-y11) gear11 = Spur(ctx).Gear(x11, y11, r11, n11, pa, \"blue\" , rot) ctx.restore() ctx.save() ctx.translate(x13,y13) ctx.rotate(-90*deg-math.pi/n13+(180*deg-math.pi/n11)*n11/n13) ctx.translate(-x13,-y13) gear13 = Spur(ctx).Gear(x13, y13, r13, n13, pa, \"blue\" , rot) ctx.restore() div = doc[\"onegear_div\"] div <= str(canvas.width) + \"l\" + str(canvas.height)","tags":"作業","title":"十二周作業","url":"./shi-er-zhou-zuo-ye.html"},{"text":"brython window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc from browser import html import math container = doc['container'] degree = math.pi/180 def button1(event): a = input(\"give me a\") container <= str(math.cos(60*degree)+float(a)) doc[\"button1\"].bind(\"click\", button1) 按下取 a 值","tags":"HW","title":"第十一周作業-1","url":"./di-shi-yi-zhou-zuo-ye-1.html"},{"text":"加減乘除實作 加減乘除實作影片 本週利用程式撰寫加減乘除 以下 加法: def add (a,b): return a+b 減法: def add (a,b): return a-b 乘法: def add (a,b): return a*b 除法: def add (a,b): return a+b 再利用 import sys sys.path.append(\"./m1\") import add sum = add.add(5,2) print(sum) 去執行上面的計算 分類存成.py檔案 例如把+法存成add 執行檔第三行import就要import add sum = 也用 add.add 如果乘法我存名稱mul 就import mul sum = mul.mul window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../cdw10']}); } from browser import document as doc from browser import html import math import add container = doc['container'] degree = math.pi/180 ''' a = input(\"give me a\") ''' a = 1 b = 2 sum = add.add(a, b) container <= str(math.cos(60*degree)+float(sum)) #print(\"ok\") ''' # First of all, the import of some libraries from browser import document as doc from browser import html # All the elements will be inserted in the div with the \"container\" id container = doc['container'] # We create a new div element newdiv = html.DIV(id = \"new-div\") # Now we add some style newdiv.style = {\"padding\": \"5px\", \"backgroundColor\": \"#ADD8E6\"} # Now, lets add a table with a column with numbers and a # column with a word on each cell text = \"Brython is really cool\" textlist = text.split() table = html.TABLE() for i, word in enumerate(textlist): table <= html.TR(html.TD(i + 1) + html.TD(word)) # Now we add some style to the table table.style = {\"padding\": \"5px\", \"backgroundColor\": \"#aaaaaa\", \"width\": \"100%\"} # Now we add the table to the new div previously created newdiv <= table + html.BR() # a form? why not? form = html.FORM() input1 = html.INPUT(type=\"text\", name=\"firstname\", value=\"First name\") input2 = html.INPUT(type=\"text\", name=\"lastname\", value=\"Last name\") input3 = html.BUTTON(\"Button with no action!\") form <= input1 + html.BR() + input2 + html.BR() + input3 newdiv <= form + html.BR() # Finally, we will add something more 'HTML5istic', a canvas with # a color gradient in the newdiv previously created and below the form canvas = html.CANVAS(width = 300, height = 300) canvas.style = {\"width\": \"100%\"} ctx = canvas.getContext('2d') ctx.rect(0, 0, 300, 300) grd = ctx.createRadialGradient(150, 150, 10, 150, 150, 150) grd.addColorStop(0, '#8ED6FF') grd.addColorStop(1, '#004CB3') ctx.fillStyle = grd ctx.fill() newdiv <= canvas # And finally we append the newdiv element # to the parent, in this case the div with the \"container\" id container <= newdiv '''","tags":"作業","title":"第十一周作業","url":"./brython-programming.html"},{"text":"","tags":"作業","title":"第七周作業","url":"./di-qi-zhou-zuo-ye.html"},{"text":"1.利用onshape畫出四連桿以及八連桿 2.將畫好的零件利用v-rep做連桿動作模擬 拍出各連桿感安裝組立影片 1.利用onshape畫出四連桿以及八連桿 2.將畫好的零件利用v-rep做連桿動作模擬 利用onshape畫出四連桿 利用onshape畫出八連桿-1 利用onshape畫出八連桿零件全 利用onshape組立四連桿 利用onshape組立八連桿 四連桿轉入vrep 八連趕轉入vrep 心得:四連趕要組立的話不難，轉入vrep做動也不難，可是換到8連桿的時候，雖零件只是多了點，組裝也是容易上手，但是轉入vrep做動的時候加入轉軸，使用dummy的時候真的花了一番功夫","tags":"作業","title":"第六周作業","url":"./di-liu-zhou-zuo-ye.html"},{"text":"利用v-rep設定單連桿運動 v-rep設定單連桿運動影片 本週製作心得 利用v-rep設定單連桿運動 v-rep設定單連桿運動影片 心得:剛開始看老師東設定西設定的時候覺得很複雜，但自己回去看影片聽老是講解要設定軸，轉速時其實覺得並沒有當下的複雜。","tags":"作業","title":"第五周作業","url":"./di-wu-zhou-zuo-ye.html"},{"text":"Hyperworks 套件過程與心得 hyperworks下載影片 Hyperworks 套件過程與心得 為各班各組在 https://mde2a2.kmol.info 主機上建立 cdg5, 用來管理各組協同產品設計實習過程中的純文件檔案,建立各週wiki HYPERWORKS安裝心得 安裝此套件非常複雜，需要先辦帳號辦完還不能馬上下載，他會寄一組網址到你的信箱，要去信箱收件打開才能下載，而且他還必須下載一個HyperWorks Student Edition的 License這個沒下載的話會一直顯示出找不到 hyperworks下載","tags":"作業","title":"第四周作業","url":"./di-si-zhou-zuo-ye.html"},{"text":"完成 Solvespace 30-50-60 cm Hyperworks逐字翻譯 心得:這次翻譯真的花費了很大的功夫，英文底子本來就不好的我，聽他們講話非常模糊，第一廳根本想是在聽火星文，反覆聽了多次之後，再來的每一次步道1分鐘就要暫停一次，再重複聽找單字，查詢，聽到最後漸漸越來越上手，等到查完所有但自之後就都聽懂了，發現英文真的需要多聽多看，也明白老師是要對我們得英文加強的苦心 今日作業: 1. 請至課程網頁中 w3 Hyperworks 處瀏覽 10 個影片, 請每組選兩個影片, 設法寫出該影片的英文逐字稿, 目的是希望能夠最佳化行走機構的零件, 類似: https://www.youtube.com/watch?v=VsDCLw1ygu8 逐字翻譯: The hyperworks 14-5(by40223154) The other big initiative we've had this year's，we begun the unification all the hyperworks products into a common user experience began some years ago with the launch of the inspire product，but even when we develop that product we had all the products in mind，so as we've worked through the last few years we've been developing that same user experience now for sim lab the virtual wind tunnel hyper extrude and now finally we're taking on hyper mesh itself it's really quite simple to use now，we've gone to the ribbon structure that we use inside of inspire，we've made working with model much more direct through the graphics，we don't rely on panels at all to do most of your work we use simple guide bars and micro dialogue so that you cannot work with your graphics directly on screen and lots of graphical manipulation as well and it's not so much that it's an exotic new user interface quite the opposite it's really the kind of things you'd expect out of modern software simple cut copy paste right click menu so forth with really good quality graphics，has a fully configurable menu system so you can customize the ribbons to your own needs，you want to work in the old way we haven't taken anything away which is a really important point because this new user interface is built on top of the existing hypermesh core architecture all the old macros menu systems and automations，that people have developed over the years will work with no modifications in the future and will continue to support those as we go forward people are going to find a very light very unencumbered and very few mouse clicks get their jobs done we're really excited. 我們今年的另一個大舉措，我們開始統一所有hyperworks產品進入一個普通的用戶體驗開始幾年前與推出的靈感產品，但即使當我們開發的產品，我們都有 產品在心，所以我們已經在過去的幾年，一直為sim實驗室開發同樣的用戶體驗虛擬風洞超拉伸，現在我們採用hypermesh本身，使用起來非常簡單，走到了我們在靈感中使用的功能區結構，我們已經使模型通過圖形工作更直接不用依靠面板做你大部分工作，我們使用簡單的指南和對話，所以你不用直接在屏幕上工作的圖形和大量的圖形操作，它是一個異乎尋常的新用戶界面，是真正的東西，你會期望從現代軟件，簡單的剪切複製黏貼右鍵菜單等，真正好的質量圖形有一個完全可配置的菜單系統，所以你可以自定義帶到你自己的需要，你想以舊的方式工作，我們沒有採取任何東西，這是一個非常重要的一點，因為這個新的用戶界面是建立在現有的hypermesh核心架構所有的菜單系統和自動化，人們已經發展了多年將與沒有工作在未來的修改，並將繼續支持那些我們去前進的人會找到一個非常輕的非常沒有阻礙和非常少的鼠標獲得他們的工作，我們真的很興奮。","tags":"作業","title":"第三周作業","url":"./di-san-zhou-zuo-ye.html"},{"text":"228連假沒上課 心得:本週繪製雖然跟第一週差異不大，可是這次適用新軟體，on shape他不需要安裝，他是一個開放的網頁晚體，他考以直接在網路上作畫，不要小看她雖然只是網頁的不過功能卻不輸給solidworks ,creo這些軟體使用起來也淺顯易懂，真的是一個很棒的東西 請完成 Solvespace 30-50-60 cm 比例的四連桿組立, 並轉出 stl 檔案, 以 import 方式轉入 V-rep 個人影片: 2017-03-12四連趕 from 40221354 on Vimeo . 請利用 Onshape 完成上述相同尺寸之四連桿機構, 以 stl 轉出 (或其他格式) 後, 再轉入 V-rep 個人影片:","tags":"作業","title":"第二周作業","url":"./di-er-zhou-zuo-ye.html"},{"text":"四連桿繪製 四連桿繪製 from juu hong cheng on Vimeo . 40223154繪製 2017-03-12四連趕 from 40221354 on Vimeo . 四連桿繪製 from 40223154 on Vimeo .","tags":"作業","title":"第一周作業","url":"./di-yi-zhou-zuo-ye.html"}]};