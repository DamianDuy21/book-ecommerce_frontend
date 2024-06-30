import { useEffect, useRef } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { doAddToCart } from "../../redux/CartReducer/cartReducer";
import { useDispatch } from "react-redux";

const ProductCard = (props) => {
    const { data } = props;
    const nav = useNavigate();
    const dispatch = useDispatch();
    const cardRef = useRef(null);

    const handleAddToCart = async () => {
        const product = {
            _id: data._id,
            thumbnail: data.thumbnail,
            name: data.name,
            price: (data.price - data.price / 100 * data.discount),
            quantity: 1,
            postedBy: data.postedBy,
            discount: data.discount,
            author: data.author,
            sold: data.sold
        };
        await dispatch(doAddToCart(product));
        message.info("Thêm vào giỏ hàng thành công")
    };

    useEffect(() => {
        const handleClick = (event) => {
            if (cardRef.current && cardRef.current.contains(event.target)) {
                const productCards = document.querySelectorAll("[data-product-card]");
                productCards.forEach(item => {
                    if (item !== cardRef.current) {
                        item.classList.remove("active");
                    }
                });

                cardRef.current.classList.toggle("active");
            }
        };

        const cardElement = cardRef.current;
        cardElement.addEventListener("click", handleClick);

        return () => {
            cardElement.addEventListener("click", handleClick);
        };
    }, []);

    return (
        <div data-product-card className='product-card' ref={cardRef}>
            <div className="product-overlay-hover"></div>
            <div className="product-overlay"></div>
            <div className="product-buttons">
                <Button onClick={() => nav(`/product-detail/${data._id}`)}>Chi tiết</Button>
                <Button onClick={handleAddToCart} className="option-button">Thêm vào giỏ</Button>
            </div>

            <div className='discount'>-{data.discount}%</div>
            <div className='img-wrapper'>
                <img className='img-cover' src={data.thumbnail} alt={data.name} />
            </div>
            <div className='product-info'>
                <div className='name medium-title'>{data.name}</div>
                <div className='prices small-title'>
                    <div className='new-price'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price - data.price / 100 * data.discount ?? 0)}
                    </div>
                    <div className='old-price'>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price ?? 0)}
                    </div>
                </div>
                <div className='more'>
                    <div className='posted-by'>
                        <span>Tác giả: </span>
                        <span className="tiny-title" style={{ color: "var(--main-blue)" }}>
                            {data.author}
                        </span>
                    </div>
                </div>
                <div>
                    <span>Đã bán: </span>
                    <span className="">
                        {data.sold}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
