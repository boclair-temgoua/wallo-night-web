import { capitalizeOneFirstLetter } from "@/utils/utils";
import { Avatar } from "antd";

interface Props {
  profile: any;
  size?: number
  className?: string
}

const AvatarComponent: React.FC<Props> = ({ profile, size, className }) => {

  return (
    <>{profile?.image ?
      <Avatar className={className} size={size} src={profile?.image}
        alt={`${profile?.firstName ?? ""} ${profile?.lastName ?? ""
          }`} /> :
      <Avatar className={className} size={size} style={{ backgroundColor: '#fde3', color: `${profile?.color}` }}>
        {capitalizeOneFirstLetter(String(profile?.firstName), String(profile?.lastName))}
      </Avatar>}
    </>
  );
};

export { AvatarComponent };
