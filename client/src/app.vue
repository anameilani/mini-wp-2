<template>
    <div>
        <landingPage :page="currentPage" @changeDirection="changePage" ></landingPage>
        <registerPage :page="currentPage" @changeDirection="changePage"></registerPage>
        <loginPage :page="currentPage" @changeDirection="changePage"></loginPage>
        <home :page="currentPage" @changeDirection="changePage"></home>
    </div>
</template>

<script>
import landingPage from './landingPage.vue'
import registerPage from './register.vue'
import loginPage from './login.vue'
import home from './home.vue'

export default {
    data(){
        return {
            currentPage:'landing'
        }
    },
    components:{
        landingPage,
        registerPage,
        loginPage,
        home
    },
    methods:{
        changePage(value){
            this.currentPage= value
        }
    },
    created(){
        if(localStorage.token){
            this.currentPage='home'
        }else{
            this.currentPage='landing'
        }
    }
}
</script>

<style>

</style>
