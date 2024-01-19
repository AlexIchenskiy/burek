package hr.fer.progi.interfer;

import org.junit.BeforeClass;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import hr.fer.progi.interfer.config.SeleniumConfig;
import jakarta.validation.constraints.AssertTrue;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.Duration;
import java.util.concurrent.TimeUnit;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;





@SpringBootTest(classes = InterferApplication.class)
class InterferApplicationTests {
	private WebDriver driver;
	SeleniumConfig seleniumConfig;
    public String url = "https://interfer-frontend.onrender.com/login";

	public void setUp() {
 
		seleniumConfig = new SeleniumConfig();

		driver = seleniumConfig.webDriver();
	}

	@Test
	public void loginTest_neispravan_mail() {

		setUp();
		driver.get(url);

		WebElement element = driver.findElement(By.cssSelector("input[type='email']")); 
		element.sendKeys("krivimail@gmail.com");

		element= driver.findElement(By.cssSelector("input[type='password']")); 
		element.sendKeys("password");

		driver.findElement(By.cssSelector("button")).click();

		assertEquals(true, driver.findElement(By.cssSelector("div[class='MuiAlert-message css-1xsto0d'")).getText().equals("Molimo vas da koristite svoj sveučilišni email!"));
		driver.quit();
	}

	@Test
	public void loginTest_neispravna_lozinka() {

		setUp();
		driver.get(url);

		WebElement element = driver.findElement(By.cssSelector("input[type='email']")); 
		element.sendKeys("krivimail@fer.hr");

		element= driver.findElement(By.cssSelector("input[type='password']")); 
		element.sendKeys("password");

		driver.findElement(By.cssSelector("button")).click();

		assertEquals(true, driver.findElement(By.cssSelector("div[class='MuiAlert-message css-1xsto0d'")).getText().equals("Lozinka mora sadržavati barem jednu znamenku i barem jedno slovo!"));
		driver.quit();
	}

	@Test
	public void loginTest_nepostojeci_korisnik() {

		setUp();
		driver.get(url);

		WebElement element = driver.findElement(By.cssSelector("input[type='email']")); 
		element.sendKeys("nepostojeci@fer.hr");

		element= driver.findElement(By.cssSelector("input[type='password']")); 
		element.sendKeys("password123");

		driver.findElement(By.cssSelector("button")).click();

		assertEquals(true, driver.findElement(By.cssSelector("div[class='MuiAlert-message css-1xsto0d'")).getText().equals("Pogrešni podatci."));
		driver.quit();
	}

	@Test
	public void loginTest_kriva_lozinka() {

		setUp();
		driver.get(url);

		WebElement element = driver.findElement(By.cssSelector("input[type='email']")); 
		element.sendKeys("ld@fer.hr");

		element= driver.findElement(By.cssSelector("input[type='password']")); 
		element.sendKeys("krivalozinka123");

		driver.findElement(By.cssSelector("button")).click();

		assertEquals(true, driver.findElement(By.cssSelector("div[class='MuiAlert-message css-1xsto0d'")).getText().equals("Pogrešni podatci."));
		driver.quit();
	}

	@Test
	public void loginTest_ispravan() {

		setUp();
		driver.get(url);

		WebElement element = driver.findElement(By.cssSelector("input[type='email']")); 
		element.sendKeys("ld@fer.hr");

		element= driver.findElement(By.cssSelector("input[type='password']")); 
		element.sendKeys("Lozinka123");

		driver.findElement(By.cssSelector("button")).click();
		
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); // seconds
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("svg")));
		String redirURL = driver.getCurrentUrl();
   
		assertEquals(true, !redirURL.contains("login"));
		driver.quit();
	}
}
