import UserWidget from "../../Components/UserWidget";
import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user);
  console.log(user._id);
  return (
    <div>
      <UserWidget userId={user?._id} />
    </div>
  );
};

export default Home;
