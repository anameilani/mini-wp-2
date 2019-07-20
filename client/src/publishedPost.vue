<template>
    <div  class="container" v-if="condition == 'mypublished'">
        <!-- Card Article -->
        <div id="publish-card" class="card" v-for="article in mypublishedArticles" :key="article._id">
            <div class="card-content">
                <div class="content columns">
                    <div class="column is-one-quarter">
                        <figure class="image is-64x64">
                            <img :src="article.thumbnail">
                        </figure>
                    </div>
                    <div class="column is-half">
                        <p style="font-weight: bold">{{article.title}}</p>
                        <p>Last update: {{new Date(article.updatedAt).toLocaleDateString('en-US',
                                        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
                    </div>
                    <div class="column is-one-quarter">
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
    #published-card{
        margin-top: 30%
    }
</style>
