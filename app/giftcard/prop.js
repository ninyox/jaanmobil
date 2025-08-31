import { Octicons } from "@expo/vector-icons";

export const Verifyprop = ({ status, click }) => {
  
    return (
      <>
        <Octicons name="unverified" onPress={() => alert("Jaan would not be responsible for any kind of issue that may arrive from you entering the wrong email address, Please verify properly")} color="blue" size={20} />
      </>
    );

};
