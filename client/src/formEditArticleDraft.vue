<template>
    <div v-if="condition == 'editdraft'" style="margin-top: 7%; margin-left:15%">
        <!-- Inner navbar -->
        <div class="columns is-mobile is-centered">
            <div class="column is-four-fifths">
                <nav class="navbar is-light" role="navigation" aria-label="main navigation">
                    <div class="navbar-end">
                        <div class="navbar-item active">
                            <a class="nav-link" @click.prevent="postArticle">
                                <i class="fas fa-plus"></i> Post
                            </a>
                        </div>
                        <div class="navbar-item">
                            <a class="nav-link" href="#" @click.prevent="close">
                                <i class="fas fa-times"></i> Close
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        
        <!-- Form Edit Post -->
        <div class="column is-10" style="margin-top: -20px;">
            <h3 id="newarticle">Edit Article</h3>
        <form>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Title</label>
                </div>
                <div class="field-body">
                    <div class="field">
                    <div class="control">
                        <input v-model="article.title" class="input is-info is-hovered" type="text" placeholder="e.g. How to Make A Pancake">
                    </div>
                    <p class="help is-black">
                        This field is required
                    </p>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Thumbnail</label>
                </div>
                <div class="field-body">
                    <div class="file has-name is-small is-link">
                        <label class="file-label">
                            <input class="file-input" @change="setThumbnail" type="file" name="pict">
                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose a file…
                            </span>
                            </span>
                            <span class="file-name">
                            {{article.thumbnail}}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Tags</label>
                </div>
                <div class="field-body">
                    <div class="field">
                    <div class="control">
                        <input v-model="article.tags" class="input is-info is-hovered" type="text" placeholder="e.g. travelling;nature;beach">
                    </div>
                    <p class="help is-black">
                        Separate tags using semicolon(;), without space.
                    </p>
                    </div>
                </div>
            </div>            
            <div class="field" style="margin-left:10%">
                <label class="label">Content</label>
                <div class="control" style="margin-left: 5%">
                    <wysiwyg v-model="article.content"></wysiwyg>
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <p class="control" @click="saveArticle">
                    <a class="button is-success">
                    Save
                    </a>
                </p>
            </div>
        </form>

        </div>

    </div>
</template>


<script>
import "vue-wysiwyg/dist/vueWysiwyg.css";
import axios from './api/api.js'

export default {
    name:'editDraftArticle',
    props:['condition', 'article'],
    data(){
        return {

        }
    },
    methods:{
        close(){
            console.log('close edit draft ketrigger')
            this.$emit('changeComponent', 'mydraft')
        },
        setThumbnail(){
            this.article.thumbnail= event.target.files[0]
            console.log(this.article.thumbnail)
        },
        postArticle(){
            console.log('masuk save article')
             
             let formData = new FormData()
                 formData.append('title', this.article.title)
                 formData.append('thumbnail', this.article.thumbnail)
                 formData.append('tags', this.article.tags)
                 formData.append('content', this.article.content)
             
            axios({
                url: `/articles/${this.article._id}/published`,
                method: "put",
                data: formData,
                headers:{
                    'token': localStorage.token
                    }
                })
                .then(({data})=>{
                    // console.log(data)
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Your article have been published!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$emit('changeComponent', 'home')
                    
                })
                .catch(function(err){
                    console.log('masuk error draft')
                    console.log(err)

                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Check What You Filled in!',
                    })
                     
                })
        },
        saveArticle(){
            console.log('masuk save article')
             
             let formData = new FormData()
                 formData.append('title', this.article.title)
                 formData.append('thumbnail', this.article.thumbnail)
                 formData.append('tags', this.article.tags)
                 formData.append('content', this.article.content)
             
            axios({
                url: `/articles/${this.article._id}/draft`,
                method: "put",
                data: formData,
                headers:{
                    'token': localStorage.token
                    }
                })
                .then(({data})=>{
                    // console.log(data)
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Your article have been saved!',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    this.$emit('changeComponent', 'mydraft')
                    
                })
                .catch(function(err){
                    console.log('masuk error draft')
                    console.log(err)

                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Check What You Filled in!',
                    })
                    
                })
        }

    }

}
</script>

<style scoped>
#newarticle{
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
