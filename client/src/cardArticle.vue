<template>
    <div>
        <div class="card">
            <div class="card-image">
                <figure class="image is-5by3">
                    <img :src="article.thumbnail" alt="Thumbnail">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{{article.title}}</p>
                        <p class="subtitle is-6">by {{article.author.name}}</p>
                    </div>
                </div>

                <div class="content">
                    <p v-html="article.content"></p>
                    <div class="tags">
                        <span v-for="(tag, index) in article.tags" 
                            :key="index"
                            @click.prevent="triggerSearch(tag)" 
                            class="tag is-danger">
                            <a style="color: white">{{tag}}</a>
                        </span>
                    </div>
                    <br>
                    <p>Posted on: {{createdDate}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name:'cardArticle',
    props: ['article'],
    data(){
        return {
            createdDate:''
        }
    },
    methods:{
        triggerSearch(tag){
            this.$emit('searchTag', tag)
        }
    },
    created(){
        this.createdDate= moment(this.article.createdDate).format("dddd, MMMM Do YYYY")
    }
}
</script>

<style>

</style>
