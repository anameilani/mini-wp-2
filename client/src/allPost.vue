<template>
    <div v-if="condition == 'home'">
        <div class="field is-grouped column is-three-fifths is-offset-one-fifth">
            <div class="field-label is-normal">
                <label class="label">Keyword: </label>
            </div>
            <div class="control">
                <input v-model="keyword" class="input" type="text" placeholder="Keyword">
            </div>
             <div class="field-label is-normal">
                <label class="label">Type: </label>
            </div>
            <div class="control">
                <div class="select" @change="chooseType">
                    <select>
                    <option value="title">Title</option>
                    <option value="tag">Tag</option>
                    </select>
                </div>
            </div>
            <a class="button is-danger is-rounded" @click="fetchAllPost">Reset</a>
        </div>
        <div class="row" v-if="filterArticle.length != 0">
            <div class="colums" >
                <div class="column is-half" v-for="data in filterArticle" :key="data._id" >
                    <cardArticle :article="data" @searchTag="fetchSearchTag"></cardArticle>
                </div>
            </div>
        </div>

        <div class="columns" v-if="filterArticle.length == 0">
            <div class="column" >
                <h3 style="text-align:center">Article Not Found</h3>
            </div>
        </div>
    </div>
</template>

<script>
import axios from './api/api.js'
import cardArticle from './cardArticle.vue'

export default {
    name: 'allPost',
    props:[ 'condition'],
    components:{
        cardArticle
    },
    data(){
        return {
            type:'title',
            keyword:'',
            articles:[],
        }
    },
    methods:{
        chooseType(event){
            this.type= event.target.value
        },
         fetchAllPost(){
             console.log('masuk fetch all post')
            axios({
                url:`/articles`,
                method: 'get',
                headers:{
                    'token': localStorage.token
                }
            })
            .then(({data}) =>{
                // console.log('ini data hasil fetch', data)
                this.articles= data
                // console.log(this.articles, 'ini setelah fetch')
            })
            .catch(err => {
                console.log('error fetch all data'),
                console.log(err)
            })
        },
         fetchSearchTag(tag){
             console.log('search tag', tag)
             axios({
                 url:`/articles/search/by/tag?tag=${tag}`,
                 method: 'get',
                 headers:{
                     'token': localStorage.token
                 }
             })
             .then(({data}) => {
                //  console.log(data)
                 this.articles= data
             })
             .catch(err =>{
                 console.log('error serach tag')
                 console.log(err)
             })
        }
    },
    watch:{

        condition: function(value){
            // console.log(value, 'ini value condition')
            this.fetchAllPost()
        }
    },
    mounted(){
        this.fetchAllPost()
    },
    computed:{
        filterArticle(){
            // console.log(this.articles, 'this articles')
            if(this.type == 'title'){
                let dataFilter= this.articles.filter(article => {
                    // console.log(article.title, this.keyword, '====')
                    return article.title.toLowerCase().includes(this.keyword.toLowerCase())
                })

                // if(dataFilter.length === 0) return this.articles
                //     else
                     return dataFilter
               
            }
            else if(this.type == 'tag'){
                console.log('masuk sini')
                // let dataFilter= this.articles.filter(article => {
                //     console.log(article.tags, this.keyword, '====')
                //     return article.tags.filter.toLowerCase().includes(this.keyword.toLowerCase())
                let dataFilter=[]
                return this.articles.forEach(article =>{
                    if(article.tags.includes(this.keyword)){
                         return dataFilter.push(article)
                    }
                    
                })
                    
                

                // if(dataFilter.length === 0) return this.articles
                //     else 
                    return dataFilter
            }
        }
    }
}
</script>

<style>

</style>
