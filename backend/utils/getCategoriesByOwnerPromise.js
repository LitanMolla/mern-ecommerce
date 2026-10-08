const Category = require('../models/categoryModel')
const SubCategory = require('../models/subCategoryModel')

const getCategoriesByOwnerPromise = async (id) => {
    const categories = await Category.find({ owner: id }).populate('owner').lean()
    const ownerCategoryPromise = new Promise((resolved, rejected) => {
        try {
            let data = []
            categories.map(async (category) => {
                const subcategories = await SubCategory.find({ parentCategory: category._id })
                const categoryWithSubcategories = { ...category, subCategory: subcategories }
                data.push(categoryWithSubcategories)
                if (data.length == categories.length) {
                    resolved(data)
                }
            })
        } catch (error) {
            rejected(error)
        }
    })
    return ownerCategoryPromise
        .then(data => data)
        .catch(error => { console.log(error) })
}

module.exports = getCategoriesByOwnerPromise