import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import formatCurrency from "../utilities/formCurrency";
import storeItems from "../data/items.json";

// propsの型定義
type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  // propとして、isOpenを受け取る。

  // コンテクストから、closeCartとcartItemsを取り出す。
  const { closeCart, cartItems } = useShoppingCart();

  return (
    // isOpenがtrueの時、出現するOffcanvas,
    // showがtrueの時にvisible, onHideはclosebuttonかbackdrop(背景)がクリックされた時に呼ばれる。placementは左右上下のどこからOffcanvasが出てくるかを指定している。
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {/* cart内のアイテムのデータをCartItemコンポーネントに渡す。 */}
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                // cartに入っている商品のidを用いて、storeItems(全商品のリストのjson)から、idが一致する商品をitemに代入して取得。
                // itemがあった時、totalに個数分のitem.priceを足し、なければ0を足す処理
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price ?? 0) * cartItem.quantity;
                // ?. は　値がnullかundefinedのときundefinedが返る
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
