<template>  
    <div v-if="page == 'home'">
        <!-- Navbar -->
         <nav class="navbar has-shadow is-black is-fixed-top" style="box-shadow: 10px 10px 5px lightgrey;">
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
        <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile" style="position: fixed">
            <p class="menu-label is-hidden-touch">Navigation</p>
            <ul class="menu-list">
            <li>
                <a id="home-btn" href="" @click.prevent="showHome" >
                <span class="icon"><i class="fa fa-home"></i></span> Home
                </a>
            </li>
            <li>
                <a id="newpost-btn" href="" @click.prevent="showCreate">
                <span class="icon"><i class="fa fa-plus"></i></span> New Post
                </a>
            </li>
            <li>
                <a id="mypost-btn" href="" @click.prevent="showMyPublish">
                <span class="icon"><i class="fa fa-table"></i></span> My Post
                </a>

                <ul>
                <li>
                    <a id="mypublishedpost-btn" href="" @click.prevent="showMyPublish">
                    <span class="icon is-small"><i class="fa fa-link"></i></span> Published
                    </a>
                </li>
                <li>
                    <a id="mydraftpost-btn" href="" @click.prevent="showMyDraft">
                    <span class="icon is-small"><i class="fa fa-link"></i></span> Draft
                    </a>
                </li>
                </ul>
            </li>
            
            </ul>
        </aside>
        
                <div class="column is-11" style="margin-left:4%">
                    <!-- Show All Published Post -->
                    <allPost 
                        :condition="condition"
                        :inputTag="tag"
                        @changeComponent="changeConditionWithVal"
                    ></allPost>
                    
                    <!-- Form Add New Article -->
                    <formAddArticle 
                        :condition="condition" 
                        @changeComponent="changeCondition"
                    ></formAddArticle>

                    <!-- Show All My Published Articles -->
                    <publishedPost 
                        :condition="condition" 
                        @changeComponent="showEdit"
                    ></publishedPost>

                    <!-- Show All My Draft Articles -->
                    <draftPost 
                        :condition="condition" 
                        @changeComponent="changeConditionWithVal"
                        @toHome="changeCondition"
                    ></draftPost>

                    <!-- Form to Edit Published Article -->
                    <formEditArticlePublish 
                        :condition="condition" 
                        :article="currentArticle"
                        @changeComponent="changeCondition"
                    ></formEditArticlePublish>

                    <!-- Form to Edit Draft Article -->
                    <formEditArticleDraft
                        :condition="condition"
                        :article="currentArticle"
                        @changeComponent="changeCondition"
                    ></formEditArticleDraft>

                    <!-- Preview Draft Article -->
                    <preview
                        :condition="condition"
                        :article="currentArticle"
                        @changeComponent="changeCondition"
                    ></preview>

                    <!-- View Full Article -->
                    <viewFullArticle
                        :condition="condition"
                        :article="currentArticle"
                        @searchTag= "triggerSearchTag"
                        @changeTag="changeCurrentTag"
                    ></viewFullArticle>
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>
import axios from './api/api.js'
import formAddArticle from './formAddArticle.vue'
import allPost from './allPost.vue'
import publishedPost from './publishedPost.vue'
import draftPost from './draftPost.vue'
import formEditArticlePublish from './formEditArticlePublished.vue'
import formEditArticleDraft from './formEditArticleDraft.vue'
import preview from './preview.vue'
import viewFullArticle from './viewFullArticle.vue'

export default {
    name:'home',
    props: ['page'],
    components:{
        formAddArticle,
        allPost,
        publishedPost,
        draftPost,
        formEditArticlePublish,
        formEditArticleDraft,
        preview,
        viewFullArticle
    },
    data(){
        return{
            condition:'home',
            allArticles:[],
            currentArticle:{},
            tag:''
        }
    },
    methods:{
        showHome(){
            this.condition= 'home'
            this.classActive('home')
        },
        showCreate(){
            this.condition= 'create'
            this.classActive('create')
        },
        showMyPublish(){
            this.condition= 'mypublished'
            this.classActive('mypublished')
        },
        showMyDraft(){
            this.condition= 'mydraft'
            this.classActive('mydraft')
        },
        showEdit(val, article){
            this.condition= val
            this.currentArticle= article
        },
        changeConditionWithVal(val, article){
            this.condition= val
            this.currentArticle= article
            console.log(this.currentArticle, this.condition, 'ini current article')
        },
        changeCondition(value){
            console.log(value, 'ini change condition')
            this.condition= value
        },
        triggerSearchTag(val, tag){
            this.condition= val
            this.tag= tag
           
            console.log('ini tag di home', tag)
        },
        changeCurrentTag(tag){
            this.tag=''
        },
       
        logout(){
            Swal.fire({
                title: 'Are you sure to sign out?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7a34eb',
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
        classActive(id){
            let homeBtn = document.getElementById('home-btn')
            let newpostBtn = document.getElementById('newpost-btn')
            let mypostBtn = document.getElementById('mypost-btn')
            let mypubslihedpostBtn = document.getElementById('mypublishedpost-btn')
            let mydraftpostBtn = document.getElementById('mydraftpost-btn')

            homeBtn.classList.remove("is-active");
            newpostBtn.classList.remove("is-active");
            mypostBtn.classList.remove("is-active");
            mypubslihedpostBtn.classList.remove("is-active");
            mydraftpostBtn.classList.remove("is-active");

            if(id == 'home')
                homeBtn.classList.add("is-active")
            else if(id == 'create')
                newpostBtn.classList.add("is-active")
            else if(id == 'mypublished'){
                mypostBtn.classList.add("is-active")
                mypubslihedpostBtn.classList.add("is-active")
            }else if(id == 'mydraft') {
                mypostBtn.classList.add("is-active")
                mydraftpostBtn.classList.add("is-active")
            }
        }
        
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
#home-btn:active{
    background-color: blue;
}

</style>
