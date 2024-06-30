import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/productCard"
import { getProductByRequest } from "../../services/productServices";
import { useNavigate } from "react-router-dom";

const SliderList = (props) => {
    const { products, title, related } = props
    const nav = useNavigate()
    const handleShowMore = () => {
        if (related == "-createdAt" || related == "-discount" || related == "-sold") {
            nav(`/searched-products?sort=${related}`)
        }
        else {
            nav(`/related-products/${related}`)
        }
    }
    return (
        <>
            <div>
                <div className="medium-title" style={{ marginBottom: "12px", gap: "12px", display: "flex" }}>
                    <div>{title}</div>
                    <div className="show-more-btn" onClick={handleShowMore}>Xem thêm</div>
                </div>
                <div className="slider-list">

                    {products.map((data, index) => {
                        return (<ProductCard key={index} data={data} />)
                    })}

                </div>
            </div>
        </>
    )

}
export default SliderList