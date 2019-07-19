const Article= require('../models/article')
const {ObjectId}= require('mongodb')


class articleController{

    static getStatus(req, res, next){
        // console.log('masuk get publish', req.params.id)
        Article.find({author: ObjectId(req.params.id), status: req.params.status})
        .then(articles=>{
            // console.log(articles)
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static getAll(req, res, next){
        Article.find({})
        .populate('author')
        .then(articles=>{
            // console.log(articles, 'ini article')
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static getOne(req, res, next){
        Article.findById(ObjectId(req.params.id))
        .then(article =>{
            res.status(200).json(article)
        })
        .catch(next)
    }

    static create(req, res, next){
        let input= req.body.tags.split(',')
        let tags= [...new Set(input)]
        // let tags= [input]

        let newArticle= new Article({
            title: req.body.title,
            thumbnail: req.file.cloudStoragePublicUrl,
            content: req.body.content,
            author: req.decode.id,
            tags: tags,
            status: req.params.status
        })
        console.log('masuk create')
            Article.findOne({title: req.body.title})
            .then(data=>{
                if(data){
                    Article.findByIdAndUpdate(data._id,{
                        title: req.body.title,
                        thumbnail: req.body.thumbnail,
                        content: req.body.content,
                        tags: req.body.tags,
                        status: req.params.status,
                    })
                }else{
                    newArticle.save()
                    .then(article=>{
                        res.status(200).json(article)
                    })
                    .catch(next)
                }
            })
            .catch(next)
    }

    static updatePut(req, res, next){
        console.log(req.params.title)

        if(req.file.cloudStoragePublicUrl){
            let input= req.body.tags.split(',')
            let tags= [...new Set(input)]

            Article.findById(req.params.id)
            .then(article =>{
                console.log(article, 'article yang ketemu update put')
                
                article.title= req.body.title || article.title
                article.thumbnail= req.file.cloudStoragePublicUrl || article.thumbnail
                article.content= req.body.content || article.content
                article.tags= tags || article.tags
                article.status= req.params.status
                return article.save()
            })
            .then(article =>{
                res.status(200).json(article)
            })
            .catch(next)
        }else{
            let input= req.body.tags.split(',')
            let tags= [...new Set(input)]

            Article.findById(req.params.id)
            .then(article =>{
                console.log(article, 'article yang ketemu update put')
                
                article.title= req.body.title || article.title
                article.thumbnail= req.body.thumbnail || article.thumbnail
                article.content= req.body.content || article.content
                article.tags= tags || article.tags
                article.status= req.params.status
                return article.save()
            })
            .then(article =>{
                res.status(200).json(article)
            })
            .catch(next)
        }

    }

    static updatePatch(req, res, next){
        Article.findByIdAndUpdate(ObjectId(req.params.id), { [req.body.field] : req.body.value })
        .then(article=>{
            res.status(200).json(article)
        })
        .catch(next)
    }

    static delete(req, res, next){
        Article.findByIdAndDelete(ObjectId(req.params.id))
        .then(article=>{
            res.status(200).json(article)
        })
        .catch(next)
    }

    static searchByTag(req, res, next){
        let tag= req.query.tag.toLowerCase()

        Article.find({})
        .populate('author')
        .then(articles =>{
            let data=[]
            articles.forEach(article =>{
                if(article.tags.includes(tag)){
                    data.push(article)
                }
            })

            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports= articleController