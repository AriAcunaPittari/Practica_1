// pages navega registra etc
// checker verificar cada accion del pages (exitoso)
import test, { expect } from "@playwright/test";
import { POManager } from "../pom/POManager";
import { chromium } from "playwright";

test.beforeAll(async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const pom = new POManager(page);
  const loginStorage = await pom.LoginPage;
  await loginStorage.navigateToLogin();
  await loginStorage.loginStorage();
  await context.storageState({ path: "web/context/storageLogin.json" });
  // Close the browser after saving session
  await browser.close();
});

test.describe("TestCases(Registro) for LambdaTestPlayground", () => {
  test("Registro", async ({ page }) => {
    const pom = new POManager(page);
    const registerTest = await pom.registerPage;
    const registerOKTest = await pom.registerSuccess;
    await registerTest.navigate();
    await registerTest.register();
  });
  test("Login", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const loginFailed = await pom.InvalidLogin;
    const loginOK = await pom.loginOK;
    await loginTest.navigate();
    await loginTest.loginOK();
  });
  test("Login Failed", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const loginFailed = await pom.InvalidLogin;
    await loginTest.navigate();
    await loginTest.loginFail();
  });
});


test.describe("TestCases con logueo", () => {
  test.use({ storageState: "web/context/storageLogin.json" });
  test("Change Info", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const changePersonalInfo = await pom.changeInfo;
    await changePersonalInfo.navigateAccount();
    await changePersonalInfo.ChangeInfo();
    await changePersonalInfo.ChangeSuccess();
  });
  test("Crear Orden Completa OK", async ({ page }) => {
    const pom = new POManager(page);
    const createOrder = await pom.createOrder;
    const totalItemsCheckout = await pom.calcularCheckout;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await createOrder.viewCategory();
    await createOrder.agregarCarritoUNO();
    await createOrder.agregarCarritoDOS();
    await createOrder.viewCart();
    await totalItemsCheckout.totalCartItems();
    const valueBoolean = await totalItemsCheckout.totalCheckoutFinal();
    expect(valueBoolean).toEqual(true);
    await createOrder.finalizarCompra();
    await createOrder.ordenExitosa();
  });
  test.only("Agregar productos al Wishlist", async ({ page }) => {
    const pom = new POManager(page);
    const addWishList = await pom.addWishList;
    await addWishList.goToMain();
    await addWishList.AgregarWishlist();
    await addWishList.filterWishlist();
    //await page.pause();
  });
  test("Comprar y filtrar producots del Wishlist", async ({ page }) => {
    const pom = new POManager(page);
    const buyWishlist = await pom.buyFromWishList;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await buyWishlist.goToWishlist();
    await buyWishlist.buyWishList();
    await buyWishlist.completeCheckout();
  });
  test("Dejar una review en un producto", async ({ page }) => {
    const pom = new POManager(page);
    const addReview = await pom.addReview;
    const createOrder = await pom.createOrder;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await createOrder.viewCategory();
    await addReview.review();
    await addReview.sendReviewOK();
  });
  test("Deslogueo de cuenta", async ({ page }) => {
    const pom = new POManager(page);
    const loginOut = await pom.loginOut;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await loginOut.logOut();
    await loginOut.confirmLogout();
  });
});
