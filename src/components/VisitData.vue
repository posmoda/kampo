<template>
    <div>
        <h1>Store Visit Data</h1>
        <form>
            <div v-show="$route.query.page == 1">
                <label>氏名:</label>
                <input type="text" id="full_name" name="full_name" placeholder="Yamada Taro" required>
                <label>年齢:</label>
                <input type="number" id="age" name="age">
                <label>性別:</label>
                <select id="sex" name="sex">
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                </select>
                <label>職業:</label>
                <input type="text" id="occupation" name="occupation">
                <label>身長:</label>
                <input type="number" id="age" name="age">
                <label>体重:</label>
                <input type="number" id="age" name="age">
                <label>体温:</label>
                <input type="number" id="age" name="age">
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
                <p>
                    <label for="2-other_hospital">現在、他の医療機関におかかりですか</label>
                </p>
                <p>
                    <label for="2-diagnosis">診断名</label>
                    <input type="text" id="2-diagnosis" name="2-diagnosis">
                </p>
                <p>
                    <label for="2-medicines">薬品名</label>
                    <ul>
                        <li v-for="n in answer.medicines.length + 1" v-bind:key="n">
                            <input type="text" v-on:input="deleteEmptyProp('answer.medicines', n - 1)" v-bind:id="'2-medicines-' + (n - 1).toString" v-bind:name="'2-medicines-' + (n-0).toString" v-model="answer.medicines[n - 1]">
                        </li>
                    </ul>
                </p>
            </div>
            <div v-show="$route.query.page == 3">
                <p>次の質問にお答え下さい。</p>
                <p>食欲:</p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-appetite" id="3-appetite-0" value="0"><label for="3-appetite-0">良い</label></li>
                    <li><input type="radio" name="3-appetite" id="3-appetite-1" value="1"><label for="3-appetite-1">普通</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-2" value="2"><label for="3-appetite-2">低下</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-3" value="3"><label for="3-appetite-3">ない</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-4" value="4"><label for="3-appetite-4">自分で制限している</label></li>
                </ul>
                <p>睡眠：</p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-sleep" id="3-sleep-0" value="0"><label for="3-sleep-0">良い</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-1" value="1"><label for="3-sleep-1">寝つきが悪い</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-2" value="2"><label for="3-sleep-2">眠りがあさい</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-3" value="3"><label for="3-sleep-3">よく目がさめる</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-4" value="4"><label for="3-sleep-4">よく夢を見る</label></li>
                </ul>
                <p>便：</p>
                <p><label for="3-stool-a-day">頻度:</label><input type="number" id="3-stool-a-day" name="3-stool-a-day">回／日</p>
                <p><label for="3-bowel-movement">便通：</label></p>
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
                <p><label for="3-remaining-flight">残便感：</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-remaining-flight" id="3-remaining-flight-0" value="0"><label for="3-remaining-flight-0">なし</label></li>
                    <li><input type="radio" name="3-remaining-flight" id="3-remaining-flight-1" value="1"><label for="3-remaining-flight-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-ache">腹痛：</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-ache" id="3-stomach-ache-0" value="0"><label for="3-stomach-ache-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-ache" id="3-stomach-ache-1" value="1"><label for="3-stomach-ache-1">あり</label></li>
                </ul>
                <p><label for="3-upset">腹のはり：</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-upset" id="3-upset-0" value="0"><label for="3-upset-0">なし</label></li>
                    <li><input type="radio" name="3-upset" id="3-upset-1" value="1"><label for="3-upset-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-gas">腹にガスがたまる：</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-gas" id="3-stomach-gas-0" value="0"><label for="3-stomach-gas-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-gas" id="3-stomach-gas-1" value="1"><label for="3-stomach-gas-1">あり</label></li>
                </ul>
                <p><label for="3-laxative">下剤の服用：</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-laxative" id="3-laxative-0" value="0"><label for="3-laxative-0">なし</label></li>
                    <li><input type="radio" name="3-laxative" id="3-laxative-1" value="1"><label for="3-laxative-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-ache-by-laxative">下剤での腹痛：</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-ache-by-laxative" id="3-stomach-ache-by-laxative-0" value="0"><label for="3-stomach-ache-by-laxative-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-ache-by-laxative" id="3-stomach-ache-by-laxative-1" value="1"><label for="3-stomach-ache-by-laxative-1">あり</label></li>
                </ul>
            </div>
        </form>
        <button type="button" v-if="$route.query.page > 1" v-on:click="movePage('back')">前へ</button>
        <button type="button" v-on:click="movePage('forward')">次へ</button>
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
