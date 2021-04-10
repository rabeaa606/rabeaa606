package EmailHandler;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class YahooHandler extends EmailHandler {

	// method: get yahoo vendor information from The data file that attached to the
	// project (YahooInfo)
	public void getVendorInformation() {

		JSONParser parser = new JSONParser();

		try {
			// Read JSON File
			Object obj = parser.parse(new FileReader("json/YahooInfo.json"));

			JSONObject jsonObject = (JSONObject) obj;

			// fill handler attributes by json file
			this.Server_address = (String) jsonObject.get("Server_address");
			this.Username = (String) jsonObject.get("Username");
			this.Password = (String) jsonObject.get("Password");
			this.Email_postfix = (String) jsonObject.get("Email_postfix");

			// print handler attributes
			System.out.println("* Vendor Server information*\n");
			System.out.println("Server address : " + this.Server_address);
			System.out.println("Username: " + this.Username);
			System.out.println("Password: " + this.Password);
			System.out.println("Email postfix: " + this.Email_postfix);
			System.out.println("\n\n");

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
