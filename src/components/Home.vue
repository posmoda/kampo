<template>
    <main>
        <h1>ようこそ漢方レジストリーへ</h1>
        <ul>
            <li>症例選択</li>
            <li>新規症例登録</li>
        </ul>
        <ul>
            <li><router-link :to="{path: 'visitdata?page=1'}">データ入力</router-link></li>
        </ul>
    </main>
</template>
<script>
export default {
};
</script>
