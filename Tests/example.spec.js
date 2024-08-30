const { test, expect } = require('@playwright/test');

const host = "http://localhost:3000";

const users = {
  "aqa": "AQA123",
  "test": "test123",
  "admin": "admin"
};

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(host);
  });



  test('Проверка кнопки выхода после авторизации', async ({ page }) => {
    await page.fill('#username', "aqa");
    await page.fill('#password', users["aqa"]);
    await page.click('button[type="submit"]');
    await page.click('#logoutButton');
    const loginButton = page.locator('#password');
    await expect(loginButton).toBeVisible();
  });

  test('Проверка не успешной авторизации', async ({ page }) => {
    await page.fill('#username', 'validUser');
    await page.fill('#password', 'validPassword');
    await page.click('button[type="submit"]');
    expect(await page.textContent('#message')).toBe('User not found');
  });

  test('Проверка пустого логина', async ({ page }) => {
    await page.fill('#username', '');
    await page.fill('#password', 'validPassword');
    await page.click('button[type="submit"]');
    expect(await page.textContent('#message')).toBe('Username is required.');
  });

  test('Проверка пустого пароля', async ({ page }) => {
    await page.fill('#username', 'validUser');
    await page.fill('#password', '');
    await page.click('button[type="submit"]');
    expect(await page.textContent('#message')).toBe('Password is required.');
  });

  test('Проверка пустого логина и пароля', async ({ page }) => {
    await page.fill('#username', '');
    await page.fill('#password', '');
    await page.click('button[type="submit"]');
    expect(await page.textContent('#message')).toBe('Username and password are required.');
  });


  //  не смог решить 
  /*

    test('Проверка всех логинов', async ({ page }) => {
    for (const [username, password] of Object.entries(users)) {
      await page.fill('#username', 'username');
      await page.fill('#password', 'password');
      await page.click('button[type="submit"]');
      
      const authButton = page.locator('#logoutButton');
      await expect(authButton).toBeVisible();
    }
  });
  
  test('Проверить что из localStorage по кнопке logout удаляется isLoggedIn', async ({ page }) => {
    await page.fill('#username', 'aqa');
    await page.fill('#password', 'AQA123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/welcome');
   
    await page.click('#logoutButton');
    const isLoggedIn = await page.evaluate(() => localStorage.getItem('isLoggedIn'));
    expect(isLoggedIn).toBeNull();
  });
  
    test('Проверить что из localStorage по кнопке logout удаляется isLoggedIn', async ({ page }) => {
    await page.fill('#username', 'validUser');
    await page.fill('#password', 'validPassword');
    await page.click('button[type="submit"]');
    await page.waitForURL('/welcome');
    await page.evaluate(() => localStorage.setItem('isLoggedIn', 'true'));
    await page.click('#logoutButton');
    await page.waitForURL('/');
    const isLoggedIn = await page.evaluate(() => localStorage.getItem('isLoggedIn'));
    expect(isLoggedIn).toBeNull();
  });

  test('Проверить что в localStorage при логине сохраняется isLoggedIn', async ({ page }) => {
    await page.fill('#username', 'validUser');
    await page.fill('#password', 'validPassword');
    await page.click('button[type="submit"]');
    await page.waitForURL('/welcome');
    const isLoggedIn = await page.evaluate(() => localStorage.getItem('isLoggedIn'));
    expect(isLoggedIn).toBe('true');
  });
  */

  test('Проверить страницу /welcome не авторизованному (авторизует или сделает редирект на login)', async ({ page }) => {
    await page.goto('/welcome');
    const loginButton = page.locator('#password');
    await expect(loginButton).toBeVisible();
  });

  





  


});