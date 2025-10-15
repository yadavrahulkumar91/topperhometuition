const sendMessage = async (text) => {
  const res = await fetch(`${process.env.FRONTEND_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });
  // const data = await res.json();
  // console.log(data.reply);
};
export default sendMessage;
