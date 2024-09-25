import { LoginPage } from "./pages/LoginPage";
import { registerPage } from "./pages/RegisterPage";
import { InvalidLogin } from "./checker/invalidLogin";
import { registerSuccess } from "./checker/registerSuccess";
import { Page } from "@playwright/test";
import { okLogin } from "./checker/validLogin";
import { Changeinfo } from "./pages/ChangePersonalInfo";
import { CreateOrder } from "./pages/CreateOrder";
import { calcularCheckout } from "./pages/CalcularTotalItems";
import { addWishList } from "./pages/AddWishlist";
import { BuyWishlist } from "./pages/BuyFromWishlist";
import { addReview } from "./pages/addReview";
import { loginOut } from "./pages/Logout";

export class POManager {
  LoginPage: LoginPage;
  registerPage: registerPage;
  InvalidLogin: InvalidLogin;
  registerSuccess: registerSuccess;
  loginOK: okLogin;
  page: Page;
  changeInfo: Changeinfo;
  createOrder: CreateOrder;
  calcularCheckout: calcularCheckout;
  addWishList: addWishList;
  buyFromWishList: BuyWishlist;
  addReview: addReview;
  loginOut: loginOut;

  constructor(page: Page) {
    this.page = page;
    this.LoginPage = new LoginPage(this.page);
    this.registerPage = new registerPage(this.page);
    this.InvalidLogin = new InvalidLogin(this.page);
    this.registerSuccess = new registerSuccess(this.page);
    this.loginOK = new okLogin(this.page);
    this.changeInfo = new Changeinfo(this.page);
    this.createOrder = new CreateOrder(this.page);
    this.calcularCheckout = new calcularCheckout(this.page);
    this.addWishList = new addWishList(this.page);
    this.buyFromWishList = new BuyWishlist(this.page);
    this.addReview = new addReview(this.page);
    this.loginOut= new loginOut(this.page);

  }

  getLoginPage() {
    return this.LoginPage;
  }
  getregisterPage() {
    return this.registerPage;
  }
  getInvalidLogin() {
    return this.InvalidLogin;
  }
  getregisterSuccess() {
    return this.registerSuccess;
  }
  getloginOK() {
    return this.loginOK;
  }
  getChangeInfo() {
    return this.changeInfo;
  }
  getCreateOrder() {
    return this.createOrder;
  }
  getcalcularCheckout(){
    return this.calcularCheckout;
  }
  getaddWishlist(){
    return this.addWishList;
  }
  getbuyWishlist(){
    return this.buyFromWishList;
  }
  getaddReview(){
    return this.addReview;
  }
  getloginOut(){
    return this.loginOut;
  }
}
