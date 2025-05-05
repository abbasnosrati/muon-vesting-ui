import UserInfo from "../UserInfo/UserInfo";
import VestingInfo from "../VestingInfo/VestingInfo";

const Home = () => {
  return (
    <div className=" w-full flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-10">
      <UserInfo />
      <VestingInfo />
    </div>
  );
};

export default Home;
