"use client";
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Divider,
  App,
} from "antd";
import {
  insertCategory,
  getCategories,
  getRowsNumber,
  deleteCategory,
  getCategory,
  updateCategory,
  searchCategory,
} from "src/server/actions/categoryActions";
import { tablePageSize } from "src/lib/consts";

const Categories = ({ categories, accessibility, rowsNumber }) => {
  const { message } = App.useApp();
  const [categoryList, setCategoryList] = useState(categories);

  const [isLoading, setIsLoading] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: tablePageSize,
    total: rowsNumber,
  });

  const columns = [
    {
      key: "key",
      title: "ردیف",
      render: (_, record, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      dataIndex: "label",
      key: "label",
      title: "عنوان دسته بندی",
    },
    {
      dataIndex: "name",
      key: "name",
      title: "نام لاتین",
    },
    {
      dataIndex: "ID",
      key: "ID",
      width: 150,
      title: "عملیات",
      render: (_, record) => (
        <>
          <Button
            shape="rounded"
            size="small"
            className="ms-2 btn_info"
            onClick={() => getCategoryForEdit({ ID: record.ID })}
          >
            ویرایش
          </Button>

          <Popconfirm
            title="حذف دسته بندی"
            description="آیا از حذف دسته بندی مطمئن هستید؟"
            onConfirm={() => removeCategory({ ID: record.ID })}
            okText="بله"
            cancelText="خیر"
            placement="topLeft"
          >
            <Button danger shape="rounded" size="small">
              حذف
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  //نمایش خطا
  function showErrorMessage(msg) {
    if (msg.includes("خطا")) message.error(msg);
    else {
      console.error(msg);
      message.error("عملیات با خطا مواجه شد", 10);
    }
  }

  //واکشی دسته بندی ها
  async function fetchCategories(
    { page, pageSize } = { page: 1, pageSize: tablePageSize }
  ) {
    try {
      const res = await getCategories({ page, pageSize });

      if (res.status === 500) {
        showErrorMessage(res.message);
        return;
      }
      const rowsNumber = await getRowsNumber();
      setCategoryList(res.response);
      setPagination({
        pageSize,
        total: rowsNumber.rowsNumber,
        current: page,
      });
    } catch (error) {
      showErrorMessage(error.message);
    }
  }

  //بستن و ریست مودال تعریف
  const closeAndResetModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  //بستن و ریست مودال ویرایش
  const closeAndResetEditModal = () => {
    editForm.resetFields();
    setIsEditModalOpen(false);
  };

  //بستن و ریست مودال جستجو
  const closeAndResetSearchModal = () => {
    searchForm.resetFields();
    setIsSearchModalOpen(false);
  };

  // ارسال فرم تعریف
  const saveForm = async (values) => {
    setIsLoading(true);
    const res = await insertCategory(values);
    setIsLoading(false);
    if (res.status === 500) {
      showErrorMessage(res.message);
      return;
    }
    message.success("دسته بندی جدید اضافه شد", 5);
    closeAndResetModal();
    fetchCategories();
  };

  //ارسال فرم ویرایش
  const saveEditForm = async (values) => {
    const res = await updateCategory(values);
    if (res.status === 500) {
      showErrorMessage(res.message);
      return;
    }
    message.success("ویرایش انجام شد");
    setCategoryList(
      categoryList.map((category) => {
        if (category.ID == values.ID) {
          return { ID: values.ID, name: values.name, label: values.label };
        }
        return category;
      })
    );
    closeAndResetEditModal();
  };

  //حذف
  const removeCategory = async ({ ID }) => {
    const res = await deleteCategory({ ID });
    console.log(res);
    if (res.status === 500) {
      showErrorMessage(res.message);
      return;
    }
    message.success("حذف انجام شد");
    setCategoryList(categoryList.filter((category) => category.ID !== ID));
  };

  //دریافت اطلاعات محصول جهت ویرایش
  const getCategoryForEdit = async ({ ID }) => {
    setIsEditModalOpen(true);
    const res = await getCategory({ ID });
    if (res.status === 500) {
      showErrorMessage(res.message);
      return;
    }
    editForm.setFieldsValue(res.response);
  };

  //جستجو
  async function search(values) {
    if (!(values.name || values.label)) {
      showErrorMessage("خطا: هیچ فیلدی وارد نشده است");
      return;
    }
    setIsLoading(true);
    const res = await searchCategory(values);
    setIsLoading(false);
    if (res.status === 500) {
      showErrorMessage(res.message);
      return;
    }
    setIsFilterActive(true);
    setCategoryList(res.response);
    setPagination({
      current: 1,
      pageSize: res.response.length,
      total: res.response.length,
    });
    closeAndResetSearchModal();
  }

  //حذف فیلتر
  const removeFilter = () => {
    fetchCategories();
    setIsFilterActive(false);
  };

  //   if (!(accessibility.includes("category") || accessibility.includes("admin")))
  //     return (
  //       <div className="dashboard d-flex rtl ">
  //         <Sidebar user={fullname} />
  //         <div
  //           className="dashboardContainer flex-fill p-3"
  //           style={{ marginRight: 300 }}
  //         >
  //           <Alert
  //             message="شما به این صفحه دسترسی ندارید"
  //             type="warning"
  //             className="text-center mt-3"
  //           />
  //         </div>
  //       </div>
  //     );

  return (
    <>
      <div className="d-flex justify-content-between">
        <span className="d-flex gap-2 ">
          <h5>دسته بندی ها</h5> <small>({rowsNumber})</small>
        </span>
        <div className="d-flex gap-2">
          <Button
            shape="rounded"
            type="primary"
            size="middle"
            onClick={() => setIsModalOpen(true)}
          >
            تعریف دسته بندی
          </Button>

          <Button
            shape="rounded"
            type="default"
            size="middle"
            onClick={() => setIsSearchModalOpen(true)}
          >
            جستجو
          </Button>
        </div>
      </div>
      <Divider />
      {isFilterActive ? (
        <Button type="dashed" className="mb-2" onClick={removeFilter}>
          حذف فیلتر
        </Button>
      ) : null}
      <Table
        columns={columns}
        dataSource={categoryList}
        pagination={pagination}
        onChange={({ current, pageSize }) =>
          fetchCategories({ page: current, pageSize })
        }
      />

      {/* مودال تعریف دسته بندی */}
      <Modal
        title="تعریف دسته بندی"
        open={isModalOpen}
        onCancel={closeAndResetModal}
        style={{ direction: "rtl" }}
        width={1000}
        footer={false}
      >
        <Form
          lang="fa"
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          form={form}
          onFinish={saveForm}
        >
          <div className="row gy-3">
            <div className="col-6">
              <Form.Item
                label="عنوان دسته"
                name="label"
                extra="فقط حروف فارسی"
                rules={[
                  {
                    required: true,
                    message: "لطفا عنوان دسته را وارد نمائید",
                  },
                  {
                    pattern: new RegExp(/[^A-z]/, "g"),
                    message: "فقط حروف فارسی",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-6 ">
              <Form.Item
                label="نام لاتین"
                name="key"
                extra="فقط حروف انگلیسی"
                rules={[
                  {
                    required: true,
                    message: "لطفا نام لاتین را وارد نمائید",
                  },
                  {
                    pattern: new RegExp(/[0-9*#@!$%^&*)(./\\A-z]/, "g"),
                    message: "فقط حروف لاتین",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12">
              <Button
                loading={isLoading}
                htmlType="submit"
                type="primary"
                className="ms-2"
              >
                ثبت اطلاعات
              </Button>
              <Button type="default" onClick={closeAndResetModal}>
                انصراف
              </Button>
            </div>
          </div>
        </Form>
      </Modal>

      {/* مودال ویرایش دسته بندی */}
      <Modal
        title="ویرایش دسته بندی"
        open={isEditModalOpen}
        onCancel={closeAndResetEditModal}
        width={1000}
        footer={false}
      >
        <Form
          lang="fa"
          layout="vertical"
          requiredMark={true}
          autoComplete="off"
          form={editForm}
          onFinish={saveEditForm}
        >
          <div className="row gy-3">
            <div className="col-6">
              <Form.Item
                label="عنوان دسته"
                name="label"
                extra="فقط حروف فارسی"
                rules={[
                  {
                    required: true,
                    message: "لطفا عنوان دسته را وارد نمائید",
                  },
                  {
                    pattern: new RegExp(/[^A-z]/, "g"),
                    message: "فقط حروف فارسی",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-6 ">
              <Form.Item
                label="نام لاتین"
                name="name"
                extra="فقط حروف انگلیسی"
                rules={[
                  {
                    required: true,
                    message: "لطفا نام لاتین را وارد نمائید",
                  },
                  {
                    pattern: new RegExp(/[0-9*#@!$%^&*)(./\\A-z]/, "g"),
                    message: "فقط حروف لاتین",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="ID" hidden>
                <Input />
              </Form.Item>
            </div>
            <div className="col-12">
              <Button
                loading={isLoading}
                htmlType="submit"
                type="primary"
                className="ms-2"
              >
                ثبت اطلاعات
              </Button>
              <Button type="default" onClick={closeAndResetEditModal}>
                انصراف
              </Button>
            </div>
          </div>
        </Form>
      </Modal>

      {/* مودال جستجوی دسته بندی */}
      <Modal
        title="جستجو"
        open={isSearchModalOpen}
        onCancel={closeAndResetSearchModal}
        width={1000}
        footer={false}
      >
        <Form
          lang="fa"
          layout="vertical"
          requiredMark={true}
          autoComplete="off"
          form={searchForm}
          onFinish={search}
        >
          <div className="row gy-3">
            <div className="col-6">
              <Form.Item
                label="عنوان دسته"
                name="label"
                extra="فقط حروف فارسی"
                rules={[
                  {
                    pattern: new RegExp(/[^A-z]/, "g"),
                    message: "فقط حروف فارسی",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-6 ">
              <Form.Item
                label="نام لاتین"
                name="name"
                extra="فقط حروف انگلیسی"
                rules={[
                  {
                    pattern: new RegExp(/[0-9*#@!$%^&*)(./\\A-z]/, "g"),
                    message: "فقط حروف لاتین",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-12">
              <Button
                loading={isLoading}
                htmlType="submit"
                type="primary"
                className="ms-2"
              >
                جستجو
              </Button>
              <Button type="default" onClick={closeAndResetSearchModal}>
                انصراف
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Categories;
