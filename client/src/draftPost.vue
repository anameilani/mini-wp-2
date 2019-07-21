<template>
    <div v-if="condition == 'mydraft'" style=" margin-left:15%;">
        <h3 id="title">My Draft Articles</h3>
        <hr style="width: 975px; margin-top:-2%; background-color:black">

        <div class="columns " v-if="mydraftPosts.length == 0" style="margin-top:20px;">
            <div class="column" >
                <h3 style="text-align:center; font-size: 24px;">No Draft Article</h3>
            </div>
        </div>

        <!-- Card Article -->
        <div id="draft-card" class="card" v-for="article in mydraftPosts" :key="article._id" style="height:125px; margin-bottom:20px" >
            <div class="card-content is-paddingless">
                <div class="content columns">
                    <div class="column is-one-quarter">
                        <figure >
                            <img :src="article.thumbnail" style="width:150px; height:100px">
                        </figure>
                    </div>
                    <div class="column is-half">
                        <p style="font-weight: bold">{{article.title}}</p>
                        <p>Created date: {{new Date(article.createdAt).toLocaleDateString('en-US',
                                        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</p>
                    </div>
                    <div class="column is-one-quarter" style="margin-top:3%">
                        <a class="button is-link is-rounded" @click="toPreview(article)">
                            <i class="fas fa-share"></i> Preview 
                        </a>
                        <a @click.prevent="upload(article._id)">
                            <i class="fas fa-upload" style="font-size: 22px; margin-top:5px"></i> |
                        </a>
                        <a @click.prevent="toEdit(article)">
                            <i class="fas fa-edit" style="font-size: 22px; margin-top:5px"></i> |
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
          this.$emit('changeComponent', 'editdraft', value)
        },
        toPreview(value){
             this.$emit('changeComponent', 'preview', value)
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
        upload(id){
            axios({
                url: `/articles/${id}`,
                method: 'patch',
                data:{
                    field: 'status',
                    value: 'published'
                },
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) =>{
                this.$emit('toHome', 'home')
            })
            .catch(err => {
                console.log('error post article')
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
                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Your article have been deleted!',
                            showConfirmButton: false,
                            timer: 1500
                        })
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
   #title {
       margin-top: 8%;
       margin-bottom: 3%;
       text-align: center;
       font-size: 24px;
       font-weight: bold
   }
</style>
