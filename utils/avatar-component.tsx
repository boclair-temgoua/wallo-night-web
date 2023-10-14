import { capitalizeOneFirstLetter } from "@/utils/utils";
import { Avatar } from "antd";

interface Props {
  profile: any;
  size: number
}

const AvatarComponent: React.FC<Props> = ({ profile, size }) => {

  return (
    <>{profile?.image ?
      <Avatar size={size} src={profile?.image}
        alt={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""
          }`} /> :
      <Avatar size={size} style={{ backgroundColor: '#fde3', color: `${profile?.color}` }}>
        {capitalizeOneFirstLetter(String(profile?.firstName), String(profile?.lastName))}
      </Avatar>}
    </>
  );
};

export { AvatarComponent };
