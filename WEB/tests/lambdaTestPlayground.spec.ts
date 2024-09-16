// pages navega registra etc
// checker verificar cada accion del pages (exitoso)
import test from "@playwright/test";
import { POManager } from "../pom/POManager";
import { chromium } from "playwright";

test.describe("TestCases(Registro) for LambdaTestPlayground", () => {
  test("Registro", async ({ page }) => {
    const POM = new POManager(page);
    const registerTest = await POM.registerPage;
    const registerOKTest = await POM.registerSuccess;
    await registerTest.navigate();
    await registerTest.register();
    //await registerOKTest.VerifyRegisterSuccess(); //Intento de checker
    //await registerOKTest.VerifyMyAccount(); //Intento de checker
  });
  test("Login", async ({ page }) => {
    const POM = new POManager(page);
    const loginTest = await POM.LoginPage;
    const loginFailed = await POM.InvalidLogin;
    const loginOK = await POM.loginOK;
    await loginTest.navigate();
    await loginTest.loginOK();
    //await loginFailed.VerifyEmailId();
    //await loginOK.validLogin();
  });
  test("Login Failed", async ({ page }) => {
    const POM = new POManager(page);
    const loginTest = await POM.LoginPage;
    const loginFailed = await POM.InvalidLogin;
    await loginTest.navigate();
    await loginTest.loginFail();
    //await loginFailed.VerifyEmailId();
  });

  test("Change Info", async ({ page }) => {
    const POM = new POManager(page);
    const loginTest = await POM.LoginPage;
    const changePersonalInfo = await POM.changeInfo;
    await loginTest.navigate();
    await loginTest.loginOK();
    await changePersonalInfo.ChangeInfo();
    await changePersonalInfo.ChangeSuccess();
  });
  test("Crear Orden OK", async({page})=>{
    const POM = new POManager(page);
    const loginTest = await POM.LoginPage;
    await loginTest.navigate();
    await loginTest.loginOK();
    

  });
});
/*test.beforeAll(async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const POM = new POManager(page);
  const loginStorage = await POM.LoginPage;
  await loginStorage.navigate();
  //await page.pause();
  await loginStorage.loginStorage();
});
test.describe("TestCases(Login) for LambdaTestPlayground", () => {
  test.use({ storageState: "web/context/storageLogin.json" });
  test("Change Info", async ({ page }) => {
    const POM = new POManager(page);
    const loginTest = await POM.LoginPage;
    const changePersonalInfo = await POM.changeInfo;
    await loginTest.navigate();
    await loginTest.loginOK();
    await changePersonalInfo.ChangeInfo();
    await changePersonalInfo.ChangeSuccess();
  });
});*/
