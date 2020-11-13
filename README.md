#   Node API Store
## This is A Simple Stock Management Api with strong authentication system.JWT made this work more easy. Later All Api routes are going to be described...


## Orders API
**These API routes will be used for placing orders...**
- Get All Orders : { '/' }
- Get Order: { '/:orderId' }
- POST Order: { '/' } - [quantity -> int, productId ]
- PATCH Order: { '/:orderId' } - [quantity -> int, productId ]
- REMOVE Order: { '/:orderId' }

## Products API
**These API routes will be used for moderating Products...**
- Get All Products : { '/' }
- Get Products: { '/:productId' }
- POST Products: { '/' } - [name -> string, price->double, image: string ]
- PATCH Products: { '/:productId' } - [name -> string, price->double, image: str
- REMOVE Products: { '/:productId' }

## Users API
**These API routes will be used for moderating Users...**
- Get User: { '/' }
- POST Req > signUP: { '/signup' } - [email ]
- POST Req > Login: { '/login' } - [email, password ]

**Thank You ! That you have scroll the websites........**
