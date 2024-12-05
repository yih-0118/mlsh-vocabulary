function fetchDataAndRender() {
    var parameter1 = { url: 'https://docs.google.com/spreadsheets/d/18P6lnaS0C9OvWJ_38w1Xhin85sMLsPjWxGuAdOc9VhI/edit?resourcekey#gid=599144449' };
    $.get('https://script.google.com/macros/s/AKfycbyPELtw1cd9H5UHLB3NPPAOZXG2S9X4HCe2hQqPsMZ2XX4tU0fqpZ9MN9tvXHRwqA70/exec', parameter1)
        .done(function (data) {
            var mostUsedChaptersContainer = $("#mostUsedChapters");
            mostUsedChaptersContainer.empty(); // 清除先前的資料
            var currentNum = 1;
            data.forEach(function (chapterData, index) {
                if (index >= 5 && index < 10) {
                    var chapter = chapterData[0];
                    var frequency = chapterData[1];
                    if (chapter !== "") {
                        var listItem = $("<div>").text(currentNum + ". " + chapter + " : " + frequency + " 次");
                        mostUsedChaptersContainer.append(listItem);
                        currentNum++;
                    }
                }
            });
        })
}

// 初始加載
fetchDataAndRender();

// 每五秒刷新一次
setInterval(fetchDataAndRender, 5000);
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