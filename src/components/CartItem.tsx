import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import formatCurrency from "../utilities/formCurrency";

// CartItemPropsの型定義
type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  // id, quantity をpropsとして受け取る。

  // contextから 3つの関数を受け取る。
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  // storeItems(jsonのやつ)からpropとして受け取ったidと同じ商品をitemとして取得。
  const item = storeItems.find((i) => i.id === id);

  //   item が null なら null を返す。
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt={item.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div className="">
          {item.name}
          {/* {quantity > 1 && ( */}
          <span className="text-muted" style={{ fontSize: ".65rem" }}>
            x{quantity}
          </span>
          {/* )}  */}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className="">{formatCurrency(item.price * quantity)}</div>
      <div className="d-flex align-items-center flex-column gap-2">
        <Button
          className="justify-content-center"
          size="sm"
          onClick={() => increaseCartQuantity(id)}
        >
          +
        </Button>
        <Button
          className="justify-content-center"
          size="sm"
          onClick={() => decreaseCartQuantity(id)}
        >
          -
        </Button>
      </div>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width=".75rem"
          height=".75rem"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
        </svg>
      </Button>
    </Stack>
  );
};

export default CartItem;
