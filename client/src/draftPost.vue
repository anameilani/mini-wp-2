<template>
    <div  class="container" v-if="condition == 'mydraft'">
        <!-- Card Article -->
        <div id="publish-card" class="card" v-for="article in mydraftPosts" :key="article._id">
            <div class="card-content">
                <div class="content columns">
                    <div class="column is-one-quarter">
                        <figure class="image is-64x64">
                            <img :src="article.thumbnail">
                        </figure>
                    </div>
                    <div class="column is-half">
                        <p style="font-weight: bold">{{article.title}}</p>
                        <p>Created date: {{new Date(article.createdAt).toLocaleDateString('en-US',
                                        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
                    </div>
                    <div class="column is-one-quarter">
                        <a class="button">
                            <i class="fas fa-share"></i> Preview
                        </a>
                        <a @click.prevent="toEdit(article)">
                            <i class="fas fa-edit" style="font-size: 22px"></i> |
                        </a>
                        <a @click.prevent="remove(article._id, article.title)">
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
    name: 'draftPost',
    props:['condition'],
    data(){
        return {
            mydraftPosts: []
        }
    },
    methods:{
        toEdit(value){
          this.$emit('changeComponent', 'editpublish', value)
        },
        fetchDrat(){
            console.log('masuk fetch draft')
            axios({
                url:`/articles/status/draft`,
                method: 'get',
                headers:{
                    'token' : localStorage.token
                }
            })
            .then(({data}) => {
                // console.log(data, 'hasil fetch draft')
                this.mydraftPosts= data
            })
            .catch(err => {
                console.log('error fetch draft article')
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
                        this.fetchDrat()
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
        this.fetchDrat()
    },
    watch:{
        condition: function(val){
            this.fetchDrat()
        }
    }
}
</script>

<style scoped>
   
</style>
