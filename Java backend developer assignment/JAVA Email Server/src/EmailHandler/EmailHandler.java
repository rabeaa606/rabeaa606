package EmailHandler;

public abstract class EmailHandler {

	public String Server_address;
	public String Username;
	public String Password;
	public String Email_postfix;

	public void SendEmail(String To, String From, String Body)// abstracted method to send email that every type of
																// Email Handler has to realize
	{
		System.out.println("*********************");
		System.out.println("****respond new requist for sending  a mail****\n");

		getVendorInformation();

		System.out.println("* Message Info *\n");

		System.out.println("To   :  " + To);
		System.out.println("From :  " + From);
		System.out.println("Body :  " + Body);
		System.out.println("");

		System.out.println("Email Sent Successfully ");
		System.out.println("*********************\n\n\n\n");
	}

	public abstract void getVendorInformation(); // abstracted method to get vendor information that every type of Email
													// Handler has to realize

}
