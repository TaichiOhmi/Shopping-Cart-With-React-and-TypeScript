import { Button, Card } from "react-bootstrap";
import formatCurrency from "../utilities/formCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

// 受け取るプロップスの型定義
type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const Store = ({ id, name, price, imgUrl }: StoreItemProps) => {

  // オブジェクトの分割代入で useShoppingCart()のコンテクストを受け取る。
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // idに対応する商品の個数を取得
  const quantity = getItemQuantity(id);

  // JSXを返す。
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add to Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ gap: ".5rem" }}
            >
              <div className="d-flex" style={{ gap: ".5rem" }}>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              </div>
              <div
                className="d-flex fs-3"
              >
                <span className="fw-bold me-2">{quantity}</span>in cart
              </div>
              <div className="d-flex">
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(id)}
                  size="sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Store;
