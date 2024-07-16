import { useEffect, useState } from "react";
import { editReceipts, getReceipts } from "../../services/receiptServices";
import { Badge, Button, Form, Select, Table, Tag, message } from "antd";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LoadingTheme from "../LoadingTheme/loadingTheme";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { doEditManage } from "../../redux/ManageReducer/manageReducer";
const ManageReceiptsComp = () => {
  const [receipts, setReceipts] = useState();
  const sortBy = useSelector((state) => state.manage.sortBy);
  const sortOrder = useSelector((state) => state.manage.sortOrder);
  const sortObject = useSelector((state) => state.manage.object);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [form] = Form.useForm();

  const nav = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    let response = null;
    response = await getReceipts(`sort=-createdAt`);
    if (response) {
      // console.log(response);
      setReceipts(response.data);
    }
  };
  const handleViewDetails = (record) => {
    nav(`/receipt-detail/${record._id}`);
  };
  const handleSort = async (values) => {
    const { sortBy, sortOrder } = values;
    dispatch(
      doEditManage({
        sortBy: sortBy,
        sortOrder: sortOrder,
      })
    );
    let response = null;
    if (sortOrder == "asc") {
      response = await getReceipts(`sort=${sortBy}`);
    } else {
      response = await getReceipts(`sort=-${sortBy}`);
    }
    if (response) {
      console.log(response);
      setReceipts(response.data);
    }
    // Implement your sorting logic here using sortBy and sortOrder values
    // For example, you can call an API with these parameters or sort the local data
  };
  const handleConfirm = async (record) => {
    const newReceipts = { ...record, status: "Đã duyệt" };
    console.log(newReceipts);
    const response = await editReceipts(newReceipts._id, newReceipts);
    console.log(response);
    if (response.ec == "200") {
      console.log(response);
      handleSort({ sortBy, sortOrder });
      message.info("Cập nhật đơn hàng thành công");
    } else {
      console.log(response);
      message.info("Có lỗi xảy ra, xin tử lại sau");
    }
  };
  const columns1 = [
    {
      title: <div style={{ width: "max-content" }}>id</div>,
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => (
        <div>
          <>{record._id}</>
        </div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Ngày tạo đơn</div>,
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "max-content",
          }}
        >
          <span>{moment(record.createdAt).format("HH:mm:ss DD/MM/YYYY")}</span>
        </div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Số lượng sản phẩm</div>,
      dataIndex: "",
      key: "quantity",
      render: (text, record, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>{record.products.length}</span>
        </div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Tổng thanh toán</div>,
      dataIndex: "",
      key: "totalPay",
      render: (text, record, index) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span>{record.totalPay}</span>
        </div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Trạng thái</div>,
      dataIndex: "status",
      key: "status",
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
      title: "",
      render: (text, record, index) => (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            minWidth: "74px",
            justifyContent: "center",
          }}
        >
          <Button
            className="button-1"
            onClick={() => handleViewDetails(record)}
          >
            <EyeOutlined />
          </Button>
          {record.status == "Chờ duyệt" ? (
            <Button className="button-1" onClick={() => handleConfirm(record)}>
              <CheckOutlined />
            </Button>
          ) : (
            <></>
          )}
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      title: <div style={{ width: "max-content" }}>id</div>,
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => (
        <div style={{ maxWidth: "102px" }}>{record._id}</div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Trạng thái</div>,
      dataIndex: "status",
      key: "status",
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
      title: "",
      render: (text, record, index) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          <Button
            className="button-1"
            onClick={() => handleViewDetails(record)}
          >
            <EyeOutlined />
          </Button>
          {record.status == "Chờ duyệt" ? (
            <Button className="button-1" onClick={() => handleConfirm(record)}>
              <CheckOutlined />
            </Button>
          ) : (
            <></>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      doEditManage({
        sortBy: "createdAt",
        sortOrder: "desc",
        object: "receipts",
      })
    );
    fetchData();
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!receipts) {
    return <LoadingTheme />;
  } else
    return (
      <>
        <div className="common-wrapper history-table">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "4px",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            <div className="medium-title" style={{ marginBottom: "16px" }}>
              Danh sách đơn hàng
            </div>
            <div className="tiny-title">
              Số lượng: <span className="medium-title">{receipts.length}</span>
            </div>
          </div>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <span className="tiny-title" style={{ marginRight: "0px" }}>
              Sắp xếp theo
            </span>

            <Form
              form={form}
              layout="inline"
              onFinish={handleSort}
              style={{ rowGap: "12px", marginRight: "-12px" }}
            >
              <Form.Item
                name="sortBy"
                initialValue="createdAt"
                style={{ marginRight: "12px" }}
              >
                <Select
                  style={{ width: 160 }}
                  options={[
                    { value: "createdAt", label: "Ngày tạo đơn" },
                    { value: "totalPay", label: "Tổng thanh toán" },
                    { value: "quantity", label: "Số lượng sản phẩm" },
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
                    { value: "asc", label: "Tăng dần" },
                    { value: "desc", label: "Giảm dần" },
                  ]}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Áp dụng
                </Button>
              </Form.Item>
            </Form>
          </div>

          <Table
            columns={currentWidth >= 992 ? columns1 : columns2}
            dataSource={receipts}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      </>
    );
};
export default ManageReceiptsComp;
