import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/productCard";
import { getProductByRequest } from "../../services/productServices";
import LoadingTheme from "../../components/LoadingTheme/loadingTheme";
import "./styles.css";
import { Pagination } from "antd";
import { useParams, useSearchParams } from "react-router-dom";

const RelatedProductPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [mainProduct, setMainProduct] = useState();
  const [title, setTitle] = useState("");
  const params = useParams();
  const productId = params.id;
  useEffect(() => {
    window.scroll(0, 0);
    setPage(1);
    fetchData();
  }, []);

  const fetchData = async () => {
    let responeMainProduct = await getProductByRequest(`_id=${productId}`);
    if (responeMainProduct) {
      console.log(responeMainProduct);
      setMainProduct(responeMainProduct.data[0]);
    }
    let response = await getProductByRequest(
      `price_gte=1&price_lte=999999999&category=${responeMainProduct.data[0].category}`
    );
    if (response) {
      setTotal(response.data.length);
      setData(response.data);
    }
  };

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

  if (!data || !mainProduct) {
    return <LoadingTheme />;
  } else {
    return (
      <>
        <div className="container">
          <div className="common-wrapper" style={{ marginBottom: "16px" }}>
            <div className="medium-title" style={{ marginBottom: "0px" }}>
              Liên quan tới: {mainProduct.name}
            </div>
          </div>
          <div
            className="common-wrapper"
            style={{
              minHeight: "calc(100vh - 228px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {data.length > 0 ? (
              <>
                <div className="searched-products-wrapper">
                  {data
                    .slice((page - 1) * limit, page * limit)
                    .map((item, index) => (
                      <ProductCard key={index} data={item} />
                    ))}
                </div>
                <div className="searched-products-pagination">
                  <Pagination
                    defaultCurrent={1}
                    current={page}
                    total={total}
                    onChange={handlePageChange}
                    onShowSizeChange={handleSizeChange}
                  />
                </div>
              </>
            ) : (
              <div
                className="medium-title"
                style={{ minHeight: "calc(100vh - 228px)" }}
              >
                Không có kết quả tìm kiếm
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default RelatedProductPage;
