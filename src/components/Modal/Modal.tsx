interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed flex items-center justify-center inset-0 h-screen bg-black bg-opacity-60 mx-auto z-10"
        onClick={handleOutsideClick}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
