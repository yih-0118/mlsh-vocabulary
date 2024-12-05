const app = Vue.createApp({
    data() {
        return {
            vocabularies: [],
            currentWord: {},
            options: [],
            shuffledOptions: [],
            correctIndex: null,
            feedback: null,
            selectedChapter: null,
            isEnglishToChineseMode: 1,
            score: 0,
            currentQuestionIndex: 0,
            timeLeft: 0, // 60 seconds
            timer: null,
            isQuizCompleted: false,
            showModal: false, // 新增控制彈出小畫面的屬性
            showResultModal: false, // 新增控制測驗結果彈出小畫面的屬性
            wrongAnswers: [],
            isPaused: false,
            chapters: {
                "B1 L1": "../json/B1 L1.json",
                "B1 L2": "../json/B1 L2.json",
                "B1 L3": "../json/B1 L3.json",
                "B1 L4": "../json/B1 L4.json",
                "B1 L5": "../json/B1 L5.json",
                "B1 L6": "../json/B1 L6.json",
                "B1 L7": "../json/B1 L7.json",
                "B1 L8": "../json/B1 L8.json",
                "B1 L9": "../json/B1 L9.json",
                "B1 R1": "../json/B1 review 1.json",
                "B1 R2": "../json/B1 review 2.json",
                "B1 R3": "../json/B1 review 3.json",
                "B2 L1": "../json/B2 L1.json",
                "B2 L2": "../json/B2 L2.json",
                "B2 L3": "../json/B2 L3.json",
                "B2 L4": "../json/B2 L4.json",
                "B2 L5": "../json/B2 L5.json",
                "B2 L6": "../json/B2 L6.json",
                "B2 L7": "../json/B2 L7.json",
                "B2 L8": "../json/B2 L8.json",
                "B2 L9": "../json/B2 L9.json",
                "B2 R1": "../json/B2 review 1.json",
                "B2 R2": "../json/B2 review 2.json",
                "B2 R3": "../json/B2 review 3.json",
                "B3 L1": "../json/B3 L1.json",
                "B3 L2": "../json/B3 L2.json",
                "B3 L3": "../json/B3 L3.json",
                "B3 L4": "../json/B3 L4.json",
                "B3 L5": "../json/B3 L5.json",
                "B3 L6": "../json/B3 L6.json",
                "B3 L7": "../json/B3 L7.json",
                "B3 L8": "../json/B3 L8.json",
                "B3 L9": "../json/B3 L9.json",
                "B3 R1": "../json/B3 review 1.json",
                "B3 R2": "../json/B3 review 2.json",
                "B3 R3": "../json/B3 review 3.json",
                "B4 L1": "../json/B4 L1.json",
                "B4 L2": "../json/B4 L2.json",
                "B4 L3": "../json/B4 L3.json",
                "B4 L4": "../json/B4 L4.json",
                "B4 L5": "../json/B4 L5.json",
                "B4 L6": "../json/B4 L6.json",
                "B4 L7": "../json/B4 L7.json",
                "B4 L8": "../json/B4 L8.json",
                "B4 L9": "../json/B4 L9.json",
                "B4 R1": "../json/B4 review 1.json",
                "B4 R2": "../json/B4 review 2.json",
                "B4 R3": "../json/B4 review 3.json",
                "B5 L1": "../json/B5 L1.json",
                "B5 L2": "../json/B5 L2.json",
                "B5 L3": "../json/B5 L3.json",
                "B5 L4": "../json/B5 L4.json",
                "B5 L5": "../json/B5 L5.json",
                "B5 L6": "../json/B5 L6.json",
                "Vocabulary (L2 Unit1)": "../json/vocabulary(L2 Unit1).json",
                "Vocabulary (L2 Unit2)": "../json/vocabulary(L2 Unit2).json",
                "Vocabulary (L2 Unit3)": "../json/vocabulary(L2 Unit3).json",
                "Vocabulary (L2 Unit4)": "../json/vocabulary(L2 Unit4).json",
                "Vocabulary (L2 Unit5)": "../json/vocabulary(L2 Unit5).json",
                "Vocabulary (L2 Unit6)": "../json/vocabulary(L2 Unit6).json",
                "Vocabulary (L2 Unit7)": "../json/vocabulary(L2 Unit7).json",
                "Vocabulary (L2 Unit8)": "../json/vocabulary(L2 Unit8).json",
                "Vocabulary (L3 Unit1)": "../json/vocabulary(L3 Unit1).json",
                "Vocabulary (L3 Unit2)": "../json/vocabulary(L3 Unit2).json",
                "Vocabulary (L3 Unit3)": "../json/vocabulary(L3 Unit3).json",
                "Vocabulary (L3 Unit4)": "../json/vocabulary(L3 Unit4).json",
                "Vocabulary (L3 Unit5)": "../json/vocabulary(L3 Unit5).json",
                "Vocabulary (L3 Unit6)": "../json/vocabulary(L3 Unit6).json",
                "Vocabulary (L3 Unit7)": "../json/vocabulary(L3 Unit7).json",
                "Vocabulary (L3 Unit8)": "../json/vocabulary(L3 Unit8).json",
                "Vocabulary (L3 Unit9)": "../json/vocabulary(L3 Unit9).json",
                "Vocabulary (L3 Unit10)": "../json/vocabulary(L3 Unit10).json",
                "Vocabulary (L3 Unit11)": "../json/vocabulary(L3 Unit11).json",
                "Vocabulary (L3 Unit12)": "../json/vocabulary(L3 Unit12).json",
                "Vocabulary (L3 Unit13)": "../json/vocabulary(L3 Unit13).json",
                "Vocabulary (L3 Unit14)": "../json/vocabulary(L3 Unit14).json",
                "Vocabulary (L3 Unit15)": "../json/vocabulary(L3 Unit15).json",
                "Vocabulary (L3 Unit16)": "../json/vocabulary(L3 Unit16).json",
                "Vocabulary (L3 Unit17)": "../json/vocabulary(L3 Unit17).json",
                "Vocabulary (L3 Unit18)": "../json/vocabulary(L3 Unit18).json",
                "Vocabulary (L3 Unit19)": "../json/vocabulary(L3 Unit19).json",
                "Vocabulary (L3 Unit20)": "../json/vocabulary(L3 Unit20).json",
                "Vocabulary (L3 Unit21)": "../json/vocabulary(L3 Unit21).json",
                "Vocabulary (L4 Unit1)": "../json/vocabulary(L4 Unit1).json",
                "Vocabulary (L4 Unit2)": "../json/vocabulary(L4 Unit2).json",
                "Vocabulary (L4 Unit3)": "../json/vocabulary(L4 Unit3).json",
                "Vocabulary (L4 Unit4)": "../json/vocabulary(L4 Unit4).json",
                "Vocabulary (L4 Unit5)": "../json/vocabulary(L4 Unit5).json",
                "Vocabulary (L4 Unit6)": "../json/vocabulary(L4 Unit6).json",
                "Vocabulary (L4 Unit7)": "../json/vocabulary(L4 Unit7).json",
                "Vocabulary (L4 Unit8)": "../json/vocabulary(L4 Unit8).json",
                "Vocabulary (L4 Unit9)": "../json/vocabulary(L4 Unit9).json",
                "Vocabulary (L4 Unit10)": "../json/vocabulary(L4 Unit10).json",
                "Vocabulary (L4 Unit11)": "../json/vocabulary(L4 Unit11).json",
                "Vocabulary (L4 Unit12)": "../json/vocabulary(L4 Unit12).json",
                "Vocabulary (L4 Unit13)": "../json/vocabulary(L4 Unit13).json",
                "Vocabulary (L4 Unit14)": "../json/vocabulary(L4 Unit14).json",
                "Vocabulary (L4 Unit15)": "../json/vocabulary(L4 Unit15).json",
                "Vocabulary (L4 Unit16)": "../json/vocabulary(L4 Unit16).json",
                "Vocabulary (L4 Unit17)": "../json/vocabulary(L4 Unit17).json",
                "Vocabulary (L4 Unit18)": "../json/vocabulary(L4 Unit18).json",
                "Vocabulary (L4 Unit19)": "../json/vocabulary(L4 Unit19).json",
                "Vocabulary (L4 Unit20)": "../json/vocabulary(L4 Unit20).json",
                "Vocabulary (L4 Unit21)": "../json/vocabulary(L4 Unit21).json",
                "Vocabulary (L5 Unit1)": "../json/vocabulary(L5 Unit1).json",
                "Vocabulary (L5 Unit2)": "../json/vocabulary(L5 Unit2).json",
                "Vocabulary (L5 Unit3)": "../json/vocabulary(L5 Unit3).json",
                "Vocabulary (L5 Unit4)": "../json/vocabulary(L5 Unit4).json",
                "Vocabulary (L5 Unit5)": "../json/vocabulary(L5 Unit5).json",
                "Vocabulary (L5 Unit6)": "../json/vocabulary(L5 Unit6).json",
                "Vocabulary (L5 Unit7)": "../json/vocabulary(L5 Unit7).json",
                "Vocabulary (L5 Unit8)": "../json/vocabulary(L5 Unit8).json",
                "Vocabulary (L5 Unit9)": "../json/vocabulary(L5 Unit9).json",
                "Vocabulary (L5 Unit10)": "../json/vocabulary(L5 Unit10).json",
                "Vocabulary (L5 Unit11)": "../json/vocabulary(L5 Unit11).json",
                "Vocabulary (L5 Unit12)": "../json/vocabulary(L5 Unit12).json",
                "Vocabulary (L5 Unit13)": "../json/vocabulary(L5 Unit13).json",
                "Vocabulary (L5 Unit14)": "../json/vocabulary(L5 Unit14).json",
                "Vocabulary (L5 Unit15)": "../json/vocabulary(L5 Unit15).json",
                "Vocabulary (L5 Unit16)": "../json/vocabulary(L5 Unit16).json",
                "Vocabulary (L5 Unit17)": "../json/vocabulary(L5 Unit17).json",
                "Vocabulary (L5 Unit18)": "../json/vocabulary(L5 Unit18).json",
                "Vocabulary (L5 Unit19)": "../json/vocabulary(L5 Unit19).json",
                "Vocabulary (L5 Unit20)": "../json/vocabulary(L5 Unit20).json",
                "Vocabulary (L5 Unit21)": "../json/vocabulary(L5 Unit21).json",
                "Vocabulary (L5 Unit22)": "../json/vocabulary(L5 Unit22).json",
                "Vocabulary (L5 Unit23)": "../json/vocabulary(L5 Unit23).json",
                "Vocabulary (L5 Unit24)": "../json/vocabulary(L5 Unit24).json",
                "Vocabulary (L5 Unit25)": "../json/vocabulary(L5 Unit25).json",


                "ALL PLUS 1/15~1/31": "../json/開學考雜誌.json",
                "ALL PLUS Mar. CNN_News": "../json/ALL_PLUS_Mar_CNN_News.json",
                "ALL PLUS Mar. Unit 1": "../json/ALL_PLUS_Mar_Unit_1.json",
                "ALL PLUS Mar. Unit 2": "../json/ALL_PLUS_Mar_Unit_2.json",
                "ALL PLUS Mar. Unit 3": "../json/ALL_PLUS_Mar_Unit_3.json",
                "ALL PLUS Mar. Unit 4": "../json/ALL_PLUS_Mar_Unit_4.json",
                "ALL PLUS Mar. Unit 5": "../json/ALL_PLUS_Mar_Unit_5.json",
                "ALL PLUS Mar. Unit 6": "../json/ALL_PLUS_Mar_Unit_6.json",
                "ALL PLUS Mar. Unit 7": "../json/ALL_PLUS_Mar_Unit_7.json",
                "ALL PLUS Mar. Unit 9": "../json/ALL_PLUS_Mar_Unit_9.json",
                "ALL PLUS Mar. Unit 10": "../json/ALL_PLUS_Mar_Unit_10.json",
                "ALL PLUS Mar. Unit 11": "../json/ALL_PLUS_Mar_Unit_11.json",
                "ALL PLUS Mar. Unit 12": "../json/ALL_PLUS_Mar_Unit_12.json",
                "ALL PLUS Mar. Unit 13": "../json/ALL_PLUS_Mar_Unit_13.json",
                "ALL PLUS Mar. Unit 14": "../json/ALL_PLUS_Mar_Unit_14.json",
                "ALL PLUS Mar. Unit 15": "../json/ALL_PLUS_Mar_Unit_15.json",
                "ALL PLUS Apr. CNN_News": "../json/ALL_PLUS_Apr_CNN_News.json",
                "ALL PLUS Apr. Unit 1": "../json/ALL_PLUS_Apr_Unit_1.json",
                "ALL PLUS Apr. Unit 2": "../json/ALL_PLUS_Apr_Unit_2.json",
                "ALL PLUS Apr. Unit 3": "../json/ALL_PLUS_Apr_Unit_3.json",
                "ALL PLUS Apr. Unit 4": "../json/ALL_PLUS_Apr_Unit_4.json",
                "ALL PLUS Apr. Unit 5": "../json/ALL_PLUS_Apr_Unit_5.json",
                "ALL PLUS Apr. Unit 6": "../json/ALL_PLUS_Apr_Unit_6.json",
                "ALL PLUS Apr. Unit 8": "../json/ALL_PLUS_Apr_Unit_8.json",
                "ALL PLUS Apr. Unit 9": "../json/ALL_PLUS_Apr_Unit_9.json",
                "ALL PLUS Apr. Unit 10": "../json/ALL_PLUS_Apr_Unit_10.json",
                "ALL PLUS Apr. Unit 12": "../json/ALL_PLUS_Apr_Unit_12.json",
                "ALL PLUS Apr. Unit 13": "../json/ALL_PLUS_Apr_Unit_13.json",
                "ALL PLUS Apr. Unit 14": "../json/ALL_PLUS_Apr_Unit_14.json",
                "ALL PLUS Apr. Unit 15": "../json/ALL_PLUS_Apr_Unit_15.json",
                "ALL PLUS May Unit 1": "../json/ALL_PLUS_May_Unit_1.json",
                "ALL PLUS May Unit 2": "../json/ALL_PLUS_May_Unit_2.json",
                "ALL PLUS May Unit 3": "../json/ALL_PLUS_May_Unit_3.json",
                "ALL PLUS May Unit 4": "../json/ALL_PLUS_May_Unit_4.json",
                "ALL PLUS May Unit 5": "../json/ALL_PLUS_May_Unit_5.json",
                "ALL PLUS May Unit 6": "../json/ALL_PLUS_May_Unit_6.json",
                "ALL PLUS May Unit 7": "../json/ALL_PLUS_May_Unit_7.json",
                "ALL PLUS May Unit 8": "../json/ALL_PLUS_May_Unit_8.json",
                "ALL PLUS May Unit 10": "../json/ALL_PLUS_May_Unit_10.json",
                "ALL PLUS May Unit 11": "../json/ALL_PLUS_May_Unit_11.json",
                "ALL PLUS May Unit 12": "../json/ALL_PLUS_May_Unit_12.json",
                "ALL PLUS May Unit 13": "../json/ALL_PLUS_May_Unit_13.json",
                "ALL PLUS May Unit 14": "../json/ALL_PLUS_May_Unit_14.json",
                "ALL PLUS May Unit 15": "../json/ALL_PLUS_May_Unit_15.json",
                "ALL PLUS May Unit 16": "../json/ALL_PLUS_May_Unit_16.json",
                "ALL PLUS Jun. CNN_News": "../json/ALL_PLUS_Jun_CNN_News.json",
                "ALL PLUS Jun. Unit 1": "../json/ALL_PLUS_Jun_Unit_1.json",
                "ALL PLUS Jun. Unit 2": "../json/ALL_PLUS_Jun_Unit_2.json",
                "ALL PLUS Jun. Unit 3": "../json/ALL_PLUS_Jun_Unit_3.json",
                "ALL PLUS Jun. Unit 4": "../json/ALL_PLUS_Jun_Unit_4.json",
                "ALL PLUS Jun. Unit 5": "../json/ALL_PLUS_Jun_Unit_5.json",
                "ALL PLUS Jun. Unit 6": "../json/ALL_PLUS_Jun_Unit_6.json",
                "ALL PLUS Jun. Unit 7": "../json/ALL_PLUS_Jun_Unit_7.json",
                "ALL PLUS Jun. Unit 9": "../json/ALL_PLUS_Jun_Unit_9.json",
                "ALL PLUS Jun. Unit 10": "../json/ALL_PLUS_Jun_Unit_10.json",
                "ALL PLUS Jun. Unit 11": "../json/ALL_PLUS_Jun_Unit_11.json",
                "ALL PLUS Jun. Unit 12": "../json/ALL_PLUS_Jun_Unit_12.json",
                "ALL PLUS Jun. Unit 13": "../json/ALL_PLUS_Jun_Unit_13.json",
                "ALL PLUS Jun. Unit 14": "../json/ALL_PLUS_Jun_Unit_14.json",
                "段考特別篇": "../json/段考特別篇.json",
            },
            books: {
                'Book1': ['請選取章節', 'B1 L1', 'B1 L2', 'B1 L3', 'B1 L4', 'B1 L5', 'B1 L6', 'B1 L7', 'B1 L8', 'B1 L9', 'B1 R1', 'B1 R2', 'B1 R3'],
                'Book2': ['請選取章節', 'B2 L1', 'B2 L2', 'B2 L3', 'B2 L4', 'B2 L5', 'B2 L6', 'B2 L7', 'B2 L8', 'B2 L9', 'B2 R1', 'B2 R2', 'B2 R3'],
                'Book3': ['請選取章節', 'B3 L1', 'B3 L2', 'B3 L3', 'B3 L4', 'B3 L5', 'B3 L6', 'B3 L7', 'B3 L8', 'B3 L9', 'B3 R1', 'B3 R2', 'B3 R3'],
                'Book4': ['請選取章節', 'B4 L1', 'B4 L2', 'B4 L3', 'B4 L4', 'B4 L5', 'B4 L6', 'B4 L7', 'B4 L8', 'B4 L9', 'B4 R1', 'B4 R2', 'B4 R3'],
                'Book5': ['請選取章節', 'B5 L1', 'B5 L2', 'B5 L3', 'B5 L4', 'B5 L5', 'B5 L6'],
                'Level 2': ['請選取章節',
                    'Vocabulary (L2 Unit1)', 'Vocabulary (L2 Unit2)', 'Vocabulary (L2 Unit3)', 'Vocabulary (L2 Unit4)', 'Vocabulary (L2 Unit5)',
                    'Vocabulary (L2 Unit6)', 'Vocabulary (L2 Unit7)', 'Vocabulary (L2 Unit8)'
                ],
                'Level 3': ['請選取章節',
                    'Vocabulary (L3 Unit1)', 'Vocabulary (L3 Unit2)',
                    'Vocabulary (L3 Unit3)', 'Vocabulary (L3 Unit4)', 'Vocabulary (L3 Unit5)', 'Vocabulary (L3 Unit6)', 'Vocabulary (L3 Unit7)',
                    'Vocabulary (L3 Unit8)', 'Vocabulary (L3 Unit9)', 'Vocabulary (L3 Unit10)', 'Vocabulary (L3 Unit11)', 'Vocabulary (L3 Unit12)',
                    'Vocabulary (L3 Unit13)', 'Vocabulary (L3 Unit14)', 'Vocabulary (L3 Unit15)', 'Vocabulary (L3 Unit16)', 'Vocabulary (L3 Unit17)',
                    'Vocabulary (L3 Unit18)', 'Vocabulary (L3 Unit19)', 'Vocabulary (L3 Unit20)', 'Vocabulary (L3 Unit21)',
                ],
                'Level 4': ['請選取章節',
                    'Vocabulary (L4 Unit1)',
                    'Vocabulary (L4 Unit2)', 'Vocabulary (L4 Unit3)', 'Vocabulary (L4 Unit4)', 'Vocabulary (L4 Unit5)', 'Vocabulary (L4 Unit6)',
                    'Vocabulary (L4 Unit7)', 'Vocabulary (L4 Unit8)', 'Vocabulary (L4 Unit9)', 'Vocabulary (L4 Unit10)', 'Vocabulary (L4 Unit11)',
                    'Vocabulary (L4 Unit12)', 'Vocabulary (L4 Unit13)', 'Vocabulary (L4 Unit14)', 'Vocabulary (L4 Unit15)', 'Vocabulary (L4 Unit16)',
                    'Vocabulary (L4 Unit17)', 'Vocabulary (L4 Unit18)', 'Vocabulary (L4 Unit19)', 'Vocabulary (L4 Unit20)', 'Vocabulary (L4 Unit21)'
                ],
                'Level 5': ['請選取章節',
                    'Vocabulary (L5 Unit1)',
                    'Vocabulary (L5 Unit2)', 'Vocabulary (L5 Unit3)', 'Vocabulary (L5 Unit4)', 'Vocabulary (L5 Unit5)', 'Vocabulary (L5 Unit6)',
                    'Vocabulary (L5 Unit7)', 'Vocabulary (L5 Unit8)', 'Vocabulary (L5 Unit9)', 'Vocabulary (L5 Unit10)', 'Vocabulary (L5 Unit11)',
                    'Vocabulary (L5 Unit12)', 'Vocabulary (L5 Unit13)', 'Vocabulary (L5 Unit14)', 'Vocabulary (L5 Unit15)', 'Vocabulary (L5 Unit16)',
                    'Vocabulary (L5 Unit17)', 'Vocabulary (L5 Unit18)', 'Vocabulary (L5 Unit19)', 'Vocabulary (L5 Unit20)', 'Vocabulary (L5 Unit21)'
                    , 'Vocabulary (L5 Unit22)', 'Vocabulary (L5 Unit23)', 'Vocabulary (L5 Unit24)', 'Vocabulary (L5 Unit25)'
                    
                ],
                'ALL_PLUS_Mar': ['請選取章節', 'ALL PLUS Mar. CNN_News', 'ALL PLUS Mar. Unit 1', 'ALL PLUS Mar. Unit 2', 'ALL PLUS Mar. Unit 3',
                    'ALL PLUS Mar. Unit 4', 'ALL PLUS Mar. Unit 5', 'ALL PLUS Mar. Unit 6', 'ALL PLUS Mar. Unit 7', 'ALL PLUS Mar. Unit 9',
                    'ALL PLUS Mar. Unit 10', 'ALL PLUS Mar. Unit 11', 'ALL PLUS Mar. Unit 12', 'ALL PLUS Mar. Unit 13', 'ALL PLUS Mar. Unit 14',
                    'ALL PLUS Mar. Unit 15'],
                'ALL_PLUS_Apr': ['請選取章節', 'ALL PLUS Apr. CNN_News', 'ALL PLUS Apr. Unit 1', 'ALL PLUS Apr. Unit 2', 'ALL PLUS Apr. Unit 3', 'ALL PLUS Apr. Unit 4',
                    'ALL PLUS Apr. Unit 5', 'ALL PLUS Apr. Unit 6', 'ALL PLUS Apr. Unit 8', 'ALL PLUS Apr. Unit 9',
                    'ALL PLUS Apr. Unit 10', 'ALL PLUS Apr. Unit 12', 'ALL PLUS Apr. Unit 13', 'ALL PLUS Apr. Unit 14', 'ALL PLUS Apr. Unit 15'],
                'ALL_PLUS_May': ['請選取章節', 'ALL PLUS May Unit 1',
                    'ALL PLUS May Unit 2', 'ALL PLUS May Unit 3', 'ALL PLUS May Unit 4', 'ALL PLUS May Unit 5', 'ALL PLUS May Unit 6',
                    'ALL PLUS May Unit 7', 'ALL PLUS May Unit 8', 'ALL PLUS May Unit 10', 'ALL PLUS May Unit 11', 'ALL PLUS May Unit 12', 'ALL PLUS May Unit 13',
                    'ALL PLUS May Unit 14', 'ALL PLUS May Unit 15', 'ALL PLUS May Unit 16'],
                'ALL_PLUS_Jun': ['請選取章節', 'ALL PLUS Jun. CNN_News', 'ALL PLUS Jun. Unit 1', 'ALL PLUS Jun. Unit 2', 'ALL PLUS Jun. Unit 3', 'ALL PLUS Jun. Unit 4',
                    'ALL PLUS Jun. Unit 5', 'ALL PLUS Jun. Unit 6', 'ALL PLUS Jun. Unit 8', 'ALL PLUS Jun. Unit 9',
                    'ALL PLUS Jun. Unit 10', 'ALL PLUS Jun. Unit 12', 'ALL PLUS Jun. Unit 13', 'ALL PLUS Jun. Unit 14'],
                '其他': ['請選取章節', '段考特別篇']                          // 添加更多書籍和對應的章節
            },                         
            selectedBook: null,
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
        filterChapters(book) {
            this.selectedBook = book;
            const chapterSelect = document.getElementById('chapterSelect');
            chapterSelect.disabled = !book;
            chapterSelect.innerHTML = '';
            if (book) {
                const chapters = this.books[book];
                chapters.forEach(chapter => {
                    const option = document.createElement('option');
                    option.value = this.chapters[chapter];
                    option.textContent = chapter;
                    chapterSelect.appendChild(option);
                });
            } else {
                const option = document.createElement('option');
                option.value = '';
                option.textContent = '請先選擇書籍';
                chapterSelect.appendChild(option);
            }
        },
        // loadChapter(chapter) {
        //     fetch(chapter)
        //         .then(response => response.json())
        //         .then(data => {
        //             this.vocabularies = data.vocabularies;
        //             this.nextWord();
        //             this.resetQuiz();
        //             this.startTimer();
        //         })
        //         .catch(error => console.error('Error fetching data:', error));
        // },
        selectChapter(event) {
            this.selectedChapter = event.target.value;
            if (this.selectedChapter) {
                this.loadChapter(this.selectedChapter);
            }
        },
        loadChapter(chapter) {
            fetch(chapter)
                .then(response => response.json())
                .then(data => {
                    this.vocabularies = this.shuffleArray(data.vocabularies); // 先打亂 vocabularies 數組
                    this.resetQuiz();
                    this.nextWord();
                })
                .catch(error => console.error('Error fetching data:', error));
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
        // nextWord() {
        //     if (this.currentQuestionIndex < this.vocabularies.length) {
        //         const randomIndex = Math.floor(Math.random() * this.vocabularies.length);
        //         this.currentWord = this.vocabularies[randomIndex];
        //         this.generateOptions();
        //         this.feedback = null;
        //         this.currentQuestionIndex++;

        //         // 重新啟用所有選項
        //         const options = document.querySelectorAll('.option');
        //         options.forEach(option => {
        //             option.style.pointerEvents = 'auto';
        //         });

        //         this.startTimer();

        //     } else {
        //         this.isQuizCompleted = true;
        //         clearInterval(this.timer);
        //         this.showResultModal = true; // 顯示測驗結果彈出小畫面
        //     }
        //     this.showModal = false; // 關閉彈出小畫面
        // },
        // generateOptions() {
        //     this.options = [];
        //     this.correctIndex = Math.floor(Math.random() * 4);
        //     const optionsSet = new Set();

        //     for (let i = 0; i < 4; i++) {
        //         let option;
        //         if (i === this.correctIndex) {
        //             option = this.isEnglishToChineseMode ? this.currentWord.chinese : this.currentWord.vocabulary;
        //         } else {
        //             let randomIndex = Math.floor(Math.random() * this.vocabularies.length);
        //             option = this.isEnglishToChineseMode ? this.vocabularies[randomIndex].chinese : this.vocabularies[randomIndex].vocabulary;
        //         }
        //         optionsSet.add(option);
        //     }

        //     this.options = Array.from(optionsSet);
        //     this.shuffledOptions = this.shuffleArray(this.options);
        // },
        generateOptions() {
            this.options = [];
            this.correctIndex = Math.floor(Math.random() * 4);
            const optionsSet = new Set();
            const correctAnswer = this.isEnglishToChineseMode ? this.currentWord.chinese : this.currentWord.vocabulary;
            optionsSet.add(correctAnswer);

            while (optionsSet.size < 4) {
                const randomIndex = Math.floor(Math.random() * this.vocabularies.length);
                const option = this.isEnglishToChineseMode ? this.vocabularies[randomIndex].chinese : this.vocabularies[randomIndex].vocabulary;
                if (!optionsSet.has(option)) {
                    optionsSet.add(option);
                }
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
                this.nextWord()
                // 不顯示彈出小畫面
            } else {
                this.wrongAnswers.push(this.currentWord);
                this.feedback = '答錯了，正確答案是：' + correctAnswer;
                this.showModal = true; // 只在答錯時顯示彈出小畫面
                // 將所有選項設為不可點選狀態
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.style.pointerEvents = 'none';
            });
            }
            
            clearInterval(this.timer);
            this.startTimer();

        },

        resetQuiz() {
            this.currentQuestionIndex = 0;
            this.score = 0;
            this.timeLeft = this.vocabularies.length * 5;
            this.isQuizCompleted = false;
            this.wrongAnswers = [];
        },
        // startTimer() {
        //     clearInterval(this.timer);
        //     this.timeLeft = 10; // 將時間設為 10 秒
        //     this.timer = setInterval(() => {
        //         this.timeLeft--;
        //         if (this.timeLeft === 0) {
        //             clearInterval(this.timer);
        //             // 處理時間到的邏輯,例如:
        //             this.feedback = '時間到，正確答案是：' + (this.isEnglishToChineseMode ? this.currentWord.vocabulary : this.currentWord.vocabulary);
        //             this.nextWord(); // 跳到下一題
        //         }
        //     }, 1000);
        // },
        togglePause() {
            if (this.isPaused) {
                this.isPaused = false;
                this.startTimer(this.timeLeft); // 從剩餘時間繼續

                // 啟用所有選項
                const options = document.querySelectorAll('.option');
                options.forEach(option => {
                    option.style.pointerEvents = 'auto';
                    option.style.color = ''; // 恢復選項背景色
                });

                // 恢復問題文字背景色
                const questionCards = document.querySelectorAll('.question-card li');
                questionCards.forEach(card => {
                    card.style.color = '';
                });
            } else {
                this.isPaused = true;
                clearInterval(this.timer);
                const containerBackgroundColor = getComputedStyle(document.querySelector('.option')).backgroundColor;
                const questionBackgroundColor = getComputedStyle(document.querySelector('.question-card')).backgroundColor;

                // 隱藏選項文字
                const options = document.querySelectorAll('.option');
                options.forEach(option => {
                    option.style.color = containerBackgroundColor;
                });

                // 隱藏問題文字
                const questionCards = document.querySelectorAll('.question-card li');
                questionCards.forEach(card => {
                    card.style.color = questionBackgroundColor; // 設置與背景相同的背景色
                });
                options.forEach(option => {
                    option.style.pointerEvents = 'none';
                });
            }
        },
        startTimer(initialTime) {
            clearInterval(this.timer);
            if (!this.isPaused) {
                this.timeLeft = initialTime || 10; // 將時間設為10秒或剩餘時間
                this.timer = setInterval(() => {
                    this.timeLeft--;
                    if (this.timeLeft === 0) {
                        clearInterval(this.timer);
                        // 處理時間到的邏輯,例如:
                        this.feedback = '時間到，正確答案是：' + (this.isEnglishToChineseMode ? this.currentWord.vocabulary : this.currentWord.chinese);
                        this.nextWord(); // 跳到下一題
                    }
                }, 1000);
            }
        },
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
        shuffleArray(array) {
            return array.sort(() => Math.random() - 0.5);
        }
    },

});
app.mount('#app');
const sidebar = document.getElementById('sidebar');
const menuIcon = document.getElementById('menuIcon');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuIcon.classList.toggle('active');
});

const bookSelect = document.getElementById('bookSelect');
const chapterSelect = document.getElementById('chapterSelect');


bookSelect.addEventListener('change', sendToGoogleForm);
chapterSelect.addEventListener('change', sendToGoogleForm);

function sendToGoogleForm() {
    const category = bookSelect.value;
    const subcategoryUrl = chapterSelect.value;
    const subcategory = subcategoryUrl.substring(subcategoryUrl.lastIndexOf('/') + 1, subcategoryUrl.lastIndexOf('.json'));

    if (subcategory) {
        const formData = new FormData();
        formData.append('entry.66807398', "e2c");
        formData.append('entry.954497501', category);
        formData.append('entry.698090182', subcategory);
        fetch('https://docs.google.com/forms/d/e/1FAIpQLScQNw03tQ3A_RCwXp34YxgwkghnrEtgag_Ru_ETI0t76nJQPw/formResponse', {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
    }
}
