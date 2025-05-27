type BtnProps = {
  title: string;
  onClick: () => void;
};

const MainBtn = ({ title, onClick }: BtnProps) => {
  return (
    <>
      <button
        className="font-Title bg-sky-600 border-none rounded-xl text-white w-full p-4"
        onClick={onClick}
      >
        {title}
      </button>
    </>
  );
};

export default MainBtn;
