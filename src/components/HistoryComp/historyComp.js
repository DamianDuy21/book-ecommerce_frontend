import { useEffect, useState } from "react";
import { getReceipts } from "../../services/receiptServices";
import { Badge, Button, Form, Select, Table, Tag } from "antd";
import { EyeOutlined } from '@ant-design/icons';
import "./styles.css";
import { useNavigate } from "react-router-dom";
import LoadingTheme from "../LoadingTheme/loadingTheme";
import moment from 'moment';
const HistoryComp = (props) => {
    const { userId } = props;
    const [receipts, setReceipts] = useState();
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
    const nav = useNavigate();
    const [form] = Form.useForm();

    const handleViewDetails = (record) => {
        nav(`/receipt-detail/${record._id}`);
    };

    const handleSort = async (values) => {
        const { sortBy, sortOrder } = values;
        console.log('Sort by:', sortBy);
        console.log('Sort order:', sortOrder);
        let response = null
        if (sortOrder == "asc") {
            response = await getReceipts(`userId=${userId}&sort=${sortBy}`);
        }
        else {
            response = await getReceipts(`userId=${userId}&sort=-${sortBy}`);
        }
        if (response) {
            console.log(response);
            setReceipts(response.data.data);
        }
        // Implement your sorting logic here using sortBy and sortOrder values
        // For example, you can call an API with these parameters or sort the local data
    };

    const columns1 = [
        {
            title: <div style={{ width: "max-content" }}>id</div>,
            dataIndex: '_id',
            key: '_id',
            render: (text, record, index) => <div><a onClick={() => handleViewDetails(record)}>{record._id}</a></div>,
        },
        {
            title: <div style={{ width: "max-content" }}>Ngày tạo đơn</div>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) =>
                <div style={{ display: "flex", justifyContent: "center", width: "max-content" }}>
                    <span>{moment(record.createdAt).format('HH:mm:ss DD/MM/YYYY')}</span>
                </div>
            ,
        },
        {
            title: <div style={{ width: "max-content" }}>Số lượng sản phẩm</div>,
            dataIndex: '',
            key: 'quantity',
            render: (text, record, index) =>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <span>{record.products.length}</span>
                </div>
            ,
        },
        {
            title: <div style={{ width: "max-content" }}>Tổng thanh toán</div>,
            dataIndex: '',
            key: 'totalPay',
            render: (text, record, index) =>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <span>{record.totalPay}</span>
                </div>
            ,
        },
        {
            title: <div style={{ width: "max-content" }}>Trạng thái</div>,
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => (
                <>
                    {record.status === "Chờ duyệt" ? (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Tag color={"red"} key={record.status}>
                                {record.status}
                            </Tag>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Tag color={"green"} key={record.status}>
                                {record.status}
                            </Tag>
                        </div>
                    )}
                </>
            ),
        },
        {
            title: '',
            render: (text, record, index) => (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Button className='button-1' onClick={() => handleViewDetails(record)}>
                        <EyeOutlined />
                    </Button>
                </div>
            )
        }
    ];

    const columns2 = [
        {
            title: <div style={{ width: "max-content" }}>id</div>,
            dataIndex: '_id',
            key: '_id',
            render: (text, record, index) => <div style={{ maxWidth: "102px" }}><a onClick={() => handleViewDetails(record)}>{record._id}</a></div>,
        },
        {
            title: <div style={{ width: "max-content" }}>Trạng thái</div>,
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => (
                <>
                    {record.status === "Chờ duyệt" ? (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Badge key={record.status} color={"red"} />
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Badge key={record.status} color={"green"} />
                        </div>
                    )}
                </>
            ),
        },
        {
            title: '',
            render: (text, record, index) => (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <Button className='button-1' onClick={() => handleViewDetails(record)}>
                        <EyeOutlined />
                    </Button>
                </div>
            )
        }
    ];

    useEffect(() => {
        const fetchReceipts = async () => {
            const response = await getReceipts(`userId=${userId}&sort=-createdAt`);
            if (response) {
                console.log(response);
                setReceipts(response.data.data);
            }
        };
        fetchReceipts();

        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [userId]);

    if (!receipts) {
        return <LoadingTheme />;
    } else {
        return (
            <>
                <div className="common-wrapper history-table">
                    <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "4px", flexWrap: "wrap", gap: "6px" }}>
                        <div className="medium-title" style={{ marginBottom: "16px" }}>Lịch sử đơn hàng</div>
                        <div className="tiny-title">Số lượng: <span className="medium-title">{receipts.length}</span></div>
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
                                        { value: 'createdAt', label: 'Ngày tạo đơn' },
                                        { value: 'totalPay', label: 'Tổng thanh toán' },
                                        { value: 'quantity', label: 'Số lượng sản phẩm' },
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
                        dataSource={receipts}
                        bordered
                        pagination={{ pageSize: 5 }}
                    />
                </div>
            </>
        );
    }
}

export default HistoryComp;
