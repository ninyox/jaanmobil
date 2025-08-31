
import React, { useState } from 'react';

export default function useModal() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return { showModal, handleOpenModal, handleCloseModal };
}
