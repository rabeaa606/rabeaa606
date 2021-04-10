import java.awt.Color;
import java.awt.EventQueue;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.SystemColor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.File;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.Scanner;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class ClientUI {

	public int PORT = 0;

	private JFrame frame;
	private JTextField To_Field;
	private JTextField From_Field;
	private JButton SendButton;
	private JTextArea Body_Field;
	private JComboBox vendorsBox;
	private JLabel At_Sign;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					ClientUI window = new ClientUI();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public ClientUI() {
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.getContentPane().setBackground(new Color(192, 192, 192));
		frame.getContentPane().setForeground(SystemColor.windowBorder);
		frame.setBounds(100, 100, 625, 470);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		GridBagLayout gridBagLayout = new GridBagLayout();
		gridBagLayout.columnWidths = new int[] { 0, 0, 0, 0, 0, 0, 0, 0 };
		gridBagLayout.rowHeights = new int[] { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
		gridBagLayout.columnWeights = new double[] { 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, Double.MIN_VALUE };
		gridBagLayout.rowWeights = new double[] { 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, Double.MIN_VALUE };
		frame.getContentPane().setLayout(gridBagLayout);

		JLabel Title = new JLabel("Sending Emails Via Java Emulator");
		GridBagConstraints gbc_Title = new GridBagConstraints();
		gbc_Title.gridwidth = 7;
		gbc_Title.insets = new Insets(0, 0, 5, 5);
		gbc_Title.gridx = 0;
		gbc_Title.gridy = 0;
		frame.getContentPane().add(Title, gbc_Title);

		JLabel To_Label = new JLabel("To : ");
		GridBagConstraints gbc_To_Label = new GridBagConstraints();
		gbc_To_Label.gridwidth = 2;
		gbc_To_Label.insets = new Insets(0, 0, 5, 5);
		gbc_To_Label.gridx = 1;
		gbc_To_Label.gridy = 2;
		frame.getContentPane().add(To_Label, gbc_To_Label);

		To_Field = new JTextField();
		To_Field.setToolTipText("");
		GridBagConstraints gbc_To_Field = new GridBagConstraints();
		gbc_To_Field.gridwidth = 3;
		gbc_To_Field.insets = new Insets(0, 0, 5, 5);
		gbc_To_Field.fill = GridBagConstraints.HORIZONTAL;
		gbc_To_Field.gridx = 3;
		gbc_To_Field.gridy = 2;
		frame.getContentPane().add(To_Field, gbc_To_Field);
		To_Field.setColumns(10);

		JLabel From_Label = new JLabel("From : ");
		GridBagConstraints gbc_From_Label = new GridBagConstraints();
		gbc_From_Label.gridwidth = 2;
		gbc_From_Label.insets = new Insets(0, 0, 5, 5);
		gbc_From_Label.gridx = 1;
		gbc_From_Label.gridy = 3;
		frame.getContentPane().add(From_Label, gbc_From_Label);

		From_Field = new JTextField();
		GridBagConstraints gbc_From_Field = new GridBagConstraints();
		gbc_From_Field.insets = new Insets(0, 0, 5, 5);
		gbc_From_Field.fill = GridBagConstraints.HORIZONTAL;
		gbc_From_Field.gridx = 3;
		gbc_From_Field.gridy = 3;
		frame.getContentPane().add(From_Field, gbc_From_Field);
		From_Field.setColumns(10);

		SendButton = new JButton("Send Email");
		SendButton.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				//////////////////////////////////////////// my code start
				//////////////////////////////////////////// //////////////////////////////////////////////////

				String to = To_Field.getText(); // Read user customer email input
				String from = From_Field.getText() + String.valueOf(vendorsBox.getSelectedItem()); // Read From email
																									// user input
				String body = Body_Field.getText(); // Read user message body input
				try {

					Scanner scanner = new Scanner(new File("PORT.txt"));
					while (scanner.hasNextInt()) {
						PORT = scanner.nextInt();
					}

					// make client connect to the server
					Socket socket = new Socket("localhost", PORT);
					System.out.println("Connected Successfully ...");

					// create a message
					ObjectOutputStream outStream = new ObjectOutputStream(socket.getOutputStream());

					// the content of the message
					MailContent newMailContent = new MailContent(to, from, body);

					// send a message to server
					outStream.writeObject(newMailContent);

					outStream.close();
					socket.close();

				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				//////////////////////////////////////////// my code end
				//////////////////////////////////////////// //////////////////////////////////////////////////

			}
		});
		SendButton.setFont(new Font("Tahoma", Font.PLAIN, 16));
		SendButton.setForeground(new Color(0, 128, 0));
		SendButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
			}
		});

		At_Sign = new JLabel("@");
		GridBagConstraints gbc_At_Sign = new GridBagConstraints();
		gbc_At_Sign.insets = new Insets(0, 0, 5, 5);
		gbc_At_Sign.anchor = GridBagConstraints.EAST;
		gbc_At_Sign.gridx = 4;
		gbc_At_Sign.gridy = 3;
		frame.getContentPane().add(At_Sign, gbc_At_Sign);

		// We have Only 3 types of employee email vendors
		String[] vendors = { "@gmail.com", "@walla.co.il", "@yahoo.com" };

		vendorsBox = new JComboBox(vendors);
		vendorsBox.setBackground(new Color(211, 211, 211));
		vendorsBox.setEditable(true);
		vendorsBox.setForeground(new Color(0, 0, 0));
		GridBagConstraints gbc_vendorsBox = new GridBagConstraints();
		gbc_vendorsBox.insets = new Insets(0, 0, 5, 5);
		gbc_vendorsBox.fill = GridBagConstraints.HORIZONTAL;
		gbc_vendorsBox.gridx = 5;
		gbc_vendorsBox.gridy = 3;
		frame.getContentPane().add(vendorsBox, gbc_vendorsBox);

		JLabel Body_Label = new JLabel("Body : ");
		GridBagConstraints gbc_Body_Label = new GridBagConstraints();
		gbc_Body_Label.gridwidth = 2;
		gbc_Body_Label.insets = new Insets(0, 0, 5, 5);
		gbc_Body_Label.gridx = 1;
		gbc_Body_Label.gridy = 4;
		frame.getContentPane().add(Body_Label, gbc_Body_Label);

		Body_Field = new JTextArea();
		GridBagConstraints gbc_Body_Field = new GridBagConstraints();
		gbc_Body_Field.gridheight = 4;
		gbc_Body_Field.gridwidth = 3;
		gbc_Body_Field.insets = new Insets(0, 0, 5, 5);
		gbc_Body_Field.fill = GridBagConstraints.BOTH;
		gbc_Body_Field.gridx = 3;
		gbc_Body_Field.gridy = 4;
		frame.getContentPane().add(Body_Field, gbc_Body_Field);
		GridBagConstraints gbc_SendButton = new GridBagConstraints();
		gbc_SendButton.gridx = 6;
		gbc_SendButton.gridy = 8;
		frame.getContentPane().add(SendButton, gbc_SendButton);
	}

}
