<template>
    <div v-if="condition == 'preview'" style="margin-left: 10%; margin-top:7%">
        <div id="close-btn">
            <a  class="is-pulled-right" href="#" @click.prevent="showBack">
                <i class="fas fa-times"></i> Close
            </a>
        </div>
        

        <h2 id="title" class="is-centered">{{article.title}}</h2>
        <figure >
            <img id="thumbnail-img" :src="article.thumbnail" alt="Thumbnail">
        </figure>
        <p v-html="article.content" style="margin-top: 10px; margin-left: 5%"><p>
             <div class="tags" style="margin-left: 5%">
                <span v-for="(tag, index) in article.tags" 
                    :key="index"
                    class="tag is-danger">
                    {{tag}}
                </span>
            </div>
            <div id="footer">
                <p>By: {{article.author.name}}</p>
                <p>Posted on: {{createdDate}}</p>
            </div>

    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'preview',
    props: ['condition', 'article'],
     methods:{
       showBack(){
           this.$emit('changeComponent', 'mydraft')
       }
    },
    created(){
        this.createdDate= moment(this.article.createdDate).format("dddd, MMMM Do YYYY")
    }
}
</script>

<style scoped>
    #close-btn{
        margin-top: 5%
    }
    #title{
        margin-bottom: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold
    }
    #thumbnail-img{
        margin-left: 25%;
        width: 400px;
        height: 300px
    }
    #footer{
        margin-left: 5%;
        font-size: 14px;
    }
</style>
