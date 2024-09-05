import Navbar from "../Navbar/Navbar";
import {
  PageContainer,
  ImageSection,
  ColorSection,
  ProfileButton,
  NameButton,
  IDButton,
  OvalButton
} from "./OtherBasic";
import bgImage from "../../assets/images/MyPageBG.svg";
import profileImage from "../../assets/images/OtherProfile.svg";

const OtherBasic: React.FC = () => {
  return (
    <PageContainer>
      <Navbar />
      <ImageSection bgImage={bgImage}>
        <ProfileButton
          image={profileImage}
          onClick={() => console.log("Profile button clicked!")}
        />
        <NameButton onClick={() => console.log("Name button clicked!")}>
          최윤서
        </NameButton>
        <IDButton onClick={() => console.log("ID button clicked!")}>
          yunseo_o
        </IDButton>
        <OvalButton onClick={() => console.log("New Oval Button clicked!")}>
          팔로우
        </OvalButton>
      </ImageSection>
      <ColorSection></ColorSection>
    </PageContainer>
  );
};

export default OtherBasic;
