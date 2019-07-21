<template>
    <div v-show="page == 'login'" id="register-page">
        <nav class="navbar is-transparent" style="background: none;">
            <div class="navbar-brand" @click="showLanding" id="icon-group">
                <a href=""  id="logo-icon">
                    <i class="fas fa-blog"></i>
                </a>
                <a href=""  id="logo-word">
                    SayWords
                </a>
            </div>

                <div class="navbar-end" >
                <div class="navbar-item">
                    <div class="field is-grouped" style="magin-right: 30px;">
                    <p class="control">
                        <a class="button is-link is-outlined" @click="showLogin">
                            Log In
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

        <!-- Register Section -->
        <div class="row container" style="margin-top: 5%;">
            <div class="columns">
                <!-- Text Section -->
            <div class="column is-6">
                <div class="footer" style="background: none; color:white; margin-top:10%">
                    <div class="content has-text-centered">
                        <h2 style="font-weight: bold; color: blue">Say Whay You Feel With The Words!</h2>
                        <p>“Start writing, no matter what. The water does not flow until the faucet is turned on.”</p>
                        <p style="font-weight: bold"> - Louis L’Amour </p>
                    </div>
                </div>
            </div>
            <div class="column is-4 is-offset-1" style="margin-top:5%;">
                <h1 id="signin-text">Sign In</h1>
                <!-- Form Register Section -->
                
                <form @submit.prevent="login">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input class="input is-danger" type="email"
                            placeholder="Email" 
                            v-model="user.email"
                            autocomplete="off"
                            >
                            <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control has-icons-left">
                            <input class="input is-danger" type="password"
                            placeholder="Password"
                            v-model="user.password"
                            autocomplete="off"
                            >
                            <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <input type="submit" class="button is-danger" style="margin-left:40%" value="Sign In" >
                </form>

                <h2 id="text-other">Login With Another Account:</h2><br>
                <g-signin-button 
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    <i class="fab fa-google" style="color: red"></i> Sign in with Google
                </g-signin-button>

            </div>
        </div>
            </div>
</div>
</template>

<script>
import axios from './api/api.js'

export default {
    name:'loginPage',
    props:['page'],
    data(){
        return {
            user:{
                email:'',
                password:''
            },
            googleSignInParams: {
                client_id: '1036560879353-q3uag856la0eg437bfv7o742pafl5bl9.apps.googleusercontent.com'
            }
        }
    },
    methods:{
        showLanding(){
            this.$emit('changeDirection', "landing")
        },
        showRegister(){
            this.$emit('changeDirection', "register")
        },
        showLogin(){
            this.$emit('changeDirection', "login")
        },
        showHome(){
            this.$emit('changeDirection', "home")
        },
        login(){
            axios({
                method: "post",
                url: `/users/login`,
                data:this.user
            })
            .then(({data}) => {
            console.log('success login')

            this.user.email=''
            this.user.password=''
            localStorage.setItem('name', data.name)
            localStorage.setItem('token', data.token)
            this.showHome()

            })
            .catch(function(err){
            console.log('masuk error login')
            console.log(err, 'ini errroorrrr')
            })

        },
        onSignInSuccess (googleUser) {
            const profile = googleUser.getBasicProfile() // etc etc
            const idToken= googleUser.getAuthResponse().id_token

            axios({
                url: `/users/loginGoogle`,
                method: 'post',
                data:{
                    idToken: idToken
                    }
             })
             .then(({data}) => {
                console.log('success login')

                this.user.email=''
                this.user.password=''
                localStorage.setItem('name', data.name)
                localStorage.setItem('token', data.token)
                this.showHome()

                })
            .catch(function(err){
                console.log('masuk error login')
                console.log(err, 'ini errroorrrr')
                })

            },
        onSignInError (error) {
            console.log('error login google')
            console.log(error)
            }
        

    }

}
</script>

<style scoped>
#register-page{
    height: 100vh;
    background-color: black
}
 #logo-icon i{
        color:#00cc00;
        font-size: 30px;
        margin-left: 40%;
        margin-top: 20%
    }

#logo-word{
        color:#00cc00;
        font-size: 20px;
        margin-left: 10%;
        margin-top: 10%
    }
label{
    color: white
}
#signin-text{
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: white
}

#text-other{
    margin-top: 20px;
    text-align: center;
    color: white;
    font-weight: bold;

}
.g-signin-button {
  margin-left: 30%;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: white;
  color: black;
  box-shadow: 0 3px 0 gray;
}


</style>
