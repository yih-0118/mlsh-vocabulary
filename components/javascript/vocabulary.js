var vm = new Vue({
    el: '#app',
    data: {
        vocabularies: [],
        currentWord: {},
        feedback: null,
        userAnswer: '',
        disableInput: false,
        chapters: {
            "B1 L1": "../json/B1 L1.json", "B1 L2": "../json/B1 L2.json", "B1 L3": "../json/B1 L3.json", "B1 L4": "../json/B1 L4.json", "B1 L5": "../json/B1 L5.json", "B1 L6": "../json/B1 L6.json", "B1 L7": "../json/B1 L7.json", "B1 L8": "../json/B1 L8.json", "B1 L9": "../json/B1 L9.json", "B1 R1": "../json/B1 review 1.json", "B1 R2": "../json/B1 review 2.json", "B1 R3": "../json/B1 review 3.json", "B2 L1": "../json/B2 L1.json", "B2 L2": "../json/B2 L2.json", "B2 L3": "../json/B2 L3.json", "B2 L4": "../json/B2 L4.json", "B2 L5": "../json/B2 L5.json", "B2 L6": "../json/B2 L6.json", "B2 L7": "../json/B2 L7.json", "B2 L8": "../json/B2 L8.json", "B2 L9": "../json/B2 L9.json", "B2 R1": "../json/B2 review 1.json", "B2 R2": "../json/B2 review 2.json", "B2 R3": "../json/B2 review 3.json", "B3 L1": "../json/B3 L1.json", "B3 L2": "../json/B3 L2.json", "B3 L3": "../json/B3 L3.json", "B3 L4": "../json/B3 L4.json", "B3 L5": "../json/B3 L5.json", "B3 L6": "../json/B3 L6.json", "B3 L7": "../json/B3 L7.json", "B3 L8": "../json/B3 L8.json", "B3 L9": "../json/B3 L9.json", "B3 R1": "../json/B3 review 1.json", "B3 R2": "../json/B3 review 2.json", "B3 R3": "../json/B3 review 3.json", "B4 L1": "../json/B4 L1.json", "B4 L2": "../json/B4 L2.json", "B4 L3": "../json/B4 L3.json", "B4 L4": "../json/B4 L4.json", "B4 L5": "../json/B4 L5.json", "B4 L6": "../json/B4 L6.json", "B4 L7": "../json/B4 L7.json", "B4 L8": "../json/B4 L8.json", "B4 L9": "../json/B4 L9.json", "B4 R1": "../json/B4 review 1.json", "B4 R2": "../json/B4 review 2.json", "B4 R3": "../json/B4 review 3.json", "Vocabulary (L2 Unit1)": "../json/vocabulary(L2 Unit1).json", "Vocabulary (L2 Unit2)": "../json/vocabulary(L2 Unit2).json", "Vocabulary (L2 Unit3)": "../json/vocabulary(L2 Unit3).json", "Vocabulary (L2 Unit4)": "../json/vocabulary(L2 Unit4).json", "Vocabulary (L2 Unit5)": "../json/vocabulary(L2 Unit5).json", "Vocabulary (L2 Unit6)": "../json/vocabulary(L2 Unit6).json", "Vocabulary (L2 Unit7)": "../json/vocabulary(L2 Unit7).json", "Vocabulary (L2 Unit8)": "../json/vocabulary(L2 Unit8).json", "Vocabulary (L3 Unit1)": "../json/vocabulary(L3 Unit1).json", "Vocabulary (L3 Unit2)": "../json/vocabulary(L3 Unit2).json", "Vocabulary (L3 Unit3)": "../json/vocabulary(L3 Unit3).json", "Vocabulary (L3 Unit4)": "../json/vocabulary(L3 Unit4).json", "Vocabulary (L3 Unit5)": "../json/vocabulary(L3 Unit5).json", "Vocabulary (L3 Unit6)": "../json/vocabulary(L3 Unit6).json", "Vocabulary (L3 Unit7)": "../json/vocabulary(L3 Unit7).json", "Vocabulary (L3 Unit8)": "../json/vocabulary(L3 Unit8).json", "Vocabulary (L3 Unit9)": "../json/vocabulary(L3 Unit9).json", "Vocabulary (L3 Unit10)": "../json/vocabulary(L3 Unit10).json", "Vocabulary (L3 Unit11)": "../json/vocabulary(L3 Unit11).json", "Vocabulary (L3 Unit12)": "../json/vocabulary(L3 Unit12).json", "Vocabulary (L3 Unit13)": "../json/vocabulary(L3 Unit13).json", "Vocabulary (L3 Unit14)": "../json/vocabulary(L3 Unit14).json", "Vocabulary (L3 Unit15)": "../json/vocabulary(L3 Unit15).json", "Vocabulary (L3 Unit16)": "../json/vocabulary(L3 Unit16).json", "Vocabulary (L3 Unit17)": "../json/vocabulary(L3 Unit17).json", "Vocabulary (L3 Unit18)": "../json/vocabulary(L3 Unit18).json", "Vocabulary (L3 Unit19)": "../json/vocabulary(L3 Unit19).json", "Vocabulary (L3 Unit20)": "../json/vocabulary(L3 Unit20).json", "Vocabulary (L3 Unit21)": "../json/vocabulary(L3 Unit21).json", "Vocabulary (L4 Unit1)": "../json/vocabulary(L4 Unit1).json", "Vocabulary (L4 Unit2)": "../json/vocabulary(L4 Unit2).json", "Vocabulary (L4 Unit3)": "../json/vocabulary(L4 Unit3).json", "Vocabulary (L4 Unit4)": "../json/vocabulary(L4 Unit4).json", "Vocabulary (L4 Unit5)": "../json/vocabulary(L4 Unit5).json", "Vocabulary (L4 Unit6)": "../json/vocabulary(L4 Unit6).json", "Vocabulary (L4 Unit7)": "../json/vocabulary(L4 Unit7).json", "Vocabulary (L4 Unit8)": "../json/vocabulary(L4 Unit8).json", "Vocabulary (L4 Unit9)": "../json/vocabulary(L4 Unit9).json", "Vocabulary (L4 Unit10)": "../json/vocabulary(L4 Unit10).json", "Vocabulary (L4 Unit11)": "../json/vocabulary(L4 Unit11).json", "Vocabulary (L4 Unit12)": "../json/vocabulary(L4 Unit12).json", "Vocabulary (L4 Unit13)": "../json/vocabulary(L4 Unit13).json", "Vocabulary (L4 Unit14)": "../json/vocabulary(L4 Unit14).json", "Vocabulary (L4 Unit15)": "../json/vocabulary(L4 Unit15).json", "Vocabulary (L4 Unit16)": "../json/vocabulary(L4 Unit16).json", "Vocabulary (L4 Unit17)": "../json/vocabulary(L4 Unit17).json", "Vocabulary (L4 Unit18)": "../json/vocabulary(L4 Unit18).json", "Vocabulary (L4 Unit19)": "../json/vocabulary(L4 Unit19).json", "Vocabulary (L4 Unit20)": "../json/vocabulary(L4 Unit20).json", "Vocabulary (L4 Unit21)": "../json/vocabulary(L4 Unit21).json", "ALL PLUS 1/15~1/31": "../json/開學考雜誌.json", "ALL PLUS Mar. CNN_News": "../json/ALL_PLUS_Mar_CNN_News.json", "ALL PLUS Mar. Unit 1": "../json/ALL_PLUS_Mar_Unit_1.json", "ALL PLUS Mar. Unit 2": "../json/ALL_PLUS_Mar_Unit_2.json", "ALL PLUS Mar. Unit 3": "../json/ALL_PLUS_Mar_Unit_3.json", "ALL PLUS Mar. Unit 4": "../json/ALL_PLUS_Mar_Unit_4.json", "ALL PLUS Mar. Unit 5": "../json/ALL_PLUS_Mar_Unit_5.json", "ALL PLUS Mar. Unit 6": "../json/ALL_PLUS_Mar_Unit_6.json", "ALL PLUS Mar. Unit 7": "../json/ALL_PLUS_Mar_Unit_7.json", "ALL PLUS Mar. Unit 9": "../json/ALL_PLUS_Mar_Unit_9.json", "ALL PLUS Mar. Unit 10": "../json/ALL_PLUS_Mar_Unit_10.json", "ALL PLUS Mar. Unit 11": "../json/ALL_PLUS_Mar_Unit_11.json", "ALL PLUS Mar. Unit 12": "../json/ALL_PLUS_Mar_Unit_12.json", "ALL PLUS Mar. Unit 13": "../json/ALL_PLUS_Mar_Unit_13.json", "ALL PLUS Mar. Unit 14": "../json/ALL_PLUS_Mar_Unit_14.json", "ALL PLUS Mar. Unit 15": "../json/ALL_PLUS_Mar_Unit_15.json", "ALL PLUS Apr. Unit 1": "../json/ALL_PLUS_Apr_Unit_1.json", "ALL PLUS Apr. Unit 2": "../json/ALL_PLUS_Apr_Unit_2.json", "ALL PLUS Apr. Unit 3": "../json/ALL_PLUS_Apr_Unit_3.json", "ALL PLUS Apr. Unit 4": "../json/ALL_PLUS_Apr_Unit_4.json", "ALL PLUS Apr. Unit 5": "../json/ALL_PLUS_Apr_Unit_5.json", "ALL PLUS Apr. Unit 6": "../json/ALL_PLUS_Apr_Unit_6.json", "ALL PLUS Apr. Unit 7": "../json/ALL_PLUS_Apr_Unit_7.json", "ALL PLUS Apr. Unit 8": "../json/ALL_PLUS_Apr_Unit_8.json", "ALL PLUS Apr. Unit 9": "../json/ALL_PLUS_Apr_Unit_9.json", "ALL PLUS Apr. Unit 10": "../json/ALL_PLUS_Apr_Unit_10.json", "ALL PLUS Apr. Unit 12": "../json/ALL_PLUS_Apr_Unit_12.json", "ALL PLUS Apr. Unit 13": "../json/ALL_PLUS_Apr_Unit_13.json", "ALL PLUS Apr. Unit 14": "../json/ALL_PLUS_Apr_Unit_14.json","ALL PLUS May Unit 1": "../json/ALL_PLUS_Apr_Unit_1.json", "ALL PLUS May Unit 2": "../json/ALL_PLUS_Apr_Unit_2.json", "ALL PLUS May Unit 3": "../json/ALL_PLUS_Apr_Unit_3.json", "ALL PLUS May Unit 4": "../json/ALL_PLUS_Apr_Unit_4.json", "ALL PLUS May Unit 5": "../json/ALL_PLUS_Apr_Unit_5.json", "ALL PLUS May Unit 6": "../json/ALL_PLUS_Apr_Unit_6.json", "ALL PLUS May Unit 7": "../json/ALL_PLUS_Apr_Unit_7.json", "ALL PLUS May Unit 8": "../json/ALL_PLUS_Apr_Unit_8.json", "ALL PLUS May Unit 10": "../json/ALL_PLUS_Apr_Unit_10.json", "ALL PLUS May Unit 12": "../json/ALL_PLUS_Apr_Unit_12.json", "ALL PLUS May Unit 13": "../json/ALL_PLUS_Apr_Unit_13.json", "ALL PLUS May Unit 14": "../json/ALL_PLUS_Apr_Unit_14.json", "ALL PLUS May Unit 15": "../json/ALL_PLUS_MayUnit_15.json", "ALL PLUS May Unit 16": "../json/ALL_PLUS_Apr_Unit_16.json"
        },
        selectedChapter: null,
        isEnglishToChineseMode: true,
        score: 0,
        currentQuestionIndex: 0,
        timeLeft: 0, // 一開始顯示的東西
        timer: null,
        isQuizCompleted: false,
        userAnswer: '', // 答案
        showModal: false, // 新增控制彈出小畫面的屬性
        showResultModal: false, // 新增控制測驗結果彈出小畫面的屬性
        wrongAnswers: [],
        isPaused: false,
    },
    mounted() {
        this.loadChapter('');
    },
    computed: {
        uniqueWrongAnswers() {
            // 使用 Set 去除重複的題目
            const uniqueSet = new Set(this.wrongAnswers.map(JSON.stringify));
            return Array.from(uniqueSet).map(JSON.parse);
        }
    },
    methods: {
        // 加載章節數據
        loadChapter(chapter) {
            fetch(chapter)
                .then(response => response.json())
                .then(data => {
                    // 幫每個單字新增 vocabularyWithHint 
                    const processedVocabularies = data.vocabularies.map(vocab => {
                        const { vocabulary } = vocab;
                        const hint = this.generateHint(vocabulary);
                        return {
                            ...vocab,
                            vocabularyWithHint: hint
                        };
                    });

                    this.vocabularies = processedVocabularies;
                    this.nextWord();
                    this.resetQuiz();
                    this.startTimer();
                })
                .catch(error => console.error('Error fetching data:', error));
        },
        generateHint(word) {
            const length = word.length;
            const isEndingWithEdOrIng = /ed$|ing$|es$|ly/.test(word);
        
            if (isEndingWithEdOrIng) {
                // 如果單詞以ed或ing結尾,則保留結尾部分
                const firstChar = word.charAt(0);
                const lastChars = word.slice(-3); // 取最後三個字符,包括ed或ing
                const middleChars = ' _ '.repeat(length - 4); // 中間字符用下劃線代替
                return `${firstChar}${middleChars}${lastChars}`;
            } else {
                // 如果單詞不以ed或ing結尾
                const firstChar = word.charAt(0);
                const lastChar = word.charAt(word.length - 1);
                const middleChars = ' _ '.repeat(length - 2); // 中間字符用下劃線代替
                return `${firstChar}${middleChars}${lastChar}`;
            }
        },
        // 選擇章節
        selectChapter(event) {
            this.selectedChapter = event.target.value;
            if (this.selectedChapter) {
                this.loadChapter(this.selectedChapter);
            }
        },
        // 顯示下一個單字
        nextWord() {
            if (this.currentQuestionIndex < this.vocabularies.length) {
                const randomIndex = Math.floor(Math.random() * this.vocabularies.length);
                this.currentWord = this.vocabularies[randomIndex];
                this.feedback = null; // 清空feedback
                this.currentQuestionIndex++;
                this.userAnswer = ''; // 清空輸入格
                this.startTimer();
            } else {
                this.isQuizCompleted = true;
                clearInterval(this.timer);
                this.showResultModal = true; // 顯示測驗結果彈出小畫面
            }
            this.showModal = false; // 關閉彈出小畫面
            this.disableInput = false; // 在這裡重置 disableInput
        },

        resetQuiz() {
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.timeLeft = this.vocabularies.length * 5;
            this.isQuizCompleted = false;
            this.wrongAnswers = [];
        },
        // 
        startTimer() {
            clearInterval(this.timer);
            this.timeLeft = 30;
            this.timer = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft === 0) {
                    clearInterval(this.timer);
                    this.feedback = 'Time is up. The correct answer is: ' + (this.isEnglishToChineseMode ? this.currentWord.chinese : this.currentWord.vocabulary);
                    this.nextWord(); // 跳到下一題
                }
            }, 1000);
        },
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
        shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        },
        submitAnswer() {
            const correctAnswer = this.currentWord.vocabulary;
            const userAnswer = this.userAnswer.trim().toLowerCase();
        
            if (userAnswer === correctAnswer.toLowerCase()) {
                this.feedback = '答對了!';
                this.score++;
            } else {
                this.wrongAnswers.push(this.currentWord);
                this.feedback = '答錯了，正確答案是：' + correctAnswer;
            }
            this.showModal = true;

            clearInterval(this.timer);
            this.userAnswer = '';
            this.disableInput = true; // 添加這一行,鎖定輸入框
        }
    }
});