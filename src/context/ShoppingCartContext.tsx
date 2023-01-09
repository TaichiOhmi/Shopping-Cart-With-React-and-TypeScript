import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

// contextは複数のcomponentsやpageで同じ値や関数を使うのに便利！！

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

// contextを作成
// createContext()の引数にShopppingCartContextとして型アサーションした{}を使う。
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// ShoppingCartContextを引数に入れたuseContext()を返すuseShoppingCart()
export const useShoppingCart = () => {
  // useContextを作成したcontextを引数にして呼ぶ。
  return useContext(ShoppingCartContext);
};

//
export const ShoppingCartProvider = ({
  // 上で定義したShoppingCartProviderPropsというタイプのchildrenという引数
  children,
}: ShoppingCartProviderProps) => {

  // cartが空いてるかを示すState
  const [isOpen, setIsOpen] = useState(false);

  // localStorageにcart内アイテムを保存
  // 詳しくはuseLocalStorage.tsを参照。
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "cart-items",
    []
  );

  // cart内の全てのアイテムの数量の合計を返す。
  // 配列.reduce((total, 配列のitem) => 配列のitem.quantity + total, 初期値)のように、結果を蓄積させた値を返すことができる。
  const cartQuantity = cartItems.reduce(
    (totalQuantity, item) => item.quantity + totalQuantity,
    0
  );

  // cartを開閉するための関数
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // cartItem.find()で値が見つかった場合は、quantityを返し、そうで無ければ、0を返す。
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  };

  // cart内のアイテムを増やす
  const increaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {
      // カート内にidが一致する商品がない時、そのidの商品の数を１にする。
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      
      // カート内にidが一致する商品がある時、
      } else {

        // cart内アイテムをmapで回し、
        return currentItems.map((item) => {
          
          // idが一致する商品のquantityを1つ増やす。
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };

          // idが違う場合はそのまま返す。
          } else {
            return item;
          }
        });
      }
    });
  };

  // cart内のアイテムを減らす
  const decreaseCartQuantity = (id: number) => {
    setCartItems((currentItems) => {

      // カート内にidが一致する商品があり、そのquantityが１の時、
      if (currentItems.find((item) => item.id === id)?.quantity == 1) {
        // idが一致する商品を抜いたデータを返す。
        return currentItems.filter((item) => item.id !== id);
      
      // カート内にidが一致する商品があるが、その数が1ではない時、
      } else {

        // cart内アイテムをmapで回し、
        return currentItems.map((item) => {

          // idが一致する商品のquantityを1つ減らす。
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };

          // idが違う場合はそのまま返す。
          } else {
            return item;
          }
        });
      }
    });
  };

  // カート内の選んだ商品を全てカートから出す。
  const removeFromCart = (id: number) => {
    setCartItems((currentItems) => {
      // idが一致するitemを除いたデータを返す。
      return currentItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
      }}
    >
      {/* 子ノード */}
      {children}
      {/* ShoppingCart components */}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
