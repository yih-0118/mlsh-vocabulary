var timeout; 
var warningTriggered = false; 


var mostUsedChaptersContainer = document.getElementById("mostUsedChapters");
var visitCountElement = document.getElementById('visitCountNumber');

function fetchDataAndUpdate() {
    
    if (warningTriggered) {
        return;
    }
    var parameter1 = { url: 'https://docs.google.com/spreadsheets/d/1sZKQONx4Y_J3ZbCZOphn70rHj4nNdZuYtjA51XLY34s/edit?resourcekey#gid=1080034406', };
    $.get('https://script.google.com/macros/s/AKfycbwPvAfTgy4OGHRyz62F0Ug8s0rnZ9HYFfEhhZ2avdYckTcvDScB7jd1S8J07fDmyD-V/exec', parameter1, function (data2) {
        updateVisitCount(data2);
    });
    var parameter = { url: 'https://docs.google.com/spreadsheets/d/1-A6xikqsLfYl4JOJWj5xS5LXBc8ib9qmHVo-MoO6pP4/edit?resourcekey#gid=1899178918', };
    $.get('https://script.google.com/macros/s/AKfycbwIpkjfKxANzyh89GC7KZoygqdj5YV6820YdpQz2sJN_GmPGVvrg2e6bb_t1sSWFH5aCA/exec', parameter, function (data) {
        updateMostUsedChapters(data);

    });
    // var parameter2 = { url: 'https://docs.google.com/spreadsheets/d/1-A6xikqsLfYl4JOJWj5xS5LXBc8ib9qmHVo-MoO6pP4/edit?resourcekey#gid=1899178918', };
    // $.get('https://script.google.com/macros/s/AKfycbx0AfA6bGSSFQzxQlTOGek6ZxnTSOVpd-akXP7FvXYXNS5OJlYtlWOCeRih0RmdpPvl/exec', parameter2, function (data3) {
    //     console.log(data3)
    //     createWeeklyVisitChart(data3);
    // });


    resetTimer();
    

}

// function fetchWeeklyVisitData() {
//     $.get('https://script.google.com/macros/s/AKfycbx0AfA6bGSSFQzxQlTOGek6ZxnTSOVpd-akXP7FvXYXNS5OJlYtlWOCeRih0RmdpPvl/exec', function(data3) {
//         createWeeklyVisitChart(data3);
//         console.log(data3)
//     });
// }

function createWeeklyVisitChart(data3) {
    var trace = {
        x: ['7天前', '6天前', '5天前', '4天前', '3天前', '2天前', '昨天'],
        y: data3,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'blue'},
        line: {color: 'blue'}
    };

    var layout = {
        title: '最近七日造訪次數',
        xaxis: {title: '日期'},
        yaxis: {title: '造訪次數'}
    };

    Plotly.newPlot('weeklyVisitChart', [trace], layout);
}
function updateMostUsedChapters(data) {
    mostUsedChaptersContainer.innerHTML = ''; 
    var currentNum = 1;
    data.forEach(function (chapterData) {
        var chapter = chapterData[0];
        var frequency = chapterData[1];
        if (chapter !== "") {
            var listItem = document.createElement("div");
            listItem.textContent = currentNum + ". " + chapter + " : " + frequency + " 次";
            mostUsedChaptersContainer.appendChild(listItem);
            currentNum = currentNum + 1;
        }
    });
}

function updateVisitCount(data) {
    if (data.length > 0) {
        visitCountElement.textContent = `${data[0]} 次`;
    }
}

// function startTimer() {
//     window.addEventListener('mousemove', resetTimer);
//     window.addEventListener('keydown', resetTimer);
//     window.addEventListener('click', resetTimer);
//     window.addEventListener('scroll', resetTimer);
    
//     window.addEventListener('touchstart', resetTimer);
//     window.addEventListener('touchmove', resetTimer);
//     window.addEventListener('touchend', resetTimer);

//     timeout = setTimeout(function () {
//         warningTriggered = true;
//         alert(`你已經發呆超過30秒`);
//         alert(`浪費我流量！`);
//         alert(`接招吧！`);
//         window.location.href = "https://youtu.be/dQw4w9WgXcQ?feature=shared"; 
//         resetTimer();
//     }, 300000);
// }

function resetTimer() {
    
    clearTimeout(timeout);
    warningTriggered = false;
    startTimer();
}


fetchDataAndUpdate();
