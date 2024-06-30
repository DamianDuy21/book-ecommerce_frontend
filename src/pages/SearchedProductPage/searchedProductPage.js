import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/productCard";
import { getProductByRequest } from "../../services/productServices";
import LoadingTheme from "../../components/LoadingTheme/loadingTheme";
import "./styles.css";
import { Pagination } from "antd";
import { useParams, useSearchParams } from "react-router-dom";

const SearchedProductPage = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [searchParams] = useSearchParams();
    const [title, setTitle] = useState("");

    const paramName = searchParams.get('sort') || searchParams.get('name');
    const price_lte = parseInt(searchParams.get('price_lte'), 10);
    const price_gte = parseInt(searchParams.get('price_gte'), 10);
    const category = searchParams.get('category') || "Tất cả";

    useEffect(() => {
        setPage(1); // Reset page to 1 when any of the dependencies change
        fetchData();
    }, [paramName, price_gte, price_lte, category]);

    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const sortName = urlParams.get('sort');
        const searchName = urlParams.get('name');
        const price_lte = parseInt(urlParams.get('price_lte'), 10);
        const price_gte = Math.max(parseInt(urlParams.get('price_gte'), 10), 1);
        const category = urlParams.get('category') || "";
        let response = null;

        console.log('Fetching with', { price_gte, price_lte, category });

        if (sortName) {
            response = await getProductByRequest(`sort=${sortName}`);
        } else if (searchName) {
            if (searchName === "all") {
                response = await getProductByRequest();
            } else {
                response = await getProductByRequest(`name=${searchName}`);
            }
        } else if (!isNaN(price_gte) && !isNaN(price_lte)) {
            response = await getProductByRequest(`price_gte=${price_gte}&price_lte=${price_lte}&category=${category}`);
        }

        if (response) {
            setTotal(response.data.data.length);
            setData(response.data.data);
            console.log(response.data.data);
        }
    };

    useEffect(() => {
        if (paramName === "-discount") {
            setTitle("Giảm giá nhiều nhất");
        } else if (paramName === "-createdAt") {
            setTitle("Mới nhất");
        } else if (paramName === "-sold") {
            setTitle("Bán chạy nhất");

        }
        else if (paramName === "-price") {
            setTitle("Giá giảm dần");

        }
        else if (paramName === "price") {
            setTitle("Giá tăng dần");

        } else if (paramName === "all") {
            setTitle("Tất cả sản phẩm");
        } else if (!isNaN(price_gte) && !isNaN(price_lte) && category) {
            let priceRange = `Khoảng giá: ${price_gte} - ${price_lte}. Thể loại: `;
            let categoryFormatted = category.replace(",", ", ");
            let titleFormatted = priceRange.concat(categoryFormatted);
            setTitle(titleFormatted);
        } else {
            setTitle(paramName);
        }
    }, [paramName, price_gte, price_lte, category]);

    const handlePageChange = (page, pageSize) => {
        window.scroll(0, 0);
        setLimit(pageSize);
        setPage(page);
    };

    const handleSizeChange = (current, size) => {
        window.scroll(0, 0);
        setLimit(size);
        setPage(1);
    };

    if (!data) {
        return <LoadingTheme />;
    } else {
        return (
            <>
                <div className="container">
                    <div className="common-wrapper" style={{ marginBottom: "16px" }}>
                        <div className="medium-title" style={{ marginBottom: "0px" }}>Kết quả tìm kiếm: {title}</div>
                    </div>
                    <div className="common-wrapper" style={{ minHeight: "calc(100vh - 228px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        {data.length > 0 ? (
                            <>
                                <div className="searched-products-wrapper">
                                    {data.slice((page - 1) * limit, page * limit).map((item, index) => (
                                        <ProductCard key={index} data={item} />
                                    ))}
                                </div>
                                <div className="searched-products-pagination">
                                    <Pagination defaultCurrent={1} current={page} total={total} onChange={handlePageChange} onShowSizeChange={handleSizeChange} />
                                </div>
                            </>
                        ) : (
                            <div className="medium-title" style={{ minHeight: "calc(100vh - 228px)" }}>
                                Không có kết quả tìm kiếm
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
};

export default SearchedProductPage;
