import { LoginPage } from "./pages/LoginPage";
import { registerPage } from "./pages/RegisterPage";
import { InvalidLogin } from "./checker/invalidLogin";
import { registerSuccess } from "./checker/registerSuccess";
import { Page } from "@playwright/test";
import { okLogin } from "./checker/validLogin";
import { Changeinfo } from "./pages/ChangePersonalInfo";
import { CreateOrder } from "./pages/CreateOrder";
import { testingRows } from "./pages/probandoRows";
import test from "node:test";

export class POManager {
  LoginPage: LoginPage;
  registerPage: registerPage;
  InvalidLogin: InvalidLogin;
  registerSuccess: registerSuccess;
  loginOK: okLogin;
  page: Page;
  changeInfo: Changeinfo;
  createOrder: CreateOrder;
  testingRows: testingRows;
  constructor(page: Page) {
    this.page = page;
    this.LoginPage = new LoginPage(this.page);
    this.registerPage = new registerPage(this.page);
    this.InvalidLogin = new InvalidLogin(this.page);
    this.registerSuccess = new registerSuccess(this.page);
    this.loginOK = new okLogin(this.page);
    this.changeInfo = new Changeinfo(this.page);
    this.createOrder = new CreateOrder(this.page);
    this.testingRows = new testingRows(this.page);
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
  getTestingRows(){
    return this.testingRows;
  }
}
