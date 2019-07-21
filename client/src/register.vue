<template>
    <div v-if="page == 'register'" id="register-page">
        <nav class="navbar is-transparent" style="background: none;">
            <div class="navbar-brand" @click.prevent="showLanding" id="icon-group">
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
                        <a class="button is-link is-outlined" @click.prevent="showLogin">
                            Log In
                        </a>
                    </p>
                    <p class="control">
                        <a class="button is-success is-outlined" @click.prevent="showRegister">
                            Get Started
                        </a>
                    </p>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Register Section -->
        <div class="row container" style="margin-top: 5%">
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
            <div class="column is-4 is-offset-1" style="margin-top:5%">
                <h1 id="signup-text">Sign Up</h1>
                <!-- Form Register Section -->
                <p v-if="status" class="is danger" style="color: green; font-size: 18px;"> Success Resister New Account. Please <span><a href="" @click.prevent="showLogin">Sign In</a></span></p>
                <form @submit.prevent="register">
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control has-icons-left">
                            <input class="input is-danger" type="text"
                            placeholder="Name"
                            v-model="newUser.name"
                            autocomplete="off"
                            >
                            <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input class="input is-danger" type="email"
                            placeholder="Email" 
                            v-model="newUser.email"
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
                            v-model="newUser.password"
                            autocomplete="off"
                            >
                            <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <input type="submit" class="button is-danger" style="margin-left:40%" value="Sign Up">
                </form>

            </div>
        </div>
            </div>
</div>
</template>

<script>
import axios from './api/api.js'

export default {
    name:'registerPage',
    props:['page'],
    data(){
        return {
            newUser:{
                name:'',
                email:'',
                password:''
            },
            status: false,
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
        register(){
            console.log(this.newUser.name, 'registered name')
            axios({
                method: "post",
                url: `/users/register`,
                data:this.newUser
            })
            .then(({data}) => {
            console.log('success register')

            this.status= true
            this.newUser.name=''
            this.newUser.email=''
            this.newUser.password=''

            })
            .catch(function(err){
            console.log('masuk error register')
            console.log(err, 'ini errroorrrr')
            })

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
#signup-text{
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: white
}
</style>
