import './AndProductListEditable.css'

import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert';
import { clearErrors, getAllproductsForAdminAction } from '../../actions/productActions';
import Loader from '../Loader/Loader';



// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }






const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AndProductListEditable = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

 
  
const {error, loading, products:adminAllProducts} = useSelector(state=>state.adminAllProducts)
// console.log("adminAllProducts000000000000000000000009",adminAllProducts)


const originData = [];




adminAllProducts &&  adminAllProducts.forEach( async (product)=>{
 await originData.push(
{      id:product._id, 
  name:product.name,
  // category:product.category,
  price:product.price,
  // createdAt:new Date(product.createdAt).toLocaleString("en-UK", {dateStyle:"long",}),
  // numOfReviews:product.numOfReviews,
  // stock:product.stock,
  // ratings:product.ratings,

  key:product._id, 
}
  )
})




// console.log("adminAllProducts", adminAllProducts )

// console.log("originData", originData )
// console.log("loading", loading )


const [form] = Form.useForm();
const [data, setData] = useState(originData);

const [editingKey, setEditingKey] = useState('');


console.log("dtaa outsied of useeffect", data)








  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      price: '',
      id: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
      console.log("newe datat inside save fucntin ", newData)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'id',
      dataIndex: 'id',
      width: '40%',
      editable: true,
    },
    {
      title: 'price',
      dataIndex: 'price',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
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
        inputType: col.dataIndex === 'price' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
           }
  
  dispatch(getAllproductsForAdminAction())
         

  // console.log("inside useeff------------ct data", data)
    }, [])
  
 
  
  return (
  <>
     {loading ?(<Loader/>):(
  (<Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={originData }
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>)
     )}
  </>
  );
};

export default AndProductListEditable;