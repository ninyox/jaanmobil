import React, { useState } from "react";

export default function useSuccess() {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successtitle, setSuccessTitle] = useState<string>("");

  const OpenSuccess = () => setShowSuccess(true);
  const CloseSuccess = () => setShowSuccess(false);

  return { showSuccess, OpenSuccess, CloseSuccess };
}
