import "./EditProduct.css";
import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  clearErrors,
  editProductionAction,
  getProductsDetailsAction,
} from "../../actions/productActions";

// import { TextField,} from '@mui/material';
import DescriptionIcon from "@mui/icons-material/Description";
// import { Form, Input as antdInput, Button as antButton, Select } from 'antd';
import moment from "moment";

import {
  CodepenOutlined,
  CompassOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Image,
  Modal,
} from "antd";



import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import Resizer from "react-image-file-resizer";
import sanitizeHtml from "sanitize-html-react";
import { EDIT_PRODUCT_RESET } from "../../constants/productConstants";


const { Option } = Select;
const selectOptions = ["judo", "camera", "laptob", "dress", "webcam"];
const children = [];
const dateFormat2 = "DD-MMMM-YYYY";
const dateFormat = "YYYY-MM-DD";

const EditProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const descriptionRef = useRef(null);
  const navigate = useNavigate()

  let {
    loading: productLoading,
    product,
    error: productError,
  } = useSelector((state) => state.product);
  let {
    loading: editloading,
    product: editedproduct,
    error: editProductError,
    success: editProductSuccess,
  } = useSelector((state) => state.editSingleProduct);

  const [defaultValueState, setdefaultValueState] = useState();
  const [editorState, seteditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // const [editorState, seteditorState] = useState("<p>defulat data</p>" );
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const formRef = useRef(null);
  const stockRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);

  //   const fields = form.getFieldsValue()
  // console.log("fields ,", fields)

  // form.setFieldValue("stock", product.stock && product.stock)

  let fields = {};
  let timeoutID;
  let kk;

  let createdDEFAULTvalueForDate =""

  const [descriptionError, setDescriptionError] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageArray, setImageArray] = useState([]);

  const [stocker, setStoker] = useState(0);
  const [pricer, setPricer] = useState(0);
  const [createdDataState, setCreatedDataState] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [editSuccessState, setEditSuccessState] = useState(false);

  const [realproduct, setRealproduct] = useState({});

  const [baseCreatedAt, setBaseCreatedAt] = useState(new Date("2054-06-27T00:00:00.000+00:00"));
  // const [baseCreatedAt, setBaseCreatedAt] = useState(editedproduct?`${editedproduct?.createdAt}`:`${product?.createdAt}`);
  // const [baseCreatedAt, setBaseCreatedAt] = useState(moment(new Date("2022-11-15T00:00:00.000+00:00")).format("DD-MMMM-YYYY"));

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => {
      console.log("re render the forceupdate");
      updateState(baseCreatedAt)

    }

  , []);

  // console.log("force update activated--------------------")

  let masterFileArray = [];
  let masterFileArray2 = [];




  const resizeFile = async(file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });











  const handleChangeforSelect = (value) => {
    // console.log(`selected ${value}`);
  };

  const handleBlur = () => {};

  // for wysiwyg editor state controller
  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (file) => {
    console.log("file in handlehnage" , file)
    // console.log(" e.target.file in handlehnage" , e.originFileObj)
    // console.log("file.originFileObj  in handlehnage" , file)
    // console.log("file.originFileObj  in file.fileList.length" , file.fileList.length)

    setFileList(file.fileList);
    // masterFileArray.length =0
    for (let index = 0; index < file.fileList.length; index++) {

    // const fileAsDATAURl = await getBase64(file.fileList[index].originFileObj);
    const fileAsDATAURl = await resizeFile(file.fileList[index].originFileObj);

    masterFileArray.push(fileAsDATAURl)
     
    }
   const imaageEditedSet = new Set(masterFileArray)


masterFileArray = Array.from(imaageEditedSet)
setImageArray(masterFileArray)
    console.log("masterFileArray first---" , masterFileArray)
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    // console.log("file in handlePreview" , file)

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  // const handleChange2 = ({ fileList: newFileList }) => setFileList(newFileList);

  const removeImage = (public_id) => {
    console.log("public_id==", public_id);
    // const editedproduct ={imagesToDestroy:public_id}
    let imagesToDestroy = public_id;
    console.log("iamges prior to filer===", product.images);
    let fitleredImages =
      product.images &&
      product.images.filter((image) => image.public_id !== public_id);

    console.log("fitleredImages prior to filer===", fitleredImages);

    let formdata = new FormData();
    formdata.append("imagesToDestroy", imagesToDestroy);
    for (let index = 0; index < fitleredImages.length; index++) {
      console.log(`${index}---`, fitleredImages[index]);
      formdata.append("images", JSON.stringify(fitleredImages[index]));
    }

    dispatch(editProductionAction(id, formdata));
  };

  const onFinish = async (values) => {
    values.description = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    
    if (fileList.length > 0) {
      // masterFileArray2 = [];
      for (let index = 0; index < fileList.length; index++) {
        const fileAsDATAURl = await getBase64(fileList[index].originFileObj);
        masterFileArray2.push(fileAsDATAURl);
      }
      // values.newImages = masterFileArray2;
    }

    form.validateFields();

    console.log("Received values of form: ", values);

    const myForm = new FormData();

    myForm.append("name", values.name);
    myForm.append("price", values.price);
    myForm.append("createdAt", values.createdAt);
    myForm.append("category", values.category);
    myForm.append("stock", values.stock);

    console.log("pppppppppppppppppppppppppppppppppppp  out");
    console.log("masterFileArray second---" , imageArray)

    if(imageArray.length > 0){

     console.log("pppppppppppppppppppppppppppppppppppp");

      [...imageArray].forEach(image => {
        myForm.append("newImages", image);
    })

    }






    //  myForm.append("description", values.category)
    // const sanitizer = new Sanitizer();
    // console.log(" sanitizeHtml( values.description)" , sanitizeHtml( values.description))

    if (
      sanitizeHtml(values.description).replace(/(<([^>]+)>)/gi, "").length < 10
    ) {
      // console.log(" sanitizeHtml( values.description).replace(/(<([^>]+)>)/ig, '')" ,sanitizeHtml( values.description).replace(/(<([^>]+)>)/ig, ''))
      alert.error("description should be more than 10 characters");
      setDescriptionError(true);
      return;
    }
    myForm.append(
      "description",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );

    if (values.imagesNew !== undefined && values.imagesNew.length > 0) {
      console.log(typeof values.imagesNew);
      console.log("values.imagesNew---", values.imagesNew);
      console.log(
        " Array.isArray(files)  files in registerproductchange--",
        Array.isArray(values.imagesNew)
      );
      console.log(
        " Object.prototype.toString.call(files)  files in registerproductchange--",
        Object.prototype.toString.call(values.imagesNew)
      ); //"[object Object]" if myVar is an object   "[object Array]" if myVar is an array

      // let arrOfImages =Array.from(values.imagesNew)
      // console.log("arrOfImages---",arrOfImages)
      //   Array.from(arrOfImages).foreach(async(image)=>{
      //     console.log("iamges--", image)
      //     await myForm.append("imagesNew", image)
      // })

      for (let index = 0; index < values.imagesNew.length; index++) {
        // console.log(` arrOfImages[${index}]`,  arrOfImages[index])

        myForm.append("imagesNew", values.imagesNew[index]);
      }
    }



    dispatch(editProductionAction(id, myForm));

    editedproduct=undefined

    // navigate("/productlists")

    // navigate(`/edit/product/${id}`)
    

    console.log("edit form with new images is submitted");
  };

  const desctiptionChangeHandler = (e) => {
    // console.log("desctiptionChangeHandler ref", e)
    // console.log("desctiptionChangeHandler e.blocks[0].text", e.blocks[0].text)
    // console.log(" e.blocks[0].text.length.elength ", e.blocks[0].text.length)

    if (e.blocks[0].text.length < 10) {
      // descriptionRef.current.style.border = "3px solid red"
      descriptionRef.current.classList.add("descriptionBoxAddREd");
      setDescriptionError(true);
    } else {
      // descriptionRef.current.style.border = "none"
      descriptionRef.current.classList.remove("descriptionBoxAddREd");
      setDescriptionError(false);
    }
  };

  const changeForStockInputhandler = (e) => {
    // console.log("e in changeForStockInputhandler", e);
    //  setStoker(e.target.value)
  };

  const changeInputHandler = (e) => {
    // console.log("e in input handler", e);
  };

  const focusInputForStock = (e) => {
    //   console.log("e in focusInputForStock --focusInputForStock", e);
    //   console.log("ffffffffffffffffffffffffffffff",fields)
    //   // if(fields.stock){
    //     console.log("ssssssssssssssssssssssssssssssssssssssssssssssssss", fields.stock)
    //     //  e.target.value = stocker+1
    //     //  setStoker(e.target.value )
    //   // }
  };

const onFocusOFDatePicker =()=>{
  // console.log("inisee onFocusOFDatePickerbbbbbbbbbbb b  b ")
  // if (dateRef.current){
  // console.log("inisee onFocusOFDatePickerbvvvvvvvvvvvvvvvvvv")
  // dateRef.current.value =moment( new Date('2054-06-28')).format('DD-MMMM-YYYY')

  // }

}

const dateinputer =()=>{
  dateRef.onChange()
}

  useEffect(() => {
    dispatch(getProductsDetailsAction(id));
    console.log("dispatched at first useeffect----------");
    createdDEFAULTvalueForDate = editedproduct?`${editedproduct?.createdAt}`:`${product?.createdAt}`



    setRealproduct(product);
    console.log("product --", product);
    console.log("productlaoding --", productLoading);
    console.log("editedproduct --", editedproduct);

    // setBaseCreatedAt(  editedproduct?`${editedproduct.createdAt}`:`${product.createdAt}`)

    // setBaseCreatedAt(editedproduct?.createdAt ? moment( new Date(editedproduct.createdAt)).format('DD-MMMM-YYYY'):moment( new Date(product?.createdAt)).format('DD-MMMM-YYYY'))

    if (children.length === 0) {
      for (let i = 0; i < selectOptions.length; i++) {
        children.push(
          <Option key={selectOptions[i]}>{selectOptions[i]}</Option>
        );
      }
    }

    let fields2 = {};

    if (
      product &&
      product.description &&
      product.description.replace(/(<([^>]+)>)/gi, "").length < 10
    ) {
      // console.log("description errrrrrrrrrrrrrrrrrrrrror ")
      // console.log("descriptionRefdescriptionRefdescriptionRefdescriptionRef-",descriptionRef)
      // setDescriptionError(true)
      // console.log("descriptionError 00000000000000000000000000==",descriptionError)
      // descriptionRef.current.classList.add("descriptionBoxAddREd")
    }

    if (descriptionError) {
      // console.log("description sssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ")
      // console.log("descriptionError 00000000000000000000000000==",descriptionError)

      descriptionRef.current.classList.add("descriptionBoxAddREd");
    }

    if (editProductSuccess) {
      alert.success("product edited successsfully");
      // console.log(" dispatch({type: dispatch(getProductsDetailsAction(id));})    ----------------------  dispatch(getProductsDetailsAction(id));")
      // dispatch(getProductsDetailsAction(id));
      console.log(
        " dispatch({type:EDIT_PRODUCT_RESET})    ---------------------- dispatching"
      );
      dispatch({ type: EDIT_PRODUCT_RESET });

      setEditSuccessState(false);
    }

    if (editProductError) {
      alert.error(editProductError);

      dispatch(clearErrors());
    }

    if (productError) {
      alert.error(productError);

      dispatch(clearErrors());
    }

    setEditSuccessState(editProductSuccess);

    if (formRef.current) {
      // console.log("formref======", formRef)
      // verify ref link with current
      // setTimeout(function () {
      fields = form.getFieldsValue();
      // form.resetFields()
      fields2 = { ...fields };
      // console.log("fields ,", fields)
      form.resetFields();
      form.setFieldsValue({ fields });
      // console.log("fields2 ,", fields2)

      // stockRef.current.value = fields2.stock

      // },10);
    }

    // var event = new Event('change', { bubbles: true });
    // stockRef.current.dispatchEvent(event);

    // var element = document.getElementById("element-id");
    // var trigger = Object.getOwnPropertyDescriptor(
    //   window.HTMLSelectElement.prototype,
    //   "value"
    // ).set;
    // trigger.call(element, 4); // 4 is the select option's value we want to set
    // var event = new Event("change", { bubbles: true });
    // element.dispatchEvent(event);

    // timeoutID =  window.setTimeout(() => {

    //  setTimeout(() => {
    //     console.log("timeout called ")
    //     // console.log("stockerd.",    stockRef)
    //     // form.setFieldValue("stock",888)
    //     // console.log("stockerd.curent",    stockRef.current)
    //     stockRef.current.focus()
    //     setStoker(fields.stock)

    //     // setStoker(555)
    //     // console.log("changeForStockInputhandler",changeForStockInputhandler)
    //     // setStoker(666)
    //     // stockRef.current.input.value = 7878
    //     // console.log("stockRef.current.input.value --",stockRef.current.input.value )
    //     // changeForStockInputhandler()
    //   //  setTimeout(() => {
    //   //   console.log("stocker winise setimeout setimeour---", stocker)
    //   //   stockRef.current.input.value=987
    //   //  }, 2000);

    //   // document.getElementById("stock").value = 323232
    // // kk=  323232
    // //   window.alert( kk)

    //    //  stock:product.stock && Number(product.stock),
    //               //  price:product.price && product.price,

    //               var nativeInputValueSetter2 = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    //               // nativeInputValueSetter.call(document.getElementById("stock"), 'is working');
    //               nativeInputValueSetter2.call(document.getElementById("stock"), 0);

    //               var inputEvent2 = new Event('input', { bubbles: true});
    //               document.getElementById("stock").dispatchEvent(inputEvent2);

    // var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    // // nativeInputValueSetter.call(document.getElementById("stock"), 'is working');
    // console.log("product.stock--",product.stock)
    // nativeInputValueSetter.call(document.getElementById("stock"), product.stock && Number(product.stock));

    // var inputEvent = new Event('input', { bubbles: true});
    // document.getElementById("stock").dispatchEvent(inputEvent);

    // }, 2000);

    // setTimeout(() => {
    //   setStoker(2525)
    // }, 2000);

    //  setInterval(() => {
    //   if (formRef.current) {
    //     form.setFieldValue("price",9999)
    //   }

    //   setStoker(fields2.stock)
    //   setPricer(1000)

    //   console.log("stocker" , stocker)

    //  }, 3000);

    // form.setFieldValue("stock",35)

    //   seteditorState("dfasf")
    //   seteditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(<p>my text</p>))));

    /// setting the default value of the producdts
    // if (product) {
    //   product.description &&
    //     seteditorState(
    //       EditorState.createWithContent(
    //         ContentState.createFromBlockArray(
    //           convertFromHTML(`${product.description}`)
    //         )
    //       )
    //     );
    // }


    return () => {
      //  productError= null
      // window.clearTimeout(timeoutID )
      // clearTimeout(timeoutID )
      console.log("clean up in first useeffect at editproduct.js");
    };
    // }, [alert, id, editProductSuccess,editedproduct, editloading]);
  }, [alert, id, editedproduct, editProductSuccess,]);

  useEffect(() => {

    if (product) {
      setBaseCreatedAt( new Date( `${product?.createdAt}` ))


      
      product.description &&
        seteditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(`${product.description}`)
            )
          )
        );
    }

    setTimeout(() => {
      // setBaseCreatedAt(editedproduct?.createdAt ? moment( new Date(editedproduct.createdAt)).format('DD-MMMM-YYYY'):moment( new Date(product?.createdAt)).format('DD-MMMM-YYYY'))

      // form.resetFields()
      console.log("timeout called ");
      // console.log("stockerd.",    stockRef)
      // form.setFieldValue("stock",888)
      // console.log("stockerd.curent",    stockRef.current)

      if (formRef.current) {
        // form.setFieldsValue({
        //   "createdAt ": baseCreatedAt
        // });
    

        stockRef.current.focus();
        priceRef.current.focus();
        // dateRef.current.focus()

        // dateRef.current.value = editedproduct?.createdAt ? moment( new Date(editedproduct.createdAt)).format('DD-MMMM-YYYY'):moment( new Date(product?.createdAt)).format('DD-MMMM-YYYY')

        setStoker(fields.stock);

        form.setFieldsValue({
          category: editedproduct
            ? editedproduct.category?.split(",")
            : product?.category?.split(","),
        });
        // form.setFieldsValue({"createdAt ":null})


      




        form.setFieldsValue({
          "createdAt ": editedproduct
            ? moment(new Date(editedproduct?.createdAt)).format("DD-MMMM-YYYY")
            : moment(new Date(product?.createdAt)).format("DD-MMMM-YYYY"),
        });

        // if(!editedproduct){
        //   form.setFieldsValue({"createdAt ":product?.createdAt})
        // }

        // editedproduct?`${editedproduct.createdAt}`:`${product.createdAt}`

        // setStoker(555)
        // console.log("changeForStockInputhandler",changeForStockInputhandler)
        // setStoker(666)
        // stockRef.current.input.value = 7878
        // console.log("stockRef.current.input.value --",stockRef.current.input.value )
        // changeForStockInputhandler()
        //  setTimeout(() => {
        //   console.log("stocker winise setimeout setimeour---", stocker)
        //   stockRef.current.input.value=987
        //  }, 2000);

        // document.getElementById("stock").value = 323232
        // kk=  323232
        //   window.alert( kk)

        //  stock:product.stock && Number(product.stock),
        //  price:product.price && product.price,

        // var nativeInputValueSetter2 = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        // // nativeInputValueSetter.call(document.getElementById("stock"), 'is working');
        // nativeInputValueSetter2.call(document.getElementById("stock"), 0);

        // var inputEvent2 = new Event('input', { bubbles: true});
        // document.getElementById("stock").dispatchEvent(inputEvent2);

        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        // nativeInputValueSetter.call(document.getElementById("stock"), 'is working');
        // console.log("product.stock--",product.stock)
        nativeInputValueSetter.call(
          document.getElementById("stock"),
          product?.stock && Number(product.stock)
        );

        var inputEvent = new Event("input", { bubbles: true });
        document.getElementById("stock").dispatchEvent(inputEvent);



        var nativeInputValueSetter3 = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        // nativeInputValueSetter.call(document.getElementById("stock"), 'is working');
        // console.log("product.stock--",product.price)
        nativeInputValueSetter3.call(
          document.getElementById("price"),
          product?.price && Number(product.price)
        );

        var inputEvent3 = new Event("input", { bubbles: true });
        document.getElementById("price").dispatchEvent(inputEvent3);

        dateRef.current.focus();

    

          var nativeInputValueSetter4 = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          ).set;
          nativeInputValueSetter4.call(
            document.getElementById("createdAt"),
            editedproduct?.createdAt
              ? moment(new Date(editedproduct?.createdAt)).format("DD-MMMM-YYYY")
              : moment(new Date(product?.createdAt)).format("DD-MMMM-YYYY")
          );
          // nativeInputValueSetter4.call(document.getElementById("createdAt"),baseCreatedAt );
  
          var inputEvent4 = new Event("input", { bubbles: true });
          document.getElementById("createdAt").dispatchEvent(inputEvent4);
          
 








        var nativeInputValueSetter5 = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        // nativeInputValueSetter.call(document.getElementById("stock"), 'is working');
        // console.log("product.stock--",product.price)
        nativeInputValueSetter5.call(
          document.getElementById("name"),
          product?.name && product.name
        );

        var inputEvent5 = new Event("input", { bubbles: true });
        document.getElementById("name").dispatchEvent(inputEvent5);
      }

      // setCategoryState(editedproduct?editedproduct.category.split(","):product.category.split(","))


      // setBaseCreatedAt( prevState =>( {...prevState},editedproduct?`${editedproduct?.createdAt}`:`${product?.createdAt}`) )
      // setBaseCreatedAt( new Date( editedproduct?`${editedproduct?.createdAt}`:`${product?.createdAt}` ))
      // setBaseCreatedAt( new Date( `${product?.createdAt}` ))

      // setBaseCreatedAt( createdDEFAULTvalueForDate )

  

      console.log("baseCreatedAt ===vvvvvvvvvvv=======",baseCreatedAt)
      // console.log("createdDEFAULTvalueForDate ===vvvvvvvvvvv=======",createdDEFAULTvalueForDate)
    }, 1000);




    return () => {};
  }, [product, id , alert , editedproduct]);




  return (
    <Fragment>
      {productLoading || productLoading === undefined ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="Edit_product_form">
            <Form
              form={form}
              ref={formRef}
              initialValues={{
                name: editedproduct ? editedproduct.name : product.name,
                //  stock:product.stock && Number(product.stock),
                //  price:product.price && product.price,

                stock: stocker,
                price: pricer,

                //  stock:product.stock && 25,

                //  category:product.category && product.category.split(","),
                category: editedproduct
                  ? editedproduct.category.split(",")
                  : product?.category.split(","),
                // category:setCategoryState
                // category:["hie ", "therer"]

                //  createdAt:product.createdAt && product.createdAt,
              }}
              className="edit_product_actual_form"
              autoComplete="off"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 50 }}
              onFinish={onFinish}
              // onFinish={(values) => {
              //   console.log({ values });

              // }}
              onFinishFailed={(error) => {
                console.log({ error });
                // if(error){
                //   console.log( error.errorFields[0]);
                // }
              }}
            >
              <Form.Item
                name="name"
                label="Product Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter product name",
                  },
                  { whitespace: true },
                  { min: 3 },
                  { max: 35 },
                ]}
                // initialValue={product.name && product.name}
                hasFeedback
              >
                <Input
                  style={{
                    width: "30vw",
                  }}
                  placeholder="Type your product name"
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name="stock"
                label="Product stock"
                // help="Should not contain more than 5 digits"
                //  initialValue={product.stock && product.stock}

                //  initialValue={95}

                //   getValueFromEvent={(e) => {
                //     // console.log(e)
                //     // const { target } = e;
                //     // console.log(target)
                //     const value = e.target.value
                //     console.log(value)
                //     return value
                // //     const convertedValue = Number(e.currentTarget.value);
                // //     console.log("convertedValue--",convertedValue)
                // //  return convertedValue;
                // }},

                rules={[
                  {
                    // type: "number",
                    // message: "The input is not valid number!",
                  },
                  {
                    required: true,
                    message: "Please enter product stock",
                  },
                  // { whitespace: true },
                  { min: 1 },
                  { max: 5 },

                  {
                    // message: "value entered is not a number",

                    validator: (_, value) => {
                      // if (/^[a-zA-Z0-9]+$/.test(value)) {
                      // console.log("default vlaue of staock " , value)
                      let vv = Number(value);

                      if (!isNaN(vv)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("entered value is not a number ");
                      }
                    },
                  },

                  {
                    // message: "value entered is not a number",

                    validator: (_, value) => {
                      // if (/^[a-zA-Z0-9]+$/.test(value)) {
                      // console.log("default vlaue of staock " , value)
                      let vv = Number(value);

                      if (0 < Number(vv)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "entered value is less than zero"
                        );
                      }
                    },
                  },
                  {
                    // message: "value entered is not a number",

                    validator: (_, value) => {
                      // if (/^[a-zA-Z0-9]+$/.test(value)) {
                      // console.log("default vlaue of staock " , value)
                      // console.log("default vlaue of typeof Number(value) " , typeof Number(value))

                      if (typeof Number(value) === "number") {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("entered value is float ");
                      }
                    },
                  },
                ]}
                hasFeedback
              >
                <Input
                  ref={stockRef}
                  onChange={(e) => changeForStockInputhandler(e)}
                  onInput={(e) => changeInputHandler(e)}
                  onFocus={(e) => focusInputForStock(e)}
                  // value={555555555}
                  allowClear
                  style={{
                    width: "30vw",
                  }}
                  placeholder="Type your product stock"
                  // defaultValue={product.stock && product.stock}
                />
              </Form.Item>

              <Form.Item
                name="price"
                label="Product price"
                rules={[
                  {
                    //   type:"number",
                    //   message: 'The input is not valid number!',
                  },
                  {
                    required: true,
                    message: "Please enter product price",
                  },
                  // { whitespace: true },
                  { min: 1 },
                  { max: 5 },
                  {
                    message: "value entered is not a number",
                    validator: (_, value) => {
                      // if (/^[a-zA-Z0-9]+$/.test(value)) {
                      if (!isNaN(value)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "value you have entered is not a number"
                        );
                      }
                      // if(value>99999){

                      // return Promise.resolve();
                      // } else {
                      //   return Promise.reject('value you entered expped ');
                      // }
                    },
                  },
                  {
                    message: "value exceed the price limit",
                    validator: (_, value) => {
                      if (Number(value) < Number(100000)) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "value you entered exceed the price limit "
                        );
                      }
                    },
                  },
                ]}
                hasFeedback
                // initialValue={product.price && product.price}
                // value = {product.price && product.price}
              >
                <Input
                  allowClear
                  ref={priceRef}
                  style={{
                    width: "30vw",
                  }}
                  placeholder="Type your product price"
                />
              </Form.Item>

              <Form.Item
                label="Created Date"
                name="createdAt"
                rules={[
                  {
                    required: true,
                    message: "Please enter product Created date",
                  },
                ]}
                hasFeedback
                //product.createdAt && product.createdAt   `2022-06-13 `
             

                initialValue={moment(
                  // product.createdAt && `${product.createdAt}`,
                  editedproduct?.createdAt ? `${editedproduct?.createdAt}`: `${product?.createdAt}`,
                  // editedproduct?.createdAt ? `${editedproduct?.createdAt}`: baseCreatedAt,

                  // baseCreatedAt,
                  // createdDEFAULTvalueForDate,

                  dateFormat

                )}
               

              >
         
               
                <DatePicker 
                  // onChange={forceUpdate}
                  onSelect={forceUpdate}
                  onFocus ={onFocusOFDatePicker}
              
                  allowClear
                  ref={dateRef}
                  //  value={ editedproduct?.createdAt?`${editedproduct.createdAt}`:`${product.createdAt}`}

                  style={{
                    width: "30vw",
                  
                  }}
               
                  // defaultPickerValue={moment(  editedproduct?.createdAt ? `${editedproduct?.createdAt}`: `${product?.createdAt}` , dateFormat)}

                   
                  // defaultValue={moment(  editedproduct?.createdAt ? `${editedproduct?.createdAt}`: `${product?.createdAt}` , dateFormat)}
                  format={dateFormat2}
                />
              </Form.Item>
 
        
        {/* <input  onClick={dateinputer} className="dateinputer" readOnly value =  {baseCreatedAt && moment(baseCreatedAt).format('DD-MMMM-YYYY')  } style={{border:"none"}}/> */}

              {/* <TextField 
              sx={{padding:"1vmax"}}
              required
              fullWidth ={true}
              label="Product Name"
              name="name"
            //   className={margin}
              defaultValue={product && product.name}
              onChange={handleChange}
              error={true}
               helperText={"not correct"}
                 autoComplete="off"
            //   error={errors.email ? true : false}
            //   helperText={errors.email}
              onBlur={handleBlur}
              placeholder='Enter the product name'
              
              />


             <TextField 
              sx={{padding:"1vmax"}}
              required
              fullWidth ={true}
              label="Product price"
              name="price"
            //   className={margin}
              defaultValue={product && product.price}
              onChange={handleChange}
              error={true}
               helperText={"not correct"}
                 autoComplete="off"
            //   error={errors.email ? true : false}
            //   helperText={errors.email}
              onBlur={handleBlur}
              placeholder='Enter the product price'
              
              />

               <TextField 
              sx={{padding:"1vmax"}}
              required
              fullWidth ={true}
              label="Product stock"
              name="stock"
            //   className={margin}
              defaultValue={product && product.stock}
              onChange={handleChange}
              error={true}
               helperText={"not correct"}
                 autoComplete="off"
            //   error={errors.email ? true : false}
            //   helperText={errors.email}
              onBlur={handleBlur}
              placeholder='Enter the product stock'
              
              /> */}

              <Form.Item
                name="category"
                label="category"
                //  requiredMark="optional"

                rules={[
                  {
                    required: true,
                    message: "please enter a product category altleast",
                  },
                ]}
                hasFeedback
                // initialValue={product.category && product.category.split(",")}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "30vw",
                  }}
                  placeholder="Please select"
                  // defaultValue={['a10', 'c12']}
                  // defaultValue={product.category && product.category.split(",")}

                  onChange={handleChangeforSelect}
                >
                  {children}
                </Select>
              </Form.Item>

              <div
                id="descriptionBoxInEditProduct"
                ref={descriptionRef}
                className={descriptionError ? "descriptionBoxAddREd" : null}
              >
                {" "}
                <span>
                  <DescriptionIcon />{" "}
                  {descriptionError
                    ? "Product description should be more than 10 Characters"
                    : " Product description"}
                </span>
                {/* <TextareaAutosize
                type="text"
                placeholder="Enter your product description here.."
                required
                name="description"
                value={description}
                onChange={registerproductChange}
              /> */}
                <Editor
                  onChange={(e) => desctiptionChangeHandler(e)}
                  editorState={editorState ? editorState : defaultValueState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
              </div>

              <div className="alreadyImages">
                {product.images &&
                  product.images.map((image) => (
                    <div
                      key={image.public_id}
                      className="imageCardInEditProduct"
                    >
                      <img
                        src={image.url}
                        alt={image.public_id}
                        onClick={() => setVisible(true)}
                      />
                      <Button
                        style={{ marginTop: "5px" }}
                        type="primary"
                        onClick={() => removeImage(image.public_id)}
                      >
                        Remove Image
                      </Button>
                      <div
                        style={{
                          display: "none",
                        }}
                      >
                        <Image.PreviewGroup
                          preview={{
                            visible,
                            onVisibleChange: (vis) => setVisible(vis),
                          }}
                        >
                          {product.images &&
                            product.images.map((image) => (
                              <Image
                                key={image.public_id}
                                src={image.url}
                                alt={image.public_id}
                              />
                            ))}
                        </Image.PreviewGroup>
                      </div>
                    </div>
                  ))}
              </div>

              <Form.Item label="Upload" valuePropName="fileList">
                <Upload
                  // action="/upload.do"
                  listType="picture-card"
                  beforeUpload={(file) => {
                    // console.log("file using antd upload----", file);
                    return false;
                  }}
                  multiple={true}
                  onChange={handleChange}
                  // listType='picture'
                  // fileList={fileList}
                  onPreview={handlePreview}
                  accept="image/*"
                >
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button block type="primary" htmlType="submit">
                  EDIT PRODUCT
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditProduct;
