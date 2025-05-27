import { useNavigate } from "react-router-dom";

type TitleProps = {
  title: string;
  detail: string;
  type: string;
};

const SignupTitle = ({ title, detail, type }: TitleProps) => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col items-center gap-2 font-Title">
      <h1 className="text-2xl">{title}</h1>

      <div className="flex gap-2">
        <h3 className="text-sm">{detail}</h3>
        <button
          className="text-sky-600 text-sm"
          onClick={() => (type === "Signup" ? nav("/") : nav("/login"))}
        >
          {type}
        </button>
      </div>
    </div>
  );
};

export default SignupTitle;
