import java.io.File;
import java.io.ObjectInputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class MyServer {
	// server class handle message from client (singleton)
	int PORT = 0;

	private static MyServer server;

	public static MyServer getServer() throws Exception {
		if (null == server)
			synchronized (MyServer.class) {
				if (null == server)
					server = new MyServer();
			}

		return server;
	}

	private MyServer() throws Exception {
		// constructor of the server class

		Scanner scanner = new Scanner(new File("PORT.txt"));
		while (scanner.hasNextInt()) {
			PORT = scanner.nextInt();
		}

		ServerSocket serverSocket = new ServerSocket(PORT); // server run on port PORT
		System.out.println("Server is Up and running on port : " + PORT + "!");
		System.out.println("");

		do {
			Socket socket = serverSocket.accept(); // Keeps the program running !
			ObjectInputStream inStream = new ObjectInputStream(socket.getInputStream()); // input message from client

			try {
				MessageHandlerThread obj = new MessageHandlerThread(); // initialize new thread to handle an client
																		// message
				obj.threadMailContent = (MailContent) inStream.readObject(); // initialize class message from client
				obj.start();

			} catch (Exception e) {
				serverSocket.close();

			}

		} while (true); // keep the server running till exception happen

	}

	public static void main(String[] args) throws Exception {

		MyServer myserver = MyServer.getServer(); // initialize one instance of server class

	}
}
