import { Octicons } from "@expo/vector-icons";

export const Verifyprop = ({ status, click }) => {
  if (!status) {
    return (
      <>
        <Octicons name="unverified" onPress={click} color="red" size={20} className="anim" />
      </>
    );
  } else {
    return (
      <>
        <Octicons name="verified" onPress={() => alert("Meter Number is verified, If name is incorrect then edit the number")} color="green" size={20} />
      </>
    );
  }
};
