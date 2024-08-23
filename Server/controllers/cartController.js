const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, userId } = req.body;
//     // const userId = req.user.id; // Assuming you have user authentication
//     // We have comment this because we are working on Postman, and not able to store token and access data from it

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Cart.findOne({ userId });
//     console.log(cart);

//     if (!cart) {
//       cart = new Cart({
//         userId,
//         cartItems: [{ productId, quantity: 1, price: product.price }],
//       });
//     } else {
//       const itemIndex = cart.cartItems.findIndex(
//         (item) => item.productId == productId
//       );
//       if (itemIndex > -1) {
//         cart.cartItems[itemIndex].quantity++;
//       } else {
//         cart.cartItems.push({ productId, quantity: 1, price: product.price });
//       }
//       cart.count = cart.cartItems.length; // Update count
//     }

//     //Reduce Many values to single value
//     cart.totalPrice = cart.cartItems.reduce(
//       (total, item) => total + item.quantity * item.price,
//       0
//     );

//     await cart.save();

//     res.status(201).json(cart);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.addToCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        cartItems: [{ productId, quantity: 1, price: product.price }],
      });
    } else {
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.productId == productId
      );
      if (itemIndex > -1) {
        cart.cartItems[itemIndex].quantity++;
      } else {
        cart.cartItems.push({ productId, quantity: 1, price: product.price });
      }
    }

    cart.count = cart.cartItems.length;
    cart.totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    await cart.save();

    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getCartItems = async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId);
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  res.json(cart);
};
exports.removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    const cart = await Cart.findOne({ userId });
    console.log(cart);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.count = cart.cartItems.length; // Update count

    if (cart.cartItems.length === 0) {
      await Cart.deleteOne({ userId });
      return res.json({ message: "Cart is empty, cart deleted" });
    }

    await cart.save(); // Save the updated cart document

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
