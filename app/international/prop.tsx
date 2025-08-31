import { Octicons } from "@expo/vector-icons";
import { useToast } from "@/store/toast";
export const Verifyprop = ({ status, click }:{status:boolean,click:Function}) => {
  const { openToast } = useToast();
  if (!status) {
    return (
      <>
        <Octicons
          name="unverified"
          onPress={() => click()}
          color="red"
          size={20}
          className="anim"
        />
      </>
    );
  } else {
    return (
      <>
        <Octicons
          name="verified"
          onPress={() =>
            openToast(
              "This means the Number is verified, The Operator is automatically chosen.",
            )
          }
          color="green"
          size={20}
        />
      </>
    );
  }
};
