import React, { Fragment, Suspense, useEffect ,useState} from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import ProductCard from      '../layout/ProductCard/ProductCard.js'
import Metadata from '../layout/Metadata/Metadata'
import { clearErrors, getProducts } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import { useAlert } from 'react-alert'


///react I18
import i18n from "i18next";
import { useTranslation, initReactI18next, Trans } from "react-i18next";
///////////////////////
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



const translationEn ={welcome:"Welcome to Ecommerce website", 
secondHeading:"Find<bold><italic> Amazing </bold></italic>products", 
changed:"you have changed language {{count}} time",
changed_plural:"you have changed language {{count}} times",
}
const translationFr ={welcome:"Bienvenue sur le site de commerce électronique", 
secondHeading:"Trouver des <bold><italic>produits</bold></italic> étonnants",
changed:"vous avez changé de langue {{count}} fois",
changed_plural:"vous avez changé de langue {{count}} fois",
}



i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translationEn
      },
      fr: {
        translation: translationFr
      }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });





const Home = () => {
   const {t} = useTranslation()
  const [count, setCount] = useState(0)
  const [lang, setLang] = useState("en")

  const {loading, products,productsCount, error} = useSelector(state=>state.products)

  const dispatch  = useDispatch()
  const alert = useAlert()


  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value)
    setLang(event.target.value);
    setCount(prev=>prev+1)
  };




  useEffect(() => {
    if(error){
       alert.error(error)
       dispatch(clearErrors())
    }
    dispatch(getProducts())
  
  }, [dispatch,error,alert])
  
  return (
  <Suspense fallback="Loading.....">
    <Fragment>
      {loading?(<Loader/>):(<Fragment>
        <Metadata  title={'Home Page'}/>
    
      <div className="banner">
      <h3>{t (`welcome`)}</h3>
      <h1>  <Trans components={{bold:<strong/>, italic:<i/>}}>
     {t ("secondHeading")}
      </Trans></h1> 
        <a href="#container">
            <button>
                Scroll <CgMouse/>
            </button>
        </a>

      </div>
      <div className='languageSelctorMain'>
        <p className='paragraphBeforSelect'>{t ("changed", {count})}</p>
        <FormControl fullWidth >
  <InputLabel id="demo-simple-select-label">Language</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={lang}
    label="Language"
    onChange={handleChange}
  >
    <MenuItem value={"en"}>English</MenuItem>
    <MenuItem value={'fr'}>French</MenuItem>
    {/* <MenuItem value={30}>Thirty</MenuItem> */}
  </Select>
</FormControl>
      </div>
    <h2 className="homeHeading">
      <Trans components={{bold:<strong/>, italic:<i/>}}>
     {t ("secondHeading")}
      </Trans>
      </h2>


    <div className="container" id="container">

      {products && products.map((product)=>(
        <ProductCard key={product._id} product={product}/>
      ))}



    </div>

      </Fragment>)}
    </Fragment>

</Suspense>


  )
}

export default Home