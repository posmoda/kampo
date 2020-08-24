<template>
    <div>
        <h1>Store Visit Data</h1>
        <form class="visit_data__form">
            <div class="visit_data__pagenation" v-show="$route.query.page == 1">
                <p><label for="full_name">氏名</label></p>
                <p><input type="text" id="full_name" name="full_name" placeholder="山田 太郎" required>
                <p><label for="age">年齢</label></p>
                <p><input type="number" id="age" name="age" min="0" max="150" placeholder="0">歳</p>
                <p><label for="sex">性別</label></p>
                <p><select id="sex" name="sex">
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                </select></p>
                <p><label for="occupation">職業</label></p>
                <p><input type="text" id="occupation" name="occupation" placeholder="職業"></p>
                <p><label for="height">身長</label></p>
                <p><input type="number" id="height" name="height" min="0" max="250" placeholder="0">cm</p>
                <p><label for="weight">体重</label></p>
                <p><input type="number" id="weight" name="weight" min="0" max="300" placeholder="0">kg</p>
                <p><label for="temp">体温</label></p>
                <p><input type="number" id="temp" name="temp" min="30" max="50" placeholder="0" @keydown.enter="movePage('forward')">℃</p>
            </div>
            <div v-show="$route.query.page == 2">
                <p>
                    <label for="2-confusing_things">もっともお困りのことは、どのようなことでしょうか</label>
                </p>
                <p>
                    <textarea id="2-confusing_things" name="2-confusing_things"></textarea>
                </p>
                <p>
                    <label for="2-history_of_the_confusing_things">それらの病気や症状は、いつから起こり、どのような経過をとっていますか</label>
                </p>
                <p>
                    <textarea id="2-history_of_the_confusing_things"></textarea>
                </p>
                <p class="visit_data__head_question">現在、他の医療機関におかかりですか</p>
                <p>
                    <label for="2-diagnosis">診断名</label>
                </p>
                <p>
                    <input type="text" id="2-diagnosis" name="2-diagnosis">
                </p>
                <p>
                    <label for="2-medicines">薬品名</label>
                </p>
                <ul>
                    <li v-for="n in answer.medicines.length + 1" v-bind:key="n">
                        <input type="text" v-on:input="deleteEmptyProp('answer.medicines', n - 1)" v-bind:id="'2-medicines-' + (n - 1).toString" v-bind:name="'2-medicines-' + (n-0).toString" v-model="answer.medicines[n - 1]">
                    </li>
                </ul>
            </div>
            <div v-show="$route.query.page == 3">
                <p><label for="3-appetite">食欲</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-appetite" id="3-appetite-0" value="0"><label for="3-appetite-0">良い</label></li>
                    <li><input type="radio" name="3-appetite" id="3-appetite-1" value="1"><label for="3-appetite-1">普通</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-2" value="2"><label for="3-appetite-2">低下</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-3" value="3"><label for="3-appetite-3">ない</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-4" value="4"><label for="3-appetite-4">自分で制限している</label></li>
                </ul>
                <p><label for="3-sleep">睡眠</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-sleep" id="3-sleep-0" value="0"><label for="3-sleep-0">良い</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-1" value="1"><label for="3-sleep-1">寝つきが悪い</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-2" value="2"><label for="3-sleep-2">眠りがあさい</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-3" value="3"><label for="3-sleep-3">よく目がさめる</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-4" value="4"><label for="3-sleep-4">よく夢を見る</label></li>
                </ul>
                <p class="visit_data__head_question">便</p>
                <p><label for="3-stool-a-day">頻度</label></p>
                <p><input type="number" id="3-stool-a-day" name="3-stool-a-day">回／日</p>
                <p><label for="3-bowel-movement">便通</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-0" value="0"><label for="3-bowel-movement-0">普通</label></li>
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-1" value="1"><label for="3-bowel-movement-1">便秘</label></li>
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-2" value="2"><label for="3-bowel-movement-2">下痢</label></li>
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-3" value="3"><label for="3-bowel-movement-3">下痢と便秘が交互にくる</label></li>
                </ul>
                <p><label for="3-stool-condition">便の性状</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-0" value="0"><label for="3-stool-condition-0">普通</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-1" value="1"><label for="3-stool-condition-1">水様</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-2" value="2"><label for="3-stool-condition-2">泥状</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-3" value="3"><label for="3-stool-condition-3">軟便</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-4" value="4"><label for="3-stool-condition-4">硬くつながっている</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-5" value="5"><label for="3-stool-condition-5">コロコロ便</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-6" value="6"><label for="3-stool-condition-6">硬くはないがすっきりしない</label></li>
                </ul>
                <p><label for="3-remaining-flight">残便感</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-remaining-flight" id="3-remaining-flight-0" value="0"><label for="3-remaining-flight-0">なし</label></li>
                    <li><input type="radio" name="3-remaining-flight" id="3-remaining-flight-1" value="1"><label for="3-remaining-flight-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-ache">腹痛</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-ache" id="3-stomach-ache-0" value="0"><label for="3-stomach-ache-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-ache" id="3-stomach-ache-1" value="1"><label for="3-stomach-ache-1">あり</label></li>
                </ul>
                <p><label for="3-upset">腹のはり</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-upset" id="3-upset-0" value="0"><label for="3-upset-0">なし</label></li>
                    <li><input type="radio" name="3-upset" id="3-upset-1" value="1"><label for="3-upset-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-gas">腹にガスがたまる</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-gas" id="3-stomach-gas-0" value="0"><label for="3-stomach-gas-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-gas" id="3-stomach-gas-1" value="1"><label for="3-stomach-gas-1">あり</label></li>
                </ul>
                <p><label for="3-laxative">下剤の服用</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-laxative" id="3-laxative-0" value="0"><label for="3-laxative-0">なし</label></li>
                    <li><input type="radio" name="3-laxative" id="3-laxative-1" value="1"><label for="3-laxative-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-ache-by-laxative">下剤での腹痛</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-ache-by-laxative" id="3-stomach-ache-by-laxative-0" value="0"><label for="3-stomach-ache-by-laxative-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-ache-by-laxative" id="3-stomach-ache-by-laxative-1" value="1"><label for="3-stomach-ache-by-laxative-1">あり</label></li>
                </ul>
                <p class="visit_data__head_question">尿</p>
                <p><label for="3-urine-frequency">頻度</label></p>
                <p><input type="number" id="3-urine-frequency" name="3-urine-frequency">回／日</p>
                <p><label for="3-urine-nightly">夜寝てからトイレに起きる</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-urine-nightly" id="3-urine-nightly-0" value="0"><label for="3-urine-nightly-0">なし</label></li>
                    <li><input type="radio" name="3-urine-nightly" id="3-urine-nightly-1" value="1"><label for="3-urine-nightly-1">あり</label></li>
                </ul>
                <p class="visit_data__head_question">月経</p>
                <p><label for="3-menstruation">月経</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation" id="3-menstruation-0" value="0"><label for="3-menstruation-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation" id="3-menstruation-1" value="1"><label for="3-menstruation-1">あり</label></li>
                </ul>
                <p><label for="3-menstruation-first">初潮</label></p>
                <p><input type="number" name="3-menstruation-first" id="3-menstruation-first">歳</p>
                <p><label for="3-menstruation-close">閉経</label></p>
                <p><input type="number" name="3-menstruation-close" id="3-menstruation-close">歳</p>
                <p><label for="3-menstruation-last">最終月経</label></p>
                <p><input type="date" name="3-mestruation-last" id="3-menstruation-last-date">から<input type="number" name="3-menstruation-last" id="3-menstruation-last-period">日間</p>
                <p><label for="3-menstruation-frequency">月経周期</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-0" value="0"><label for="3-menstruation-frequency-0">順調</label>
                        <ul class="visit_data__sub_list">
                            <li><input type="number" name="3-menstruation-frequency-day" id="3-menstruation-frequency-day">日間</li>
                        </ul>
                    </li>
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-1" value="1"><label for="3-menstruation-frequency-1">遅れる</label></li>
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-2" value="2"><label for="3-menstruation-frequency-2">早まる</label></li>
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-3" value="3"><label for="3-menstruation-frequency-3">一定しない</label></li>
                </ul>
                <p><label for="3-menstruation-period">月経周期</label></p>
                <p><input type="number" name="3-menstruation-period" id="3-menstruation-period">日間</p>
                <p><label for="3-menstruation-pain">月経痛</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-0" value="0"><label for="3-menstruation-pain-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-1" value="1"><label for="3-menstruation-pain-1">月経前</label></li>
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-2" value="2"><label for="3-menstruation-pain-2">前半</label></li>
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-3" value="3"><label for="3-menstruation-pain-3">後半</label></li>
                </ul>
                <p><label for="3-menstruation-painkiller">鎮痛剤</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-painkiller" id="3-menstruation-painkiller-0" value="0"><label for="3-menstruation-painkiller-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-painkiller" id="3-menstruation-painkiller-1" value="1"><label for="3-menstruation-painkiller-1">あり</label></li>
                </ul>
                <p><label for="3-menstruation-amount">月経量</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-amount" id="3-menstruation-amount-0" value="0"><label for="3-menstruation-amount-0">普通</label></li>
                    <li><input type="radio" name="3-menstruation-amount" id="3-menstruation-amount-1" value="1"><label for="3-menstruation-amount-1">少ない</label></li>
                    <li><input type="radio" name="3-menstruation-amount" id="3-menstruation-amount-2" value="2"><label for="3-menstruation-amount-2">多い</label></li>
                </ul>
                <p><label for="3-menstruation-upset">月経周期に関連した不調</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-0" value="0"><label for="3-menstruation-upset-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-1" value="1"><label for="3-menstruation-upset-1">月経前</label></li>
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-2" value="2"><label for="3-menstruation-upset-2">月経中</label></li>
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-3" value="2"><label for="3-menstruation-upset-3">その他の時期</label></li>
                </ul>
                <p><label for="3-menstruation-bleed">不正出血</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-bleed" id="3-menstruation-bleed-0" value="0"><label for="3-menstruation-bleed-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-bleed" id="3-menstruation-bleed-1" value="1"><label for="3-menstruation-bleed-1">あり</label></li>
                </ul>
                <p><label for="3-menstruation-drop">帯下</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-drop" id="3-menstruation-drop-0" value="0"><label for="3-menstruation-drop-0">普通</label></li>
                    <li><input type="radio" name="3-menstruation-drop" id="3-menstruation-drop-1" value="1"><label for="3-menstruation-drop-1">少ない</label></li>
                    <li><input type="radio" name="3-menstruation-drop" id="3-menstruation-drop-2" value="2"><label for="3-menstruation-drop-2">多い</label></li>
                </ul>
                <p class="visit_data__head_question">妊娠・出産歴</p>
                <p><label for="3-pregnancy-count">妊娠経験</label></p>
                <p><input type="number" name="3-pregnancy-count" id="3-pregrancy-count">回</p>
                <p><label for="3-pregnancy-birth">出産</label></p>
                <p><input type="number" name="3-pregrancy-birth" id="3-pregnancy-birth">回</p>
                <p><label for="3-pregnancy-abortion">自然流産</label></p>
                <p><input type="number" name="3-pregnancy-abortion" id="3-pregnancy-abortion">回</p>
                <p><label for="3-pregnancy-artificial-abortion">人工流産</label></p>
                <p><input type="number" name="3-pregnancy-artificial-abortion" id="3-pregnancy-artificial-abortion">回</p>
            </div>
        </form>
        <div class="visit_data__navigator">
            <button type="button" v-if="$route.query.page > 1" v-on:click="movePage('back')">前へ</button>
            <button type="button" v-on:click="movePage('forward')">次へ</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Questionnaire',
    data: function() {
        return{
            answer: {
                medicines: []
            }
        }
    },
    methods: {
        movePage(direction) {
            let moveTo = parseInt(this.$route.query.page);
            switch (direction) {
                case "forward":
                    moveTo += 1;
                    break;
                case "back":
                    moveTo -= 1;
                    break;
            }
            this.$router.push({ query: { page: moveTo } });
        },
        deleteEmptyProp(arr, index) {
            eval(
                `if (this.${arr}[${index}] == '') {this.${arr} = this.${arr}.filter(n => n !== '');}`
            )
        }
    }
}
</script>
<style scoped>
h1 {
    text-align: center;
}
.visit_data__form {
    width: 30%;
    min-width: 500px;
    margin: 0 auto;
}
.visit_data__form > div > p {
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.visit_data__form label {
    display: block;
    padding: 1.6em 0 0 0;
    margin: 0 5px;
    width: calc(100% - 10px)
}
.visit_data__form input,
.visit_data__form select,
.visit_data__form textarea {
    font-size: 2rem;
    padding: 0.5em;
    margin: 0 5px;
    border-radius: 5px;
    border: 2px solid black;
    width: 100%;
    min-width: 30%;
}
.visit_data__form input[type=number] {
    -moz-appearance: textfield;
    text-align: right;
}
.visit_data__form ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
}
.visit_data__form li {
    display: block;
    margin: 5px 0;
    width: calc(100% / 2);
    overflow: hidden;
}
.visit_data__form li > * {
    width: calc(100% - 33px);
}
.visit_data__form > div > p.visit_data__head_question {
    margin-top: 2em;
    margin-bottom: -1em;
}
ul.visit_data__radio_box {
    display: flex;   
    flex-wrap: nowrap;
    border-radius: 5px;
    border: 2px solid black;
    height: 50px;
    z-index: 0;
    position: relative;
}
ul.visit_data__radio_box li {
    position: relative;
    height: 100%;
    border-right: 2px solid black;
    overflow: visible;
}
ul.visit_data__radio_box li:last-child {
    border-right: none;
}
ul.visit_data__radio_box li label {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 4px );
    height: calc(100% - 4px );
    z-index: 0;
    font-size: 1.3rem;
    line-height: 1em;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    background-color: white;
}
ul.visit_data__radio_box li input {
    z-index: -1;
}
ul.visit_data__radio_box input:checked + label {
    color: white;
    background-color: black;
}
ul.visit_data__sub_list {
    border: 10px black solid;
    position: absolute;
    top: 100%;
    z-index: 10;
    width: 100%;
}
.visit_data__navigator {
    display: flex;
    width: 30%;
    min-width: 500px;
    margin: 2rem auto;
    justify-content: center;
}
.visit_data__navigator button {
    font-size: 2rem;
    padding: 0.5em 2em;
    border-radius: 5px;
    border: 2px solid black;
    margin: 0 5px;
}
</style>
