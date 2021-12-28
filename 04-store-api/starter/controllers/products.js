const Product = require('../models/product')

const getAllProducts = async (req, res) => {
    // throw new Error("testing async error")
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {}

    if (featured){
        queryObject.featured = featured === 'true'? true : false
    }
    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject = { $regex: name, $options: 'i' }
    }
    console.log(queryObject)
    let result = await Product.find(queryObject)
    // sort
    if (sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(fields){
        const selectFields = fields.split(',').join(' ')
        result = result.select(selectFields)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result;
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('name')
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}