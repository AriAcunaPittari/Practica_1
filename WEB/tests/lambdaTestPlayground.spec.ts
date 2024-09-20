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
  await loginStorage.navigate();
  //await page.pause();
  await loginStorage.loginStorage();
  await context.storageState({ path: "web/context/storageLogin.json" });
  // Close the browser after saving session
  await browser.close();
});

test.describe.skip("TestCases(Registro) for LambdaTestPlayground", () => {
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

test.describe("TestCases(Login) for LambdaTestPlayground", () => {
  test.use({ storageState: "web/context/storageLogin.json" });
  test("Change Info", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const changePersonalInfo = await pom.changeInfo;
    await changePersonalInfo.navigateAccount();
    //await loginTest.loginStorage();
    //await loginTest.loginOK();
    await changePersonalInfo.ChangeInfo();
    await changePersonalInfo.ChangeSuccess();
  });
  test("Crear Orden Completa OK", async ({ page }) => {
    const pom = new POManager(page);
    const loginTest = await pom.LoginPage;
    const createOrder = await pom.createOrder;
    await loginTest.navigate();
    await createOrder.viewCategory();
    await createOrder.agregarCarritoUNO();
    await createOrder.agregarCarritoDOS();
    await createOrder.viewCart();
    //await page.pause();
    await createOrder.calcularTotalItems();
    const valueBoolean = await createOrder.totalcheckout();
    expect(valueBoolean).toEqual(true);
    //expect(valueBoolean).toBeTruthy();
    //expect(valueBoolean).toBe(true);
    await createOrder.finalizarCompra();
    await createOrder.ordenExitosa();
  });
  test.only("Testing Rows", async ({ page }) => {
    const pom = new POManager(page);
    const testingRows = await pom.testingRows;
    
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=checkout/checkout");
    await page.pause();
    await testingRows.totalCartAndCheckout();
  });
});
