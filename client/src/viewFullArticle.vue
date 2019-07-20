<template>
    <div v-if="condition == 'readmore'">
        <h2 id="title" class="is-centered">{{article.title}}</h2>
        <figure >
            <img id="thumbnail-img" :src="article.thumbnail" alt="Thumbnail">
        </figure>
        <p v-html="article.content" style="margin-top: 10px; margin-left: 5%"><p>
             <div class="tags" style="margin-left: 5%; margin-top:3%">
                <span v-for="(tag, index) in article.tags" 
                    :key="index"
                    @click.prevent="triggerSearch(tag)"
                    class="tag is-danger">
                    <a style="color: white">{{tag}}</a>
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
    name: 'viewFullArticle',
    props: ['condition', 'article'],
    methods:{
        triggerSearch(tag){
            this.$emit('searchTag', 'home',tag)
        },
    },
    created(){
        this.createdDate= moment(this.article.createdDate).format("dddd, MMMM Do YYYY")
    }
}
</script>

<style scoped>
    #title{
        margin-top:3%;
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
