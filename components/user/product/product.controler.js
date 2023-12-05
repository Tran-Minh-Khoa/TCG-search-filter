const ProductService = require('./product.service')

exports.getProducts = async (req, res,next) => {
  try {
    const filters = req.query.filters;
    const page = req.query.page || 1; // Lấy trang từ query string hoặc mặc định là 1
    const perPage = 24;
    const sort =req.query.sort ;
    const price =req.query.price ;
    console.log('filter',filters)
    console.log('page',page)
    console.log('sort',sort)
    const filteredProductsData = await ProductService.getProductsByFilter(filters, page, perPage, sort, price);

    res.render('user/product-page', {
      products: filteredProductsData.products,
      rarityCounts: filteredProductsData.rarityCounts,
      page : page,
      totalPages: filteredProductsData.totalPages,
      sortName: filteredProductsData.sortName,
      price: filteredProductsData.price
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsBySearch = async (req, res,next) => {
  try{
  const keyword = req.query.keyWord;
  const foundProducts = await ProductService.getProductsByName(keyword);
  res.json(foundProducts);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}
exports.getProductDetail = async (req, res,next) => {
    const id = req.params.id;
    const card = await ProductService.getProductsDetail(id);
    const scripts = [
      '/scripts/product-detail.js',
    ];
    const styles = [
      "/styles/product-detail.css"
    ];
  
    res.render('user/product-detail', 
    {
      layout: 'user/layouts/layout', 
      title: "Your Shopping Cart",
      scripts: scripts,
      styles: styles,
      product: card.cardInfo,
      relatedCards: card.relatedCard
    });
  }
exports.postReview = async (req, res,next) => {
  const cardId = req.params.id;
  console.log(req.body.review)
  const review = {
    name: req.body.name,
    content: req.body.review
  };
  const result = await ProductService.postReview(cardId, review);
  res.status(200).redirect('/products/detail/'+cardId);
}
exports.productExample = async (req, res,next) => {
  res.redirect('/');
}