"use client";
import React, { useState } from "react";
import {
  CloudDownloadOutlined,
  PictureOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  InputNumber,
  message,
  Upload,
  Popconfirm,
  ConfigProvider,
  Empty,
  Switch,
  Space,
  Alert,
} from "antd";
import faIR from "antd/lib/locale/fa_IR";
import { addComma } from "src/lib/functions";
import axios from "axios";
import Link from "next/link";

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Products = ({ categories, fullname, accessibility }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); //for insert
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //for edit
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false); //for edit
  const [searchFormValues, setSearchFormValues] = useState(); //for save search form values
  const [files, setFiles] = useState([]);
  const [productList, setProductList] = useState();
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  //جستجوی محصولات
  const searchProduct = async (values) => {
    setSearchFormValues({ ...values });
    const response = await axios.post(`../api/search/searchProduct`, {
      ...values,
      query: { page: 1, pageSize: 10 },
    });
    setProductList(response.data.products);
    setPagination({ current: 1, pageSize: 10, total: response.data.total });
  };

  //ریست کردن فرم جستجو
  const onReset = () => {
    searchForm.resetFields();
  };

  //تغییر صفحه
  const handleTableChange = async (pagination) => {
    // const response = await axios.get(
    //   `../api/product/selectProducts?page=${pagination.current}&pageSize=${pagination.pageSize}`
    // );
    const response = await axios.post(`../api/search/searchProduct`, {
      ...searchFormValues,
      query: { page: pagination.current, pageSize: pagination.pageSize },
    });
    const { products, total } = response.data;

    setProductList(products);
    setPagination({ ...pagination, total });
  };

  // این سه استیت برای نمایش تصویر است
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  // select File
  const [fileSelected, setFileSelected] = useState([]);

  // حذف محصول
  const removeProduction = async (id) => {
    const res = await axios.post("../api/product/removeProduct", { id });
    if (res.status === 200) {
      message.info("حذف محصول انجام شد");
      setProductList(productList.filter((product) => product._id !== id));
    } else {
      message.error("خطایی رخ داده است", 3);
      console.log("error: ", res);
    }
  };

  // کلیک روی آیکون ویرایش محصول
  const clickEditProduct = async (id) => {
    setIsEditModalOpen(true);
    const res = await axios.post("../api/product/selectProduction", { id });
    if (res.status === 200) {
      const data = res.data.product[0];
      const info = {
        ...data,
        cat1: data?.category[0],
        cat2: data?.category[1],
        cat3: data?.category[2],
        cat4: data?.category[3],
        tags: data?.tags?.join("-"),
        enTags: data?.enTags?.join("-"),
      };
      if (data.imageList) {
        setFileSelected(data?.imageList);
      } else {
        setFileSelected(data?.imageData);
      }

      editForm.setFieldsValue(info);
    } else {
      message.error("خطایی رخ داده است", 3);
      console.log("error: ", res);
    }
  };

  // بستن مودال  محصول
  const handleCloseModal = () => {
    if (isEditModalOpen) {
      editForm.resetFields();
      setIsEditModalOpen(false);
    }

    if (isModalOpen) {
      form.resetFields();
      setIsModalOpen(false);
    }
    setFileSelected([]);
  };

  // سابمیت فرم محصول
  const handleOk = () => {
    if (isEditModalOpen) editForm.submit();
    if (isModalOpen) form.submit();
  };

  // ساخت آپشن برای دسته بندی ها
  const catgoriesData = categories?.map(({ label, name }) => (
    <Option key={name} value={name}>
      {label}
    </Option>
  ));

  // برای جدول محصولات
  const columns = [
    {
      dataIndex: "name",
      key: "name",
      title: "نام محصول",
    },
    {
      dataIndex: "price",
      key: "price",
      title: "قیمت",
      render: (_, record) => addComma(record.price),
    },
    {
      dataIndex: "discount",
      key: "discount",
      title: "%",
    },
    {
      dataIndex: "agentDiscount",
      key: "agentDiscount",
      title: "%همکار",
    },

    {
      dataIndex: "category",
      key: "category",
      width: 150,
      title: "دسته بندی",
      render: (_, record) =>
        record?.category?.map((cat) => (
          <Tag color="geekblue" key={cat}>
            {cat}
          </Tag>
        )),
    },
    {
      dataIndex: "_id",
      key: "_id",
      width: 150,
      title: "عملیات",
      render: (_, record) => (
        <div className="d-flex">
          <Link href={`/${record._id}`} target="_blank">
            <Button
              id={record._id}
              shape="rounded"
              size="small"
              className="ms-2"
              style={{ borderColor: "#cdcdcd", color: "#cdcddc" }}
            >
              مشاهده
            </Button>
          </Link>
          <Button
            id={record._id}
            shape="rounded"
            size="small"
            className="ms-2 btn_info"
            onClick={() => clickEditProduct(record._id)}
          >
            ویرایش
          </Button>

          <Popconfirm
            title="حذف محصول"
            description="آیا از حذف محصول مطمئن هستید؟"
            onConfirm={() => removeProduction(record._id)}
            okText="بله"
            cancelText="خیر"
            placement="topLeft"
          >
            <Button id={record._id} danger shape="rounded" size="small">
              حذف
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // اضافه کردن محصول
  const onFinish = async (values) => {
    values.category = [values.cat1, values.cat2, values.cat3, values.cat4];
    values.category = values.category.filter((item) => item !== undefined);
    values.tags = values.tags?.split("-");
    values.enTags = values.enTags?.split("-");
    values.imageList = fileSelected.map((item) => {
      if (item.response)
        return {
          thumbUrl: item.response.fileData.thumbUrl,
          url: item.response.fileData.url,
          id: item.response.fileData._id,
        };
      return {
        thumbUrl: item.thumbUrl,
        url: item.url,
        id: item._id || item.id,
      };
    });

    // اضافه کردن محصول
    if (isModalOpen) {
      const res = await axios.post("../api/product/insertProduct", values);
      if (res.status === 200) {
        message.success("محصول جدید اضافه شد", 5);
        handleCloseModal();
        const newProductList = await axios.post(
          "../api/product/selectProducts"
        );
        setProductList(newProductList.data.products);
        setPagination({ ...pagination, total: newProductList.data.total });
      } else {
        message.error("خطا در ثبت محصول", 5);
      }
    }

    // آپدیت محصول
    if (isEditModalOpen) {
      console.log(values);
      const res = await axios.post("../api/product/updateProduct", values);
      if (res.status === 200) {
        message.success("اطلاعات محصول ویرایش شد", 5);
        handleCloseModal();
        const newProductList = await axios.post(
          `../api/product/selectProducts?page=${pagination.current}&pageSize=${pagination.pageSize}`
        );
        setProductList(newProductList.data.products);
        setPagination({ ...pagination, total: newProductList.data.total });
      } else {
        message.error("خطا در ویرایش محصول", 5);
      }
    }
  };

  // نمایش تصویر
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // انتخاب فایل
  const handleSelect = (e) => {
    setFileSelected([...fileSelected, { ...e, status: "done" }]);
    setIsFilesModalOpen(false);
    form.setFieldsValue({
      imageUrl: e?.url,
      thumbUrl: e?.thumbUrl,
      image_id: e?._id,
    });
    editForm.setFieldsValue({
      imageUrl: e?.url,
      thumbUrl: e?.thumbUrl,
      image_id: e?._id,
    });
    console.log(fileSelected);
  };

  // دکمه بارگزاری
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        بارگزاری تصویر
      </div>
    </div>
  );

  // بارگزاری تصویر در مودال اضافه کردن محصول
  const handleChange = ({ fileList: newFileList, file }) => {
    console.log("newFileList:", newFileList, "file:", file);
    setFileSelected(newFileList);
    if (file.status === "done")
      if (isModalOpen) {
        form.setFieldsValue({
          imageUrl: file?.response?.fileData?.url,
          thumbUrl: file?.response?.fileData?.thumbUrl,
          image_id: file?.response?.fileData?._id,
        });
      }
    if (isEditModalOpen) {
      editForm.setFieldsValue({
        imageUrl: file?.response?.fileData?.url,
        thumbUrl: file?.response?.fileData?.thumbUrl,
        image_id: file?.response?.fileData?._id,
      });
    }
  };

  // حذف فایل
  const handleRemoveFile = async (event) => {
    try {
      form.setFieldsValue({
        imageUrl: null,
        thumbUrl: null,
        image_id: null,
      });
      editForm.setFieldsValue({
        imageUrl: null,
        thumbUrl: null,
        image_id: null,
      });
    } catch (error) {
      console.log("Errror:", error);
      if (error?.response?.data?.message)
        message.error(error?.response?.data?.message);
    }
  };

  const showImageUploaded = async () => {
    try {
      const res = await axios.get("/api/uploads/ImagesUploaded");
      setFiles(res.data.imageList);
      setIsFilesModalOpen(true);
    } catch (error) {
      console.log("Errror:", error);
      if (error?.response?.data?.message)
        message.error(error?.response?.data?.message);
    }
  };

  // if (
  //   !(accessibility?.includes("products") || accessibility?.includes("admin"))
  // )
  //   return (
  //     <div className="dashboard d-flex rtl ">
  //       <div className="dashboardContainer flex-fill p-3">
  //         <Alert
  //           message="شما به این صفحه دسترسی ندارید"
  //           type="error"
  //           className="text-center mt-3"
  //         />
  //       </div>
  //     </div>
  //   );

  return (
    <div className="dashboard d-flex  ">
      <div className="dashboardContainer flex-fill p-1">
        <div className="d-flex justify-content-between">
          <h5>مدیریت محصولات</h5>
          <Button
            shape="rounded"
            size="middle"
            className="ms-2 mb-2 btn_success"
            onClick={() => setIsModalOpen(true)}
          >
            اضافه کردن محصول جدید
          </Button>
        </div>

        <hr className="mb-3" />
        <ConfigProvider direction="rtl" locale={faIR}>
          <Form
            name="searchForm"
            onFinish={searchProduct}
            autoComplete="off"
            form={searchForm}
          >
            <Space size={35}>
              <Form.Item
                name="productName"
                label="نام محصول"
                style={{ width: "385px" }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="دسته بندی"
                name="category"
                style={{ width: "285px" }}
              >
                <Select placeholder="انتخاب دسته بندی">{catgoriesData}</Select>
              </Form.Item>

              <Form.Item label="قیمت">
                <Space.Compact>
                  <Form.Item name={["price", "min"]} noStyle>
                    <Input
                      style={{
                        width: "50%",
                      }}
                      placeholder="از"
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item name={["price", "max"]} noStyle>
                    <Input
                      style={{
                        width: "50%",
                      }}
                      placeholder="تا"
                      type="number"
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </Space>
            <Space size={35} align="center">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  جستجو
                </Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType="button" onClick={onReset}>
                  پاکسازی
                </Button>
              </Form.Item>

              <Form.Item label="تخفیف" name="hasDiscount">
                <Switch />
              </Form.Item>
              <Form.Item label="تخفیف همکار" name="hasColleagueDiscount">
                <Switch />
              </Form.Item>
              <Form.Item label="محصول جدید" name="newProduct">
                <Switch />
              </Form.Item>
              <Form.Item label="پیشنهادی" name="Suggested">
                <Switch />
              </Form.Item>
              <Form.Item label="پرفروش" name="bestSeller">
                <Switch />
              </Form.Item>
            </Space>
          </Form>
          <Table
            columns={columns}
            dataSource={productList}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </ConfigProvider>
      </div>

      <Modal
        title="افزودن محصول"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCloseModal}
        style={{ direction: "rtl" }}
        width={1000}
        cancelText="انصراف"
        okText="ثبت اطلاعات محصول"
      >
        <Form
          lang="fa"
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          form={form}
          onFinish={onFinish}
        >
          <div className="row gy-3">
            <div className="col-3">
              <Form.Item
                label="نام محصول"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "لطفا نام محصول را وارد نمائید",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-6 "></div>

            <div className="col-3 ltr">
              <Form.Item label="Product Name" name="enName">
                <Input />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item
                label="دسته بندی"
                name="cat1"
                rules={[
                  {
                    required: true,
                    message: "لطفا دسته بندی محصول را مشخص کنید",
                  },
                ]}
              >
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label="دسته بندی" name="cat2">
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label="دسته بندی" name="cat3">
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label="دسته بندی" name="cat4">
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item
                label="معرفی محصول"
                name="desc"
                rules={[
                  {
                    required: true,
                    message: "لطفا معرفی محصول را وارد نمائید",
                  },
                ]}
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>
            <div className="col-6 ltr">
              <Form.Item label="معرفی محصول" name="enDesc">
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item label="تگ ها" name="tags">
                <Input placeholder="اتصالات-استخر-..." />
              </Form.Item>
            </div>
            <div className="col-6 ltr">
              <Form.Item label="تگ ها" name="enTags">
                <Input placeholder="pump-spool-..." />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="قیمت" name="price">
                <InputNumber
                  type="number"
                  decimalSeparator=","
                  addonAfter={<span>تومان</span>}
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="تخفیف عمومی" name="discount">
                <InputNumber
                  type="number"
                  addonAfter={<span>%</span>}
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="تخفیف همکار" name="agentDiscount">
                <InputNumber
                  type="number"
                  addonAfter={<span>%</span>}
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="امتیاز" name="score">
                <InputNumber
                  type="number"
                  addonAfter={<span>از 5</span>}
                  style={{ width: "100%" }}
                  max={5}
                  min={1}
                />
              </Form.Item>
            </div>
            <div className="col-4 ">
              <Form.Item name="newLabel" valuePropName="checked">
                <Checkbox>محصول جدید</Checkbox>
              </Form.Item>
            </div>
            <div className="col-4 ">
              <Form.Item name="offer" valuePropName="checked">
                <Checkbox>نمایش در پیشنهادی</Checkbox>
              </Form.Item>
            </div>
            <div className="col-4 ">
              <Form.Item name="mostSale" valuePropName="checked">
                <Checkbox>نمایش در پرفروش ترین ها</Checkbox>
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Form.Item name="imageUrl">
                <Input disabled />
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Form.Item name="thumbUrl">
                <Input disabled />
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Form.Item name="image_id">
                <Input disabled />
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Button
                type="dashed"
                icon={<PictureOutlined />}
                onClick={showImageUploaded}
              >
                انتخاب تصویر
              </Button>
            </div>

            <div className="col-12">
              <Upload
                fileList={fileSelected}
                listType="picture-circle"
                action="/api/uploads/uploads"
                onChange={handleChange}
                onPreview={handlePreview}
                onRemove={handleRemoveFile}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>
        </Form>
        <div className="row mt-3"></div>
      </Modal>

      {/* مودال ویرایش محصول */}
      <Modal
        title="ویرایش محصول"
        open={isEditModalOpen}
        style={{ direction: "rtl" }}
        width={1000}
        cancelText="انصراف"
        okText="ذخیره اطلاعات"
        onCancel={handleCloseModal}
        onOk={handleOk}
      >
        <Form
          lang="fa"
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          form={editForm}
          onFinish={onFinish}
        >
          <div className="row gy-3">
            <div className="col-3">
              <Form.Item
                label="نام محصول"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "لطفا نام محصول را وارد نمائید",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item hidden name="_id">
                <Input />
              </Form.Item>
            </div>
            <div className="col-6 "></div>

            <div className="col-3 ltr">
              <Form.Item label="Product Name" name="enName">
                <Input />
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item
                label="دسته بندی"
                name="cat1"
                rules={[
                  {
                    required: true,
                    message: "لطفا دسته بندی محصول را مشخص کنید",
                  },
                ]}
              >
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label="دسته بندی" name="cat2">
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label="دسته بندی" name="cat3">
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>
            <div className="col">
              <Form.Item label="دسته بندی" name="cat4">
                <Select
                  placeholder="انتخاب دسته بندی"
                  style={{ width: "180px" }}
                >
                  {catgoriesData}
                </Select>
              </Form.Item>
            </div>

            <div className="col-6">
              <Form.Item label="معرفی محصول" name="desc">
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>
            <div className="col-6 ltr">
              <Form.Item label="معرفی محصول" name="enDesc">
                <Input.TextArea rows={5} />
              </Form.Item>
            </div>
            <div className="col-6">
              <Form.Item label="تگ ها" name="tags">
                <Input placeholder="اتصالات-استخر-..." />
              </Form.Item>
            </div>
            <div className="col-6 ltr">
              <Form.Item label="تگ ها" name="enTags">
                <Input placeholder="pump-spool-..." />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="قیمت" name="price">
                <InputNumber
                  type="number"
                  decimalSeparator=","
                  addonAfter={<span>تومان</span>}
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="تخفیف عمومی" name="discount">
                <InputNumber
                  type="number"
                  addonAfter={<span>%</span>}
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="تخفیف همکار" name="agentDiscount">
                <InputNumber
                  type="number"
                  addonAfter={<span>%</span>}
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </div>
            <div className="col-3">
              <Form.Item label="امتیاز" name="score">
                <InputNumber
                  type="number"
                  addonAfter={<span>از 5</span>}
                  style={{ width: "100%" }}
                  max={5}
                  min={1}
                />
              </Form.Item>
            </div>
            <div className="col-4 ">
              <Form.Item name="newLabel" valuePropName="checked">
                <Checkbox>محصول جدید</Checkbox>
              </Form.Item>
            </div>
            <div className="col-4 ">
              <Form.Item name="offer" valuePropName="checked">
                <Checkbox>نمایش در پیشنهادی</Checkbox>
              </Form.Item>
            </div>
            <div className="col-4 ">
              <Form.Item name="mostSale" valuePropName="checked">
                <Checkbox>نمایش در پرفروش ترین ها</Checkbox>
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Form.Item name="imageUrl">
                <Input disabled />
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Form.Item name="thumbUrl">
                <Input disabled />
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Form.Item name="image_id">
                <Input disabled />
              </Form.Item>
            </div>

            <div className="col-4 ">
              <Button
                type="dashed"
                icon={<PictureOutlined />}
                onClick={showImageUploaded}
              >
                انتخاب تصویر
              </Button>
            </div>

            <div className="col-12">
              <Upload
                fileList={fileSelected}
                listType="picture-circle"
                action="/api/uploads/uploads"
                onChange={handleChange}
                onPreview={handlePreview}
                onRemove={handleRemoveFile}
              >
                {uploadButton}
              </Upload>
            </div>
          </div>
        </Form>
      </Modal>

      {/* نمایش تصاویر */}
      <Modal
        title="انتخاب تصویر"
        open={isFilesModalOpen}
        style={{ direction: "rtl" }}
        width={1000}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setIsFilesModalOpen(false)}
      >
        <div className="row">
          <div className="col-12">
            {files.length ? (
              <Upload
                listType="picture-card"
                defaultFileList={files}
                onPreview={handlePreview}
                onRemove={handleSelect}
                showUploadList={{
                  removeIcon: (
                    <CloudDownloadOutlined
                      style={{
                        color: "#fff",
                        fontSize: "1.1rem",
                      }}
                      title="انتخاب تصویر"
                    />
                  ),
                }}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
          {fileSelected.length ? (
            <div className="col-12 border-top">
              <p>انتخاب شده</p>
              <Upload fileList={fileSelected} listType="picture-circle" />
            </div>
          ) : null}
        </div>
      </Modal>

      {/* پیش نمایش تصویر */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default Products;
