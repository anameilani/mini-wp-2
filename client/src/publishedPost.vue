<template>
    <div  class="container" v-if="condition == 'mypublished'">
        <h3 id="title">My Published Articles</h3>

        <!-- Card Article -->
        <div v-for="article in mypublishedArticles" :key="article._id">
        <div id="publish-card" class="card is-paddingless" >
            <div class="card-content is-paddingless">
                <div class="content columns">
                    <div class="column is-one-quarter">
                        <figure class=" is-48x48">
                            <img :src="article.thumbnail">
                        </figure>
                    </div>
                    <div class="column is-half" style="margin-top: 10px">
                        <p style="font-weight: bold">{{article.title}}</p>
                        <p>Last update: {{new Date(article.updatedAt).toLocaleDateString('en-US',
                                        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
                    </div>
                    <div class="column is-one-quarter" style="margin-top: 5%">
                        <a @click.prevent="toEdit(article)">
                            <i class="fas fa-edit" style="font-size: 22px"></i> |
                        </a>
                        <a @click="remove(article._id, article.title)">
                            <i class="fas fa-trash-alt" style="font-size: 22px"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    </div>
</template>

<script>
import moment from 'moment'
import axios from './api/api.js'


export default {
    name: 'publishedPost',
    props:['condition'],
    components:{
        
    },
    data(){
        return {
            mypublishedArticles: []
        }
    },
    methods:{
        toEdit(value){
          this.$emit('changeComponent', 'editpublish', value)
        },
        fetchPublished(){
            console.log('masuk fetch published')
            axios({
                url:`/articles/status/published`,
                method: 'get',
                headers:{
                    'token' : localStorage.token
                }
            })
            .then(({data}) => {
                // console.log(data, 'hasil fetch publish')
                this.mypublishedArticles= data
            })
            .catch(err => {
                console.log('error fetch publish article')
                console.log(err)
            })
        },
        remove(id, title){
            Swal.fire({
                title: 'Delete this Articles?',
                text: title,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sure!'
            })
            .then((result) => {
                if(result.value){
                    axios({
                        method: "delete",
                        url: `/articles/${id}`,
                        headers:{
                            'token': localStorage.getItem('token')
                            }
                    })
                    .then(data=>{
                        Swal.fire(
                            'Your article have been deleted!',
                            'Deleted!',
                            'success'
                        )
                        this.fetchPublished()
                    })
                    .catch(function(err){
                        console.log('masuk error')
                        console.log(err)
                    })
                }
            })
        }
    },
    created(){
        this.fetchPublished()
    },
    watch:{
        
        condition: function(val){
            this.fetchPublished()
        }
    }
}
</script>

<style scoped>
   #publish-card{
       margin-bottom: 20px;
   }
    #title {
       margin-top: 3%;
       margin-bottom: 2%;
       text-align: center;
       font-size: 24px;
       font-weight: bold
   }
</style>
