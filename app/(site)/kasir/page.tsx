"use client";
import { useCartStore } from "@/lib/store/cart";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/db/product";

{
  /* kasir dari sini, di ubah sesuai kebutuhan menggunakan tailwind */
}

export default function page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((products: any) => {
      setProducts(products as any);
    });
  });

  const cart = useCartStore();

  function addToCart(product: any) {
    cart.addToCart(product);
  }

  function removeFromCart(id: any) {
    cart.removeFromCart(id);
  }

  function checkout() {
    cart.checkout();
  }

  function getCartTotal() {
    return cart.getCartTotal();
  }

  function getCartCount() {
    return cart.getCartCount();
  }

  function clearCart() {
    cart.clearCart();
  }

  useEffect(() => {});

  function handleView(id: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-blue-500 sm:text-[5rem]">
        Kasir
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/10 p-4 text-blue-500 hover:bg-white/20"
          >
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <h3 className="text-2xl font-bold">{product.price}</h3>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => removeFromCart(product.id)}>
              Remove from Cart
            </button>
            <button onClick={() => handleView(product.id)}>View</button>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/10 p-4 text-blue-500 hover:bg-white/20">
          <h3 className="text-2xl font-bold">Product: {products.length}</h3>
          <h3 className="text-2xl font-bold">Total: {getCartTotal()}</h3>
          <button onClick={checkout}>Checkout</button>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
}
