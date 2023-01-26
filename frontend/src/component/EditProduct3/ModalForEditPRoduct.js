import "./ModalForEditPRoduct.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import React, { useEffect, useRef, useState } from "react";

const ModalForEditPRoduct = ({
  img,
  open,
  updatePage,
  imageIndexforModalexisting,
  arrayofExitingimages,
  removeImage,
}) => {
  // console.log({img})
  const modelRef = useRef(null);

  const [openrer, setopenrer] = useState(true);
  const [singleImagetoBeShowninModal, setsingleImagetoBeShowninModal] =
    useState(img);
  const [isetter, setisetter] = useState(imageIndexforModalexisting);

  // console.log({img});
  // console.log({singleImagetoBeShowninModal})
  // console.log({imageIndexforModalexisting})
  // console.log(arrayofExitingimages)

  const imageModalClicker = () => {
    console.log("clikeddffd");
    open(false);

    let title = "current page index";
    updatePage(title);
  };

  const leftClickonModalButton = (e) => {
    e.preventDefault();

    e.stopPropagation();

    open(true);
    // console.log(open);
    // console.log("left buttoon in modal cliked");
    // let i = imageIndexforModalexisting

    // console.log("isetter in left button clicked" , isetter)
    // console.log({arrayofExitingimages})

    if (isetter === 0) return;
    setisetter((prev) => prev - 1);

    // setsingleImagetoBeShowninModal(arrayofExitingimages[isetter])
  };
  const rightClickonModalButton = (e) => {
    e.preventDefault();

    e.stopPropagation();

    open(true);
    // console.log(open);
    // console.log("right buttoon in modal cliked");
    // // let i =  imageIndexforModalexisting
    // console.log("isetter in right button clicked" , isetter)
    // console.log({arrayofExitingimages})

    if (isetter === arrayofExitingimages.length - 1) return;
    setisetter((prev) => prev + 1);
    // setsingleImagetoBeShowninModal(arrayofExitingimages[isetter])
  };

  const DeletPictureinMOdal = (e, puclicIDForDeleteting) => {
    e.preventDefault();
    e.stopPropagation();
    open(true);
    console.log({ puclicIDForDeleteting });
    removeImage(puclicIDForDeleteting);
    open(false);

    // window.location.reload()
  };
  const DownloadPictureFUnction = async (e, puclicIDforDownloading) => {
    e.preventDefault();
    e.stopPropagation();
    open(true);

    //  fetch(puclicIDforDownloading.url).then( res => res.blob()).then(blob=>{
    //   const blobUrl = window.URL.createObjectURL(new Blob( [blob]))
    //   const fileName = puclicIDforDownloading.url.split("/").pop()
    //   const element = document.createElement("a");
    // element.href =blobUrl
    // element.setAttribute("download",fileName )
    // document.body.appendChild(element);
    // element.click();
    // element.remove();
    //  }
    //   )

    const res = await fetch(puclicIDforDownloading.url);
    const bolb2 = await res.blob();
    // console.log({bolb2});
    const finalBLob = await window.URL.createObjectURL(new Blob([bolb2]));
    const fileName = puclicIDforDownloading.url.split("/").pop();
    console.log({fileName})
    const element = document.createElement("a");
    element.href = finalBLob;
    element.setAttribute("download", fileName);
    document.body.appendChild(element);
    element.click();
    element.remove();

    //     const data = document
    // console.log({data})
    ////for all datatypes

    const image = document.documentElement;

    async function takeScreenshot() {
      // var screenshot = document.documentElement
      //   .cloneNode(true);
      // screenshot.style.pointerEvents = 'none';
      // screenshot.style.overflow = 'hidden';
      // screenshot.style.webkitUserSelect = 'none';
      // screenshot.style.mozUserSelect = 'none';
      // screenshot.style.msUserSelect = 'none';
      // screenshot.style.oUserSelect = 'none';
      // screenshot.style.userSelect = 'none';
      // screenshot.dataset.scrollX = window.scrollX;
      // screenshot.dataset.scrollY = window.scrollY;
      var screenshot = modelRef.current;
        // console.log(JSON.stringify(screenshot))
      console.log({screenshot})
      // console.log("outer html",screenshot.outerHTML)
      // console.log("inner html",screenshot.innerHTML)

      screenshot = document.querySelector(".main-modal-div-for-edit-product")
      console.log("after the document.queryselcto",screenshot)

      // var blob = await new Blob([screenshot.outerHTML], {
      //   type: 'text/html'
      //   //  type: 'application/pdf'

      // });

      var blob = await new Blob([screenshot], {
        type: 'text/html'
        // type:"octet-stream"

        //  type: 'application/pdf'
      });
    // var  blob= await new Blob(["munna this is reas" ], {
    //      type: 'text/plain'
    //   })

      return blob;
    }

    async function generate() {
      // window.URL = window.URL || window.webkitURL;
      // window.open(window.URL
      //   .createObjectURL(takeScreenshot()));

      await console.log(
        "screennshotttt====",
        window.URL.createObjectURL(await takeScreenshot())
      );
      // const a = await Object.assign(document.createElement("a"), {
      //   herf: window.URL.createObjectURL(await takeScreenshot()),
      //   style: "display:none",
      //   download: "myDatafile.csv",
      // });

      const b =await document.createElement("a");
      console.log("'a beodre assingin here'", b)
    b.href = await window.URL.createObjectURL(await takeScreenshot());
  //   b.href = await window.URL.createObjectURL( await new Blob(["munna this is reas" ], {
  //     type: 'text/plain'
  //  }));



   
    b.setAttribute("download", 'dddddddd');
    document.body.appendChild(b);
 

        console.log({b})

        
      await b.click();
      await b.remove();
       console.log("allll doen")

      // URL.revokeObjectURL(a.herf);
        



      // const element = document.createElement("a");
      // element.href =await window.URL
      //   .createObjectURL( await takeScreenshot());

      // element.setAttribute("download","minnna" )
      // document.body.appendChild(element);
      // element.click();
      // element.remove();
      // URL.revokeObjectURL(element.herf);
        

    }

    // generate();

    /// will cause to open in the same windonw to downlaod to file use the diffenet tactic
    // const fileName = puclicIDforDownloading.url.split("/").pop()
    // const fileType = puclicIDforDownloading.url.split(".").pop()

    // console.log("puclicIDforDownloading--",puclicIDforDownloading)

    // console.log("filenam om modal", fileName)
    // console.log("fileType om modal", fileType)

    // const element = document.createElement("a");
    // element.href =puclicIDforDownloading.url
    // // element.href = window.URL.createObjectURL(  new Blob([puclicIDforDownloading.url],{
    // //   type: fileType
    // // }));
    // // element.download = "100ideas-" + Date.now() + ".jpg";
    // element.setAttribute("download", puclicIDforDownloading.url )
    // document.body.appendChild(element);
    // element.click();
    // element.remove();
  };

  useEffect(() => {
    setsingleImagetoBeShowninModal(arrayofExitingimages[isetter]);

    return () => {};
  }, [isetter]);

  return (
    <div
      className="main-modal-div-for-edit-product"
      onClick={() => open(false)}
      ref={modelRef}
    >
      <div className="modlal-for-edit-produt-heading-div">
        <h2 className="modal-for-edit-image-heading">
          {" "}
          this is the product photo --{`${isetter + 1}`}{" "}
        </h2>
      </div>

      <img
        className="modal-image-for-edit-product"
        onClick={imageModalClicker}
        src={singleImagetoBeShowninModal.url}
        alt={singleImagetoBeShowninModal.public_id}
      />

      <button
        className="modal-download-image-button"
        onClick={(e) => DownloadPictureFUnction(e, singleImagetoBeShowninModal)}
      >
        Download Picture
      </button>

      <button
        className="modal-delete-image-button"
        onClick={(e) =>
          DeletPictureinMOdal(e, singleImagetoBeShowninModal.public_id)
        }
      >
        Delete Picture
      </button>

      <button
        className="swipeLeft"
        onClick={(e) => {
          leftClickonModalButton(e);
        }}
      >
        <span>
          {" "}
          <ArrowCircleLeftIcon />{" "}
        </span>
      </button>
      <button
        className="swipeRight "
        onClick={(e) => {
          rightClickonModalButton(e);
        }}
      >
        <span>
          <ArrowCircleRightIcon />
        </span>
      </button>
    </div>
  );
};

export default ModalForEditPRoduct;
