import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setEmail({
      ...email,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/email/send",
        email
      );

      alert(res.data.message);

      setEmail({
        to: "",
        subject: "",
        body: "",
      });
    } catch (error) {
      alert("Failed to send email");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Email Queue Service</h1>

      <form onSubmit={sendEmail}>
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={email.to}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={email.subject}
          onChange={handleChange}
          required
        />

        <textarea
          name="body"
          placeholder="Message"
          rows="6"
          value={email.body}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default App;