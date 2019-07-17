<template>
    <div v-if="page == 'landing'">
        <div id="landing-page" class="container is-fullhd">
            <!-- Header -->
            <nav class="navbar is-transparent" style="background: none">
                <div class="navbar-brand">
                    
                </div>

                    <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped">
                        <p class="control">
                            <a class="button is-link is-outlined" @click="showLogin">
                                Sign In
                            </a>
                        </p>
                        <p class="control">
                            <a class="button is-success is-outlined" @click="showRegister">
                                Get Started
                            </a>
                        </p>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="row continer" id="container-logo">
                <div class="columns">
                    <div class="column is-5 is-offset-4">
                        <a href=""  id="logo-icon">
                            <i class="fas fa-blog"></i>
                        </a>
                        <a href=""  id="logo-word">
                            SayWords
                        </a>
                    </div>
                </div>
            </div>
            <div class="row" id="container-text">
                <div class="columns">
                    <div class="column is 4 is-offset-6">
                        <h1>Share everything what you want! </h1>
                        <h4>We serve what you need to write article. </h4>
                        <h4> Be creative and innovative as your wish.</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name:'landingPage',
    props:['page'],
    methods:{
        showRegister(){
            this.$emit('changeDirection', "register")
        },
        showLogin(){
            this.$emit('changeDirection', "login")
        }
    }
    
}
</script>

<style scoped>
    #landing-page{
        height: 100vh;
        width: 100%;
        background-image: url("https://storage.cloud.google.com/hacktiv-image/image-landing.png");
        background-size: cover
    }
    #logo-icon i{
        color:#00cc00;
        font-size: 80px;
    }

    #logo-word{
        color:#00cc00;
        font-size: 60px;
        margin-left: 20px;
    }

    #container-logo{
        margin-top: 10%;
    }

    #container-text{
        color: white;
        line-height: 1.5
    }

    #container-text h1{
        font-size: 28px;
        font-weight: bold
    }

    #container-text h4{
        font-size: 22px;
    }

</style>
