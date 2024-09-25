// pages navega registra etc
// checker verificar cada accion del pages (exitoso)
import test, { expect } from "@playwright/test";
import { POManager } from "../pom/POManager";
import { chromium } from "playwright";

/*test.beforeAll(async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const pom = new POManager(page);
  const loginStorage = await pom.LoginPage;
  await loginStorage.navigate();
  await loginStorage.loginStorage();
  await context.storageState({ path: "web/context/storageLogin.json" });
  // Close the browser after saving session
  await browser.close();
});*/

test.describe("TestCases(Registro) for LambdaTestPlayground", () => {
  test("Registro", async ({ page }) => {
    const pom = new POManager(page);
    const registerTest = await pom.registerPage;
    const registerOKTest = await pom.registerSuccess;
    await registerTest.navigate();
    await registerTest.register();
    //await registerOKTest.VerifyRegisterSuccess(); //Intento de checker
    //await registerOKTest.VerifyMyAccount(); //Intento de checker
  });
  test("Login", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const loginFailed = await pom.InvalidLogin;
    const loginOK = await pom.loginOK;
    await loginTest.navigate();
    await loginTest.loginOK();
    //await loginFailed.VerifyEmailId();
    //await loginOK.validLogin();
  });
  test("Login Failed", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const loginFailed = await pom.InvalidLogin;
    await loginTest.navigate();
    await loginTest.loginFail();
    //await loginFailed.VerifyEmailId();
  });
});

test.describe("TestCases con logueo", () => {
  //test.use({ storageState: "web/context/storageLogin.json" });
  test("Change Info", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const changePersonalInfo = await pom.changeInfo;
    await loginTest.navigate();
    await loginTest.loginOK();
    await changePersonalInfo.navigateAccount();
    await changePersonalInfo.ChangeInfo();
    await changePersonalInfo.ChangeSuccess();
  });
  test("Crear Orden Completa OK", async ({ page }) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/");
    const pom = new POManager(page);
    const createOrder = await pom.createOrder;
    const totalItemsCheckout = await pom.calcularCheckout;
    const valueBoolean = await totalItemsCheckout.totalCheckoutFinal();
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await loginTest.loginOK();
    await createOrder.viewCategory();
    await createOrder.agregarCarritoUNO();
    await createOrder.agregarCarritoDOS();
    await createOrder.viewCart();
    
    await totalItemsCheckout.totalCartItems(); 
    expect(valueBoolean).toEqual(true);
    //expect(valueBoolean).toBeTruthy();
    //expect(valueBoolean).toBe(true);
    await createOrder.finalizarCompra();
    await createOrder.ordenExitosa();

  });
  test("Agregar productor al Wishlist", async ({ page }) => {
    //await page.goto("https://ecommerce-playground.lambdatest.io/");
    const pom = new POManager(page);
    const addWishList = await pom.addWishList;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await loginTest.loginOK();
    await addWishList.goToMain();
    await addWishList.AgregarWishlist();
    await addWishList.goToWishlist();

        //await page.pause();
  });
  test("Comprar y filtrar producots del Wishlist", async ({ page }) => {
    //await page.goto("https://ecommerce-playground.lambdatest.io/");
    const pom = new POManager(page);
    const buyWishlist = await pom.buyFromWishList;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await loginTest.loginOK();
    await buyWishlist.goToWishlist();
    await buyWishlist.buyWishList();
    await buyWishlist.completeCheckout();


        //await page.pause();
  });
  test.only("Dejar una review en un producto", async ({ page }) => {
    const pom = new POManager(page);
    const addReview = await pom.addReview;
    const createOrder = await pom.createOrder;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await loginTest.loginOK();
    await createOrder.viewCategory();
    await addReview.review();
    await addReview.sendReviewOK();


  });
  test("Deslogueo de cuenta", async ({ page }) => {
    const pom = new POManager(page);
    const loginOut = await pom.loginOut;
    const loginTest = await pom.LoginPage;
    await loginTest.navigate();
    await loginTest.loginOK();
    await loginOut.logOut();
    await loginOut.confirmLogout();
  });
  
});
