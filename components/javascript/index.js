function showSubcategories(category) {
    const subcategoriesSelect = document.getElementById('subcategories');
    subcategoriesSelect.innerHTML = ''; // Clear existing options
    if (category) {
        $('#subcategory-list').show();
        switch (category) {
            case '其他':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('段考特別篇', '../json/段考特別篇.json');
        }
        // Populate subcategories based on the selected category
        switch (category) {
            case 'ALL_PLUS_Mar':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('CNN News', '../json/ALL_PLUS_Mar_CNN_News.json');
                addSubcategory('Unit 1', '../json/ALL_PLUS_Mar_Unit_1.json');
                addSubcategory('Unit 2', '../json/ALL_PLUS_Mar_Unit_2.json');
                addSubcategory('Unit 3', '../json/ALL_PLUS_Mar_Unit_3.json');
                addSubcategory('Unit 4', '../json/ALL_PLUS_Mar_Unit_4.json');
                addSubcategory('Unit 5', '../json/ALL_PLUS_Mar_Unit_5.json');
                addSubcategory('Unit 6', '../json/ALL_PLUS_Mar_Unit_6.json');
                addSubcategory('Unit 7', '../json/ALL_PLUS_Mar_Unit_7.json');
                addSubcategory('Unit 9', '../json/ALL_PLUS_Mar_Unit_9.json');
                addSubcategory('Unit 10', '../json/ALL_PLUS_Mar_Unit_10.json');
                addSubcategory('Unit 11', '../json/ALL_PLUS_Mar_Unit_11.json');
                addSubcategory('Unit 12', '../json/ALL_PLUS_Mar_Unit_12.json');
                addSubcategory('Unit 13', '../json/ALL_PLUS_Mar_Unit_13.json');
                addSubcategory('Unit 14', '../json/ALL_PLUS_Mar_Unit_14.json');
                addSubcategory('Unit 15', '../json/ALL_PLUS_Mar_Unit_15.json');
                break;

            case 'ALL_PLUS_Apr':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('CNN News', '../json/ALL_PLUS_Apr_CNN_News.json');
                addSubcategory('Unit 1', '../json/ALL_PLUS_Apr_Unit_1.json');
                addSubcategory('Unit 2', '../json/ALL_PLUS_Apr_Unit_2.json');
                addSubcategory('Unit 3', '../json/ALL_PLUS_Apr_Unit_3.json');
                addSubcategory('Unit 4', '../json/ALL_PLUS_Apr_Unit_4.json');
                addSubcategory('Unit 5', '../json/ALL_PLUS_Apr_Unit_5.json');
                addSubcategory('Unit 6', '../json/ALL_PLUS_Apr_Unit_6.json');
                addSubcategory('Unit 8', '../json/ALL_PLUS_Apr_Unit_8.json');
                addSubcategory('Unit 9', '../json/ALL_PLUS_Apr_Unit_9.json');
                addSubcategory('Unit 10', '../json/ALL_PLUS_Apr_Unit_10.json');
                addSubcategory('Unit 12', '../json/ALL_PLUS_Apr_Unit_12.json');
                addSubcategory('Unit 13', '../json/ALL_PLUS_Apr_Unit_13.json');
                addSubcategory('Unit 14', '../json/ALL_PLUS_Apr_Unit_14.json');
                addSubcategory('Unit 15', '../json/ALL_PLUS_Apr_Unit_15.json');
                break;
            case 'ALL_PLUS_May':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Unit 1', '../json/ALL_PLUS_May_Unit_1.json');
                addSubcategory('Unit 2', '../json/ALL_PLUS_May_Unit_2.json');
                addSubcategory('Unit 3', '../json/ALL_PLUS_May_Unit_3.json');
                addSubcategory('Unit 4', '../json/ALL_PLUS_May_Unit_4.json');
                addSubcategory('Unit 5', '../json/ALL_PLUS_May_Unit_5.json');
                addSubcategory('Unit 6', '../json/ALL_PLUS_May_Unit_6.json');
                addSubcategory('Unit 7', '../json/ALL_PLUS_May_Unit_7.json');
                addSubcategory('Unit 8', '../json/ALL_PLUS_May_Unit_8.json');
                addSubcategory('Unit 10', '../json/ALL_PLUS_May_Unit_10.json');
                addSubcategory('Unit 11', '../json/ALL_PLUS_May_Unit_11.json');
                addSubcategory('Unit 12', '../json/ALL_PLUS_May_Unit_12.json');
                addSubcategory('Unit 13', '../json/ALL_PLUS_May_Unit_13.json');
                addSubcategory('Unit 14', '../json/ALL_PLUS_May_Unit_14.json');
                addSubcategory('Unit 15', '../json/ALL_PLUS_May_Unit_15.json');
                addSubcategory('Unit 16', '../json/ALL_PLUS_May_Unit_16.json');
                break;
            case 'ALL_PLUS_Jun':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('CNN News', '../json/ALL_PLUS_Jun_CNN_News.json');
                addSubcategory('Unit 1', '../json/ALL_PLUS_Jun_Unit_1.json');
                addSubcategory('Unit 2', '../json/ALL_PLUS_Jun_Unit_2.json');
                addSubcategory('Unit 3', '../json/ALL_PLUS_Jun_Unit_3.json');
                addSubcategory('Unit 4', '../json/ALL_PLUS_Jun_Unit_4.json');
                addSubcategory('Unit 5', '../json/ALL_PLUS_Jun_Unit_5.json');
                addSubcategory('Unit 6', '../json/ALL_PLUS_Jun_Unit_6.json');
                addSubcategory('Unit 7', '../json/ALL_PLUS_Jun_Unit_7.json');
                addSubcategory('Unit 9', '../json/ALL_PLUS_Jun_Unit_9.json');
                addSubcategory('Unit 10', '../json/ALL_PLUS_Jun_Unit_10.json');
                addSubcategory('Unit 11', '../json/ALL_PLUS_Jun_Unit_11.json');
                addSubcategory('Unit 12', '../json/ALL_PLUS_Jun_Unit_12.json');
                addSubcategory('Unit 13', '../json/ALL_PLUS_Jun_Unit_13.json');
                addSubcategory('Unit 14', '../json/ALL_PLUS_Jun_Unit_14.json');
                break;
            case 'Book1':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Lesson 1', '../json/B1 L1.json');
                addSubcategory('Lesson 2', '../json/B1 L2.json');
                addSubcategory('Lesson 3', '../json/B1 L3.json');
                addSubcategory('Lesson 4', '../json/B1 L4.json');
                addSubcategory('Lesson 5', '../json/B1 L5.json');
                addSubcategory('Lesson 6', '../json/B1 L6.json');
                addSubcategory('Lesson 7', '../json/B1 L7.json');
                addSubcategory('Lesson 8', '../json/B1 L8.json');
                addSubcategory('Lesson 9', '../json/B1 L9.json');
                addSubcategory('Review 1', '../json/B1 review 1.json');
                addSubcategory('Review 2', '../json/B1 review 2.json');
                addSubcategory('Review 3', '../json/B1 review 3.json');
                break;
            case 'Book2':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Lesson 1', '../json/B2 L1.json');
                addSubcategory('Lesson 2', '../json/B2 L2.json');
                addSubcategory('Lesson 3', '../json/B2 L3.json');
                addSubcategory('Lesson 4', '../json/B2 L4.json');
                addSubcategory('Lesson 5', '../json/B2 L5.json');
                addSubcategory('Lesson 6', '../json/B2 L6.json');
                addSubcategory('Lesson 7', '../json/B2 L7.json');
                addSubcategory('Lesson 8', '../json/B2 L8.json');
                addSubcategory('Lesson 9', '../json/B2 L9.json');
                addSubcategory('Review 1', '../json/B2 review 1.json');
                addSubcategory('Review 2', '../json/B2 review 2.json');
                addSubcategory('Review 3', '../json/B2 review 3.json');
                break;
            case 'Book3':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Lesson 1', '../json/B3 L1.json');
                addSubcategory('Lesson 2', '../json/B3 L2.json');
                addSubcategory('Lesson 3', '../json/B3 L3.json');
                addSubcategory('Lesson 4', '../json/B3 L4.json');
                addSubcategory('Lesson 5', '../json/B3 L5.json');
                addSubcategory('Lesson 6', '../json/B3 L6.json');
                addSubcategory('Lesson 7', '../json/B3 L7.json');
                addSubcategory('Lesson 8', '../json/B3 L8.json');
                addSubcategory('Lesson 9', '../json/B3 L9.json');
                addSubcategory('Review 1', '../json/B3 review 1.json');
                addSubcategory('Review 2', '../json/B3 review 2.json');
                addSubcategory('Review 3', '../json/B3 review 3.json');
                break;
            case 'Book4':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Lesson 1', '../json/B4 L1.json');
                addSubcategory('Lesson 2', '../json/B4 L2.json');
                addSubcategory('Lesson 3', '../json/B4 L3.json');
                addSubcategory('Lesson 4', '../json/B4 L4.json');
                addSubcategory('Lesson 5', '../json/B4 L5.json');
                addSubcategory('Lesson 6', '../json/B4 L6.json');
                addSubcategory('Lesson 7', '../json/B4 L7.json');
                addSubcategory('Lesson 8', '../json/B4 L8.json');
                addSubcategory('Lesson 9', '../json/B4 L9.json');
                addSubcategory('Review 1', '../json/B4 review 1.json');
                addSubcategory('Review 2', '../json/B4 review 2.json');
                addSubcategory('Review 3', '../json/B4 review 3.json');
                break;
            case 'Book5':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Lesson 1', '../json/B5 L1.json');
                addSubcategory('Lesson 2', '../json/B5 L2.json');
                addSubcategory('Lesson 3', '../json/B5 L3.json');
                addSubcategory('Lesson 4', '../json/B5 L4.json');
                addSubcategory('Lesson 5', '../json/B5 L5.json');
                addSubcategory('Lesson 6', '../json/B5 L6.json');
                break;
            case '單字書 Level 2':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Unit 1', '../json/vocabulary(L2 Unit1).json');
                addSubcategory('Unit 2', '../json/vocabulary(L2 Unit2).json');
                addSubcategory('Unit 3', '../json/vocabulary(L2 Unit3).json');
                addSubcategory('Unit 4', '../json/vocabulary(L2 Unit4).json');
                addSubcategory('Unit 5', '../json/vocabulary(L2 Unit5).json');
                addSubcategory('Unit 6', '../json/vocabulary(L2 Unit6).json');
                addSubcategory('Unit 7', '../json/vocabulary(L2 Unit7).json');
                addSubcategory('Unit 8', '../json/vocabulary(L2 Unit8).json');
                break;
            case '單字書 Level 3':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Unit 1', '../json/vocabulary(L3 Unit1).json');
                addSubcategory('Unit 2', '../json/vocabulary(L3 Unit2).json');
                addSubcategory('Unit 3', '../json/vocabulary(L3 Unit3).json');
                addSubcategory('Unit 4', '../json/vocabulary(L3 Unit4).json');
                addSubcategory('Unit 5', '../json/vocabulary(L3 Unit5).json');
                addSubcategory('Unit 6', '../json/vocabulary(L3 Unit6).json');
                addSubcategory('Unit 7', '../json/vocabulary(L3 Unit7).json');
                addSubcategory('Unit 8', '../json/vocabulary(L3 Unit8).json');
                addSubcategory('Unit 9', '../json/vocabulary(L3 Unit9).json');
                addSubcategory('Unit 10', '../json/vocabulary(L3 Unit10).json');
                addSubcategory('Unit 11', '../json/vocabulary(L3 Unit11).json');
                addSubcategory('Unit 12', '../json/vocabulary(L3 Unit12).json');
                addSubcategory('Unit 13', '../json/vocabulary(L3 Unit13).json');
                addSubcategory('Unit 14', '../json/vocabulary(L3 Unit14).json');
                addSubcategory('Unit 15', '../json/vocabulary(L3 Unit15).json');
                addSubcategory('Unit 16', '../json/vocabulary(L3 Unit16).json');
                addSubcategory('Unit 17', '../json/vocabulary(L3 Unit17).json');
                addSubcategory('Unit 18', '../json/vocabulary(L3 Unit18).json');
                addSubcategory('Unit 19', '../json/vocabulary(L3 Unit19).json');
                addSubcategory('Unit 20', '../json/vocabulary(L3 Unit20).json');
                addSubcategory('Unit 21', '../json/vocabulary(L3 Unit21).json');
                break;
            case '單字書 Level 4':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Unit 1', '../json/vocabulary(L4 Unit1).json');
                addSubcategory('Unit 2', '../json/vocabulary(L4 Unit2).json');
                addSubcategory('Unit 3', '../json/vocabulary(L4 Unit3).json');
                addSubcategory('Unit 4', '../json/vocabulary(L4 Unit4).json');
                addSubcategory('Unit 5', '../json/vocabulary(L4 Unit5).json');
                addSubcategory('Unit 6', '../json/vocabulary(L4 Unit6).json');
                addSubcategory('Unit 7', '../json/vocabulary(L4 Unit7).json');
                addSubcategory('Unit 8', '../json/vocabulary(L4 Unit8).json');
                addSubcategory('Unit 9', '../json/vocabulary(L4 Unit9).json');
                addSubcategory('Unit 10', '../json/vocabulary(L4 Unit10).json');
                addSubcategory('Unit 11', '../json/vocabulary(L4 Unit11).json');
                addSubcategory('Unit 12', '../json/vocabulary(L4 Unit12).json');
                addSubcategory('Unit 13', '../json/vocabulary(L4 Unit13).json');
                addSubcategory('Unit 14', '../json/vocabulary(L4 Unit14).json');
                addSubcategory('Unit 15', '../json/vocabulary(L4 Unit15).json');
                addSubcategory('Unit 16', '../json/vocabulary(L4 Unit16).json');
                addSubcategory('Unit 17', '../json/vocabulary(L4 Unit17).json');
                addSubcategory('Unit 18', '../json/vocabulary(L4 Unit18).json');
                addSubcategory('Unit 19', '../json/vocabulary(L4 Unit19).json');
                addSubcategory('Unit 20', '../json/vocabulary(L4 Unit20).json');
                addSubcategory('Unit 21', '../json/vocabulary(L4 Unit21).json');
                break;
            case '常春藤 Level 5':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('Unit 1', '../json/vocabulary(L5 Unit1).json');
                addSubcategory('Unit 2', '../json/vocabulary(L5 Unit2).json');
                addSubcategory('Unit 3', '../json/vocabulary(L5 Unit3).json');
                addSubcategory('Unit 4', '../json/vocabulary(L5 Unit4).json');
                addSubcategory('Unit 5', '../json/vocabulary(L5 Unit5).json');
                addSubcategory('Unit 6', '../json/vocabulary(L5 Unit6).json');
                addSubcategory('Unit 7', '../json/vocabulary(L5 Unit7).json');
                addSubcategory('Unit 8', '../json/vocabulary(L5 Unit8).json');
                addSubcategory('Unit 9', '../json/vocabulary(L5 Unit9).json');
                addSubcategory('Unit 10', '../json/vocabulary(L5 Unit10).json');
                addSubcategory('Unit 11', '../json/vocabulary(L5 Unit11).json');
                addSubcategory('Unit 12', '../json/vocabulary(L5 Unit12).json');
                addSubcategory('Unit 13', '../json/vocabulary(L5 Unit13).json');
                addSubcategory('Unit 14', '../json/vocabulary(L5 Unit14).json');
                addSubcategory('Unit 15', '../json/vocabulary(L5 Unit15).json');
                addSubcategory('Unit 16', '../json/vocabulary(L5 Unit16).json');
                addSubcategory('Unit 17', '../json/vocabulary(L5 Unit17).json');
                addSubcategory('Unit 18', '../json/vocabulary(L5 Unit18).json');
                addSubcategory('Unit 19', '../json/vocabulary(L5 Unit19).json');
                addSubcategory('Unit 20', '../json/vocabulary(L5 Unit20).json');
                addSubcategory('Unit 21', '../json/vocabulary(L5 Unit21).json');
                addSubcategory('Unit 22', '../json/vocabulary(L5 Unit22).json');
                addSubcategory('Unit 23', '../json/vocabulary(L5 Unit23).json');
                addSubcategory('Unit 24', '../json/vocabulary(L5 Unit24).json');
                addSubcategory('Unit 25', '../json/vocabulary(L5 Unit25).json');
                break;
            case 'link-test':
                addSubcategory('選擇篇目', '/404.html');
                addSubcategory('看英文選中文', './components/html/e2c.html');
                addSubcategory('看中文選英文', './components/html/c2e.html');
                addSubcategory('文意字彙', './components/html/test vocabulary.html');
                addSubcategory('地獄版文意字彙', './components/html/vocabulary.html');
                break;
        }
    } else {
        $('#subcategory-list').hide();
    }

    // Store the selected category in localStorage
    localStorage.setItem('selectedCategory', category);
}

function addSubcategory(name, jsonUrl) {
    const subcategoriesSelect = document.getElementById('subcategories');
    const option = document.createElement('option');
    option.value = jsonUrl;
    option.text = name;
    option.dataset.unitName = name; // 存儲單元名稱
    subcategoriesSelect.appendChild(option);
}


$(document).ready(function () {
    $('#vocabularyForm').submit(function (event) {
        event.preventDefault(); // 防止表單提交導致頁面重新加載
        const selectedUrl = $('#subcategories').val();
        if (selectedUrl) {
            if (selectedUrl.endsWith('.html')) {
                window.location.href = selectedUrl; // 直接導航到選擇的 HTML 文件
            } else {
                const jsonFileName = selectedUrl.split('/').pop(); // 獲取 JSON 文件名
                localStorage.setItem('selectedVocabularyUrl', selectedUrl); // 儲存選擇的 JSON 文件路徑
                localStorage.setItem('selectedSubcategory', selectedUrl); // 儲存選擇的子類別路徑
                window.location.href = "./components/html/card.html"; // 導航到 card.html 頁面
            }
        }
    });
});

// 從 localStorage 中取得儲存的選擇
const storedCategory = localStorage.getItem('selectedCategory');
const storedSubcategory = localStorage.getItem('selectedSubcategory');

// 函式：設置下拉選單中的選擇項
function setSelectedOption(selectElement, value) {
    const options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === value) {
            options[i].selected = true;
            break;
        }
    }
}

// 當頁面加載時，用儲存的選擇來填充下拉選單
window.onload = function () {
    const categoriesSelect = document.getElementById('categories');
    const subcategoriesSelect = document.getElementById('subcategories');

    if (storedCategory) {
        setSelectedOption(categoriesSelect, storedCategory);
        showSubcategories(storedCategory);
    }

    if (storedSubcategory) {
        setSelectedOption(subcategoriesSelect, storedSubcategory);
    }
};
const sidebar = document.getElementById('sidebar');
const menuIcon = document.getElementById('menuIcon');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuIcon.classList.toggle('active');
});

$('#vocabularyForm').submit(function (e) {
    //在這裡我們要先擋掉form默認事件
    e.preventDefault();

    // 獲取類別和篇目的值
    const category = $('#categories').val();
    const subcategoryUrl = $('#subcategories').val();
    const subcategory = subcategoryUrl.substring(subcategoryUrl.lastIndexOf('/') + 1, subcategoryUrl.lastIndexOf('.json'));

    if (category && subcategory && subcategory !== '/') {
        $.ajax({
            // url為Google Form按下submit的action
            url: "https://docs.google.com/forms/d/e/1FAIpQLSea6i5d506MbZFJF25eWjA0AIgEmM4JuzxQb3HcKrCk_px_jQ/formResponse",
            crossDomain: true,//解決跨網域CORS的問題
            data: {// entry.xxxxx 這些需要填寫您表單裡面的值，與其相互對應
                "entry.490026391": category,
                "entry.277839773": subcategory,
            },
            type: "POST", //因為是要進行insert的動作，故事用POST
            dataType: "JSON",
            complete: function () {
                //完成後把這些欄位清空
                $('#categories').val('');
                $('#subcategories').val('');
                //最後跳轉到感謝的頁面
            }
        });
    }
});
window.onload = function () {
    $.ajax({
        url: "https://ipapi.co/json/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            const city = data.city;
            const region = data.region;
            const country = data.country_name;
            const location = `${city}, ${region}, ${country}`;


            $.ajax({
                url: "https://docs.google.com/forms/d/e/1FAIpQLSeCvxN309s_Rrm4nGKaVdP6s9aDmIWoCF-mK49_5nHBATcRqQ/formResponse",
                crossDomain: true,
                data: {
                    "entry.271493781": '到',
                    "entry.819813079": location
                },
                type: "POST",
                dataType: "JSON"
            });
        },
    });
}

const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    const examDate = new Date('2025-1-17');
    const currentDate = new Date();

    const timeDifference = examDate - currentDate;
    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownElement.textContent = `距離學測：\n${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
    } else {
        countdownElement.textContent = '學測已结束\n';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);