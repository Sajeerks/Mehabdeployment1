import "./Createproduct.css";
import React, { useRef, useState, Fragment, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import profilePic from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CategoryIcon from "@mui/icons-material/Category";

import InventoryIcon from "@mui/icons-material/Inventory";
import { useAlert } from "react-alert";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToHTML } from "draft-convert";
// import DOMPurify from "dompurify";
// import DOMPurify from 'isomorphic-dompurify';
import { stateToHTML } from "draft-js-export-html";
// import imageCompression from 'browser-image-compression';
import Resizer from "react-image-file-resizer";



import { Select } from 'antd';
import { Form, } from "antd";
import { handleBreakpoints } from "@mui/system";
import { clearErrors, createNewProductAction } from "../../actions/productActions";
const { Option } = Select;
const selectOptions = ["judo", "camera", "laptob", "dress", "webcam"];
const children = [];
const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

const Createproduct = () => {
  const createProductRef = useRef(null);
  const desti = useRef(null);
  const chooser = useRef(null);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
const {error:createProductError,loading:createProductLoading, product:createdProduct ,success:productCreaatedSuccess } = useSelector(state =>state.createSingleNewProduct)



  const [coategorySetter, setcoategorySetter] = useState("")
  const [images, setImages] = useState([])
  const [images2, setImages2] = useState([])
  const [submitter, setsubmitter] = useState(false)

  const [fileLengter, setfileLengter] = useState("")


  const [imageFiles, setImageFiles] = useState([]);
  const [loaclfilepaths, setloaclfilepaths] = useState([])

  const [product, setproduct] = useState({
    name: "",
    description: "",
    price: "",
    // category: "",
    stock: "",
  });
  const { name, description, price, stock } = product;
  const [productPics, setproductPics] = useState([]);
  const [singleProductPic, setSingleProductPic] = useState();
  const [productPreview, setProductPreview] = useState(profilePic);

  const [editorState, seteditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [dupliacteeditorstate, setdupliacteeditorstate] = useState(() =>
    EditorState.createEmpty()
  );
  const clean = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  // console.log("clenass--", clean);

  function createMarkup() {
    return {
      __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    // return {__html:`<p>sadf<span style="color: rgb(26,188,156);">ddfd and </span><span style="color: rgb(243,121,52);">that istdfddd<sup>3999</sup></span></p>`}
  }

  const productCreateSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", draftToHtml(convertToRaw(editorState.getCurrentContent())));
    myForm.set("price", price);
    myForm.set("category", coategorySetter.toString());
    myForm.set("stock", stock);

    // myForm.append("images", [...images]);

      [...images].forEach(image => {
        myForm.append("images", image);
    })

    setsubmitter(true)
   // console.log("productcreate  form submitted");
    
    dispatch(createNewProductAction(myForm))
  };

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




  const registerproductChange = async(e) => {
    // console.log("e insiethe registerproductname==",e)
    // console.log("descri[tipn ---",draftToHtml(convertToRaw(editorState.getCurrentContent())))
   

    if (e.target.name === "productPic") {
      // console.log("images insed the registerproductChange=== first", images)
    
      const { files } = e.target;
      console.log("files in registerproductchange--", files)
      console.log("files.length in registerproductchange--", files.length)

      console.log(" Array.isArray(files)  files in registerproductchange--", Array.isArray(files)  )
      console.log(" Object.prototype.toString.call(files)  files in registerproductchange--", Object.prototype.toString.call(files) )  //"[object Object]" if myVar is an object   "[object Array]" if myVar is an array 
      chooser.current.innerText = ( files.length > 0 )?( files.length + "--files loaded"): ("no " + "--files loaded");


      // console.log("e.target in--", e.target.value)
    let lenger = files.length
  

      let validImageFiles = [];

      // const forLoop = async _ => {
      //   console.log("start");

      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];

      const lister = async()=>{
      const promiseArray =[]

        // Object.values(files) .forEach(async (file)=>{
        
      for (let i = 0; i < files.length; i++) {
      

          const resulter =    async ()=>{
           try {
               const compressedfilr = await resizeFile(files[i])
              console.log("compressedfilr===",compressedfilr)
              promiseArray.push(
               new  Promise(  (resolve, reject) => {
                  resolve(compressedfilr)
                 //  console.log("validImageFiles inside promise==",validImageFiles)
                  reject("promsise rejected")
   
               })
              )
              
           } catch (error) {
              console.log(error)
           }
            
           }
          await   resulter(files[i])
   
     // console.log("resulter===",answ)
   
           // if (file.type.match(imageTypeRegex)) {
             // validImageFiles.push(file);
   
            
             console.log("promiseArray--inside",promiseArray);
   
           }
        //  })
       // } /// end of  forLoop async




      Promise.all(promiseArray).then(async(res)=>{
        
        console.log("res---",res)
        setImages(res)
             validImageFiles = res
             console.log("validImageFiles in ",validImageFiles)
            if (validImageFiles.length) {
              //  let compressedImages =[]
        
              //  validImageFiles.forEach(async (file)=>{
              //   async function handleImageUpload(file) {
              //     try {
              //          const options = {
              //         maxSizeMB: .250,
              //         maxWidthOrHeight: 560,
              //         useWebWorker: true
              //       }
              //       const compressedFile = await imageCompression(file, options);
              //       console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
              //       console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
              //       compressedImages.push(compressedFile);
              //       console.log("comressed file",compressedFile)
              //       // await uploadToServer(compressedFile); // write your own logic
              //     } catch (error) {
              //       console.log(error);
              //     }
              //   }
              //  await  handleImageUpload(file) 
        
        
              //  })
              //  setImages2(compressedImages)
              //  console.log("compressedImages ====",compressedImages)
        
              //  console.log("imagres2222 ====",images2)
        
                setImageFiles(validImageFiles);
               
              
                // chooser.current.innerText = ( files.length > 0 )?( files.length + "--files loaded"): ("no " + "--files loaded");
                // chooser.current.innerText = `${fileLengter}----files loaded`
                // console.log("images insed the registerproductChange=== ", images)
                return;
              }
              alert.info("Selected images are not of valid type!");
              setImages([])
    
          })
    







        
      }

       await lister() 
     
      console.log("validImageFiles--",validImageFiles);
      // console.log("promiseArray--",promiseArray);









      // const reader = new FileReader();

      // reader.onload = () => {
      //   if (reader.readyState === 2) {
      //     setProductPreview(reader.result);
      //     setImages(reader.result);
      //     console.log("images==", images)
      //     console.log("images.length==", images.length)

      //     // console.log("reader",reader.name)
      //     // console.log("e.target.files[0]",e.target.files[0].name)
      //     chooser.current.innerText = e.target.files[0].name;
      //   }
      // };
      // reader.readAsDataURL(e.target.files[0]);
    } else {
      setproduct({ ...product, [e.target.name]: e.target.value , category :coategorySetter.toString()});
    }
    // console.log("product inside registerproductchange  -", product)
  };

  const activateFileinput = () => {
    // console.log(chooser.current.getAttribute("name"))
    // setfileLengter(0)
    // console.log(desti)
    desti.current.click();
  };

  //    function   handleChange(event){
  //         let value = event.target.value;

  //        const blocksFromHtml = htmlToDraft(value);
  //        const { contentBlocks, entityMap } = blocksFromHtml;
  //        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  //         editorState = EditorState.createWithContent(contentState);

  //         let editorState = editorState;
  //         let editorSourceHTML = value;
  //             console.log(editorSourceHTML);

  //     }
  if(children.length === 0){
    for (let i = 0; i < selectOptions.length; i++) {
  children.push(<Option key={ selectOptions[i]}>{selectOptions[i]}</Option>);
}

}

useEffect(() => {

  console.log("images---",images)
  // setfileLengter(images.length)
  if(productCreaatedSuccess && submitter) {
    alert.success("New product created successfully")
    
// setproduct({
//   name: "",
//   description: "",
//   price: "",
//   category:"",
//   stock: "",

// })
    // setImages([])
setsubmitter(false)
  }
  
if(createProductError){
  alert.error(createProductError)
  dispatch(clearErrors())
}

  const imagess = [], fileReaders = [];
  let isCancel = false;
  // if (imageFiles.length) {
  //   imageFiles.forEach((file) => {
  //     const fileReader = new FileReader();
  //     fileReaders.push(fileReader);
  //     fileReader.onload = (e) => {
  //       const { result } = e.target;
  //       if (result) {
  //         imagess.push(result)
  //       }
  //       if (imagess.length === imageFiles.length && !isCancel) {
  //       // if (images2.length === imageFiles.length && !isCancel) {
  //       //   console.log("asdddddddddddddddddddddddddddddddddddddd")
  //       //      const convertedArrayTOBase64 = []
  //       //   // setImages(imagess);
  //       //   images2.forEach(async (imgBlober) => {
  //       //           var reader = new FileReader();
  //       //   reader.readAsDataURL(imgBlober);
  //       //   reader.onloadend = function () {
  //       //   var base64String = reader.result;
  //       //   convertedArrayTOBase64.push(base64String)
  //       //   }
  //       //           // await convertedArrayTOBase64.push(Buffer.toString(imgBlober))
  //       //     // console.log("Buffer.toString(imgBlober)--",Buffer.toString(imgBlober))
  //       //   });
  //       //   // setImages(images2);

  //         setImages(imagess);
  
  //         console.log("images --", imagess)
  //       }
  //     }
  //    fileReader.readAsDataURL(file);

  //   //   fileReader.onloadend = () =>{
  //   //     setImages2(oldArray => [...oldArray, fileReader.result ])
  //   // }
    
   

  //   })
  // };
  return () => {
    isCancel = true;
    fileReaders.forEach(fileReader => {
      if (fileReader.readyState === 1) {
        fileReader.abort()
      }
    })





  } /// end of return inside the useeffect






}, [imageFiles, createProductError, createdProduct, alert, productCreaatedSuccess, images2,])
// console.log("inages----------------", images)
// console.log("inages---222-------------", images2)

// console.log("inages.lenght----------------", images.length)


// console.log("imageFiles----------------", imageFiles)



const selectChangehandler =(value)=>{
  setcoategorySetter(value) 
  // console.log("categorusetter", coategorySetter)
}


  return (
    <Fragment>
      <div className="main_Create_product_div">
        <h2 className="productCreateHeading">CREATE PRODUCT</h2>
      <form
        className="productCreateform"
        ref={createProductRef}
        encType="multipart/form-data"
        onSubmit={productCreateSubmitHandler}
      >
        <div className="productNameInput">
         <span> <BadgeIcon />  Product name</span>
          <input
            type="text"
            placeholder="Enter your product Name .."
            required
            name="name"
            value={name}
            onChange={registerproductChange}
          />
        </div>
        <div className="productStockInput">
         <span>  <InventoryIcon />Product Stock</span>
          <input
            type="number"
            placeholder="enter  your stock here..."
            required
            name="stock"
            value={stock}
            onChange={registerproductChange}
          />
        </div>

        <div className="productPriceInput">
        <span>    <AttachMoneyIcon />Product price</span>
          <input
            type="number"
            placeholder="enter  your stock here..."
            required
            name="price"
            value={price}
            onChange={registerproductChange}
          />
        </div>

        <div className="productCategoryinput">
           <span><CategoryIcon /> Product Categoy</span>
                <Select
                
                name="category"
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
            // defaultValue={['select the value']}
            onChange={selectChangehandler}
          >
            {children}
             </Select>
          {/* <input
                type="number"
                placeholder="enter  your stock here..."
                required
                name="price"
                value={price}
                onChange={registerproductChange}
              /> */}
        </div>
        <div id="descriptionBox">
          <span><DescriptionIcon />  Product description</span>
          {/* <TextareaAutosize
                type="text"
                placeholder="Enter your product description here.."
                required
                name="description"
                value={description}
                onChange={registerproductChange}
              /> */}
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={seteditorState}
          />
        </div>
        {/* <div>
                <textarea disabled name="" id="" cols="30" rows="10" value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea>
            </div> */}
        <div>
          {/* {draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
        </div>
        {/* <div dangerouslySetInnerHTML={{__html:convertToHTML(editorState.getCurrentContent())}}> </div> */}
        {/* <div dangerouslySetInnerHTML={{__html:html}}> </div> */}
        {/* <pre  >{stateToHTML(editorState.getCurrentContent())}</pre> */}

        {/* <div dangerouslySetInnerHTML={{__html :editorState.getCurrentContent()}}> </div> */}

        {/* <textarea value={clean} ></textarea> */}

        {/* <Editor        placeholder="The message goes here..." readOnly /> */}

        <div dangerouslySetInnerHTML={createMarkup()} />

        <div id="productImageARea">
          {/* <img src={productPreview} alt="product Preview" /> */}
          {/* <label htmlFor="avatar"  className="ipan">choose pic</label> */}
          <input
            ref={desti}
            className="fileInput_forProduct"
            type="file"
            name="productPic"
            accept="images/*"
            multiple
            onChange={registerproductChange}
            // style={{display: "block"}}
          />
          <span
            ref={chooser}
            name="kk"
            className="prodductFileChooserSpan"
            onClick={activateFileinput}
            // style={{display: "block"}}
          >
            {" "}
            Choose  files {"file should be less than 1MB each "}
          </span>
      
          </div>
          <div className="divAboveproductSubmitImageDisplayer">
              {
              images.length > 0 ?
              <div className="productSubmitImageDisplayer">
                  {
                    images.map((image, idx) => {
                      return <div key={idx}> <img src={image} alt="product images prior upload" /> </div>
                    })
                  }
                </div> : <div> No photos selected yet .. </div>
            }
        </div>
     
        <input
          type="submit"
          value="Register"
          className="productCreateButton"
          // disabled={loading?true:false}
        />
      </form>


      
      </div>
    </Fragment>
  );
};

export default Createproduct;
