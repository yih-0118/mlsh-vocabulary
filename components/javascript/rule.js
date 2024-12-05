$(function () {
    const rateSlider = $('#rate-slider');
    const pitchSlider = $('#pitch-slider');
    const rateValue = $('#rate-value');
    const pitchValue = $('#pitch-value');

    // 更新數值並保留一位小數
    function updateRateValue(value) {
        rateValue.text(value.toFixed(1)); // 保留一位小數
    }

    function updatePitchValue(value) {
        pitchValue.text(value.toFixed(1)); // 保留一位小數
    }

    // 初始數值
    updateRateValue(parseFloat(rateSlider.val()));
    updatePitchValue(parseFloat(pitchSlider.val()));

    // 監聽滑桿變化事件
    rateSlider.on('input', function () {
        state.rate = parseFloat(this.value);
        updateRateValue(state.rate); // 更新語速數值元素的內容
    });

    pitchSlider.on('input', function () {
        state.pitch = parseFloat(this.value);
        updatePitchValue(state.pitch); // 更新音高數值元素的內容
    });
});

const state = {
    words: [],
    currentIndex: 0,
    isRandom: false,
    showChinese: false,
    minIndex: 0,
    maxIndex: 0,
    isAlphabeticalOrder: false,
    rate: 1, // 新增語速屬性
    pitch: 1 // 新增音高屬性
};

document.addEventListener('DOMContentLoaded', function () {
    var fullPath = decodeURI(window.location.pathname);
    var fileName = fullPath.split('/').pop();
    var dotIndex = fileName.lastIndexOf('.');
    if (dotIndex !== -1) {
        fileName = fileName.substring(0, dotIndex);
    }
    document.getElementById('pageTitle').innerText = fileName;
});

const utils = {
    getRandomIndex: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    saveToLocalStorage: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    loadFromLocalStorage: (key, defaultValue) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    }
};
class DataLoader {
    static loadData(jsonUrl, callback) {
        $.ajax({
            type: "GET",
            url: jsonUrl, // 使用選定的 JSON 文件路徑
            dataType: "json",
            success: (response) => {
                state.words = response.vocabularies;
                state.originalWords = [...state.words];
                state.maxIndex = state.words.length - 1;
                callback();
            }
        });
    }
}

class VocabularyRenderer {
    constructor(questionEl, hintEl, listEl) {
        this.questionEl = $(questionEl);
        this.hintEl = $(hintEl);
        this.listEl = $(listEl).find('tbody');
        this.readBtn = $('#readBtn');
        this.searchInput = $('#search-input');
        this.initSearchEventListener();
        // this.listContainer = listEl.parent(); // 獲取單字區容器元素
        // this.toggleListBtn = $('#toggle-list-btn');
        // this.initToggleListEventListener();
    }
    // initToggleListEventListener() {
    //     this.toggleListBtn.click(() => {
    //         this.listContainer.toggle();
    //         const isVisible = this.listContainer.is(':visible');
    //         this.toggleListBtn.text(isVisible ? '折疊單字區' : '展開單字區');
    //     });
    // }
    initSearchEventListener() {
        this.searchInput.on('input', () => {
            const searchValue = this.searchInput.val().toLowerCase();
            this.filterWords(searchValue);
        });
    }

    filterWords(searchValue) {
        const filteredWords = state.originalWords.filter(word => {
            const vocabulary = word.vocabulary.toLowerCase();
            const partOfSpeech = word.partOfSpeech.toLowerCase();
            const chinese = word.chinese.toLowerCase();
            return vocabulary.includes(searchValue) ||
                partOfSpeech.includes(searchValue) ||
                chinese.includes(searchValue);
        });

        state.words = filteredWords;
        this.renderList();
    }

    speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.lang === 'en-US');
        // 使用state中的語速和音高值
        utterance.rate = state.rate;
        utterance.pitch = state.pitch;
        speechSynthesis.speak(utterance);
    }

    getAudioUrl(word) {
        const encodedWord = encodeURIComponent(word);
        return `https://dict.youdao.com/dictvoice?type1&audio=${encodedWord}`;
    }

    playAudio(word) {
        const audioUrl = this.getAudioUrl(word);
        const audio = new Audio(audioUrl);
        audio.play();
    }

    renderQuestion() {
        const word = state.words[state.currentIndex];
        const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
        tl.fromTo(this.questionEl, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3 })
            .fromTo(this.hintEl.find('.type'), { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, '-=0.2')
            .fromTo(this.hintEl.find('.answer'), { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 }, '-=0.2');
        this.questionEl.html(word.vocabulary);
        this.hintEl.find('.type').html(word.partOfSpeech);
        this.hintEl.find('.answer').html(word.chinese);
        this.changeQuestionColor();
    }

    changeQuestionColor(color) {
        this.changeButtonColor(color);
    }

    changeButtonColor(color) {
        const buttons = $('.btn');
        buttons.css('background-color', color);
        buttons.css('outline-color', color);
    }

    renderList() {
        this.listEl.empty();
        state.words.forEach((word, index) => {
            const row = $('<tr></tr>').addClass('val').click(() => {
                state.currentIndex = index;
                this.renderQuestion();
            });
            row.append($('<td></td>').addClass('idx').text(index + 1));
            row.append($('<td></td>').text(word.vocabulary));
            row.append($('<td></td>').text(word.partOfSpeech));
            row.append($('<td></td>').addClass('chinese').text(word.chinese));
            row.append($('<td></td>').append($('<i class="fa-regular fa-star"></i>').click(() => addToFavourites(word.vocabulary))));
            this.listEl.append(row);
        });
        this.updateChineseDisplay();
    }

    updateChineseDisplay() {
        const chineseHeader = $('#chinese-header');
        if (state.showChinese) {
            chineseHeader.text('中文');
            chineseHeader.removeClass('hidden');
            chineseHeader.addClass('underline');
        } else {
            chineseHeader.addClass('hidden');
        }
        this.listEl.find('.chinese').toggle(state.showChinese);
    }
}

class VocabularyController {
    constructor(renderer) {
        this.renderer = renderer;
        this.initEventListeners();
        this.initStateFromLocalStorage();
        const selectedVocabularyUrl = localStorage.getItem('selectedVocabularyUrl');
        DataLoader.loadData(selectedVocabularyUrl, () => {
            this.renderer.renderQuestion();
            this.renderer.renderList();
        });
    }

    initEventListeners() {
        $('#answerBtn').click(() => this.toggleHint());
        $('#next').click(() => this.handleNext());
        $('#prev').click(() => this.handlePrev());
        $('#chinese-display').change(() => this.toggleChineseDisplay());
        $('input[name="mode"]').change(() => this.handleModeChange());
        $('#color-picker').change(() => this.handleColorChange());
        $('#alphabetical-order').change(() => this.handleAlphabeticalOrderChange());
        this.renderer.readBtn.click(() => this.handleRead());
    }

    handleAlphabeticalOrderChange() {
        state.isAlphabeticalOrder = $('#alphabetical-order').prop('checked');
        if (state.isAlphabeticalOrder) {
            state.words.sort((a, b) => a.vocabulary.localeCompare(b.vocabulary));
        } else {
            state.words = [...state.originalWords]; // 重置為原始順序
        }
        this.renderer.renderList();
        this.saveState();
    }

    initStateFromLocalStorage() {
        state.currentIndex = utils.loadFromLocalStorage('currentIndex', 0);
        state.isRandom = utils.loadFromLocalStorage('isRandom', false);
        state.showChinese = utils.loadFromLocalStorage('showChinese', false);
        state.minIndex = utils.loadFromLocalStorage('minIndex', 0);
        state.maxIndex = utils.loadFromLocalStorage('maxIndex', state.words.length - 1);
        $(`#mode-${state.isRandom ? 'random' : 'sequential'}`).prop('checked', true);
        $('#chinese-display').prop('checked', state.showChinese);
        state.isAlphabeticalOrder = utils.loadFromLocalStorage('isAlphabeticalOrder', false);
        $('#alphabetical-order').prop('checked', state.isAlphabeticalOrder);
    }

    toggleHint() {
        gsap.to(this.renderer.hintEl, { duration: 0.3, opacity: this.renderer.hintEl.css('display') === 'none' ? 1 : 0, ease: "power2.inOut" });
        this.renderer.hintEl.toggle();
    }

    handleNext() {
        if (state.isRandom) {
            state.currentIndex = utils.getRandomIndex(state.minIndex, state.maxIndex);
        } else {
            state.currentIndex = (state.currentIndex + 1) % state.words.length;
        }
    
        const wordElement = this.renderer.questionEl;
        const hintElement = this.renderer.hintEl;
    
        // 滑出動畫
        gsap.to([wordElement, hintElement], {
            x: '-100%', // 滑出方向
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                this.renderer.renderQuestion(); // 更新內容
                gsap.set([wordElement, hintElement], { x: '100%' }); // 重置為滑入位置
    
                // 滑入動畫
                gsap.to([wordElement, hintElement], {
                    x: '0%',
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    
        this.saveState();
    }
    
    handlePrev() {
        if (state.isRandom) {
            state.currentIndex = utils.getRandomIndex(state.minIndex, state.maxIndex);
        } else {
            state.currentIndex = (state.currentIndex - 1 + state.words.length) % state.words.length;
        }
    
        const wordElement = this.renderer.questionEl;
        const hintElement = this.renderer.hintEl;
    
        // 滑出動畫
        gsap.to([wordElement, hintElement], {
            x: '100%', // 滑出方向
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                this.renderer.renderQuestion(); // 更新內容
                gsap.set([wordElement, hintElement], { x: '-100%' }); // 重置為滑入位置
    
                // 滑入動畫
                gsap.to([wordElement, hintElement], {
                    x: '0%',
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    
        this.saveState();
    }
    

    toggleChineseDisplay() {
        state.showChinese = !state.showChinese;
        this.renderer.updateChineseDisplay();
        this.saveState();
    }

    handleModeChange() {
        state.isRandom = $('input[name="mode"]:checked').val() === 'random';
        this.saveState();
    }

    saveState() {
        utils.saveToLocalStorage('currentIndex', state.currentIndex);
        utils.saveToLocalStorage('isRandom', state.isRandom);
        utils.saveToLocalStorage('showChinese', state.showChinese);
        utils.saveToLocalStorage('minIndex', state.minIndex);
        utils.saveToLocalStorage('maxIndex', state.maxIndex);
        utils.saveToLocalStorage('isAlphabeticalOrder', state.isAlphabeticalOrder);
    }

    handleColorChange() {
        const newColor = $('#color-picker').val();
        this.renderer.changeQuestionColor(newColor);
    }
    handleRead() {
        const currentWord = state.words[state.currentIndex].vocabulary;
        this.renderer.playAudio(currentWord);
    }
}

// class MenuController {
//     constructor(menuBtn, panel) {
//         this.menuBtn = $(menuBtn);
//         this.panel = $(panel);
//         this.panel.hide();
//         this.initEventListener();
//     }

//     initEventListener() {
//         this.menuBtn.click(() => this.toggleMenu());
//     }

//     toggleMenu() {
//         if (this.panel.is(':hidden')) {
//             this.showMenu();
//         } else {
//             this.hideMenu();
//         }
//     }

//     showMenu() {
//         this.panel.show();
//         gsap.fromTo(this.panel, { y: '-100%' }, { y: 0, ease: 'Power', duration: 0.7 });
//     }

//     hideMenu() {
//         gsap.to(this.panel, {
//             y: '-100%',
//             ease: 'Power',
//             duration: 0.5,
//             onComplete: () => {
//                 this.panel.hide();
//                 gsap.set(this.panel, { y: 0 });
//             }
//         });
//     }
// }
class MenuController {
    constructor(menuBtn, panel) {
        this.menuBtn = $(menuBtn);
        this.panel = $(panel);
        this.panel.hide();
        this.initEventListener();
    }

    initEventListener() {
        this.menuBtn.click(() => this.toggleMenu());
    }

    toggleMenu() {
        if (this.panel.is(':hidden')) {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    }

    showMenu() {
        this.panel.show();
        gsap.fromTo(this.panel, { x: '100%' }, { x: 0, ease: 'Power', duration: 0.6 });
    }

    hideMenu() {
        gsap.to(this.panel, {
            x: '100%',
            ease: 'Power',
            duration: 0.5,
            onComplete: () => {
                this.panel.hide();
                gsap.set(this.panel, { x: 0 });
            }
        });
    }
}
// function animateCardSwitch(direction) {
//     const wordElement = $('#question');
//     const hintElement = $('#hint');

//     const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

//     if (direction === 'next') {
//         tl.to(wordElement, { x: '-100%', opacity: 0, duration: 0.3 })
//           .to(hintElement, { x: '-100%', opacity: 0, duration: 0.3 }, '-=0.3')
//           .set(wordElement, { x: '100%' })
//           .set(hintElement, { x: '100%' })
//           .call(() => controller.handleNext())
//           .to(wordElement, { x: '0%', opacity: 1, duration: 0.3 })
//           .to(hintElement, { x: '0%', opacity: 1, duration: 0.3 }, '-=0.3');
//     } else {
//         tl.to(wordElement, { x: '100%', opacity: 0, duration: 0.3 })
//           .to(hintElement, { x: '100%', opacity: 0, duration: 0.3 }, '-=0.3')
//           .set(wordElement, { x: '-100%' })
//           .set(hintElement, { x: '-100%' })
//           .call(() => controller.handlePrev())
//           .to(wordElement, { x: '0%', opacity: 1, duration: 0.3 })
//           .to(hintElement, { x: '0%', opacity: 1, duration: 0.3 }, '-=0.3');
//     }
// }

// $('#next').click(() => animateCardSwitch('next'));
// $('#prev').click(() => animateCardSwitch('prev'));


document.getElementById("house").addEventListener("click", function () {
    window.location.href = "/index.html";
});

const renderer = new VocabularyRenderer('#question', '#hint', '.list');
const controller = new VocabularyController(renderer);
const menuController = new MenuController('#menu', '.setting');
// 將單字表轉換成CSV格式
function convertToCSV() {
    let csvContent = "\ufeff"; // 添加 UTF-8 BOM
    var table = document.querySelector('.list');
    var rows = table.querySelectorAll('tr');
    var csv = [];

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');

        for (var j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }

        csv.push(row.join(','));
    }

    return csv.join('\n');
    return csvContent;

}

// 下載CSV檔案
function downloadCSV() {
    var csv = convertToCSV();
    var blob = new Blob([csv], { type: 'text/csv' });
    var link = document.createElement('a');

    // 獲取GMT+8時區當前時間
    var tzOffset = 8 * 60 * 60 * 1000; // 時區偏移量(8小時)
    var currentTime = new Date(Date.now() + tzOffset);
    var timestamp = currentTime.toISOString().replace(/[-:]/g, '').replace('T', '_').split('.')[0];

    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', '明倫單字卡_' + timestamp + '.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


// 在匯出按鈕上綁定點擊事件
document.getElementById('exportBtn').addEventListener('click', function () {
    downloadCSV();
});

let favouriteWords = [];

function addToFavourites(word) {
    const wordData = state.words.find(w => w.vocabulary === word);

    if (wordData) {
        if (!favouriteWords.some(w => w.vocabulary === word && w.partOfSpeech === partOfSpeech)) {
            favouriteWords.push(wordData);
            localStorage.setItem('favouriteWords', JSON.stringify(favouriteWords));
            console.log(`${word} 已添加到收藏列表!`);
            displayFavouriteWords();
        } else {
            console.log(`${word} 已在收藏列表中!`);
        }
    }
}

function displayFavouriteWords() {
    const favouriteWordsContainer = document.getElementById('favouriteWordsContainer');
    favouriteWordsContainer.innerHTML = '';

    favouriteWords.forEach((wordData, index) => {
        const row = document.createElement('div');
        row.classList.add('favourite-word-row');

        const indexElement = document.createElement('span');
        indexElement.textContent = index + 1 + '.';
        row.appendChild(indexElement);

        const vocabularyElement = document.createElement('span');
        vocabularyElement.textContent = wordData.vocabulary;
        row.appendChild(vocabularyElement);

        const partOfSpeechElement = document.createElement('span');
        partOfSpeechElement.textContent = wordData.partOfSpeech;
        row.appendChild(partOfSpeechElement);

        const chineseElement = document.createElement('span');
        chineseElement.textContent = wordData.chinese;
        row.appendChild(chineseElement);

        const removeButton = document.createElement('i');
        removeButton.classList.add('fa-solid', 'fa-trash');
        removeButton.addEventListener('click', () => {
            removeFavouriteWord(wordData.vocabulary);
        });
        row.appendChild(removeButton);

        favouriteWordsContainer.appendChild(row);

        // Animation effect
        row.classList.add('fade-in');
    });
}

function removeFavouriteWord(word) {
    favouriteWords = favouriteWords.filter(w => w.vocabulary !== word);
    localStorage.setItem('favouriteWords', JSON.stringify(favouriteWords));
    displayFavouriteWords();
}

window.onload = function () {
    const storedFavouriteWords = JSON.parse(localStorage.getItem('favouriteWords'));
    if (storedFavouriteWords) {
        favouriteWords = storedFavouriteWords;
    }
    displayFavouriteWords();
}

// Handle star icon toggle and animation
function toggleFavouriteWord(word) {
    const wordData = state.words.find(w => w.vocabulary === word);
    const starIcon = document.querySelector(`#star-${word}`);

    if (wordData) {
        if (!favouriteWords.some(w => w.vocabulary === word)) {
            favouriteWords.push(wordData);
            starIcon.classList.remove('fa-regular');
            starIcon.classList.add('fa-solid', 'favourite');
            localStorage.setItem('favouriteWords', JSON.stringify(favouriteWords));
            //console.log(`${word} 已添加到收藏列表!`);
        } else {
            favouriteWords = favouriteWords.filter(w => w.vocabulary !== word);
            starIcon.classList.remove('fa-solid', 'favourite');
            starIcon.classList.add('fa-regular');
            localStorage.setItem('favouriteWords', JSON.stringify(favouriteWords));
            //console.log(`${word} 已從收藏列表中移除!`);
        }
        displayFavouriteWords();
    }
}
