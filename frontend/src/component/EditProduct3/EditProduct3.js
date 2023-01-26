import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Loader from "../Loader/Loader";
import "./EditProduct3.css";
import React, { Fragment, Suspense, useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange, blue } from "@mui/material/colors";
import {
  Formik,
  Form,
  useFormikContext,
  useField,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import parse from "date-fns/parse";
import MuitextInputEditProduct from "./MuitextInputEditProduct";
import FormilMuiSelectTwo from "../FormikMUITwo/FormilMuiSelectTwo";
import MuiDatePickerEdit from "./MuiDatePickerEdit";
import Resizer from "react-image-file-resizer";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiFileUploaderButton from "./MuiFileUploaderButton";
import { Buffer } from "buffer";
import yearsToMonths from "date-fns/fp/yearsToMonths/index.js";
// import ReactImageMagnify from 'react-image-magnify';
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsDetailsAction,
  clearErrors,
  editProductionAction,
} from "../../actions/productActions";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
//////editore
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import ModalForEditPRoduct from "./ModalForEditPRoduct";
import TextError from "../TextError";

////

const today = new Date();
today.setHours(0, 0, 0, 0);

window.Buffer = window.Buffer || require("buffer").Buffer;

function Item({ item }) {
  return (
    <Paper>
      <img src={item} alt="image" />
      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

const theme1 = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const categoryOptions = ["judo", "camera", "laptob", "dress", "webcam"];
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const intialFOrmvalues = {
  name: "sample product name",
  description: "sample product despcription",
  price: 3,
  images: null,
  category: 0,
  stock: 5,
  // numOfReviews:"number of reviews",
  createdAt: new Date(
    "Thu Oct 15 1992 03:00:00 GMT+0300 (Arabian Standard Time)"
  ),
  // ratings:"sample rating"
};

const validatorsss = (values) => {
  let errors = {};
  if (values.images === null) {
    errors.images = "images cannot be null";
  }
  // if (values.images === "") {
  //   errors.images = "images cannot be none";
  // }

  // if (values.images && values.images.length <2) {
  //   errors.images = "please select at least one iamges to post for products";
  // }

  return errors;
};

const EditProduct3 = () => {
  const [currentPage, setCurrentPage] = useState("");
  const updatePage = (title) => {
    setCurrentPage(title);
    //  console.log({currentPage});
    //  console.log({title});
  };

  ///formik for image validation

  // const formikProps  = useFormikContext()
  //  console.log({formikProps})

  const [file, setFile] = React.useState();
  const uploadRef = React.useRef();
  const statusRef = React.useRef();
  const loadTotalRef = React.useRef();
  const progressRef = React.useRef(null);
  const mouseRef = React.useRef(null);
  const outletREf = React.useRef(null);
  const resultREf = React.useRef(null);
  const modalREf = React.useRef(null);
  const modalforExisting = React.useRef(null);
  const formikRef = useRef();

  //////////////////////////////////////// for editoro
  const [defaultValueState, setdefaultValueState] = useState();
  const [descriptionError, setDescriptionError] = useState(false);
  const descriptionRef = useRef(null);

  const [editorState, seteditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
  const onEditorStateChange = (editorState) => {
    seteditorState(editorState);
  };

  // console.log({editorState});

  // console.log(  "draftedtoHTMl", draftToHtml(convertToRaw(editorState.getCurrentContent())))
  function createMarkup() {
    return {
      __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    };
    // return {__html: "<p>this is th munns <strong>sajeer</strong></p>"};
  }
  ////////////////////////////////////

  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // console.log({productLoading,product,productError});

  // let savedValuesForForm =    {
  //   name: product &&  product?.name ,
  //   description: product&& product?.description,
  //   price: product&& product?.price,
  //   images: product&&   product?.images,
  //   category:product&& product?.category && categoryOptions.indexOf(product.category.split(",")[0] || 0) ,
  //   stock:product&& product?.stock ,
  //   // numOfReviews:"number of reviews",
  //   createdAt:product&& product?.createdAt,
  //   // ratings:"sample rating"
  // };

  const [fileList, setFileList] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [Modalopen, setModalopen] = React.useState(false);
  const [ModleURL, setModleURL] = useState("");

  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  // const [bgImageExpander, setBgImageExpander] = useState({ "background-image": "" })
  const [offsetPostion, setOffsetPostion] = useState({
    offsetX: 0,
    offsetY: 0,
  });
  const [perctageCalc, setPerctageCalc] = useState({
    percentageX: 0,
    percentageY: 0,
  });
  const [imagebase64UrlforEnlargeImage, setimagebase64UrlforEnlargeImage] =
    useState("");

  const [existingImageModalOpen, setexistingImageModalOpen] = useState(false);
  const [
    exitingimageforModaltobesendInprops,
    setexitingimageforModaltobesendInprops,
  ] = useState("");
  const [imageIndexforModalexisting, setimageIndexforModalexisting] =
    useState(0);
  const [arrayofExitingimages, setarrayofExitingimages] = useState([]);
  const [fileListFromInputFileState, setfileListFromInputFileState] =
    useState(null);

  const [imageforpervieweraftersizecheck, setimageforpervieweraftersizecheck] =
    useState(null);

  // const savedDatafromDataBase = {

  //     name: product &&  product?.name ,
  //     description: product&& product?.description,
  //     price: product&& product?.price,
  //     images: product&&   product?.images,
  //     category:product&& product?.category && categoryOptions.indexOf(product.category.split(",")[0] || 0) ,
  //     stock:product&& product?.stock ,
  //     // numOfReviews:"number of reviews",
  //     createdAt:product&& product?.createdAt,
  //     // ratings:"sample rating"
  // }
  // // console.log({savedDatafromDataBase})

  const validationSchemaForFOrm = Yup.object().shape({
    name: Yup.string()
      .required("please enter a product name")
      .min(2, "name too short"),
    description: Yup.string(),
    price: Yup.number()
      .integer()
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value > 0
      )
      .required("please enter a product price")
      .min(1),

    // images :Yup.array().of(
    //       Yup.object({
    //         public_id: Yup.string().required(),
    //       url: Yup.string().required(),

    //     })
    //   ).default(() => [{ public_id: 'sampole public_id', url: 'sample_url' }])
    // ,
    category: Yup.string().required("please enter a product category"),
    stock: Yup.number()
      .integer()
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value > 0
      )
      .required("please enter a product price")
      .min(1),
    // numOfReviews:"number of reviews",
    createdAt: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
      })
      .typeError("please enter a valid date")
      .required()
      .min("30.01.1968", "Date is too early")
      .max(new Date(), "Cannot be a future Date"),
    images: null,
    images2: null,

    // images: Yup.string()
    // .required("please enter a product name")
    // .min(2, "name too short"),

    // ratings:"sample rating"

    ////////////////////////////////////////////////////////////////////////////

    // images: Yup.array()
    //   .of(

    //     Yup.lazy((value) =>
    //     /^data/.test(value)
    //       ? Yup.string().matches(
    //           /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
    //           'Must be a valid data URI',
    //         )
    //       : Yup.string().url('Must be a valid URL')
    //     )

    //     // Yup.mixed().test(
    //     //   "FILE_SIZE",
    //     //   "Uploaded file is too big",
    //     //   (value)=>!value||(value && value.size>=100024*100024)
    //     // )
    //     // .test(
    //     //   "FILE_FORMAT",
    //     //   "Uploaded file has unsupported format",
    //     //   (value)=>!value||(value && SUPPORTED_FORMATS.includes(value?.type))
    //     // )
    //   )
    //   .nullable(),

    ////////////////////////////////////////////////

    // images:Yup.array()
    //   .of(
    //     Yup.object().shape(
    //       // Yup.string().required("must be a type of string of base64 URL")
    //                       Yup.lazy((value) =>
    //                       /^data/.test(value)
    //                         ? Yup.string()
    //                             .trim()
    //                             .matches(
    //                               /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*)$/i,
    //                               'Must be a valid data URI',
    //                             )
    //                             .required()
    //                         : Yup.string()
    //                         .trim()

    //                         .url('Must be a valid URL').required(),
    //                     ),
    //    )
    //   )
    //     .nullable(),
    //

    images: Yup.array().of(
      // Yup.string().required("must be a type of string of base64 URL")
      Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",

          // value => value && value.size >= 1024 * 1024  // the is FILE_SIZE
          checkforSIzeOfFiels
        )
        .test(
          "is-big-file",
          "VALIDATION_FIELD_FILE_WRONG_TYPE",
          checkIfFilesAreCorrectType
        )
    ),

    // images:Yup.array(

    // ).of(
    //   Yup.object().shape(
    //     Yup.string().required("must be a type of string of base64 URL")

    //   )
    // ).nullable()
  });

  function checkforSIzeOfFiels(file) {
    let valid = true;
    // console.log("fieks----", file);
    // if (files) {
    // files.map(file => {
    // console.log("size of the file checkforSIzeOfFiels ", file.size)
    const size = file.size / 1024 / 1024;
    if (size > 1) {
      valid = false;
    }
    // })
    // }
    return valid;
  }
  function checkIfFilesAreCorrectType(file) {
    let valid = true;
    // if (files) {
    // files.map(file => {
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      valid = false;
    }
    // })
    // }
    return valid;
  }

  const onSubmitter = (values, onSubmitProps) => {
    console.log("value in FormikMaterilUIFormPractice==", values);
    // console.log("onSubmitProps in the on su bmit ", onSubmitProps);

    // setTimeout(() => {
    onSubmitProps.setSubmitting(false);

    // }, 3000);
    // console.log("formikerd.curent.issubmitug",formikRef.current.isSubmitting);
    // onSubmitProps.setSubmitting(true); // for set submitting to false
    // onSubmitProps.resetForm();

    const myForm = new FormData();

    myForm.append("name", values.name);
    myForm.append("price", values.price);
    myForm.append("createdAt", values.createdAt);
    myForm.append("category", values.category);
    myForm.append("stock", values.stock);
    myForm.append("description", values.description);

    // myForm.append("images", product.images);
    myForm.append("images", JSON.stringify(product.images));

    values.imagesNew = [...values.images2];

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

        myForm.append("newImages", values.imagesNew[index]);
      }
    }

    dispatch(editProductionAction(id, myForm));
    console.log("edit form with new images is submitted");

    navigate(`/edit/product3/${id}`);

    // console.log({ imageArray });
    // console.log("values form FormikMuiMainFIleTwo == ", values);
    // if (imageArray && imageArray.length > 0) {
    //   values.images = [...imageArray];
    // }

    // const {setFieldValue} = useFormikContext()

    // formikProps.setFieldValue("images", [...imageArray])
  };

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

  const resizeFile = async (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        900,
        900,
        "JPEG",
        50,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  let masterFileArray = [];

  const fileUploadButtonCLciker = () => {
    if (uploadRef.current) {
      uploadRef.current.click();

      // console.log("xxxxxxxxxxxxxxxxxx clciked xxxxxxxxxxxxxxxxxxxxxxxxx");
    }
  };

  const UploadFile2 = async () => {
    console.log("UPLOAD FILE2 FUNCTIN IS CLICKED");

    // console.log("uploadRef.current==",uploadRef.current)

    if (uploadRef.current) {
      // uploadRef.current.click()
      console.log(
        "UPLOAD FILE2  uploadRef.current.click() CALLED FUNCTIN IS CLICKED"
      );
      const files = uploadRef.current.files;
      console.log({ fileListFromInputFileState });
      // const files = await fileListFromInputFileState
      console.log(
        "file UploadFile2 UploadFile2 UploadFile2UploadFile2UploadFile2",
        files
      );
      setFileList(files);

      // console.log("file in handlehnage", files);

      //   // console.log(" e.target.file in handlehnage" , e.originFileObj)
      //   // console.log("file.originFileObj  in handlehnage" , file)
      //   // console.log("file.originFileObj  in file.fileList.length" , file.fileList.length)

      //   // masterFileArray.length =0
      for (let index = 0; index < files.length; index++) {
        // const fileAsDATAURl = await getBase64(file.fileList[index].originFileObj);
        const fileAsDATAURl = await resizeFile(files.item(index));

        masterFileArray.push(fileAsDATAURl);
      }
    } // end of if to checkl ref.current check
    const imaageEditedSet = new Set(masterFileArray);

    masterFileArray = Array.from(imaageEditedSet);
    setImageArray(masterFileArray);
    console.log("masterFileArray first---", masterFileArray);
    console.log("imageArray state isise athe --", imageArray);
  };

  const existingImageResizer = (singleImage, index) => {
    // console.log("clicked exiting image resizer")

    setexistingImageModalOpen(true);
    setexitingimageforModaltobesendInprops(singleImage);

    setimageIndexforModalexisting(index);
    console.log({ imageIndexforModalexisting });
    console.log({ existingImageModalOpen });
    // modalforExisting.current.style.display ="block"
    setarrayofExitingimages(product.images);

    // modalactivated.style.display = "block"
  };

  const UploadFile = () => {
    console.log("clikced");
    const file = uploadRef.current.files[0];
    console.log({ file });
    setFile(URL.createObjectURL(file));
    var formData = new FormData();
    formData.append("image", file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", ProgressHandler, false);
    xhr.addEventListener("load", SuccessHandler, false);
    xhr.addEventListener("error", ErrorHandler, false);
    xhr.addEventListener("abort", AbortHandler, false);
    xhr.open("POST", "fileupload.php");
    xhr.send(formData);
  };
  const ProgressHandler = (e) => {
    loadTotalRef.current.innerHTML = `uploaded ${e.loaded} bytes of ${e.total}`;
    var percent = (e.loaded / e.total) * 100;
    progressRef.current.value = Math.round(percent);
    statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";
  };

  const SuccessHandler = (e) => {
    statusRef.current.innerHTML = e.target.responseText;
    progressRef.current.value = 0;
  };
  const ErrorHandler = () => {
    statusRef.current.innerHTML = "upload failed!!";
  };
  const AbortHandler = () => {
    statusRef.current.innerHTML = "upload aborted!!";
  };

  const ModalopenerSTyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const zoomer = (imagData) => {
    // console.log("inisde zooer");
    setModleURL(imagData);
    setimagebase64UrlforEnlargeImage(imagData); // for stopping the lag

    setModalopen(true);
  };
  const delteSingleImage = (ImageUrltoDelete, formik) => {
    setModalopen(false);
    const imageArrayCopy = [...imageArray];
    let filteredArry = imageArrayCopy.filter(
      (singleImageinArray) => singleImageinArray !== ImageUrltoDelete
    );
    setImageArray(filteredArry);
    formik.setFieldValue(
      "images2",
      formik.values.images2.filter(
        (singleimgaeer) => singleimgaeer !== ImageUrltoDelete
      )
    );
    // console.log({formik})
    // formik.values.images = formik.values.images.filter(
    //   (singleImageinArray) => singleImageinArray !== ImageUrltoDelete
    // );
    // console.log("eleltle", formik.values.images);
    // valuesformformik.images = [...imageArray]
  };

  const handleClose = () => setModalopen(false);

  const mouseMOver = (e) => {
    //  console.log(e);
    // console.log(outletREf.current)
    // console.log("offsetWidth fo elemt",mouseRef.current.offsetWidth)
    // console.log("offsetHeight of elemet as"+mouseRef.current.offsetHeight)

    // console.log("offesetleft fo elemt",mouseRef.current.offsetLeft)
    // console.log("offsetTop of elemet as"+mouseRef.current.offsetTop)

    // console.log("getBoundingClientRect top of elemet as"+mouseRef.current.getBoundingClientRect().top)
    // console.log("getBoundingClientRect left of elemet as"+mouseRef.current.getBoundingClientRect().left)

    let leftPercentage =
      ((e.clientX - +mouseRef.current.getBoundingClientRect().left) * 100) /
      mouseRef.current.offsetWidth;
    let topPercentage =
      ((e.clientY - +mouseRef.current.getBoundingClientRect().top) * 100) /
      mouseRef.current.offsetHeight;

    setPerctageCalc({
      percentageX: leftPercentage,
      percentageY: topPercentage,
    });

    // console.log({perctageCalc});

    // console.log("offesetleft ofr the modal" , modalREf.current.offsetLeft );
    // console.log("offsetTop ofr the modal" , modalREf.current.offsetTop );

    //  const x =e.clientX

    //  const y =e.clientY

    const { offsetX, offsetY } = e.nativeEvent;
    setOffsetPostion({ offsetX: offsetX, offsetY: offsetY });

    //  console.log({x,y})
    //  console.log({offsetX,offsetY})

    //  outletREf.current.style.left =x+  (windowInnerWidth/2)+    "px"
    //  outletREf.current.style.top =-60+y+ (windowInnerHeight/2)+ "px"

    outletREf.current.style.left = offsetPostion.offsetX + "px";
    outletREf.current.style.top = offsetPostion.offsetY + "px";
  };

  const onMOuseLeaver = (e) => {};

  const mouseOverForEnlargeImage = (imageURlbase64, e) => {
    // let imageURlbase64 = e.target.getAttribute("data-imageenglargeattribure")
    // let imageURlbase64 = JSON.parse(e.target.dataset.imageenglargeattribure)
    // let imageURlbase64 = e.target.dataset.imageenglargeattribure
    // let imageURlbase64 = e.target.dataset.imageenglargeattribure

    //  e.preventDefault()

    // console.log("this in mouseOverForEnlargeImage", this);
    // console.log("value in mouseOverForEnlargeImage", e.target.getAttribute("value"));

    // console.log({imageURlbase64});
    // // setimagebase64UrlforEnlargeImage(imageURlbase64)
    // console.log({imagebase64UrlforEnlargeImage})
    // console.log(e);

    resultREf.current.style.left = 20 + "px";
    resultREf.current.style.top = 20 + "px";
    // console.log({resultREf})
    // resultREf.current.classlist.remove("ezpanderResultDIV ");--effect-color

    resultREf.current.classList.add("ezpanderResultDIVSHown");
    resultREf.current.style.setProperty("--effect-color", "red");
    //  document.documentElement.style.setProperty("--effect-color","red" )

    resultREf.current.style.setProperty(
      "--effect-image",
      `url(${imagebase64UrlforEnlargeImage})`
    );
    //  document.documentElement.style.setProperty("--effect-image",imageURlbase64 )

    // resultREf.current.style.display ="block"

    // resultREf.current.style.setProperty("--expandImage-pos",`${offsetPostion.offsetX}% ${offsetPostion.offsetY}` )
    resultREf.current.style.setProperty(
      "--expandImage-pos",
      `${perctageCalc.percentageX}% ${perctageCalc.percentageY}%`
    );

    // resultREf.current.style.left =offsetPostion.offsetX+  "px"
    // resultREf.current.style.top =offsetPostion.offsetY +"px"
  };

  const mouseLEaveENlargeImage = (e) => {
    resultREf.current.classList.remove("ezpanderResultDIVSHown");
    // setimagebase64UrlforEnlargeImage("")
  };

  let base64URlforImage = [];
  useEffect(() => {
    let promiseArray = [];
    const previewOfImageIfUploaded = async () => {
      // console.log({formikRef})

      if (formikRef.current.values.images) {
        formikRef.current.values.images.map(async (singleImage, index) => {
          promiseArray.push(
            new Promise((resolve, reject) => {
              let reader = new FileReader();
              try {
                reader.onload = async () => {
                  if (reader.readyState === 2) {
                    //  console.log("reader.result==",reader.result);
                    await resolve(reader.result);
                  }
                };
              } catch (error) {
                reject(error);
              }

              reader.onerror = (error) => {
                reject(error);
              };
              //  console.log({singleImage});
              reader.readAsDataURL(singleImage);
            })
          );
        });

        await Promise.all(promiseArray).then((valuesFormPromiseArray) => {
          // console.log({valuesFormPromiseArray})
          base64URlforImage = [...valuesFormPromiseArray];
          // console.log({base64URlforImage});

          setImageArray([...base64URlforImage]);
          formikRef.current.setFieldValue("images2", [...base64URlforImage]);
          // formikRef.current.values.images = [...base64URlforImage]
        });
      }
    };

    previewOfImageIfUploaded();

    return () => {};
  }, [imageforpervieweraftersizecheck]);

  useEffect(() => {
    if (productError) {
      alert.error(productError);
      dispatch(clearErrors());
    }

    dispatch(getProductsDetailsAction(id));

    if (editProductError) {
      alert.error(productError);
      dispatch(clearErrors());
    }

    // console.log('first useeffect useEffect');

    return () => {
      setImageArray("");
      //   setsaveValuesofFormState({
      //     name: product &&  product?.name ,
      //     description: product&& product?.description,
      //     price: product&& product?.price,
      //     images: product&&   product?.images,
      //     category:product&& product?.category && categoryOptions.indexOf(product.category.split(",")[0] || 0) ,
      //     stock:product&& product?.stock ,
      //     // numOfReviews:"number of reviews",
      //     createdAt:product&& product?.createdAt,
      //     // ratings:"sample rating"
      //   })
      // console.log({saveValuesofFormState})
      // console.log('I run after re-render, but before the next useEffect');
    };
  }, [
    id,
    navigate,
    // editloading,
    editedproduct,
    // editProductError,
    editProductSuccess,
  ]);

  useEffect(() => {
    if (product) {
      product.description &&
        seteditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(`${product.description}`)
            )
          )
        );
    }
    // console.log('second useeffect useEffect');

    // if (formikRef.current) {
    //   formikRef.current.setFieldValue(
    //     "images",
    //      [...imageArray]
    //   );

    // }

    // console.log({imageArray});
    return () => {};
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {editloading || productLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <ThemeProvider theme={theme1}>
            <Grid container className="masterGRIdFOrEdotPRoduct3">
              <Grid item xs={12}>
                <Typography align="center" variant="h4">
                  {" "}
                  EDIT PRODUCT YUP FORMIK FORM{" "}
                </Typography>
              </Grid>
              <Container maxWidth="md">
                <Formik
                  // initialValues={saveValuesofFormState ?saveValuesofFormState:intialFOrmvalues }
                  // initialValues={savedDatafromDataBase ?savedDatafromDataBase:intialFOrmvalues }
                  // initialValues={savedDatafromDataBase || intialFOrmvalues }

                  initialValues={{
                    name: (product && product?.name) || "sample name",
                    description:
                      (product && product?.description) || "sample desce",
                    price: (product && product?.price) || 100,
                    // images: product&&   product?.images || null,
                    images: "",
                    images2: "",
                    category:
                      (product &&
                        categoryOptions[
                          categoryOptions.indexOf(product?.category)
                        ]) ||
                      categoryOptions[0],
                    stock: (product && product?.stock) || 5,
                    // numOfReviews:"number of reviews",
                    // createdAt:product&& product?.createdAt || new Date(
                    //   "Thu Oct 15 1992 03:00:00 GMT+0300 (Arabian Standard Time)"
                    // ),
                    createdAt:
                      (product && product?.createdAt) ||
                      new Date(
                        "Thu Oct 15 1992 03:00:00 GMT+0300 (Arabian Standard Time)" // for testing purpose only
                      ),
                    // ratings:"sample rating"
                  }}
                  validationSchema={validationSchemaForFOrm}
                  onSubmit={onSubmitter}
                  validate={validatorsss}
                  enableReinitialize={true}
                  innerRef={formikRef}
                >
                  {(formik) => {
                    console.log({ formik });
                    return (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography> Product details</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <MuitextInputEditProduct
                              name="name"
                              label="PRODUCT NAME"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <MuitextInputEditProduct
                              name="price"
                              label="PRODUCT PRICE"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormilMuiSelectTwo
                              name="category"
                              label="PRODUCT CATEGORY"
                              selectOptions={categoryOptions}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <MuitextInputEditProduct
                              name="stock"
                              label="PRODUCT STOCK"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <div
                              id="descriptionBoxInEditProduct"
                              ref={descriptionRef}
                              className={
                                descriptionError ? "descriptionBoxAddREd" : null
                              }
                            >
                              <Editor
                                onChange={(e) => {
                                  desctiptionChangeHandler(e);
                                  formik.setFieldValue(
                                    "description",
                                    draftToHtml(
                                      convertToRaw(
                                        editorState.getCurrentContent()
                                      )
                                    )
                                  );
                                }}
                                editorState={
                                  editorState ? editorState : defaultValueState
                                }
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassNameInEdit3"
                                onEditorStateChange={onEditorStateChange}
                              />
                            </div>
                          </Grid>
                          <Grid item xs={12} gap={10}>
                            {/* <MuitextInputEditProduct
                    name="description"
                    label="PRODUCT description"
                    multiline={true}
                    rows={5}
                    disabled={true}
                    // value={ draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                    // dangerouslySetInnerHTML={{__html:draftToHtml(convertToRaw(editorState.getCurrentContent()))}}
                  
                     

                  /> */}
                            <div
                              dangerouslySetInnerHTML={createMarkup()}
                              className="editorClassNameInEdit3"
                            ></div>
                          </Grid>
                          <Grid item xs={6} mb={5} p={5}>
                            <MuiDatePickerEdit
                              name="createdAt"
                              label="PRODUCT CREATEDAT"
                              givenValue={product && product?.createdAt}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <div className="edit-product-3-images-from-database">
                              {product?.images &&
                                product?.images.map((oneImage, index) => (
                                  <img
                                    className="edit-product-3-exitsint-imageslider"
                                    src={oneImage.url}
                                    alt={oneImage.public_id}
                                    key={index}
                                    onClick={() =>
                                      existingImageResizer(oneImage, index)
                                    }
                                  />
                                ))}
                              {/* {product && product?.images.map((oneImage,index)=>(
                       
                         <img  className="edit-product-3-exitsint-imageslider"  src={oneImage.url} alt={oneImage.public_id} key={oneImage.public_id}/>
                      
                    ))} */}
                            </div>
                          </Grid>

                          {existingImageModalOpen && (
                            <ModalForEditPRoduct
                              img={exitingimageforModaltobesendInprops}
                              open={setexistingImageModalOpen}
                              updatePage={updatePage}
                              imageIndexforModalexisting={
                                imageIndexforModalexisting
                              }
                              arrayofExitingimages={arrayofExitingimages}
                              removeImage={removeImage}
                            />
                          )}

                          {/* <Grid item xs={12}>
                  <label htmlFor="images2">images2</label>
                  <input
                    id="images2"
                    value={formik.values.images2}
                    onChange={(e) =>
                      formik.setFieldValue("images2", e.target.value)
                    }
                  />
                </Grid> */}

                          <Grid item xs={12}>
                            <Button
                              variant="contained"
                              component="label"
                              // onClick={(e)=>{UploadFile2()}}
                              onClick={fileUploadButtonCLciker}

                              // onClick={event=>formik.setFieldValue("images",[1,2,3,4,5] )}
                            >
                              Upload New Images
                            </Button>
                            {/* <Field name="images"> */}
                            {/* <Field > */}

                            <input
                              hidden
                              accept="image/*"
                              multiple
                              ref={uploadRef}
                              type="file"
                              name="images"
                              // value= {undefined}
                              // onChange={async(e)=>{

                              //   console.log("e.taraget,filessss----------",e.target.files)
                              //   let masterArray2=[]
                              //   let PromiseArryforFiedl=[]
                              //   // for (let index = 0; index <e.target. files.length; index++) {
                              //   //   const fileAsDATAURl =  await resizeFile(e.target.files.item(index));;
                              //   //   masterArray2.push(fileAsDATAURl)
                              //   // }

                              //   for (let index = 0; index <e.target. files.length; index++) {
                              //     // const fileAsDATAURl = await getBase64(file.fileList[index].originFileObj);

                              //       console.log("index insie forloop---",index)
                              //        PromiseArryforFiedl.push(new Promise(async(resolve,reject)=>{
                              //         const fileAsDATAURl = await resizeFile(e.target.files.item(index));
                              //         resolve( fileAsDATAURl )
                              //           reject(new Error ('something is not right'))
                              //       }))

                              //   }
                              //   console.log({PromiseArryforFiedl});
                              //   await   Promise.all(PromiseArryforFiedl).then((values)=>{
                              //   console.log({values})
                              //      for (let index = 0; index < values.length; index++) {

                              //      masterArray2.push(values[index]);

                              //       }

                              //  console.log({masterArray2});

                              //   }
                              //   )
                              //   console.log("outsiode fo forloop")
                              //   console.log({masterArray2});
                              // //  await formik.setFieldValue("images",[...masterArray2])
                              //  await formik.setFieldValue("images",[1,2,3,4])

                              //       //  formik.setFieldValue("images",[1,2,3,4,5] )

                              //   }
                              // }

                              // onChange={(e)=>{formik.setFieldValue("images",e.target.files )}}
                              // onChange={event=>formik.setFieldValue("images",[1,2,3,4,5] )}
                              // onChange={event=>{formik.values.images=[...imageArray] }}

                              // onChange={ async e=>{
                              //     console.log("e.target.filed",e.target.files[0] );
                              //     console.log(formik.setFieldValue());
                              //     if(e.target.files){
                              //       await    formik.setFieldValue("images",e.target.files[0])
                              //       await    formik.setFieldValue("name","name is munnanannannananana")
                              //     }

                              //   //  formik.setValues("images", imageArray)
                              // console.log("chhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfffffffffffffffffffffffffffffffffffffffffffffffffhhhh done")

                              //       // formik.setFieldTouched("images", true)
                              // // await    formik.setFieldValue("images2", "image value is set now usin setFieldValue")
                              // // await Promise.resolve()
                              // // formik.submitForm();

                              //   }}

                              onChange={async (e) => {
                                //   console.log("event in click eventof the input hiddent ooooooooooo",e);
                                //      let reader = new FileReader()
                                //      reader.onload =()=>{

                                //       if(reader.readyState === 2){
                                //        console.log("chhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfffffffffffffffffffffffffffffffffffffffffffffffffhhhh done")

                                //         formik.setFieldValue("images",reader.result)
                                //       }
                                //      }
                                //      reader.readAsDataURL(e.target.files[0])

                                // console.log(
                                //   "e.targert.files in input type file element ---------------------",
                                //   e.target.files
                                // );
                                // await UploadFile2();
                                // await setfileListFromInputFileState(
                                //   e.target.files
                                // );

                                // // console.log("imageArray inside the hidden compnonenet in the input  " , imageArray)
                                // // formik.setFieldValue("images",[...imageArray])
                                // formik.setFieldValue("images", [
                                //   ...masterFileArray,
                                // ]);
                                let arrOFRqwIamgeFiles = [...e.target.files];

                                await formik.setFieldValue(
                                  "images",
                                  arrOFRqwIamgeFiles
                                );
                                setimageforpervieweraftersizecheck(
                                  arrOFRqwIamgeFiles
                                );

                                //  await setImageArray(arrOFRqwIamgeFiles)
                              }}
                            />

                            {/* </Field>  */}
                            {/* <MuiFileUploaderButton name="images" ref={uploadRef}/> */}

                            {formik.errors.images && formik.touched.images ? (
                              <div>
                                {formik.errors.images.map(
                                  (sinlgeError, index) => {
                                    return (
                                      <p>
                                        ITEM NO:{index + 1} -HAS ERROR---
                                        {sinlgeError}
                                      </p>
                                    );
                                  }
                                )}{" "}
                              </div>
                            ) : null}
                            <ErrorMessage name="images" component={TextError} />
                          </Grid>

                          {/* <Grid item xs={12}> */}

                          {/* <Box>                                             */}
                          <div
                            // style={{position: 'absolute'}}
                            className="ezpanderResultDIV"
                            ref={resultREf}
                          />
                          {/* </Box> */}

                          {/* </Grid> */}

                          <Grid item xs={12}>
                            <p ref={statusRef}></p>
                            <p ref={loadTotalRef}></p>
                            <img src={file} alt="" style={{ width: "300px" }} />
                          </Grid>

                          <Grid item xs={12}>
                            {imageArray?.length === 0 ? (
                              <Typography variant="h4" textAlign="center">
                                NO new images selected
                              </Typography>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  // flexWrap: 'wrap',
                                  // backgroundColor:'red',
                                  overflowX: "scroll",
                                  // '& > :not(style)': {
                                  //   m: 1,
                                  //   width: 128,
                                  //   height: 128,
                                  // },
                                }}
                              >
                                {imageArray?.length > 0 &&
                                  imageArray.map((singleImage, index) => (
                                    <Box key={index}>
                                      <Stack direction="column">
                                        <Paper
                                          className="paperImageer"
                                          onClick={() => zoomer(singleImage)}
                                        >
                                          <img
                                            src={singleImage}
                                            width="100px"
                                          />
                                        </Paper>

                                        <Typography
                                          textAlign="center"
                                          variant="p"
                                        >
                                          {" "}
                                          {(
                                            Buffer.from(
                                              singleImage.substring(
                                                singleImage.indexOf(",") + 1
                                              )
                                            ).length / 1e6
                                          ).toFixed(3) + "MB"}
                                        </Typography>
                                        <Button
                                          variant="outlined"
                                          startIcon={<DeleteIcon />}
                                          onClick={() => {
                                            delteSingleImage(
                                              singleImage,
                                              formik
                                            );
                                            // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                                            // formik.setFieldValue("images", formik.values.images.filter(singleimgaeer=>singleimgaeer!==singleImage))
                                          }}
                                        >
                                          Delete
                                        </Button>
                                      </Stack>
                                      <Modal
                                        ref={modalREf}
                                        open={Modalopen}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                      >
                                        <Box sx={ModalopenerSTyle}>
                                          <Stack
                                            direction="column"
                                            position="relative"
                                          >
                                            <img
                                              src={ModleURL}
                                              width="300px"
                                              key={index}
                                              style={{ marginInline: "auto" }}
                                              onMouseMove={(e) => mouseMOver(e)}
                                              onMouseLeave={(e) =>
                                                onMOuseLeaver(e)
                                              }
                                              className="ZoomerTRYOnImage"
                                              ref={mouseRef}
                                            />

                                            <div
                                              style={{
                                                position: "absolute",
                                                ...cursorPosition,
                                              }}
                                              className="expanderDIvFOrImageINEditRPoduct3"
                                              ref={outletREf}
                                              data-imageenglargeattribure={
                                                singleImage
                                              }
                                              onMouseOver={(e) =>
                                                mouseOverForEnlargeImage(
                                                  ModleURL,
                                                  e
                                                )
                                              }
                                              // onMouseOver={this.mouseOverForEnlargeImage(this.singleImage) }
                                              // onMouseOver={(e)=>mouseOverForEnlargeImage(singleImage)(e) }

                                              //  value={singleImage}

                                              // onMouseOver={this.mouseOverForEnlargeImage.bind(this,singleImage) }

                                              onMouseLeave={(e) =>
                                                mouseLEaveENlargeImage(e)
                                              }
                                            />

                                            <Button
                                              sx={{
                                                marginInline: "auto",
                                                marginTop: "5px",
                                              }}
                                              variant="outlined"
                                              startIcon={<DeleteIcon />}
                                              onClick={() => {
                                                delteSingleImage(
                                                  ModleURL,
                                                  formik
                                                );
                                                // console.log({imageArray})
                                                // masterFileArray
                                                //   console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                                                // formik.setFieldValue("images", formik.values.images.filter(singleimgaeer=>singleimgaeer!==ModleURL))
                                              }}
                                            >
                                              Delete
                                            </Button>
                                          </Stack>
                                        </Box>
                                      </Modal>
                                    </Box>
                                  ))}
                              </Box>
                            )}
                          </Grid>

                          <Button
                            sx={{ mt: 2, mb: 2 }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            //  disabled={!formik.isValid && !formik.isSubmitting}
                            //  disabled={!formik.isValid }

                            disabled={formik.isSubmitting}
                          >
                            Submittr
                          </Button>
                          <Button
                            sx={{ mt: 2, mb: 2 }}
                            variant="contained"
                            color="secondary"
                            fullWidth
                            type="reset"
                            onClick={() => formik.resetForm()}
                          >
                            RESET FORM
                          </Button>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </Container>

              {/* 
    <Grid item xs={12}>
    <Carousel>
    {
    
    imageArray?.length>0 && imageArray.map( (oneimage, i) => <Item key={i} item={oneimage} /> )
    }
 </Carousel>

    </Grid> */}
            </Grid>
          </ThemeProvider>
        </Fragment>
      )}
    </Suspense>
  );
};

export default EditProduct3;
