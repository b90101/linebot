
var dict = {
    "基隆市":["基隆","三坑","八堵","七堵","百福","海科館","八斗子","暖暖" ],
    "新北市":[ "五堵","汐止" ,"汐科" ,"板橋" ,"浮洲" ,"樹林" ,"南樹林","山佳" ,"鶯歌","福隆","貢寮","雙溪","牡丹" ,"三貂嶺" ,"大華" ,"十分" ,"望古" , "領腳" ,"平溪" , "菁桐" ,"猴硐" ,"瑞芳" ,"四腳亭" ],
    "臺北市":["南港" ,"松山" , "臺北" ,"萬華" ],
    "桃園市":["桃園" ,"內壢" ,"中壢" ,"埔心" ,"楊梅" ,"富岡" ,"新富" ],
    "新竹縣":["北湖","湖口","新豐","竹北","竹中","六家","上員","榮華","竹東" ,"橫山" ,"九讚頭" ,"合興" ,"富貴" ,"內灣"],
    "新竹市":["北新竹" ,"千甲" ,"新莊" ,"新竹" ,"三姓橋","香山"],
    "苗栗縣":["崎頂","竹南","談文","大山","後龍" ,"龍港" ,"白沙屯","新埔","通霄","苑裡","造橋","豐富","苗栗","南勢","銅鑼","三義"],
    "臺中市":["日南" ,"大甲" ,"臺中港" ,"清水" ,"沙鹿" ,"龍井" ,"大肚" ,"追分" ,"泰安" ,"后里" ,"豐原" , "栗林" ,"潭子" ,"頭家曆" ,"松竹" , "太原" ,"精武" ,"臺中" ,"五權" ,"大慶" ,"烏日" ,"新烏日" ,"成功"],
    "彰化縣":["彰化" ,"花壇" ,"大村" ,"員林" ,"永靖" ,"社頭" ,"田中" ,"二水" ,"源泉" ],
    "南投縣":["濁水" ,"龍泉" ,"集集" ,"水里" ,"車程" ],
    "雲林縣":["林內" ,"石榴" ,"斗六" ,"斗南" ,"石龜" ],
    "嘉義縣":["大林" ,"民雄" ,"水上" , "南靖"],
    "嘉義市":["嘉北" ,"嘉義"],
    "臺南市":["後壁" ,"新營" , "柳營" ,"林鳳營" ,"隆田" ,"拔林" ,"善化" ,"南科" ,"新市" ,"永康" ,"大橋" ,"臺南" ,"保安" ,"仁慈" ,"中洲" ,"長榮大學" ,"沙崙"],
    "高雄市":["大湖" ,"路竹" ,"岡山" ,"橋頭" ,"楠梓" ,"新左營" ,"左營" ,"內維" ,"美術館" ,"鼓山" ,"三塊厝" ,"高雄" ,"民族" , "科工館" , "正義" ,"鳳山"  ,"後庄" ,"九曲堂" ],
    "屏東縣":[ "六塊厝" ,"屏東" ,"歸來" ,"麟洛" , "西勢" ,"竹田" ,"潮州" ,"崁頂" ,"南州" ,"鎮安" ,"林邊" ,"佳冬" ,"東海" ,"枋寮" ,"加祿" ,"內獅" ,"枋山" ,"潮州基地" ],
    "臺東縣":["大武" ,"瀧溪" ,"金崙" ,"太麻里" ,"知本" ,"康樂" ,"臺東" ,"山里" ,"鹿野" ,"瑞源" ,"瑞和" ,"關山" ,"海端" ,"池上"],
    "花蓮縣":["富里" ,"東竹" ,"東里" ,"玉里" ,"三民" ,"瑞穗" ,"富源" ,"大富" ,"光復" , "萬隆" ,"鳳林" ,"南平" ,"林榮新光" ,"豐田" ,"壽豐" ,"平和" ,"志學" ,"吉安" ,"花蓮" ,"北埔" ,"景美" ,"新城" ,"崇德" , "和仁" ,"和平" ],
    "宜蘭縣":["漢本" ,"武塔" ,"南澳" ,"東澳" , "永樂" ,"蘇澳" ,"蘇澳新" ,"新馬" ,"冬山" ,"羅東" ,"中里" ,"二結" ,"宜蘭" ,"四城" ,"礁溪" ,"頂埔" ,"頭城" ,"外澳" ,"龜山" ,"大溪" ,"大里" ,"石城"],
    "city":["基隆市","新北市","臺北市","桃園市","新竹縣","苗栗縣","臺中市","彰化縣","南投縣","雲林縣","嘉義縣","嘉義市","臺南市","高雄市","屏東縣","臺東縣","花蓮縣","宜蘭縣"]
};

var instation = document.getElementById('instation');
var outstation = document.getElementById('outstation');


function citylist(Station) { //控制第一層 (城市)
    var stationType = Station.id;
    console.log(stationType);
    var Stationlist = document.getElementById('Stationlist');
    Stationlist.innerHTML = "";
    for(var i=0; i<dict["city"].length; i++) {
      Stationlist.innerHTML = Stationlist.innerHTML + '<button onclick="station(this,' + stationType + ')" class="button">'+dict["city"][i]+'</button>';
    }

}

function station(buttontype, stationType){ //車站function
    var buttonText = buttontype.innerText; //獲取按鈕的文字 要知道是哪的按鈕按下的
    var Stationlist = document.getElementById('Stationlist'); //獲取要更改列表的id
    var len = dict[buttonText].length;
    Stationlist.innerHTML = ""; //將列表先清空
    for(var i=0 ; i <len ;i++){ //利用for 迴圈 將資料印上去
      Stationlist.innerHTML = Stationlist.innerHTML + '<button  onclick="trainstation(this,' + stationType.id + ')" class="button">'+ dict[buttonText][i] +'</button>';
    }

}

function trainstation(btntype,stationType){ //更改出發抵達車站的文字
    if(stationType.id == "instation"){
        stationType.value = "出發車站:\n" + btntype.textContent;
    }
    else{
        stationType.value = "抵達車站:\n" + btntype.textContent;
    }
}

var mydata = "";

  liff.init({ liffId: '1661443965-5VqJ4EVL' }, () => {
    if (liff.isLoggedIn()) {
      getLineUserId();
    } else {
      liff.login();
    }
  });

  // 獲取使用者 Line User ID
  function getLineUserId() {
    liff.getProfile().then(function(profile) {
      var userId = profile.userId;
      mydata = userId;
      console.log('Line User ID:', userId);
      // 在這裡您可以處理使用者的 Line User ID
      alert('Line User ID: ' + userId);
    }).catch(function(error) {
      console.error('Error getting Line user profile:', error);
      alert('Error getting Line user profile.');
    });
  }


function postdata() {
    var input = instation.value;
    var output = outstation.value;
    var Userid = mydata;


    var url = "/post";
    var data = {
      's': input,
      'e': output,
      'id': Userid
    };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log("123");
      } else {
        console.error("錯誤：" + response.status);
      }
    })
    .catch(error => {
      console.error("錯誤：" + error);
    });
    window.close() ;
  }


