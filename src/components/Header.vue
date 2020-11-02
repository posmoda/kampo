<template>
    <header ref="header">
        <h1><router-link to="/">漢方初診レジストリー（仮）</router-link></h1>
    </header>
</template>
<script>
export default {
    name: 'Header',
    mounted () {
        let headerHeight = this.$refs.header.clientHeight;
        console.log( headerHeight );
    }
}
</script>
