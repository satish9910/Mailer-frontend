import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const token = Cookies.get("admintoken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/get-email`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
      });
  }, [token]);

  const handleOpenModal = (email) => {
    setSelectedEmail(email);
    setModalOpen(true);
  };

  const handleSendEmail = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/sent-email`,
        {
          email: selectedEmail,
          subject,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Email sent successfully!");
      setSubject("");
      setDescription("");
      setModalOpen(false);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Email List</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email._id} className="text-center">
              <td className="p-2 border">{email.name}</td>
              <td className="p-2 border">{email.email}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => handleOpenModal(email.email)}
                >
                  Send Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Send Email</h2>
            <p className="mb-2">To: {selectedEmail}</p>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-1 rounded mr-2" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={handleSendEmail}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailList;