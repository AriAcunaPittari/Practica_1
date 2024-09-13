// pages navega registra etc
// checker verificar cada accion del pages (exitoso)
import test from "@playwright/test";
import { POManager } from "../POM/POManager";

test.describe("nombre describe.", () => {
  test("Registro", async ({ page }) => {
    const POM = new POManager(page);
    const registerTest = POM.registerPage;
    const registerOKTest = POM.registerSuccess;
    await registerTest.navigate();
    await registerTest.register();
    //await registerOKTest.VerifyRegisterSuccess(); //Intento de checker
    //await registerOKTest.VerifyMyAccount(); //Intento de checker
  });
  test("Login", async ({ page }) => {
    const POM = new POManager(page);
    const loginTest = POM.LoginPage;
    const loginFailed = POM.InvalidLogin;
    const loginOK = POM.loginOK;
    await loginTest.navigate();
    await loginTest.loginOK();
    await loginTest.loginFail()
    //await loginFailed.VerifyEmailId();
    //await loginOK.validLogin();
  });
  
});
