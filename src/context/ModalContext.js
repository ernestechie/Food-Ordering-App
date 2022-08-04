import { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (prev) => {
    setShowModal(() => !prev);
  };

  return (
    <ModalContext.Provider value={{ showModal, toggleModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
export { ModalProvider };
