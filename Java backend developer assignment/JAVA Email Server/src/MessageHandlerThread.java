
import EmailHandler.EmailHandler;
import EmailHandler.GmailHandler;
import EmailHandler.WallaHandler;
import EmailHandler.YahooHandler;

public class MessageHandlerThread extends Thread {

	MailContent threadMailContent; // class message from client
	EmailHandler emailhandler; // Email handler for sending email

	// run function: belong to specific thread that will run when its time
	public void run() {
		emailhandler = getEmailHandler();
		emailhandler.SendEmail(threadMailContent.To, threadMailContent.From, threadMailContent.Body); // after
																										// initialize
																										// new instance
																										// of
																										// EmailHandler
																										// run send
																										// email will
																										// send the
																										// email by
																										// appropriate
																										// EmailHandler

	}

	// getEmailHandler function : detect witch class to use that extends from
	// EmailHandler
	// supported factory design pattern
	public EmailHandler getEmailHandler() {

		String provider = threadMailContent.From.substring(threadMailContent.From.indexOf('@')); // Email post fix of
																									// the sender

		switch (provider) {
		case "@gmail.com":
			return new GmailHandler();
		case "@walla.co.il":
			return new WallaHandler();
		case "@yahoo.com":
			return new YahooHandler();
		default:
			return null;
		}
	}

}