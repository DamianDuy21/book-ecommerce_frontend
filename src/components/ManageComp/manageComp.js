import { useEffect, useState } from "react";
import { Button, Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { doEditManage } from "../../redux/ManageReducer/manageReducer";
import ManageReceiptsComp from "../ManageReceiptsComp/manageReceiptsComp";
import ManageUsersComp from "../ManageUsersComp/manageUsersComp";
import ManageProductsComp from "../ManageProductsComp/manageProductsComp";

const ManageComp = () => {
    const sortObject = useSelector((state) => state.manage.object);
    const [mform] = Form.useForm();
    const dispatch = useDispatch();

    const handleManage = (values) => {
        // console.log('Form values:', values);
        dispatch(
            doEditManage({
                sortBy: "createdAt",
                sortOrder: "desc",
                object: values.sortObject,
            })
        );
    };

    useEffect(() => {
        dispatch(
            doEditManage({
                sortBy: "createdAt",
                sortOrder: "desc",
                object: "receipts",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        mform.setFieldsValue({ sortObject });
    }, [sortObject]);

    return (
        <>
            <div
                className="common-wrapper"
                style={{
                    marginBottom: "16px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    rowGap: "16px",
                    columnGap: "12px",
                }}
            >
                <div className="medium-title" style={{ marginBottom: "0px" }}>
                    Quản lí
                </div>
                <Form
                    form={mform}
                    layout="inline"
                    onFinish={handleManage}
                    style={{ rowGap: "12px", marginRight: "-12px" }}
                >
                    <Form.Item
                        name="sortObject"
                        initialValue="receipts"
                        style={{ marginRight: "12px" }}
                    >
                        <Select
                            style={{ width: 160 }}
                            options={[
                                { value: "receipts", label: "Đơn hàng" },
                                { value: "users", label: "Người dùng" },
                                { value: "products", label: "Sản phẩm" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {sortObject === "receipts" ? (
                <ManageReceiptsComp />
            ) : sortObject === "users" ? (
                <ManageUsersComp />
            ) : sortObject === "products" ? (
                <ManageProductsComp />
            ) : null}
        </>
    );
};

export default ManageComp;
