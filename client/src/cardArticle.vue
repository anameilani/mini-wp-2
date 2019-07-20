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
                    <p v-html="content"></p><span><p @click="triggerReadmore">...Readmore</p></span>
                    <div class="tags">
                        <span v-for="(tag, index) in article.tags" 
                            :key="index"
                            @click.prevent="triggerSearch(tag)" 
                            class="tag is-danger">
                            <a style="color: white">{{tag}}</a>
                        </span>
                    </div>
                    <p style="font-size: 14px">Posted on: {{createdDate}}</p>
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
            createdDate:'',
            content:''
        }
    },
    methods:{
        triggerSearch(tag){
            this.$emit('searchTag', tag)
        },
        triggerReadmore(){
            this.$emit('toReadmore')
        }
    },
    mounted(){
        this.createdDate= moment(this.article.createdDate).format("dddd, MMMM Do YYYY")
        this.content= this.article.content.substring(0,200)
    }
    
}
</script>

<style>

</style>
