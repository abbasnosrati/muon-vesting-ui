import UserInfo from "../UserInfo/UserInfo";
import VestingInfo from "../VestingInfo/VestingInfo";

const Home = () => {
  return (
    <div className=" w-full flex flex-col md:flex-row items-center justify-center gap-16 md:gap-10">
      <UserInfo />
      <VestingInfo />
    </div>
  );
};

export default Home;
