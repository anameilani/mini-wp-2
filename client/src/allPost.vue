<template>
    <div v-if="condition == 'home'">
        
        <div class="field is-grouped column is-three-fifths is-offset-one-fifth" style="margin-top:7%;">
            <div class="field-label is-normal" >
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
                    <option value="author">Author</option>
                    </select>
                </div>
            </div>
            <a class="button is-danger is-rounded" @click="reset">Reset</a>
        </div>
        <div class="row" v-if="filterArticle.length != 0">
            <div class="colums  is-centered" >
                <div class="column is-half" v-for="data in filterArticle" :key="data._id" style="margin-left:30%">
                    <cardArticle 
                        :article="data" 
                        @searchTag="fetchSearchTag"
                        @toReadmore="showReadmore(data)"
                        ></cardArticle>
                </div>
            </div>
        </div>

        <div class="columns " v-if="filterArticle.length == 0" style="margin-top:20px;">
            <div class="column" >
                <h3 style="text-align:center; font-size: 24px;">Article Not Found</h3>
            </div>
        </div>
    </div>
</template>

<script>
import axios from './api/api.js'
import cardArticle from './cardArticle.vue'

export default {
    name: 'allPost',
    props:[ 'condition', 'inputTag'],
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
        showReadmore(article){
            this.$emit('changeComponent', 'readmore', article)
        },
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
                 this.$emit('changeTag','')
             })
             .catch(err =>{
                 console.log('error serach tag')
                 console.log(err)
             })
        },
        reset(){
            this.type='title'
            this.keyword=''
            this.fetchAllPost()
        }
    },
    watch:{

        condition: function(value){
           if(this.condition =='home' && this.inputTag == '')
            this.fetchAllPost()
        },
        inputTag : function(value){
            if(this.inputTag !=''){
                this.fetchSearchTag(this.inputTag)
            }
        }
        
    },
    created(){
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

                let dataFilter=[]
                this.articles.forEach(article =>{
                    console.log('jalan for each')
                    if(article.tags.includes(this.keyword)){
                         dataFilter.push(article)
                    }
                    
                })

                if(dataFilter.length === 0) return this.articles
                    else return dataFilter
                    this.keyword=''
            }
            else if(this.type == 'author'){
                let dataFilter= this.articles.filter(article => {
                    return article.author.name.toLowerCase().includes(this.keyword.toLowerCase())
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
