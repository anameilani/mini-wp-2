<template>
    <div v-if="page == 'home'">
        <!-- Navbar -->
         <nav class="navbar has-shadow is-black" style="box-shadow: 10px 10px 5px lightgrey;">
            <div class="navbar-brand" @click.prevent="showHome" id="icon-group">
                <a href=""  id="logo-icon">
                    <i class="fas fa-blog"></i>
                </a>
                <a href=""  id="logo-word">
                    SayWords
                </a>
            </div>

                <div class="navbar-end"  >
                <div class="navbar-item" >
                    <div class="field is-grouped" >
                    <p class="control" >
                        <a class="button is-danger is-outlined" @click.prevent="logout" style="magin-right: 20%;">
                            <i class="fas fa-sign-out-alt" style="font-size: 20px;"></i>
                        </a>
                    </p>
                    </div>
                </div>
            </div>
        </nav>

        <div class="row ">
        <div class="columns">
        <!-- Side Bar -->
        <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p class="menu-label is-hidden-touch">Navigation</p>
            <ul class="menu-list">
            <li>
                <a href="" class="">
                <span class="icon"><i class="fa fa-home"></i></span> Home
                </a>
            </li>
            <li>
                <a href="" class="#" @click.prevent="showCreate">
                <span class="icon"><i class="fa fa-plus"></i></span> New Post
                </a>
            </li>
            <li>
                <a href="" class="is-active">
                <span class="icon"><i class="fa fa-table"></i></span> My Post
                </a>

                <ul>
                <li>
                    <a href="">
                    <span class="icon is-small"><i class="fa fa-link"></i></span> Published
                    </a>
                </li>
                <li>
                    <a href="">
                    <span class="icon is-small"><i class="fa fa-link"></i></span> Draft
                    </a>
                </li>
                </ul>
            </li>
            
            </ul>
        </aside>
        
                <div class="column is-10">
                    <allPost 
                        :condition="condition" 
                        @changeComponent="changeCondition"
                        
                    ></allPost>
                    <formAddArticle :condition="condition" @changeComponent="changeCondition"></formAddArticle>
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>
import axios from './api/api.js'
import formAddArticle from './formAddArticle.vue'
import allPost from './allPost.vue'

export default {
    name:'home',
    props: ['page'],
    components:{
        formAddArticle,
        allPost
    },
    data(){
        return{
            condition:'home',
            allArticles:[],
        }
    },
    methods:{
        showHome(){
            this.condition= 'home'
        },
        showCreate(){
            console.log('masuk show create');
            
            this.condition= 'create'
            console.log(this.condition);

        },
        changeCondition(value){
            this.condition= value
            
        },
       
        logout(){
            Swal.fire({
                title: 'Are you sure to sign out?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.value) {
                // localStorage.clear()
                // this.$emit('changeDirection', "login")

                var auth2 = gapi.auth2.getAuthInstance();
                    auth2.signOut()
                    .then(() =>{

                    console.log('User signed out')
                    localStorage.clear()
                    this.$emit('changeDirection', "login")
                    })
                    .catch(function(err){
                    console.log(err)
                    })
                
                
                }
            })
        },
    },
    created() {
        
    }

}
</script>

<style scoped>

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

</style>
