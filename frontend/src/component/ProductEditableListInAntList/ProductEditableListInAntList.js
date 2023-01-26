import "./ProductEditableListInAntList.css";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import { Table, Popconfirm, Button, Space, Form, Input, Spin } from "antd";
import axios from "axios";
import { filter, isEmpty } from "lodash";
import { AlertTwoTone, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { CSVLink } from "react-csv";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors as productClearErrors,
  getAllproductsForAdminAction,
} from "../../actions/productActions";
import Loader from "../Loader/Loader";

const ProductEditableListInAntList = () => {
  const [gridData, setgridData] = useState([]);
  const [loading, setloading] = useState(false);
  const [editRowKey, seteditRowKey] = useState("");
  const [sortedInfo, setsortedInfo] = useState({});
  const [searchText, setsearchText] = useState("");
  const [searchColText, setSearchColText] = useState("");
  const [searchedCol, setSearchedCol] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [showFilter, setShowFilter] = useState(true);

  const [tableLoading, setTableLoading] = useState(true);

  const tableRef = useRef();
  const searchInput = useRef(null);
  const {
    loading: productLoading,
    error: producterror,
    products: adminProducts,
  } = useSelector((state) => state.adminAllProducts);
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // let adminProductswithKEY =adminProducts && adminProducts.map( (item)=>(
  //   {
  //   ...item,
  //   key:item._id}
  // ))
  let adminProductswithKEY = [];

  //   adminProducts && adminProducts.forEach(async (item)=>{
  //     let date = new Date(item.createdAt)
  //     const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

  //     let formatedDate = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()

  //  await   adminProductswithKEY.push({...item,key:item._id,

  //       // createdAt : date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()

  //       createdAt:date.toLocaleDateString('en-us', options)

  //     })
  //   })

  const updaterArray = async () => {
    adminProducts &&
      adminProducts.forEach(async (item) => {
        let date = new Date(item.createdAt);
        const options = {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        let formatedDate =
          date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();

        await adminProductswithKEY.push({
          ...item,
          key: item._id,

          // createdAt : date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()

          createdAt: date.toLocaleDateString("en-us", options),
        });
      });
    // setTableLoading(false)
  };
  updaterArray();
  // .then(res=>{

  //   setgridData(res)
  //   setTableLoading(false)
  //   console.log("adminProductswithKEY  after thr forloop--",adminProductswithKEY)
  //   console.log("gridedata insie the thennnnnnnnnnnnnnnnnnnnn000",gridData)

  // })

  //  adminProductswithKEY.length>0 && setgridData(adminProductswithKEY)

  //       setTableLoading(false)

  // console.log("adminProductswithKEY  after thr forloop--",adminProductswithKEY)
  // console.log("productLoading  after thr forloop--",productLoading)

  // if(!productLoading){
  //   setgridData(adminProductswithKEY)
  // }

  // if(adminProductswithKEY && adminProductswithKEY.length>0){
  //   setgridData(adminProductswithKEY)
  // }

  //

  //  let adminProductswithKEY =[
  //   {
  //     key:1,
  //     _id:"fdfdf"
  //   },
  //   {
  //     key:2,
  //     _id:"232323"
  //   },
  //  ]

  const [form] = Form.useForm();
  let filteredData = [];

  const handleDelete = (value) => {
    const dataSource = [...adminProductswithKEY];
    // const dataSource = adminProductswithKEY

    const filteredData = dataSource.filter((item) => item.id !== value.id);
    setgridData(filteredData);
    setTableLoading(false);
  };

  const isEditing = (record) => {
    return record.key === editRowKey;
  };

  // console.log("isEditing---",isEditing)
  // console.log("editing---",editable)

  const cancel = () => {
    seteditRowKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...adminProductswithKEY];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setgridData(newData);
        seteditRowKey("");
      }
    } catch (error) {
      console.log("error in MasterAntList--", error);
    }
  };
  const edit = (record) => {
    // console.log("record inside edit functon--", record);
    form.setFieldsValue({
      name: "",
      description: "",
      stock: "",
      price: "",
      category: "",
      CreatedAt: "",
      ...record,
    });
    seteditRowKey(record.key);
  };

  const handleChange = (_, filters, sorter) => {
    // console.log("sorter==", sorter);
    const { order, field } = sorter;
    setFilteredInfo(filters);
    //console.log("filterinfo--",filteredInfo)
    setsortedInfo({ columnKey: field, order });
  };
  const reset = () => {
    setsortedInfo({});
    setFilteredInfo({});

    setsearchText("");
    filteredData = [];
    setgridData(adminProductswithKEY);
    // loadData();
  };

  const handleChangeOfInput = (e) => {
    setsearchText(e.target.value);
    // console.log("searchtext--", searchText)
    if (e.target.value === "") {
      // loadData();
    }
  };

  const globalSearch = () => {
    adminProductswithKEY.forEach((value) => {
      if (
        value.description.toLowerCase().includes(searchText.toLowerCase()) ||
        value.name.toLowerCase().includes(searchText.toLowerCase())
        // ||
        // value.message.toLowerCase().includes(searchText.toLowerCase())
      ) {
        filteredData.push(value);
      }
    });
    // console.log("filteredData=== inside global seardch", filteredData);
    setgridData(filteredData);
    setTableLoading(false);
    // console.log("grid data-----------", gridData)
  };
  // console.log("filteredData===", filteredData);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 0, display: "block" }}
        />
        <Space style={{ marginTop: 4 }}>
          <Button
            type="primary"
            onClick={() => handleSearchCol(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleResetCol(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    render: (text) =>
      searchedCol === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchColText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearchCol = (selectedKeys, confirm, dataIndex) => {
    setShowFilter(false);
    confirm();

    // console.log("showfilter--insisee  handleSearchCol ", showFilter)
    // console.log("confirm--insisee  handleSearchCol ", confirm)
    // console.log("dataIndex--insisee  handleSearchCol ", dataIndex)
    // console.log("selectedKeys--insisee  handleSearchCol ", selectedKeys)

    setSearchColText(selectedKeys[0]);
    setSearchedCol(dataIndex);
  };

  const handleResetCol = (clearFilters) => {
    clearFilters();
    setSearchColText("");
    setShowFilter(true);
  };

  const filterObject = {
    filters: [
      { text: "20", value: "20" },
      { text: "21", value: "21" },
      { text: "22", value: "22" },
      { text: "23", value: "23" },
      { text: "24", value: "24" },
      { text: "25", value: "25" },
    ],
    filteredValue: filteredInfo.price || null,
    onFilter: (value, record) => String(record.price).includes(value),
  };

  const showFilterAge = showFilter ? filterObject : null;

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },

    {
      title: "Name",
      dataIndex: "name",
      align: "center",
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.name || null,
      ...getColumnSearchProps("name"),

      // ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      align: "center",
      editable: true,
      sorter: (a, b) => a.category.length - b.category.length,
      sortOrder: sortedInfo.columnKey === "category" && sortedInfo.order,
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.category || null,

      ...getColumnSearchProps("category"),
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      editable: true,
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
      sortDirections: ["descend", "ascend"],
      // filteredValue: filteredInfo.price || null,
      // ...getColumnSearchProps("price"),

      ...showFilterAge,
    },
    {
      title: "Description",
      dataIndex: "description",
      align: "center",
      editable: true,
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === "description" && sortedInfo.order,
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.message || null,

      ...getColumnSearchProps("description"),
      responsive: ["md"],
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      align: "center",
      editable: true,
      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortOrder: sortedInfo.columnKey === "createdAt" && sortedInfo.order,
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.message || null,

      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "stock",
      dataIndex: "stock",
      align: "center",
      editable: true,
      sorter: (a, b) => a.stock - b.stock,
      sortOrder: sortedInfo.columnKey === "stock" && sortedInfo.order,
      sortDirections: ["descend", "ascend"],
      filteredValue: filteredInfo.message || null,

      ...getColumnSearchProps("stock"),
    },

    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);

        return adminProductswithKEY.length >= 1 ? (
          <Space>
            <Popconfirm
              title=" Are you sure you want to delete"
              onConfirm={() => handleDelete(record)}
            >
              <Button danger type="primary" disabled={editable}>
                Delete
              </Button>
            </Popconfirm>
            {editable ? (
              <span>
                <Space size="middle">
                  <Button
                    onClick={() => save(record.key)}
                    type="primary"
                    style={{ marginRight: 8 }}
                  >
                    save
                  </Button>
                  <Popconfirm
                    title="Are you sure to cancel ?"
                    onConfirm={cancel}
                  >
                    <Button onConfirm={() => cancel(record)}>cancel</Button>
                  </Popconfirm>
                </Space>
              </span>
            ) : (
              <Button onClick={() => edit(record)} type="primary">
                Edit
              </Button>
            )}
          </Space>
        ) : null;
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    const input = <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `please input some value for ${title}`,
              },
            ]}
          >
            {input}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  useEffect(() => {
    if (producterror) {
      alert.error(producterror);
      dispatch(productClearErrors());
    }

    dispatch(getAllproductsForAdminAction());
    // setgridData(adminProductswithKEY)
    // if(adminProductswithKEY && adminProductswithKEY.length>0){
    //   setgridData(adminProductswithKEY)
    // }

    // adminProductswithKEY.length>0 && setgridData(adminProductswithKEY)

    // setTableLoading(false)

    // const updateArrayofList = async() =>     {
    //  ( adminProducts &&  adminProducts.length> 0 )&&  adminProducts.forEach(async (item)=>{
    //         let date = new Date(item.createdAt)
    //         const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };

    //         let formatedDate = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()

    //         await   adminProductswithKEY.push({...item,key:item._id,

    //           // createdAt : date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()

    //           createdAt:date.toLocaleDateString('en-us', options)

    //         })
    //       })
    //   // return adminProductswithKEY
    //   // setgridData([...adminProductswithKEY])
    //   // setTableLoading(false)
    //   }

    // updateArrayofList()
    // updateArrayofList().then(res=>{
    //   console.log("ressssssss agterh thennnnnnn-=-=-=-=", res)
    //   setgridData(res)
    //   setTableLoading(false)
    //   console.log("gridtdata --iside thennnnnnnnnnnn", gridData)

    // })

    // setgridData(adminProductswithKEY)

    // console.log("gridtdata --iside useeffect", gridData)
  }, [producterror, alert]);
  // console.log("gridtdata --outside useeffect", gridData)

  return (
    <Fragment>
      {" "}
      {productLoading ? (
        <Fragment>
          {" "}
          <Loader />
        </Fragment>
      ) : (
        <Fragment>
          <div className="allMajor_Product_editable_list">
            <div className="topSpacein_and_master_list">
              <Space style={{ marginBottom: 10 }}>
                <Input
                  placeholder="Enter the search text"
                  onChange={handleChangeOfInput}
                  allowClear
                  type="text"
                  value={searchText}
                />
                <Button onClick={globalSearch} type="primary">
                  search
                </Button>

                <Button onClick={reset}>Reset</Button>
                <Button style={{ backgroundColor: "#c2115e", color: "#fff" }}>
                  <CSVLink
                    data={
                      // filteredData&&filteredData.length ?filteredData :adminProductswithKEY
                      gridData && gridData.length
                        ? gridData
                        : adminProductswithKEY

                      // gridData? gridData:adminProductswithKEY
                    }
                  >
                    Export
                  </CSVLink>
                </Button>
              </Space>
            </div>

            <div>
              <Form form={form} component={false}>
                {/* <DndProvider backend={HTML5Backend}> */}

                <Table
                  // columns={columns}
                  //  ref={tableRef}
                  columns={mergedColumns}
                  components={{
                    body: {
                      cell: EditableCell,
                      // row:DraggableBodyRow,
                    },
                  }}
                  // onRow={(record, index) => ({
                  //   index,
                  //   moveRow,
                  // })}
                  dataSource={
                    //  gridData &&  gridData
                    // filteredData && filteredData.length ? filteredData : adminProductswithKEY
                    gridData && gridData.length
                      ? gridData
                      : adminProductswithKEY
                  }
                  expandable={{
                    expandedRowRender: (record) => (
                      <p
                        style={{ margin: 0 }}
                      >{` the product name is ${record.name} and the description is ${record.description}`}</p>
                    ),
                    rowExpandable: (record) => record.info !== "Not Expandable",
                  }}
                  bordered
                  loading={{
                    indicator: (
                      <div>
                        <Spin />
                      </div>
                    ),
                    spinning: productLoading,
                  }}
                  onChange={handleChange}
                  pagination={{
                    position: ["bottomCenter"],
                    defaultPageSize: 3,
                  }}
                />
                {/* </DndProvider> */}
              </Form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductEditableListInAntList;
