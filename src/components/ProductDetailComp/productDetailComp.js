import { Button, Input, message } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import ImageGallery from "react-image-gallery";
import "./styles.css"
import "../../App.css"
import { useEffect, useState } from "react";
import DescriptionComp from "../DescriptionComp/descriptionComp";
import { useDispatch } from "react-redux";
import { doAddToCart } from "../../redux/CartReducer/cartReducer";
import { doAddToBuyNow } from "../../redux/BuyNowReducer/buyNowReducer";
const ProductDetailComp = (props) => {
    const { product } = props
    const [images, setImages] = useState([])
    const [currentQuantity, setCurrentQuantity] = useState(1);
    const nav = useNavigate()
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        const productt = {
            _id: product._id,
            thumbnail: product.thumbnail,
            name: product.name,
            price: (product.price - product.price / 100 * product.discount),
            quantity: currentQuantity,
            postedBy: product.postedBy,
            discount: product.discount,
            author: product.author,
            sold: product.sold
        }
        message.info("Thêm vào giỏ hàng thành công")
        dispatch(doAddToCart(productt))
    }
    const handleAddToBuyNow = () => {
        const productt = {
            _id: product._id,
            thumbnail: product.thumbnail,
            name: product.name,
            price: (product.price - product.price / 100 * product.discount),
            quantity: currentQuantity,
            postedBy: product.postedBy,
            discount: product.discount,
            author: product.author,
            sold: product.sold
        }
        console.log(productt)
        dispatch(doAddToBuyNow(productt))
        nav(`/buy-now/${product._id}`)
    }

    useEffect(() => {
        const getImages = async (product) => {

            let images = []
            product.image.forEach((image) => {
                images.push({
                    original: image,
                    thumbnail: image
                })
            })
            setImages(images)
        }

        getImages(product)
    }, [product, currentQuantity])

    return (<>
        <div className="detail-wrapper">
            <div className="image-section common-wrapper" >
                <ImageGallery items={images}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    renderLeftNav={() => { <></> }}
                    renderRightNav={() => { <></> }}
                    slideOnThumbnailOver={true}
                    lazyLoad={true}
                />
            </div>


            <div className="detail-section common-wrapper">
                <div>
                    <div className="name large-title">
                        {product.name}
                    </div>
                    <div className="posted-by">
                        <span className="tiny-title" style={{ marginBottom: "6px" }}>Tác giả:</span>
                        <span className="medium-title" style={{ color: "var(--main-blue)", marginLeft: "6px" }}>{product.author}</span>
                    </div>
                    <div className='prices'>
                        <span className="tiny-title">Giá:</span>
                        <div style={{ display: "flex", gap: "12px" }}>
                            <div className='new-price medium-title'>
                                <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price - product.price / 100 * product.discount ?? 0)}</span>
                            </div>
                            <div className='old-price medium-title'>
                                {/* {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(139000 ?? 0)} */}
                            </div>
                        </div>

                    </div>

                </div>

                <div data-payment-section-le1200 className="payment-section-le1200">
                    <div style={{ width: "100%", overflow: "hidden" }}>
                        <div className="tiny-title" style={{ marginBottom: "6px" }}>Ưu đãi:</div>
                        <div className="discounts">
                            <div className='discount'>-{product.discount}%</div>
                        </div>

                        <div className="quantity-section">
                            <div className="tiny-title title">Số lượng:</div>
                            <div className="quantity">
                                <Button disabled={currentQuantity == 1} onClick={() => {
                                    if (currentQuantity > 1) {
                                        setCurrentQuantity(currentQuantity - 1)
                                    }
                                }}>-</Button>
                                <input disabled={true} type={"number"} id="number" value={currentQuantity} defaultValue={1} min={1} max={100}
                                    onChange={() => {
                                        const number = document.getElementById("number")
                                        const maxQuantity = 100
                                        if (number.value >= maxQuantity) {
                                            number.value = maxQuantity
                                        }
                                        setCurrentQuantity(number.value)
                                    }}
                                />
                                <Button disabled={currentQuantity == 100} onClick={() => {
                                    if (currentQuantity < 100) {
                                        setCurrentQuantity(currentQuantity + 1)
                                    }
                                }}>+</Button>
                            </div>

                        </div>
                        <div className='temp-total'>
                            <div className="title tiny-title">Tạm tính:</div>
                            <span className="medium-title">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((product.price - product.price / 100 * product.discount) * currentQuantity ?? 0)}
                            </span>
                        </div>
                    </div>

                    <div className="detail-buttons">
                        <Button onClick={handleAddToCart}>Thêm vào giỏ</Button>
                        <Button type="primary" onClick={handleAddToBuyNow} className="tiny-title" >Mua ngay</Button>
                    </div>
                </div>

                <DescriptionComp desContent={product.description} />
            </div>

            <div data-payment-section-ge1200 className="payment-section-ge1200 common-wrapper">
                <div style={{ width: "100%", overflow: "hidden" }}>
                    <div className="tiny-title" style={{ marginBottom: "6px" }}>Ưu đãi:</div>
                    <div className="discounts">
                        <div className='discount'>-{product.discount}%</div>
                    </div>

                    <div className="quantity-section">
                        <div className="title tiny-title">Số lượng:</div>
                        <div className="quantity">
                            <Button disabled={currentQuantity == 1} onClick={() => {
                                if (currentQuantity > 1) {
                                    setCurrentQuantity(currentQuantity - 1)
                                }
                            }}>-</Button>
                            <input disabled={true} type={"number"} id="number" value={currentQuantity} defaultValue={1} min={1} max={100}
                                onChange={() => {
                                    const number = document.getElementById("number")
                                    const maxQuantity = 100
                                    if (number.value >= maxQuantity) {
                                        number.value = maxQuantity
                                    }
                                    setCurrentQuantity(number.value)
                                }}
                            />
                            <Button disabled={currentQuantity == 100} onClick={() => {
                                if (currentQuantity < 100) {
                                    setCurrentQuantity(currentQuantity + 1)
                                }
                            }}>+</Button>
                        </div>

                    </div>
                    <div className='temp-total'>
                        <div className="title tiny-title" style={{ marginRight: "6px" }}>Tạm tính:</div>
                        <span className="medium-title">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((product.price - product.price / 100 * product.discount) * currentQuantity ?? 0)}
                        </span>
                    </div>
                </div>

                <div className="detail-buttons">
                    <Button onClick={handleAddToCart}>Thêm vào giỏ</Button>
                    <Button type="primary" onClick={handleAddToBuyNow} className="" style={{ fontWeight: "550" }}>Mua ngay</Button>
                </div>

            </div>

        </div>
    </>)
}
export default ProductDetailComp