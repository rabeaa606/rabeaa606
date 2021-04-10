import java.io.Serializable;

public class MailContent implements Serializable {

	String To; // customer email
	String From; // your name>@<vendor email postfix
	String Body; // any information in message body

	public MailContent(String to, String from, String body) {
		this.To = to;
		this.From = from;
		this.Body = body;
	}
}
