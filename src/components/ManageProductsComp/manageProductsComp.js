import { useEffect, useState } from "react";
import { Badge, Button, Form, Select, Table, Tag, message } from "antd";
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import LoadingTheme from "../LoadingTheme/loadingTheme.js";
import { useDispatch, useSelector } from "react-redux";
import { doEditManage } from "../../redux/ManageReducer/manageReducer.js";
import moment from "moment";
import { getUsers } from "../../services/userServices.js";
import ManageUsersDetailModal from "../ManageUsersDetailModal/manageUsersDetailModal.js.js";
import ReceiptDetailProductDetailModal from "../ReceiptDetailProductDetailModal/receiptDetailProductDetailModal.js";
import { getProductByRequest } from "../../services/productServices.js";
const ManageProductsComp = () => {
    const [data, setData] = useState();
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const [form] = Form.useForm();

    const dispatch = useDispatch()

    const fetchData = async () => {
        let response = null
        response = await getProductByRequest(`sort=-createdAt`);
        if (response) {
            setData(response.data.data);
        }
    };
    const handleViewDetails = (record) => {
        setModalData(record)
        setIsModalOpen(true)
    };
    const handleSort = async (values) => {
        const { sortBy, sortOrder } = values
        dispatch(doEditManage({
            sortBy: sortBy,
            sortOrder: sortOrder
        }))
        let response = null
        if (sortOrder == "asc") {
            response = await getProductByRequest(`sort=${sortBy}`);
        }
        else {
            response = await getProductByRequest(`sort=-${sortBy}`);
        }
        if (response) {
            setData(response.data.data);
        }
        // Implement your sorting logic here using sortBy and sortOrder values
        // For example, you can call an API with these parameters or sort the local data
    };
    const columns1 = [
        // {
        //     title: <div style={{ width: "max-content" }}>ID</div>,
        //     dataIndex: '_id',
        //     key: '_id',
        //     render: (text, record, index) => <div><a onClick={() => handleViewDetails(record)}>{record._id}</a></div>,
        // },
        {
            title: <div style={{ width: "max-content" }}>Tên sản phẩm</div>,
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) =>
                <div className="">
                    {record.name}
                </div>
            ,
        },
        {
            title: <div style={{ width: "max-content" }}>Ngày đăng sản phẩm</div>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) =>
                <div className="">
                    {moment((record.createdAt)).format('DD/MM/YYYY HH:mm:ss')}
                </div>
            ,
        },
        {
            title: <div style={{ width: "max-content" }}>Giá</div>,
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index) =>
                <div style={{ display: "flex", justifyContent: "center", width: "max-content" }}>
                    <span>{record.price}</span>
                </div >
            ,
        },
        {
            title: <div style={{ width: "max-content" }}>Đã bán</div>,
            dataIndex: 'sold',
            key: 'sold',
            render: (text, record, index) =>
                <div style={{ display: "flex", justifyContent: "center", width: "max-content" }}>
                    <span>{record.sold}</span>
                </div>
            ,
        },
        {
            title: '',
            render: (text, record, index) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", minWidth: "74px", justifyContent: "center" }}>
                    <Button className='button-1' onClick={() => handleViewDetails(record)}>
                        <EyeOutlined />
                    </Button>
                </div>
            )
        }
    ];

    const columns2 = [
        {
            title: <div style={{ width: "max-content" }}>Tên sản phẩm</div>,
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) =>
                <div className="">
                    {record.name}
                </div>
            ,
        },

        {
            title: '',
            render: (text, record, index) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <Button className='button-1' onClick={() => handleViewDetails(record)}>
                        <EyeOutlined />
                    </Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        dispatch(doEditManage({
            sortBy: "createdAt",
            sortOrder: "desc",
            object: "products"
        }))
        fetchData();
        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [dispatch]);

    if (!data) {
        return <LoadingTheme />;
    } else
        return (
            <>
                <ReceiptDetailProductDetailModal
                    data={modalData}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    type={"manageModal"}
                />
                <div className="common-wrapper history-table">
                    <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "4px", flexWrap: "wrap", gap: "6px" }}>
                        <div className="medium-title" style={{ marginBottom: "16px" }}>Danh sách sản phẩm</div>
                        <div className="tiny-title">Số lượng: <span className="medium-title">{data.length}</span></div>
                    </div>
                    <div style={{ marginBottom: "16px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
                        <span className="tiny-title" style={{ marginRight: "0px" }}>Sắp xếp theo</span>

                        <Form form={form} layout="inline" onFinish={handleSort} style={{ rowGap: "12px", marginRight: "-12px" }}>
                            <Form.Item
                                name="sortBy"
                                initialValue="createdAt"
                                style={{ marginRight: "12px" }}
                            >
                                <Select
                                    style={{ width: 160 }}
                                    options={[
                                        { value: 'createdAt', label: 'Ngày tạo sản phẩm' },
                                        { value: 'price', label: 'Giá' },
                                        { value: 'sold', label: 'Đã bán' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name="sortOrder"
                                initialValue="desc"
                                style={{ marginRight: "12px" }}
                            >
                                <Select

                                    options={[
                                        { value: 'asc', label: 'Tăng dần' },
                                        { value: 'desc', label: 'Giảm dần' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Áp dụng</Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <Table columns={currentWidth >= 992 ? columns1 : columns2}
                        dataSource={data}
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </>
        )
}
export default ManageProductsComp 