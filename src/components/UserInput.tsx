type InfoProps = {
  email: string;
  pw: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPw: React.Dispatch<React.SetStateAction<string>>;
};
const UserInput = ({ email, pw, setEmail, setPw }: InfoProps) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  return (
    <>
      <div className="w-full mb-3">
        <h3 className="font-Title">Email Address</h3>
        <input
          className="border-2 rounded-xl w-full p-2 font-Title"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="w-full">
        <h3 className="font-Title">Password</h3>
        <input
          className="border-2 rounded-xl w-full p-2 font-Title"
          value={pw}
          onChange={handlePwChange}
        />
      </div>
    </>
  );
};

export default UserInput;
