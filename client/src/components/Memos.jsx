import { useState, useEffect } from "react";
import "./Memos.css";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchMemos = async () => {
      const fetchedMemos = await contract.getMemos();
      setMemos(fetchedMemos);
    };

    contract && fetchMemos();
  }, [contract]);

  return (
    <div className="container-fluid">
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>Messages</h3>
      <table>
        <tbody>
          {memos.map((memo) => (
            <tr key={memo.timestamp}>
              <td
                style={{
                  backgroundColor: "dodgerblue",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "100px",
                  color: "white",
                }}
              >
                {memo.name}
              </td>
              <td
                style={{
                  backgroundColor: "dodgerblue",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "800px",
                  color: "white",
                }}
              >
                {new Date(memo.timestamp * 1000).toLocaleString()}
              </td>
              <td
                style={{
                  backgroundColor: "dodgerblue",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "300px",
                  color: "white",
                }}
              >
                {memo.message}
              </td>
              <td
                className="container-fluid"
                style={{
                  backgroundColor: "dodgerblue",
                  border: "1px solid white",
                  borderCollapse: "collapse",
                  padding: "7px",
                  width: "400px",
                  color: "white",
                }}
              >
                {memo.from}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Memos;
