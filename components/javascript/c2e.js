const app = Vue.createApp({
    data() {
        return {
            vocabularies: [],
            currentWord: {},
            options: [],
            shuffledOptions: [],
            correctIndex: null,
            feedback: null,
            chapters: {
                "B1 L1": "../json/B1 L1.json", "B1 L2": "../json/B1 L2.json", "B1 L3": "../json/B1 L3.json", "B1 L4": "../json/B1 L4.json", "B1 L5": "../json/B1 L5.json", "B1 L6": "../json/B1 L6.json", "B1 L7": "../json/B1 L7.json", "B1 L8": "../json/B1 L8.json", "B1 L9": "../json/B1 L9.json", "B1 R1": "../json/B1 review 1.json", "B1 R2": "../json/B1 review 2.json", "B1 R3": "../json/B1 review 3.json", "B2 L1": "../json/B2 L1.json", "B2 L2": "../json/B2 L2.json", "B2 L3": "../json/B2 L3.json", "B2 L4": "../json/B2 L4.json", "B2 L5": "../json/B2 L5.json", "B2 L6": "../json/B2 L6.json", "B2 L7": "../json/B2 L7.json", "B2 L8": "../json/B2 L8.json", "B2 L9": "../json/B2 L9.json", "B2 R1": "../json/B2 review 1.json", "B2 R2": "../json/B2 review 2.json", "B2 R3": "../json/B2 review 3.json", "B3 L1": "../json/B3 L1.json", "B3 L2": "../json/B3 L2.json", "B3 L3": "../json/B3 L3.json", "B3 L4": "../json/B3 L4.json", "B3 L5": "../json/B3 L5.json", "B3 L6": "../json/B3 L6.json", "B3 L7": "../json/B3 L7.json", "B3 L8": "../json/B3 L8.json", "B3 L9": "../json/B3 L9.json", "B3 R1": "../json/B3 review 1.json", "B3 R2": "../json/B3 review 2.json", "B3 R3": "../json/B3 review 3.json", "B4 L1": "../json/B4 L1.json", "B4 L2": "../json/B4 L2.json", "B4 L3": "../json/B4 L3.json", "B4 L4": "../json/B4 L4.json", "B4 L5": "../json/B4 L5.json", "B4 L6": "../json/B4 L6.json", "B4 L7": "../json/B4 L7.json", "B4 L8": "../json/B4 L8.json", "B4 L9": "../json/B4 L9.json", "B4 R1": "../json/B4 review 1.json", "B4 R2": "../json/B4 review 2.json", "B4 R3": "../json/B4 review 3.json", "Vocabulary (L2 Unit1)": "../json/vocabulary(L2 Unit1).json", "Vocabulary (L2 Unit2)": "../json/vocabulary(L2 Unit2).json", "Vocabulary (L2 Unit3)": "../json/vocabulary(L2 Unit3).json", "Vocabulary (L2 Unit4)": "../json/vocabulary(L2 Unit4).json", "Vocabulary (L2 Unit5)": "../json/vocabulary(L2 Unit5).json", "Vocabulary (L2 Unit6)": "../json/vocabulary(L2 Unit6).json", "Vocabulary (L2 Unit7)": "../json/vocabulary(L2 Unit7).json", "Vocabulary (L2 Unit8)": "../json/vocabulary(L2 Unit8).json", "Vocabulary (L3 Unit1)": "../json/vocabulary(L3 Unit1).json", "Vocabulary (L3 Unit2)": "../json/vocabulary(L3 Unit2).json", "Vocabulary (L3 Unit3)": "../json/vocabulary(L3 Unit3).json", "Vocabulary (L3 Unit4)": "../json/vocabulary(L3 Unit4).json", "Vocabulary (L3 Unit5)": "../json/vocabulary(L3 Unit5).json", "Vocabulary (L3 Unit6)": "../json/vocabulary(L3 Unit6).json", "Vocabulary (L3 Unit7)": "../json/vocabulary(L3 Unit7).json", "Vocabulary (L3 Unit8)": "../json/vocabulary(L3 Unit8).json", "Vocabulary (L3 Unit9)": "../json/vocabulary(L3 Unit9).json", "Vocabulary (L3 Unit10)": "../json/vocabulary(L3 Unit10).json", "Vocabulary (L3 Unit11)": "../json/vocabulary(L3 Unit11).json", "Vocabulary (L3 Unit12)": "../json/vocabulary(L3 Unit12).json", "Vocabulary (L3 Unit13)": "../json/vocabulary(L3 Unit13).json", "Vocabulary (L3 Unit14)": "../json/vocabulary(L3 Unit14).json", "Vocabulary (L3 Unit15)": "../json/vocabulary(L3 Unit15).json", "Vocabulary (L3 Unit16)": "../json/vocabulary(L3 Unit16).json", "Vocabulary (L3 Unit17)": "../json/vocabulary(L3 Unit17).json", "Vocabulary (L3 Unit18)": "../json/vocabulary(L3 Unit18).json", "Vocabulary (L3 Unit19)": "../json/vocabulary(L3 Unit19).json", "Vocabulary (L3 Unit20)": "../json/vocabulary(L3 Unit20).json", "Vocabulary (L3 Unit21)": "../json/vocabulary(L3 Unit21).json", "Vocabulary (L4 Unit1)": "../json/vocabulary(L4 Unit1).json", "Vocabulary (L4 Unit2)": "../json/vocabulary(L4 Unit2).json", "Vocabulary (L4 Unit3)": "../json/vocabulary(L4 Unit3).json", "Vocabulary (L4 Unit4)": "../json/vocabulary(L4 Unit4).json", "Vocabulary (L4 Unit5)": "../json/vocabulary(L4 Unit5).json", "Vocabulary (L4 Unit6)": "../json/vocabulary(L4 Unit6).json", "Vocabulary (L4 Unit7)": "../json/vocabulary(L4 Unit7).json", "Vocabulary (L4 Unit8)": "../json/vocabulary(L4 Unit8).json", "Vocabulary (L4 Unit9)": "../json/vocabulary(L4 Unit9).json", "Vocabulary (L4 Unit10)": "../json/vocabulary(L4 Unit10).json", "Vocabulary (L4 Unit11)": "../json/vocabulary(L4 Unit11).json", "Vocabulary (L4 Unit12)": "../json/vocabulary(L4 Unit12).json", "Vocabulary (L4 Unit13)": "../json/vocabulary(L4 Unit13).json", "Vocabulary (L4 Unit14)": "../json/vocabulary(L4 Unit14).json", "Vocabulary (L4 Unit15)": "../json/vocabulary(L4 Unit15).json", "Vocabulary (L4 Unit16)": "../json/vocabulary(L4 Unit16).json", "Vocabulary (L4 Unit17)": "../json/vocabulary(L4 Unit17).json", "Vocabulary (L4 Unit18)": "../json/vocabulary(L4 Unit18).json", "Vocabulary (L4 Unit19)": "../json/vocabulary(L4 Unit19).json", "Vocabulary (L4 Unit20)": "../json/vocabulary(L4 Unit20).json", "Vocabulary (L4 Unit21)": "../json/vocabulary(L4 Unit21).json", "ALL PLUS 1/15~1/31": "../json/開學考雜誌.json", "ALL PLUS Mar. CNN_News": "../json/ALL_PLUS_Mar_CNN_News.json", "ALL PLUS Mar. Unit 1": "../json/ALL_PLUS_Mar_Unit_1.json", "ALL PLUS Mar. Unit 2": "../json/ALL_PLUS_Mar_Unit_2.json", "ALL PLUS Mar. Unit 3": "../json/ALL_PLUS_Mar_Unit_3.json", "ALL PLUS Mar. Unit 4": "../json/ALL_PLUS_Mar_Unit_4.json", "ALL PLUS Mar. Unit 5": "../json/ALL_PLUS_Mar_Unit_5.json", "ALL PLUS Mar. Unit 6": "../json/ALL_PLUS_Mar_Unit_6.json", "ALL PLUS Mar. Unit 7": "../json/ALL_PLUS_Mar_Unit_7.json", "ALL PLUS Mar. Unit 9": "../json/ALL_PLUS_Mar_Unit_9.json", "ALL PLUS Mar. Unit 10": "../json/ALL_PLUS_Mar_Unit_10.json", "ALL PLUS Mar. Unit 11": "../json/ALL_PLUS_Mar_Unit_11.json", "ALL PLUS Mar. Unit 12": "../json/ALL_PLUS_Mar_Unit_12.json", "ALL PLUS Mar. Unit 13": "../json/ALL_PLUS_Mar_Unit_13.json", "ALL PLUS Mar. Unit 14": "../json/ALL_PLUS_Mar_Unit_14.json", "ALL PLUS Mar. Unit 15": "../json/ALL_PLUS_Mar_Unit_15.json", "ALL PLUS Apr. Unit 1": "../json/ALL_PLUS_Apr_Unit_1.json", "ALL PLUS Apr. Unit 2": "../json/ALL_PLUS_Apr_Unit_2.json", "ALL PLUS Apr. Unit 3": "../json/ALL_PLUS_Apr_Unit_3.json", "ALL PLUS Apr. Unit 4": "../json/ALL_PLUS_Apr_Unit_4.json", "ALL PLUS Apr. Unit 5": "../json/ALL_PLUS_Apr_Unit_5.json", "ALL PLUS Apr. Unit 6": "../json/ALL_PLUS_Apr_Unit_6.json", "ALL PLUS Apr. Unit 7": "../json/ALL_PLUS_Apr_Unit_7.json", "ALL PLUS Apr. Unit 8": "../json/ALL_PLUS_Apr_Unit_8.json", "ALL PLUS Apr. Unit 9": "../json/ALL_PLUS_Apr_Unit_9.json", "ALL PLUS Apr. Unit 10": "../json/ALL_PLUS_Apr_Unit_10.json", "ALL PLUS Apr. Unit 12": "../json/ALL_PLUS_Apr_Unit_12.json", "ALL PLUS Apr. Unit 13": "../json/ALL_PLUS_Apr_Unit_13.json", "ALL PLUS Apr. Unit 14": "../json/ALL_PLUS_Apr_Unit_14.json",
            },
            selectedChapter: null,
            isEnglishToChineseMode: false,
            score: 0,
            currentQuestionIndex: 0,
            timeLeft: 0, // 60 seconds
            timer: null,
            isQuizCompleted: false,
            showModal: false, // 新增控制彈出小畫面的屬性
            showResultModal: false, // 新增控制測驗結果彈出小畫面的屬性
            wrongAnswers: [],
        };
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
        loadChapter(chapter) {
            fetch(chapter)
                .then(response => response.json())
                .then(data => {
                    this.vocabularies = data.vocabularies;
                    this.nextWord();
                    this.resetQuiz();
                    this.startTimer();
                })
                .catch(error => console.error('Error fetching data:', error));
        },
        selectChapter(event) {
            this.selectedChapter = event.target.value;
            if (this.selectedChapter) {
                this.loadChapter(this.selectedChapter);
            }
        },
        nextWord() {
            if (this.currentQuestionIndex < this.vocabularies.length) {
                const randomIndex = Math.floor(Math.random() * this.vocabularies.length);
                this.currentWord = this.vocabularies[randomIndex];
                this.generateOptions();
                this.feedback = null;
                this.currentQuestionIndex++;

                // 重新啟用所有選項
                const options = document.querySelectorAll('.option');
                options.forEach(option => {
                    option.style.pointerEvents = 'auto';
                });

                this.startTimer();

            } else {
                this.isQuizCompleted = true;
                clearInterval(this.timer);
                this.showResultModal = true; // 顯示測驗結果彈出小畫面
            }
            this.showModal = false; // 關閉彈出小畫面
        },
        generateOptions() {
            this.options = [];
            this.correctIndex = Math.floor(Math.random() * 4);
            const optionsSet = new Set();

            for (let i = 0; i < 4; i++) {
                let option;
                if (i === this.correctIndex) {
                    option = this.isEnglishToChineseMode ? this.currentWord.chinese : this.currentWord.vocabulary;
                } else {
                    let randomIndex = Math.floor(Math.random() * this.vocabularies.length);
                    option = this.isEnglishToChineseMode ? this.vocabularies[randomIndex].chinese : this.vocabularies[randomIndex].vocabulary;
                }
                optionsSet.add(option);
            }

            this.options = Array.from(optionsSet);
            this.shuffledOptions = this.shuffleArray(this.options);
        },
        checkAnswer(option) {
            if (this.feedback !== null) return; // 如果已經有回饋,則不執行

            const correctAnswer = this.isEnglishToChineseMode ? this.currentWord.chinese : this.currentWord.vocabulary;
            if (option === correctAnswer) {
                this.feedback = '答對了!';
                this.score++;
            } else {
                this.wrongAnswers.push(this.currentWord);
                this.feedback = '答錯了，正確答案是：' + correctAnswer;
            }
            this.showModal = true;
            // 將所有選項設為不可點w選狀態
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.style.pointerEvents = 'none';
            });
            clearInterval(this.timer);

        },

        resetQuiz() {
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.timeLeft = this.vocabularies.length * 5;
            this.isQuizCompleted = false;
            this.wrongAnswers = [];
        },
        startTimer() {
            clearInterval(this.timer);
            this.timeLeft = 10; // 將時間設為 10 秒
            this.timer = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft === 0) {
                    clearInterval(this.timer);
                    // 處理時間到的邏輯,例如:
                    this.feedback = '時間到，正確答案是：' + (this.isEnglishToChineseMode ? this.currentWord.vocabulary : this.currentWord.vocabulary);
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
        }
    }
});
app.mount('#app');