```
//! Example resource router structure

backend/
└── routes/
    ├── index.js             # Main router
    └── api/
        ├── index.js         # API router
        ├── users.js         # User routes (/api/users/...)
        ├── products.js      # Product routes (/api/products/...)
        └── orders.js        # Order routes (/api/orders/...)
```

```
//! In the api/index.js file, you would connect these routers:

// backend/routes/api/index.js
const router = require('express').Router();
const usersRouter = require('./users');
const productsRouter = require('./products');
const ordersRouter = require('./orders');

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

module.exports = router;
```