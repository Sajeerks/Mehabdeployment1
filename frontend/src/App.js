import "./App.css";
import Header from "./component/layout/Header.js";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import WebFont from "webfontloader";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "./component/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/ProductDetails/ProductDetails.js";
import Products from "./component/Products/Products.js";
import Search from "./component/Search/Search.js";
import LoginSignup from "./component/User/LoginSignup";
import store from "./store.js";
import { clearErrors, loadUser } from "./actions/userActions";
import UserOptions from "./component/Header/UserOptions.js";
import Profile from "./component/Profile/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/update/UpdateProfile.js";
import UpdatePassword from "./component/UpdatePassword/UpdatePassword.js";
import ForgotPassword from "./component/ForgotPassword/ForgotPassword.js";
import ResetPassword from "./component/ResetPassword/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Shipping/Shipping.js";
import ConfirmOrder from "./component/ConfirmOrder/ConfirmOrder.js";
import Payment from "./component/Payment/Payment.js";
import OrderSuccess from "./component/OrderSuccess/OrderSuccess.js";
import MyOrders from "./component/MyOrders/MyOrders.js";
import OrderDetails from "./component/OrderDetails/OrderDetails.js";
import Dashboard from "./component/Dashboard/Dashboard.js";
import DashboardMainPart from "./component/DashboardMainPart/DashboardMainPart.js";
import ProductAdminList from "./component/ProductAdminList/ProductAdminList.js";
import AndProductListEditable from "./component/AndProductListEditable/AndProductListEditable.js";
import MasterAntList from "./component/MasterAntList/MasterAntList.js";
import ProductEditableListInAntList from "./component/ProductEditableListInAntList/ProductEditableListInAntList.js";
import Createproduct from "./component/Createproduct/Createproduct.js";
import EditProduct from "./component/EditProduct/EditProduct.js";
import EditProduct2 from "./component/EditProduct2/EditProduct2.js";
import EditProduct3 from "./component/EditProduct3/EditProduct3.js";





////react transloator











import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "./component/Loader/Loader";
import { useAlert } from "react-alert";
import FormikMain from "./component/formikComponents/FormikMain";
import FormikContainer from "./component/formikComponents/FormikContainer";
import FormikLoginForm from "./component/formikComponents/FormikLoginForm";
import FormikRegistrationFrom from "./component/formikComponents/FormikRegistrationFrom";
import FormikMaterilUIFormPractice from "./component/formikComponents/FormikMaterilUIFormPractice";
import FormikCOdEvolution from "./component/FormikPRactice22/FormikCOdEvolution";
import FormikCodeEvolutionContainter from "./component/FormikPRactice22/FormikCodeEvolutionContainter";
import FormikMuiMainFIleTwo from "./component/FormikMUITwo/FormikMuiMainFIleTwo";
import MaterailUiPracticeFileOne from "./component/MaterialMuiPractice/MaterailUiPracticeFileOne";
import DashBoardMainLama from "./component/LamaAdminDevDashboard/DashBoardMainLama";
import LamaDAshList from "./component/LamaAdminDevDashboard/LamaDAshList";
import LamaHomeDash from "./component/LamaAdminDevDashboard/LamaHomeDash";
import LamaSingleUser from "./component/LamaAdminDevDashboard/LamaSingleUser";
import NewLamaUser from "./component/LamaAdminDevDashboard/NewLamaUser";
import LamaLoginDash from "./component/LamaAdminDevDashboard/LamaLoginDash";
import LamaNopage from "./component/LamaAdminDevDashboard/LamaNopage";


















function App() {
  const {
    isAuthenticated,
    user,
    loading,
    error: userError,
  } = useSelector((state) => state.user);
  const [stripeApiKey, setstripeApiKey] = useState("");
  const [stripeLoading, setstripeLoading] = useState(true);
  const dispatch = useDispatch();
  const alert = useAlert();
  // const navigate =useNavigate()

  //  const stripePromise = loadStripe( "pk_test_51KShtuSGb5BPIhrYn0aZ0mWPk8BYiaVzPzCcLaFAq7KWOcQN5WDwzgHRD07PoOJYQ9aX8XxeVldlPjLKG6BzOsms00xhc3nhWh");

  // let stripePromise
  // let pk_test_key
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    // console.log("data---",data)
    // pk_test_key = data.stripeApiKey
    setstripeApiKey(data.stripeApiKey);
    // setstripeApiKey(pk_test_key)

    setstripeLoading(false);
    console.log("stripekey in app.js--stripeApiKey===", stripeApiKey);
    console.log("stripeLoading in app.js--", stripeLoading);
  }

  // (async () => {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setstripeApiKey(data.stripeApiKey);
  //   setstripeLoading(false)

  //   console.log("stripekey in app.js--", stripeApiKey)
  //   console.log("stripeLoading in app.js--", stripeLoading)
  //  stripePromise =  loadStripe(stripeApiKey)

  // })();

  // const stripePromise =  loadStripe(stripeApiKey)
  // console.log("stripepromise --app.js--", stripePromise )
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // (async () => {
    //   const { data } = await axios.get("/api/v1/stripeapikey");
    //   setstripeApiKey(data.stripeApiKey);
    //   console.log("stripekey in app.js--", stripeApiKey)
    //   console.log("stripeLoading in app.js--", stripeLoading)
    // })();

    //  if(Object.keys(user).length !==0){
    //   console.log("uxer in app js-" , user)
    //   store.dispatch(loadUser())

    //  }
    // if(user === null){
    //   return <Navigate to="/login" />;

    // }

    store.dispatch(loadUser());
    //  if(!isAuthenticated){
    //   return <Navigate to="/login" />;

    //  }
    if (userError) {
      // alert.error(userError)
      console.log("usereroor --", userError);
      dispatch(clearErrors());
      // return <Navigate to="/login" />;
    }

    getStripeApiKey().then(() => {
      //  stripePromise =  loadStripe(stripeApiKey)
      //  stripePromise =  loadStripe(pk_test_key)
      // console.log("stripekey in app.js--", stripeApiKey)
      //  console.log("stripepromise --app.js-- then--", stripePromise )
    });
  }, [stripeApiKey, alert]);
  return (
    <Fragment>
      {!stripeLoading ? (
        <Fragment>
          <Router>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}

            <Routes>
              {/* {(!isAuthenticated ) &&  <Route path="/login" element={<LoginSignup />} /> } */}

      

              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/password/forgot" element={<ForgotPassword />} />
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<OrderSuccess />} />
              


         <Route element={<ProtectedRoute    isAuthenticated={isAuthenticated}
                      user={user}
                      loading={loading}/>} >

            <Route   path="/account" element={ <Profile />}/>
            <Route   path="/me/update" element={ <UpdateProfile />}/>
            <Route   path="/password/update" element={      <UpdatePassword />}/>
            <Route   path="/shipping" element={   <Shipping />}/>
            <Route   path="/confirmorder" element={      <ConfirmOrder />}/>
            <Route   path="/order/:id" element={      <OrderDetails />}/>
            <Route   path="/myorders" element={      <MyOrders />}/>
            <Route   path="/dashboard" element={      <DashboardMainPart />}/>
            <Route   path="/productlists" element={      <ProductAdminList />}/>
            <Route   path="/productAntList" element={      <AndProductListEditable />}/>
            <Route   path="/MasterAntList" element={      <MasterAntList />}/>

            <Route   path="/ProductEditableListInAntList" element={      <ProductEditableListInAntList />}/>
            <Route   path="/Createproduct" element={      <Createproduct />}/>
            <Route   path="/edit/product/:id" element={      <EditProduct />}/>
            <Route   path="/edit/product2/:id" element={      <EditProduct2 />}/>
            <Route   path="/edit/product3/:id" element={      <EditProduct3 />}/>

          
            <Route   path="/FormikMain" element={      <FormikMain />}/>
            <Route   path="/FormikContainer" element={      <FormikContainer />}/>
            <Route   path="/FormikLoginForm" element={      <FormikLoginForm />}/>
            <Route   path="/FormikRegistrationFrom" element={      <FormikRegistrationFrom />}/>
            <Route   path="/FormikMaterilUIFormPractice" element={      <FormikMaterilUIFormPractice />}/>
            <Route   path="/FormikCOdEvolution" element={      <FormikCOdEvolution />}/>
            <Route   path="/FormikCodeEvolutionContainter" element={      <FormikCodeEvolutionContainter />}/>
            <Route   path="/FormikMuiMainFIleTwo" element={      <FormikMuiMainFIleTwo />}/>
            <Route   path="/MaterailUiPracticeFileOne" element={      <MaterailUiPracticeFileOne />}/>
            {/* <Route   path="/DashBoardMainLama" element={      <DashBoardMainLama />}/> */}


        <Route path="/DashBoardMainLama" element={<DashBoardMainLama />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="users"  >
              <Route index element={<LamaDAshList />}/>
              <Route path=":userId" element={<LamaSingleUser/>} />
              <Route path="new" element={<NewLamaUser/>} />
          </Route>
           <Route path="home" element={<LamaHomeDash />} />
           <Route path="login" element={<LamaLoginDash />} />

          <Route path="*" element={<LamaNopage />} />
        </Route>



















            
            


        

         </Route>

    


              {stripeApiKey && (
                <Route
                  path="/process/payment"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      user={user}
                      loading={loading}
                    >
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>{" "}
                    </ProtectedRoute>
                  }
                />
              )}

              {/* <Route
                path="/account"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                    <Profile />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/me/update"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/password/update"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                path="/shipping"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                    <Shipping />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                path="/confirmorder"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                    <ConfirmOrder />
                  </ProtectedRoute>

                  
                }
              /> */}
              {/* <Route
                path="/order/:id"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                    isAdmin={false}
                  >
                    <OrderDetails />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route path="/process/payment" element={<ProtectedRoute isAuthenticated={isAuthenticated}  ><Payment/> </ProtectedRoute>} />  */}

              {/* {stripeApiKey && <Route path="/process/payment" element={<ProtectedRoute isAuthenticated={isAuthenticated}  user={user} loading={loading} ><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements> </ProtectedRoute>} /> }     */}

{/*          

              <Route
                path="/myorders"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                    <MyOrders />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                 <DashboardMainPart/>
                  </ProtectedRoute>
                }
              /> */}


                 {/* <Route
                 path="/productlists"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                 <ProductAdminList/>
                  </ProtectedRoute>
                }
              /> */}
                  {/* <Route
                 path="/productAntList"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                 <AndProductListEditable/>
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                 path="/MasterAntList"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                  >
                 <MasterAntList/>
                  </ProtectedRoute>
                }
              /> */}








      
            </Routes>

            <Footer />
          </Router>
        </Fragment>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
}

export default App;
