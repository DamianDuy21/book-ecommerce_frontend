import { useEffect, useState } from "react";
import { Badge, Button, Form, Select, Table, Tag, message } from "antd";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import LoadingTheme from "../LoadingTheme/loadingTheme";
import { useDispatch, useSelector } from "react-redux";
import { doEditManage } from "../../redux/ManageReducer/manageReducer";
import moment from "moment";
import { getUsers } from "../../services/userServices";
import ManageUsersDetailModal from "../ManageUsersDetailModal/manageUsersDetailModal.js";
const ManageUsersComp = () => {
  const [data, setData] = useState();
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const fetchData = async () => {
    let response = null;
    response = await getUsers(`sort=-createdAt`);
    if (response) {
      // console.log(response);
      setData(response.data);
    }
  };
  const handleViewDetails = (record) => {
    setModalData(record);
    setIsModalOpen(true);
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
      response = await getUsers(`sort=${sortBy}`);
    } else {
      response = await getUsers(`sort=-${sortBy}`);
    }
    if (response) {
      setData(response.data);
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
      title: <div style={{ width: "max-content" }}>Email</div>,
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => (
        <div className="email-manage-users">{record.email}</div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Quyền người dùng</div>,
      dataIndex: "role",
      key: "role",
      render: (text, record, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "max-content",
          }}
        >
          <span>{record.role}</span>
        </div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Truy cập gần nhất</div>,
      dataIndex: "lastAccess",
      key: "lastAccess",
      render: (text, record, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "max-content",
          }}
        >
          <span>
            {moment(parseInt(record.lastAccess, 10)).format(
              "DD/MM/YYYY HH:mm:ss"
            )}
          </span>
        </div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Số lượng đơn hàng</div>,
      dataIndex: "receiptsQuantity",
      key: "receiptsQuantity",
      render: (text, record, index) => (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <span>{record.receiptsQuantity}</span>
        </div>
      ),
    },
    {
      title: <div style={{ width: "max-content" }}>Tổng thanh toán</div>,
      dataIndex: "totalPay",
      key: "totalPay",
      render: (text, record, index) => (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
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
          {record.status === "offline" ? (
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
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      title: <div style={{ width: "max-content" }}>Email</div>,
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => (
        <div className="email-manage-users">{record.email}</div>
      ),
    },

    {
      title: <div style={{ width: "max-content" }}>Trạng thái</div>,
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <>
          {record.status === "offline" ? (
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
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      doEditManage({
        sortBy: "createdAt",
        sortOrder: "desc",
        object: "users",
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
  }, [dispatch]);

  if (!data) {
    return <LoadingTheme />;
  } else
    return (
      <>
        <ManageUsersDetailModal
          data={modalData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleSort={handleSort}
        />
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
              Danh sách người dùng
            </div>
            <div className="tiny-title">
              Số lượng: <span className="medium-title">{data.length}</span>
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
                    { value: "createdAt", label: "Ngày tạo tài khoản" },
                    { value: "totalPay", label: "Tổng thanh toán" },
                    { value: "quantity", label: "Số lượng đơn hàng" },
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
            dataSource={data}
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      </>
    );
};
export default ManageUsersComp;
