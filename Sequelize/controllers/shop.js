const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  // Product.findAll is sequelize method
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getNewProducts();
    })
    .then((products) => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: products.map((product) => ({
          productData: product, // Assuming product data is directly accessible from the product object
          qty: product.cartItem.quantity,
        })),
      });
    })
    .catch((err) => console.log(err));
};

module.exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getNewProducts({
        where: { id: productId },
      });
    })
    .then((products) => {
      const product = products[0];
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
      }
      return product || Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addNewProducts(product, {
        through: {
          quantity: newQuantity,
        },
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getNewProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect('/cart');
    })
    .catch((err) => console.log(err));

  Product.findByPk(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addNewProducts(
            products.map((product) => {
              product.orderItem = {
                quantity: product.cartItem.quantity,
              };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      fetchedCart.setNewProducts(null);
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
