<template>
    <div>
        <h1>Store Visit Data</h1>
        <form>
            <div v-show="$route.query.page == 1">
                <label>Name:</label>
                <input type="text" id="full_name" name="full_name" placeholder="Yamada Taro" required>
                <label>Age:</label>
                <input type="number" id="age" name="age">
                <label>Sex:</label>
                <select id="sex" name="sex">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label>Occupation:</label>
                <input type="text" id="occupation" name="occupation">
                <label>Height:</label>
                <input type="number" id="age" name="age">
                <label>Weight:</label>
                <input type="number" id="age" name="age">
                <label>Body temp:</label>
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
                    <input type="text" id="2-other_hospital" name="2-other_hospital">
                </p>
                <p>
                    <label for="2-medicines">薬品名</label>
                    <ul>
                        <li v-for="n in answer.medicines.length + 1">
                            <input type="text" v-bind:id="'2-medicines-' + (n - 1).toString" v-bind:name="'2-medicines-' + (n-0).toString" v-model="">

            </div>
            <div v-show="$route.query.page == 3">
                <p><label>次の質問にお答え下さい。</label></p>
                <p><label for="3-appetite">食欲:</label></p>
                <p>
                    <input type="radio" name="3-appetite" id="3-appetite-0" value="0" checked="checked">良い
                    <input type="radio" name="3-appetite" id="3-appetite-1" value="1">普通
                    <input type="radio" name="3-appetite" id="3-appetite-2" value="2">低下
                    <input type="radio" name="3-appetite" id="3-appetite-3" value="3">ない
                    <input type="radio" name="3-appetite" id="3-appetite-4" value="4">自分で制限している
                </p>
            </div>
        </form>
        <button type="button" v-if="$route.query.page > 1" v-on:click="movePage('back')">前へ</button>
        <button type="button" v-on:click="movePage('forward')">次へ</button>
    </div>
</template>
<script>
export default {
    name: 'Quiestionnaire',
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
        }
    }
}
</script>
