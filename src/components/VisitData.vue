<template>
    <div>
        <h1>Store Visit Data</h1>
        <form class="visit_data__form">
            <div class="visit_data__pagenation" v-show="$route.query.page == 1">
                <p><label for="full_name">氏名</label></p>
                <p><input type="text" id="full_name" name="full_name" placeholder="山田 太郎" required v-model="answer.name">
                <p><label for="age">年齢</label></p>
                <p><input type="number" id="age" name="age" min="0" max="150" placeholder="0" v-model="answer.age">歳</p>
                <p><label for="sex">性別</label></p>
                <p><select id="sex" name="sex" v-model="answer.sex">
                    <option value="male">男性</option>
                    <option value="female">女性</option>
                </select></p>
                <p><label for="occupation">職業</label></p>
                <p><input type="text" id="occupation" name="occupation" placeholder="職業" v-model="answer.occupation"></p>
                <p><label for="height">身長</label></p>
                <p><input type="number" id="height" name="height" min="0" max="250" placeholder="0" v-model="answer.height">cm</p>
                <p><label for="weight">体重</label></p>
                <p><input type="number" id="weight" name="weight" min="0" max="300" placeholder="0" v-model="answer.weight">kg</p>
                <p><label for="temp">体温</label></p>
                <p><input type="number" id="temp" name="temp" min="30" max="50" placeholder="0" @keydown.enter="movePage('forward')" v-model="answer.body_temp">℃</p>
            </div>
            <div v-show="$route.query.page == 2">
                <p>
                    <label for="2-confusing_things">もっともお困りのことは、どのようなことでしょうか</label>
                </p>
                <p>
                    <textarea id="2-confusing_things" name="2-confusing_things" v-model="answer.most_concern"></textarea>
                </p>
                <p>
                    <label for="2-history_of_the_confusing_things">それらの病気や症状は、いつから起こり、どのような経過をとっていますか</label>
                </p>
                <p>
                    <textarea id="2-history_of_the_confusing_things" v-model="answer.concern_detail"></textarea>
                </p>
                <p class="visit_data__head_question">現在、他の医療機関におかかりですか</p>
                <p>
                    <label for="2-diagnosis">診断名</label>
                </p>
                <p>
                    <input type="text" id="2-diagnosis" name="2-diagnosis" v-model="answer.other_hospital_diagnosis">
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
                    <li><input type="radio" name="3-appetite" id="3-appetite-0" value="0" v-model="answer.appetite"><label for="3-appetite-0">良い</label></li>
                    <li><input type="radio" name="3-appetite" id="3-appetite-1" value="1" v-model="answer.appetite"><label for="3-appetite-1">普通</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-2" value="2" v-model="answer.appetite"><label for="3-appetite-2">低下</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-3" value="3" v-model="answer.appetite"><label for="3-appetite-3">ない</label></li>

                    <li><input type="radio" name="3-appetite" id="3-appetite-4" value="4" v-model="answer.appetite"><label for="3-appetite-4">自分で制限している</label></li>
                </ul>
                <p><label for="3-sleep">睡眠</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-sleep" id="3-sleep-0" value="0" v-model="answer.sleep"><label for="3-sleep-0">良い</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-1" value="1" v-model="answer.sleep"><label for="3-sleep-1">寝つきが悪い</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-2" value="2" v-model="answer.sleep"><label for="3-sleep-2">眠りがあさい</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-3" value="3" v-model="answer.sleep"><label for="3-sleep-3">よく目がさめる</label></li>
                    <li><input type="radio" name="3-sleep" id="3-sleep-4" value="4" v-model="answer.sleep"><label for="3-sleep-4">よく夢を見る</label></li>
                </ul>
                <p class="visit_data__head_question">便</p>
                <p><label for="3-stool-a-day">頻度</label></p>
                <p><input type="number" id="3-stool-a-day" name="3-stool-a-day" v-model="answer.stool_frequency">回／日</p>
                <p><label for="3-bowel-movement">便通</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-0" value="0" v-model="answer.bowel_movement"><label for="3-bowel-movement-0">普通</label></li>
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-1" value="1" v-model="answer.bowel_movement"><label for="3-bowel-movement-1">便秘</label></li>
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-2" value="2" v-model="answer.bowel_movement"><label for="3-bowel-movement-2">下痢</label></li>
                    <li><input type="radio" name="3-bowel-movement" id="3-bowel-movement-3" value="3" v-model="answer.bowel_movement"><label for="3-bowel-movement-3">下痢と便秘が交互にくる</label></li>
                </ul>
                <p><label for="3-stool-condition">便の性状</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-0" value="0" v-model="answer.stool_property"><label for="3-stool-condition-0">普通</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-1" value="1" v-model="answer.stool_property"><label for="3-stool-condition-1">水様</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-2" value="2" v-model="answer.stool_property"><label for="3-stool-condition-2">泥状</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-3" value="3" v-model="answer.stool_property"><label for="3-stool-condition-3">軟便</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-4" value="4" v-model="answer.stool_property"><label for="3-stool-condition-4">硬くつながっている</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-5" value="5" v-model="answer.stool_property"><label for="3-stool-condition-5">コロコロ便</label></li>
                    <li><input type="radio" name="3-stool-condition" id="3-stool-condition-6" value="6" v-model="answer.stool_property"><label for="3-stool-condition-6">硬くはないがすっきりしない</label></li>
                </ul>
                <p><label for="3-remaining-flight">残便感</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-remaining-flight" id="3-remaining-flight-0" value="0" v-model="answer.remaining_stool"><label for="3-remaining-flight-0">なし</label></li>
                    <li><input type="radio" name="3-remaining-flight" id="3-remaining-flight-1" value="1" v-model="answer.remaining_stool"><label for="3-remaining-flight-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-ache">腹痛</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-ache" id="3-stomach-ache-0" value="0" v-model="answer.stomachache"><label for="3-stomach-ache-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-ache" id="3-stomach-ache-1" value="1" v-model="answer.stomachache"><label for="3-stomach-ache-1">あり</label></li>
                </ul>
                <p><label for="3-upset">腹のはり</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-upset" id="3-upset-0" value="0" v-model="answer.stomach_tension"><label for="3-upset-0">なし</label></li>
                    <li><input type="radio" name="3-upset" id="3-upset-1" value="1" v-model="answer.stomach_tension"><label for="3-upset-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-gas">腹にガスがたまる</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-gas" id="3-stomach-gas-0" value="0" v-model="answer.stomach_gas"><label for="3-stomach-gas-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-gas" id="3-stomach-gas-1" value="1" v-model="answer.stomach_gas"><label for="3-stomach-gas-1">あり</label></li>
                </ul>
                <p><label for="3-laxative">下剤の服用</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-laxative" id="3-laxative-0" value="0" v-model="answer.taking_laxative"><label for="3-laxative-0">なし</label></li>
                    <li><input type="radio" name="3-laxative" id="3-laxative-1" value="1" v-model="answer.taking_laxative"><label for="3-laxative-1">あり</label></li>
                </ul>
                <p><label for="3-stomach-ache-by-laxative">下剤での腹痛</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-stomach-ache-by-laxative" id="3-stomach-ache-by-laxative-0" value="0" v-model="answer.stomachache_by_laxative"><label for="3-stomach-ache-by-laxative-0">なし</label></li>
                    <li><input type="radio" name="3-stomach-ache-by-laxative" id="3-stomach-ache-by-laxative-1" value="1" v-model="answer.stomachache_by_laxative"><label for="3-stomach-ache-by-laxative-1">あり</label></li>
                </ul>
                <p class="visit_data__head_question">尿</p>
                <p><label for="3-urine-frequency">頻度</label></p>
                <p><input type="number" id="3-urine-frequency" name="3-urine-frequency" v-model="answer.urine_flequency">回／日</p>
                <p><label for="3-urine-nightly">夜寝てからトイレに起きる</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-urine-nightly" id="3-urine-nightly-0" value="0" v-model="answer.urine_after_bed"><label for="3-urine-nightly-0">なし</label></li>
                    <li><input type="radio" name="3-urine-nightly" id="3-urine-nightly-1" value="1" v-model="answer.urine_after_bed"><label for="3-urine-nightly-1">あり</label></li>
                </ul>
                <p class="visit_data__head_question">月経</p>
                <p><label for="3-menstruation">月経</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation" id="3-menstruation-0" value="0" v-model="answer.menstruation"><label for="3-menstruation-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation" id="3-menstruation-1" value="1" v-model="answer.menstruation"><label for="3-menstruation-1">あり</label></li>
                </ul>
                <p><label for="3-menstruation-first">初潮</label></p>
                <p><input type="number" name="3-menstruation-first" id="3-menstruation-first" v-model="answer.first_tite_age">歳</p>
                <p><label for="3-menstruation-close">閉経</label></p>
                <p><input type="number" name="3-menstruation-close" id="3-menstruation-close" v-model="answer.menopause_age">歳</p>
                <p><label for="3-menstruation-last">最終月経</label></p>
                <p><input type="date" name="3-mestruation-last" id="3-menstruation-last-date" v-model="answer.last_menstruation_age">から<input type="number" name="3-menstruation-last" id="3-menstruation-last-period" v-model="last_menstruation_lasting">日間</p>
                <p><label for="3-menstruation-frequency">月経周期</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-0" value="0" v-model="answer.menstruation_rhythm"><label for="3-menstruation-frequency-0">順調</label>
                    </li>
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-1" value="1" v-model="answer.menstruation_rhythm"><label for="3-menstruation-frequency-1">遅れる</label></li>
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-2" value="2" v-model="answer.menstruation_rhythm"><label for="3-menstruation-frequency-2">早まる</label></li>
                    <li><input type="radio" name="3-menstruation-frequency" id="3-menstruation-frequency-3" value="3" v-model="answer.menstruation_rhythm"><label for="3-menstruation-frequency-3">一定しない</label></li>
                </ul>
                <p><label for="3-mestruation-peiod">月経周期</label></p>
                <p><input type="number" name="3-menstruation-period" id="3-menstruation-frequency-day" v-model="answer.menstruation_rhythm">日間</p>
                <p><label for="3-menstruation-length">月経期間</label></p>
                <p><input type="number" name="3-menstruation-length" id="3-menstruation-length" v-model="answer.menstruation_length">日間</p>
                <p><label for="3-menstruation-pain">月経痛</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-0" value="0" v-model="answer.menstrual_pain"><label for="3-menstruation-pain-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-1" value="1" v-model="answer.menstrual_pain"><label for="3-menstruation-pain-1">月経前</label></li>
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-2" value="2" v-model="answer.menstrual_pain"><label for="3-menstruation-pain-2">前半</label></li>
                    <li><input type="radio" name="3-menstruation-pain" id="3-menstruation-pain-3" value="3" v-model="answer.menstrual_pain"><label for="3-menstruation-pain-3">後半</label></li>
                </ul>
                <p><label for="3-menstruation-painkiller">鎮痛剤</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-painkiller" id="3-menstruation-painkiller-0" value="0" v-model="answer.menstruation_pain_killer"><label for="3-menstruation-painkiller-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-painkiller" id="3-menstruation-painkiller-1" value="1" v-model="answer.menstruation_pain_killer"><label for="3-menstruation-painkiller-1">あり</label></li>
                </ul>
                <p><label for="3-menstruation-amount">月経量</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-amount" id="3-menstruation-amount-0" value="0" v-model="answer.menstruation_amount"><label for="3-menstruation-amount-0">普通</label></li>
                    <li><input type="radio" name="3-menstruation-amount" id="3-menstruation-amount-1" value="1" v-model="answer.menstruation_amount"><label for="3-menstruation-amount-1">少ない</label></li>
                    <li><input type="radio" name="3-menstruation-amount" id="3-menstruation-amount-2" value="2" v-model="answer.menstruation_amount"><label for="3-menstruation-amount-2">多い</label></li>
                </ul>
                <p><label for="3-menstruation-upset">月経周期に関連した不調</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-0" value="0" v-model="answer.menstruation_upset"><label for="3-menstruation-upset-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-1" value="1" v-model="answer.menstruation_upset"><label for="3-menstruation-upset-1">月経前</label></li>
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-2" value="2" v-model="answer.menstruation_upset"><label for="3-menstruation-upset-2">月経中</label></li>
                    <li><input type="radio" name="3-menstruation-upset" id="3-menstruation-upset-3" value="3" v-model="answer.menstruation_upset"><label for="3-menstruation-upset-3">その他の時期</label></li>
                </ul>
                <p><label for="3-menstruation-bleed">不正出血</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-bleed" id="3-menstruation-bleed-0" value="0" v-model="answer.abnormal_bleeding"><label for="3-menstruation-bleed-0">なし</label></li>
                    <li><input type="radio" name="3-menstruation-bleed" id="3-menstruation-bleed-1" value="1" v-model="answer.abnormal_bleeding"><label for="3-menstruation-bleed-1">あり</label></li>
                </ul>
                <p><label for="3-menstruation-drop">帯下</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="3-menstruation-drop" id="3-menstruation-drop-0" value="0" v-model="answer.vaginal_discharge"><label for="3-menstruation-drop-0">普通</label></li>
                    <li><input type="radio" name="3-menstruation-drop" id="3-menstruation-drop-1" value="1" v-model="answer.vaginal_discharge"><label for="3-menstruation-drop-1">少ない</label></li>
                    <li><input type="radio" name="3-menstruation-drop" id="3-menstruation-drop-2" value="2" v-model="answer.vaginal_discharge"><label for="3-menstruation-drop-2">多い</label></li>
                </ul>
                <p class="visit_data__head_question">妊娠・出産歴</p>
                <p><label for="3-pregnancy-count">妊娠経験</label></p>
                <p><input type="number" name="3-pregnancy-count" id="3-pregrancy-count" v-model="answer.past_pregnancy">回</p>
                <p><label for="3-pregnancy-birth">出産</label></p>
                <p><input type="number" name="3-pregrancy-birth" id="3-pregnancy-birth" v-model="answer.past_birth">回</p>
                <p><label for="3-pregnancy-abortion">自然流産</label></p>
                <p><input type="number" name="3-pregnancy-abortion" id="3-pregnancy-abortion" v-model="answer.spontaneous_miscarriage">回</p>
                <p><label for="3-pregnancy-artificial-abortion">人工流産</label></p>
                <p><input type="number" name="3-pregnancy-artificial-abortion" id="3-pregnancy-artificial-abortion" v-model="answer.artificial_miscarriage">回</p>
            </div>
            <div v-show="$route.query.page == 4">
                <p class="visit_data__head_question">現在の症状、普段の体質傾向についてお答えください</p>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">暑がり</th>
                            <td><input type="radio" name="4-constitution-atsugari" id="4-constitution-atsugari-0" value="0" v-model="answer.constitution_atsugari"><label for="4-constitution-atsugari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-atsugari" id="4-constitution-atsugari-1" value="1" v-model="answer.constitution_atsugari"><label for="4-constitution-atsugari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-atsugari" id="4-constitution-atsugari-2" value="2" v-model="answer.constitution_atsugari"><label for="4-constitution-atsugari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">寒がり</th>
                            <td><input type="radio" name="4-constitution-samugari" id="4-constitution-samugari-0" value="0" v-model="answer.constitution_samugari"><label for="4-constitution-samugari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-samugari" id="4-constitution-samugari-1" value="1" v-model="answer.constitution_samugari"><label for="4-constitution-samugari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-samugari" id="4-constitution-samugari-2" value="2" v-model="answer.constitution_samugari"><label for="4-constitution-samugari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">冷える</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>全身</th>
                            <td><input type="radio" name="4-constitution-hieru-zenshin" id="4-constitution-hieru-zenshin-0" value="0" v-model="answer.constitution_hie_zenshin"><label for="4-constitution-hieru-zenshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hieru-zenshin" id="4-constitution-hieru-zenshin-1" value="1" v-model="answer.constitution_hie_zenshin"><label for="4-constitution-hieru-zenshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hieru-zenshin" id="4-constitution-hieru-zenshin-2" value="2" v-model="answer.constitution_hie_zenshin"><label for="4-constitution-hieru-zenshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>手</th>
                            <td><input type="radio" name="4-constitution-hieru-te" id="4-constitution-hieru-te-0" value="0" v-model="answer.constitution_hie_te"><label for="4-constitution-hieru-te-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hieru-te" id="4-constitution-hieru-te-1" value="1" v-model="answer.constitution_hie_te"><label for="4-constitution-hieru-te-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hieru-te" id="4-constitution-hieru-te-2" value="2" v-model="answer.constitution_hie_te"><label for="4-constitution-hieru-te-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足</th>
                            <td><input type="radio" name="4-constitution-hieru-ashi" id="4-constitution-hieru-ashi-0" value="0" v-model="answer.constitution_hie_ashi"><label for="4-constitution-hieru-ashi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hieru-ashi" id="4-constitution-hieru-ashi-1" value="1" v-model="answer.constitution_hie_ashi"><label for="4-constitution-hieru-ashi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hieru-ashi" id="4-constitution-hieru-ashi-2" value="2" v-model="answer.constitution_hie_ashi"><label for="4-constitution-hieru-ashi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腹</th>
                            <td><input type="radio" name="4-constitution-hieru-hara" id="4-constitution-hieru-hara-0" value="0" v-model="answer.constitution_hie_hara"><label for="4-constitution-hieru-hara-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hieru-hara" id="4-constitution-hieru-hara-1" value="1" v-model="answer.constitution_hie_hara"><label for="4-constitution-hieru-hara-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hieru-hara" id="4-constitution-hieru-hara-2" value="2" v-model="answer.constitution_hie_hara"><label for="4-constitution-hieru-hara-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腰</th>
                            <td><input type="radio" name="4-constitution-hieru-koshi" id="4-constitution-hieru-koshi-0" value="0" v-model="answer.constitution_hie_koshi"><label for="4-constitution-hieru-koshi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hieru-koshi" id="4-constitution-hieru-koshi-1" value="1" v-model="answer.constitution_hie_koshi"><label for="4-constitution-hieru-koshi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hieru-koshi" id="4-constitution-hieru-koshi-2" value="2" v-model="answer.constitution_hie_koshi"><label for="4-constitution-hieru-koshi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>背</th>
                            <td><input type="radio" name="4-constitution-hieru-se" id="4-constitution-hieru-se-0" value="0" v-model="answer.constitution_hie_se"><label for="4-constitution-hieru-se-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hieru-se" id="4-constitution-hieru-se-1" value="1" v-model="answer.constitution_hie_se"><label for="4-constitution-hieru-se-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hieru-se" id="4-constitution-hieru-se-2" value="2" v-model="answer.constitution_hie_se"><label for="4-constitution-hieru-se-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-hieru-other" id="4-constitution-hieru-other-0" value="0" v-model="answer.constitution_hie_other"><label for="4-constitution-hieru-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hieru-other" id="4-constitution-hieru-other-1" value="1" v-model="answer.constitution_hie_other"><label for="4-constitution-hieru-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hieru-other" id="4-constitution-hieru-other-2" value="2" v-model="answer.constitution_hie_other"><label for="4-constitution-hieru-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">のぼせ</th>
                            <td><input type="radio" name="4-constitution-nobose" id="4-constitution-nobose-0" value="0"><label for="4-constitution-nobose-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nobose" id="4-constitution-nobose-1" value="1"><label for="4-constitution-nobose-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nobose" id="4-constitution-nobose-2" value="2"><label for="4-constitution-nobose-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">冷えのぼせ</th>
                            <td><input type="radio" name="4-constitution-hienobose" id="4-constitution-hienobose-0" value="0"><label for="4-constitution-hienobose-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hienobose" id="4-constitution-hienobose-1" value="1"><label for="4-constitution-hienobose-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hienobose" id="4-constitution-hienobose-2" value="2"><label for="4-constitution-hienobose-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">疲れやすい</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>全身</th>
                            <td><input type="radio" name="4-constitution-tsukare-zenshin" id="4-constitution-tsukare-zenshin-0" value="0"><label for="4-constitution-tsukare-zenshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-zenshin" id="4-constitution-tsukare-zenshin-1" value="1"><label for="4-constitution-tsukare-zenshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-zenshin" id="4-constitution-tsukare-zenshin-2" value="2"><label for="4-constitution-tsukare-zenshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足</th>
                            <td><input type="radio" name="4-constitution-tsukare-ashi" id="4-constitution-tsukare-ashi-0" value="0"><label for="4-constitution-tsukare-ashi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-ashi" id="4-constitution-tsukare-ashi-1" value="1"><label for="4-constitution-tsukare-ashi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-ashi" id="4-constitution-tsukare-ashi-2" value="2"><label for="4-constitution-tsukare-ashi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腕</th>
                            <td><input type="radio" name="4-constitution-tsukare-ude" id="4-constitution-tsukare-ude-0" value="0"><label for="4-constitution-tsukare-ude-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-ude" id="4-constitution-tsukare-ude-1" value="1"><label for="4-constitution-tsukare-ude-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-ude" id="4-constitution-tsukare-ude-2" value="2"><label for="4-constitution-tsukare-ude-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-tsukare-other" id="4-constitution-tsukare-other-0" value="0"><label for="4-constitution-tsukare-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-other" id="4-constitution-tsukare-other-1" value="1"><label for="4-constitution-tsukare-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tsukare-other" id="4-constitution-tsukare-other-2" value="2"><label for="4-constitution-tsukare-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">身体が重い</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>全身</th>
                            <td><input type="radio" name="4-constitution-omoi-zenshin" id="4-constitution-omoi-zenshin-0" value="0"><label for="4-constitution-omoi-zenshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-omoi-zenshin" id="4-constitution-omoi-zenshin-1" value="1"><label for="4-constitution-omoi-zenshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-omoi-zenshin" id="4-constitution-omoi-zenshin-2" value="2"><label for="4-constitution-omoi-zenshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腰</th>
                            <td><input type="radio" name="4-constitution-omoi-koshi" id="4-constitution-omoi-koshi-0" value="0"><label for="4-constitution-omoi-koshi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-omoi-koshi" id="4-constitution-omoi-koshi-1" value="1"><label for="4-constitution-omoi-koshi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-omoi-koshi" id="4-constitution-omoi-koshi-2" value="2"><label for="4-constitution-omoi-koshi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>膝</th>
                            <td><input type="radio" name="4-constitution-omoi-hiza" id="4-constitution-omoi-hiza-0" value="0"><label for="4-constitution-omoi-hiza-0">×</label></td>
                            <td><input type="radio" name="4-constitution-omoi-hiza" id="4-constitution-omoi-hiza-1" value="1"><label for="4-constitution-omoi-hiza-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-omoi-hiza" id="4-constitution-omoi-hiza-2" value="2"><label for="4-constitution-omoi-hiza-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足</th>
                            <td><input type="radio" name="4-constitution-omoi-ashi" id="4-constitution-omoi-ashi-0" value="0"><label for="4-constitution-omoi-ashi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-omoi-ashi" id="4-constitution-omoi-ashi-1" value="1"><label for="4-constitution-omoi-ashi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-omoi-ashi" id="4-constitution-omoi-ashi-2" value="2"><label for="4-constitution-omoi-ashi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腕</th>
                            <td><input type="radio" name="4-constitution-omoi-ude" id="4-constitution-omoi-ude-0" value="0"><label for="4-constitution-omoi-ude-0">×</label></td>
                            <td><input type="radio" name="4-constitution-omoi-ude" id="4-constitution-omoi-ude-1" value="1"><label for="4-constitution-omoi-ude-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-omoi-ude" id="4-constitution-omoi-ude-2" value="2"><label for="4-constitution-omoi-ude-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-omoi-other" id="4-constitution-omoi-other-0" value="0"><label for="4-constitution-omoi-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-omoi-other" id="4-constitution-omoi-other-1" value="1"><label for="4-constitution-omoi-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-omoi-other" id="4-constitution-omoi-other-2" value="2"><label for="4-constitution-omoi-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">だるい</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>全身</th>
                            <td><input type="radio" name="4-constitution-darui-zenshin" id="4-constitution-darui-zenshin-0" value="0"><label for="4-constitution-darui-zenshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-darui-zenshin" id="4-constitution-darui-zenshin-1" value="1"><label for="4-constitution-darui-zenshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-darui-zenshin" id="4-constitution-darui-zenshin-2" value="2"><label for="4-constitution-darui-zenshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足</th>
                            <td><input type="radio" name="4-constitution-darui-ashi" id="4-constitution-darui-ashi-0" value="0"><label for="4-constitution-darui-ashi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-darui-ashi" id="4-constitution-darui-ashi-1" value="1"><label for="4-constitution-darui-ashi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-darui-ashi" id="4-constitution-darui-ashi-2" value="2"><label for="4-constitution-darui-ashi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腕</th>
                            <td><input type="radio" name="4-constitution-darui-ude" id="4-constitution-darui-ude-0" value="0"><label for="4-constitution-darui-ude-0">×</label></td>
                            <td><input type="radio" name="4-constitution-darui-ude" id="4-constitution-darui-ude-1" value="1"><label for="4-constitution-darui-ude-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-darui-ude" id="4-constitution-darui-ude-2" value="2"><label for="4-constitution-darui-ude-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-darui-other" id="4-constitution-darui-other-0" value="0"><label for="4-constitution-darui-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-darui-other" id="4-constitution-darui-other-1" value="1"><label for="4-constitution-darui-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-darui-other" id="4-constitution-darui-other-2" value="2"><label for="4-constitution-darui-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">力が入らない</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>全身</th>
                            <td><input type="radio" name="4-constitution-chikara-zenshin" id="4-constitution-chikara-zenshin-0" value="0"><label for="4-constitution-chikara-zenshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikara-zenshin" id="4-constitution-chikara-zenshin-1" value="1"><label for="4-constitution-chikara-zenshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikara-zenshin" id="4-constitution-chikara-zenshin-2" value="2"><label for="4-constitution-chikara-zenshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腰</th>
                            <td><input type="radio" name="4-constitution-chikara-koshi" id="4-constitution-chikara-koshi-0" value="0"><label for="4-constitution-chikara-koshi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikara-koshi" id="4-constitution-chikara-koshi-1" value="1"><label for="4-constitution-chikara-koshi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikara-koshi" id="4-constitution-chikara-koshi-2" value="2"><label for="4-constitution-chikara-koshi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>膝</th>
                            <td><input type="radio" name="4-constitution-chikara-hiza" id="4-constitution-chikara-hiza-0" value="0"><label for="4-constitution-chikara-hiza-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikara-hiza" id="4-constitution-chikara-hiza-1" value="1"><label for="4-constitution-chikara-hiza-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikara-hiza" id="4-constitution-chikara-hiza-2" value="2"><label for="4-constitution-chikara-hiza-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足</th>
                            <td><input type="radio" name="4-constitution-chikara-ashi" id="4-constitution-chikara-ashi-0" value="0"><label for="4-constitution-chikara-ashi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikara-ashi" id="4-constitution-chikara-ashi-1" value="1"><label for="4-constitution-chikara-ashi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikara-ashi" id="4-constitution-chikara-ashi-2" value="2"><label for="4-constitution-chikara-ashi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腕</th>
                            <td><input type="radio" name="4-constitution-chikara-ude" id="4-constitution-chikara-ude-0" value="0"><label for="4-constitution-chikara-ude-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikara-ude" id="4-constitution-chikara-ude-1" value="1"><label for="4-constitution-chikara-ude-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikara-ude" id="4-constitution-chikara-ude-2" value="2"><label for="4-constitution-chikara-ude-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-chikara-other" id="4-constitution-chikara-other-0" value="0"><label for="4-constitution-chikara-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikara-other" id="4-constitution-chikara-other-1" value="1"><label for="4-constitution-chikara-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikara-other" id="4-constitution-chikara-other-2" value="2"><label for="4-constitution-chikara-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">汗をかきやすい</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>全身</th>
                            <td><input type="radio" name="4-constitution-ase-zenshin" id="4-constitution-ase-zenshin-0" value="0"><label for="4-constitution-ase-zenshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ase-zenshin" id="4-constitution-ase-zenshin-1" value="1"><label for="4-constitution-ase-zenshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ase-zenshin" id="4-constitution-ase-zenshin-2" value="2"><label for="4-constitution-ase-zenshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>頭</th>
                            <td><input type="radio" name="4-constitution-ase-atama" id="4-constitution-ase-atama-0" value="0"><label for="4-constitution-ase-atama-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ase-atama" id="4-constitution-ase-atama-1" value="1"><label for="4-constitution-ase-atama-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ase-atama" id="4-constitution-ase-atama-2" value="2"><label for="4-constitution-ase-atama-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>手のひら</th>
                            <td><input type="radio" name="4-constitution-ase-tenohira" id="4-constitution-ase-tenohira-0" value="0"><label for="4-constitution-ase-tenohira-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ase-tenohira" id="4-constitution-ase-tenohira-1" value="1"><label for="4-constitution-ase-tenohira-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ase-tenohira" id="4-constitution-ase-tenohira-2" value="2"><label for="4-constitution-ase-tenohira-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足の裏</th>
                            <td><input type="radio" name="4-constitution-ase-ashinoura" id="4-constitution-ase-ashinoura-0" value="0"><label for="4-constitution-ase-ashinoura-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ase-ashinoura" id="4-constitution-ase-ashinoura-1" value="1"><label for="4-constitution-ase-ashinoura-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ase-ashinoura" id="4-constitution-ase-ashinoura-2" value="2"><label for="4-constitution-ase-ashinoura-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-ase-other" id="4-constitution-ase-other-0" value="0"><label for="4-constitution-ase-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ase-other" id="4-constitution-ase-other-1" value="1"><label for="4-constitution-ase-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ase-other" id="4-constitution-ase-other-2" value="2"><label for="4-constitution-ase-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">汗が出ない</th>
                            <td><input type="radio" name="4-constitution-asedenai" id="4-constitution-asedenai-0" value="0"><label for="4-constitution-asedenai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-asedenai" id="4-constitution-asedenai-1" value="1"><label for="4-constitution-asedenai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-asedenai" id="4-constitution-asedenai-2" value="2"><label for="4-constitution-asedenai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">寝汗</th>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-0" value="0"><label for="4-constitution-nease-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-1" value="1"><label for="4-constitution-nease-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-2" value="2"><label for="4-constitution-nease-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">悪寒（寒気）</th>
                            <td><input type="radio" name="4-constitution-okan" id="4-constitution-okan-0" value="0"><label for="4-constitution-okan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-okan" id="4-constitution-okan-1" value="1"><label for="4-constitution-okan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-okan" id="4-constitution-okan-2" value="2"><label for="4-constitution-okan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">悪風（風に当たったとき不快）</th>
                            <td><input type="radio" name="4-constitution-akufu" id="4-constitution-akufu-0" value="0"><label for="4-constitution-akufu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-akufu" id="4-constitution-akufu-1" value="1"><label for="4-constitution-akufu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-akufu" id="4-constitution-akufu-2" value="2"><label for="4-constitution-akufu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">発熱</th>
                            <td><input type="radio" name="4-constitution-hatsunetsu" id="4-constitution-hatsunetsu-0" value="0"><label for="4-constitution-hatsunetsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hatsunetsu" id="4-constitution-hatsunetsu-1" value="1"><label for="4-constitution-hatsunetsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hatsunetsu" id="4-constitution-hatsunetsu-2" value="2"><label for="4-constitution-hatsunetsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">微熱</th>
                            <td><input type="radio" name="4-constitution-binetsu" id="4-constitution-binetsu-0" value="0"><label for="4-constitution-binetsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-binetsu" id="4-constitution-binetsu-1" value="1"><label for="4-constitution-binetsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-binetsu" id="4-constitution-binetsu-2" value="2"><label for="4-constitution-binetsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">熱感（熱っぽい）</th>
                            <td><input type="radio" name="4-constitution-netsukan" id="4-constitution-netsukan-0" value="0"><label for="4-constitution-netsukan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-netsukan" id="4-constitution-netsukan-1" value="1"><label for="4-constitution-netsukan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-netsukan" id="4-constitution-netsukan-2" value="2"><label for="4-constitution-netsukan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">眠気が強い</th>
                            <td><input type="radio" name="4-constitution-nemuke" id="4-constitution-nemuke-0" value="0"><label for="4-constitution-nemuke-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nemuke" id="4-constitution-nemuke-1" value="1"><label for="4-constitution-nemuke-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nemuke" id="4-constitution-nemuke-2" value="2"><label for="4-constitution-nemuke-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">風邪をひきやすい</th>
                            <td><input type="radio" name="4-constitution-kaze" id="4-constitution-kaze-0" value="0"><label for="4-constitution-kaze-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kaze" id="4-constitution-kaze-1" value="1"><label for="4-constitution-kaze-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kaze" id="4-constitution-kaze-2" value="2"><label for="4-constitution-kaze-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">肥満</th>
                            <td><input type="radio" name="4-constitution-himan" id="4-constitution-himan-0" value="0"><label for="4-constitution-himan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-himan" id="4-constitution-himan-1" value="1"><label for="4-constitution-himan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-himan" id="4-constitution-himan-2" value="2"><label for="4-constitution-himan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">やせ（太れない）</th>
                            <td><input type="radio" name="4-constitution-yase" id="4-constitution-yase-0" value="0"><label for="4-constitution-yase-0">×</label></td>
                            <td><input type="radio" name="4-constitution-yase" id="4-constitution-yase-1" value="1"><label for="4-constitution-yase-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-yase" id="4-constitution-yase-2" value="2"><label for="4-constitution-yase-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">体重増加</th>
                            <td><input type="radio" name="4-constitution-taijuzoka" id="4-constitution-taijuzoka-0" value="0"><label for="4-constitution-taijuzoka-0">×</label></td>
                            <td><input type="radio" name="4-constitution-taijuzoka" id="4-constitution-taijuzoka-1" value="1"><label for="4-constitution-taijuzoka-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-taijuzoka" id="4-constitution-taijuzoka-2" value="2"><label for="4-constitution-taijuzoka-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">体重減少</th>
                            <td><input type="radio" name="4-constitution-taijugensyo" id="4-constitution-taijugensyo-0" value="0"><label for="4-constitution-taijugensyo-0">×</label></td>
                            <td><input type="radio" name="4-constitution-taijugensyo" id="4-constitution-taijugensyo-1" value="1"><label for="4-constitution-taijugensyo-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-taijugensyo" id="4-constitution-taijugensyo-2" value="2"><label for="4-constitution-taijugensyo-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">過食</th>
                            <td><input type="radio" name="4-constitution-kasyoku" id="4-constitution-kasyoku-0" value="0"><label for="4-constitution-kasyoku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kasyoku" id="4-constitution-kasyoku-1" value="1"><label for="4-constitution-kasyoku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kasyoku" id="4-constitution-kasyoku-2" value="2"><label for="4-constitution-kasyoku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">拒食</th>
                            <td><input type="radio" name="4-constitution-kyosyoku" id="4-constitution-kyosyoku-0" value="0"><label for="4-constitution-kyosyoku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kyosyoku" id="4-constitution-kyosyoku-1" value="1"><label for="4-constitution-kyosyoku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kyosyoku" id="4-constitution-kyosyoku-2" value="2"><label for="4-constitution-kyosyoku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">水分をよくとる</th>
                            <td><input type="radio" name="4-constitution-suibun" id="4-constitution-suibun-0" value="0"><label for="4-constitution-suibun-0">×</label></td>
                            <td><input type="radio" name="4-constitution-suibun" id="4-constitution-suibun-1" value="1"><label for="4-constitution-suibun-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-suibun" id="4-constitution-suibun-2" value="2"><label for="4-constitution-suibun-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">浮腫（むくみ）</th>
                            <td><input type="radio" name="4-constitution-mukumi" id="4-constitution-mukumi-0" value="0"><label for="4-constitution-mukumi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mukumi" id="4-constitution-mukumi-1" value="1"><label for="4-constitution-mukumi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mukumi" id="4-constitution-mukumi-2" value="2"><label for="4-constitution-mukumi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">リンパ浮腫</th>
                            <td><input type="radio" name="4-constitution-rinpahusyu" id="4-constitution-rinpahusyu-0" value="0"><label for="4-constitution-rinpahusyu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-rinpahusyu" id="4-constitution-rinpahusyu-1" value="1"><label for="4-constitution-rinpahusyu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-rinpahusyu" id="4-constitution-rinpahusyu-2" value="2"><label for="4-constitution-rinpahusyu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">リンパ節腫脹</th>
                            <td><input type="radio" name="4-constitution-rinpasyutyou" id="4-constitution-rinpasyutyou-0" value="0"><label for="4-constitution-rinpasyutyou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-rinpasyutyou" id="4-constitution-rinpasyutyou-1" value="1"><label for="4-constitution-rinpasyutyou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-rinpasyutyou" id="4-constitution-rinpasyutyou-2" value="2"><label for="4-constitution-rinpasyutyou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">レイノー現象</th>
                            <td><input type="radio" name="4-constitution-reino" id="4-constitution-reino-0" value="0"><label for="4-constitution-reino-0">×</label></td>
                            <td><input type="radio" name="4-constitution-reino" id="4-constitution-reino-1" value="1"><label for="4-constitution-reino-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-reino" id="4-constitution-reino-2" value="2"><label for="4-constitution-reino-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">かゆみ</th>
                            <td><input type="radio" name="4-constitution-kayumi" id="4-constitution-kayumi-0" value="0"><label for="4-constitution-kayumi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kayumi" id="4-constitution-kayumi-1" value="1"><label for="4-constitution-kayumi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kayumi" id="4-constitution-kayumi-2" value="2"><label for="4-constitution-kayumi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">乾燥</th>
                            <td><input type="radio" name="4-constitution-kanaso" id="4-constitution-kanaso-0" value="0"><label for="4-constitution-kanaso-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kanaso" id="4-constitution-kanaso-1" value="1"><label for="4-constitution-kanaso-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kanaso" id="4-constitution-kanaso-2" value="2"><label for="4-constitution-kanaso-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">しこり</th>
                            <td><input type="radio" name="4-constitution-shikori" id="4-constitution-shikori-0" value="0"><label for="4-constitution-shikori-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shikori" id="4-constitution-shikori-1" value="1"><label for="4-constitution-shikori-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shikori" id="4-constitution-shikori-2" value="2"><label for="4-constitution-shikori-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">体の不快感・違和感</th>
                            <td><input type="radio" name="4-constitution-fukaikan" id="4-constitution-fukaikan-0" value="0"><label for="4-constitution-fukaikan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-fukaikan" id="4-constitution-fukaikan-1" value="1"><label for="4-constitution-fukaikan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-fukaikan" id="4-constitution-fukaikan-2" value="2"><label for="4-constitution-fukaikan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">黄疸</th>
                            <td><input type="radio" name="4-constitution-oudan" id="4-constitution-oudan-0" value="0"><label for="4-constitution-oudan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-oudan" id="4-constitution-oudan-1" value="1"><label for="4-constitution-oudan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-oudan" id="4-constitution-oudan-2" value="2"><label for="4-constitution-oudan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">くすぐったがり</th>
                            <td><input type="radio" name="4-constitution-kusuguttagari" id="4-constitution-kusuguttagari-0" value="0"><label for="4-constitution-kusuguttagari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kusuguttagari" id="4-constitution-kusuguttagari-1" value="1"><label for="4-constitution-kusuguttagari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kusuguttagari" id="4-constitution-kusuguttagari-2" value="2"><label for="4-constitution-kusuguttagari-2">◎</label></td>
                        </tr>
                        
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter2">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">不安感</th>
                            <td><input type="radio" name="4-constitution-fuankan" id="4-constitution-fuankan-0" value="0"><label for="4-constitution-fuankan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-fuankan" id="4-constitution-fuankan-1" value="1"><label for="4-constitution-fuankan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-fuankan" id="4-constitution-fuankan-2" value="2"><label for="4-constitution-fuankan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">焦燥感</th>
                            <td><input type="radio" name="4-constitution-shousoukan" id="4-constitution-shousoukan-0" value="0"><label for="4-constitution-shousoukan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shousoukan" id="4-constitution-shousoukan-1" value="1"><label for="4-constitution-shousoukan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shousoukan" id="4-constitution-shousoukan-2" value="2"><label for="4-constitution-shousoukan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">無気力</th>
                            <td><input type="radio" name="4-constitution-mukiryoku" id="4-constitution-mukiryoku-0" value="0"><label for="4-constitution-mukiryoku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mukiryoku" id="4-constitution-mukiryoku-1" value="1"><label for="4-constitution-mukiryoku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mukiryoku" id="4-constitution-mukiryoku-2" value="2"><label for="4-constitution-mukiryoku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">憂鬱感</th>
                            <td><input type="radio" name="4-constitution-yuuutsukan" id="4-constitution-yuuutsukan-0" value="0"><label for="4-constitution-yuuutsukan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-yuuutsukan" id="4-constitution-yuuutsukan-1" value="1"><label for="4-constitution-yuuutsukan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-yuuutsukan" id="4-constitution-yuuutsukan-2" value="2"><label for="4-constitution-yuuutsukan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">朝起きるのがつらい</th>
                            <td><input type="radio" name="4-constitution-asatsurai" id="4-constitution-asatsurai-0" value="0"><label for="4-constitution-asatsurai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-asatsurai" id="4-constitution-asatsurai-1" value="1"><label for="4-constitution-asatsurai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-asatsurai" id="4-constitution-asatsurai-2" value="2"><label for="4-constitution-asatsurai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">イライラする</th>
                            <td><input type="radio" name="4-constitution-iraira" id="4-constitution-iraira-0" value="0"><label for="4-constitution-iraira-0">×</label></td>
                            <td><input type="radio" name="4-constitution-iraira" id="4-constitution-iraira-1" value="1"><label for="4-constitution-iraira-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-iraira" id="4-constitution-iraira-2" value="2"><label for="4-constitution-iraira-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">怒りっぽい</th>
                            <td><input type="radio" name="4-constitution-okorippoi" id="4-constitution-okorippoi-0" value="0"><label for="4-constitution-okorippoi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-okorippoi" id="4-constitution-okorippoi-1" value="1"><label for="4-constitution-okorippoi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-okorippoi" id="4-constitution-okorippoi-2" value="2"><label for="4-constitution-okorippoi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">気分障害（気分にむらがある）</th>
                            <td><input type="radio" name="4-constitution-kibunshougai" id="4-constitution-kibunshougai-0" value="0"><label for="4-constitution-kibunshougai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kibunshougai" id="4-constitution-kibunshougai-1" value="1"><label for="4-constitution-kibunshougai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kibunshougai" id="4-constitution-kibunshougai-2" value="2"><label for="4-constitution-kibunshougai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">夜泣き</th>
                            <td><input type="radio" name="4-constitution-yonaki" id="4-constitution-yonaki-0" value="0"><label for="4-constitution-yonaki-0">×</label></td>
                            <td><input type="radio" name="4-constitution-yonaki" id="4-constitution-yonaki-1" value="1"><label for="4-constitution-yonaki-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-yonaki" id="4-constitution-yonaki-2" value="2"><label for="4-constitution-yonaki-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">歯ぎしり</th>
                            <td><input type="radio" name="4-constitution-hagishiri" id="4-constitution-hagishiri-0" value="0"><label for="4-constitution-hagishiri-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hagishiri" id="4-constitution-hagishiri-1" value="1"><label for="4-constitution-hagishiri-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hagishiri" id="4-constitution-hagishiri-2" value="2"><label for="4-constitution-hagishiri-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">神経過敏（驚きやすい）</th>
                            <td><input type="radio" name="4-constitution-shinkeikabin" id="4-constitution-shinkeikabin-0" value="0"><label for="4-constitution-shinkeikabin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shinkeikabin" id="4-constitution-shinkeikabin-1" value="1"><label for="4-constitution-shinkeikabin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shinkeikabin" id="4-constitution-shinkeikabin-2" value="2"><label for="4-constitution-shinkeikabin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">忘れっぽい</th>
                            <td><input type="radio" name="4-constitution-wasureppoi" id="4-constitution-wasureppoi-0" value="0"><label for="4-constitution-wasureppoi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-wasureppoi" id="4-constitution-wasureppoi-1" value="1"><label for="4-constitution-wasureppoi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-wasureppoi" id="4-constitution-wasureppoi-2" value="2"><label for="4-constitution-wasureppoi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">意識障害（朦朧とする）</th>
                            <td><input type="radio" name="4-constitution-ishikishougai" id="4-constitution-ishikishougai-0" value="0"><label for="4-constitution-ishikishougai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ishikishougai" id="4-constitution-ishikishougai-1" value="1"><label for="4-constitution-ishikishougai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ishikishougai" id="4-constitution-ishikishougai-2" value="2"><label for="4-constitution-ishikishougai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">失神</th>
                            <td><input type="radio" name="4-constitution-shisshin" id="4-constitution-shisshin-0" value="0"><label for="4-constitution-shisshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shisshin" id="4-constitution-shisshin-1" value="1"><label for="4-constitution-shisshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shisshin" id="4-constitution-shisshin-2" value="2"><label for="4-constitution-shisshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">痴呆（ぼけ）</th>
                            <td><input type="radio" name="4-constitution-boke" id="4-constitution-boke-0" value="0"><label for="4-constitution-boke-0">×</label></td>
                            <td><input type="radio" name="4-constitution-boke" id="4-constitution-boke-1" value="1"><label for="4-constitution-boke-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-boke" id="4-constitution-boke-2" value="2"><label for="4-constitution-boke-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">幻覚</th>
                            <td><input type="radio" name="4-constitution-genkaku" id="4-constitution-genkaku-0" value="0"><label for="4-constitution-genkaku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-genkaku" id="4-constitution-genkaku-1" value="1"><label for="4-constitution-genkaku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-genkaku" id="4-constitution-genkaku-2" value="2"><label for="4-constitution-genkaku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">幻聴</th>
                            <td><input type="radio" name="4-constitution-genchou" id="4-constitution-genchou-0" value="0"><label for="4-constitution-genchou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-genchou" id="4-constitution-genchou-1" value="1"><label for="4-constitution-genchou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-genchou" id="4-constitution-genchou-2" value="2"><label for="4-constitution-genchou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">においが気になる</th>
                            <td><input type="radio" name="4-constitution-nioi" id="4-constitution-nioi-0" value="0"><label for="4-constitution-nioi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nioi" id="4-constitution-nioi-1" value="1"><label for="4-constitution-nioi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nioi" id="4-constitution-nioi-2" value="2"><label for="4-constitution-nioi-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter3">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="5">頭痛</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>ズキズキ</th>
                            <td><input type="radio" name="4-constitution-zutsu-zukizuki" id="4-constitution-zutsu-zukizuki-0" value="0"><label for="4-constitution-zutsu-zukizuki-0">×</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-zukizuki" id="4-constitution-zutsu-zukizuki-1" value="1"><label for="4-constitution-zutsu-zukizuki-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-zukizuki" id="4-constitution-zutsu-zukizuki-2" value="2"><label for="4-constitution-zutsu-zukizuki-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>キリキリ</th>
                            <td><input type="radio" name="4-constitution-zutsu-kirikiri" id="4-constitution-zutsu-kirikiri-0" value="0"><label for="4-constitution-zutsu-kirikiri-0">×</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-kirikiri" id="4-constitution-zutsu-kirikiri-1" value="1"><label for="4-constitution-zutsu-kirikiri-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-kirikiri" id="4-constitution-zutsu-kirikiri-2" value="2"><label for="4-constitution-zutsu-kirikiri-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>締め付けられる</th>
                            <td><input type="radio" name="4-constitution-zutsu-shimetsuke" id="4-constitution-zutsu-shimetsuke-0" value="0"><label for="4-constitution-zutsu-shimetsuke-0">×</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-shimetsuke" id="4-constitution-zutsu-shimetsuke-1" value="1"><label for="4-constitution-zutsu-shimetsuke-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-shimetsuke" id="4-constitution-zutsu-shimetsuke-2" value="2"><label for="4-constitution-zutsu-shimetsuke-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他</th>
                            <td><input type="radio" name="4-constitution-zutsu-sonota" id="4-constitution-zutsu-sonota-0" value="0"><label for="4-constitution-zutsu-sonota-0">×</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-sonota" id="4-constitution-zutsu-sonota-1" value="1"><label for="4-constitution-zutsu-sonota-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-zutsu-sonota" id="4-constitution-zutsu-sonota-2" value="2"><label for="4-constitution-zutsu-sonota-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">頭重</th>
                            <td><input type="radio" name="4-constitution-zujuu" id="4-constitution-zujuu-0" value="0"><label for="4-constitution-zujuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-zujuu" id="4-constitution-zujuu-1" value="1"><label for="4-constitution-zujuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-zujuu" id="4-constitution-zujuu-2" value="2"><label for="4-constitution-zujuu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">めまい</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>回転性</th>
                            <td><input type="radio" name="4-constitution-memai-kaiten" id="4-constitution-memai-kaiten-0" value="0"><label for="4-constitution-memai-kaiten-0">×</label></td>
                            <td><input type="radio" name="4-constitution-memai-kaiten" id="4-constitution-memai-kaiten-1" value="1"><label for="4-constitution-memai-kaiten-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-memai-kaiten" id="4-constitution-memai-kaiten-2" value="2"><label for="4-constitution-memai-kaiten-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>非回転性</th>
                            <td><input type="radio" name="4-constitution-memai-hikaiten" id="4-constitution-memai-hikaiten-0" value="0"><label for="4-constitution-memai-hikaiten-0">×</label></td>
                            <td><input type="radio" name="4-constitution-memai-hikaiten" id="4-constitution-memai-hikaiten-1" value="1"><label for="4-constitution-memai-hikaiten-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-memai-hikaiten" id="4-constitution-memai-hikaiten-2" value="2"><label for="4-constitution-memai-hikaiten-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">ふらつき</th>
                            <td><input type="radio" name="4-constitution-furatsuki" id="4-constitution-furatsuki-0" value="0"><label for="4-constitution-furatsuki-0">×</label></td>
                            <td><input type="radio" name="4-constitution-furatsuki" id="4-constitution-furatsuki-1" value="1"><label for="4-constitution-furatsuki-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-furatsuki" id="4-constitution-furatsuki-2" value="2"><label for="4-constitution-furatsuki-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">立ち眩み</th>
                            <td><input type="radio" name="4-constitution-tachikurami" id="4-constitution-tachikurami-0" value="0"><label for="4-constitution-tachikurami-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tachikurami" id="4-constitution-tachikurami-1" value="1"><label for="4-constitution-tachikurami-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tachikurami" id="4-constitution-tachikurami-2" value="2"><label for="4-constitution-tachikurami-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">車酔いしやすい</th>
                            <td><input type="radio" name="4-constitution-kurumayoi" id="4-constitution-kurumayoi-0" value="0"><label for="4-constitution-kurumayoi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kurumayoi" id="4-constitution-kurumayoi-1" value="1"><label for="4-constitution-kurumayoi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kurumayoi" id="4-constitution-kurumayoi-2" value="2"><label for="4-constitution-kurumayoi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">発作性の発汗</th>
                            <td><input type="radio" name="4-constitution-hossaseihakkan" id="4-constitution-hossaseihakkan-0" value="0"><label for="4-constitution-hossaseihakkan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hossaseihakkan" id="4-constitution-hossaseihakkan-1" value="1"><label for="4-constitution-hossaseihakkan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hossaseihakkan" id="4-constitution-hossaseihakkan-2" value="2"><label for="4-constitution-hossaseihakkan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">発作性の熱感（ホットフラッシュ）</th>
                            <td><input type="radio" name="4-constitution-hossaseinetsukan" id="4-constitution-hossaseinetsukan-0" value="0"><label for="4-constitution-hossaseinetsukan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hossaseinetsukan" id="4-constitution-hossaseinetsukan-1" value="1"><label for="4-constitution-hossaseinetsukan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hossaseinetsukan" id="4-constitution-hossaseinetsukan-2" value="2"><label for="4-constitution-hossaseinetsukan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">知覚過敏</th>
                            <td><input type="radio" name="4-constitution-chikakukabin" id="4-constitution-chikakukabin-0" value="0"><label for="4-constitution-chikakukabin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikakukabin" id="4-constitution-chikakukabin-1" value="1"><label for="4-constitution-chikakukabin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikakukabin" id="4-constitution-chikakukabin-2" value="2"><label for="4-constitution-chikakukabin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">知覚麻痺</th>
                            <td><input type="radio" name="4-constitution-chikakumahi" id="4-constitution-chikakumahi-0" value="0"><label for="4-constitution-chikakumahi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikakumahi" id="4-constitution-chikakumahi-1" value="1"><label for="4-constitution-chikakumahi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikakumahi" id="4-constitution-chikakumahi-2" value="2"><label for="4-constitution-chikakumahi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">知覚異常（むずむずなどの異常な感覚）</th>
                            <td><input type="radio" name="4-constitution-chikakuijou" id="4-constitution-chikakuijou-0" value="0"><label for="4-constitution-chikakuijou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chikakuijou" id="4-constitution-chikakuijou-1" value="1"><label for="4-constitution-chikakuijou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chikakuijou" id="4-constitution-chikakuijou-2" value="2"><label for="4-constitution-chikakuijou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">ふるえ</th>
                            <td><input type="radio" name="4-constitution-furue" id="4-constitution-furue-0" value="0"><label for="4-constitution-furue-0">×</label></td>
                            <td><input type="radio" name="4-constitution-furue" id="4-constitution-furue-1" value="1"><label for="4-constitution-furue-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-furue" id="4-constitution-furue-2" value="2"><label for="4-constitution-furue-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">ひきつり</th>
                            <td><input type="radio" name="4-constitution-hikitsuri" id="4-constitution-hikitsuri-0" value="0"><label for="4-constitution-hikitsuri-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hikitsuri" id="4-constitution-hikitsuri-1" value="1"><label for="4-constitution-hikitsuri-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hikitsuri" id="4-constitution-hikitsuri-2" value="2"><label for="4-constitution-hikitsuri-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">けいれん</th>
                            <td><input type="radio" name="4-constitution-keiren" id="4-constitution-keiren-0" value="0"><label for="4-constitution-keiren-0">×</label></td>
                            <td><input type="radio" name="4-constitution-keiren" id="4-constitution-keiren-1" value="1"><label for="4-constitution-keiren-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-keiren" id="4-constitution-keiren-2" value="2"><label for="4-constitution-keiren-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">運動麻痺（身体が動かない）</th>
                            <td><input type="radio" name="4-constitution-undoumahi" id="4-constitution-undoumahi-0" value="0"><label for="4-constitution-undoumahi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-undoumahi" id="4-constitution-undoumahi-1" value="1"><label for="4-constitution-undoumahi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-undoumahi" id="4-constitution-undoumahi-2" value="2"><label for="4-constitution-undoumahi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">顔面神経麻痺</th>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-0" value="0"><label for="4-constitution-nease-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-1" value="1"><label for="4-constitution-nease-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-2" value="2"><label for="4-constitution-nease-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">歩行困難</th>
                            <td><input type="radio" name="4-constitution-hokoukonnan" id="4-constitution-hokoukonnan-0" value="0"><label for="4-constitution-hokoukonnan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hokoukonnan" id="4-constitution-hokoukonnan-1" value="1"><label for="4-constitution-hokoukonnan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hokoukonnan" id="4-constitution-hokoukonnan-2" value="2"><label for="4-constitution-hokoukonnan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">足のもつれ</th>
                            <td><input type="radio" name="4-constitution-ashimotsure" id="4-constitution-ashimotsure-0" value="0"><label for="4-constitution-ashimotsure-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ashimotsure" id="4-constitution-ashimotsure-1" value="1"><label for="4-constitution-ashimotsure-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ashimotsure" id="4-constitution-ashimotsure-2" value="2"><label for="4-constitution-ashimotsure-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">足が上がりにくい</th>
                            <td><input type="radio" name="4-constitution-ashiagarinikui" id="4-constitution-ashiagarinikui-0" value="0"><label for="4-constitution-ashiagarinikui-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ashiagarinikui" id="4-constitution-ashiagarinikui-1" value="1"><label for="4-constitution-ashiagarinikui-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ashiagarinikui" id="4-constitution-ashiagarinikui-2" value="2"><label for="4-constitution-ashiagarinikui-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">つまづきやすい</th>
                            <td><input type="radio" name="4-constitution-tsumaduki" id="4-constitution-tsumaduki-0" value="0"><label for="4-constitution-tsumaduki-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tsumaduki" id="4-constitution-tsumaduki-1" value="1"><label for="4-constitution-tsumaduki-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tsumaduki" id="4-constitution-tsumaduki-2" value="2"><label for="4-constitution-tsumaduki-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">帯状疱疹後の痛み</th>
                            <td><input type="radio" name="4-constitution-taijouhoushin" id="4-constitution-taijouhoushin-0" value="0"><label for="4-constitution-taijouhoushin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-taijouhoushin" id="4-constitution-taijouhoushin-1" value="1"><label for="4-constitution-taijouhoushin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-taijouhoushin" id="4-constitution-taijouhoushin-2" value="2"><label for="4-constitution-taijouhoushin-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chaoter4">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="5">胸が苦しい</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>圧迫感</th>
                            <td><input type="radio" name="4-constitution-mune-appakukan" id="4-constitution-mune-appakukan-0" value="0"><label for="4-constitution-mune-appakukan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mune-appakukan" id="4-constitution-mune-appakukan-1" value="1"><label for="4-constitution-mune-appakukan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mune-appakukan" id="4-constitution-mune-appakukan-2" value="2"><label for="4-constitution-mune-appakukan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>つまった感じ</th>
                            <td><input type="radio" name="4-constitution-mune-tsumatta" id="4-constitution-mune-tsumatta-0" value="0"><label for="4-constitution-mune-tsumatta-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mune-tsumatta" id="4-constitution-mune-tsumatta-1" value="1"><label for="4-constitution-mune-tsumatta-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mune-tsumatta" id="4-constitution-mune-tsumatta-2" value="2"><label for="4-constitution-mune-tsumatta-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>しめつけられる感じ</th>
                            <td><input type="radio" name="4-constitution-mune-shimetsuke" id="4-constitution-mune-shimetsuke-0" value="0"><label for="4-constitution-mune-shimetsuke-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mune-shimetsuke" id="4-constitution-mune-shimetsuke-1" value="1"><label for="4-constitution-mune-shimetsuke-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mune-shimetsuke" id="4-constitution-mune-shimetsuke-2" value="2"><label for="4-constitution-mune-shimetsuke-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>もやもやした</th>
                            <td><input type="radio" name="4-constitution-mune-moyamoya" id="4-constitution-mune-moyamoya-0" value="0"><label for="4-constitution-mune-moyamoya-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mune-moyamoya" id="4-constitution-mune-moyamoya-1" value="1"><label for="4-constitution-mune-moyamoya-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mune-moyamoya" id="4-constitution-mune-moyamoya-2" value="2"><label for="4-constitution-mune-moyamoya-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他</th>
                            <td><input type="radio" name="4-constitution-mune-sonota" id="4-constitution-mune-sonota-0" value="0"><label for="4-constitution-mune-sonota-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mune-sonota" id="4-constitution-mune-sonota-1" value="1"><label for="4-constitution-mune-sonota-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mune-sonota" id="4-constitution-mune-sonota-2" value="2"><label for="4-constitution-mune-sonota-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">胸が痛い</th>
                            <td><input type="radio" name="4-constitution-muneitai" id="4-constitution-muneitai-0" value="0"><label for="4-constitution-muneitai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-muneitai" id="4-constitution-muneitai-1" value="1"><label for="4-constitution-muneitai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-muneitai" id="4-constitution-muneitai-2" value="2"><label for="4-constitution-muneitai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">不整脈（脈の乱れ）</th>
                            <td><input type="radio" name="4-constitution-fuseimyaku" id="4-constitution-fuseimyaku-0" value="0"><label for="4-constitution-fuseimyaku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-fuseimyaku" id="4-constitution-fuseimyaku-1" value="1"><label for="4-constitution-fuseimyaku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-fuseimyaku" id="4-constitution-fuseimyaku-2" value="2"><label for="4-constitution-fuseimyaku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">頻脈</th>
                            <td><input type="radio" name="4-constitution-hinmyaku" id="4-constitution-hinmyaku-0" value="0"><label for="4-constitution-hinmyaku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hinmyaku" id="4-constitution-hinmyaku-1" value="1"><label for="4-constitution-hinmyaku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hinmyaku" id="4-constitution-hinmyaku-2" value="2"><label for="4-constitution-hinmyaku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">徐脈（脈が遅い）</th>
                            <td><input type="radio" name="4-constitution-jomyaku" id="4-constitution-jomyaku-0" value="0"><label for="4-constitution-jomyaku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-jomyaku" id="4-constitution-jomyaku-1" value="1"><label for="4-constitution-jomyaku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-jomyaku" id="4-constitution-jomyaku-2" value="2"><label for="4-constitution-jomyaku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">動悸（拍動を感じる）</th>
                            <td><input type="radio" name="4-constitution-douki" id="4-constitution-douki-0" value="0"><label for="4-constitution-douki-0">×</label></td>
                            <td><input type="radio" name="4-constitution-douki" id="4-constitution-douki-1" value="1"><label for="4-constitution-douki-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-douki" id="4-constitution-douki-2" value="2"><label for="4-constitution-douki-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">静脈瘤</th>
                            <td><input type="radio" name="4-constitution-joumyakuryu" id="4-constitution-joumyakuryu-0" value="0"><label for="4-constitution-joumyakuryu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-joumyakuryu" id="4-constitution-joumyakuryu-1" value="1"><label for="4-constitution-joumyakuryu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-joumyakuryu" id="4-constitution-joumyakuryu-2" value="2"><label for="4-constitution-joumyakuryu-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter5">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="5">咳</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>空咳</th>
                            <td><input type="radio" name="4-constitution-seki-karazeki" id="4-constitution-seki-karazeki-0" value="0"><label for="4-constitution-seki-karazeki-0">×</label></td>
                            <td><input type="radio" name="4-constitution-seki-karazeki" id="4-constitution-seki-karazeki-1" value="1"><label for="4-constitution-seki-karazeki-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-seki-karazeki" id="4-constitution-seki-karazeki-2" value="2"><label for="4-constitution-seki-karazeki-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>痰がからむ</th>
                            <td><input type="radio" name="4-constitution-seki-tan" id="4-constitution-seki-tan-0" value="0"><label for="4-constitution-seki-tan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-seki-tan" id="4-constitution-seki-tan-1" value="1"><label for="4-constitution-seki-tan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-seki-tan" id="4-constitution-seki-tan-2" value="2"><label for="4-constitution-seki-tan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">痰</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>水のような</th>
                            <td><input type="radio" name="4-constitution-tan-mizu" id="4-constitution-tan-mizu-0" value="0"><label for="4-constitution-tan-mizu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tan-mizu" id="4-constitution-tan-mizu-1" value="1"><label for="4-constitution-tan-mizu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tan-mizu" id="4-constitution-tan-mizu-2" value="2"><label for="4-constitution-tan-mizu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>粘っこい</th>
                            <td><input type="radio" name="4-constitution-tan-nebakkoi" id="4-constitution-tan-nebakkoi-0" value="0"><label for="4-constitution-tan-nebakkoi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tan-nebakkoi" id="4-constitution-tan-nebakkoi-1" value="1"><label for="4-constitution-tan-nebakkoi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tan-nebakkoi" id="4-constitution-tan-nebakkoi-2" value="2"><label for="4-constitution-tan-nebakkoi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>膿のような</th>
                            <td><input type="radio" name="4-constitution-tan-umi" id="4-constitution-tan-umi-0" value="0"><label for="4-constitution-tan-umi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tan-umi" id="4-constitution-tan-umi-1" value="1"><label for="4-constitution-tan-umi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tan-umi" id="4-constitution-tan-umi-2" value="2"><label for="4-constitution-tan-umi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">呼吸困難</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>安静時</th>
                            <td><input type="radio" name="4-constitution-kokyukonnan-ansei" id="4-constitution-kokyukonnan-ansei-0" value="0"><label for="4-constitution-kokyukonnan-ansei-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kokyukonnan-ansei" id="4-constitution-kokyukonnan-ansei-1" value="1"><label for="4-constitution-kokyukonnan-ansei-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kokyukonnan-ansei" id="4-constitution-kokyukonnan-ansei-2" value="2"><label for="4-constitution-kokyukonnan-ansei-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>運動時</th>
                            <td><input type="radio" name="4-constitution-kokyukonnan-undou" id="4-constitution-kokyukonnan-undou-0" value="0"><label for="4-constitution-kokyukonnan-undou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kokyukonnan-undou" id="4-constitution-kokyukonnan-undou-1" value="1"><label for="4-constitution-kokyukonnan-undou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kokyukonnan-undou" id="4-constitution-kokyukonnan-undou-2" value="2"><label for="4-constitution-kokyukonnan-undou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">血痰</th>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-0" value="0"><label for="4-constitution-nease-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-1" value="1"><label for="4-constitution-nease-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-2" value="2"><label for="4-constitution-nease-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">喀血</th>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-0" value="0"><label for="4-constitution-nease-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-1" value="1"><label for="4-constitution-nease-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-2" value="2"><label for="4-constitution-nease-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">息切れ</th>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-0" value="0"><label for="4-constitution-nease-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-1" value="1"><label for="4-constitution-nease-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-2" value="2"><label for="4-constitution-nease-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">起座呼吸（座位にしていないと苦しい）</th>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-0" value="0"><label for="4-constitution-nease-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-1" value="1"><label for="4-constitution-nease-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-2" value="2"><label for="4-constitution-nease-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">チアノーゼ</th>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-0" value="0"><label for="4-constitution-nease-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-1" value="1"><label for="4-constitution-nease-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nease" id="4-constitution-nease-2" value="2"><label for="4-constitution-nease-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>                        <tr>
                            <th colspan="2">食後に眠気やだるさを感じる</th>
                            <td><input type="radio" name="4-constitution-syokugodarui" id="4-constitution-syokugodarui-0" value="0"><label for="4-constitution-syokugodarui-0">×</label></td>
                            <td><input type="radio" name="4-constitution-syokugodarui" id="4-constitution-syokugodarui-1" value="1"><label for="4-constitution-syokugodarui-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-syokugodarui" id="4-constitution-syokugodarui-2" value="2"><label for="4-constitution-syokugodarui-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">食べ過ぎるとすぐ胃腸の調子が悪くなる</th>
                            <td><input type="radio" name="4-constitution-tabesugi" id="4-constitution-tabesugi-0" value="0"><label for="4-constitution-tabesugi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tabesugi" id="4-constitution-tabesugi-1" value="1"><label for="4-constitution-tabesugi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tabesugi" id="4-constitution-tabesugi-2" value="2"><label for="4-constitution-tabesugi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">すぐ下痢をする</th>
                            <td><input type="radio" name="4-constitution-geri" id="4-constitution-geri-0" value="0"><label for="4-constitution-geri-0">×</label></td>
                            <td><input type="radio" name="4-constitution-geri" id="4-constitution-geri-1" value="1"><label for="4-constitution-geri-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-geri" id="4-constitution-geri-2" value="2"><label for="4-constitution-geri-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">少し食べると腹が張って食べられない</th>
                            <td><input type="radio" name="4-constitution-taberutoharahari" id="4-constitution-taberutoharahari-0" value="0"><label for="4-constitution-taberutoharahari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-taberutoharahari" id="4-constitution-taberutoharahari-1" value="1"><label for="4-constitution-taberutoharahari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-taberutoharahari" id="4-constitution-taberutoharahari-2" value="2"><label for="4-constitution-taberutoharahari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">嘔吐</th>
                            <td><input type="radio" name="4-constitution-outo" id="4-constitution-outo-0" value="0"><label for="4-constitution-outo-0">×</label></td>
                            <td><input type="radio" name="4-constitution-outo" id="4-constitution-outo-1" value="1"><label for="4-constitution-outo-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-outo" id="4-constitution-outo-2" value="2"><label for="4-constitution-outo-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">吐血</th>
                            <td><input type="radio" name="4-constitution-toketsu" id="4-constitution-toketsu-0" value="0"><label for="4-constitution-toketsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-toketsu" id="4-constitution-toketsu-1" value="1"><label for="4-constitution-toketsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-toketsu" id="4-constitution-toketsu-2" value="2"><label for="4-constitution-toketsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">呑気症（空気を飲んでしまう）</th>
                            <td><input type="radio" name="4-constitution-donkishou" id="4-constitution-donkishou-0" value="0"><label for="4-constitution-donkishou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-donkishou" id="4-constitution-donkishou-1" value="1"><label for="4-constitution-donkishou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-donkishou" id="4-constitution-donkishou-2" value="2"><label for="4-constitution-donkishou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">げっぷ</th>
                            <td><input type="radio" name="4-constitution-geppu" id="4-constitution-geppu-0" value="0"><label for="4-constitution-geppu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-geppu" id="4-constitution-geppu-1" value="1"><label for="4-constitution-geppu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-geppu" id="4-constitution-geppu-2" value="2"><label for="4-constitution-geppu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">悪心・吐き気</th>
                            <td><input type="radio" name="4-constitution-akushin" id="4-constitution-akushin-0" value="0"><label for="4-constitution-akushin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-akushin" id="4-constitution-akushin-1" value="1"><label for="4-constitution-akushin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-akushin" id="4-constitution-akushin-2" value="2"><label for="4-constitution-akushin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">胸やけ</th>
                            <td><input type="radio" name="4-constitution-muneyake" id="4-constitution-muneyake-0" value="0"><label for="4-constitution-muneyake-0">×</label></td>
                            <td><input type="radio" name="4-constitution-muneyake" id="4-constitution-muneyake-1" value="1"><label for="4-constitution-muneyake-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-muneyake" id="4-constitution-muneyake-2" value="2"><label for="4-constitution-muneyake-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">胃酸が上がってくる</th>
                            <td><input type="radio" name="4-constitution-isan" id="4-constitution-isan-0" value="0"><label for="4-constitution-isan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-isan" id="4-constitution-isan-1" value="1"><label for="4-constitution-isan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-isan" id="4-constitution-isan-2" value="2"><label for="4-constitution-isan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">胃もたれ</th>
                            <td><input type="radio" name="4-constitution-imotare" id="4-constitution-imotare-0" value="0"><label for="4-constitution-imotare-0">×</label></td>
                            <td><input type="radio" name="4-constitution-imotare" id="4-constitution-imotare-1" value="1"><label for="4-constitution-imotare-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-imotare" id="4-constitution-imotare-2" value="2"><label for="4-constitution-imotare-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">胃の不快感</th>
                            <td><input type="radio" name="4-constitution-inofukaikan" id="4-constitution-inofukaikan-0" value="0"><label for="4-constitution-inofukaikan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-inofukaikan" id="4-constitution-inofukaikan-1" value="1"><label for="4-constitution-inofukaikan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-inofukaikan" id="4-constitution-inofukaikan-2" value="2"><label for="4-constitution-inofukaikan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">食べ物が胸につかえる</th>
                            <td><input type="radio" name="4-constitution-tabemonomunetukae" id="4-constitution-tabemonomunetukae-0" value="0"><label for="4-constitution-tabemonomunetukae-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tabemonomunetukae" id="4-constitution-tabemonomunetukae-1" value="1"><label for="4-constitution-tabemonomunetukae-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tabemonomunetukae" id="4-constitution-tabemonomunetukae-2" value="2"><label for="4-constitution-tabemonomunetukae-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">腹痛</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>上腹</th>
                            <td><input type="radio" name="4-constitution-hukutsuu-uebara" id="4-constitution-hukutsuu-uebara-0" value="0"><label for="4-constitution-hukutsuu-uebara-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hukutsuu-uebara" id="4-constitution-hukutsuu-uebara-1" value="1"><label for="4-constitution-hukutsuu-uebara-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hukutsuu-uebara" id="4-constitution-hukutsuu-uebara-2" value="2"><label for="4-constitution-hukutsuu-uebara-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>下腹</th>
                            <td><input type="radio" name="4-constitution-hukutsuu-shitabara" id="4-constitution-hukutsuu-shitabara-0" value="0"><label for="4-constitution-hukutsuu-shitabara-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hukutsuu-shitabara" id="4-constitution-hukutsuu-shitabara-1" value="1"><label for="4-constitution-hukutsuu-shitabara-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hukutsuu-shitabara" id="4-constitution-hukutsuu-shitabara-2" value="2"><label for="4-constitution-hukutsuu-shitabara-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>移動性</th>
                            <td><input type="radio" name="4-constitution-hukutsuu-idousei" id="4-constitution-hukutsuu-idousei-0" value="0"><label for="4-constitution-hukutsuu-idousei-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hukutsuu-idousei" id="4-constitution-hukutsuu-idousei-1" value="1"><label for="4-constitution-hukutsuu-idousei-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hukutsuu-idousei" id="4-constitution-hukutsuu-idousei-2" value="2"><label for="4-constitution-hukutsuu-idousei-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">季肋部（肋骨の一番下当たり）の痛み</th>
                            <td><input type="radio" name="4-constitution-kirokubuitami" id="4-constitution-kirokubuitami-0" value="0"><label for="4-constitution-kirokubuitami-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kirokubuitami" id="4-constitution-kirokubuitami-1" value="1"><label for="4-constitution-kirokubuitami-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kirokubuitami" id="4-constitution-kirokubuitami-2" value="2"><label for="4-constitution-kirokubuitami-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">季肋部が苦しい</th>
                            <td><input type="radio" name="4-constitution-kirokubukurushii" id="4-constitution-kirokubukurushii-0" value="0"><label for="4-constitution-kirokubukurushii-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kirokubukurushii" id="4-constitution-kirokubukurushii-1" value="1"><label for="4-constitution-kirokubukurushii-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kirokubukurushii" id="4-constitution-kirokubukurushii-2" value="2"><label for="4-constitution-kirokubukurushii-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">腹がごろごろする</th>
                            <td><input type="radio" name="4-constitution-haragagorogoro" id="4-constitution-haragagorogoro-0" value="0"><label for="4-constitution-haragagorogoro-0">×</label></td>
                            <td><input type="radio" name="4-constitution-haragagorogoro" id="4-constitution-haragagorogoro-1" value="1"><label for="4-constitution-haragagorogoro-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-haragagorogoro" id="4-constitution-haragagorogoro-2" value="2"><label for="4-constitution-haragagorogoro-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">放屁（おなら）</th>
                            <td><input type="radio" name="4-constitution-houhi" id="4-constitution-houhi-0" value="0"><label for="4-constitution-houhi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-houhi" id="4-constitution-houhi-1" value="1"><label for="4-constitution-houhi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-houhi" id="4-constitution-houhi-2" value="2"><label for="4-constitution-houhi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">便意を頻回に催す</th>
                            <td><input type="radio" name="4-constitution-benihinkai" id="4-constitution-benihinkai-0" value="0"><label for="4-constitution-benihinkai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-benihinkai" id="4-constitution-benihinkai-1" value="1"><label for="4-constitution-benihinkai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-benihinkai" id="4-constitution-benihinkai-2" value="2"><label for="4-constitution-benihinkai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">血便</th>
                            <td><input type="radio" name="4-constitution-ketsuben" id="4-constitution-ketsuben-0" value="0"><label for="4-constitution-ketsuben-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ketsuben" id="4-constitution-ketsuben-1" value="1"><label for="4-constitution-ketsuben-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ketsuben" id="4-constitution-ketsuben-2" value="2"><label for="4-constitution-ketsuben-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">下血</th>
                            <td><input type="radio" name="4-constitution-geketsu" id="4-constitution-geketsu-0" value="0"><label for="4-constitution-geketsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-geketsu" id="4-constitution-geketsu-1" value="1"><label for="4-constitution-geketsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-geketsu" id="4-constitution-geketsu-2" value="2"><label for="4-constitution-geketsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">痔</th>
                            <td><input type="radio" name="4-constitution-ji" id="4-constitution-ji-0" value="0"><label for="4-constitution-ji-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ji" id="4-constitution-ji-1" value="1"><label for="4-constitution-ji-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ji" id="4-constitution-ji-2" value="2"><label for="4-constitution-ji-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">脱肛</th>
                            <td><input type="radio" name="4-constitution-dakkou" id="4-constitution-dakkou-0" value="0"><label for="4-constitution-dakkou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-dakkou" id="4-constitution-dakkou-1" value="1"><label for="4-constitution-dakkou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-dakkou" id="4-constitution-dakkou-2" value="2"><label for="4-constitution-dakkou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">肛門痛</th>
                            <td><input type="radio" name="4-constitution-koumontsuu" id="4-constitution-koumontsuu-0" value="0"><label for="4-constitution-koumontsuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-koumontsuu" id="4-constitution-koumontsuu-1" value="1"><label for="4-constitution-koumontsuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-koumontsuu" id="4-constitution-koumontsuu-2" value="2"><label for="4-constitution-koumontsuu-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">眼痛</th>
                            <td><input type="radio" name="4-constitution-ganntsuu" id="4-constitution-ganntsuu-0" value="0"><label for="4-constitution-ganntsuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ganntsuu" id="4-constitution-ganntsuu-1" value="1"><label for="4-constitution-ganntsuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ganntsuu" id="4-constitution-ganntsuu-2" value="2"><label for="4-constitution-ganntsuu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">視力低下</th>
                            <td><input type="radio" name="4-constitution-shisyokuteika" id="4-constitution-shisyokuteika-0" value="0"><label for="4-constitution-shisyokuteika-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shisyokuteika" id="4-constitution-shisyokuteika-1" value="1"><label for="4-constitution-shisyokuteika-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shisyokuteika" id="4-constitution-shisyokuteika-2" value="2"><label for="4-constitution-shisyokuteika-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目の疲れ</th>
                            <td><input type="radio" name="4-constitution-menotsukare" id="4-constitution-menotsukare-0" value="0"><label for="4-constitution-menotsukare-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menotsukare" id="4-constitution-menotsukare-1" value="1"><label for="4-constitution-menotsukare-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menotsukare" id="4-constitution-menotsukare-2" value="2"><label for="4-constitution-menotsukare-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目のかすみ</th>
                            <td><input type="radio" name="4-constitution-menokasumi" id="4-constitution-menokasumi-0" value="0"><label for="4-constitution-menokasumi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menokasumi" id="4-constitution-menokasumi-1" value="1"><label for="4-constitution-menokasumi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menokasumi" id="4-constitution-menokasumi-2" value="2"><label for="4-constitution-menokasumi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目の充血</th>
                            <td><input type="radio" name="4-constitution-menojuuketsu" id="4-constitution-menojuuketsu-0" value="0"><label for="4-constitution-menojuuketsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menojuuketsu" id="4-constitution-menojuuketsu-1" value="1"><label for="4-constitution-menojuuketsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menojuuketsu" id="4-constitution-menojuuketsu-2" value="2"><label for="4-constitution-menojuuketsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目のかゆみ</th>
                            <td><input type="radio" name="4-constitution-menokayumi" id="4-constitution-menokayumi-0" value="0"><label for="4-constitution-menokayumi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menokayumi" id="4-constitution-menokayumi-1" value="1"><label for="4-constitution-menokayumi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menokayumi" id="4-constitution-menokayumi-2" value="2"><label for="4-constitution-menokayumi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目の乾燥</th>
                            <td><input type="radio" name="4-constitution-menokansou" id="4-constitution-menokansou-0" value="0"><label for="4-constitution-menokansou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menokansou" id="4-constitution-menokansou-1" value="1"><label for="4-constitution-menokansou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menokansou" id="4-constitution-menokansou-2" value="2"><label for="4-constitution-menokansou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">まぶしい</th>
                            <td><input type="radio" name="4-constitution-mabushii" id="4-constitution-mabushii-0" value="0"><label for="4-constitution-mabushii-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mabushii" id="4-constitution-mabushii-1" value="1"><label for="4-constitution-mabushii-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mabushii" id="4-constitution-mabushii-2" value="2"><label for="4-constitution-mabushii-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目のゴロゴロ感</th>
                            <td><input type="radio" name="4-constitution-menogorogoro" id="4-constitution-menogorogoro-0" value="0"><label for="4-constitution-menogorogoro-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menogorogoro" id="4-constitution-menogorogoro-1" value="1"><label for="4-constitution-menogorogoro-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menogorogoro" id="4-constitution-menogorogoro-2" value="2"><label for="4-constitution-menogorogoro-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目のヒリヒリ感</th>
                            <td><input type="radio" name="4-constitution-menohirihiri" id="4-constitution-menohirihiri-0" value="0"><label for="4-constitution-menohirihiri-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menohirihiri" id="4-constitution-menohirihiri-1" value="1"><label for="4-constitution-menohirihiri-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menohirihiri" id="4-constitution-menohirihiri-2" value="2"><label for="4-constitution-menohirihiri-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">目やに</th>
                            <td><input type="radio" name="4-constitution-meyani" id="4-constitution-meyani-0" value="0"><label for="4-constitution-meyani-0">×</label></td>
                            <td><input type="radio" name="4-constitution-meyani" id="4-constitution-meyani-1" value="1"><label for="4-constitution-meyani-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-meyani" id="4-constitution-meyani-2" value="2"><label for="4-constitution-meyani-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">眼瞼下垂</th>
                            <td><input type="radio" name="4-constitution-gankenkasui" id="4-constitution-gankenkasui-0" value="0"><label for="4-constitution-gankenkasui-0">×</label></td>
                            <td><input type="radio" name="4-constitution-gankenkasui" id="4-constitution-gankenkasui-1" value="1"><label for="4-constitution-gankenkasui-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-gankenkasui" id="4-constitution-gankenkasui-2" value="2"><label for="4-constitution-gankenkasui-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">複視（物が二重に見える）</th>
                            <td><input type="radio" name="4-constitution-fukushi" id="4-constitution-fukushi-0" value="0"><label for="4-constitution-fukushi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-fukushi" id="4-constitution-fukushi-1" value="1"><label for="4-constitution-fukushi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-fukushi" id="4-constitution-fukushi-2" value="2"><label for="4-constitution-fukushi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">視野狭窄</th>
                            <td><input type="radio" name="4-constitution-siyakyousaku" id="4-constitution-siyakyousaku-0" value="0"><label for="4-constitution-siyakyousaku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-siyakyousaku" id="4-constitution-siyakyousaku-1" value="1"><label for="4-constitution-siyakyousaku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-siyakyousaku" id="4-constitution-siyakyousaku-2" value="2"><label for="4-constitution-siyakyousaku-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">耳鳴り</th>
                            <td><input type="radio" name="4-constitution-miminari" id="4-constitution-miminari-0" value="0"><label for="4-constitution-miminari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-miminari" id="4-constitution-miminari-1" value="1"><label for="4-constitution-miminari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-miminari" id="4-constitution-miminari-2" value="2"><label for="4-constitution-miminari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">頭鳴</th>
                            <td><input type="radio" name="4-constitution-atamanari" id="4-constitution-atamanari-0" value="0"><label for="4-constitution-atamanari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-atamanari" id="4-constitution-atamanari-1" value="1"><label for="4-constitution-atamanari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-atamanari" id="4-constitution-atamanari-2" value="2"><label for="4-constitution-atamanari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">耳閉感</th>
                            <td><input type="radio" name="4-constitution-jiheikan" id="4-constitution-jiheikan-0" value="0"><label for="4-constitution-jiheikan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-jiheikan" id="4-constitution-jiheikan-1" value="1"><label for="4-constitution-jiheikan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-jiheikan" id="4-constitution-jiheikan-2" value="2"><label for="4-constitution-jiheikan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">難聴</th>
                            <td><input type="radio" name="4-constitution-nanchou" id="4-constitution-nanchou-0" value="0"><label for="4-constitution-nanchou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nanchou" id="4-constitution-nanchou-1" value="1"><label for="4-constitution-nanchou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nanchou" id="4-constitution-nanchou-2" value="2"><label for="4-constitution-nanchou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">耳垂れ</th>
                            <td><input type="radio" name="4-constitution-mimidare" id="4-constitution-mimidare-0" value="0"><label for="4-constitution-mimidare-0">×</label></td>
                            <td><input type="radio" name="4-constitution-mimidare" id="4-constitution-mimidare-1" value="1"><label for="4-constitution-mimidare-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-mimidare" id="4-constitution-mimidare-2" value="2"><label for="4-constitution-mimidare-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">くしゃみ</th>
                            <td><input type="radio" name="4-constitution-kushami" id="4-constitution-kushami-0" value="0"><label for="4-constitution-kushami-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kushami" id="4-constitution-kushami-1" value="1"><label for="4-constitution-kushami-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kushami" id="4-constitution-kushami-2" value="2"><label for="4-constitution-kushami-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">鼻汁</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>水のような</th>
                            <td><input type="radio" name="4-constitution-hanajiru-mizunoyouna" id="4-constitution-hanajiru-mizunoyouna-0" value="0"><label for="4-constitution-hanajiru-mizunoyouna-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hanajiru-mizunoyouna" id="4-constitution-hanajiru-mizunoyouna-1" value="1"><label for="4-constitution-hanajiru-mizunoyouna-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hanajiru-mizunoyouna" id="4-constitution-hanajiru-mizunoyouna-2" value="2"><label for="4-constitution-hanajiru-mizunoyouna-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>粘っこい</th>
                            <td><input type="radio" name="4-constitution-hanajiru-nebakkoi" id="4-constitution-hanajiru-nebakkoi-0" value="0"><label for="4-constitution-hanajiru-nebakkoi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hanajiru-nebakkoi" id="4-constitution-hanajiru-nebakkoi-1" value="1"><label for="4-constitution-hanajiru-nebakkoi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hanajiru-nebakkoi" id="4-constitution-hanajiru-nebakkoi-2" value="2"><label for="4-constitution-hanajiru-nebakkoi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>膿のような</th>
                            <td><input type="radio" name="4-constitution-hanajiru-umi" id="4-constitution-hanajiru-umi-0" value="0"><label for="4-constitution-hanajiru-umi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hanajiru-umi" id="4-constitution-hanajiru-umi-1" value="1"><label for="4-constitution-hanajiru-umi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hanajiru-umi" id="4-constitution-hanajiru-umi-2" value="2"><label for="4-constitution-hanajiru-umi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">鼻づまり</th>
                            <td><input type="radio" name="4-constitution-hanazumari" id="4-constitution-hanazumari-0" value="0"><label for="4-constitution-hanazumari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hanazumari" id="4-constitution-hanazumari-1" value="1"><label for="4-constitution-hanazumari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hanazumari" id="4-constitution-hanazumari-2" value="2"><label for="4-constitution-hanazumari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">鼻が重い</th>
                            <td><input type="radio" name="4-constitution-hanaomoi" id="4-constitution-hanaomoi-0" value="0"><label for="4-constitution-hanaomoi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hanaomoi" id="4-constitution-hanaomoi-1" value="1"><label for="4-constitution-hanaomoi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hanaomoi" id="4-constitution-hanaomoi-2" value="2"><label for="4-constitution-hanaomoi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">後鼻漏（鼻汁がのどに落ちる）</th>
                            <td><input type="radio" name="4-constitution-koubirou" id="4-constitution-koubirou-0" value="0"><label for="4-constitution-koubirou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-koubirou" id="4-constitution-koubirou-1" value="1"><label for="4-constitution-koubirou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-koubirou" id="4-constitution-koubirou-2" value="2"><label for="4-constitution-koubirou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">鼻出血</th>
                            <td><input type="radio" name="4-constitution-hanashukketsu" id="4-constitution-hanashukketsu-0" value="0"><label for="4-constitution-hanashukketsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hanashukketsu" id="4-constitution-hanashukketsu-1" value="1"><label for="4-constitution-hanashukketsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hanashukketsu" id="4-constitution-hanashukketsu-2" value="2"><label for="4-constitution-hanashukketsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">いびき</th>
                            <td><input type="radio" name="4-constitution-ibiki" id="4-constitution-ibiki-0" value="0"><label for="4-constitution-ibiki-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ibiki" id="4-constitution-ibiki-1" value="1"><label for="4-constitution-ibiki-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ibiki" id="4-constitution-ibiki-2" value="2"><label for="4-constitution-ibiki-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">臭いがわからない</th>
                            <td><input type="radio" name="4-constitution-nioiwakaranai" id="4-constitution-nioiwakaranai-0" value="0"><label for="4-constitution-nioiwakaranai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nioiwakaranai" id="4-constitution-nioiwakaranai-1" value="1"><label for="4-constitution-nioiwakaranai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nioiwakaranai" id="4-constitution-nioiwakaranai-2" value="2"><label for="4-constitution-nioiwakaranai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">味がしない</th>
                            <td><input type="radio" name="4-constitution-ajishinai" id="4-constitution-ajishinai-0" value="0"><label for="4-constitution-ajishinai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ajishinai" id="4-constitution-ajishinai-1" value="1"><label for="4-constitution-ajishinai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ajishinai" id="4-constitution-ajishinai-2" value="2"><label for="4-constitution-ajishinai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">味がおかしい</th>
                            <td><input type="radio" name="4-constitution-ajiokashii" id="4-constitution-ajiokashii-0" value="0"><label for="4-constitution-ajiokashii-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ajiokashii" id="4-constitution-ajiokashii-1" value="1"><label for="4-constitution-ajiokashii-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ajiokashii" id="4-constitution-ajiokashii-2" value="2"><label for="4-constitution-ajiokashii-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">くちびるが乾く</th>
                            <td><input type="radio" name="4-constitution-kuchibirukawaku" id="4-constitution-kuchibirukawaku-0" value="0"><label for="4-constitution-kuchibirukawaku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kuchibirukawaku" id="4-constitution-kuchibirukawaku-1" value="1"><label for="4-constitution-kuchibirukawaku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kuchibirukawaku" id="4-constitution-kuchibirukawaku-2" value="2"><label for="4-constitution-kuchibirukawaku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">口渇（水を飲みたい）</th>
                            <td><input type="radio" name="4-constitution-koukatsu" id="4-constitution-koukatsu-0" value="0"><label for="4-constitution-koukatsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-koukatsu" id="4-constitution-koukatsu-1" value="1"><label for="4-constitution-koukatsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-koukatsu" id="4-constitution-koukatsu-2" value="2"><label for="4-constitution-koukatsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">口乾（口を湿らせたい）</th>
                            <td><input type="radio" name="4-constitution-koukan" id="4-constitution-koukan-0" value="0"><label for="4-constitution-koukan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-koukan" id="4-constitution-koukan-1" value="1"><label for="4-constitution-koukan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-koukan" id="4-constitution-koukan-2" value="2"><label for="4-constitution-koukan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">口の苦み・粘つき</th>
                            <td><input type="radio" name="4-constitution-kuchinigami" id="4-constitution-kuchinigami-0" value="0"><label for="4-constitution-kuchinigami-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kuchinigami" id="4-constitution-kuchinigami-1" value="1"><label for="4-constitution-kuchinigami-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kuchinigami" id="4-constitution-kuchinigami-2" value="2"><label for="4-constitution-kuchinigami-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">口臭</th>
                            <td><input type="radio" name="4-constitution-koushuu" id="4-constitution-koushuu-0" value="0"><label for="4-constitution-koushuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-koushuu" id="4-constitution-koushuu-1" value="1"><label for="4-constitution-koushuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-koushuu" id="4-constitution-koushuu-2" value="2"><label for="4-constitution-koushuu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">口内炎</th>
                            <td><input type="radio" name="4-constitution-kounaien" id="4-constitution-kounaien-0" value="0"><label for="4-constitution-kounaien-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kounaien" id="4-constitution-kounaien-1" value="1"><label for="4-constitution-kounaien-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kounaien" id="4-constitution-kounaien-2" value="2"><label for="4-constitution-kounaien-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">舌がしみる</th>
                            <td><input type="radio" name="4-constitution-shitashimiru" id="4-constitution-shitashimiru-0" value="0"><label for="4-constitution-shitashimiru-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shitashimiru" id="4-constitution-shitashimiru-1" value="1"><label for="4-constitution-shitashimiru-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shitashimiru" id="4-constitution-shitashimiru-2" value="2"><label for="4-constitution-shitashimiru-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">舌痛</th>
                            <td><input type="radio" name="4-constitution-zetsutsuu" id="4-constitution-zetsutsuu-0" value="0"><label for="4-constitution-zetsutsuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-zetsutsuu" id="4-constitution-zetsutsuu-1" value="1"><label for="4-constitution-zetsutsuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-zetsutsuu" id="4-constitution-zetsutsuu-2" value="2"><label for="4-constitution-zetsutsuu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">歯痛</th>
                            <td><input type="radio" name="4-constitution-shitsuu" id="4-constitution-shitsuu-0" value="0"><label for="4-constitution-shitsuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shitsuu" id="4-constitution-shitsuu-1" value="1"><label for="4-constitution-shitsuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shitsuu" id="4-constitution-shitsuu-2" value="2"><label for="4-constitution-shitsuu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">歯ぐきの痛み</th>
                            <td><input type="radio" name="4-constitution-hagukiitami" id="4-constitution-hagukiitami-0" value="0"><label for="4-constitution-hagukiitami-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hagukiitami" id="4-constitution-hagukiitami-1" value="1"><label for="4-constitution-hagukiitami-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hagukiitami" id="4-constitution-hagukiitami-2" value="2"><label for="4-constitution-hagukiitami-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">嚥下困難</th>
                            <td><input type="radio" name="4-constitution-engekonnan" id="4-constitution-engekonnan-0" value="0"><label for="4-constitution-engekonnan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-engekonnan" id="4-constitution-engekonnan-1" value="1"><label for="4-constitution-engekonnan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-engekonnan" id="4-constitution-engekonnan-2" value="2"><label for="4-constitution-engekonnan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">のどの痛み</th>
                            <td><input type="radio" name="4-constitution-nodoitami" id="4-constitution-nodoitami-0" value="0"><label for="4-constitution-nodoitami-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nodoitami" id="4-constitution-nodoitami-1" value="1"><label for="4-constitution-nodoitami-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nodoitami" id="4-constitution-nodoitami-2" value="2"><label for="4-constitution-nodoitami-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">のどの奥の乾燥</th>
                            <td><input type="radio" name="4-constitution-nodookukansou" id="4-constitution-nodookukansou-0" value="0"><label for="4-constitution-nodookukansou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nodookukansou" id="4-constitution-nodookukansou-1" value="1"><label for="4-constitution-nodookukansou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nodookukansou" id="4-constitution-nodookukansou-2" value="2"><label for="4-constitution-nodookukansou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">のどのつまった感じ</th>
                            <td><input type="radio" name="4-constitution-nodotsumatta" id="4-constitution-nodotsumatta-0" value="0"><label for="4-constitution-nodotsumatta-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nodotsumatta" id="4-constitution-nodotsumatta-1" value="1"><label for="4-constitution-nodotsumatta-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nodotsumatta" id="4-constitution-nodotsumatta-2" value="2"><label for="4-constitution-nodotsumatta-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">のどのイガイガ</th>
                            <td><input type="radio" name="4-constitution-nodoigaiga" id="4-constitution-nodoigaiga-0" value="0"><label for="4-constitution-nodoigaiga-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nodoigaiga" id="4-constitution-nodoigaiga-1" value="1"><label for="4-constitution-nodoigaiga-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nodoigaiga" id="4-constitution-nodoigaiga-2" value="2"><label for="4-constitution-nodoigaiga-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">しゃっくり</th>
                            <td><input type="radio" name="4-constitution-shakkuri" id="4-constitution-shakkuri-0" value="0"><label for="4-constitution-shakkuri-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shakkuri" id="4-constitution-shakkuri-1" value="1"><label for="4-constitution-shakkuri-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shakkuri" id="4-constitution-shakkuri-2" value="2"><label for="4-constitution-shakkuri-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">声かすれ</th>
                            <td><input type="radio" name="4-constitution-koekasure" id="4-constitution-koekasure-0" value="0"><label for="4-constitution-koekasure-0">×</label></td>
                            <td><input type="radio" name="4-constitution-koekasure" id="4-constitution-koekasure-1" value="1"><label for="4-constitution-koekasure-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-koekasure" id="4-constitution-koekasure-2" value="2"><label for="4-constitution-koekasure-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">発疹・湿疹</th>
                            <td><input type="radio" name="4-constitution-hasshin" id="4-constitution-hasshin-0" value="0"><label for="4-constitution-hasshin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hasshin" id="4-constitution-hasshin-1" value="1"><label for="4-constitution-hasshin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hasshin" id="4-constitution-hasshin-2" value="2"><label for="4-constitution-hasshin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">にきび</th>
                            <td><input type="radio" name="4-constitution-nikibi" id="4-constitution-nikibi-0" value="0"><label for="4-constitution-nikibi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nikibi" id="4-constitution-nikibi-1" value="1"><label for="4-constitution-nikibi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nikibi" id="4-constitution-nikibi-2" value="2"><label for="4-constitution-nikibi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">アトピー性皮膚炎</th>
                            <td><input type="radio" name="4-constitution-atopy" id="4-constitution-atopy-0" value="0"><label for="4-constitution-atopy-0">×</label></td>
                            <td><input type="radio" name="4-constitution-atopy" id="4-constitution-atopy-1" value="1"><label for="4-constitution-atopy-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-atopy" id="4-constitution-atopy-2" value="2"><label for="4-constitution-atopy-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">じんましん</th>
                            <td><input type="radio" name="4-constitution-jinmashin" id="4-constitution-jinmashin-0" value="0"><label for="4-constitution-jinmashin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-jinmashin" id="4-constitution-jinmashin-1" value="1"><label for="4-constitution-jinmashin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-jinmashin" id="4-constitution-jinmashin-2" value="2"><label for="4-constitution-jinmashin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">しもやけ</th>
                            <td><input type="radio" name="4-constitution-shimoyake" id="4-constitution-shimoyake-0" value="0"><label for="4-constitution-shimoyake-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shimoyake" id="4-constitution-shimoyake-1" value="1"><label for="4-constitution-shimoyake-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shimoyake" id="4-constitution-shimoyake-2" value="2"><label for="4-constitution-shimoyake-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">肌荒れ</th>
                            <td><input type="radio" name="4-constitution-hadaare" id="4-constitution-hadaare-0" value="0"><label for="4-constitution-hadaare-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hadaare" id="4-constitution-hadaare-1" value="1"><label for="4-constitution-hadaare-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hadaare" id="4-constitution-hadaare-2" value="2"><label for="4-constitution-hadaare-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">皮膚の乾燥</th>
                            <td><input type="radio" name="4-constitution-hifukansou" id="4-constitution-hifukansou-0" value="0"><label for="4-constitution-hifukansou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hifukansou" id="4-constitution-hifukansou-1" value="1"><label for="4-constitution-hifukansou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hifukansou" id="4-constitution-hifukansou-2" value="2"><label for="4-constitution-hifukansou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">皮膚のかゆみ</th>
                            <td><input type="radio" name="4-constitution-hifukayumi" id="4-constitution-hifukayumi-0" value="0"><label for="4-constitution-hifukayumi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hifukayumi" id="4-constitution-hifukayumi-1" value="1"><label for="4-constitution-hifukayumi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hifukayumi" id="4-constitution-hifukayumi-2" value="2"><label for="4-constitution-hifukayumi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">皮膚が脂っぽい</th>
                            <td><input type="radio" name="4-constitution-hifuabura" id="4-constitution-hifuabura-0" value="0"><label for="4-constitution-hifuabura-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hifuabura" id="4-constitution-hifuabura-1" value="1"><label for="4-constitution-hifuabura-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hifuabura" id="4-constitution-hifuabura-2" value="2"><label for="4-constitution-hifuabura-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">色素沈着（しみ）</th>
                            <td><input type="radio" name="4-constitution-shikisochinchaku" id="4-constitution-shikisochinchaku-0" value="0"><label for="4-constitution-shikisochinchaku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shikisochinchaku" id="4-constitution-shikisochinchaku-1" value="1"><label for="4-constitution-shikisochinchaku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shikisochinchaku" id="4-constitution-shikisochinchaku-2" value="2"><label for="4-constitution-shikisochinchaku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">脱色</th>
                            <td><input type="radio" name="4-constitution-dasshoku" id="4-constitution-dasshoku-0" value="0"><label for="4-constitution-dasshoku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-dasshoku" id="4-constitution-dasshoku-1" value="1"><label for="4-constitution-dasshoku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-dasshoku" id="4-constitution-dasshoku-2" value="2"><label for="4-constitution-dasshoku-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">眼のクマ</th>
                            <td><input type="radio" name="4-constitution-menokuma" id="4-constitution-menokuma-0" value="0"><label for="4-constitution-menokuma-0">×</label></td>
                            <td><input type="radio" name="4-constitution-menokuma" id="4-constitution-menokuma-1" value="1"><label for="4-constitution-menokuma-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-menokuma" id="4-constitution-menokuma-2" value="2"><label for="4-constitution-menokuma-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">あざができやすい</th>
                            <td><input type="radio" name="4-constitution-aza" id="4-constitution-aza-0" value="0"><label for="4-constitution-aza-0">×</label></td>
                            <td><input type="radio" name="4-constitution-aza" id="4-constitution-aza-1" value="1"><label for="4-constitution-aza-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-aza" id="4-constitution-aza-2" value="2"><label for="4-constitution-aza-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">皮下出血</th>
                            <td><input type="radio" name="4-constitution-hikashukketsu" id="4-constitution-hikashukketsu-0" value="0"><label for="4-constitution-hikashukketsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hikashukketsu" id="4-constitution-hikashukketsu-1" value="1"><label for="4-constitution-hikashukketsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hikashukketsu" id="4-constitution-hikashukketsu-2" value="2"><label for="4-constitution-hikashukketsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">苔癬</th>
                            <td><input type="radio" name="4-constitution-taisen" id="4-constitution-taisen-0" value="0"><label for="4-constitution-taisen-0">×</label></td>
                            <td><input type="radio" name="4-constitution-taisen" id="4-constitution-taisen-1" value="1"><label for="4-constitution-taisen-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-taisen" id="4-constitution-taisen-2" value="2"><label for="4-constitution-taisen-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">脱毛</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>円形</th>
                            <td><input type="radio" name="4-constitution-datsumou-enkei" id="4-constitution-datsumou-enkei-0" value="0"><label for="4-constitution-datsumou-enkei-0">×</label></td>
                            <td><input type="radio" name="4-constitution-datsumou-enkei" id="4-constitution-datsumou-enkei-1" value="1"><label for="4-constitution-datsumou-enkei-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-datsumou-enkei" id="4-constitution-datsumou-enkei-2" value="2"><label for="4-constitution-datsumou-enkei-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>全般に抜ける</th>
                            <td><input type="radio" name="4-constitution-datsumou-zenpan" id="4-constitution-datsumou-zenpan-0" value="0"><label for="4-constitution-datsumou-zenpan-0">×</label></td>
                            <td><input type="radio" name="4-constitution-datsumou-zenpan" id="4-constitution-datsumou-zenpan-1" value="1"><label for="4-constitution-datsumou-zenpan-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-datsumou-zenpan" id="4-constitution-datsumou-zenpan-2" value="2"><label for="4-constitution-datsumou-zenpan-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">毛が濃い</th>
                            <td><input type="radio" name="4-constitution-kegakoi" id="4-constitution-kegakoi-0" value="0"><label for="4-constitution-kegakoi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kegakoi" id="4-constitution-kegakoi-1" value="1"><label for="4-constitution-kegakoi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kegakoi" id="4-constitution-kegakoi-2" value="2"><label for="4-constitution-kegakoi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">白毛（毛が白い）</th>
                            <td><input type="radio" name="4-constitution-hakumou" id="4-constitution-hakumou-0" value="0"><label for="4-constitution-hakumou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hakumou" id="4-constitution-hakumou-1" value="1"><label for="4-constitution-hakumou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hakumou" id="4-constitution-hakumou-2" value="2"><label for="4-constitution-hakumou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">ふけ</th>
                            <td><input type="radio" name="4-constitution-fuke" id="4-constitution-fuke-0" value="0"><label for="4-constitution-fuke-0">×</label></td>
                            <td><input type="radio" name="4-constitution-fuke" id="4-constitution-fuke-1" value="1"><label for="4-constitution-fuke-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-fuke" id="4-constitution-fuke-2" value="2"><label for="4-constitution-fuke-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">いぼ</th>
                            <td><input type="radio" name="4-constitution-ibo" id="4-constitution-ibo-0" value="0"><label for="4-constitution-ibo-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ibo" id="4-constitution-ibo-1" value="1"><label for="4-constitution-ibo-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ibo" id="4-constitution-ibo-2" value="2"><label for="4-constitution-ibo-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">爪がもろい</th>
                            <td><input type="radio" name="4-constitution-tsumemoroi" id="4-constitution-tsumemoroi-0" value="0"><label for="4-constitution-tsumemoroi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tsumemoroi" id="4-constitution-tsumemoroi-1" value="1"><label for="4-constitution-tsumemoroi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tsumemoroi" id="4-constitution-tsumemoroi-2" value="2"><label for="4-constitution-tsumemoroi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">爪の異常</th>
                            <td><input type="radio" name="4-constitution-tsumeijou" id="4-constitution-tsumeijou-0" value="0"><label for="4-constitution-tsumeijou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-tsumeijou" id="4-constitution-tsumeijou-1" value="1"><label for="4-constitution-tsumeijou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-tsumeijou" id="4-constitution-tsumeijou-2" value="2"><label for="4-constitution-tsumeijou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">手術の傷あとの痛み</th>
                            <td><input type="radio" name="4-constitution-shujutuato" id="4-constitution-shujutuato-0" value="0"><label for="4-constitution-shujutuato-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shujutuato" id="4-constitution-shujutuato-1" value="1"><label for="4-constitution-shujutuato-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shujutuato" id="4-constitution-shujutuato-2" value="2"><label for="4-constitution-shujutuato-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">皮膚が化膿しやすい</th>
                            <td><input type="radio" name="4-constitution-hihukanou" id="4-constitution-hihukanou-0" value="0"><label for="4-constitution-hihukanou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hihukanou" id="4-constitution-hihukanou-1" value="1"><label for="4-constitution-hihukanou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hihukanou" id="4-constitution-hihukanou-2" value="2"><label for="4-constitution-hihukanou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">ケロイドになりやすい</th>
                            <td><input type="radio" name="4-constitution-keroido" id="4-constitution-keroido-0" value="0"><label for="4-constitution-keroido-0">×</label></td>
                            <td><input type="radio" name="4-constitution-keroido" id="4-constitution-keroido-1" value="1"><label for="4-constitution-keroido-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-keroido" id="4-constitution-keroido-2" value="2"><label for="4-constitution-keroido-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="5">痛み</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腰</th>
                            <td><input type="radio" name="4-constitution-itami-koshi" id="4-constitution-itami-koshi-0" value="0"><label for="4-constitution-itami-koshi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-koshi" id="4-constitution-itami-koshi-1" value="1"><label for="4-constitution-itami-koshi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-koshi" id="4-constitution-itami-koshi-2" value="2"><label for="4-constitution-itami-koshi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>肩</th>
                            <td><input type="radio" name="4-constitution-itami-kata" id="4-constitution-itami-kata-0" value="0"><label for="4-constitution-itami-kata-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-kata" id="4-constitution-itami-kata-1" value="1"><label for="4-constitution-itami-kata-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-kata" id="4-constitution-itami-kata-2" value="2"><label for="4-constitution-itami-kata-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>背</th>
                            <td><input type="radio" name="4-constitution-itami-se" id="4-constitution-itami-se-0" value="0"><label for="4-constitution-itami-se-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-se" id="4-constitution-itami-se-1" value="1"><label for="4-constitution-itami-se-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-se" id="4-constitution-itami-se-2" value="2"><label for="4-constitution-itami-se-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>膝</th>
                            <td><input type="radio" name="4-constitution-itami-hiza" id="4-constitution-itami-hiza-0" value="0"><label for="4-constitution-itami-hiza-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-hiza" id="4-constitution-itami-hiza-1" value="1"><label for="4-constitution-itami-hiza-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-hiza" id="4-constitution-itami-hiza-2" value="2"><label for="4-constitution-itami-hiza-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腕</th>
                            <td><input type="radio" name="4-constitution-itami-ude" id="4-constitution-itami-ude-0" value="0"><label for="4-constitution-itami-ude-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-ude" id="4-constitution-itami-ude-1" value="1"><label for="4-constitution-itami-ude-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-ude" id="4-constitution-itami-ude-2" value="2"><label for="4-constitution-itami-ude-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>手指</th>
                            <td><input type="radio" name="4-constitution-itami-shushi" id="4-constitution-itami-shushi-0" value="0"><label for="4-constitution-itami-shushi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-shushi" id="4-constitution-itami-shushi-1" value="1"><label for="4-constitution-itami-shushi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-shushi" id="4-constitution-itami-shushi-2" value="2"><label for="4-constitution-itami-shushi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>太腿</th>
                            <td><input type="radio" name="4-constitution-itami-hutomomo" id="4-constitution-itami-hutomomo-0" value="0"><label for="4-constitution-itami-hutomomo-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-hutomomo" id="4-constitution-itami-hutomomo-1" value="1"><label for="4-constitution-itami-hutomomo-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-hutomomo" id="4-constitution-itami-hutomomo-2" value="2"><label for="4-constitution-itami-hutomomo-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足</th>
                            <td><input type="radio" name="4-constitution-itami-ashi" id="4-constitution-itami-ashi-0" value="0"><label for="4-constitution-itami-ashi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-ashi" id="4-constitution-itami-ashi-1" value="1"><label for="4-constitution-itami-ashi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-ashi" id="4-constitution-itami-ashi-2" value="2"><label for="4-constitution-itami-ashi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-itami-other" id="4-constitution-itami-other-0" value="0"><label for="4-constitution-itami-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-itami-other" id="4-constitution-itami-other-1" value="1"><label for="4-constitution-itami-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-itami-other" id="4-constitution-itami-other-2" value="2"><label for="4-constitution-itami-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">こわばり</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>手指</th>
                            <td><input type="radio" name="4-constitution-kowabari-shushi" id="4-constitution-kowabari-shushi-0" value="0"><label for="4-constitution-kowabari-shushi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kowabari-shushi" id="4-constitution-kowabari-shushi-1" value="1"><label for="4-constitution-kowabari-shushi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kowabari-shushi" id="4-constitution-kowabari-shushi-2" value="2"><label for="4-constitution-kowabari-shushi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-kowabari-other" id="4-constitution-kowabari-other-0" value="0"><label for="4-constitution-kowabari-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kowabari-other" id="4-constitution-kowabari-other-1" value="1"><label for="4-constitution-kowabari-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kowabari-other" id="4-constitution-kowabari-other-2" value="2"><label for="4-constitution-kowabari-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">こり</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>肩</th>
                            <td><input type="radio" name="4-constitution-kori-kata" id="4-constitution-kori-kata-0" value="0"><label for="4-constitution-kori-kata-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kori-kata" id="4-constitution-kori-kata-1" value="1"><label for="4-constitution-kori-kata-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kori-kata" id="4-constitution-kori-kata-2" value="2"><label for="4-constitution-kori-kata-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>背</th>
                            <td><input type="radio" name="4-constitution-kori-se" id="4-constitution-kori-se-0" value="0"><label for="4-constitution-kori-se-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kori-se" id="4-constitution-kori-se-1" value="1"><label for="4-constitution-kori-se-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kori-se" id="4-constitution-kori-se-2" value="2"><label for="4-constitution-kori-se-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>首筋</th>
                            <td><input type="radio" name="4-constitution-kori-sesuji" id="4-constitution-kori-sesuji-0" value="0"><label for="4-constitution-kori-sesuji-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kori-sesuji" id="4-constitution-kori-sesuji-1" value="1"><label for="4-constitution-kori-sesuji-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kori-sesuji" id="4-constitution-kori-sesuji-2" value="2"><label for="4-constitution-kori-sesuji-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腰</th>
                            <td><input type="radio" name="4-constitution-kori-koshi" id="4-constitution-kori-koshi-0" value="0"><label for="4-constitution-kori-koshi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kori-koshi" id="4-constitution-kori-koshi-1" value="1"><label for="4-constitution-kori-koshi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kori-koshi" id="4-constitution-kori-koshi-2" value="2"><label for="4-constitution-kori-koshi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-kori-other" id="4-constitution-kori-other-0" value="0"><label for="4-constitution-kori-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kori-other" id="4-constitution-kori-other-1" value="1"><label for="4-constitution-kori-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kori-other" id="4-constitution-kori-other-2" value="2"><label for="4-constitution-kori-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">張り</th>
                            <td><input type="radio" name="4-constitution-hari" id="4-constitution-hari-0" value="0"><label for="4-constitution-hari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hari" id="4-constitution-hari-1" value="1"><label for="4-constitution-hari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hari" id="4-constitution-hari-2" value="2"><label for="4-constitution-hari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">腫れ</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>膝</th>
                            <td><input type="radio" name="4-constitution-hare-hiza" id="4-constitution-hare-hiza-0" value="0"><label for="4-constitution-hare-hiza-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hare-hiza" id="4-constitution-hare-hiza-1" value="1"><label for="4-constitution-hare-hiza-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hare-hiza" id="4-constitution-hare-hiza-2" value="2"><label for="4-constitution-hare-hiza-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>肘</th>
                            <td><input type="radio" name="4-constitution-hare-hiji" id="4-constitution-hare-hiji-0" value="0"><label for="4-constitution-hare-hiji-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hare-hiji" id="4-constitution-hare-hiji-1" value="1"><label for="4-constitution-hare-hiji-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hare-hiji" id="4-constitution-hare-hiji-2" value="2"><label for="4-constitution-hare-hiji-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>手首</th>
                            <td><input type="radio" name="4-constitution-hare-tekubi" id="4-constitution-hare-tekubi-0" value="0"><label for="4-constitution-hare-tekubi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hare-tekubi" id="4-constitution-hare-tekubi-1" value="1"><label for="4-constitution-hare-tekubi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hare-tekubi" id="4-constitution-hare-tekubi-2" value="2"><label for="4-constitution-hare-tekubi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-hare-other" id="4-constitution-hare-other-0" value="0"><label for="4-constitution-hare-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hare-other" id="4-constitution-hare-other-1" value="1"><label for="4-constitution-hare-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hare-other" id="4-constitution-hare-other-2" value="2"><label for="4-constitution-hare-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">しびれ</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>腕</th>
                            <td><input type="radio" name="4-constitution-shibire-ude" id="4-constitution-shibire-ude-0" value="0"><label for="4-constitution-shibire-ude-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shibire-ude" id="4-constitution-shibire-ude-1" value="1"><label for="4-constitution-shibire-ude-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shibire-ude" id="4-constitution-shibire-ude-2" value="2"><label for="4-constitution-shibire-ude-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>手指</th>
                            <td><input type="radio" name="4-constitution-shibire-shushi" id="4-constitution-shibire-shushi-0" value="0"><label for="4-constitution-shibire-shushi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shibire-shushi" id="4-constitution-shibire-shushi-1" value="1"><label for="4-constitution-shibire-shushi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shibire-shushi" id="4-constitution-shibire-shushi-2" value="2"><label for="4-constitution-shibire-shushi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>太腿</th>
                            <td><input type="radio" name="4-constitution-shibire-futomomo" id="4-constitution-shibire-futomomo-0" value="0"><label for="4-constitution-shibire-futomomo-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shibire-futomomo" id="4-constitution-shibire-futomomo-1" value="1"><label for="4-constitution-shibire-futomomo-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shibire-futomomo" id="4-constitution-shibire-futomomo-2" value="2"><label for="4-constitution-shibire-futomomo-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足</th>
                            <td><input type="radio" name="4-constitution-shibire-shi" id="4-constitution-shibire-shi-0" value="0"><label for="4-constitution-shibire-shi-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shibire-shi" id="4-constitution-shibire-shi-1" value="1"><label for="4-constitution-shibire-shi-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shibire-shi" id="4-constitution-shibire-shi-2" value="2"><label for="4-constitution-shibire-shi-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-shibire-other" id="4-constitution-shibire-other-0" value="0"><label for="4-constitution-shibire-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shibire-other" id="4-constitution-shibire-other-1" value="1"><label for="4-constitution-shibire-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shibire-other" id="4-constitution-shibire-other-2" value="2"><label for="4-constitution-shibire-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">ほてり</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>手のひら</th>
                            <td><input type="radio" name="4-constitution-hoteri-tenohira" id="4-constitution-hoteri-tenohira-0" value="0"><label for="4-constitution-hoteri-tenohira-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hoteri-tenohira" id="4-constitution-hoteri-tenohira-1" value="1"><label for="4-constitution-hoteri-tenohira-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hoteri-tenohira" id="4-constitution-hoteri-tenohira-2" value="2"><label for="4-constitution-hoteri-tenohira-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>足の裏</th>
                            <td><input type="radio" name="4-constitution-hoteri-ashiura" id="4-constitution-hoteri-ashiura-0" value="0"><label for="4-constitution-hoteri-ashiura-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hoteri-ashiura" id="4-constitution-hoteri-ashiura-1" value="1"><label for="4-constitution-hoteri-ashiura-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hoteri-ashiura" id="4-constitution-hoteri-ashiura-2" value="2"><label for="4-constitution-hoteri-ashiura-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他の部位</th>
                            <td><input type="radio" name="4-constitution-hoteri-other" id="4-constitution-hoteri-other-0" value="0"><label for="4-constitution-hoteri-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hoteri-other" id="4-constitution-hoteri-other-1" value="1"><label for="4-constitution-hoteri-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hoteri-other" id="4-constitution-hoteri-other-2" value="2"><label for="4-constitution-hoteri-other-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">神経痛</th>
                            <td><input type="radio" name="4-constitution-shinkeitsu" id="4-constitution-shinkeitsu-0" value="0"><label for="4-constitution-shinkeitsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shinkeitsu" id="4-constitution-shinkeitsu-1" value="1"><label for="4-constitution-shinkeitsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shinkeitsu" id="4-constitution-shinkeitsu-2" value="2"><label for="4-constitution-shinkeitsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">足がつりやすい</th>
                            <td><input type="radio" name="4-constitution-ashitsuru" id="4-constitution-ashitsuru-0" value="0"><label for="4-constitution-ashitsuru-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ashitsuru" id="4-constitution-ashitsuru-1" value="1"><label for="4-constitution-ashitsuru-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ashitsuru" id="4-constitution-ashitsuru-2" value="2"><label for="4-constitution-ashitsuru-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">筋力低下</th>
                            <td><input type="radio" name="4-constitution-kinryokuteika" id="4-constitution-kinryokuteika-0" value="0"><label for="4-constitution-kinryokuteika-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kinryokuteika" id="4-constitution-kinryokuteika-1" value="1"><label for="4-constitution-kinryokuteika-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kinryokuteika" id="4-constitution-kinryokuteika-2" value="2"><label for="4-constitution-kinryokuteika-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">間欠性跛行</th>
                            <td><input type="radio" name="4-constitution-kanketsuseihakou" id="4-constitution-kanketsuseihakou-0" value="0"><label for="4-constitution-kanketsuseihakou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kanketsuseihakou" id="4-constitution-kanketsuseihakou-1" value="1"><label for="4-constitution-kanketsuseihakou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kanketsuseihakou" id="4-constitution-kanketsuseihakou-2" value="2"><label for="4-constitution-kanketsuseihakou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">運動障害（運動に制限がある）</th>
                            <td><input type="radio" name="4-constitution-undoushougai" id="4-constitution-undoushougai-0" value="0"><label for="4-constitution-undoushougai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-undoushougai" id="4-constitution-undoushougai-1" value="1"><label for="4-constitution-undoushougai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-undoushougai" id="4-constitution-undoushougai-2" value="2"><label for="4-constitution-undoushougai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">打撲</th>
                            <td><input type="radio" name="4-constitution-daboku" id="4-constitution-daboku-0" value="0"><label for="4-constitution-daboku-0">×</label></td>
                            <td><input type="radio" name="4-constitution-daboku" id="4-constitution-daboku-1" value="1"><label for="4-constitution-daboku-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-daboku" id="4-constitution-daboku-2" value="2"><label for="4-constitution-daboku-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">不妊</th>
                            <td><input type="radio" name="4-constitution-hinin" id="4-constitution-hinin-0" value="0"><label for="4-constitution-hinin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hinin" id="4-constitution-hinin-1" value="1"><label for="4-constitution-hinin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hinin" id="4-constitution-hinin-2" value="2"><label for="4-constitution-hinin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">胎位異常</th>
                            <td><input type="radio" name="4-constitution-taiiijou" id="4-constitution-taiiijou-0" value="0"><label for="4-constitution-taiiijou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-taiiijou" id="4-constitution-taiiijou-1" value="1"><label for="4-constitution-taiiijou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-taiiijou" id="4-constitution-taiiijou-2" value="2"><label for="4-constitution-taiiijou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">子宮脱</th>
                            <td><input type="radio" name="4-constitution-shikyuudatsu" id="4-constitution-shikyuudatsu-0" value="0"><label for="4-constitution-shikyuudatsu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-shikyuudatsu" id="4-constitution-shikyuudatsu-1" value="1"><label for="4-constitution-shikyuudatsu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-shikyuudatsu" id="4-constitution-shikyuudatsu-2" value="2"><label for="4-constitution-shikyuudatsu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">性交痛</th>
                            <td><input type="radio" name="4-constitution-seikoutsuu" id="4-constitution-seikoutsuu-0" value="0"><label for="4-constitution-seikoutsuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-seikoutsuu" id="4-constitution-seikoutsuu-1" value="1"><label for="4-constitution-seikoutsuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-seikoutsuu" id="4-constitution-seikoutsuu-2" value="2"><label for="4-constitution-seikoutsuu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">乳房の張り</th>
                            <td><input type="radio" name="4-constitution-chibusahari" id="4-constitution-chibusahari-0" value="0"><label for="4-constitution-chibusahari-0">×</label></td>
                            <td><input type="radio" name="4-constitution-chibusahari" id="4-constitution-chibusahari-1" value="1"><label for="4-constitution-chibusahari-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-chibusahari" id="4-constitution-chibusahari-2" value="2"><label for="4-constitution-chibusahari-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="5">帯下の異常</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>血性</th>
                            <td><input type="radio" name="4-constitution-obishita-kessei" id="4-constitution-obishita-kessei-0" value="0"><label for="4-constitution-obishita-kessei-0">×</label></td>
                            <td><input type="radio" name="4-constitution-obishita-kessei" id="4-constitution-obishita-kessei-1" value="1"><label for="4-constitution-obishita-kessei-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-obishita-kessei" id="4-constitution-obishita-kessei-2" value="2"><label for="4-constitution-obishita-kessei-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>膿性</th>
                            <td><input type="radio" name="4-constitution-obishita-nousei" id="4-constitution-obishita-nousei-0" value="0"><label for="4-constitution-obishita-nousei-0">×</label></td>
                            <td><input type="radio" name="4-constitution-obishita-nousei" id="4-constitution-obishita-nousei-1" value="1"><label for="4-constitution-obishita-nousei-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-obishita-nousei" id="4-constitution-obishita-nousei-2" value="2"><label for="4-constitution-obishita-nousei-2">◎</label></td>
                        </tr>
                        <tr>
                            <th></th>
                            <th>その他</th>
                            <td><input type="radio" name="4-constitution-obishita-other" id="4-constitution-obishita-other-0" value="0"><label for="4-constitution-obishita-other-0">×</label></td>
                            <td><input type="radio" name="4-constitution-obishita-other" id="4-constitution-obishita-other-1" value="1"><label for="4-constitution-obishita-other-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-obishita-other" id="4-constitution-obishita-other-2" value="2"><label for="4-constitution-obishita-other-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <table class="visit_data__constitution __chapter1">
                    <thead>
                        <tr><th colspan="2"></th><th>該当しない</th><th>該当する</th><th>著しく該当する</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colspan="2">頻尿（昼間）</th>
                            <td><input type="radio" name="4-constitution-hinnyou" id="4-constitution-hinnyou-0" value="0"><label for="4-constitution-hinnyou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-hinnyou" id="4-constitution-hinnyou-1" value="1"><label for="4-constitution-hinnyou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-hinnyou" id="4-constitution-hinnyou-2" value="2"><label for="4-constitution-hinnyou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">夜間頻尿</th>
                            <td><input type="radio" name="4-constitution-yakanhinnyou" id="4-constitution-yakanhinnyou-0" value="0"><label for="4-constitution-yakanhinnyou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-yakanhinnyou" id="4-constitution-yakanhinnyou-1" value="1"><label for="4-constitution-yakanhinnyou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-yakanhinnyou" id="4-constitution-yakanhinnyou-2" value="2"><label for="4-constitution-yakanhinnyou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">尿失禁</th>
                            <td><input type="radio" name="4-constitution-nyoushikkin" id="4-constitution-nyoushikkin-0" value="0"><label for="4-constitution-nyoushikkin-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nyoushikkin" id="4-constitution-nyoushikkin-1" value="1"><label for="4-constitution-nyoushikkin-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nyoushikkin" id="4-constitution-nyoushikkin-2" value="2"><label for="4-constitution-nyoushikkin-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">夜尿症</th>
                            <td><input type="radio" name="4-constitution-yanyoushou" id="4-constitution-yanyoushou-0" value="0"><label for="4-constitution-yanyoushou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-yanyoushou" id="4-constitution-yanyoushou-1" value="1"><label for="4-constitution-yanyoushou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-yanyoushou" id="4-constitution-yanyoushou-2" value="2"><label for="4-constitution-yanyoushou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">尿が濁っている</th>
                            <td><input type="radio" name="4-constitution-nyounigori" id="4-constitution-nyounigori-0" value="0"><label for="4-constitution-nyounigori-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nyounigori" id="4-constitution-nyounigori-1" value="1"><label for="4-constitution-nyounigori-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nyounigori" id="4-constitution-nyounigori-2" value="2"><label for="4-constitution-nyounigori-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">血尿</th>
                            <td><input type="radio" name="4-constitution-ketsunyou" id="4-constitution-ketsunyou-0" value="0"><label for="4-constitution-ketsunyou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-ketsunyou" id="4-constitution-ketsunyou-1" value="1"><label for="4-constitution-ketsunyou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-ketsunyou" id="4-constitution-ketsunyou-2" value="2"><label for="4-constitution-ketsunyou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">尿量減少</th>
                            <td><input type="radio" name="4-constitution-nyouryougenshou" id="4-constitution-nyouryougenshou-0" value="0"><label for="4-constitution-nyouryougenshou-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nyouryougenshou" id="4-constitution-nyouryougenshou-1" value="1"><label for="4-constitution-nyouryougenshou-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nyouryougenshou" id="4-constitution-nyouryougenshou-2" value="2"><label for="4-constitution-nyouryougenshou-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">水を飲む割に尿が少ない</th>
                            <td><input type="radio" name="4-constitution-nyousukunai" id="4-constitution-nyousukunai-0" value="0"><label for="4-constitution-nyousukunai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nyousukunai" id="4-constitution-nyousukunai-1" value="1"><label for="4-constitution-nyousukunai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nyousukunai" id="4-constitution-nyousukunai-2" value="2"><label for="4-constitution-nyousukunai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">尿の出が悪い（すっきり出ない）</th>
                            <td><input type="radio" name="4-constitution-nyoudenikui" id="4-constitution-nyoudenikui-0" value="0"><label for="4-constitution-nyoudenikui-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nyoudenikui" id="4-constitution-nyoudenikui-1" value="1"><label for="4-constitution-nyoudenikui-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nyoudenikui" id="4-constitution-nyoudenikui-2" value="2"><label for="4-constitution-nyoudenikui-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">尿閉（尿が出ない）</th>
                            <td><input type="radio" name="4-constitution-nyoudenai" id="4-constitution-nyoudenai-0" value="0"><label for="4-constitution-nyoudenai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-nyoudenai" id="4-constitution-nyoudenai-1" value="1"><label for="4-constitution-nyoudenai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-nyoudenai" id="4-constitution-nyoudenai-2" value="2"><label for="4-constitution-nyoudenai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">性機能の減退</th>
                            <td><input type="radio" name="4-constitution-seikinougentai" id="4-constitution-seikinougentai-0" value="0"><label for="4-constitution-seikinougentai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-seikinougentai" id="4-constitution-seikinougentai-1" value="1"><label for="4-constitution-seikinougentai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-seikinougentai" id="4-constitution-seikinougentai-2" value="2"><label for="4-constitution-seikinougentai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">会陰部（股間）の不快感</th>
                            <td><input type="radio" name="4-constitution-einbufukai" id="4-constitution-einbufukai-0" value="0"><label for="4-constitution-einbufukai-0">×</label></td>
                            <td><input type="radio" name="4-constitution-einbufukai" id="4-constitution-einbufukai-1" value="1"><label for="4-constitution-einbufukai-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-einbufukai" id="4-constitution-einbufukai-2" value="2"><label for="4-constitution-einbufukai-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">会陰部痛</th>
                            <td><input type="radio" name="4-constitution-einbutsuu" id="4-constitution-einbutsuu-0" value="0"><label for="4-constitution-einbutsuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-einbutsuu" id="4-constitution-einbutsuu-1" value="1"><label for="4-constitution-einbutsuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-einbutsuu" id="4-constitution-einbutsuu-2" value="2"><label for="4-constitution-einbutsuu-2">◎</label></td>
                        </tr>
                        <tr>
                            <th colspan="2">睾丸痛</th>
                            <td><input type="radio" name="4-constitution-kougantsuu" id="4-constitution-kougantsuu-0" value="0"><label for="4-constitution-kougantsuu-0">×</label></td>
                            <td><input type="radio" name="4-constitution-kougantsuu" id="4-constitution-kougantsuu-1" value="1"><label for="4-constitution-kougantsuu-1">〇</label></td>
                            <td><input type="radio" name="4-constitution-kougantsuu" id="4-constitution-kougantsuu-2" value="2"><label for="4-constitution-kougantsuu-2">◎</label></td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    <label for="4-otherconsider">その他、気になる症状があればお書きください。</label>
                </p>
                <p>
                    <textarea id="4-otherconsider" name="4-otherconsider"></textarea>
                </p>
            </div>
            <div v-show="$route.query.page == 5">
                <p class="visit_data__head_question">ご家族・血縁についてお聞きします。</p>
                <p><label for="5-father-grandfather">父方の祖父</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-father-grandfather" id="5-father-grandfather-0" value="0"><label for="5-father-grandfather-0">健康</label></li>
                    <li><input type="radio" name="5-father-grandfather" id="5-father-grandfather-1" value="1"><label for="5-father-grandfather-1">病気</label></li>
                    <li><input type="radio" name="5-father-grandfather" id="5-father-grandfather-2" value="2"><label for="5-father-grandfather-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-father-grandfather">病名</label>
                    <textarea id="5-father-grandfather-disease" name="5-father-grandfather-disease"></textarea>
                </p>
                <p><label for="5-father-grandmother">父方の祖母</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-father-grandmother" id="5-father-grandmother-0" value="0"><label for="5-father-grandmother-0">健康</label></li>
                    <li><input type="radio" name="5-father-grandmother" id="5-father-grandmother-1" value="1"><label for="5-father-grandmother-1">病気</label></li>
                    <li><input type="radio" name="5-father-grandmother" id="5-father-grandmother-2" value="2"><label for="5-father-grandmother-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-father-grandmother">病名</label>
                    <textarea id="5-father-grandmother-disease" name="5-father-grandmother-disease"></textarea>
                </p>
                <p><label for="5-mother-grandfather">母方の祖父</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-mother-grandfather" id="5-mother-grandfather-0" value="0"><label for="5-mother-grandfather-0">健康</label></li>
                    <li><input type="radio" name="5-mother-grandfather" id="5-mother-grandfather-1" value="1"><label for="5-mother-grandfather-1">病気</label></li>
                    <li><input type="radio" name="5-mother-grandfather" id="5-mother-grandfather-2" value="2"><label for="5-mother-grandfather-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-mother-grandfather">病名</label>
                    <textarea id="5-mother-grandfather-disease" name="5-mother-grandfather-disease"></textarea>
                </p>
                <p><label for="5-mother-grandmother">母方の祖母</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-mother-grandmother" id="5-mother-grandmother-0" value="0"><label for="5-mother-grandmother-0">健康</label></li>
                    <li><input type="radio" name="5-mother-grandmother" id="5-mother-grandmother-1" value="1"><label for="5-mother-grandmother-1">病気</label></li>
                    <li><input type="radio" name="5-mother-grandmother" id="5-mother-grandmother-2" value="2"><label for="5-mother-grandmother-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-mother-grandmother">病名</label>
                    <textarea id="5-mother-grandmother-disease" name="5-mother-grandmother-disease"></textarea>
                </p>
                <p><label for="5-father">父</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-father" id="5-father-0" value="0"><label for="5-father-0">健康</label></li>
                    <li><input type="radio" name="5-father" id="5-father-1" value="1"><label for="5-father-1">病気</label></li>
                    <li><input type="radio" name="5-father" id="5-father-2" value="2"><label for="5-father-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-father">病名</label>
                    <textarea id="5-father-disease" name="5-father-disease"></textarea>
                </p>
                <p><label for="5-mother">母</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-mother" id="5-mother-0" value="0"><label for="5-mother-0">健康</label></li>
                    <li><input type="radio" name="5-mother" id="5-mother-1" value="1"><label for="5-mother-1">病気</label></li>
                    <li><input type="radio" name="5-mother" id="5-mother-2" value="2"><label for="5-mother-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-mother">病名</label>
                    <textarea id="5-mother-disease" name="5-mother-disease"></textarea>
                </p>
                <p>
                    <label class="select_family" for="5-sibling">
                        <select class="select_family" name="5-sibling">
                            <option value="elderbrother">兄</option>
                            <option value="yongerbrohter">弟</option>
                            <option value="eldersister">姉</option>
                            <option value="youngersister">妹</option>
                        </select>
                    </label>
                </p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-sibling" id="5-sibling-0" value="0"><label for="5-sibling-0">健康</label></li>
                    <li><input type="radio" name="5-sibling" id="5-sibling-1" value="1"><label for="5-sibling-1">病気</label></li>
                    <li><input type="radio" name="5-sibling" id="5-sibling-2" value="2"><label for="5-sibling-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-sibling">病名</label>
                    <textarea id="5-sibling-disease" name="5-sibling-disease"></textarea>
                </p>
                <p><label for="5-partner">配偶者</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-partner" id="5-partner-0" value="0"><label for="5-partner-0">健康</label></li>
                    <li><input type="radio" name="5-partner" id="5-partner-1" value="1"><label for="5-partner-1">病気</label></li>
                    <li><input type="radio" name="5-partner" id="5-partner-2" value="2"><label for="5-partner-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-partner">病名</label>
                    <textarea id="5-partner-disease" name="5-partner-disease"></textarea>
                </p>
                <p>
                    <label class="select_family" for="5-child">
                        <select class="select_family" name="5-child">
                            <option value="son">息子</option>
                            <option value="daughter">娘</option>
                        </select>
                    </label>
                </p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-child" id="5-child-0" value="0"><label for="5-child-0">健康</label></li>
                    <li><input type="radio" name="5-child" id="5-child-1" value="1"><label for="5-child-1">病気</label></li>
                    <li><input type="radio" name="5-child" id="5-child-2" value="2"><label for="5-child-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-child">病名</label>
                    <textarea id="5-child-disease" name="5-child-disease"></textarea>
                </p>
                <p>
                    <label class="select_family" for="5-othermember">
                        <select class="select_family" name="5-child">
                            <option value="man">そのほかの同居者（男性）</option>
                            <option value="woman">そのほかの同居者（女性）</option>
                        </select>
                    </label>
                </p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="5-othermember" id="5-othermember-0" value="0"><label for="5-othermember-0">健康</label></li>
                    <li><input type="radio" name="5-othermember" id="5-othermember-1" value="1"><label for="5-othermember-1">病気</label></li>
                    <li><input type="radio" name="5-othermember" id="5-othermember-2" value="2"><label for="5-othermember-2">死亡</label></li>
                </ul>
                <p class="family_disease">
                    <label for="5-othermember">病名</label>
                    <textarea id="5-othermember-disease" name="5-othermember-disease"></textarea>
                </p>
			</div>
            <div v-show="$route.query.page == 6">
                <p class="visit_data__head_question">生活習慣についてお聞きします。</p>
                <p><label for="6-drinkhistory">飲酒歴</label></p>
                <p class="inner-caption"><label for="6-drinkhistory-begin">開始年齢</label><input type="number" name="6-drinkhistory" id="6-drinkhistory-begin">歳</p>
                <p class="inner-caption"><label for="6-drinkhistory-end">中止年齢</label><input type="number" name="6-drinkhistory" id="6-drinkhistory-end">歳</p>
                <p><label for="6-drinkhistory-past">過去の飲酒歴</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="6-drinkhistory-past" id="6-drinkhistory-past-0" value="0"><label for="6-drinkhistory-past-0">なし</label></li>
                    <li><input type="radio" name="6-drinkhistory-past" id="6-drinkhistory-past-1" value="1"><label for="6-drinkhistory-past-1">あり</label></li>
                </ul>
                <p class="inner-caption"><label for="6-drinkhistory-past-amount">飲酒量</label><input type="number" name="6-drinkhistory-past-amount" id="6-drinkhistory-past-amount">合／日</p>
                <p><label for="6-drinkhistory-current">現在の飲酒歴</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="6-drinkhistory-current" id="6-drinkhistory-current-0" value="0"><label for="6-drinkhistory-current-0">なし</label></li>
                    <li><input type="radio" name="6-drinkhistory-current" id="6-drinkhistory-current-1" value="1"><label for="6-drinkhistory-current-1">あり</label></li>
                </ul>
                <p class="inner-caption"><label for="6-drinkhistory-current-amount">飲酒量</label><input type="number" name="6-drinkhistory-current-amount" id="6-drinkhistory-current-amount">合／日</p>
                <p><label for="6-smokinghistory">喫煙歴</label></p>
                <p class="inner-caption"><label for="6-smokinghistory-begin">開始年齢</label><input type="number" name="6-smokinghistory" id="6-smokinghistory-begin">歳</p>
                <p class="inner-caption"><label for="6-smokinghistory-end">中止年齢</label><input type="number" name="6-smokinghistory" id="6-smokinghistory-end">歳</p>
                <p><label for="6-smokinghistory-past">過去の喫煙歴</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="6-smokinghistory-past" id="6-smokinghistory-past-0" value="0"><label for="6-smokinghistory-past-0">なし</label></li>
                    <li><input type="radio" name="6-smokinghistory-past" id="6-smokinghistory-past-1" value="1"><label for="6-smokinghistory-past-1">あり</label></li>
                </ul>
                <p class="inner-caption"><label for="6-smokinghistory-past-amount">喫煙量</label><input type="number" name="6-smokinghistory-past-amount" id="6-smokinghistory-past-amount">合／日</p>
                <p><label for="6-smokinghistory-current">現在の喫煙歴</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="6-smokinghistory-current" id="6-smokinghistory-current-0" value="0"><label for="6-smokinghistory-current-0">なし</label></li>
                    <li><input type="radio" name="6-smokinghistory-current" id="6-smokinghistory-current-1" value="1"><label for="6-smokinghistory-current-1">あり</label></li>
                </ul>
                <p class="inner-caption"><label for="6-smokinghistory-current-amount">喫煙量</label><input type="number" name="6-smokinghistory-current-amount" id="6-smokinghistory-current-amount">合／日</p>
                <p><label for="6-preference">嗜好</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="checkbox" name="6-preference" id="6-preference-1" value="1"><label for="6-preference-1">甘いもの好き</label></li>
                    <li><input type="checkbox" name="6-preference" id="6-preference-2" value="2"><label for="6-preference-2">辛いもの好き</label></li>
                    <li><input type="checkbox" name="6-preference" id="6-preference-3" value="3"><label for="6-preference-3">塩辛いもの好き</label></li>
                    <li><input type="checkbox" name="6-preference" id="6-preference-4" value="4"><label for="6-preference-4">肉が好き</label></li>
                </ul>
            </div>
            <div v-show="$route.query.page == 7">
                <p class="visit_data__head_question">今までにかかった病気などについてお聞きします。</p>
                <p><label for="7-hospitalization">入院歴</label></p>
                <p><input type="number" name="7-hospitalization-age" id="7-hospitalization-age">歳ごろ</p>
                <p class="inner-caption"><label for="7-hospitalization-disease">病名</label><input type="text" name="7-hospitalization-disease" id="7-hospitalization-disease"></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="7-hospitalization-ope" id="7-hospitalization-ope-0" value="0"><label for="7-hospitalization-ope-0">手術なし</label></li>
                    <li><input type="radio" name="7-hospitalization-ope" id="7-hospitalization-ope-1" value="1"><label for="7-hospitalization-ope-1">手術あり</label></li>
                </ul>
                <p><label for="7-outpatient">通院歴</label></p>
                <p><input type="number" name="7-outpatient-age" id="7-outpatient-age">歳ごろ</p>
                <p class="inner-caption"><label for="7-outpatient-disease">病名</label><input type="text" name="7-outpatient-disease" id="7-outpatient-disease"></p>
                <p><label for="7-transfusion">輸血歴</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="7-transfusion" id="7-transfusion-0" value="0"><label for="7-transfusion-0">なし</label></li>
                    <li><input type="radio" name="7-transfusion" id="7-transfusion-1" value="1"><label for="7-transfusion-1">あり</label></li>
                </ul>
                <p class="inner-caption"><label for="7-transfusion-age">年齢</label><input type="number" name="7-transfusion-age" id="7-transfusion-age">歳</p>
                <p><label for="7-jaundice">黄疸</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="7-jaundice" id="7-jaundice-0" value="0"><label for="7-jaundice-0">なし</label></li>
                    <li><input type="radio" name="7-jaundice" id="7-jaundice-1" value="1"><label for="7-jaundice-1">あり</label></li>
                </ul>
                <p class="inner-caption"><label for="7-jaundice-age">年齢</label><input type="number" name="7-jaundice-age" id="7-jaundice-age">歳</p>
                <p><label for="7-medicineallegy">薬物アレルギー</label></p>
                <ul class="visit_data__radio_box">
                    <li><input type="radio" name="7-medicineallegy" id="7-medicineallegy-0" value="0"><label for="7-medicineallegy-0">なし</label></li>
                    <li><input type="radio" name="7-medicineallegy" id="7-medicineallegy-1" value="1"><label for="7-medicineallegy-1">あり</label></li>
                </ul>
                <p class="inner-caption"><label for="7-medicineallegy-medicine">薬品名</label><input type="text" name="7-medicineallegy-medicine" id="7-medicineallegy-medicine"></p>
            </div>
        </form>
        <div class="visit_data__navigator">
            <button type="button" v-if="$route.query.page > 1" v-on:click="movePage('back')">前へ</button>
            <button type="button" v-if="$route.query.page < 7" v-on:click="movePage('forward')">次へ</button>
            <button type="button" v-if="$route.query.page == 7" @click="$router.push('/')">登録完了</button>
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
body {
    padding-bottom: 100px;
}
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
    white-space: nowrap;
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
    margin: 0;
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
    width: calc(100% - 4px);
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
    margin-top: 0;
    margin-bottom: 100%;
}
.visit_data__navigator {
    display: flex;
    width: 100%;
    min-width: 500px;
    margin: 0;
    justify-content: center;
    position: fixed;
    bottom: 0;
    background-color: white;
    padding: 2em 0;
}
.visit_data__navigator button {
    font-size: 2rem;
    padding: 0.5em 2em;
    border-radius: 5px;
    border: 2px solid black;
    margin: 0 5px;
}
table.visit_data__constitution {
    font-size: 2rem;
    margin: 30px 0;
    width: 100%;
    table-layout: fixed;
    word-wrap: break-word;
    border-collapse: collapse;
}
table.visit_data__constitution thead th:first-child {
    width: 100px;
}
table.visit_data__constitution tbody th {
    font-size: 1.5rem;
    font-weight: normal;
}
table.visit_data__constitution td {
    padding: 5px 0;
}
table.visit_data__constitution tbody > tr > th {
    text-align: left;
    padding: 10px 0;
}
table.visit_data__constitution label {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    margin: 0;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    width: calc(100% - 2px);
}
table.visit_data__constitution tbody tr td:first-of-type label {
    border-radius: 5px 0 0 5px;
    border-left: 2px solid black;
    width: calc(100% - 3px);
}
table.visit_data__constitution tbody tr td:last-of-type label {
    border-radius: 0 5px 5px 0;
    border-right: 2px solid black;
    width: calc(100% - 3px);
}
table.visit_data__constitution input[type="radio"] {
    display: none;
}
table.visit_data__constitution input[type="radio"]:checked + label {
    background-color: black;
    color: white;
}
p.family_disease {
    position: relative;
}
p.family_disease label {
    position: absolute;
    top: 0;
    margin: 0;
    padding: 0;
    line-height: 1.8em;
    font-size: 1.5rem;
    text-indent: 0.3em;
}
p.family_disease textarea {
    border-radius: 0 0 5px 5px;
    border-top: none;
    margin: 0;
    padding-top: 1.5em;
}
select.select_family {
    margin: 0;
    padding: 0;
    border: none;
    width: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
label.select_family {
    position: relative;
}
label.select_family:after {
    display: block;
    content: "▼";
    position: absolute;
    pointer-events: none;
    top: 1.6em;
    left: 3em;
}
p.inner-caption {
    position: relative;
}
p.inner-caption label {
    position: absolute;
    top: 5px;
    left: 5px;
    font-size: 1.5rem;
    line-height: 1em;
    margin: 0;
    padding: 0;
}
</style>
