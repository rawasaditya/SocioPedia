import { Box } from "@mui/material";
import { assets } from "../../constUtils.js";
const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box>
      <img
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          width: { size },
          height: { size },
        }}
        alt=""
        src={`${assets}/${image}`}
      />
    </Box>
  );
};

export default UserImage;
